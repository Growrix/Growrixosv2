---
title: INDEX — Growrix OS homepage plan
status: final
depends-on: [00-brief.md@v3, 01-art-direction.md@v2, 02-tokens.md@v2, 05-components.md@v3, 06-content-schemas.md@v3, pages/home.md@v2, pages/home.wireframe.md@v3, pages/home.motion.md@v2, 90-performance.md@v3, 91-stack.md@v2, 93-qa-checklist.md@v2, 94-critique.md@v1, 95-decisions.md@v2]
version: 1
last-updated: 2026-10-29
owner-agent: packager
---

# INDEX — Growrix OS homepage (`/`)

Mode **M2 Single page, new** · one-shot · plan slug `homepage` · scope: the homepage plus the shared chrome it needs (tokens, header, footer, mobile CTA bar, AI Growrix OS chat modal). The slice deploys to **Vercel preview only** (D-027). Entry point for `senior-dev`.

## 1. File table

| File | Owner (role step) | Status | Version | Gate |
| --- | --- | --- | --- | --- |
| [00-brief.md](00-brief.md) | brief-intake | final | 3 | G1 |
| [01-art-direction.md](01-art-direction.md) | style-director | final | 2 | G2 |
| [02-tokens.md](02-tokens.md) | style-director | final | 2 | G2 |
| [pages/home.md](pages/home.md) | page-type-planner | final | 2 | G3 |
| [06-content-schemas.md](06-content-schemas.md) | content-structurer | final | 3 | G3 |
| [pages/home.wireframe.md](pages/home.wireframe.md) | wireframe-architect | final | 3 | G3 |
| [05-components.md](05-components.md) | component-mapper | final | 3 | G3 |
| [90-performance.md](90-performance.md) | auditor | final | 3 | G3 |
| [91-stack.md](91-stack.md) | stack-advisor | final | 2 | G4 |
| [pages/home.motion.md](pages/home.motion.md) | motion-choreographer | final | 2 | G4 |
| [93-qa-checklist.md](93-qa-checklist.md) | auditor | final | 2 | G4 |
| [94-critique.md](94-critique.md) | critic | final | 1 | G4 |
| [95-decisions.md](95-decisions.md) | orchestrator | final | 2 | G5 |
| INDEX.md | packager | final | 1 | G5 |

Not in this mode's set, on purpose: `03-sitemap.md` and `04-global-motion.md` (M2 writes page files plus global deltas only); `92-third-party-prompts.md` (no prompt tool named, D-018).

## 2. Dependency graph (acyclic)

```
00-brief ─► 01-art-direction ─► 02-tokens ─► pages/home ─► 06-content-schemas ─► pages/home.wireframe
   │               │                │                                                   │
   └───────────────┴────────────────┴─► 91-stack ─────────────────────► 05-components ◄─┘
                                                                            │
                                         90-performance ◄───────────────────┘ (+ 02, 91, wireframe)
                                                │
                                         pages/home.motion (02, 05, wireframe, 90)
                                                │
                                         93-qa-checklist (02, 05, 06, wireframe, motion, 90, 91)
                                                │
                                         94-critique (all of the above, reviewed versions) ─► 95-decisions ─► INDEX
```

## 3. ASSUMED items

**None.** Every brief field is `CLIENT` (request, Gate 1 answers, 02) or `PROJECT (path)`. Unconfirmed facts are tagged `UNVERIFIED` (`93-qa-checklist.md` §3, U-1 to U-7).

## 4. Open decisions (the user's call — still open after the plan approval on 2026-10-29)

| ID | Decision | Recommendation | Consequence if not taken |
| --- | --- | --- | --- |
| D-013 | Allow client islands beyond 02 §9.2's four (HeaderController, ThemeToggle, MobileCtaBar, InViewOnce, ChatRoot/ChatModal). These are required by the requested header behaviour, themes and chat | **(a) Approve**: within the 130 KB JS budget | (b) keeps 02's rule: solid fixed header, no theme toggle, no CTA bar, static timeline, no chat (`91-stack.md` §3 revert list) |
| DEP-01 to DEP-09 | Install approvals (`91-stack.md` §5) | Approve all; no motion library is added | Nothing can be installed or built |
| D-014 | New event names `chat_open`, `chat_message_sent` and `location` values `menu`, `chat` | Approve | `track()` does nothing in this slice; the names only matter in the launch slice |
| D-027 | Preview-only slice, with five logged loosenings (web-vitals attribution, Sentry, CSP, chat rate limiting, 404 nav targets), each restored by a named slice | Accept | Otherwise those items move into this slice (more scope and dependencies) |
| Second Critic run | Optional fresh Critic run on the revised files (Gate 4 passed on the orchestrator's cycle-1 re-check) | Recommended before the build | None for the plan's validity |

Non-blocking client deliverable: `logo.svg` / monogram (02 §2.7). The header and footer use the live-text wordmark until it arrives.

## 5. Tool register

| Tool | Status in this run | Effect | Fallback |
| --- | --- | --- | --- |
| Context7 / package docs | Not available to the planner | Versions are major lines; API details tagged verify (U-4, U-5) | **MANUAL-FALLBACK:** "For each package in `91-stack.md` §5, run `npm view <pkg> version`, pin it, and confirm the API notes marked *verify* against the package's current docs before writing code." |
| Browser capture, Lighthouse, Playwright | Not run at planning time | All budgets are planned estimates (`90-performance.md`) | **MANUAL-FALLBACK:** "Run `93-qa-checklist.md` §2 against the preview URL and record each measured value next to its planned value in the QA report." |
| Contrast checker / axe | Not available | Ratios hand-computed (U-7) | **MANUAL-FALLBACK:** "Measure every pair in `02-tokens.md` §2 in both themes with axe or a WCAG contrast checker; send any failure to style-director." |
| Mobbin, Unsplash, Firecrawl, Figma | Not used | No reference capture needed; stock photography is excluded by 02 | — |
| WebFetch / WebSearch | Available, not used | No external fact was needed; the external claims in 02 are tagged `UNVERIFIED` where relied on | — |

## 6. Revision log

| Date | Change | Files | Slices affected |
| --- | --- | --- | --- |
| 2026-10-28 | Gate 1 with 5 questions; the user's answers recorded (light default, chat UI only, 2 fonts, Sanity, final URLs) | 00 v2, 95 | all |
| 2026-10-28 | Gates 2 and 3 passed; verify-pass fixes (Gate 3 cycle 1) | 01, 02, pages/home, 06, wireframe v2, 05 v2, 90 v2 | 2–5 |
| 2026-10-28 | Critic: 33 findings (9 major, 24 minor) routed and fixed; Gate 4 passed on cycle 1. Main changes: chrome in the root layout, solid header by default, nav from 1280 px, preview-only scope with logged loosenings, `package.json` facts removed, theme transition dropped, QA expanded | 00 v3, 01 v2, 02 v2, pages/home v2, wireframe v3, 05 v3, 06 v3, 90 v3, 91 v2, motion v2, 93 v2, 94 v1, 95 v2 | all |
| 2026-10-28 | INDEX created; Gate 5 submitted | INDEX v1, 95 v2 | — |
| 2026-10-29 | Gate 5 **PASS**: the user replied "Approved" (plan approval only). INDEX and 95 marked final. D-013, D-014, D-027 and DEP-01 to DEP-09 stay **open**; B-09 to B-11 stay `PENDING-CONFIRMATION`. | INDEX v1, 95 v2 (status only) | 0 (approvals) — slices 1–10 wait on B-10; island parts wait on B-09 |

## 7. Build handover

### 7.1 Build order

| # | Slice | Plan files (exact sections) | Builder |
| --- | --- | --- | --- |
| 0 | Approvals | `91-stack.md` §5 (DEP-01 to DEP-09); `95-decisions.md` D-013, D-014, D-027 | **the user** (approval before install) |
| 1 | Scaffold and config | `91-stack.md` §1, §3 (`next.config.ts`, routes, root layout with chrome placement D-025), §4 env; `pages/home.wireframe.md` §2 (landmarks, DOM order) | `frontend-dev` |
| 2 | Tokens, fonts, primitives | `02-tokens.md` (all); `01-art-direction.md` §2–§5; `05-components.md` §0, §1 (C-01 to C-09), C-17, C-18 | `ui-dev` |
| 3 | Content layer | `06-content-schemas.md` (all; seed per §5); `05-components.md` §6 (C-60 to C-62, C-66); `91-stack.md` §3 (`/api/revalidate`) | senior-dev itself |
| 4a | Shared chrome — layout and behaviour | `pages/home.wireframe.md` §4.1 to §4.3 (incl. §4.1.1 width budget, §4.1.2 states); `91-stack.md` §3 (root layout, `not-found`, `error`, `global-error`) | `frontend-dev` |
| 4b | Shared chrome — component shells and states | `05-components.md` §2 (C-10 to C-18, C-26, C-27), §3 (C-20 to C-24) | `ui-dev` |
| 5a | Homepage composition | `pages/home.md` §3, §6; `pages/home.wireframe.md` §3, §5 (S1 to S12, LCP rules) | `frontend-dev` |
| 5b | Section shells | `05-components.md` §4 (C-40 to C-53) | `ui-dev` |
| 6a | Chat — route and wiring | `05-components.md` §5 (API contract); `91-stack.md` §3 (`/api/v1/ai-concierge`); `pages/home.wireframe.md` §4.4 (availability, loading, focus sequence) | `frontend-dev` |
| 6b | Chat — component shells and states | `05-components.md` §5 (C-30 to C-35); `pages/home.wireframe.md` §4.4 (dialog layout) | `ui-dev` |
| 7 | Motion | `pages/home.motion.md` (all); `02-tokens.md` §6; `91-stack.md` §6 | `ui-dev` |
| 8 | SEO metadata and structured data | `pages/home.md` §7; `05-components.md` C-08, C-63; `91-stack.md` §3 (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`) | `seo-optimizer` |
| 9 | Copy slots | `06-content-schemas.md` §1.1, §1.2, `statusPages`, `hero.dual.metaDescription`, `builder.body`, `person`; `05-components.md` C-66 | client, or `content-writer` (via senior-dev) |
| 10 | Verify | `90-performance.md`; `93-qa-checklist.md` §2 (BG, P, A, RM, F rows except F-16 [launch]) | `performance-auditor`, `accessibility-checker` |

The analytics `track()` port (C-64) is built in slice 5a and does nothing in this slice. GA4 + consent, `web-vitals` attribution, Sentry, CSP and production checks (F-16) belong to the later launch slice.

### 7.2 Blocking items

| ID | Item | Status | Blocks |
| --- | --- | --- | --- |
| B-01 | Sanity project and its ID, dataset, `SANITY_REVALIDATE_SECRET` (account-bound) | `PENDING-CONFIRMATION` | Slice 3 and every slice that renders content (4–8, 10) |
| B-02 | Founder `person.name`, `firstName`, headshot; `homePage.builder.body` | `TBD-from-client` | Founder card (S1), S9 photo/body, `Person` JSON-LD. The page builds without them (hidden), but the test is not faithful without them. |
| B-03 | Verify-link URLs: `{{UPWORK_PROFILE_URL}}`, `{{LINKEDIN_URL}}`, `{{GITHUB_URL}}`, `{{YOUTUBE_URL}}` | `TBD-from-client` | Verify rows (S1, S9, footer) and the footer Upwork link (hidden until set) |
| B-04 | Proof entries: LedgerLine `workEntry` content, demo titles, Loom thumbnails | `TBD-from-client` | S6 (hidden until at least one is published) |
| B-05 | `hero.dual.metaDescription` ≤ 155 chars (the 02 §5.2 text is 159) | `TBD-from-client` | Publishing `homePage` (slice 3) and the SEO slice (8) |
| B-06 | Required chat copy: `concierge.subtitle`, `assistantLabel`, `intro`, `inputPlaceholder`, `pendingText`, `escalationReply`, `errorReply`, `contactLabel` | `TBD-from-client` | Chat slices 6a/6b in use (triggers hidden while empty) |
| B-07 | Interface strings: `ui.navLabel`, `footerNavLabel`, `submenuToggle`, `themeToggle`, `themeRowLabel`, `externalSuffix` | `TBD-from-client` | Shared chrome slices 4a/4b (required for accessible names) |
| B-08 | Status-page copy: `statusPages.notFound`, `statusPages.error`, C-27 static copy | `TBD-from-client` | C-26 / C-27 in slice 4 |
| B-09 | Decision D-013 (extra client islands) | `PENDING-CONFIRMATION` | C-11 to C-15, C-30 to C-35, C-53 in slices 4, 5b, 6, 7 |
| B-10 | Dependency approvals DEP-01 to DEP-09 | `PENDING-CONFIRMATION` | Every slice (install) |
| B-11 | Decision D-014 (chat event names, `menu`/`chat` locations) | `PENDING-CONFIRMATION` | Analytics wiring in the launch slice only (non-blocking here) |
| B-12 | `UNVERIFIED` U-1 to U-7 (`93-qa-checklist.md` §3) | `UNVERIFIED` | Each blocks only its check: P-04 (fonts), M-08 (dialog entry), F-01 (reduced transparency), slice 1 config/lint (U-4, U-5), A-05 (WebKit focus), A-02 (contrast) |

### 7.3 Handover line

```
/senior-dev implement docs/frontend-plans/homepage/INDEX.md
```

The plan stays the specification during the build: on any conflict the plan wins unless the user approves a change, except where a locked project rule applies; that rule always wins and the conflict is reported. Revisions go back through `/plan-ui`.
