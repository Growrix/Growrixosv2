---
name: environment-builder
description: Builds, syncs and verifies copies of this agentic system for other agent tools (Replit Agent, Cursor, VS Code Copilot, Hermes Agent, OpenClaw, or any new tool) from the Claude Code source in .claude/. Use when the user asks to make the system work in another tool, add an environment, update or sync all environments, or check environment status. Each environment lives on its own branch; the Claude source is never edited for another environment.
---

# environment-builder

Claude Code is the default environment and the single source of truth. Every other environment is a generated copy on its own branch. This skill owns those copies. `system-builder` owns the source.

## Files this skill owns

- `registry.json` (this folder) — one entry per environment: status, branch, worktree, profile, docs check date, last synced source commit.
- `.claude/skills/adapters/environment/<env-id>.md` — one profile per environment: verified capabilities, the mapping from the source, gaps, and sources with access dates.

Status values: `source` (Claude Code), `active` (built and current), `stale` (built, source has moved on), `planned` (profile only), `retired`.

## Modes

| Invocation | Does |
|---|---|
| `/environment-builder status` | Prints the registry and, for each built environment, how many source commits it is behind. Read-only. |
| `/environment-builder add <tool>` | Researches a new tool, writes its profile and registry entry (`planned`), then proposes the first build. |
| `/environment-builder sync <env-id>` | Rebuilds one environment from the current source commit. |
| `/environment-builder sync all` | Rebuilds every `active` and `stale` environment under one combined plan. |
| `/environment-builder verify <env-id>` | Runs the Step 6 checks without changing anything. |

## Hard rules

1. Never edit the source for another environment. The source is `.claude/`, root `CLAUDE.md` and root `AGENTS.md` on the source branch. Hash them before and after every run; if a hash changed, stop and report.
2. Each environment has its own branch and, on this machine, its own git worktree. New environments use branch `env/<env-id>`; existing ones keep the branch named in the registry. Never generate files in the source checkout.
3. Official docs first. Every capability in a profile cites the tool's official docs URL and access date. If the docs are silent, write `not found` and do not build on it. Blogs, videos and forums never prove a capability.
4. Nothing is written before the user approves the plan in Step 4. A broad request ("make it work") is not that approval. Approval covers one run.
5. Never push, open a PR or merge without the user's explicit approval for that action.
6. Never copy secrets: `.env*`, tokens, keys, `credentials.json`, MCP `env` values. Each environment uses the secret store named in its profile.
7. Never install into a home directory (`~/.hermes`, `~/.openclaw`, `~/.cursor` and similar) unless the user names that environment in this conversation and approves the paths.
8. If a guard (hook) is not enforced in an environment, say so in its profile and its instruction file. Never claim a guard that does not run there.

## Step 1 — Read state

- Read `registry.json` and the target's profile.
- Record the source branch and commit (`git rev-parse --short HEAD`) and its `git status --porcelain`.
- Hash the source files (rule 1) into the scratchpad.

## Step 2 — Research (for `add`, or when the profile's docs check is older than 30 days)

Delegate to the `environment-researcher` agent with the tool name, the stored profile path, and these questions:

1. Which project instruction files load, in what order, and does one file suppress another?
2. Where do project skills load from? Does it follow the Agent Skills spec? Does it read `.claude/skills/` or `.agents/skills/`?
3. Can custom subagents be defined in files? Where and in what format? Does it read `.claude/agents/`?
4. Does it run hooks? Which events, which config file, how does a hook block, which shell runs it, does it fail open?
5. Custom slash commands or prompt files?
6. MCP servers: config file and format.
7. Secrets: where they go.
8. Does it load repo skills or instructions only after a trust step, or install into a home directory?

Show the report to the user. Where a new fact contradicts the stored profile, the new fact wins; record the change in the profile's History.

## Step 3 — Map

Fill the profile's mapping table for each source piece: instructions (`CLAUDE.md`), skills, agents, commands, hooks, MCP.

- **Native:** the tool reads the source file as it is. Generate nothing.
- **Converted:** generate the tool's own file from the source (for example `CLAUDE.md` → `replit.md`, an agent → a role skill).
- **Gap:** no equivalent. State it as a plain rule in the generated instruction file and list it in the profile.

Skills are portable only if they meet the Agent Skills spec: `name` equals the folder name, 1–64 lowercase letters, digits and single hyphens; `description` 1–1024 characters; `SKILL.md` under 500 lines. Check each skill before copying. `.claude/skills/adapters/` is reference material, not a skill; never copy it into a skills folder.

Instruction files: generate one file per tool in that tool's own native location, so it never competes with `CLAUDE.md` or with the `AGENTS.md` that `next dev` rewrites. Check the load order from question 1: if the tool stops at the first file it finds, the project rules must be in that file.

## Step 4 — Plan and ask (gate)

Show:
- environment, branch, worktree path, source commit;
- every file to create, change or delete on the environment branch, grouped as native, converted, gap;
- the hook parity table: each source guard and how it runs there, or `not enforced`;
- the commit message (`commit-convention`).

Wait for "approved".

## Step 5 — Build

- New environment: `git worktree add -b env/<env-id> <path> <source-commit>`. Existing one: merge the source commit into the environment branch first and resolve conflicts in favour of the source, except the files this skill generates.
- Write only the files in the approved plan.
- Shell scripts get LF line endings through `.gitattributes` on the environment branch; confirm with a CR count of 0.
- Commit on the environment branch. Do not push.

## Step 6 — Verify

- Source hashes from Step 1 are unchanged and the source checkout's `git status` is identical.
- Every copied or generated skill passes the spec check from Step 3.
- Every converted hook runs against sample payloads: each block case exits 2, each allow case exits 0. Keep test cases in a scratchpad file, never as inline command text that the source guards would block.
- Every JSON and YAML file parses.
- Anything that needs the real tool (for example, the tool listing the skills) is reported as `not verified in <tool>` unless it was run there.

## Step 7 — Record

- Update the registry entry: `status: active`, `last_synced_commit`, `last_synced_at`, `docs_verified`.
- Add a changelog line through `system-builder` Step 10: `` - `chore(env)` **<env-id>** — <what changed>. _[env commit `<sha>`]_ ``. Registry and changelog land in one commit on the source branch.
- Report: environment, branch, commit, native / converted / gap counts, and what is not verified.

## Sync all

1. Read the registry; take every `active` and `stale` entry.
2. Build one combined Step 4 plan covering all of them. One approval covers the combined plan.
3. Run Steps 5–7 per environment. Stop at the first failed verify and report which environments finished.

## When the source changes

`system-builder` sets every `active` environment to `stale` in the same commit that changes `.claude/` or root `CLAUDE.md`. Nothing rebuilds automatically; the user runs `/environment-builder sync all` when they want the copies updated.

## Coverage

| Checklist item | Section |
|---|---|
| Official docs first | Hard rule 3; Step 2 |
| Capability matrix | Step 2 questions; profiles |
| Agent Skills spec | Step 3 |
| Instruction load order | Step 2 question 1; Step 3 |
| Isolation of the source | Hard rules 1–2; Steps 1 and 6 |
| Hook parity or explicit gap | Hard rule 8; Steps 4 and 6 |
| Line endings / OS | Step 5 |
| Secrets | Hard rule 6 |
| Registry and stale tracking | Files this skill owns; Step 7; When the source changes |
| Sync all | Sync all |
| Human gates | Hard rules 4–5; Step 4 |
| Trust and home-directory installs | Step 2 question 8; Hard rule 7 |
