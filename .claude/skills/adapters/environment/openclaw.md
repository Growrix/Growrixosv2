---
name: environment-openclaw
description: Profile of OpenClaw as a target environment for this agentic system — workspace files, skills, sub-agents, how the source maps, gaps, and sources. Read by environment-builder.
---

# OpenClaw — environment profile

Docs checked: 2026-11-03. Registry status: planned.

## Capabilities

| Area | Finding | Source |
|---|---|---|
| Workspace | The agent's home and working directory; default `~/.openclaw/workspace`, configurable per agent. Keep it private; it holds memory. | https://docs.openclaw.ai/concepts/agent-workspace (2026-11-03) |
| Instructions | `AGENTS.md` (operating instructions) and `SOUL.md` (persona) load every session from the workspace. | same page |
| Skills | Precedence: `<workspace>/skills` → `<workspace>/.agents/skills` → `~/.agents/skills` → managed → bundled → extra dirs. Frontmatter needs `name` and `description`; optional `metadata.openclaw`. | https://docs.openclaw.ai/tools/skills (2026-11-03) |
| Sub-agents | Background runs spawned with `sessions_spawn`; file-defined roles not found. | https://docs.openclaw.ai/tools/subagents (2026-11-03) |
| Hooks | not checked | — |

## Mapping

| Source | OpenClaw |
|---|---|
| `CLAUDE.md` | Converted → workspace `AGENTS.md` |
| Skills | Converted → `<workspace>/.agents/skills/` |
| Agents | Converted → role skills (user approved 2026-11-03) |
| Commands | not checked |
| Hooks | not checked → gap |

## Risks

- The workspace is outside the repo and receives memory files. Installing there touches the home directory (environment-builder hard rule 7).

## History

- 2026-11-03 — profile created.
