---
description: Full senior-web-dev audit of an existing (or newly built) project. Runs project-auditor + 8 specialist auditors sequentially, pools findings by severity, hands user the triage decision, delegates approved fixes via bug-fixer. Works on any project you've copied .claude/ into.
argument-hint: [optional URL for live-site audits]
---

You are kicking off a full project audit. **Do not spawn parallel subagents** — Phase-3 experience showed nested parallel orchestration blows the token budget. Run auditors sequentially.

## Pre-flight

1. Confirm you're on a feature branch, not `main`/`master`. If on main, STOP and ask the user to switch to or create a feature branch (`git checkout -b audit/<date>`).
2. Confirm the current working directory is the project root (not inside `.claude/` or a subdir).
3. If `$ARGUMENTS` includes a URL, remember it for the live-site auditors (performance, a11y, seo).

## Phase A — Survey

Invoke `project-auditor` first. It writes `docs/.audit-state.json` + `docs/project-survey.md`. **Wait for it to complete** before continuing.

Read `docs/.audit-state.json`. The `audits_recommended` array tells you which specialists to run.

## Phase B — Run specialist auditors sequentially

For each specialist in `audits_recommended`, invoke the matching agent **one at a time** (not parallel). After each, append its output path to a running list.

Mapping:
- `security` → `security-auditor`
- `code-quality` → `code-reviewer` (with `/code-review` skill)
- `performance` → `performance-auditor` (needs URL)
- `dependencies` → `dependency-auditor`
- `consistency` → `consistency-auditor`
- `docs` → `docs-auditor`
- `seo` → `seo-optimizer` (needs URL)
- `a11y` → `accessibility-checker` (needs URL)
- `tests` → `test-writer --audit` (audit mode, no new tests written)

After each specialist finishes, print a one-line status: `✓ <specialist> → <report file> (findings: <counts by severity>)`.

## Phase C — Pool findings

Collect every `docs/reports/*-<timestamp>.md` written in Phase B. Build one combined matrix:

```
# Audit summary — <date>

## Critical (fix now or do not deploy)
- [security] <summary> → see security-*.md
- [performance] <summary> → see performance-*.md
...

## High (fix this sprint)
...

## Medium (fix soon)
...

## Low (polish)
...
```

Write this to `docs/reports/audit-summary-<ISO-timestamp>.md`.

## Phase D — Human gate

Show the user:
1. The summary matrix (Critical + High counts first)
2. The question: **which categories do you want to fix now?** (Critical only? Critical + High? Everything?)
3. Wait for an answer.

Do **not** proceed to Phase E without a direct user choice.

## Phase E — Fix loop

For the categories the user approved:
1. Build a findings pool from those categories (file, line, failure scenario per finding).
2. Invoke `bug-fixer` with that pool. It will group by owning capability-dev and delegate.
3. The bug-fixer loop runs up to 5 iterations as usual.

## Phase F — Verify + report

After `bug-fixer` closes:
1. Re-run the auditors the user approved. Verify findings count dropped.
2. Compare before/after for each category.
3. Write `docs/reports/audit-close-<timestamp>.md` with the delta.
4. Report back in ≤ 10 lines: audits run, findings fixed per category, anything remaining, commit SHAs.

## Rules

- **Do NOT run parallel auditors.** Sequential only. Learned from Phase 3's budget-exit failure.
- **Do NOT auto-fix anything before Phase D (user approval).**
- **Do NOT merge or deploy anything.** Audits produce reports and fixes on a branch; the user merges.
- **Skip audits that don't apply.** `audits_recommended` from `project-auditor` is the source of truth. Don't run SEO on an internal tool, etc.
- **If the project has no `.claude/.audit-state.json` yet**, Phase A is mandatory. Don't skip the survey — downstream auditors depend on it.
- **If any Critical finding would be dangerous to auto-fix** (e.g. "committed secret in git history" needs secret rotation + git filter-repo), DO NOT include it in the auto-fix pool. Surface it as a human-only action.
