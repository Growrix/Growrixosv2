#!/usr/bin/env node
// Generates an environment's files in its worktree from that worktree's .claude/ source:
//   - .agents/skills/<skill>/   every portable skill, copied
//   - .agents/skills/agent-<n>/ every agent, as a role skill
//   - the environment's instruction file (registry "instruction_file"), from templates/<env-id>.md
// Owned by the environment-builder skill (Step 5 build, Step 6 verify).
//
// Usage (run from anywhere):
//   node sync-agent-skills.mjs --root <env-worktree>            dry run, writes nothing
//   node sync-agent-skills.mjs --root <env-worktree> --apply    writes the plan
//   node sync-agent-skills.mjs --root <env-worktree> --verify   exit 1 if disk differs from the plan
//   --source <sha>   source commit to record in the manifest (default: HEAD of --root)
//
// Exit codes: 0 ok, 1 validation failure or drift, 2 refused.

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SKILLS_OUT = '.agents/skills';
const MANIFEST = `${SKILLS_OUT}/.generated.json`;
const TEMPLATES = '.claude/skills/environment-builder/templates';
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SECRET_RE = /(^|\/)(\.env(\..*)?|.*\.pem|.*\.key|id_rsa.*|id_ed25519.*|credentials\.json|secrets\.ya?ml|service-account.*\.json)$/i;
const SECRET_ALLOW_RE = /(^|\/)\.env\.(example|sample|template)$/i;

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};

function refuse(msg) {
  console.error(`[sync-agent-skills] REFUSED: ${msg}`);
  process.exit(2);
}

const rootArg = opt('--root');
if (!rootArg) refuse('pass --root <env-worktree>.');
const root = path.resolve(rootArg);
const mode = flag('--apply') ? 'apply' : flag('--verify') ? 'verify' : 'dry-run';

function git(...a) {
  try {
    return execFileSync('git', ['-C', root, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

// Guard: only run on a branch that the registry lists as a non-source environment.
const registryPath = path.join(root, '.claude/skills/environment-builder/registry.json');
if (!fs.existsSync(registryPath)) refuse(`no registry at ${registryPath}.`);
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
const entry = registry.environments.find((e) => e.branch && e.branch === branch);
if (!entry) refuse(`branch '${branch || 'none'}' is not a registered environment branch.`);
if (entry.status === 'source') refuse(`branch '${branch}' is the source; never generate files there.`);
const commit = opt('--source') || git('rev-parse', '--short', 'HEAD') || 'unknown';

// Minimal frontmatter reader: top-level "key: value" and folded/literal block scalars.
function frontmatter(text, file) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  if (lines[0] !== '---') throw new Error(`${file}: no frontmatter`);
  const end = lines.indexOf('---', 1);
  if (end < 0) throw new Error(`${file}: unterminated frontmatter`);
  const fm = {};
  for (let i = 1; i < end; i++) {
    const m = /^([A-Za-z_-]+):\s*(.*)$/.exec(lines[i]);
    if (!m) continue;
    let value = m[2];
    if (/^[>|][-+]?$/.test(value)) {
      const block = [];
      while (i + 1 < end && /^\s+\S|^\s*$/.test(lines[i + 1])) block.push(lines[++i].trim());
      value = (value.startsWith('>') ? block.join(' ') : block.join('\n')).trim();
    } else {
      value = value.replace(/^(['"])(.*)\1$/, '$2');
    }
    fm[m[1]] = value;
  }
  return { fm, body: lines.slice(end + 1).join('\n') };
}

const errors = [];
function checkSpec(name, description, lineCount, where) {
  if (!NAME_RE.test(name) || name.length > 64) errors.push(`${where}: name '${name}' breaks the Agent Skills name rule`);
  if (!description || description.length > 1024) errors.push(`${where}: description is empty or over 1024 characters`);
  if (lineCount >= 500) errors.push(`${where}: SKILL.md has ${lineCount} lines (limit 500)`);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

const posix = (p) => p.split(path.sep).join('/');
// Text files are compared and written with LF, so a Windows (CRLF) and a Linux checkout verify the same.
const norm = (buf) => (buf.includes(0) ? buf : Buffer.from(buf.toString('utf8').replace(/\r\n/g, '\n'), 'utf8'));
const sha = (buf) => createHash('sha256').update(norm(buf)).digest('hex');
const desired = new Map(); // path relative to root -> Buffer

// 1. Copy portable skills. adapters/ is reference material, not a skill.
const skillsDir = path.join(root, '.claude/skills');
for (const d of fs.readdirSync(skillsDir, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name === 'adapters') continue;
  const skillFile = path.join(skillsDir, d.name, 'SKILL.md');
  if (!fs.existsSync(skillFile)) continue;
  const text = fs.readFileSync(skillFile, 'utf8');
  const { fm } = frontmatter(text, skillFile);
  if (fm.name !== d.name) errors.push(`.claude/skills/${d.name}: name '${fm.name}' does not match the folder`);
  checkSpec(fm.name ?? '', fm.description, text.split('\n').length, `.claude/skills/${d.name}`);
  for (const file of walk(path.join(skillsDir, d.name))) {
    const rel = posix(path.relative(skillsDir, file));
    if (SECRET_RE.test(rel) && !SECRET_ALLOW_RE.test(rel)) refuse(`secret-shaped file in a skill: .claude/skills/${rel}`);
    desired.set(`${SKILLS_OUT}/${rel}`, fs.readFileSync(file));
  }
}

// 2. Turn each agent into a role skill.
const agentsDir = path.join(root, '.claude/agents');
for (const f of fs.readdirSync(agentsDir).filter((n) => n.endsWith('.md')).sort()) {
  const file = path.join(agentsDir, f);
  const { fm, body } = frontmatter(fs.readFileSync(file, 'utf8'), file);
  const name = `agent-${fm.name}`;
  const text = [
    '---',
    `name: ${name}`,
    `description: ${JSON.stringify(fm.description ?? '')}`,
    '---',
    '',
    `<!-- Generated by environment-builder from .claude/agents/${f}. Do not edit here; edit the source and re-sync. -->`,
    '',
    `# Role: ${fm.name}`,
    '',
    `This tool has no file-based subagents, so the \`${fm.name}\` role from the Claude Code system is a skill here. When a task matches the description above, follow the instructions below as that role. Where they say to delegate to another agent, load the skill \`agent-<that-agent>\` and do that part yourself.`,
    fm.tools ? `\nTools this role had in Claude Code: ${fm.tools}.` : '',
    '',
    body.trim(),
    '',
  ].join('\n');
  checkSpec(name, fm.description, text.split('\n').length, `.claude/agents/${f}`);
  desired.set(`${SKILLS_OUT}/${name}/SKILL.md`, Buffer.from(text, 'utf8'));
}

// 3. The environment's instruction file, rendered from its template.
if (entry.instruction_file) {
  const templatePath = path.join(root, TEMPLATES, `${entry.id}.md`);
  if (!fs.existsSync(templatePath)) errors.push(`registry asks for ${entry.instruction_file} but ${TEMPLATES}/${entry.id}.md is missing`);
  else {
    // CLAUDE.md is nested under a section, so its headings move down one level (not inside code fences).
    let fenced = false;
    const claudeMd = fs
      .readFileSync(path.join(root, 'CLAUDE.md'), 'utf8')
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((line) => {
        if (line.startsWith('```')) fenced = !fenced;
        return !fenced && /^#{1,5} /.test(line) ? `#${line}` : line;
      })
      .join('\n')
      .trim();
    const commandsDir = path.join(root, '.claude/commands');
    const commands = fs
      .readdirSync(commandsDir)
      .filter((n) => n.endsWith('.md'))
      .sort()
      .map((n) => {
        const { fm } = frontmatter(fs.readFileSync(path.join(commandsDir, n), 'utf8'), n);
        return `- \`/${n.slice(0, -3)}\` — ${fm.description ?? ''}`;
      })
      .join('\n');
    const rendered = fs
      .readFileSync(templatePath, 'utf8')
      .replace(/\r\n/g, '\n')
      .replaceAll('{{COMMANDS}}', commands)
      .replaceAll('{{CLAUDE_MD}}', claudeMd);
    const left = rendered.match(/\{\{[A-Z_]+\}\}/g);
    if (left) errors.push(`${TEMPLATES}/${entry.id}.md: unknown placeholders ${[...new Set(left)].join(', ')}`);
    desired.set(entry.instruction_file, Buffer.from(rendered, 'utf8'));
  }
}

if (errors.length) {
  console.error('[sync-agent-skills] Validation failed:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

// 4. Compare with disk. Only files this script generated before are ever deleted.
const manifestPath = path.join(root, MANIFEST);
const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')).files ?? {} : {};
const plan = { new: [], changed: [], same: [], stale: [] };
for (const [rel, buf] of desired) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) plan.new.push(rel);
  else if (sha(fs.readFileSync(p)) !== sha(buf)) plan.changed.push(rel);
  else plan.same.push(rel);
}
for (const rel of Object.keys(previous)) if (!desired.has(rel) && fs.existsSync(path.join(root, rel))) plan.stale.push(rel);

const skillCount = [...desired.keys()].filter((k) => k.startsWith(SKILLS_OUT) && k.endsWith('/SKILL.md')).length;
const roleCount = [...desired.keys()].filter((k) => k.startsWith(`${SKILLS_OUT}/agent-`)).length;
console.log(`[sync-agent-skills] ${mode} — env '${entry.id}', branch '${branch}', source commit ${commit}`);
console.log(`  skills: ${skillCount} (${roleCount} role skills from agents)${entry.instruction_file ? `; instruction file: ${entry.instruction_file}` : ''}`);
console.log(`  NEW ${plan.new.length}  CHANGED ${plan.changed.length}  SAME ${plan.same.length}  STALE ${plan.stale.length}`);
for (const k of ['changed', 'stale']) for (const rel of plan[k]) console.log(`  ${k.toUpperCase()}: ${rel}`);

if (mode === 'verify') process.exit(plan.new.length + plan.changed.length + plan.stale.length ? 1 : 0);
if (mode === 'dry-run') process.exit(0);

for (const rel of [...plan.new, ...plan.changed]) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, norm(desired.get(rel)));
}
for (const rel of plan.stale) {
  fs.rmSync(path.join(root, rel));
  const stop = path.join(root, SKILLS_OUT);
  let dir = path.dirname(path.join(root, rel));
  while (dir.startsWith(stop + path.sep) && fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
    dir = path.dirname(dir);
  }
}
const files = Object.fromEntries([...desired].sort(([a], [b]) => a.localeCompare(b)).map(([rel, buf]) => [rel, sha(buf)]));
fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, `${JSON.stringify({ generator: 'environment-builder/sync-agent-skills', source_commit: commit, files }, null, 2)}\n`);
console.log(`[sync-agent-skills] wrote ${plan.new.length + plan.changed.length}, removed ${plan.stale.length}, manifest ${MANIFEST}`);
