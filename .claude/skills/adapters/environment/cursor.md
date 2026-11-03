---
name: environment-cursor
description: Profile of Cursor as a target environment for this agentic system — rules, skills, subagents and hooks, how the source maps, gaps, and sources. Read by environment-builder.
---

# Cursor — environment profile

Docs checked: 2026-11-03. Registry status: planned.

## Capabilities

| Area | Finding | Source |
|---|---|---|
| Rules | `.cursor/rules/*.mdc` with `description`, `globs`, `alwaysApply`; plain `.md` there is ignored. | https://cursor.com/docs/rules (2026-11-03) |
| `AGENTS.md` | Supported at root and nested; nested files combine, more specific wins. | https://cursor.com/docs/rules (2026-11-03) |
| `CLAUDE.md` | not found in the rules page | — |
| Skills | `.agents/skills/`, `.cursor/skills/`; for compatibility also `.claude/skills/`. | https://cursor.com/docs/skills (2026-11-03) |
| Subagents | `.cursor/agents/`; for compatibility also `.claude/agents/`; `.cursor/` wins on name clash. Fields: `name`, `description`, `model`, `readonly`, `is_background`. | https://cursor.com/docs/subagents (2026-11-03) |
| Claude `tools` field | not found (how Cursor treats it) | — |
| Hooks | `.cursor/hooks.json` (project) or `~/.cursor/hooks.json`; JSON on stdin/stdout; exit 2 blocks; other non-zero codes fail open; Windows runs hooks through PowerShell. | https://cursor.com/docs/hooks (2026-11-03) |
| Claude hooks (`.claude/settings.json`) | not found | — |
| Commands | not checked | — |

## Mapping

| Source | Cursor |
|---|---|
| `CLAUDE.md` | Converted → `.cursor/rules/project-rules.mdc` with `alwaysApply: true` |
| Skills | Native (`.claude/skills/`) |
| Agents | Native (`.claude/agents/`); `tools` handling not verified |
| Commands | not checked |
| Hooks | Converted → `.cursor/hooks.json` calling ported scripts; schema differs from Claude |
| MCP | not checked |

## History

- 2026-11-03 — profile created.
