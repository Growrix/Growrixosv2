---
description: After a project ships, mine the capability-dev reports for adapter-skill material. Vendor-neutral by design.
---

Invoke the `project-director` subagent. The retrospective step runs after a product is live. The director must:

1. Read `docs/product.config.json` to see which vendors this product used.
2. For each capability with a provider (not `defer`, not `none`):
   a. Check if `.claude/skills/adapters/<capability>/<provider>.md` exists.
   b. Read `docs/reports/<capability>-dev.md` (the capability-dev's final report from Phase 2).
   c. If no adapter skill exists for that vendor, draft one from the report. The draft includes:
      - Frontmatter with `name: adapter-<capability>-<provider>` and a description that triggers when the manifest picks this vendor
      - Env vars list
      - Port shape (functions the adapter must implement — copy from `lib/<capability>/index.ts`)
      - Setup steps (CLI commands, dashboard config, DNS records if any)
      - At least one worked example (upload a file, send an email, create a checkout — whatever fits the capability)
      - Known gotchas the capability-dev hit this project
3. If an adapter skill already exists for a vendor used this project, read it and compare against this project's report. If anything in the report contradicts or improves the existing skill, propose an edit.
4. Show every draft and edit to the user before writing. The user approves each one individually. Rejected drafts are discarded; no silent writes.
5. Record approved drafts under `.claude/skills/adapters/<capability>/<provider>.md`.
6. Append a one-line note to each shipped product's `docs/retrospective.md`: date, which skills were created or updated, which were skipped and why.

Do not propose a skill for a vendor the system has never seen used in this product. Do not invent patterns that aren't in the report; if the report is thin, say so and ask the user to flesh it out before drafting.
