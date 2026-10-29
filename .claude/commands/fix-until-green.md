---
description: Run code-review → fix → re-review until clean or 5-iteration budget hits. Vendor-neutral; works on whichever product's working tree you're in.
---

Invoke the `bug-fixer` subagent now. It must:

1. Confirm the current branch is NOT `main`/`master`. If it is, stop and tell the user to switch to a feature branch first.
2. Run the fix-review loop as defined in `.claude/agents/bug-fixer.md`:
   - Review via `/code-review` (and run tests if available)
   - Group findings by owning capability
   - Delegate each group to the right capability-dev with a precise brief
   - Commit per capability (Conventional Commits)
   - Re-review
   - Loop until clean, max 5 iterations
3. Report back:
   - If clean: iteration count, total findings fixed, grouped per capability.
   - If budget exit: top remaining findings and the pattern (recurring, regressing, scope creep, test-wrong).

Do NOT:
- Apply fixes to the agentic control plane (`.claude/*`, root `CLAUDE.md`). Only the product tree.
- Push or open a PR — that remains the coordinator's or the user's responsibility.
- Weaken or disable tests to make them green.
