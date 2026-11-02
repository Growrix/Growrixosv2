# Replit — Growrix OS v2 agentic environment

Replit's Agent reads this file as project context. It covers only what differs on Replit. The rules in `CLAUDE.md` apply in full.

## What this branch is

- Branch `replit/agentic-env` is the Replit copy of the agentic system. The Claude Code environment on Windows (branch `feat/homepage-design`, folder `F:\New Github\Growrixosv2`) is separate and is not changed by this branch.
- Agents, commands, skills and templates under `.claude/` are the same as on Windows. Do not fork them here.
- Intended differences only: the hook scripts (`.claude/hooks/*.sh` here, `*.ps1` on Windows) and the hook wiring in `.claude/settings.json`.
- Do not merge this branch into `feat/homepage-design` or `main`. To share a change, cherry-pick one commit, and only after the user approves.

## Requirements

- Node.js and npm, as pinned in `package.json`. Run `npm install` once before the gate.
- `git`.
- `jq`. `pre-bash-guard.sh` blocks every Bash command when `jq` is missing. Check with `which jq`.
- `bash`, used to run every hook (`bash .claude/hooks/<name>.sh`).

## Hooks

| Event                  | Script                 | Behaviour on Replit                                                                                        |
| ---------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| PreToolUse Bash        | `pre-bash-guard.sh`    | Blocks destructive commands and prod deploys without `DEPLOY_PROD_OK=1`. Fails closed without `jq`.        |
| PreToolUse Edit/Write  | `secret-file-guard.sh` | Blocks secret-shaped files. Without `jq` it warns and allows; the `settings.json` deny list still applies. |
| PostToolUse Edit/Write | `post-edit-format.sh`  | Runs prettier and eslint on files inside the repo. Never blocks.                                           |
| UserPromptSubmit       | `state-injector.sh`    | Adds `docs/.state.json` project state to each prompt, if that file exists.                                 |
| Stop                   | `commit-reminder.sh`   | Warns about uncommitted changes. Never blocks.                                                             |
| SessionStart           | `session-boot.sh`      | Prints the project phase banner, if `docs/.state.json` exists.                                             |

The hook scripts are ports of the Windows `.ps1` files. Keep their behaviour the same. If a rule changes, change both sides and log it in the changelog.

## Gates and commands

- Gate: `npm run ci:check`, then `npm run test:e2e`. Playwright needs its browsers installed on Replit first. Not yet verified on Replit.
- Never weaken, skip or delete a test, budget or lint rule to get green.
- Commit with Conventional Commits. Never push to `main`. Never push, PR or deploy without the user's approval.
- Slash commands in `.claude/commands/` are the same as on Windows.

## Secrets

- Put `GITHUB_TOKEN` in Replit Secrets. The `github` MCP server in `.mcp.json` reads it.
- Never create or edit `.env*` files. Only `.env.example` may be written.

## Known gaps on Replit

- `book-mcp` in `.mcp.json` points to a Windows Python path, so it does not start here. Where a rule says to consult book-mcp, mark the fact as "not verified: book-mcp unavailable" unless an official source confirms it.
- The Claude memory folder under the Windows user profile is not available here. Do not rely on it.
- `system-export` runs `export.ps1`, which is PowerShell and does not run here.
- The hooks were checked by running them with bash on Windows Git Bash, not yet inside a Replit container.

## Model and tool notes

- Model choice and limits follow the user's current Claude plan in whichever environment is used. Do not assume the Windows setup is available on Replit.
