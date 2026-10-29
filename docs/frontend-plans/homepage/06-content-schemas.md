---
title: Content schemas (Sanity) — homepage scope
status: final
depends-on: [00-brief.md@v3, pages/home.md@v2]
version: 3
last-updated: 2026-10-28
owner-agent: content-structurer
---

# Content schemas (Sanity, homepage scope)

The content layer is **Sanity** (Gate 1 answer 4), using the document types of `CLIENT (02 §9.3)`. This file specifies only the fields the homepage and its shared chrome read. Fields 02 §9.3 lists for other pages stay as 02 defines them and are added by the page plans that use them. Where this plan groups or adds `homePage` fields beyond 02 §9.3, the change is logged as D-015.

**Copy rule.** The client has written the homepage copy in 02 §5.2 (and the shared blocks in 02 §1.3, §3.2, §3.3, §4.0). The seed script loads that text **verbatim** into these fields; this plan never restates or rewrites it. The "Seed from" column names the exact source. `{{PLACEHOLDER}}` values are **not** seeded as text: the field stays empty, so the component hides (02 §0 Do: "Hide any section whose CMS data is empty"; 02 §10.4: no `{{…}}` on the live site).

## 0. Global rules

| ID | Rule | Enforced by |
| --- | --- | --- |
| R-01 | No string or portable-text span may contain `{{` or `}}`. | Sanity custom validation on every text field + a fetcher guard that throws at build time |
| R-02 | **One price source.** Prices live only in `service.priceMin/priceMax` and `offer.priceMin/priceMax/unit`. Copy that shows a price uses a token: `{price:<slug>}` → the full range (e.g. `$297–$497`, `$1,500–$3,500`), `{priceFrom:<slug>}` → the minimum (e.g. `$2,500`), `{priceMonthly:<slug>}` → the minimum followed by the unit label for `offer.unit = month` taken from `ui.unitPerMonth` (the formatter holds no text). `<slug>` is a `service` or `offer` slug. | Server-side `resolvePriceTokens()`; an unknown slug, or a `priceMonthly` token on a document whose `unit` is not `month`, fails the build. Format: `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })`, ranges joined with an en dash, `tabular-nums` in the UI |
| R-03 | Empty optional field or empty array → the component (or that item) renders nothing; never placeholder or "coming soon" text. | Component contract (`05-components.md` §0) |
| R-04 | Every image field has a required `alt` (≤ 125 chars, purpose, no "image of"); decorative images are flagged `decorative: true` and render `alt=""`. | Sanity validation + TypeScript required prop |
| R-05 | Internal links are root-relative paths (`/book`, `/audit#teardown`); external links are absolute `https://` URLs. | Sanity validation (regex) |
| R-06 | Per-variant fields are objects `{ dual (required), law?, accounting? }`; an empty `law`/`accounting` value falls back to `dual`. | Fetcher helper `pickVariant()` |

Fetching: one typed GROQ query per page in `lib/cms/queries.ts`, run from the server with `next: { tags: [...] }` (`home`, `siteSettings`, `person`, `service`, `offer`, `work`, `faq`, `stat`). The `/api/revalidate` webhook revalidates the document's tag. `CLIENT (02 §9.2)`

## 1. `siteSettings` (singleton) — shared chrome

| Field | Type | Req | Limit | Slot guidance | Seed from |
| --- | --- | --- | --- | --- | --- |
| `brandName` | string | yes | — | Exactly "Growrix OS" | CLIENT (02 §2.1) |
| `oneLiner` | string | yes | 90 | Descriptor | CLIENT (02 §2.2 #2) |
| `email` | string (email) | yes | — | Public address | CLIENT (02 §3.3) |
| `ctas.fitCall` | object `{label, labelShort, labelMobile, href, trackId}` | yes | label 32 · short 18 · mobile 12 (header width budget, wireframe §4.1.1) | `label` exact primary CTA; `labelShort` used in the header at 768–1279 px; `labelMobile` in the < 768 px header pill; `href` `/book`; `trackId` `fit_call` | CLIENT (02 §1.3 label; §5.1 header "Book a fit call"; §3.2 "Book a call") |
| `ctas.teardown` | object `{label, labelShort, href, trackId}` | yes | label 42 · short 18 | `href` `/audit#teardown`; `trackId` `teardown` | CLIENT (02 §1.3; §3.2 bar "Loom teardown") |
| `ctas.audit` | object `{label, href, trackId}` | yes | 48 | Label uses `{price:automation-audit}`; `href` `/audit#audit`; `trackId` `audit` | CLIENT (02 §1.3) |
| `ctas.upwork` | object `{label}` | yes | 60 | `href` comes from `verifyLinks[platform=upwork]`; hidden when that URL is empty; fires `upwork_link_click` only (no `cta_click`) | CLIENT (02 §1.3, §9.5) |
| `navigation` | array of `{label, href, children[]{label, href}}` | yes | ≤ 6 top-level, ≤ 4 children, label 28 | Order as given. Industries children: `industry.isPrimary` first, then alphabetical (until industry documents exist, the stored order applies: Accounting, Law) | CLIENT (02 §3.2) |
| `trustRow` | string[3] | yes | 40 each | Three short trust claims | CLIENT (02 §4.0 trust row) |
| `timezoneStatement` | text | yes | 400 | Reusable block | CLIENT (02 §4.0) |
| `honestProofNote` | string | yes | 160 | Shown under S6 | CLIENT (02 §4.0) |
| `verifyLinks` | array of `{platform: upwork \| linkedin \| github \| youtube, url}` | no | — | Empty `url` → that link is hidden | `TBD-from-client`: `{{UPWORK_PROFILE_URL}}`, `{{LINKEDIN_URL}}`, `{{GITHUB_URL}}`, `{{YOUTUBE_URL}}` (B-03) |
| `medianReplySeconds` | number | no | 1–3600 | Real 30-day median only | `TBD-from-client` (`{{MEDIAN_REPLY_SECONDS}}`) |
| `footer.descriptor` | text | yes | 260 | Column 1 text | CLIENT (02 §3.3 column 1) |
| `footer.columns` | array of `{heading, links[]{label, href}}` | yes | ≤ 4 columns, heading 24, label 32 | Phase 2 links (templates, blog) are **not** seeded (02 §3.3: hidden until content exists) | CLIENT (02 §3.3 columns 2–4) |
| `footer.verifyLabel` | string | yes | 60 | — | CLIENT (02 §3.3) |
| `footer.legalLinks` | array of `{label, href}` | yes | 2 | Privacy, Terms | CLIENT (02 §3.3) |
| `ui` | object, all strings | yes | 40 each | Interface strings (accessible names and small labels); see §1.1 | §1.1 |
| `statusPages.notFound`, `statusPages.error` | object `{heading, body}` | yes | heading 60 · body 160 | Calm, first person, offers the fit call and a link home (C-26) | `TBD-from-client` (B-08) |
| `concierge` | object | yes | see §1.2 | Chat modal content | §1.2 |

### 1.1 `siteSettings.ui` (interface strings)

| Key | Use | Seed from |
| --- | --- | --- |
| `skipLink` | Skip link text | CLIENT (02 §9.11 "Skip to content") |
| `navLabel` | `aria-label` of the main nav | `TBD-from-client` (1–2 words) (B-07) |
| `footerNavLabel` | `aria-label` of the footer nav | `TBD-from-client` (1–2 words) (B-07) |
| `menuOpen` / `menuClose` | Mobile menu button name | PROJECT (web/src/components/shell/Header.tsx: "Open menu" / "Close menu") |
| `submenuToggle` | Suffix for dropdown button names, read after the item label | `TBD-from-client` (1–2 words that name the submenu) (B-07) |
| `themeToggle` | Theme toggle accessible name (button uses `aria-pressed` for dark) | `TBD-from-client` (2 words, names the dark theme) (B-07) |
| `themeRowLabel` | Visible label of the theme row inside the mobile menu (< 768 px, D-026) | `TBD-from-client` (1–2 words) (B-07) |
| `unitPerMonth` | Unit label appended by `{priceMonthly}` | CLIENT (02 §5.2 S8 "From $300/month": the `/month` part) |
| `chatOpen` | Header chat button and launcher name | PROJECT (Header.tsx: "Open chat") |
| `chatClose` | Close button name | PROJECT (ConciergeModal.tsx: "Close concierge chat") |
| `verifyMe` | Lead-in before verify links in the founder card | CLIENT (02 §5.2 S1 "Verify me:") |
| `sourcePrefix` | Lead-in before a stat source link | CLIENT (02 §4.0 source line pattern) |
| `externalSuffix` | Visually hidden text after external links | `TBD-from-client` (3–4 words, says it opens another site) (B-07) |

**Empty behaviour of §1.1.** Every `ui` key is required. A missing key fails Studio validation and the build (R-01 guard), so a nameless control can never ship. The `TBD-from-client` keys (B-07) block the header/footer slice. They are drafted by `content-writer` (through senior-dev) and confirmed by the client, or written by the client directly.
| `illustrativeBadge`, `internalBadge`, `demoBadge`, `clientBadge` | `HonestBadge` labels | CLIENT (02 §0 Do: "Client project", "Internal build", "Demo build", "Illustrative example") |

### 1.2 `siteSettings.concierge` (AI Growrix OS modal)

| Field | Type | Req | Limit | Slot guidance | Seed from |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | 30 | Modal heading | PROJECT (ConciergeChat.tsx: "Ask AI Growrix OS") |
| `subtitle` | string | yes | 140 | One line saying what the assistant can and cannot do in this version | `TBD-from-client` |
| `assistantLabel` | string | yes | 20 | Small label on assistant bubbles. Must follow the name rule (never "Growrix" alone) | `TBD-from-client` (the reference "Growrix AI" breaks 02 §2.1) |
| `intro` | text | yes | 300 | First assistant message; first person, calm, no promises | `TBD-from-client` |
| `starterPrompts` | string[] | no | 0–4, 60 each | Questions a law/accounting buyer would ask; no SaaS/mobile topics | `TBD-from-client` (reference prompts are off-offer, D-006) |
| `inputLabel` | string | yes | 30 | Visible label above the textarea | PROJECT (ConciergeChat.tsx: "Ask AI Growrix OS") |
| `inputPlaceholder` | string | yes | 90 | Example of a question; not a label substitute | `TBD-from-client` |
| `sendLabel` | string | yes | 12 | Send button | PROJECT (ConciergeChat.tsx: "Send") |
| `pendingText` | string | yes | 80 | Shown while waiting | `TBD-from-client` |
| `escalationReply` | text | yes | 300 | The reply every message gets in this slice: honest that answers are not live yet, and points to the actions | `TBD-from-client` |
| `errorReply` | text | yes | 200 | Shown when the request fails | `TBD-from-client` |
| `noAnswerCue` | string | no (used from the backend slice on) | 40 | Visible text cue on a `no_answer` reply | `TBD-from-client` |
| `escalationActions` | array of `ctaKey` ∈ `fitCall` / `teardown` / `contact` | yes | 1–3 | Order of action buttons in replies and the rail | CLIENT (02 §1.3 ladder) |
| `contactLabel`, `contactHref` | string, path | yes | 24, — | `/contact` | `TBD-from-client` label; href CLIENT (02 §3.1) |
| `railHeading`, `railBody` | string, text | no | 40, 200 | Escalation rail (≥ 1024 px) | `TBD-from-client` |
| `rulesHeading`, `rules` | string, string[] | no | 40, 0–3 × 120 | "How this assistant works" card | `TBD-from-client` |

**Empty behaviour of §1.2.** The required `concierge` fields still `TBD-from-client` (`subtitle`, `assistantLabel`, `intro`, `inputPlaceholder`, `pendingText`, `escalationReply`, `errorReply`, `contactLabel`) are blocking item **B-06** for the chat slice. In this table "Req yes" means required for the chat to render. Studio enforces these fields as validation **warnings**, not errors, so `siteSettings` can publish without them. While any of them is empty, **every chat trigger (header button, menu entry, launcher) is hidden**, and the modal chunk is never requested. The rest of the page is unaffected. The same routing as §1.1 applies (content-writer via senior-dev, client confirms).

## 2. `person` (founder)

| Field | Type | Req | Limit | Seed from |
| --- | --- | --- | --- | --- |
| `name` | string | yes* | 60 | `TBD-from-client` (`{{FOUNDER_FULL_NAME}}`, exactly as on Upwork) |
| `firstName` | string | yes* | 30 | `TBD-from-client` |
| `role` | string | yes | 60 | CLIENT (02 §5.2 S1 card role line) |
| `location` | string | yes | 40 | CLIENT (02 §5.2 S1 "Dhaka, Bangladesh") |
| `timezone` | string | yes | 12 | CLIENT ("UTC+6") |
| `photo` | image + `alt`, hotspot | yes* | source ≥ 1280 px long edge | `TBD-from-client` (`{{FOUNDER_HEADSHOT}}`) |
| `sameAs` | url[] | no | — | `TBD-from-client` |

\* Required to publish the founder card. Until `name` and `photo` exist, `FounderCard` and the S9 photo are hidden, and the `Person` JSON-LD node is omitted.

## 3. `homePage` (singleton)

| Field | Type | Req | Limit | Slot guidance | Seed from (`CLIENT`, 02 §5.2 unless noted) |
| --- | --- | --- | --- | --- | --- |
| `heroVariant` | `dual` \| `law` \| `accounting` | yes | — | Default `dual` | 02 §5.4 |
| `hero.{dual,law,accounting}.eyebrow` | string | yes (dual) | 90 | Sentence case | S1 eyebrow; law/accounting from 02 §5.4 |
| `hero.*.h1` | string | yes (dual) | 80 | Two to three lines at desktop (the 02 §5.4 `law` H1 is 78 chars) | S1 H1; 02 §5.4 |
| `hero.*.subhead` | text | yes (dual) | 320 | Who / what / how / timeline | S1 subhead; 02 §5.4 |
| `hero.*.metaTitle` | string | yes (dual) | 60 | — | Meta title; 02 §5.4 |
| `hero.*.metaDescription` | string | yes (dual) | 120–155 | Prices via R-02 tokens | Meta description; 02 §5.4. **The `dual` text in 02 §5.2 is 159 characters**, so validation rejects it: a shortened version is `TBD-from-client` (blocking item B-05; the numbered list B-01 to B-12 lives in `INDEX.md` Build handover). |
| `hero.*.ogTitle` | string | yes (dual) | 60 | — | OG title; 02 §5.4 |
| `hero.*.ogDescription` | string | yes (dual) | 155 | — | OG description |
| `problem.heading` | string | yes | 90 | — | S2 H2 |
| `problem.statsByVariant.{dual,law,accounting}` | ref `stat`[] | yes (dual) | exactly 3 | Order = display order | S2 cells; 02 §5.4 orders |
| `systems.heading` | string | yes | 90 | — | S3 H2 |
| `systems.panels[]` | `{service (ref), outcome, bullets[], priceLine, linkLabel}` | yes | exactly 2; outcome 160; bullets exactly 4 × 60; priceLine 60; linkLabel 30 | `priceLine` must contain `{priceFrom:<service-slug>}` once; panel title and link target come from the referenced `service` (`title`, `/services/<slug>`). Display order follows `heroVariant` (`pages/home.md` §6). | S3 panels A/B |
| `timeline.heading` | string | yes | 60 | — | S4 H2 |
| `timeline.label` | string | yes | 90 | Always visible | S4 label |
| `timeline.byVariant.{dual,law,accounting}` | `{time, text}`[] | yes (dual) | **exactly 5 steps** (layout and M-09 timing assume 5; 02's two scenarios have 5 each); time 10; text 180 | `dual` and `law` use the PI scenario; `accounting` uses the accounting scenario | S4 steps; 02 §5.4 accounting scenario |
| `tryIt.heading` / `body` / `ctaLabel` / `ctaHref` / `smallPrint` | string / text / string / path / string | yes | 60 / 320 / 30 / — / 140 | `ctaHref` `/contact` | S5 |
| `tryIt.medianLine` | string | yes | 90 | Must contain `{seconds}`; the line renders only when `siteSettings.medianReplySeconds` is set | S5 data line |
| `proof.heading` / `proof.sub` | string | yes | 70 / 140 | — | S6 H2, sub |
| `proof.featuredWorkByVariant.{dual,law,accounting}` | **weak** ref `workEntry`[] | **no** | 0–3 | 0 entries, or no published entry → S6 is hidden (the expected first-build state). Weak references let `homePage` publish before any work entry does; the query keeps only published targets. The first pilot case study takes slot 1 when published (02 §5.2 S6 rule). | S6 cards (B-04) |
| `proof.allWorkLabel` | string | yes | 30 | Link to `/work` | S6 link |
| `process.heading` | string | yes | 40 | — | S7 H2 |
| `process.steps[]` | `{title, body}` | yes | exactly 4; title 40; body 160 | Prices via R-02 tokens (`{price:automation-audit}`) | S7 steps |
| `pricing.heading` | string | yes | 60 | — | S8 H2 |
| `pricing.rows[]` | `{label, source, display, note}` | yes | exactly 4; label 30; note 60 | `source`: one `offer` ref, or 1–2 `service` refs (a range across services uses the lowest `priceMin` and the highest `priceMax`); `display` ∈ `range` / `from-monthly` | S8 rows (Audit → `automation-audit`; Sprint → `workflow-sprint`; Systems → both services; Care → `care-plan`, `from-monthly`) |
| `pricing.linkLabel` | string | yes | 50 | Link to `/pricing` | S8 link |
| `builder.heading` | string | yes | 70 | — | S9 H2 |
| `builder.body` | portable text (no headings, no images) | no (S9 renders without it) | 600 chars | Written with the real first name once known; R-01 forbids `{{FOUNDER_FIRST_NAME}}` | S9 body (`TBD-from-client` until the name is set, B-02) |
| `builder.securityList` | string[] | yes | exactly 3 × 80 | — | S9 mini-list |
| `builder.securityLinkLabel` | string | yes | 40 | Link to `/security` | S9 link |
| `builder.verifyLabel` | string | yes | 80 | Lead-in for the S9 verify row | S9 verify row |
| `agencies.body` / `agencies.linkLabel` | string | yes | 140 / 40 | Link to `/partners` | S10 |
| `faq.heading` | string | yes | 60 | — | S11 H2 |
| `faq.items` | ref `faq`[] | yes | 1–10 (8 seeded) | Display order = array order | S11 items |
| `finalCta.heading` / `finalCta.body` | string / text | yes | 60 / 200 | — | S12 |
| `finalCta.secondaryLabel` | string | yes | 40 | Overrides `ctas.teardown.label` in S12 only | S12 button 2 |
| `finalCta.tertiaryLabel` | string | yes | 60 | Uses `{price:automation-audit}`; links to `ctas.audit.href` | S12 text link |

## 4. Referenced documents (homepage subset)

| Type | Fields read by the homepage | Rules | Seed from |
| --- | --- | --- | --- |
| `service` | `title`, `slug`, `priceMin`, `priceMax` | Slugs `ai-intake-speed-to-lead`, `document-intake-autopilot` | CLIENT (02 §0 Offers, §3.1) |
| `offer` | `name`, `slug`, `kind`, `priceMin`, `priceMax`, `unit` | Slugs `automation-audit` (297–497, one-time), `workflow-sprint` (400–1200, one-time), `care-plan` (min 300, month) | CLIENT (02 §0 Offers) |
| `workEntry` | `title`, `slug`, `badge` (`client` / `internal` / `demo` / `illustrative`), `cardSummary` (≤ 140), `loom.thumbnail` (image + alt, 16:9), `consentOnFile`, `testRunDescription`, `publishedAt` | `badge = client` requires `consentOnFile = true`; `badge = demo` requires `testRunDescription` (02 §9.3 validation). `cardSummary` is a field added here for the card text in 02 §5.2 S6 / §6.7 (D-015). | Titles: LedgerLine from 02 §5.2 S6; demo titles `TBD-from-client`; thumbnails `TBD-from-client` |
| `faq` | `question` (≤ 120), `answer` (plain portable text; R-02 tokens allowed in spans), `tags[]` | Homepage items tagged `home` | CLIENT (02 §5.2 S11, 8 items) |
| `stat` | `value` (≤ 8), `label` (≤ 180), `sourceName` (≤ 60), `sourceUrl` (required URL), `year` | No publish without `sourceUrl` (02 §9.3) | CLIENT (02 §5.2 S2 + §5.4 variant stats) |

## 5. Seed and ownership

- `sanity/seed/seed.ts` creates the documents above from the 02 sections cited, verbatim. Placeholders stay empty. Owner: senior-dev (content slice).
- Studio schemas live in `sanity/schemaTypes/` (02 §12.1) with the validations above. Every R-rule appears in the schema or the fetcher, not in components.
