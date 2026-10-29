---
name: pr-template
description: The shape every pull request this system opens. Used by phase2-coordinator when opening the Build-phase PR, and by any agent that opens a PR. Not a formality — the reviewer is often you a week later; this is how you tell past-you what current-you did.
---

# PR template

## Shape

```markdown
## Summary
<1–3 bullets. What landed, in user-visible terms.>

## Why
<One paragraph. The problem this solves and why now. Link the PRD section or issue if applicable.>

## Changes
<Grouped by capability. Example:>
- **db:** added `projects`, `project_members`, `tasks` tables with RLS
- **auth:** wired dev-cookie adapter + middleware; `?as=` user switch
- **ui:** Beside tokens + 12 primitives
- **features:** Kanban board, calendar, analytics, collaboration

## Test plan
- [ ] `npm install && npm run dev` — landing renders
- [ ] <specific manual steps the reviewer can run>
- [ ] <automated tests that must pass>
- [ ] <cross-browser if relevant>

## Screenshots
<Blank at PR open — Phase 3 (quality) fills these in.>

## Deferred / known limitations
- <intentionally skipped, with reason>
- <known rough edges>

## Follow-ups
- <issue to open after merge>
- <next PR this unblocks>

## Attribution
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Rules

- **Summary ≠ Changes.** Summary is for the person deciding whether to review; Changes is for the person doing the review.
- **Test plan is checkboxes, not prose.** The reviewer should be able to tick them off.
- **No "see commits" test plan.** List the actual verifications.
- **Deferred items are deferred, not hidden.** If the PR intentionally skips something the PRD required, name it.
- **One screenshot per feature, not twenty.** Phase 3 adds them; don't preempt.
- **Link the PRD and architecture doc** when they exist. The PR shouldn't duplicate them.
- **Attribution lines go at the bottom**, as the system reminder specifies.

## Breaking changes

If the PR breaks something, add a dedicated section at the top:

```markdown
## ⚠ Breaking change

**What breaks:** <specific>
**Migration path:** <steps>
```
