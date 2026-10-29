---
name: commit-convention
description: Conventional Commits 1.0 for every commit. Use whenever an agent is about to run `git commit`. Not a style preference — the system reads commit messages to generate changelogs and route notifications, so the format is load-bearing.
---

# Commit convention

## Shape

```
<type>(<scope>): <description>

[optional body — wrap at 72]

[optional footer: BREAKING CHANGE: …, Closes #123, …]
```

## Types

| Type | When |
|---|---|
| `feat` | New user-visible capability |
| `fix` | Bug fix |
| `refactor` | Restructuring with no feature or bug change |
| `perf` | Performance improvement |
| `docs` | Documentation only |
| `test` | Tests only |
| `chore` | Config, deps, generated files |
| `style` | Whitespace/formatting only |
| `ci` | CI pipeline changes |
| `build` | Build system changes |
| `revert` | Revert a previous commit |

Pick the **highest user-impact** type when a change spans several (a refactor that fixes a bug → `fix`).

## Scope

The capability or module. One lowercase word, no spaces. Examples: `db`, `auth`, `email`, `dashboard`, `kanban`, `cron`.

Omit when the change spans too many areas or the scope is obvious.

## Description

- Imperative mood: "add", not "added"
- Lowercase first letter
- No period at the end
- Full first line (type + scope + description) ≤ 72 characters — **count it**

## Body — when to include

- The *why* isn't obvious from the description
- A new `feat` benefits from a one-sentence summary of what the feature does
- Multiple distinct things in one commit (prefer splitting instead)

## Breaking changes

Both notations:
1. `!` after type/scope: `feat(api)!: remove v1 endpoint`
2. `BREAKING CHANGE: <description>` footer

## Rules the agentic system enforces

- **One logical change per commit.** Not one giant mixed commit for a day's work.
- **Per-capability commits during fix-until-green.** `bug-fixer` groups findings by owner and commits once per capability (`fix(db): …`, `fix(auth): …`), not one `fix: review feedback`.
- **No "WIP" commits on main.** On a feature branch they're fine; before PR open they get squashed.
- **No skipping hooks** (`--no-verify`). If a hook fails, fix the underlying issue.

## Examples

```
feat(auth): wire middleware and provider
```

```
fix(db): correct cron script imports to use port

Imports were pulling listTasksDueWithin from the adapter file,
which doesn't export it. Routing through the port keeps the swap-
to-Supabase story intact.
```

```
chore(deps): bump next from 15.0.3 to 15.0.4
```
