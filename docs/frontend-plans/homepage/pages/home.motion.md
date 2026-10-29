---
title: Motion spec — Home (/) and shared chrome
status: final
depends-on: [02-tokens.md@v2, 05-components.md@v3, pages/home.wireframe.md@v3, 90-performance.md@v3]
version: 2
last-updated: 2026-10-28
owner-agent: motion-choreographer
---

# Motion spec — Home (`/`) and shared chrome

**Intensity 1 (subtle).** `CLIENT (00-brief.md)` Motion appears only for state changes the user causes and for one meaningful moment (S4). There are no section entrance reveals, no parallax, autoplay or loops, no smooth-scroll library, no text splitting and no theme colour transition. Everything is a **CSS transition** (with `@starting-style` for elements entering the top layer or appearing). The only script involved is C-53, which sets one attribute. No motion library is installed (`91-stack.md` §6). Every island-driven row (M-02 to M-05, M-07, M-08, M-09, M-11, M-13) is `PENDING-CONFIRMATION (D-013)` together with its component.

Tokens: `--ease-signal` (Glide), `--dur-s` 100 ms, `--dur-m` 160 ms, `--dur-l` 200 ms, `--dur-exit-m` 110 ms, `--dur-exit-l` 140 ms, `--stagger` 60 ms (`02-tokens.md` §6). Durations from the style library (§D) are capped by the client's 200 ms rule; shorter is allowed. `CLIENT (02 §2.5)`

## 1. Motion tiers

The inline head script (C-18) sets `data-motion` on `<html>` before paint, alongside the theme.

| Tier | Condition | Effect here |
| --- | --- | --- |
| `none` | `prefers-reduced-motion: reduce` | Reduced-motion column below. M-09 never hides its markers. |
| `lite` | Viewport < 768 px, `hardwareConcurrency ≤ 4`, `deviceMemory ≤ 4`, Save-Data, or `effectiveType` 2g/3g | Same as `full`, except M-09 is off (markers static and filled) |
| `full` | Everything else | All rows |

CSS also guards every transition with `@media (prefers-reduced-motion: reduce)`, so reduced motion still applies if the script fails.

## 2. Animation table

Purpose tags: **feedback** (confirms an action), **orientation** (shows where something came from or went), **narrative** (explains a sequence).

| id | Element | Purpose | Trigger | Properties | Duration | Easing | full | lite | Reduced motion | Keyboard / AT note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M-01 | Buttons, chips, icon buttons (C-01, C-34) | feedback | hover (`hover: hover` only), press | `background-color`, `color`, `border-color` on the control itself; press `transform: scale(0.98)` | `--dur-s` | `--ease-signal` | yes | yes | KEEP-ESSENTIAL (colour change only; no scale) | The `:focus-visible` ring appears instantly and is never animated |
| M-02 | Header background (C-11 `top` ↔ `scrolled`) | orientation | `scrollY` crosses 8 px (JS only; the server and no-JS state is `solid`, with no motion) | `opacity` of the background layer (a pseudo-element holding the surface fill + blur) | `--dur-m` | `--ease-signal` | yes | yes | STATIC-END-STATE (instant swap) | The first state set at hydration (`solid` → `top`/`scrolled`) applies with **no** transition, so nothing flashes on load |
| M-03 | Header hide / reveal (C-11 `hidden`) | orientation | Scroll direction (thresholds in wireframe §4.1.2) | `transform: translateY(0 ↔ -100%)` | reveal `--dur-l`, hide `--dur-exit-l` | `--ease-signal` | yes | yes | STATIC-END-STATE (hides and reveals instantly, matching the reference) | Never hides while focus is inside the header or a menu is open; focus entering a hidden header reveals it instantly (no transition wait) |
| M-04 | Nav dropdown panel (C-12) | orientation | Open/close by click, Enter, Space, Escape | `opacity` 0→1, `transform: translateY(-4px → 0)` | enter `--dur-m`, exit `--dur-exit-m` | `--ease-signal` | yes | yes | STATIC-END-STATE | Focus does not wait for the transition; links are focusable on open |
| M-05 | Mobile menu panel (C-14) | orientation | Menu button | `opacity` 0→1, `transform: translateY(-8px → 0)` | enter `--dur-m`, exit `--dur-exit-m` | `--ease-signal` | yes | yes | STATIC-END-STATE | Focus moves to the first link on open, without waiting |
| M-06 | Theme switch (C-13) | — | — | **No transition.** Colours switch instantly in every tier. A colour transition on every element forces a full-document style recalculation and repaint, an INP risk (critique #22). | — | — | — | — | (instant everywhere) | `aria-pressed` updates immediately |
| M-07 | Mobile CTA bar (C-15) | orientation | 40 % depth reached; footer / menu / dialog / text-field rules | `transform: translateY(100% ↔ 0)` | enter `--dur-l`, exit `--dur-exit-l` | `--ease-signal` | yes | yes | STATIC-END-STATE | Hidden state is `inert` + `visibility: hidden` once the exit ends |
| M-08 | Chat dialog (C-31): backdrop + panel | orientation | Open via any trigger; close by Escape, close button, backdrop or link | Backdrop `opacity`; panel `opacity` + `transform: translateY(16px → 0)` (≥ 640 px) or `translateY(24px → 0)` (full-screen sheet < 640 px). Entry uses `@starting-style`; `display`/`overlay` use `transition-behavior: allow-discrete`. | enter `--dur-l` (backdrop `--dur-m`), exit `--dur-exit-l` | `--ease-signal` | yes | yes | FADE `--dur-s` (opacity only, no translate) | Focus moves to the textarea at open; nothing waits on the transition. Browsers without `@starting-style` open and close instantly. |
| M-09 | S4 timeline markers (C-43 inside C-53) — **signature moment** | narrative | C-53 sets `data-inview="true"` once, when 35 % of the list is visible | Each marker's fill layer `opacity` 0→1; each connector segment `transform: scaleX(0→1)` (horizontal, D) or `scaleY(0→1)` (vertical, M/T), origin at the start | `--dur-l` per step, `transition-delay: calc(var(--i) * var(--stagger))`. With exactly 5 steps (schema-locked), the total is 200 + 4 × 60 = **440 ms** | `--ease-signal` | yes | **off** (static, filled) | STATIC-END-STATE (markers filled, no hidden start) | Markers are `aria-hidden`; the times and text are static and readable from first paint. The unfilled start state applies only under `html.js[data-motion="full"]`, so markers show filled without JS. |
| M-10 | FAQ chevron (C-51) | feedback | `<details>` toggle | `transform: rotate(0 → 180deg)` | `--dur-m` | `--ease-signal` | yes | yes | REMOVE (instant) | The answer appears instantly (native `<details>`); no height animation |
| M-11 | Chat launcher (C-30) | feedback | hover (`hover: hover` only), press | `background-color`; press `transform: scale(0.97)` | `--dur-s` | `--ease-signal` | yes | yes | KEEP-ESSENTIAL (colour only) | The reference's rotating icon swap and hover scale are dropped |
| M-12 | Arrow text links (C-02 `arrow`) | feedback | hover (`hover: hover` only) | Arrow icon `transform: translateX(4px)`; mirrored under RTL | `--dur-m` | `--ease-signal` | yes | yes | REMOVE | No change on focus; the underline carries the state |
| M-13 | Chat thread auto-scroll (C-32) | orientation | New message appended | `scrollTo` with **`behavior: auto`** (instant) in every tier | instant | — | yes | yes | Same (instant) | `aria-live` announces the new message independently of scrolling. Smooth scrolling was dropped because its browser-defined duration exceeds the 200 ms cap (critique #21). |

**No motion** on these elements: the hero and the LCP element (H1 and founder photo render final at first paint), section headings, stats, prices, S8 pricing rows, FAQ answers, chat messages appearing, the skip link, the footer, error states (no shake), and the theme switch. Style library §D "absent" rules 2, 3, 4 and 5 apply.

## 3. Budget check

- Concurrency: at most 2 in view (the M-09 group plus M-03 or M-07). The limit is ≤ 4 mobile / ≤ 8 desktop (style library §D, stricter than quality-standard §2.1). PASS.
- Loops: 0. Flashing: 0. Autoplay over 5 s: none. PASS (WCAG 2.2.2, 2.3.1).
- Properties: `transform` and `opacity`, plus colour properties on the pressed or hovered control itself (M-01, M-11). No layout properties, and no document-wide colour transition. `will-change` is set only during M-03 and M-08, then removed. PASS (`quality-standard.md` §4.1, §4.3).
- `backdrop-filter`: static only (header layer, chat backdrop). PASS.
- Reduced-motion check (RM-01 in `93-qa-checklist.md`): 1 s after load with `reducedMotion: 'reduce'`, `document.getAnimations()` returns 0 running animations.
