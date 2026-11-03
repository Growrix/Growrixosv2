---
name: environment-hermes
description: Profile of Hermes Agent (Nous Research) as a target environment for this agentic system — context files, skills, trust step, how the source maps, gaps, and sources. Read by environment-builder.
---

# Hermes Agent — environment profile

Docs checked: 2026-11-03. Registry status: planned.

## Capabilities

| Area | Finding | Source |
|---|---|---|
| Context files | One project context type per session, first match wins: `.hermes.md` → `AGENTS.override.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`. `SOUL.md` loads separately from `HERMES_HOME`. | https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files (2026-11-03) |
| Skills | Compatible with the agentskills.io standard. Primary store `~/.hermes/skills/`. Project skills in `<root>/.hermes/skills/` and `<root>/.agents/skills/`, loaded only after `hermes skills trust`. Project skills are scanned; dangerous ones are quarantined. | https://hermes-agent.nousresearch.com/docs/user-guide/features/skills (2026-11-03) |
| Agent edits to skills | The agent can modify skills in writable directories, including external ones; project skills are not modified by the curator. | same page |
| Subagents (files) | not found; Hermes spawns extra Hermes instances from a terminal. | https://hermes-agent.nousresearch.com/docs/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-hermes-agent (2026-11-03) |
| Hooks | not checked | — |
| Commands | Every installed skill is a slash command. | skills page |

## Mapping

| Source | Hermes |
|---|---|
| `CLAUDE.md` | Converted → `.hermes.md`. Without it, Hermes loads this repo's `AGENTS.md` (Next.js block only) and skips `CLAUDE.md`. |
| Skills | Converted → copy to `.agents/skills/`; user runs `hermes skills trust` once |
| Agents | Converted → role skills (user approved 2026-11-03) |
| Commands | Native via skills |
| Hooks | not checked → treated as gap until verified |
| MCP | not checked |

## History

- 2026-11-03 — profile created.
