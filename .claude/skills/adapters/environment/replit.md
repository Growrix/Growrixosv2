---
name: environment-replit
description: Profile of Replit as a target environment for this agentic system — Replit Agent and Claude Code in the Replit shell. What each loads, how the source maps, gaps, and sources. Read by environment-builder.
---

# Replit — environment profile

Docs checked: 2026-11-03. Registry status: active. Branch `replit/agentic-env`.

Replit has two ways to work with this repo. They load different things.

## Capabilities

| Area | Finding | Source |
|---|---|---|
| Project instructions | Agent reads root `replit.md` on each request; it must be in the project root. | https://docs.replit.com/features/project-setup/replit-dot-md (2026-11-02) |
| Workspace instructions | Custom instructions in Workspace Settings load on every message for every project; strict requirements are not guaranteed. | https://docs.replit.com/features/agent/agent-customization (2026-11-03) |
| Skills | Project skills in `/.agents/skills`, conforming to the Agent Skills spec. Agent sees every name and description and loads the body when relevant. | https://docs.replit.com/features/agent/skills (2026-11-03) |
| Cross-tool sync | Replit docs point to rulesync for importing Claude Code skills. | https://docs.replit.com/features/agent/skills (2026-11-03) |
| `AGENTS.md` / `CLAUDE.md` | not found in Replit docs | — |
| Subagents (files) | not found | — |
| Hooks | not found | — |
| Claude Code in the shell | Replit promotes using Claude Code with Replit; there `.claude/` loads as on Windows, and hooks default to bash. | https://replit.com/claude-code (2026-11-02); https://code.claude.com/docs/en/hooks (2026-11-02) |

## Mapping

| Source | Replit Agent | Claude Code in Replit shell |
|---|---|---|
| `CLAUDE.md` | Converted → `replit.md` | Native |
| Skills | Converted → copy to `.agents/skills/` | Native |
| Agents | Converted → role skills in `.agents/skills/` (user approved 2026-11-03) | Native |
| Commands | Gap → listed in `replit.md` | Native |
| Hooks | Gap → rules stated in `replit.md`, not enforced | Converted → `.sh` ports + `settings.json` on the branch |
| MCP | not verified | `.mcp.json`; `book-mcp` path is Windows-only |
| Secrets | Replit Secrets | Replit Secrets |

## Known gaps

- No hook enforcement for Replit Agent: guards are advice only.
- `jq` must be installed for the bash hooks; `pre-bash-guard.sh` blocks every command without it.
- Nothing has been run inside a Replit container yet.

## History

- 2026-11-02 — first build, commit `49af770`, made without system-builder Step 1, 3 and 8. `replit.md` there says Agent reads only `replit.md`; that is wrong.
- 2026-11-03 — corrected: Replit Agent also loads `/.agents/skills`.
- 2026-11-03 — synced with environment-builder (env commit `ee35d09`): .agents/skills (17 skills + 52 role skills) and a generated replit.md.
