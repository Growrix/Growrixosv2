---
description: Show the current project phase, gates passed, and the next action.
---

Do this directly — do not invoke a subagent.

## Step 1 — find the project state

Look for `docs/.state.json` relative to the current working directory. Walk up at most 4 levels if not found at the cwd. If not found anywhere, respond with exactly this and stop:

> **No product in progress here.** Run `/new-product <idea>` to start one, or `cd` into a product directory first (e.g. `cd products/<name>`).

## Step 2 — if state exists, gather context

Run these read-only commands:
- `git branch --show-current`
- `git status --short` (truncate to the first 10 lines if longer)
- If `gh` is installed, `gh pr status --json number,url,state,statusCheckRollup 2>/dev/null`

## Step 3 — report in exactly this shape

Keep the whole response under 15 lines:

```
Project: <state.idea>
Phase:   <state.phase> · <state.phase_label>
Stack:   db=<stack.database.provider>, auth=<stack.auth.provider>, hosting=<stack.hosting.provider>
Branch:  <current branch>
PR:      <PR URL or "none">
CI:      <status or "n/a">
Gates passed: <comma-separated list from state.gates_passed, or "none yet">
Working tree: <"clean" or "N uncommitted change(s)">
Next:    <one sentence — specifically what the user should do or run next, based on current phase>
```

## Rules

- Do NOT run destructive commands. Read-only only.
- Do NOT invoke the Agent tool. Do the work in this session.
- Do NOT advance phases or edit state.
- If the "Next" step is unclear, say "unclear — tell me what you want to do" and list two or three plausible options.
