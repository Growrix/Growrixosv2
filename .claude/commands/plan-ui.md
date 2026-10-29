---
description: Hand a frontend planning task to the site-planner — art direction, tokens, sitemap, page and section plans, wireframes, content schemas, motion specs and QA budgets for a site, page, section or redesign. Plans only; the finished plan is built afterwards with /senior-dev.
argument-hint: <what to plan, e.g. "plan the pricing page" or "redesign the home hero">
---

You are handing a frontend planning task to the senior frontend planner.

The request is: **$ARGUMENTS**

If `$ARGUMENTS` is empty, ask the user what to plan (a full site, a page, a section, or a redesign) and stop.

Invoke the `site-planner` subagent now with that request, and tell it it is running in **delegated mode**. It runs its pre-flight, resolves the mode, and stops only where its stop rule says to. If the user's request or reply says "use defaults" (or "defaults"), pass those words through verbatim — the planner then answers its own brief questions with their defaults and stops only on a true blocker.

Relay loop — repeat until the planner returns its final report:

- **`[GATE: user types 'approved']`** — show the planner's output to the user as-is and wait. Do not approve on their behalf. On `approved`, answers to the brief questions, or edits, re-invoke `site-planner` (resume the same agent if possible) with the user's reply verbatim so it continues from that gate.
- **`[CRITIC NEEDED: docs/frontend-plans/<plan-slug>/]`** — spawn a **fresh** `Explore` agent (never the planner, never with the planner's reasoning) using the Critic prompt in `.claude/skills/site-planning-playbook/SKILL.md` §7, with `<plan-slug>` filled in. Pass its findings table back to the planner verbatim so it writes `94-critique.md` and runs Gate 4.
- **Final report** — show it to the user, including the open decisions and the handover line:

  ```
  /senior-dev implement docs/frontend-plans/<plan-slug>/INDEX.md
  ```

Do NOT:

- Run `/senior-dev` or any build agent automatically — the user decides when to build.
- Write code, install packages, push, open a PR, or deploy.
- Edit plan files yourself, or edit `.claude/*` — use `/system-builder` for that.

For a long planning session the user can instead start Claude Code with `claude --agent site-planner`; the planner then runs as the main thread, asks its gate questions inline, and spawns the Critic itself.
