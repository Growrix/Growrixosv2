---
description: Hand any ongoing task to the senior-dev — a senior web developer that triages, plans, edits small changes itself, delegates the rest to the right sub-agents one at a time, verifies against the project's gates, and reports. Third workflow beside /new-product (build) and /audit-project (audit).
argument-hint: <the task, in your own words>
---

You are handing an ongoing task to the senior web developer.

The task is: **$ARGUMENTS**

If `$ARGUMENTS` is empty, ask the user what the task is and stop.

Invoke the `senior-dev` subagent now with that task, and tell it it is running in **delegated mode**. It must:

1. Run its pre-flight (feature branch, clean tree, read the project's `CLAUDE.md` files).
2. Triage the task as Tier S, M, or L as defined in `.claude/agents/senior-dev.md`.
3. Tier S: carry it through, verify against the project's gates, and report.
4. Tier M/L: stop after the plan and return it ending with `[GATE: user types 'approved']`.

When it returns a plan:
- Show the plan to the user as-is and wait. Do not approve on their behalf.
- On `approved` (or an edited plan), re-invoke `senior-dev` — resume the same agent if possible — with the approved plan text so it starts at Execute. If the user changed the plan, pass the changed version.

Do NOT:
- Start `/new-product` phases or call phase coordinators from here.
- Push, open a PR, or deploy — those stay with the user.
- Edit `.claude/*` — use `/system-builder` for that.

For a long working session in this role, the user can instead start Claude Code with `claude --agent senior-dev`; the agent then runs as the main thread and asks its gate questions inline.
