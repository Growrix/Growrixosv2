---
name: system-builder
description: The self-maintenance skill for the agentic system itself. Use whenever you want to add, modify, or audit anything inside `.claude/` — a new agent, a new skill, a new hook, a new slash command, or a cross-cutting change like a manifest-schema edit. Trigger phrases include "/system-builder", "add agent", "add skill", "add hook", "add command", "extend the system", "update the agentic system", "audit the system", "modify the agent system". NEVER use this to build or edit product code — that is what the project-director + capability-devs do. This skill audits first, prevents duplicates, validates against system invariants, consults the Claude Code official docs + the book-mcp reference, and always shows the proposal to the user before any file is written. Keeps the agentic system clean, consistent, and self-documenting.
---

# system-builder

You are extending or modifying the agentic system itself (the files under `.claude/`). The user wants the system to stay **clean, consistent, non-duplicative, and well-cross-referenced** as it grows. Follow this 12-step workflow in order. **Never skip steps. Never write files before Step 8.**

## Language

- Talk to the user in plain, easy Bangla. Technical terms (agent, PR, RLS, hook) stay in English where that is clearer.
- Everything this skill writes into the system is English: agent and skill files, commands, hooks, changelog entries, commit messages, reports, and code comments.
- When a proposal is shown at Step 8, the explanation is in Bangla and the file content is in English.
- This rule applies only to `system-builder`. It does not change the language rules of other skills or agents.

## Validation rule (hard)

This rule applies to every answer and every change this skill makes.

- Before you state any fact about Claude Code (hooks, subagents, skills, commands, settings, model names, limits, pricing), check these sources in order:
  1. The user's book-mcp reference (`mcp__book-mcp__search_book`, then `get_outline`, then `get_chapter`).
  2. Claude Code official docs (https://code.claude.com/docs/en/overview and the pages it links to).
  3. A live web search for the exact fact.
- Cite the source for each fact you state.
- If a source is unavailable or silent, say so plainly: "not verified: <what>; <source> unavailable", or "not found". Never fill the gap with a guess.
- Keep verified facts apart from inference. Label any inference "assumption" and do not act on it.
- If an earlier answer turns out wrong or unverified, say so and correct it before going on.
- Do not write a file that depends on an unverified fact. Stop at Step 8 and report the gap.

## Scope — what this skill is for

- Adding a new agent (`.claude/agents/<name>.md`)
- Adding a new skill (`.claude/skills/<name>/SKILL.md`)
- Adding a new hook (`.claude/hooks/<name>.ps1` + wiring in `.claude/settings.json`)
- Adding a new slash command (`.claude/commands/<name>.md`)
- Modifying any of the above
- Cross-cutting changes to the orchestration contract (manifest schema, port rule, phase sequence)

## Scope — what this skill is NOT for

- Building a SaaS product → use `/new-product` and the `project-director`.
- Fixing bugs in product code → use `bug-fixer` and the capability-devs.
- Deleting/retiring an existing agent → requires the user's explicit, named ask.
- Editing the port rule or vendor-neutrality axioms → those are architectural axioms; propose + diff + wait for human review, do not auto-apply.
- Touching `~/.claude/` (user-level global settings) → never, unless the user explicitly asks.

---

## Step 1 — Audit the current system

Before you propose anything, understand what already exists. **Read in this order** — the first source is fastest and most relevant:

1. **`.claude/skills/system-builder/changelog.md`** — the system-builder's own log. Baseline snapshot + dated change history. This is your fast starting point. Read the baseline, then scan the Changes section for anything that touches the user's current request.
2. **Live tree** — verify the changelog with `ls`:
   ```bash
   ls .claude/agents/
   ls .claude/skills/
   ls .claude/hooks/
   ls .claude/commands/
   ```
   If live-tree counts disagree with the changelog's baseline + changes, **the live tree wins**. Reconcile by rebaselining the changelog (see the "Rebaselining" section in that file).
3. **Root `CLAUDE.md`** "Agentic system" section and **`README.md`** inventory block — the human-facing view, for cross-reference sanity.

Report back in ≤ 10 lines:

- Agent count by phase (from the changelog's baseline + any newer entries)
- Skill count
- Hook count by event
- Command count
- Anything in the changelog that already touches what the user asked for
- Whether the changelog and live tree agree (yes/no + diff if no)

## Step 2 — Classify the request into one of six buckets

- **(a) New agent**
- **(b) New skill** (cross-cutting pattern OR vendor adapter at `.claude/skills/adapters/<cap>/<provider>.md`)
- **(c) New hook**
- **(d) New slash command**
- **(e) Modify an existing one** of the above
- **(f) Cross-cutting change** to a shared contract (manifest schema, port rule, orchestration contract)

Say which bucket, in one line.

If **(f)**, you still design, but **you do not auto-apply the edit** — produce the diff, show it, and tell the user "this is a contract change; please confirm by typing 'apply contract change' before I write." Shared-contract changes require two confirmations, not one.

## Step 3 — Duplicate / overlap check (hard gate)

This is non-negotiable. Grep the existing roster for overlap with the request:

```bash
grep -l "description:" .claude/agents/*.md | xargs grep "description:"
grep "description:" .claude/skills/*/SKILL.md
ls .claude/commands/
```

For every result, compare semantic overlap with the new request. If **any existing piece overlaps ≥ ~70%** with what the user is asking for:

- **STOP.**
- Report the matching piece: path + its description.
- Propose extending the existing piece instead of adding a new one.
- Do **not** proceed to Step 4 unless the user explicitly says "I know, add a new one anyway."

Duplicates are the number-one way the system rots. Don't skip this.

## Step 4 — Placement check

Decide where the new (or edited) piece belongs:

- **Agent** → which phase? (0 Intake / 1 Design / 2 Build / 3 Quality / 4 DevOps / 5 Growth, or orchestration). Which capability?
- **Skill** → cross-cutting pattern (`.claude/skills/<name>/SKILL.md`) or vendor adapter (`.claude/skills/adapters/<cap>/<provider>.md`)?
- **Hook** → which event (`PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `SessionStart`)? What matcher?
- **Command** → user-facing (`/<name>`) or internal convention?

Report the chosen placement + the one-line rationale.

## Step 5 — Consult authoritative sources

**Always** reference Claude Code's official documentation at **https://code.claude.com/docs/en/overview** for the file format and conventions of whatever piece is being written. Specifically:

- For a **hook**: cite the hook events reference section.
- For an **agent**: cite the subagent authoring section.
- For a **skill**: cite the skill authoring section.
- For a **slash command**: cite the custom commands section.
- For an **MCP server** addition: cite the MCP server configuration section.

**For non-trivial additions**, consult the user's `book-mcp` reference ("Mastering Claude Code" Bangla course). The book covers hooks, subagents, skills, MCP servers in detail across its chapters and appendices.

Use these tools in order:

1. `mcp__book-mcp__search_book` with a short keyword query (e.g. "hooks" or "subagent" or "mcp server").
2. `mcp__book-mcp__get_outline` on the top-matching chapter to see its headings.
3. `mcp__book-mcp__get_chapter` on the specific section you need.

Quote the one load-bearing rule or pattern the book recommends in your Step 5 report. If the book is silent on the topic, say so explicitly ("book has no section on this; relying on official docs only").

## Step 6 — Validate against system invariants (hard gate)

These checks block the write. Each must pass or you report the fail and stop.

- **Vendor neutrality** — proposed agent names must be role-based (`email-dev`, `database-dev`, `auth-dev`). If the user asks for a vendor-named agent (`resend-dev`, `stripe-dev`, `clerk-auth-dev`), **reject** and propose adding it as an adapter skill at `.claude/skills/adapters/<capability>/<vendor>.md` instead.
- **Port rule** — if the proposed piece suggests business code imports from a vendor SDK directly, reject and propose the port shape (`lib/<capability>/index.ts` as the port, `lib/<capability>/<provider>.ts` as the only vendor-SDK importer).
- **Lane rule** — if a proposed agent description crosses capabilities ("writes DB migrations AND wires auth"), reject and propose splitting into two agents.
- **Frontmatter shape** — exactly two keys for skills: `name` and `description`. Agents also allow optional `tools:`. Hooks have no frontmatter. Commands allow `description:` and `argument-hint:`. Nothing else.
- **Human gates preserved** — if the change touches a phase coordinator, confirm the between-phase approval gate (`[GATE: user types 'approved']`) is intact.
- **No `main`-pushing** — the final commit never pushes to `main`; always a feature branch.

For each invariant, report pass/fail. If any fail, STOP and surface the specific failure.

## Step 7 — Draft the file(s)

Produce the full proposed file content(s). Match the existing convention of comparable files:

- **Agent** — frontmatter (`name`, `description`, optional `tools:`), then "You are the ...", then sections: Your inputs, Your outputs, How you work, Rules, Hand-off. See `.claude/agents/database-dev.md` as the canonical example.
- **Skill** — frontmatter (`name`, `description`), then body with clear step-by-step guidance. See `.claude/skills/pr-template/SKILL.md` as the canonical example.
- **Hook** — PowerShell script, reads JSON from stdin, exit 0 to allow / exit 2 to block. See `.claude/hooks/pre-bash-guard.ps1` as the canonical example.
- **Command** — frontmatter (`description`, optional `argument-hint`), then prose instructing the model what to do when the command fires. See `.claude/commands/fix-until-green.md` as the canonical example.

Draft the file(s) in your working context. **Do not write them yet.**

## Step 8 — Show the user BEFORE writing (non-negotiable gate)

This is the gate the user demanded: _"always recheck, verify and validate before even insert."_

Print:

1. **Proposed path(s)** — full absolute paths of every file to create or edit.
2. **Full file content(s)** — not a summary, the complete text that will land on disk.
3. **Cross-reference updates** — a list of every other file that will change:
   - Which paragraph in `CLAUDE.md` gets edited
   - Which section in `README.md` gets edited
   - Which block in the SaaS Factory Blueprint HTML artifact gets edited (specific `AGENTS`/`SKILLS`/`HOOKS`/`COMMANDS` array entry)
4. **A one-sentence summary** of what the whole change does.
5. **The commit message you'll use** (Conventional Commits format per the `commit-convention` skill).

Then wait. **Nothing writes until the user types "approved" or an edit.** If the user edits the proposal, apply their changes to the draft and re-show Step 8. Loop until approved.

## Step 9 — On approval: write everything, cross-references included

Per the user's scope decision for this skill: **update all cross-references**.

1. **Write the new / edited piece file.**
2. **Edit root `CLAUDE.md`** — the "Agentic system" section's counts (agents, skills, hooks, commands) when the change adds or removes one. For a cross-cutting contract change, edit the file that owns the contract (for the manifest schema, `.claude/templates/product.config.template.json`) and name it in the Step 2 classification.
3. **Edit `README.md`** — the inventory section at the top. Add the item under its category (`.claude/agents/`, `.claude/skills/`, etc.).
4. **Update the SaaS Factory Blueprint HTML artifact**:
   - First, if this is a fresh session, `Artifact action: "read" url: "<the-artifact-url>"` to ensure the harness has it in context. (The URL lives in the project history; if unknown, ask the user.)
   - Edit the appropriate data array in the HTML file (`AGENTS`, `SKILLS`, `HOOKS`, `COMMANDS`) to add the new entry with the correct phase color and week number.
   - Republish via `Artifact action: "publish"` with the same `file_path` and `url`. The data-driven renderer picks up the new entry automatically — no diagram-code change needed.

## Step 10 — Append to changelog, then commit via `commit-convention`

**Before `git add`**, append an entry to `.claude/skills/system-builder/changelog.md`:

- Open the file. Find the Changes section's top date header.
- If today's `### YYYY-MM-DD` header already exists, append under it. Otherwise insert a new date header at the top of Changes.
- One line per logical change, format:
  ```
  - `<type>(<scope>)` **<name>** — <one-line reason>. _[commit `<short-sha>`]_
  ```
- Leave the commit-SHA placeholder for now; fill it after the commit lands by amending the entry OR by using `[this commit]` as a sentinel the next entry resolves.

Then load the `commit-convention` skill and produce one logical commit per change, Conventional Commits format:

```
feat(agents): add <name> for <phase>
feat(skills): add <name> pattern used by <who>
feat(hooks): add <name> on <event>
feat(commands): add /<name>
chore(docs): reflect <change> in CLAUDE.md and README
```

The changelog entry is **part of this commit** — never a separate commit. The commit lands on the current feature branch. **Never pushes to `main`**. The user merges to `main` themselves.

If multiple files touched for one logical change (new agent + CLAUDE.md + README + HTML artifact + changelog), **one commit** that groups them all. If multiple logical changes in one approval round, one commit per logical change (each with its own changelog entry).

## Step 11 — Self-verify

- `grep -l "<new-name>" .claude/` — confirms the file landed in the right directory.
- Re-run the duplicate check from Step 3 against the written content — confirms no new overlap was introduced by the edit.
- Re-read the touched lines in `CLAUDE.md` and `README.md` to confirm the new entry is in the right place with the right phrasing.
- Re-read the changelog entry you added — confirm it names the right file, right scope, and the commit SHA (or `[this commit]` sentinel) is populated.
- If the HTML artifact was updated, confirm the `Artifact publish` returned success and the version id advanced.

## Step 12 — Report back in ≤ 10 lines

- What was added or changed.
- Where it lives (full path).
- Which cross-references got updated.
- The commit SHA (from `git log -1 --format=%H`).
- One line on how to invoke it (slash command, agent name, hook event, etc.).

---

## Hard rules — stated verbatim so there is no excuse to skip them

1. **Never write files before Step 8 (user approval).**
2. **Never skip the duplicate check** in Step 3. If the user says "just add it", you still check and report — they can override only after seeing the match.
3. **Never name an agent after a vendor.** Role-based only. Vendors become adapter skills.
4. **Never push to `main`** directly from this skill. Commits land on the current feature branch.
5. **Never create a file outside `.claude/`** unless the user explicitly directs the change there (e.g. "update CLAUDE.md").
6. **Never silently update** a file the user wouldn't expect from their ask. If Step 9 will touch a file not named in the user's request, call it out in Step 8 so they can veto.
7. **Always cite the Claude Code official docs URL** (https://code.claude.com/docs/en/overview) in Step 5 for whatever file format is being written.
8. **Always use the `commit-convention` skill** for the final commit — do not invent commit messages.
9. **Always load the matching adapter skill** (if one exists at `.claude/skills/adapters/`) when the change involves a vendor.
10. **Never retire or delete** an existing agent/skill/hook/command without an explicit, named user request.
11. **Never edit the port rule or vendor-neutrality axioms** without a Step-2 (f) cross-cutting classification and the two-confirmation gate.
12. **Never touch `~/.claude/`** (user-global settings) unless the user explicitly asks.
13. **Always append a changelog entry** in Step 10 as part of the same commit as the change. No change is complete without its log line.
14. **If the changelog disagrees with the live tree**, the live tree wins. Rebaseline the changelog rather than editing files to match a stale log.
15. **Never state an unverified fact** about the Claude Code system. Follow the "Validation rule" section: cite the source, or label the gap.

---

## Reused patterns

- **Frontmatter shape** → `.claude/skills/pr-template/SKILL.md`, `.claude/skills/commit-convention/SKILL.md`
- **Agent file shape** → `.claude/agents/database-dev.md`, `.claude/agents/auth-dev.md`
- **Hook script shape** → `.claude/hooks/pre-bash-guard.ps1`, `.claude/hooks/secret-file-guard.ps1`
- **Command file shape** → `.claude/commands/fix-until-green.md`, `.claude/commands/new-product.md`
- **Confirm-before-write gate** → every phase coordinator in `.claude/agents/phase*-coordinator.md`
- **Audit-before-act discipline** → `.claude/agents/code-reviewer.md`, `.claude/agents/security-auditor.md`
- **Commit convention** → `.claude/skills/commit-convention/SKILL.md` (always loaded for Step 10)
- **book-mcp consultation** → `mcp__book-mcp__search_book` → `mcp__book-mcp__get_outline` → `mcp__book-mcp__get_chapter`

---

## Open limits — things the current skill does not handle

- **No auto-rollback.** If an addition proves wrong after a commit, the user does `git revert <sha>`. A future enhancement could add a `/system-builder revert <feature>` command; not in scope today.
- **No cross-session memory of in-flight proposals.** Each session starts fresh; approved proposals are what the git log remembers.
- **No automatic branch creation.** The skill assumes you're already on a feature branch. If you're on `main`, STOP and ask the user to switch to or create a feature branch first.
