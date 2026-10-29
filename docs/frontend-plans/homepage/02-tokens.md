---
title: Design tokens — Growrix OS (homepage scope)
status: final
depends-on: [00-brief.md@v3, 01-art-direction.md@v2]
version: 2
last-updated: 2026-10-28
owner-agent: style-director
---

# Design tokens

Tailwind CSS v4, CSS-first. Semantic names live in `@theme` (`--color-*`, `--font-*`, `--text-*`, `--radius-*`, `--shadow-*`, `--ease-*`), each pointing at a per-theme raw value (`--c-*`) set under `[data-theme="light"]` and `[data-theme="dark"]` on `<html>`. This is the reference mechanism, `PROJECT (web/src/app/globals.css)`. Components use semantic names only. No raw hex, px colour or font name inside a component.

Source key: **REF** = carried unchanged from `PROJECT (web/src/app/globals.css)`. **NEW** = added by this plan (reason given). **02** = `CLIENT (02 §2.6)`.

## 1. Colour

### 1.1 Theme mechanism

| Item | Value | Source |
| --- | --- | --- |
| Attribute | `data-theme="light" \| "dark"` on `<html>`; server HTML ships `data-theme="light"` and class `no-js` | REF mechanism; light default = Gate 1 answer 1 |
| Default | **light** | CLIENT (Gate 1 answer 1) |
| Persistence | `localStorage` key `growrix-os-theme`, values `light` / `dark` only; no legacy keys | REF key name |
| Pre-paint bootstrap | Inline blocking script in `<head>` reads the key, sets `data-theme` (fallback `light`), and swaps `no-js` → `js` on `<html>`. Wrapped in try/catch, which falls back to light. | REF pattern (`web/src/lib/theme-bootstrap.ts`), default changed |
| `color-scheme` | `light` / `dark` per theme | REF |
| `<meta name="theme-color">` | Server value `#f5f1e8`; the toggle updates it to the active theme's `--c-bg` | NEW (keeps browser chrome matching) |
| Dark-mode Tailwind variant | `dark:` keyed to `[data-theme="dark"]`, not to `prefers-color-scheme` | REF behaviour |

### 1.2 Colour tokens

| Semantic token | Light | Dark | Role | Source |
| --- | --- | --- | --- | --- |
| `--color-bg` | `#f5f1e8` | `#000000` | Page background | REF |
| `--color-surface` | `#fffdf8` | `#0a0a0a` | Raised panels, cards, header (scrolled), chat panel | REF |
| `--color-inset` | `#ece5d8` | `#111111` | Alternate band (S4, S10), assistant bubbles, hover fill for ghost/outline controls | REF |
| `--color-overlay` | `rgba(20,22,26,0.72)` | `rgba(0,0,0,0.78)` | Chat modal backdrop | REF |
| `--color-border` | `#d5ccbb` | `#1a1a1a` | Decorative hairlines and dividers only (never the only boundary of a control) | REF |
| `--color-border-strong` | `#b9ad94` | `#2a2a2a` | Emphasised decorative hairline (S12 top rule, CTA bar top rule, dropdown and chat panel edges) | REF |
| `--color-border-control` | `#8a7f6c` | `#706b62` | Boundary of inputs, outline buttons, chips, and any border that carries meaning (chat `no_answer` bubble) (≥ 3:1) | NEW — REF borders measure 1.4:1 / 1.2:1, below the 3:1 UI-boundary floor |
| `--color-text` | `#171a1f` | `#f1ece1` | Headings, body | REF |
| `--color-text-muted` | `#5c6470` | `#9aa3b0` | Secondary text, captions, source lines, eyebrow | REF |
| `--color-primary` | `#0e6b63` | `#2dd4bf` | **Interactive only:** primary button fill, text links, launcher, pressed state | REF; role rule CLIENT (02 §0) |
| `--color-primary-hover` | `#0b5e58` | `#5eead4` | Hover/active of primary | REF |
| `--color-on-primary` | `= --c-surface` (`#fffdf8`) | `= --c-surface` (`#0a0a0a`) | Text/icons on primary fill | NEW alias (REF buttons already use surface text; white text on dark-theme teal measures 1.9:1 and is banned) |
| `--color-focus` | `= --c-primary` | `= --c-primary` | Focus ring | NEW alias |
| `--color-inverse` | `= --c-text` (`#171a1f`) | `= --c-text` (`#f1ece1`) | Chat **user** message bubble fill | NEW — REF used primary for user bubbles, which breaks the interactive-only rule |
| `--color-on-inverse` | `= --c-bg` (`#f5f1e8`) | `= --c-bg` (`#000000`) | Text on inverse | NEW |
| `--color-status-done` | `#0d7245` | `#34d399` | Status "complete" dot/icon | REF (`--c-success`) |
| `--color-status-wait` | `#94660f` | `#f0b96b` | Status "waiting" dot/icon | Light NEW (REF `#b98016` measures 2.7:1 on inset); dark REF (`--c-warning`) |
| `--color-status-illus` | `= --c-text-muted` | `= --c-text-muted` | Status "illustrative", S4 timeline dots, `illustrative` badge | NEW alias; meaning CLIENT (02 §2.5) |
| `--color-destructive` | `#b73a3a` | `#f87171` | Chat error state icon only (always next to text) | REF |

**Not in this token set** (homepage scope only, D-028): the reference `secondary` (`#c56a3b` / `#e8895a`), `accent` (`#1783ff` / `#4aa3ff`), `info`, `success`/`warning` (their homepage roles are covered by `status-*`), and `contrast*` slab colours. Their values stay recorded in `00-brief.md` Project reality for later page plans.

**Not carried over** (D-004): `--body-background-image` radial washes, `--bg-grid-line*`, `.marketing-title-accent` gradient text, `.hero-glow`, the `--preview-device-bar*` tokens, the admin/dashboard layout tokens.

## 2. Contrast table

Ratios were computed with the WCAG 2.x relative-luminance formula (hand calculation; the build re-measures them with axe and a contrast checker; see `93-qa-checklist.md` A-02). Large text = ≥ 24 px, or ≥ 18.66 px bold.

| Pair | Light | Dark | Need | Result |
| --- | --- | --- | --- | --- |
| text on bg | 15.5 | 17.8 | 4.5 | PASS |
| text on surface | 17.2 | 16.8 | 4.5 | PASS |
| text on inset | 13.9 | 16.0 | 4.5 | PASS |
| text-muted on bg | 5.30 | 8.32 | 4.5 | PASS |
| text-muted on surface | 5.88 | 7.84 | 4.5 | PASS |
| text-muted on inset | 4.77 | 7.48 | 4.5 | PASS |
| primary (link text) on bg | 5.64 | 11.3 | 4.5 | PASS |
| primary (link text) on surface | 6.26 | 10.6 | 4.5 | PASS |
| primary (link text) on inset | 5.08 | 10.1 | 4.5 | PASS |
| on-primary on primary (button label) | 6.26 | 10.6 | 4.5 | PASS |
| on-primary on primary-hover | 7.50 | 13.4 | 4.5 | PASS |
| on-inverse on inverse (user bubble) | 15.5 | 17.8 | 4.5 | PASS |
| focus ring (primary) vs bg / surface / inset | 5.64 / 6.26 / 5.08 | 11.3 / 10.6 / 10.1 | 3.0 | PASS |
| border-control vs bg / surface / inset | 3.49 / 3.87 / 3.14 | 3.97 / 3.74 / 3.57 | 3.0 | PASS |
| status-done vs bg / surface / inset | 5.31 / 5.89 / 4.78 | 10.9 / 10.3 / 9.8 | 3.0 (graphic) | PASS |
| status-wait vs bg / surface / inset | 4.47 / 4.96 / 4.02 | 11.9 / 11.2 / 10.7 | 3.0 (graphic) | PASS |
| status-illus vs bg / surface / inset | 5.30 / 5.88 / 4.77 | 8.32 / 7.84 / 7.48 | 3.0 (graphic) | PASS |
| destructive icon vs bg / surface / inset | 5.06 / 5.61 / 4.56 | 7.59 / 7.16 / 6.83 | 3.0 (graphic) | PASS |
| REF border vs bg (for reference) | 1.41 | 1.21 | 3.0 if used as a control boundary | FAIL → decorative use only; controls use `border-control` |
| REF white text on dark primary (for reference) | — | 1.86 | 4.5 | FAIL → banned; `on-primary` used |
| `border-strong` as the only cue of a state (for reference) | 2.18 vs surface | 1.38 vs surface | 3.0 | FAIL → never the only cue; the chat `no_answer` state uses `border-control` plus an icon and text (C-32) |

**Focus ring rule:** the ring is a 2 px solid `--color-focus` outline at a 2 px offset (≥ 3:1 on bg, surface and inset; see above). **Floating controls** (chat launcher, mobile CTA bar buttons) can sit over any background, including thumbnails, so they use a two-tone ring: the same outline plus a 4 px `--color-surface` halo (`box-shadow`) between the control and the outline. The halo gives the outline a known background, so the ring keeps ≥ 3:1 regardless of what lies behind.

Rules: status colours are graphics only. Their labels are set in `--color-text` (light-theme `status-wait` text is 4.47:1, just under 4.5). The dark theme pairs `#f1ece1` with pure `#000`, which some readers see as halation; it is kept because it is the client's locked palette, and the light theme is the default.

## 3. Typography

| Token | Family / weight | Size | Line-height | Tracking | Use | Source |
| --- | --- | --- | --- | --- | --- | --- |
| `--font-display` | Bricolage Grotesque 600 | — | — | — | H1, H2, wordmark, chat title | REF family; 600 only |
| `--font-sans` | Manrope 400 / 700 | — | — | — | Everything else | REF family; Gate 1 answer 3 |
| `--text-display` | display 600 | 36 px (< 640) · 48 px (640–1023) · 45.6 px (1024–1279) · 50.4 px (≥ 1280) | 1.05 | −0.025em | H1 only, `text-wrap: balance` | REF (`HERO_DISPLAY_TITLE_CLASS`) |
| `--text-h2` | display 600 | 30 px (< 640) · 36 px (≥ 640) | 1.08 | −0.025em | Section H2, `text-wrap: balance` | REF (`SECTION_TITLE_CLASS`) |
| `--text-h3` | sans 700 | 20 px (< 1024) · 24 px (≥ 1024) | 1.3 | −0.01em | Panel, card, step and price-row titles | 02 sizes; family per answer 3 |
| `--text-lead` | sans 400 | 17 px | 28 px | 0 | Hero subhead, section intro paragraph, `text-wrap: pretty` | REF (SectionHeading description) |
| `--text-body` | sans 400 | 17 px (< 1024) · 18 px (≥ 1024) | 1.6 | 0 | Body copy, FAQ answers | 02 |
| `--text-small` | sans 400 | 14 px | 1.5 | 0 | Source lines, small print, footer legal | 02 (13–14 px; 14 chosen for legibility) |
| `--text-eyebrow` | sans 700 | 13 px | 1.4 | 0.04em | Hero eyebrow; sentence case; 24 px leading rule in `--color-border-strong` | REF eyebrow adapted (D-010) |
| `--text-badge` | sans 700 | 13 px | 1 | 0.02em | Honest badges, status pills | NEW |
| `--text-stat` | sans 700, `tabular-nums` | 40 px (< 1024) · 48 px (≥ 1024) | 1 | −0.02em | S2 stat values | 02 (tabular numbers) |
| `--text-price` | sans 700, `tabular-nums` | 24 px (< 1024) · 28 px (≥ 1024) | 1.2 | −0.01em | S8 prices, S3 price line figure | 02 |
| `--text-time` | sans 700, `tabular-nums` | 15 px | 1.4 | 0 | S4 timestamps | 02 |
| `--text-button` | sans 700 | 15 px (md) · 16 px (lg) | 1 | −0.01em | Button labels | REF sizes |
| `--text-chat` | sans 400 | 15 px | 24 px | 0 | Chat bubbles | REF 14 px raised to 15 px |
| `--text-input` | sans 400 | 16 px | 24 px | 0 | Chat textarea (≥ 16 px, no iOS zoom) | quality-standard §11.2 |

Font loading: `next/font/google` (self-hosted at build, 0 runtime requests to Google), `subsets: ['latin']`, `display: 'swap'`, `adjustFontFallback` on, exposed as CSS variables mapped into `--font-display` / `--font-sans`. Preload: Bricolage 600 and Manrope 400/700 (all three are above the fold). Cap: 2 families, ≤ 3 woff2 files, ≤ 90 KB. The build verifies the actual file count Google serves for the requested weights (`90-performance.md` P-04). `CLIENT (02 §2.6, §9.4)`

**Not carried over:** JetBrains Mono (Gate 1 answer 3); reference mobile type variables at 13 px body and 8 px eyebrow (D-004).

## 4. Spacing, layout, radius, elevation

| Token | Value | Source |
| --- | --- | --- |
| `--container-content` | 1200 px | 02 (`--max-content`; reference 1440 not adopted, D-011) |
| `--container-prose` | 68ch | 02 |
| Container side padding | 20 px (< 640) · 32 px (640–1023) · 40 px (≥ 1024) | NEW |
| Grid | 12 columns, gap 16 px (< 1024) · 24 px (≥ 1024) | 02 (12-col) |
| `--space-section` | `clamp(64px, 9vw, 120px)` block padding per section | 02 |
| Spacing scale | Tailwind default 4 px scale | REF (Tailwind) |
| `--chrome-h` | 64 px (< 768) · 72 px (≥ 768) | REF (`--site-chrome-height`) |
| `--bar-h` | 64 px + `env(safe-area-inset-bottom)` | NEW (mobile CTA bar) |
| `scroll-padding-top` on `html` | `calc(var(--chrome-h) + 16px)` | quality-standard §6.3 |
| `--radius-sm` | 6 px — honest badges; the small "tail" corner of chat bubbles | 02 |
| `--radius-md` | 10 px — buttons, panels, cards, thumbnails, chat bubbles, the chat textarea, nav dropdown panel, compact founder photo | 02 |
| `--radius-lg` | 16 px — chat modal panel, hero founder photo | NEW (02 has no large radius) |
| `--radius-pill` | 9999 px — starter-prompt chips, launcher, mobile `labelMobile` header pill | 02 |
| `--shadow-1` | light `0 1px 2px rgb(28 25 23 / 0.06)` · dark `0 1px 2px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3)` | light 02 · dark REF |
| `--shadow-3` | light `0 12px 32px rgba(20,22,26,0.12), 0 24px 64px rgba(20,22,26,0.12)` · dark `0 12px 32px rgba(0,0,0,0.55), 0 24px 64px rgba(0,0,0,0.45)` | REF |

Shadow use: `--shadow-1` on primary buttons only; `--shadow-3` on the chat modal panel and launcher only. Content blocks use hairlines, not shadows.

## 5. Layers (z-index)

| Token | Value | Element |
| --- | --- | --- |
| `--z-bar` | 40 | Mobile CTA bar |
| `--z-header` | 50 | Fixed header (dropdowns and mobile panel live inside it) |
| `--z-launcher` | 60 | Chat launcher |
| `--z-modal` | 80 | Chat modal (REF value) |
| `--z-skip` | 100 | Skip link when focused (REF value) |

## 6. Motion tokens

| Token | Value | Source |
| --- | --- | --- |
| `--ease-signal` | `cubic-bezier(0.22, 1, 0.36, 1)` (Glide family) | REF |
| `--dur-s` | 100 ms — colour/press feedback; reduced-motion dialog fade | NEW (≤ 200 ms rule, 02 §2.5) |
| `--dur-m` | 160 ms — dropdowns, menu panel, backdrop, header background, FAQ chevron, arrow nudge | NEW |
| `--dur-l` | 200 ms — header reveal, CTA bar entry, modal panel entry, S4 step | NEW (REF 300 ms reduced to the 02 cap) |
| `--dur-exit-m` | 110 ms — exit of `--dur-m` elements (dropdown, menu panel) | NEW (≈ 70 % of entry, style library §D) |
| `--dur-exit-l` | 140 ms — exit of `--dur-l` elements (header hide, CTA bar, modal) | NEW (≈ 70 % of entry) |
| `--stagger` | 60 ms — S4 step highlight only | NEW |

Every use is listed in `pages/home.motion.md`. The theme switch is instant (no colour transition). Under `prefers-reduced-motion: reduce`, every transform is removed. What remains: opacity fades of `--dur-s` or less, and the user-initiated colour feedback on buttons, chips and the launcher (M-01, M-11; `KEEP-ESSENTIAL`).

## 7. Breakpoints

Tailwind defaults: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. The header switches to the bar-with-CTA layout at `md` (REF), and the full desktop nav appears at `xl` (D-026, width budget in `pages/home.wireframe.md` §4.1.1).
