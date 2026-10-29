---
title: Component inventory — homepage slice
status: final
depends-on: [02-tokens.md@v2, 06-content-schemas.md@v3, pages/home.wireframe.md@v3, 91-stack.md@v2]
version: 3
last-updated: 2026-10-28
owner-agent: component-mapper
---

# Component inventory (homepage slice)

## 0. Contract for every component

- **Presentational shell:** props in, markup out. No literal copy, colour, URL, price or number inside a component. Text comes from Sanity via props; colours, sizes and durations come from tokens (`02-tokens.md`). `CLIENT (02 §12.2)`
- **Server by default.** Only the components marked **client** carry `"use client"`; each is a leaf (`91-stack.md` §3).
- **`PENDING-CONFIRMATION (D-013)`:** the client islands C-11 (with C-12 and C-14), C-13, C-15, C-30/C-31 (with C-32 to C-35) and C-53 go beyond 02 §9.2's four-island rule. Their build slices wait for the user's decision on D-013.
- **Empty = hidden:** required data missing → return `null` (R-03).
- **Focus:** every interactive element shows `:focus-visible` as a 2 px solid `--color-focus` outline with a 2 px offset. Floating controls (C-15 buttons, the C-30 launcher) add a 4 px `--color-surface` halo between the control and the outline (two-tone ring, `02-tokens.md` §2). `outline: none` never appears without a replacement.
- **Hover** styles apply only under `@media (hover: hover) and (pointer: fine)`.
- **Targets:** ≥ 44 × 44 px for every control and every standalone link (nav, footer, verify rows, source links, arrow links, chips), using block padding or `min-height`, with ≥ 8 px between neighbours. Links inside a sentence rely on the WCAG 2.5.8 inline exception.
- **Logical CSS:** `ms-*`, `ps-*`, `start-*`, `text-start`; directional icons get an `rtl:` flip.
- **Analytics:** CTAs carry `data-track-id` and `data-track-location` from data. A single delegated listener calls `track()`, which does nothing in this slice. Event rules are in `pages/home.md` §8.
- **Primary variant:** inside `main`, one primary-styled button per viewport (the fit call). The header CTA and the mobile CTA bar are chrome and stay primary. In the chat dialog only Send is primary (`pages/home.md` §1).
- Paths follow `CLIENT (02 §12.1)`: `components/ui`, `components/layout`, `components/sections`, `components/trust`, `components/chat` (new folder for the chat island), `lib/cms`, `lib/seo`, `lib/analytics`, `lib/utils`.

**State columns used below:** D default · H hover · F focus-visible · A active/pressed · X disabled · L loading · E empty · R error · S success. "—" = the state cannot occur for that component (static, build-time data).

## 1. UI primitives (`components/ui`)

| ID | Component | Props | Variants | States | A11y role / notes | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| C-01 | `Button` (renders `<a>` when `href` is set, else `<button>`) | `variant`, `size`, `href?`, `type?`, `disabled?`, `trackId?`, `trackLocation?`, `children`, `fullWidth?`, `iconStart?`, `iconEnd?` | `primary` (fill `--color-primary`, text `--color-on-primary`, `--shadow-1`) · `outline` (1 px `--color-border-control`, `--color-surface` fill, `--color-text`) · `ghost` (transparent; for icon buttons) · sizes `md` 44 px / `lg` 48 px, radius `--radius-md` (header pill: `--radius-pill`), `--text-button` | D H (primary → `primary-hover`; outline/ghost → `--color-inset` fill) F A (press) X (opacity 0.6, `aria-disabled` on links) | Native `<a>`/`<button>`; icon-only use requires `ariaLabel` (typed as required when there are no children) | Everywhere |
| C-02 | `TextLink` | `href`, `children`, `arrow?`, `external?`, `srSuffix?`, `trackId?` | `inline` (underlined, `--color-primary`, underline offset 3 px) · `arrow` (arrow icon after the text) | D H (thicker underline) F A | External links add `rel="noopener"` and the visually hidden `ui.externalSuffix`; `srSuffix` disambiguates repeated link text | S3, S6, S8, S9, S10, S12, footer |
| C-03 | `Container` | `as?`, `children` | — | — | Layout only | All |
| C-04 | `Section` | `id`, `labelledBy?`, `band?`, `padding?` | `band`: `default` / `inset`; `padding`: `default` / `compact` (48 px) | — | `<section aria-labelledby>` when `labelledBy` is set; otherwise a `<div>` | S1–S12 |
| C-05 | `Icon` | `name` (union of the Heroicons used), `size` (20 / 24) | — | — | `aria-hidden="true"` always; meaning comes from adjacent text | All |
| C-06 | `VisuallyHidden` | `children`, `as?` | — | — | Screen-reader-only text | Links, labels |
| C-07 | `SkipLink` | `href="#main"`, `label` | — | D F (becomes visible at the top-left, above everything, `--z-skip`) | First focusable element | Root layout |
| C-08 | `JsonLd` (server) | `data` | — | — | Renders `<script type="application/ld+json">` with `JSON.stringify(data)`. **Every `<` character in that string is then replaced with the six-character escape `<`** (backslash, u, 0, 0, 3, c). The result is still valid JSON, and no CMS string can close the script tag (quality-standard §8.3; QA F-12). | Root layout, home |
| C-09 | `Price` | `amountMin`, `amountMax?`, `display` (`range` / `from` / `from-monthly`), `unitLabel?`, `className?` | — | — | Formats via `formatPrice()` (R-02); `from-monthly` appends `unitLabel` (`ui.unitPerMonth`); `tabular-nums` | S3, S8; token resolver |

## 2. Layout chrome (`components/layout`) — all rendered by the **root layout** (`app/layout.tsx`)

| ID | Component | Server/client | Props | Variants | States | A11y | Used in |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C-10 | `SiteHeader` | server shell | `brandName`, `navigation`, `ctas`, `ui`, `concierge.title`, `chatAvailable` | — | Renders `data-header-state="solid"` on the server; renders C-11 | `<header>`; wordmark link named `brandName` | Root layout |
| C-11 | `HeaderController` | **client** — `PENDING-CONFIRMATION (D-013)` | `navigation`, `ctas`, `ui`, `chatLabel`, `chatAvailable`, `isHome` | `data-header-state`: `solid` (server default, no-JS, failed hydration) / `top` / `scrolled` / `hidden` (wireframe §4.1.2) | On hydration it sets `top` (only on `/` at `scrollY ≤ 8`) or `scrolled`, with no transition on that first set, and removes `html[data-home-top]`. rAF-throttled passive scroll listener; thresholds 8 / 64 / 8 px. Pinned rules per the wireframe. A `focusin` inside the header pins it visible; the header is never `inert`. | Owns C-12 and C-14 state | Root layout |
| C-12 | `NavDropdown` | client (inside C-11) | `label`, `href`, `children[]`, `toggleSuffix` | open / closed | D H F A; open state `aria-expanded="true"` | Disclosure button + list of links; Escape closes and returns focus; one open at a time; `.no-js` → plain link to `href` | Header (XL ≥ 1280) |
| C-13 | `ThemeToggle` | **client** — `PENDING-CONFIRMATION (D-013)` | `label` (`ui.themeToggle`), `rowLabel?` (`ui.themeRowLabel`, menu placement) | `bar` (T/L, XL) / `menu-row` (M, inside C-14) | D H F A. `aria-pressed` = dark active. Both sun and moon icons are in the DOM; CSS shows the active one from `[data-theme]` (no hydration mismatch). Writes `localStorage`, `data-theme` and `meta[name=theme-color]`; the switch is instant. `.no-js` → `visibility: hidden` | `<button aria-pressed>` | Header, mobile menu |
| C-14 | `MobileMenu` | client (inside C-11) | `navigation`, `ctas`, `chatLabel`, `chatAvailable`, `ui` | open / closed | Open: scroll lock; `inert` on `main`, footer, C-15 and the launcher; focus to the first link; Escape/button closes and returns focus. The chat entry closes the menu first and records `menu` as the opener (wireframe §4.4). | `<button aria-expanded aria-controls="mobile-menu">` + `<div id="mobile-menu">` containing a `<nav>` labelled `ui.navLabel` (the desktop nav is `display: none` below 1280, so only one is in the accessibility tree) | Header (< 1280) |
| C-15 | `MobileCtaBar` | **client** — `PENDING-CONFIRMATION (D-013)` | `ctas.fitCall`, `ctas.teardown` | shown / hidden | Rules in wireframe §4.3. Uses an IntersectionObserver on the footer, a passive scroll listener for the 40 % depth, and `focusin`/`focusout` for text fields. Hidden → `inert` + `visibility: hidden`. Two-tone focus ring. | Plain `<div>` (not a landmark); the two links are self-describing; `trackLocation="sticky"` | Root layout (M) |
| C-16 | `SiteFooter` | server | `footer`, `verifyLinks`, `ctas.upwork`, `brandName`, `email`, `ui.footerNavLabel` | `n` = 3 or 4 columns (wireframe §4.2) | — (static) | `<footer>` + `<nav aria-label>`; column headings H2; `id="footer-nav"` is the no-JS menu target; Upwork link fires `upwork_link_click` only | Root layout |
| C-17 | `Wordmark` | server | `brandName`, `logo?` | text / svg; compact below 360 px | — | Inside the home link; `logo` alt = `brandName` | Header, footer |
| C-18 | `HeadBootstrap` (inline script) | inline in `<head>` | — | — | Before paint: swaps `no-js` → `js` on `<html>`, applies the stored theme, sets `data-motion` (`pages/home.motion.md` §1), and sets `data-home-top` when the path is `/` | — | Root layout |
| C-26 | `StatusPageShell` | `app/not-found.tsx` (server) and `app/error.tsx` (client, as Next requires): both render **inside the root layout**, so header, footer, nav, `#main` and the skip link are present | `heading`, `body` (`siteSettings.statusPages.*`), `ctas.fitCall`, home link | `notFound` / `error` | E/R: offer a next step | One H1 per page | 404 / route errors |
| C-27 | `GlobalErrorPage` | `app/global-error.tsx` (client) — **standalone** `<html lang="en"><body>`: it replaces the root layout, so it has no CMS header or footer | Static props from `lib/static-copy/global-error.ts` (heading, body, home-link label, contact email). Copy is `TBD-from-client`, because the CMS may be the thing that failed. | — | R | One H1, a link home, a `mailto:` link to `siteSettings.email`'s seeded value, light theme tokens only | Root-level crash |

C-26 copy slots (`siteSettings.statusPages.{notFound,error}.{heading, body}`, heading ≤ 60, body ≤ 160, calm, first person) are `TBD-from-client` (B-08). The C-27 static copy is part of B-08 too.

## 3. Trust components (`components/trust`)

| ID | Component | Props | Variants | States | A11y | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| C-20 | `TrustRow` | `items: string[3]` | `stacked` (M) / `inline` | E → hidden | `<ul>`; check icons decorative | S1 |
| C-21 | `FounderCard` | `person`, `verifyLinks` (filtered to Upwork, LinkedIn, GitHub), `verifyMe` | `hero` (D) / `compact` (M, T), switched by CSS from one element | E (no `name` or no `photo`) → hidden | Photo alt from `person.photo.alt`; the name is plain text, not a heading | S1 |
| C-22 | `VerifyRow` | `label`, `links[]`, `platforms` filter | — | E (all URLs empty) → hidden; each empty link hidden | `<ul>` of external `TextLink`s; `verify_link_click` with `platform` | S1 card, S9, footer |
| C-23 | `HonestBadge` | `kind: 'client' \| 'internal' \| 'demo' \| 'illustrative'`, `labels` (`ui.*Badge`) | 4 kinds; text label always shown; `--text-badge`, `--radius-sm`, 1 px border in the matching colour (`illustrative` → `status-illus`, `internal`/`demo` → `--color-border-control`, `client` → `status-done`) | — | Plain text (not colour alone); the kind union is enforced in TypeScript (02 §12.2) | S4, S6 |
| C-24 | `SourceLink` | `prefix`, `name`, `url` | — | E (no `url`) → the stat is not published (schema rule) | External `TextLink`; `--text-small` muted text with a primary link | S2 |

## 4. Homepage sections (`components/sections`, all server unless marked)

| ID | Component | Props (from `06-content-schemas.md`) | Variants | States | A11y | Section |
| --- | --- | --- | --- | --- | --- | --- |
| C-40 | `HomeHero` | `hero` (picked variant), `ctas`, `trustRow`, `person`, `verifyLinks`, `ui` | — | E: card hidden → copy spans wider | One `<h1>`; CTA `trackLocation="hero"`; founder photo `next/image` with `preload` + `sizes` | S1 |
| C-41 | `ProblemStrip` | `heading`, `stats[]`, `sourcePrefix` | — | E (< 1 stat) → section hidden | `<ul>`; value and label inside one `<p>` per item | S2 |
| C-42 | `SystemPanels` + `SystemPanel` | `heading`, `panels[]` (with the resolved `service` and the price token resolved to C-09), `layout` (`equal` / `lead`) | `equal` (6/6) / `lead` (7/5) | E (no panels) → hidden | Panel = `<article>` with H3; link `srSuffix` = service title | S3 |
| C-43 | `OvernightTimeline` | `heading`, `label`, `steps[5]`, `badgeLabel` | `vertical` (< 1024) / `horizontal` (≥ 1024) via CSS | E → hidden. The `<ol>` is wrapped in C-53; each marker carries `--i` (index 0–4) for the highlight (`pages/home.motion.md` M-09). Default and static final state = filled. | `<ol>`; markers `aria-hidden` | S4 |
| C-53 | `InViewOnce` (**client**, thin wrapper around server-rendered children) — `PENDING-CONFIRMATION (D-013)` | `threshold` (0.35), `children` | — | Sets `data-inview="true"` on its wrapper once, then disconnects the observer. Renders nothing extra. | No a11y role; children stay server-rendered | S4 |
| C-44 | `TryItBlock` | `heading`, `body`, `cta`, `smallPrint`, `medianLine`, `medianSeconds?` | — | E (no `medianSeconds`) → median line hidden | Button `outline lg`, no `trackId` (not a CTA-ladder item) | S5 |
| C-45 | `ProofGrid` | `heading`, `sub`, `entries[0–3]`, `allWorkLabel`, `note`, `badgeLabels` | — | E (0 entries) → section hidden | — | S6 |
| C-46 | `WorkCard` | `entry` (`title`, `slug`, `badge`, `cardSummary`, `thumbnail`) | — | D H (title underline) F (card outline via `:focus-within`) A | `<article>`; the H3 contains the only link (stretched); thumbnail alt from data (or `alt=""` when marked decorative) | S6 |
| C-47 | `ProcessSteps` | `heading`, `steps[4]` (price tokens resolved) | — | — | `<ol>`; the visible number is `aria-hidden` (the list already numbers) | S7 |
| C-48 | `PricingSnapshot` | `heading`, `rows[4]` (each with a resolved C-09 price), `linkLabel` | — | — | `<ul>`; each row H3 + price + note | S8 |
| C-49 | `BuilderBlock` | `heading`, `body?` (portable text), `timezoneStatement`, `securityList`, `securityLinkLabel`, `verifyLabel`, `verifyLinks`, `person.photo` | — | E (no photo) → single column; E (no body) → body omitted | Photo `loading="lazy"`, `sizes="(min-width:1024px) 360px, 240px"` | S9 |
| C-50 | `AgencyBand` | `body`, `linkLabel` | — | — | Plain block (no landmark); plain `TextLink`, no `cta_click` | S10 |
| C-51 | `FaqList` | `heading`, `items[]` (`question`, `answer` portable text with tokens resolved) | — | D H F (on `<summary>`) open / closed | Native `<details>/<summary>`; chevron `aria-hidden` | S11 |
| C-52 | `CtaLadder` | `heading`, `body`, `ctas`, `secondaryLabel`, `tertiaryLabel` | — | — | `trackLocation="final"` | S12 |

## 5. Chat (`components/chat`) — `PENDING-CONFIRMATION (D-013)`

| ID | Component | Server/client | Props | States | A11y | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| C-30 | `ChatRoot` + `chatStore` + `ChatTrigger` + `ChatLauncher` | **client** (tiny) | `concierge`, `ui`, `ctas`, `available` (false while any required `concierge` field is empty) | Store: `{ isOpen, initialPrompt?, opener?: 'header' \| 'menu' \| 'launcher', loadState: 'idle' \| 'loading' \| 'ready' \| 'failed' }` with `open(opener, prompt?)` and `close()`, read through `useSyncExternalStore`. Trigger variants: `header-icon` / `menu-item` / `launcher`. The first `pointerenter`, `focus` or `pointerdown` on any trigger starts `import()` of C-31. **L:** pressed before load → `aria-busy="true"`, repeat presses ignored, pressed style after 300 ms; opens on resolve. **R:** `import()` rejects or exceeds 8 s → navigate to `concierge.contactHref`. **E:** `available = false` → nothing rendered. | Triggers are `<button>`s named `ui.chatOpen` (the menu item shows `concierge.title` as its text); `.no-js` → `visibility: hidden`; launcher uses the two-tone focus ring | Replaces the reference zustand store (`91-stack.md` §2). Focus-return target: the opener, or the menu button when `opener = 'menu'`. |
| C-31 | `ChatModal` | **client, lazy chunk** | `concierge`, `ui`, `ctas`, `initialPrompt?`, `returnFocusTo` | D; L (pending: `aria-busy` on the thread, Send disabled); E (no starter prompts → chips hidden); R (fetch failed or `success:false` → `errorReply` + actions); S (reply appended) | Native `<dialog>` with `showModal()`; `aria-labelledby` / `aria-describedby`; Escape closes; focus to the textarea on open; on close an explicit `.focus()` on `returnFocusTo`; backdrop click closes; link activation closes | Contract below |
| C-32 | `ChatThread` / `ChatMessage` | client (inside C-31) | `messages[]` (`id`, `role`, `text`, `responseState?`, `actions?`, `sources?`) | `responseState`: `answered` / `no_answer` (1 px `--color-border-control` outline **plus** an information icon and the visible text `concierge.noAnswerCue`) / `escalation` | `role="log"`, `aria-live="polite"`, `aria-relevant="additions"`; the assistant label is text, not colour; reply actions are outline buttons with `trackLocation="chat"` | Text is rendered as plain text (no HTML injection) |
| C-33 | `ChatComposer` | client | `inputLabel`, `placeholder`, `sendLabel`, `pending`, `onSubmit` | X while pending or trimmed length < 2 | Visible `<label>` above the textarea; visible focus on the textarea (outline token, not only a border colour change); `maxlength=600`; Enter/Shift+Enter rules (wireframe §4.4); Send is the dialog's only primary button | Textarea 16 px, `--radius-md` |
| C-34 | `StarterPrompts` | client | `prompts[]`, `onPick` | E → hidden; hidden after the first user message | `<button>` chips (`--radius-pill`) | `chat_message_sent` with `prompt_kind: starter` |
| C-35 | `EscalationRail` | client (inside C-31) | `railHeading`, `railBody`, `actions`, `rulesHeading`, `rules` | E per block → hidden | `<aside aria-labelledby>` when the heading exists; actions are **outline** buttons, `trackLocation="chat"` | ≥ 1024 px only |

**Chat API contract** (`POST /api/v1/ai-concierge`, shape from `PROJECT (web/src/components/ai/ConciergeChat.tsx)`):
- Request: `{ message: string (2–600), pagePath: string (starts with "/"), sessionId?: string (UUID) }`.
- Response 200: `{ success: true, data: { answer, messageId, responseState, sessionId, sources: [], suggestedActions: [{ label, href }] } }`.
- In this slice: `responseState = "escalation"`, `answer = concierge.escalationReply`, `suggestedActions` built from `concierge.escalationActions` (labels and hrefs from `siteSettings.ctas` / `concierge.contact*`), `sources = []`, and a new UUID `sessionId` when none was sent.
- Errors: 400 `{ success: false, error: { message } }` for validation failures (the client shows `errorReply`, never the raw message); 403 when the origin is not the site; 413 when the body is over 4 KB; 405 for other methods.
- The client sends `pagePath = location.pathname` and keeps `sessionId` in memory only (not in storage).

## 6. Data and utilities (`lib/`)

| ID | Module | Role |
| --- | --- | --- |
| C-60 | `lib/cms/client.ts`, `queries.ts`, `fetchers.ts` | Typed Sanity client (`useCdn: true`, published perspective), one homepage query, cache tags, R-01 guard, `pickVariant()` (R-06); weak work references resolved to published documents only |
| C-61 | `lib/cms/image.ts` | `@sanity/image-url` builder → `next/image` `src`, with crop/hotspot and explicit width/height |
| C-62 | `lib/utils/format-price.ts`, `resolve-price-tokens.ts` | R-02; unit labels from `ui` |
| C-63 | `lib/seo/metadata.ts`, `jsonld.ts` | Homepage `generateMetadata`; root `@graph` (`Organization` `@id` `<site>/#organization`, `WebSite`, `Person` when named); homepage `ItemList` with **inline `Service` nodes** (`@id`, `name`, `url`, `provider` → Organization `@id`, `offers.priceSpecification` from R-02 data) — `pages/home.md` §7 |
| C-64 | `lib/analytics/events.ts`, `track.ts` | Event names as a typed union; `track()` does nothing in this slice |
| C-65 | `lib/utils/cn.ts` | Joins truthy class strings |
| C-66 | `lib/static-copy/global-error.ts` | Static copy for C-27 only (`TBD-from-client`, B-08) |
