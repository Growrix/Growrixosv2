---
name: environment-claude-code
description: Profile of Claude Code, the source environment of this agentic system — what it loads and where. Read by environment-builder to know what every other environment is generated from.
---

# Claude Code — environment profile (source)

Docs checked: 2026-11-03. Registry status: source.

## Capabilities

| Area | Finding | Source |
|---|---|---|
| Instructions | `CLAUDE.md`. Reads `AGENTS.md` only when no `CLAUDE.md` exists in the working directory or above. | https://code.claude.com/docs/en/memory (2026-11-03) |
| Skills | `.claude/skills/<name>/SKILL.md`. Skills follow the Agent Skills open standard. | https://code.claude.com/docs/en/skills (2026-11-03) |
| `.agents/skills/` | not found in Claude Code docs | — |
| Subagents | `.claude/agents/*.md`; frontmatter includes `tools`. | https://code.claude.com/docs/en/sub-agents (2026-11-03) |
| Hooks | `.claude/settings.json`; hook shell defaults to bash, PowerShell only on Windows. | https://code.claude.com/docs/en/hooks (2026-11-02) |
| Commands | `.claude/commands/*.md`; same as skills for `/name`. | https://code.claude.com/docs/en/skills (2026-11-03) |
| MCP | `.mcp.json` at the repo root. | https://code.claude.com/docs/en/overview (2026-11-03) |

## Notes for other environments

- This repo has both `CLAUDE.md` (project rules) and `AGENTS.md` (only the block `next dev` writes). Tools that read `AGENTS.md` first will miss the project rules unless the environment gets its own instruction file.
- Hooks in this source are PowerShell (`.ps1`). Linux environments need bash ports.
- `book-mcp` in `.mcp.json` points to a Windows Python path.

## History

- 2026-11-03 — profile created.
