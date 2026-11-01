# system-builder changelog

**Read this first.** This file is `system-builder`'s fast starting point — any session picking up the agentic system reads this before walking the live `.claude/` tree. It gives you a baseline and a dated history so you can skip re-deriving everything from scratch.

Format: a **baseline snapshot** at the top (the system's shape at a known moment), then **changes** below, grouped by date, newest first. Each change entry has: type, scope, name, one-line reason, commit SHA.

The audit step (`system-builder` Step 1) reads this file first. If the file disagrees with the live tree, the live tree wins and `system-builder` reconciles the two before proposing anything new.

---

## Baseline snapshot — 2026-10-31

Anything before this date is captured by git history and the Changes section; anything after is logged below. Counts come from the live tree.

### Agents (49 total)

- **Orchestration (2):** `project-director`, `senior-dev`
- **Phase coordinators (6):** `phase0-coordinator`, `phase1-coordinator`, `phase2-coordinator`, `phase3-coordinator`, `phase4-coordinator`, `phase5-coordinator`
- **Phase 0 Intake — greenfield (3):** `product-strategist`, `market-researcher`, `risk-assessor`
- **Phase 0 Intake — existing project (1):** `project-auditor`
- **Phase 1 Design (5):** `system-architect`, `db-schema-designer`, `api-designer`, `ux-designer`, `threat-modeler`
- **Frontend planning (2):** `site-planner`, `prototype-builder`
- **Phase 2 Build — capability-devs (12):** `frontend-dev`, `ui-dev`, `api-dev`, `database-dev`, `auth-dev`, `email-dev`, `payments-dev`, `storage-dev`, `monitoring-dev`, `compliance-dev`, `feature-flag-dev`, `i18n-dev`
- **Phase 3 Quality — core (6):** `test-writer`, `code-reviewer`, `security-auditor`, `accessibility-checker`, `bug-fixer`, `load-tester`
- **Phase 3 Quality — audit specialists (4):** `performance-auditor`, `dependency-auditor`, `consistency-auditor`, `docs-auditor`
- **Phase 4 DevOps (4):** `ci-cd-engineer`, `hosting-dev`, `migration-runner`, `infra-dev`
- **Phase 5 Growth (4):** `seo-optimizer`, `content-writer`, `analytics-reporter`, `support-triager`

### Skills (15 folders, plus `adapters/`)

- **Cross-cutting:** `commit-convention`, `conventional-commit`, `pr-template`, `document-project`, `migration-safety-checklist`, `preview-deploy-smoke-test`, `rate-limit-pattern`, `error-boundary-pattern`, `error-handling-policy`, `frontend-quality-standard`
- **Strategy:** `observability-strategy`, `backup-dr-plan`
- **Planning:** `site-planning-playbook`
- **Meta:** `system-builder` (this skill), `system-export`
- **Adapter library** at `.claude/skills/adapters/` — README only; grows via `/retrospective` after each shipped product (no vendor-named skills baselined)

### Manifest schema (`.claude/templates/product.config.template.json`)

Wave 2 added three slots: `feature_flags.provider`, `i18n.provider` (+ `default_locale`, `locales`, `future_locales`), `infra.provider`.

### Hooks (6 total)

- `pre-bash-guard` on `PreToolUse(Bash)` — blocks destructive commands + un-approved prod deploys
- `secret-file-guard` on `PreToolUse(Edit|Write)` — blocks edits to `.env*`, `*.pem`, `credentials.json`, keys
- `post-edit-format` on `PostToolUse(Edit|Write)` — auto prettier + eslint
- `state-injector` on `UserPromptSubmit` — appends current project phase/stack to prompts
- `commit-reminder` on `Stop` — warns on uncommitted changes
- `session-boot` on `SessionStart` — reads `docs/.state.json`, prints status banner

### Commands (9 total)

- `/new-product <idea>` — kicks off Phase 0 for a new SaaS idea (greenfield)
- `/audit-project [url]` — full senior-dev audit for an existing project
- `/senior-dev <task>` — ongoing work on an existing project
- `/plan-ui <request>` — frontend planning through `site-planner`
- `/prototype <slug>` — single-file HTML prototype, and `study` for reference sites
- `/status` — current project phase + branch + PR + CI
- `/fix-until-green` — code-review → fix → re-review loop (max 5 iterations)
- `/retrospective` — mines capability-dev reports into vendor-adapter skills post-ship
- `/triage` — classifies inbound GitHub issues

### MCP servers (control-plane, 2)

- `github` — PRs, issues, Actions
- `book-mcp` — "Mastering Claude Code" Bangla course reference (local, user-added)

Vendor-specific MCPs (Neon, Supabase, Clerk, Stripe, etc.) are **per-product** — added to each product's own `.mcp.json`, not here.

### Products built with the system

None in this repository. It holds the Growrix OS v2 marketing site.

---

## Changes (newest first)

### 2026-11-01 — Responsive design system

- `feat(skills)` **responsive-design-standard** — one standard for every device tier and height: matrix from phone-320 to desktop-1920 with landscape phones and short laptops, app-like phone patterns P1–P9, pin and fallback rules, measured gates G1–G11, and `scripts/responsive-audit.mjs`. _[commit `e5e27b5`]_
- `feat(agents)` **responsive-architect** — plans per-tier layout, app-like patterns, pin thresholds and fallbacks in `docs/frontend-plans/<slug>/responsive.md`. Plans only. _[this commit]_
- `feat(agents)` **responsive-auditor** — measures gates G1–G8 and G10 at each matrix tier; reports PASS or FAIL with evidence; never edits. _[commit `2073749`]_
- `feat(agents)` **site-planner, prototype-builder, ui-dev, frontend-dev, senior-dev, /prototype** — wired the responsive standard in: planner spawns responsive-architect (rule changed from one Agent use to two); builders preload the standard; senior-dev verify runs responsive-auditor; /prototype runs the auditor after each round. _[this commit]_

### 2026-10-31 — Creative planning upgrade

#### Rebaseline — 2026-10-31

- `chore(skills)` **changelog baseline** — Supersedes the 2026-10-21 baseline, which said 46 agents, 11 skills and 6 commands. Live tree: 49 agents, 15 skill folders plus `adapters/`, 9 commands, 6 hooks. `products/` is no longer in this repository. _[this commit]_

#### Changes

- `feat(skills)` **site-planning-playbook** — Contract change, confirmed by the user: creative runs always ask boldness and motion intensity, and "use defaults" no longer answers them. The rejected concept A took a silent 2. _[this commit]_
- `feat(skills)` **site-planning-playbook** — Stage A needs at least 3 named concepts with rejected reasons, one signature moment per section, and a Not-plain check; refusal list extended. Critic prompt now covers screenshots. Deviations 16–23 added; Motion Choreographer in Stage A is deviation 16, because `references/` stay unedited. _[this commit]_
- `feat(skills)` **site-planning-playbook** — Contract change, confirmed by the user: no production rule binds Stage A or the prototype, Stage A writes draft copy and prototype-ready detail, and Stage B is the hard gate that opens with prototype reconciliation (`KEEP` / `ADAPT` / `USER DECISION`) and full Gates 1–2. _[this commit]_
- `feat(agents-ext)` **prototype-builder** — Builds the plan exactly with any CDN library. Adds reference-study mode (principles only), fixed scroll-state screenshots, a visual QA checklist and the fixed review question. The silent "motion intensity (default 2)" in quick briefs is gone. _[this commit]_
- `feat(skills)` **scroll-capture.mjs** — Saves checkpoints to disk with the project's Playwright, because browser-pane screenshots never reach a file the Critic can read. Installs nothing. _[this commit]_
- `feat(agents-ext)` **site-planner** — `effort: high` (Opus 5.5 defaults to `medium`), Stage A rules, a report that lists concepts, and no-browser rule. _[this commit]_
- `feat(commands)` **/prototype**, **/plan-ui** — `study` mode; "use defaults" text matches the new rule. _[this commit]_
- `docs(skills)` **system-builder** — The frontmatter invariant now allows `effort` on agents, which is documented at code.claude.com/docs/en/sub-agents. _[this commit]_
- `chore(docs)` **cross-refs** — Root `CLAUDE.md` has no counts, no README inventory exists, and no Blueprint artifact URL is on record, so none changed. _[this commit]_

### 2026-10-30 — Frontend flow: creative → prototype → production

- `fix(agents)` **site-planner** — The new description had a `: ` inside a plain YAML scalar, which made the agent fail to load; replaced with an em dash. _[this commit]_

- `feat(agents)` **prototype-builder** — Single-file HTML prototype (Tailwind Play CDN, GSAP + ScrollTrigger, real copy, labelled placeholders, both themes) under `docs/frontend-plans/<slug>/prototype/`, with a browser-pane screenshot loop and a `CHANGES.md` per refinement round. The homepage build looked like a wireframe because no visual approval existed before the production spec. _[this commit]_
- `feat(commands)` **/prototype** — Runs the prototype-builder procedure in the main session, not as a subagent: browser-pane access from a subagent is unverified (sub-agents doc page could not be read in full; book-mcp silent). _[this commit]_
- `refactor(skills)` **frontend-quality-standard** — `site-planning-playbook/references/quality-standard.md` moved (not copied) into its own skill so builders apply it by default with or without a plan. References updated in the playbook (loading table, §1.10, Critic prompt) and `redesign-module.md`. _[this commit]_
- `feat(skills)` **site-planning-playbook** — New §3a: Stage A (creative: brief, art direction, tokens, page creative plan, motion spec) → `/prototype` → Stage B (`finalize`: production questions, stack, schemas, wireframes, budgets, Critic, INDEX). Intake always asks motion intensity and boldness with the scale shown, plus visual references. Content defaults to local data files; CMS is a later slice. INDEX handover names the prototype as visual reference. Deviations 14–15. _[this commit]_
- `feat(agents)` **site-planner** — Stage selection in pre-flight; separate Stage A and Stage B reports. `/plan-ui` relays the Stage A report with the `/prototype` next step. _[this commit]_
- `feat(agents-ext)` **senior-dev**, **ui-dev**, **frontend-dev** — Load `frontend-quality-standard` by default for frontend work; senior-dev builds from local content files, screenshots each UI slice against the prototype, and shows labelled placeholders in `next dev` only; routing row offers `/prototype`. _[this commit]_
- `chore(docs)` **cross-refs** — Root `CLAUDE.md` is now the product's rules file (no Agentic-system counts), no README inventory exists, and the SaaS Factory Blueprint artifact URL is not on record, so none were updated. Live tree after this change: 49 agents, 15 skills, 9 commands, 6 hooks. _[this commit]_

### 2026-10-29 — Language rule

- `docs(skills)` **system-builder** — Adds a Language section: Bangla for user-facing talk, English for everything written into the system. Scoped to this skill only. _[this commit]_
- `docs(skills)` **system-builder validation rule** — Adds a hard rule: facts about Claude Code must be checked against book-mcp, official docs, or web search; unverified claims are labelled. _[this commit]_

### 2026-10-28 — System export

- `feat(skills)` **system-export** — Copies the reusable `.claude/` system to any destination root. Dry run first; overwrites and deletions only on approval; excludes project-only files (`CLAUDE.md`, `.mcp.json`, `launch.json`, worktrees). _[this commit]_

### 2026-10-27 — Frontend planning workflow

- `refactor(agents)` **rename the planning trio** — `/frontend-plan` → `/plan-ui`, `senior-frontend-planner` → `site-planner`, `frontend-planning` skill → `site-planning-playbook`. The three names shared one stem and read as duplicates in the skill list. References are updated in `senior-dev`, the renamed files and `CLAUDE.md`. The output folder stays `docs/frontend-plans/`. Older entries below keep the old names as history. _[this commit]_

- `fix(skills)` **frontend-planning (round 2)** — User decisions after the `cta-band-v2` re-test. The mode now comes from the user's "new" or "existing" (no detection grep). The accessibility and quality floor is a fixed senior-frontend baseline (§1.10), never asked. A read-scope consent rule (§2) blocks reading other plans or anything outside the mode's file list without the user's OK. `INDEX.md` is created only after all planning files and is maintained on every update with a Revision log (§9). Deviations 6 and 11–13 updated or added. Proposed-decision handling is left to the agent. _[this commit]_
- `fix(agents)` **senior-frontend-planner** — Pre-flight and rules follow the round-2 skill changes. _[this commit]_
- `fix(agents-ext)` **senior-dev** — Plan handover starts from `INDEX.md` and stops if it disagrees with the plan files' headers. _[this commit]_

- `fix(skills)` **frontend-planning** — Closes 8 gaps the first smoke test (`/frontend-plan plan a CTA band section`) reported. Adds a mode → file-set table, field sets per mode, a Gate 1 stop rule plus "use defaults", mode resolution (M4 is the default when an implementation exists, asked rather than treated as a blocker), a `PROJECT (path)` source tag, a status lifecycle with a gate → file table, and staged section-level reference loading. A Blueprint deviations table (§10) lists every override; `references/` stay verbatim. _[this commit]_
- `fix(agents)` **senior-frontend-planner** — Pre-flight reads SKILL.md only, resolves the mode first and scopes project reading by mode. `Agent` is used only for the main-thread Critic; WebFetch/WebSearch fall back to `MANUAL-FALLBACK` when they aren't available in the session. _[this commit]_
- `fix(commands)` **/frontend-plan** — Passes "use defaults" through to the planner. _[this commit]_
- `fix(agents-ext)` **senior-dev** — Verify step reads the "Budgets and QA" block of `sections/<slug>.md` for section plans, which have no `90`/`93` files. _[this commit]_

- `feat(agents)` **senior-frontend-planner** — UI/UX planning agent built from the UI/UX Planning Agent Blueprint v1.0. Plans a full site, page, section, section redesign or site redesign; writes a gated plan set to `docs/frontend-plans/<slug>/`; never writes code (no Bash). The blueprint's sub-agents are role steps inside one agent; only the Critic runs in a fresh `Explore` context. _[this commit]_
- `feat(skills)` **frontend-planning** — Procedure (shared rules, project-reality overrides, modes, run order, gates, Critic protocol, Build handover) plus `references/` holding blueprint Parts A–H verbatim. _[this commit]_
- `feat(commands)` **/frontend-plan** — Entry point. Gate relay like `/senior-dev`, and spawns the independent Critic when the planner returns `[CRITIC NEEDED]`. _[this commit]_
- `feat(agents-ext)` **senior-dev** — Additive only: "Frontend plan handover" section (accept only a final plan, plan is the spec, lane mapping, dependency decisions, verify with `90`/`93`), a routing row offering `/frontend-plan`, and a hard rule against editing plan files. Triage, delegation and gates unchanged. _[this commit]_
- `feat(agents-ext)` **frontend-dev**, **ui-dev**, **ux-designer** — One sync rule each: plan files named in a brief are the spec; report gaps instead of inventing; ux-designer doesn't duplicate a plan's component inventory. _[this commit]_
- `chore(skills)` **creative-brief removed** — Untracked and never logged drift. It depended on `stack.lock.json` and `/new-project`, neither of which exists here, and it overlapped the planner's Style Director role. Removed from `.claude/skills/` at the user's request (moved out of the repo, not deleted). _[this commit]_
- `chore(docs)` **CLAUDE.md** — Counts 47→48 agents, 12→13 skills, 7→8 commands; names `/frontend-plan` and the handover to `/senior-dev`. The SaaS Factory Blueprint HTML artifact (no URL on record) and the README inventory (no inventory block exists) were not updated, by user decision. _[this commit]_

### 2026-10-22 — Ongoing-work workflow

- `feat(agents)` **senior-dev** — Orchestration agent for ongoing work on an existing project; the third workflow beside `/new-product` and `/audit-project`. Triage Tier S/M/L, route to existing lane agents sequentially, hybrid edit policy, brownfield context packet, gates before "done". _[this commit]_
- `feat(commands)` **/senior-dev** — Entry point. Two-pass (plan gate, then execute) because a subagent cannot converse mid-run. _[this commit]_
- `chore(docs)` **CLAUDE.md** — counts 46→47 agents, 6→7 commands; names `/senior-dev` as the day-to-day entry point. _[this commit]_
- `chore(skills)` **drift reconciliation** — live tree has 12 skills (baseline said 11: `conventional-commit` and `document-project` were never logged) and empty `.claude/{rules,output-styles,workflows}/`. Live tree wins. _[this commit]_

### 2026-10-21 — Wave 2 (senior-dev P1 gap closure)

- `feat(agents)` **load-tester** — Phase 3 Quality agent for k6/Artillery load testing against preview URL. Verifies SLOs from `architecture.md`. Writes `docs/reports/load-<timestamp>.md`. Never runs against prod without explicit `LOAD_TEST_PROD_OK=1 approved`. _[this commit]_
- `feat(agents)` **feature-flag-dev** — Phase 2 capability-dev. Reads `manifest.feature_flags.provider`. Writes `lib/flags/index.ts` port + vendor adapter. Fail-safe to false; flags older than 90 days are tech debt. _[this commit]_
- `feat(agents)` **i18n-dev** — Phase 2 cross-cutting agent. Reads `manifest.i18n.provider`. Scaffolds port + `messages/*.json` + `app/[locale]/` structure **even in English-only mode** so retrofit is one file, not a refactor. _[this commit]_
- `feat(agents)` **infra-dev** — Phase 4 DevOps agent. Reads `manifest.infra.provider` + `manifest.hosting.provider`. No-op for managed hosts (Vercel/Netlify/Fly); writes IaC under `infra/<provider>/` for AWS/GCP/self-hosted. State never on laptop; secrets never in `.tf` files; destroy requires manual approval. _[this commit]_
- `feat(skills)` **error-handling-policy** — Cross-cutting rulebook. Error classification (user-recoverable / business / transient-system / permanent-system), retry decision tree with idempotency rules, user-facing message format, monitoring capture + context stripping, error-boundary placement. Hard bans: empty catch blocks, swallowed errors, `console.error`, `alert()`, auto-retry of non-idempotent ops without idempotency keys. Loaded by every capability-dev in Phase 2. _[this commit]_
- `feat(agents-ext)` **phase2-coordinator** — now conditionally spawns `feature-flag-dev` and `i18n-dev` when their manifest slots have a provider other than `none`. _[this commit]_
- `feat(agents-ext)` **phase3-coordinator** — now spawns `load-tester` as part of the Quality fan-out. Dispatch switched from parallel to sequential (parallel exceeded subagent token budget). _[this commit]_
- `feat(agents-ext)` **phase4-coordinator** — now runs `infra-dev` BEFORE `migration-runner` and `hosting-dev` so cloud resources exist before code ships. IaC plan output included in the human gate; IaC apply happens under the same prod-deploy approval. _[this commit]_
- `feat(templates)` **product.config.template.json** — adds `feature_flags`, `i18n` (with `default_locale`, `locales`, `future_locales` nested), and `infra` manifest slots. _[this commit]_
- `feat(agents-ext)` **project-director** — stack form expanded to prompt for `feature_flags`, `i18n`, `infra` at `/new-product`. _[this commit]_

### 2026-10-21 — Wave 1 (senior-dev gap closure)

- `feat(agents)` **risk-assessor** — Phase 0 agent that writes `docs/risks.md` (technical, legal, scope, vendor, operational risks with likelihood × impact → P0/P1/P2 priority). Invoked by `phase0-coordinator` sequentially after `product-strategist` + `market-researcher`. _[this commit]_
- `feat(agents)` **threat-modeler** — Phase 1 agent that STRIDE-walks the architecture and writes `docs/threat-model.md`. Invoked by `phase1-coordinator` after architecture + schema land. _[this commit]_
- `feat(agents)` **compliance-dev** — Phase 2 capability-dev that writes draft privacy policy, ToS, cookie consent flow, data-flow doc, retention policy. Fires when `auth.provider !== "none"` or any legal risk was flagged. _[this commit]_
- `feat(skills)` **observability-strategy** — the plan for what to measure, when to alert, and who to wake up. Used by `system-architect` (Phase 1) + `monitoring-dev` (Phase 2) + `phase4-coordinator` (Phase 4 gate). _[this commit]_
- `feat(skills)` **backup-dr-plan** — RPO/RTO/what-to-back-up/where/restore-drill plan. Used by `system-architect` + `migration-runner` + `hosting-dev` + `phase4-coordinator` gate. _[this commit]_
- `feat(agents-ext)` **system-architect** — now REQUIRES Observability + Backup+DR + Capacity + Threat-model-summary sections in `docs/architecture.md`. Each has its own skill reference. _[this commit]_
- `feat(agents-ext)` **phase0-coordinator** — now sequentially spawns risk-assessor alongside strategist + researcher; surfaces P0 risks at the Phase 0 gate. _[this commit]_
- `feat(agents-ext)` **phase1-coordinator** — now sequentially spawns threat-modeler after architecture + schema land. _[this commit]_
- `feat(agents-ext)` **phase2-coordinator** — now conditionally spawns compliance-dev when auth is wired or legal risks exist. _[this commit]_
- `feat(agents-ext)` **phase4-coordinator** — added Pre-prod observability + DR gate (step 5) that verifies alerts configured, runbooks exist, on-call set, backups within RPO, restore drill scheduled. Blocks deploy gate if any check fails. _[this commit]_

### 2026-10-21 — Audit roster

- `feat(agents)` **project-auditor**, **performance-auditor**, **dependency-auditor**, **consistency-auditor**, **docs-auditor** — five new audit specialists for existing-project intake + comprehensive site audit. Each writes a severity-ranked `docs/reports/*-<timestamp>.md` and modifies no code. _[this commit]_
- `feat(agents-ext)` **security-auditor** — extended with HTTP header checks (CSP/HSTS/X-Frame-Options), cookie-flag audit, CORS misconfig scan, dependency-CVE cross-reference, and secrets-in-git-history grep. _[this commit]_
- `feat(agents-ext)` **code-reviewer** — extended with ts-prune (dead code), jscpd (duplication), cyclomatic-complexity sweep (threshold 15), and swallowed-error grep. _[this commit]_
- `feat(agents-ext)` **test-writer** — added `--audit` mode that reports coverage + flaky-test flags + PRD-criteria coverage gaps without writing new tests. _[this commit]_
- `feat(commands)` **/audit-project** — orchestrator for existing-project audits. Sequential (not parallel) specialist invocation to stay within budget. Pools findings, waits for user triage, delegates approved fixes to bug-fixer. _[this commit]_
- `feat(skills)` **system-builder** — the self-maintenance skill itself. 12-step workflow with audit → classify → duplicate-check → place → consult (Claude Code docs + book-mcp) → validate → draft → confirm with user → write + update all cross-references → commit → self-verify → report. Hard gate: nothing writes before user approval. _[commit `6b8c5ae`]_
- `chore(skills)` **system-builder/changelog.md** — this file; added as `system-builder`'s own log. Step 1 now reads it first; Step 10 appends an entry per change. _[commit `9563e4f`]_

---

## How entries are added

`system-builder` appends to this file as part of Step 10 (commit), **not** as a separate step. One entry per logical change, matching the Conventional Commits subject verbatim where possible. The commit itself touches this file; no out-of-band updates.

Format for a new entry (keep each one scannable):

```
- `<type>(<scope>)` **<name>** — <one-line reason>. _[commit `<short-sha>`]_
```

Group entries under a date header (`### YYYY-MM-DD`). If an older date header already exists for the day the change lands, append under it; otherwise insert a new one at the top of the **Changes** section.

## Rebaselining

When the delta between the baseline and the live tree gets large (rule of thumb: more than ~15 entries since the last baseline, OR after any major refactor), rewrite the **Baseline snapshot** to reflect the new state and prepend a `### Rebaseline — YYYY-MM-DD` entry under **Changes** that names the previous baseline date it supersedes. Keep the full change history below untouched — the baseline is a view, not a replacement.
