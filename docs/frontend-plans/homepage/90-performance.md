---
title: Performance budget — Home (/)
status: final
depends-on: [02-tokens.md@v2, 05-components.md@v3, 91-stack.md@v2, pages/home.wireframe.md@v3]
version: 3
last-updated: 2026-10-28
owner-agent: auditor
---

# Performance budget — Home (`/`)

The **stricter** of the blueprint standard (`quality-standard.md` §1–2) and the client's locked budget (`CLIENT (02 §9.4)`) applies. Planned values are design estimates. Every row is **measured at build** (`93-qa-checklist.md` P-section); an estimate that the measurement disproves is a FAIL routed to the owner listed.

## 1. Metric targets (mobile p75 field; lab = Lighthouse mobile, median of 3)

| Metric | Blueprint | Client (02 §9.4) | **Applied** |
| --- | --- | --- | --- |
| LCP | ≤ 2.5 s (lab target 2.0 s) | ≤ 2.0 s | **≤ 2.0 s** |
| INP | ≤ 200 ms | ≤ 150 ms | **≤ 150 ms** |
| CLS | ≤ 0.1 (lab ≤ 0.05) | ≤ 0.05 | **≤ 0.05** |
| TTFB (static, CDN) | ≤ 600 ms lab | — | ≤ 600 ms |
| FCP | ≤ 1.8 s | — | ≤ 1.8 s |
| TBT (lab) | ≤ 200 ms | — | ≤ 200 ms |
| Lighthouse mobile | Perf ≥ 90, A11y/BP/SEO ≥ 95 | Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO 100 | **Perf ≥ 90 · A11y ≥ 95 · BP ≥ 95 · SEO 100** (desktop Perf ≥ 95) |

## 2. Route budget (Standard tier — the homepage is not motion-heavy)

| Resource | Limit applied | Planned | How | Result | Owner if FAIL |
| --- | --- | --- | --- | --- | --- |
| First-load JS (gzip) | ≤ 130 KB | ≈ 105–115 KB: Next 16 + React 19 runtime, plus the small islands C-11, C-13, C-15, C-30, C-53 (estimate) | No motion library; modal is a separate chunk; Speed Insights after idle | PASS (planned) | frontend-dev |
| Deferred JS after load | ≤ 100 KB | ≈ 12–18 KB: C-31 chat modal chunk (only after trigger intent) + Speed Insights | `import()` on intent; `requestIdleCallback` | PASS (planned) | ui-dev |
| CSS (gzip) | ≤ 30 KB | ≈ 12–18 KB (Tailwind v4, homepage utilities only) | No reference CSS carried over (the reference `globals.css` is about 5,900 lines) | PASS (planned) | ui-dev |
| Fonts | ≤ 2 families, ≤ 3 woff2, ≤ 90 KB | 2 families: Bricolage Grotesque 600 + Manrope 400 and 700, latin subset; ≈ 60–80 KB | `next/font/google`; P-04 confirms the file count Google returns (Manrope and Bricolage are variable families: one file or one per weight) | PASS (planned) · **UNVERIFIED** file count | ui-dev |
| Images in the first viewport at 375 px | ≤ 400 KB | ≈ 4–8 KB (compact 56 px founder photo only) | `sizes` picks the small candidate | PASS (planned) | frontend-dev |
| LCP image | ≤ 100 KB (client; stricter than 150/250 KB) | Desktop founder photo at 320 CSS px, 640 px source, AVIF ≈ 40–70 KB | `next/image` `preload`, explicit width/height, `formats: avif, webp`, explicit `quality` (75) | PASS (planned) | frontend-dev |
| Total weight at load, no video | ≤ 1.5 MB | ≈ 450–650 KB, including 3 lazy proof thumbnails at ≈ 40 KB each and the lazy S9 photo | Lazy below the fold | PASS (planned) | frontend-dev |
| Third-party scripts on first load | 0 (client; stricter than ≤ 2) | 0 | Speed Insights after idle; no GA4, Loom, Cal.com or Turnstile on this page | PASS | frontend-dev |
| Third-party origins on first load | 0 | 0 (Sanity images are served through `/_next/image` from the site origin) | `remotePatterns` for `cdn.sanity.io` only | PASS | frontend-dev |
| HTML size (uncompressed) | ≤ 120 KB (client) | ≈ 55–85 KB: 8 FAQ answers, JSON-LD, nav twice (desktop + mobile panel), footer | Server-rendered; no serialised CMS payload beyond island props | PASS (planned) | frontend-dev |
| Island props (serialised) | ≤ 10 KB each | C-11 ≈ 2–3 KB (navigation, CTAs, UI strings); C-30 ≈ 2–4 KB (concierge copy) | Pass only the fields each island renders | PASS (planned) | frontend-dev |
| `preconnect` | ≤ 2 | 0 | Everything is first-party | PASS | frontend-dev |

## 3. LCP element per breakpoint

| Viewport | LCP element | Delivery |
| --- | --- | --- |
| 375 px | Hero H1 text (`--text-display`) | In the server HTML; Bricolage 600 preloaded; `display: swap` with `adjustFontFallback`; never starts at `opacity: 0` |
| 768 px | Hero H1 text | Same |
| 1440 px | Founder photo in the hero card (320 × 400 CSS px) | The only `preload` image on the route; AVIF; `sizes="(min-width:1024px) 320px, 56px"`. If `person.photo` is empty, the LCP falls back to the H1 text with no change to the rules. |

Trace check (P-03): resource load delay and render delay are each ≤ 10 % of LCP.

## 4. Motion and animation budget

| Rule | Limit | Planned | Result |
| --- | --- | --- | --- |
| Concurrently animating elements in view | ≤ 4 mobile / ≤ 8 desktop — the tightened value from `style-motion-library.md` §D, stricter than `quality-standard.md` §2.1 (8 / 20) | ≤ 2 (S4 markers count as one staggered group; header or bar slide) | PASS |
| Looping animations in view | ≤ 1 | 0 | PASS |
| `backdrop-filter` layers per viewport | ≤ 2, static only | Header (1); chat backdrop (1) — and the header is beneath the backdrop while the dialog is open | PASS |
| Animated properties | `transform`, `opacity` only (+ `background-color`/`color` for theme and hover feedback, user-initiated, ≤ 200 ms) | As listed in `pages/home.motion.md` | PASS |
| Animation work inside input handlers | none | Chat Enter key only submits; no animation work | PASS |

## 5. INP and CLS controls

- Scroll listeners are passive and rAF-throttled (C-11, C-15). Handlers do ≤ 50 ms of work; nothing reads layout per frame.
- Theme toggle: one attribute write, one `localStorage` write and one `meta` update. The switch is **instant**, with no colour transition: a transition on every element would force a full-document style recalculation and repaint on every frame, an INP risk (critique #22). The single unavoidable recalculation is measured in P-07.
- Chat: the modal chunk loads on trigger intent, so the first click paints feedback within 100 ms (the button's pressed state paints immediately; the dialog opens when the chunk resolves).
- Reserved space: the hero's top padding equals `--chrome-h`; `main` reserves `--bar-h` below 768 px; chat triggers keep their space under `.no-js`; images have width/height or `aspect-ratio`; `scrollbar-gutter: stable` stops a shift when scroll is locked.
- Fonts: `adjustFontFallback` on; the swap CLS must stay ≤ 0.02 (P-05).

## 6. Third-party register (Quality Contract item 5)

| Service | Owner | Purpose | Load strategy on `/` |
| --- | --- | --- | --- |
| Sanity (content + image CDN) | senior-dev | Content at build; images optimised by Next | Build time; images via `/_next/image` |
| Vercel Speed Insights | frontend-dev | Field CWV | After idle |
| GA4 + consent | seo/launch slice | Analytics | **Not loaded** in this slice |

## 7. Budget pass result

**PASS — 0 open FAILs.** The plan carries **seven `UNVERIFIED` items**, all listed in `93-qa-checklist.md` §3. The one that touches this budget is the font file count (P-04). Every planned value is an estimate until P-01 to P-08 in `93-qa-checklist.md` measure it.

The island rows (C-11, C-13, C-15, C-30, C-31, C-53) are `PENDING-CONFIRMATION (D-013)`. If the user rejects them, first-load JS falls by their share, and every other row stays within budget.
