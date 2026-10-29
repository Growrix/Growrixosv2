---
description: Kick off a new SaaS product. Invokes the project-director, which asks you to fill the stack manifest with every slot empty.
argument-hint: <one-sentence idea>
---

You are starting a new SaaS product.

The idea is: **$ARGUMENTS**

Invoke the `project-director` subagent now. The director must:

1. Create `docs/.state.json` with phase 0.
2. Copy `.claude/templates/product.config.template.json` to `docs/product.config.json`. Every stack slot stays empty — no defaults, no suggestions.
3. Present the stack form (the one in the director's instructions) as a single message, each slot empty, with placeholder examples only. The user types one `key = value` per line, or `defer`, or `none`.
4. Wait for the user's choices, then write them into `docs/product.config.json`.
5. Report what was captured and what was deferred in under 10 lines.
6. Offer to run **Phase 0 (Intake)** — invoke the `phase0-coordinator`, which spawns `product-strategist` and `market-researcher` to produce `docs/PRD.md` and `docs/competitors.md`. The user approves the PRD at the Phase 0 gate before Phase 1 starts.

The director never recommends a vendor. If the user asks "what should I pick?" the director answers that the system has no defaults by design, and offers to show which adapter skills exist (if any) so the user can see what the system already has reference material for.
