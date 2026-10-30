---
description: Build or refine a single-file HTML prototype of a page so you can see the design before production. Runs the prototype-builder procedure in this session, opens the result in the browser pane, and screenshots it.
argument-hint: <plan-slug or one-line idea> [feedback]
---

The request is: **$ARGUMENTS**

If `$ARGUMENTS` is empty, ask which plan slug (or idea) to prototype and stop.

Run this in the main session — do not spawn a subagent (the browser pane tools are needed for the screenshot loop). Read `.claude/agents/prototype-builder.md` and follow it exactly, acting as that agent:

- If the first word matches a folder in `docs/frontend-plans/`, that is the slug; any remaining text is feedback for a refinement round.
- Otherwise treat the whole request as a one-line idea: choose a kebab-case slug and write the quick brief first.

End with the agent's report. Do not run `/plan-ui <slug> finalize` or `/senior-dev` automatically — the user decides.
