---
description: Build or refine a single-file HTML prototype of a page so you can see the design before production, or study reference sites with `study <slug> <urls>`. Runs the prototype-builder procedure in this session, opens the result in the browser pane, and screenshots it.
argument-hint: <plan-slug or one-line idea> [feedback] | study <plan-slug> <url> [url] [url]
---

The request is: **$ARGUMENTS**

If `$ARGUMENTS` is empty, ask which plan slug (or idea) to prototype and stop.

Run this in the main session — do not spawn a subagent (the browser pane tools are needed for the screenshot loop). Read `.claude/agents/prototype-builder.md` and follow it exactly, acting as that agent:

- If the first word is `study`, the next word is the slug and the rest are up to 3 URLs: run the agent's reference-study mode and build nothing. The slug folder may not exist yet; create `prototype/` inside it.
- If the first word matches a folder in `docs/frontend-plans/`, that is the slug; any remaining text is feedback for a refinement round.
- Otherwise treat the whole request as a one-line idea: choose a kebab-case slug and write the quick brief first.

After prototype-builder reports a round, run `responsive-auditor` as a sub-agent on `docs/frontend-plans/<slug>/prototype/index.html` with `--matrix core --shots`, and save its output in `prototype/screenshots/round-<n>/`. This is the one exception to the no-subagent rule above: the builder itself still spawns nothing. Pass the auditor's FAIL list to the builder for the next round.

End with the agent's report. Do not run `/plan-ui <slug> finalize` or `/senior-dev` automatically — the user decides.
