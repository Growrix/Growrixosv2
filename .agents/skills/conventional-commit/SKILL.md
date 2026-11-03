---
name: conventional-commit
description: Generates and applies git commit messages following the Conventional Commits 1.0.0 specification. Use this skill whenever the user wants to commit staged changes, write a commit message, or says anything like "commit this", "git commit", "write a commit message", "commit my changes", "save to git", or "make a commit". Also use it proactively when the user has just finished implementing a feature or fix and it's natural to commit — don't wait for an explicit ask if the context makes it clear they're ready to commit.
---

# Conventional Commit

Generate and apply commit messages following the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) spec.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

Pick the type that best describes the **primary intent** of the change:

| Type | When to use |
|------|-------------|
| `feat` | New feature or capability visible to users/callers |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Whitespace, formatting, semicolons — no logic change |
| `refactor` | Restructuring — no new features or bug fixes |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration |
| `chore` | Maintenance (version bumps, config tweaks, generated files) |
| `revert` | Revert a previous commit |

When a change spans multiple types, choose the one with the highest user impact (e.g., a refactor that also fixes a bug → `fix`).

## Scope

An optional noun in parentheses describing the affected area:
- Use a module, package, component, or route name (e.g., `auth`, `api`, `checkout`, `ui`)
- Lowercase, concise, no spaces
- Omit if the change spans too many areas or the scope is obvious from the description

## Description

- Imperative mood: "add feature" not "added" or "adds"
- Lowercase first letter
- No period at the end
- First line (type + scope + description) ≤ 72 characters total
- Answers: "if applied, this commit will ___"

## Body

Include a body when any of these apply:
- The *why* isn't obvious from the description (a non-obvious trade-off, a constraint, fixing a subtle bug)
- It's a new `feat` that benefits from a one-sentence summary of what the feature does — callers reading the log shouldn't have to diff the code to understand it
- Multiple distinct things changed in one commit

Skip the body for simple, mechanical changes where the description tells the whole story (e.g., `chore(deps): bump lodash to 4.17.21`, `style: fix indentation in auth module`).

Format:
- What changed and why (not how — the code shows that)
- Wrap lines at 72 characters
- Separate from the description with a blank line

## Breaking changes

Two notations — use both for clarity:
1. Append `!` after type/scope: `feat(api)!: remove deprecated endpoint`
2. Add a `BREAKING CHANGE: <description>` footer explaining what broke and how to migrate

## Workflow

1. **Check what's staged.** Run `git diff --cached --stat` for a summary, then `git diff --cached` for the full diff.
2. **If nothing is staged**, run `git status` to see what's modified. Offer to stage all with `git add -A` or ask the user what to include.
3. **Analyze the diff.** What files changed? What was added/removed? What problem does this solve? What's the intent?
4. **Choose type and scope.** When uncertain between two types, prefer the one reflecting user-visible impact.
5. **Write the description.** One line answering "this commit will…" — imperative, lowercase, no trailing period.
6. **Count the first line.** The full `type(scope): description` string must be ≤ 72 characters. Count it — do not estimate. If it's over, shorten the description (drop redundant words, use a tighter verb) until it fits. The 72-char rule exists because many git tools truncate at exactly that point.
7. **Decide on a body.** Use the Body guidance above.
8. **Check for breaking changes.**
9. **Present the message** to the user before committing.
10. **On approval**, run the commit using a heredoc to preserve multi-line formatting:

```bash
git commit -m "$(cat <<'EOF'
type(scope): description

Optional body here.

Optional footer.
EOF
)"
```

11. **Show the result**: commit hash, files changed, and insertions/deletions.

## Examples

**Simple feature:**
```
feat(auth): add remember-me option to login form
```

**Bug fix with body:**
```
fix(api): return 404 instead of 500 for missing user

The user lookup was throwing an unhandled exception when the ID
didn't exist in the database. Replaced with an explicit 404
response so clients can distinguish "not found" from server errors.
```

**Breaking change:**
```
feat(api)!: require authentication on all /v2 endpoints

Previously, read-only /v2 endpoints were publicly accessible.
They now require a valid Bearer token.

BREAKING CHANGE: All /v2 API calls must include an Authorization
header. Update clients to pass `Authorization: Bearer <token>`.
```

**Dependency bump:**
```
chore(deps): bump stripe from 12.3.0 to 13.0.1
```

**Refactor with explanation:**
```
refactor: extract shared validation logic into lib/validate.ts

The same email and phone validation patterns were duplicated
across four form handlers. Centralizing them reduces divergence
risk and makes the logic easier to test independently.
```
