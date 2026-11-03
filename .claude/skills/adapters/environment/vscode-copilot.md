---
name: environment-vscode-copilot
description: Profile of VS Code with GitHub Copilot as a target environment for this agentic system — instructions, skills, custom agents and hooks, how the source maps, gaps, and sources. Read by environment-builder.
---

# VS Code (Copilot) — environment profile

Docs checked: 2026-11-03. Registry status: planned.

## Capabilities

| Area | Finding | Source |
|---|---|---|
| Instructions | Copilot harness: `.github/copilot-instructions.md` or `AGENTS.md`; targeted `.github/instructions/**/*.instructions.md`. Claude harness: `CLAUDE.md`. No general precedence order between files. | https://code.visualstudio.com/docs/agent-customization/custom-instructions (2026-11-03) |
| Skills | Project: `.github/skills/`, `.claude/skills/`, `.agents/skills/`. Skills also appear as slash commands. | https://code.visualstudio.com/docs/agent-customization/agent-skills (2026-11-03) |
| Custom agents | `.github/agents/` (`.agent.md` or `.md`); `.claude/agents/` in Claude agent format. | https://code.visualstudio.com/docs/agent-customization/custom-agents (2026-11-03) |
| Hooks | Preview. JSON with `"version": 1` and events such as `preToolUse`. Config file location: not verified. | https://code.visualstudio.com/docs/agent-customization/hooks (2026-11-03) |
| Prompt files | Exist alongside skills in the `/` menu; format not checked. | https://code.visualstudio.com/docs/agent-customization/agent-skills (2026-11-03) |

## Mapping

| Source | VS Code Copilot |
|---|---|
| `CLAUDE.md` | Converted → `.github/copilot-instructions.md` (Copilot harness); native in Claude harness |
| Skills | Native (`.claude/skills/`) |
| Agents | Native (`.claude/agents/`, Claude format) |
| Commands | Gap until prompt files are checked |
| Hooks | Converted; preview feature; file location to verify before building |
| MCP | not checked |

## History

- 2026-11-03 — profile created.
