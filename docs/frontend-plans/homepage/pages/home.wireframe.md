---
title: Wireframe — Home (/)
status: final
depends-on: [pages/home.md@v2, 02-tokens.md@v2, 06-content-schemas.md@v3]
version: 3
last-updated: 2026-10-28
owner-agent: wireframe-architect
---

# Wireframe — Home (`/`)

Breakpoints for page sections: **M** mobile < 768 px (with `sm` 640 px refinements noted) · **T** tablet 768–1023 px · **D** desktop ≥ 1024 px. The header uses its own set (§4.1): **M** < 768 · **T/L** 768–1279 · **XL** ≥ 1280. Grid, container and spacing tokens: `02-tokens.md` §4. Slot ids refer to `06-content-schemas.md` fields. This file states layout and states only; every transition is specified in `pages/home.motion.md`.

## 1. Page skeleton (slot ids only, no copy)

```
DESKTOP (≥1280 header; ≥1024 sections)                       MOBILE (<768)
┌───────────────────────────────────────────────────────┐   ┌───────────────────────────┐
│ [brandName] [navigation[0..5]]  [chat][theme][fitCall] │   │[brandName] [fitCall.mob][☰]│ header (fixed)
├───────────────────────────────────────────────────────┤   ├───────────────────────────┤
│ S1 hero.eyebrow                          ┌──────────┐  │   │ hero.eyebrow              │
│ hero.h1                                  │person.   │  │   │ hero.h1                   │
│ hero.subhead                             │ photo    │  │   │ hero.subhead              │
│ [ctas.fitCall.label] [ctas.teardown.label]│name/role│  │   │ [ctas.fitCall.label]      │
│ trustRow[0] · trustRow[1] · trustRow[2]  │loc · tz  │  │   │ [ctas.teardown.label]     │
│                                          │verifyRow │  │   │ trustRow[0..2] (list)     │
│                                          └──────────┘  │   │ [photo56] person · verify │
├───────────────────────────────────────────────────────┤   ├───────────────────────────┤
│ S2 problem.heading                                     │   │ S2 problem.heading        │
│ stat[0] src │ stat[1] src │ stat[2] src                │   │ stat[0..2] stacked        │
├───────────────────────────────────────────────────────┤   ├───────────────────────────┤
│ S3 systems.heading                                     │   │ S3 panels[0], panels[1]   │
│ ┌ panels[0] ─────────────┐ ┌ panels[1] ─────────────┐  │   ├───────────────────────────┤
│ │ title·outcome·bullets×4│ │ title·outcome·bullets×4│  │   │ S4 (inset) label          │
│ │ priceLine · linkLabel →│ │ priceLine · linkLabel →│  │   │ ● steps[0] … ● steps[4]   │
│ └────────────────────────┘ └────────────────────────┘  │   │   (vertical rail)         │
├───────────────────────────────────────────────────────┤   ├───────────────────────────┤
│ S4 (inset) timeline.heading · [badge] timeline.label   │   │ S5 tryIt.* [ctaLabel]     │
│ ●──────●──────●──────●──────●   steps[0..4].time/.text │   ├───────────────────────────┤
├───────────────────────────────────────────────────────┤   │ S6 cards stacked          │
│ S5 tryIt.heading + body             [tryIt.ctaLabel]   │   ├───────────────────────────┤
│                                     smallPrint · median│   │ S7 steps[0..3] list       │
├───────────────────────────────────────────────────────┤   ├───────────────────────────┤
│ S6 proof.heading · proof.sub       proof.allWorkLabel →│   │ S8 rows[0..3]             │
│ [thumb] [thumb] [thumb]  badge · title · cardSummary   │   ├───────────────────────────┤
├───────────────────────────────────────────────────────┤   │ S9 photo · builder.*      │
│ S7 process.heading  steps[0] │ [1] │ [2] │ [3]         │   ├───────────────────────────┤
├───────────────────────────────────────────────────────┤   │ S10 (inset) agencies.*    │
│ S8 pricing.heading  rows[0] │ [1] │ [2] │ [3] link →    │   ├───────────────────────────┤
├───────────────────────────────────────────────────────┤   │ S11 faq.heading · items   │
│ S9 [person.photo] builder.heading · body · tz · list   │   ├───────────────────────────┤
├───────────────────────────────────────────────────────┤   │ S12 finalCta.* buttons    │
│ S10 (inset) agencies.body ........ agencies.linkLabel →│   ├───────────────────────────┤
├───────────────────────────────────────────────────────┤   │ footer (stacked)          │
│ S11 faq.heading │ faq.items[] (<details>)              │   ├───────────────────────────┤
├───────────────────────────────────────────────────────┤   │[fitCall.short][teardown.  │ CTA bar (after 40 %)
│ S12 finalCta.heading · body · [fitCall] [secondary] →  │   │  short]                   │
├───────────────────────────────────────────────────────┤   └───────────────────────────┘
│ FOOTER descriptor │ footer.columns[0..n-1]      (chat) │  launcher ≥ 768 px
└───────────────────────────────────────────────────────┘
```

## 2. Landmarks and DOM order

DOM order = visual order = tab order at every breakpoint. Responsive changes come from CSS grid placement only; content is never reordered in the DOM. `CLIENT (02 §9.11)` + baseline.

1. Skip link (`ui.skipLink`, first focusable, visible on focus, targets `#main`)
2. `<header>` (banner) → wordmark link (accessible name = `brandName`) → `<nav aria-label={ui.navLabel}>` (XL only) → chat button (T/L, XL) → theme toggle (T/L, XL) → header CTA → menu button (M, T/L) → mobile menu panel (M, T/L)
3. `<main id="main">` → S1 … S12, each a `<section aria-labelledby="<section-id>-h">` except S10 (a plain block, no heading)
4. `<footer>` (contentinfo) → `<nav aria-label={ui.footerNavLabel}>` with columns → verify row → legal row
5. Mobile CTA bar (M only; after the footer in the DOM; fixed position)
6. Chat launcher (≥ 768) and the `<dialog>` (rendered on first open)

All of the chrome is rendered by the **root layout** (`91-stack.md` §3), so `not-found` pages have the same landmarks and `#main`.

## 3. Heading outline

```
H1  hero.h1                                   (S1, exactly one)
  H2  problem.heading                         (S2)
  H2  systems.heading                         (S3)
    H3  service.title  ×2                     (panels)
  H2  timeline.heading                        (S4)
  H2  tryIt.heading                           (S5)
  H2  proof.heading                           (S6; absent when S6 is hidden)
    H3  workEntry.title  ×0–3                 (cards)
  H2  process.heading                         (S7)
    H3  process.steps[].title  ×4
  H2  pricing.heading                         (S8)
    H3  pricing.rows[].label  ×4
  H2  builder.heading                         (S9)
  H2  faq.heading                             (S11; questions are <summary> text, not headings)
  H2  finalCta.heading                        (S12)
footer:
  H2  footer.columns[].heading  ×n  (n = 3 seeded, max 4; visually small; outside <main>)
chat dialog:
  H2  concierge.title  (dialog heading)
```

## 4. Shared chrome

### 4.1 Header (`header`)

| | M (< 768) | T/L (768–1279) | XL (≥ 1280) |
| --- | --- | --- | --- |
| Height | 64 px | 72 px | 72 px |
| Left | Wordmark | Wordmark | Wordmark |
| Centre | — | — | Nav: `navigation[]` in order; items with `children` are dropdown triggers |
| Right (in order) | `ctas.fitCall.labelMobile` pill (primary, `--radius-pill`, 44 px tall) · menu button | Chat button · theme toggle · `ctas.fitCall.labelShort` button (primary, md) · menu button | Chat button · theme toggle · `ctas.fitCall.label` button (primary, md) |
| Container | `--container-content` with side padding (same as page) | same | same |

All header controls are ≥ 44 × 44 px. The wordmark link is ≥ 44 px tall. The header CTA is always the `primary` variant: it is persistent chrome, outside the one-primary-per-viewport rule for `main` (`pages/home.md` §1). Below 768 px the theme toggle lives inside the mobile menu (§4.1.2), not in the bar.

#### 4.1.1 Width budget (estimates; measured in QA A-08 / A-10)

Assumptions: wordmark 11 px/char at 20 px (10 chars ≈ 110 px; ≈ 121 px at 22 px); Manrope 700 at 15 px ≈ 8.6 px/char; buttons have 20 px side padding (pill 16 px); 8 px gaps. Width available = viewport − side padding.

| Viewport | Available | Items | Estimated total | Result |
| --- | --- | --- | --- | --- |
| 375 | 335 | wordmark 110 + pill (`labelMobile` ≤ 12 chars ≈ 103 + 32) + menu 44 + gaps 16 | ≈ 305 | fits (≈ 30 px spare) |
| 320 | 280 | **compact rule < 360 px:** wordmark 18 px (≈ 99) + pill at 14 px text, 12 px padding (≈ 96 + 24) + menu 44 + gaps 12 (6 px) | ≈ 275 | fits (≈ 5 px spare; QA verifies) |
| 768 | 704 | wordmark 121 + chat 44 + theme 44 + `labelShort` (≤ 18 chars ≈ 155 + 40) + menu 44 + gaps 32 | ≈ 480 | fits |
| 1024 (nav **not** shown) | 944 | as 768 | ≈ 480 | fits. With the full nav it would need ≈ 965 px (nav ≈ 542 px for the seeded labels), which does not fit; hence the nav starts at 1280 (D-026) |
| 1280 | 1200 | wordmark 121 + gap 32 + nav ≈ 542 + gap 16 + chat 44 + theme 44 + `label` (≤ 32 chars ≈ 275 + 40) + gaps 16 | ≈ 1130 | fits (≈ 70 px spare) |

Content guards: `ctas.fitCall.labelMobile` ≤ 12 chars (`06` §1); the seeded nav labels total 42 characters, and Studio warns above 52 characters in total across top-level labels.

#### 4.1.2 States

Data attribute `data-header-state` on the header:

| State | When | Appearance |
| --- | --- | --- |
| `solid` | **Server default.** Also the no-JS state, and the state when the island fails to hydrate | Opaque `--color-surface`. Content scrolling underneath is never visible through it. |
| `top` | Set by JS only, on `/` at `scrollY ≤ 8`. Before hydration, the head script (C-18) adds `data-home-top` to `<html>` when the path is `/`, so CSS can show `top` from first paint; the island takes over on hydration and removes the flag. | Transparent background; overlays the hero. The hero reserves `--chrome-h` of top padding, so nothing sits under the bar. |
| `scrolled` | Set by JS at `scrollY > 8` | `--color-surface` at 85 % opacity with a 12 px backdrop blur. **Solid `--color-surface`** when `backdrop-filter` is unsupported or `prefers-reduced-transparency: reduce` matches. |
| `hidden` | Set by JS at `scrollY > 64` after ≥ 8 px of downward scroll since the last direction change | Moved fully above the viewport. It stays in the tab order: when keyboard focus enters the header (for example Shift+Tab from the top of `main`), the header is pinned and visible at once. Returns to `scrolled` on any upward scroll. |
| Pinned (never `hidden`) | Mobile menu open, a dropdown open, keyboard focus inside the header, or `scrollY ≤ 64` | — |

The `.no-js` CSS forces the `solid` appearance whatever the state attribute says. Behaviour source: `PROJECT (web/src/lib/useScrollDirection.ts, SiteTopChrome.tsx)` with the pinned conditions and the solid default added (D-016). When focus moves to an element the fixed header would cover, `scroll-padding-top` keeps it clear (WCAG 2.4.11).

**Dropdown (XL):** the trigger is a `<button aria-expanded aria-controls>` named "`<item label>` `ui.submenuToggle`". The panel opens directly below the trigger: `--color-surface`, 1 px `--color-border-strong`, `--radius-md`, links ≥ 44 px tall, min width 260 px. It opens on click, Enter or Space. Escape closes it and returns focus to the trigger; clicking outside or tabbing out also closes it. Only one dropdown is open at a time, and it never opens on hover. Without JS (`.no-js`), the trigger is replaced by a plain link to the parent `href` (`/services`, `/industries`).

**Mobile menu (M, T/L):** a `<button aria-expanded aria-controls="mobile-menu">` named `ui.menuOpen` / `ui.menuClose`. The panel is fixed from the bottom of the header bar to the bottom of the viewport, `--color-surface`, and scrolls internally. Contents, in order:
1. Each nav item as a link. Items with children show the parent link followed by an indented list of child links.
2. A hairline.
3. (M only) A theme row: visible label `ui.themeRowLabel` and the theme toggle button (`aria-pressed`, name `ui.themeToggle`).
4. Chat entry button (label `concierge.title`; hidden while chat is unavailable, `06` §1.2).
5. Fit-call primary button (full label), then the teardown outline button.

While the menu is open:
- Page scroll is locked.
- `main`, the footer, the CTA bar and the launcher are `inert`.
- Focus moves to the first link.

Escape or the button closes the menu and returns focus to the button. Activating any link closes it. The chat entry follows the sequence in §4.4. Without JS, the menu button is replaced by a link to `#footer-nav`.

**Wordmark:** live text `brandName` in `--font-display` 600 at 20 px (M; 18 px below 360 px) / 22 px (T/L, XL), `--color-text`. It is replaced by `logo.svg` when the client supplies it (fixed 28 px height, explicit width).

### 4.2 Footer (`footer`)

`n` = the number of `footer.columns` (3 seeded, from 02 §3.3 columns 2–4; maximum 4).

| | M | T | D |
| --- | --- | --- | --- |
| Layout | All blocks stacked | Descriptor full width; link columns in a grid of `min(n, 3)` columns (n = 3 → one row of 3; n = 4 → 2 × 2) | Descriptor cols 1–4; link columns share cols 5–12 as an equal `n`-column sub-grid (n = 3 → three equal columns; n = 4 → four) |
| Verify row | `footer.verifyLabel` then links (wrap) | same | single line |
| Legal row | © year + `brandName` · legal links · Upwork link (`ctas.upwork`) | same | same, one line |
| Bottom padding | `--bar-h` + 16 px (the CTA bar never covers the legal row) | 96 px on the inline-end side (clear of the launcher) | same as T |

Column 5 "Free stuff" (02 §3.3) is not seeded until Phase 2 content exists. Link targets that are not built yet return the designed 404 (Gate 1 answer 5; this slice is preview-only, D-027). Year: the server renders `new Date().getFullYear()` at build.

### 4.3 Mobile CTA bar (`mobile-cta-bar`, M only)

- Fixed to the bottom edge, full width, `--color-surface` with a 1 px `--color-border-strong` top rule. Padding 10 px 20 px, plus `env(safe-area-inset-bottom)`.
- Two buttons on one row, sharing the width: fit-call primary (`labelShort`, flex 1.4) and teardown outline (`teardown.labelShort`, flex 1). Both are 44 px tall and use the two-tone focus ring (`02-tokens.md` §2).
- **Shown** once the reader has scrolled 40 % of the scrollable height.
- **Hidden** while the footer is in view, the mobile menu is open, the chat dialog is open, or a text field has focus. Hidden means moved out of view, `visibility: hidden` and `inert`.
- `main` always reserves `--bar-h` of bottom padding below 768 px, so showing the bar never moves content (CLS 0).
- Below 768 px, `html` also sets `scroll-padding-bottom: var(--bar-h)`, so a focused element is never hidden behind the bar (WCAG 2.4.11).
- Without JS the bar stays hidden; the hero and S12 carry the same CTAs.
- The bar is persistent chrome, outside the one-primary rule for `main`.
- `CLIENT (02 §3.2)`

### 4.4 Chat (`chat`)

**Availability:** every trigger is hidden while any required `concierge` field is empty (`06-content-schemas.md` §1.2, B-06), and under `.no-js` (with `visibility: hidden`, which keeps the space so nothing shifts).

**Triggers** (all call the same store `open(location)`): header chat button (T/L, XL; icon only, name `ui.chatOpen`), mobile-menu entry (M, T/L), launcher (≥ 768).

**Loading the chunk:** the first hover, focus or press on any trigger starts loading the modal code.
- If the user presses before it has loaded, the trigger sets `aria-busy="true"` and ignores repeat presses.
- After 300 ms it also shows its pressed style.
- The dialog opens as soon as the code arrives.
- If loading fails, or takes longer than 8 s, the browser navigates to `concierge.contactHref`. Contact is the same route the error reply offers, so the visitor can still reach a person.

**From the mobile menu:**
1. Selecting the chat entry closes the menu without moving focus to the menu button.
2. The dialog opens.
3. When the dialog closes, focus returns to the **menu button**: the store records the opener as `menu`, because the menu item itself is gone once the menu closes.

**Launcher (≥ 768):** fixed at inline-end 24 px, bottom 24 px. A 56 px circle with `--color-primary` fill, a `--color-on-primary` icon, `--shadow-3`, name `ui.chatOpen`, and the two-tone focus ring. It stays rendered while the dialog is open, so focus can return to it.

**Dialog:** native `<dialog>` opened with `showModal()`, `aria-labelledby` = title, `aria-describedby` = subtitle. Page scroll is locked while it is open.

| | < 640 | 640–1023 | ≥ 1024 |
| --- | --- | --- | --- |
| Frame | Full screen (`100dvh`), no radius, safe-area padding top and bottom | Centred panel `min(1120px, 100% − 2rem)` × `min(88dvh, 860px)`, `--radius-lg`, 1 px `--color-border-strong`, `--shadow-3`, `--color-surface` | same |
| Backdrop | — | `--color-overlay` with a static 4 px blur; clicking it closes | same |
| Header row | `concierge.title` (display 600, 22 px) + `subtitle` (small, muted) + close button (44 px, `ui.chatClose`) at the inline end | same; title 24 px | same |
| Body | Conversation only | Conversation only | Conversation (flexible) + **rail** 320 px at the inline end, separated by a hairline |
| Rail (≥ 1024) | — | — | `railHeading`, `railBody`, then `escalationActions` as full-width **outline** buttons, then the rules card (`rulesHeading`, `rules`). Each block is hidden when empty. |

**Conversation column, top to bottom:**
1. **Thread** — `role="log"`, `aria-live="polite"`, `aria-relevant="additions"`; scrolls internally (`overscroll-behavior: contain`); padding 16 / 20 px; gap 16 px.
   - The first message is `concierge.intro` (assistant).
   - **Assistant bubble:** `--color-inset`, `--radius-md` with the inline-start bottom corner at `--radius-sm`, max width 88 % (M) / 78 % (≥ 640), `--text-chat`. A small `assistantLabel` line (`--text-badge`, muted, decorative sparkle icon `aria-hidden`) sits above the text.
   - **Under an assistant reply:** action buttons from `escalationActions` (outline, 44 px, wrap; `trackLocation="chat"`).
   - **`no_answer` reply:** 1 px `--color-border-control` outline, plus an information icon and the visible text cue `concierge.noAnswerCue`. This state does not occur in this slice (escalation only); it is specified for the backend slice.
   - **User bubble:** `--color-inverse` fill, `--color-on-inverse` text, aligned to the inline end, same radius rule mirrored.
   - **Pending:** a bubble with `pendingText`, and `aria-busy="true"` on the thread.
   - **Error:** an assistant bubble with `errorReply` and the same actions, with a destructive-colour icon next to the text (not colour alone).
2. **Starter prompts** — shown only before the first user message, and only when `starterPrompts` has items. Chips: `--radius-pill`, 1 px `--color-border-control`, 44 px tall. They wrap at ≥ 640 px and form one horizontally scrollable row below 640 px.
3. **Composer** — a `<form>` holding:
   - a **visible** `<label>` above the field (`inputLabel`, `--text-small`, muted; quality-standard §11.2);
   - a `<textarea>` (`--text-input` 16 px, 2 rows, grows to 160 px max, `maxlength=600`, 1 px `--color-border-control`, `--radius-md`);
   - the send button (`sendLabel`). Send is the **only primary-styled button in the dialog**.

   Field and button sit side by side at ≥ 640 px; below 640 px the button sits under the textarea, aligned to the inline end. Send is disabled while pending or when the trimmed input is under 2 characters. Enter sends, Shift+Enter adds a new line, and nothing is sent while an IME composition is active.

**Focus and closing:**
- On open, focus goes to the textarea.
- Escape, the close button, a backdrop click, or activating any link in the dialog closes it.
- On close, focus returns to the opener: the trigger itself, or the menu button when the opener was the menu entry. Native `<dialog>` return is backed by an explicit `.focus()` on the recorded target.
- The page behind the dialog is inert while it is open.

## 5. Sections

Section frame: `<section>` with block padding `--space-section`, content in `--container-content`. Headings are left-aligned. Gap from section H2 to content: 32 px (M) / 48 px (D).

### S1 Hero (`s1-hero`)

| | M | T | D |
| --- | --- | --- | --- |
| Grid | 1 column | 1 column | 12 cols: copy cols 1–7, founder card cols 9–12, vertically centred against the copy |
| Top padding | `--chrome-h` + 40 px | `--chrome-h` + 64 px | `--chrome-h` + 96 px |
| Order | eyebrow → H1 → subhead → CTAs → trust row → founder card | same | same (the founder card sits in the right column through grid placement) |
| CTAs | Stacked full width, 48 px (lg): primary `ctas.fitCall.label`, outline `ctas.teardown.label` | Inline, wrap | Inline |
| Trust row | Vertical list, check icon + text | Inline list, wraps | Inline list |
| Founder card | Compact row: 56 px photo (`--radius-md`) + name / role / `location · timezone` + verify links (`verifyMe` lead-in) | Compact row, wider | Full card: photo 4:5 at the card width (max 320 px, `--radius-lg`), name (`--text-h3`), role, `location · timezone`, verify links; `--color-surface`, hairline border, padding 20 px |

- Slots: `hero[variant].eyebrow`, `.h1`, `.subhead`; `siteSettings.ctas.fitCall`, `.teardown`; `siteSettings.trustRow`; `person.*`; `siteSettings.verifyLinks` (Upwork, LinkedIn, GitHub only, per 02 §5.2 S1).
- **LCP:** at M and T, the H1 text. At D, the founder photo (one `next/image` with `preload`, `sizes="(min-width:1024px) 320px, 56px"`). The H1 is never hidden or transparent at first paint.
- With no `person.name` or `person.photo`, the founder card is hidden and the copy spans cols 1–8 (D).
- `CLIENT (02 §5.1 S1, §5.2 S1)`

### S2 Problem strip (`s2-problem`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | 3 rows stacked, hairline between rows | 3 equal columns, vertical hairlines between | 3 equal columns, vertical hairlines between |
| Cell | value (`--text-stat`) → label (`--text-body`) → source line (`--text-small`, muted: `ui.sourcePrefix` + `SourceLink` to `stat.sourceUrl`, text `sourceName`, external suffix) | same | same |

- Rendered as a `<ul>` of 3 items. Each value and its label read as one sentence to screen readers (the value is not split from the label).
- Slots: `problem.heading`, `problem.statsByVariant[variant]`.
- `CLIENT (02 §5.1 S2, §5.2 S2, §4.0 source line)`

### S3 Two systems (`s3-systems`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | 2 panels stacked, gap 16 px | 2 columns (6/6) | 6/6 (`dual`) or 7/5 (`law`/`accounting`, larger panel first) |
| Panel | `--color-surface`, 1 px `--color-border`, `--radius-md`, padding 24 px | padding 28 px | padding 32 px |
| Panel content | H3 `service.title` → outcome (`--text-lead`) → 4 bullet rows (hairline-separated; check icon `aria-hidden` + text) → price line (`--text-small` muted, with the price figure in `--text-price`) → text link `linkLabel` + arrow to `/services/<slug>` | same | same |

- The link's accessible name includes the service title (visually hidden suffix), so the two "See how it works" links can be told apart.
- Slots: `systems.heading`, `systems.panels[]`.
- `CLIENT (02 §5.1 S3, §5.2 S3)`

### S4 Overnight timeline (`s4-overnight`) — `--color-inset` band

| | M | T | D |
| --- | --- | --- | --- |
| Label | `HonestBadge` (`illustrative`) + `timeline.label`, directly under the H2, always visible | same | same |
| Steps | Vertical `<ol>` of exactly 5: rail on the inline-start side, 12 px marker per step, time (`--text-time`) then text (`--text-body`) | Vertical `<ol>` | Horizontal `<ol>` of 5 equal columns: markers on one connector line, time under the marker, text under the time |
| Marker states | `outline` (ring in `--color-status-illus`) and `filled` (solid `--color-status-illus`); the default and static final state is `filled` | same | same |

- Markers are decorative (`aria-hidden`); the time and text carry the meaning.
- Slots: `timeline.heading`, `timeline.label`, `timeline.byVariant[variant]` (exactly 5 steps).
- `CLIENT (02 §5.1 S4, §5.2 S4, §2.5 status language)`

### S5 Try it (`s5-try-it`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | Stacked: H2 → body → button → small print → median line | same | 12 cols: H2 + body cols 1–7; button + small print + median line cols 9–12, aligned to the bottom of the body |
| Button | Outline, lg (48 px), `tryIt.ctaLabel` → `tryIt.ctaHref` | same | same |

- The median line renders only when `siteSettings.medianReplySeconds` is set (`{seconds}` in `--text-time`).
- `CLIENT (02 §5.1 S5, §5.2 S5)`

### S6 Proof (`s6-proof`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | Cards stacked | Cards stacked as horizontal rows: thumbnail 40 % · text 60 % | 3 columns |
| Card | Thumbnail 16:9 (`--radius-md`, lazy, `sizes="(min-width:1024px) 360px, (min-width:768px) 280px, 100vw"`) → `HonestBadge` → H3 title (the card's single link, stretched over the card; focus ring on the card outline) → `cardSummary` | same | same |
| After cards | `proof.allWorkLabel` link to `/work`, then `honestProofNote` (`--text-small`, muted) | same | Link aligned to the inline end of the H2 row; note under the grid |

- 0 featured or published entries → the whole section is hidden (the expected first-build state). 1–2 entries → the grid keeps its columns, left-aligned.
- `CLIENT (02 §5.1 S6, §5.2 S6, §4.0 honest-proof note)`

### S7 How a project runs (`s7-process`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | `<ol>` stacked, hairline between steps | 2 × 2 grid | 4 columns, vertical hairlines between |
| Step | Number (`--text-price`, tabular, muted) → H3 title → body | same | same |

- `CLIENT (02 §5.1 S7, §5.2 S7)`

### S8 Pricing snapshot (`s8-pricing`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | `<ul>` of 4 rows: H3 label at the inline start, price at the inline end, note below; hairlines between | 2 × 2 grid | 4 columns, vertical hairlines between; link to `/pricing` under the row, aligned to the inline end |
| Price | `--text-price`, tabular, from R-02 | same | same |

- `CLIENT (02 §5.1 S8, §5.2 S8)`

### S9 One accountable builder (`s9-builder`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | Photo (4:5, max width 240 px) → H2 → body → timezone statement → security list → security link → verify row | Photo cols 1–4 of an 8-col grid, text cols 5–8 | Photo cols 1–4 (4:5, lazy), text cols 6–12 |
| Security list | 3 rows, check icon `aria-hidden` + text | same | same |
| Verify row | `builder.verifyLabel` then Upwork · LinkedIn · GitHub · YouTube links (each hidden when its URL is empty) | same | same |

- Without `person.photo`, the photo column is removed and the text spans the full width. Without `builder.body`, the body paragraph is omitted.
- `CLIENT (02 §5.1 S9, §5.2 S9, §4.0 timezone statement)`

### S10 Agencies band (`s10-agencies`) — `--color-inset` band, reduced padding (48 px block)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | Body then link, stacked | One row: body at the start, link at the end | same as T |

- Not a landmark and has no heading (02 §5.2 S10 gives no heading). The link is a plain text link with no `cta_click` (`pages/home.md` §8).
- `CLIENT (02 §5.1 S10, §5.2 S10)`

### S11 FAQ (`s11-faq`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | H2, then a list of `<details>` | same | H2 cols 1–4; list cols 5–12 |
| Item | `<summary>` (question, `--font-sans` 700, 18 px, ≥ 44 px tall, chevron `aria-hidden` at the inline end) + answer (portable text, `--text-body`, `--container-prose`) | same | same |

- Every answer is in the server HTML. Items are separated by hairlines and all start closed.
- `CLIENT (02 §5.1 S11, §5.2 S11, §4.0 visible FAQ)`

### S12 Final CTA (`s12-final-cta`)

| | M | T | D |
| --- | --- | --- | --- |
| Layout | H2 → body → primary (lg, full width) → outline (lg, full width, `finalCta.secondaryLabel`) → text link (`finalCta.tertiaryLabel` → `ctas.audit.href`) | Buttons inline | Content cols 1–8; buttons inline; text link after the buttons |
| Frame | 1 px `--color-border-strong` top rule | same | same |

- `CLIENT (02 §5.1 S12, §5.2 S12)`

## 6. Reflow and robustness

- At 320 px wide there is no horizontal scroll: the header follows the compact rule in §4.1.1, and long words in stats and prices wrap or shrink only through their tokens, never by clipping.
- Layout uses logical properties (inline-start/end), so a forced `dir="rtl"` run shows no clipping, even though the site is LTR only.
- Every component hides cleanly when its content is empty (R-03). The page still reads in order with S6 and the founder elements hidden, which is the expected state for the first test build.
