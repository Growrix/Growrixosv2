# pages/home.motion — Motion spec (revision 5: The Run)

- **Title:** Every homepage moment, with trigger, range, states, timing and technique
- **Status:** review (revision 5, 31 Oct 2026; Stage A)
- **Version:** 5
- **Last-updated:** 2026-10-31
- **Owner-agent:** motion-choreographer
- **Depends-on:** `01-art-direction.md` v5; `02-tokens.md` v4 (§6, §6b); `pages/home.md` v4; `prototype/home/index.html`.
- **Intensity:** 3, expressive. `CLIENT`.
- **Supersedes:** revision 4 of this file (CSS-only, no timer, static services). That text is in git at commit 8f97a9f.

## 1. Technique

- **Library:** GSAP 3.x with ScrollTrigger and SplitText, by CDN, for the prototype. Exact version: check with `npm view gsap version` at the build step. `UNVERIFIED` here.
- **Existing script stays.** The carousel, flow, pin, spacer and timer code in `index.html` keep working. GSAP adds to it and does not replace it.
- **Line drawing:** inline SVG path with `pathLength="1"`, `stroke-dasharray: 1`, and `stroke-dashoffset` from 1 to 0 under ScrollTrigger `scrub: 0.5`. Under the path, the same path in `--color-signal-faint` shows the undrawn track.
- **Stops:** 10 px SVG circles, stroked in `--color-signal-faint`, and `fill` set to `--color-signal` when reached.
- **Hidden states are set by script only.** Without JavaScript, every element shows its final state.

**Shorthand used below:**

- **Mask-rise:** text in an `overflow: hidden` wrapper, `yPercent` 110 to 0, per line or word.
- **Band expand:** the section's surface layer goes from `clip-path: inset(0 6% 0 6% round 24px)` to `inset(0 0 0 0 round 0)`.
- **Below 1024:** what happens on tablet and mobile.

**Trigger notation:** `top 80%` means the element's top reaches 80% down the viewport. One-shot moments play once and do not reverse.

## 2. Hero, on load

The timeline starts at `DOMContentLoaded` after fonts are ready, capped at a 400 ms wait.

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-01 | Eyebrow and its rule | Load | Text opacity 0; rule `scaleX` 0, left origin | Opacity 1; `scaleX` 1 | 400 ms | glide | 0 ms | GSAP timeline | Same |
| RUN-02 | H1 clauses | Load | Each of 3 hand-split clause spans at `yPercent` 110 in a mask | `yPercent` 0 | 900 ms | glide | Starts 100 ms; 140 ms between clauses | Hand-split spans, so the H1 keeps one line | Same; masks wrap with the clause |
| RUN-03 | Subhead | Load | Opacity 0, y 16 px | Opacity 1, y 0 | 600 ms | glide | Starts 600 ms | GSAP | Same |
| RUN-04 | Buttons | Load | Opacity 0, y 12 px | Opacity 1, y 0 | 500 ms | glide | Starts 750 ms; 80 ms apart | GSAP | Same |
| RUN-05 | Three strokes | Load | Paths undrawn | Under-clause parts drawn | 500 ms | dolly | Starts 1000 ms; 120 ms apart, order 1, 2, 3 | SVG path offset | None |
| RUN-06 | Outer strokes wrap and meet | Load | Undrawn | Drawn to the meeting point at X-C | 900 ms | dolly | Starts 1500 ms; both together | SVG path offset | None. The rail starts under the buttons, drawn with RUN-07 |
| RUN-07 | Line leaves the hero; field drifts | Scroll: hero `top top` to `bottom top` | Line stub undrawn; field `yPercent` 0; content y 0, opacity 1 | Stub drawn; field `yPercent` 8; content y −48 px, opacity 0.2 | Scrubbed | linear | `scrub: 0.5` | ScrollTrigger | Stub only; no drift |

The plotted field fades in with RUN-01, 800 ms, glide. Whole sequence: about 2.4 s. The H1 is readable from about 1 s.

## 3. Services

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-10 | "Our services" | Heading `top 80%`, once | Mask-rise, word | In place | 900 ms | glide | 100 ms per word | SplitText words | Same |
| RUN-11 | Line down the track | Scroll: track `top 60%` to `bottom 60%` | Undrawn | Drawn | Scrubbed | linear | `scrub: 0.5` | SVG offset | Rail |
| RUN-12 | Stops and index labels | Each `svc-slide` `top 55%`, reversible | Stop hollow, scale 0.6; label muted | Stop filled, scale 1; label in text colour | 240 ms | snap | None | ScrollTrigger toggle | Same |
| RUN-13 | Panel change | Same point as the `is-active` change in `index.html` (IntersectionObserver), reversible | Incoming panel `clip-path: inset(100% 0 0 0 round 24px)` | `inset(0 0 0 0 round 24px)`; outgoing stays beneath, then hides | 700 ms | slab | None | CSS transition on `is-active` | Panels inline; RUN-14 applies to them |
| RUN-13a | Numeral roll | With RUN-13 | Incoming `yPercent` 100 in a mask | `yPercent` 0; outgoing to −100 | 700 ms | slab | None | CSS transition | Numeral hidden, as in `index.html` |
| RUN-14 | Slide and panel content | Each slide `top 75%`, once | H3 mask-rise; body and rows y 12 px, opacity 0 | In place | H3 900 ms; rest 600 ms | glide | Rest +200 ms; 60 ms between items | SplitText lines | Same |
| RUN-15 | Bar and numeral fill | Scroll: pillar's slide group `top 60%` to `bottom 60%` | Bar `scaleX` 0; solid numeral copy opacity 0 | `scaleX` 1; opacity 1 | Scrubbed | linear | `scrub: 0.5`; replaces the 1.2 s bar | ScrollTrigger | None |

## 4. Who we are

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-20 | Band expand | Scroll: section `top 100%` to `top 40%` | Band inset | Full bleed | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Plain band |
| RUN-21 | "Who we are" | Mask: heading `top 80%`, once. Weight: scroll, section `top 80%` to `center 50%` | Mask at 110; `wght` 300 | In place; `wght` 700 | Mask 900 ms; weight scrubbed | glide; linear | 100 ms per word | SplitText words; `font-variation-settings` | Same |
| RUN-22 | Lead | Lead `top 80%`, once | Lines mask-rise | In place | 800 ms | glide | 100 ms per line | SplitText lines | Same |
| RUN-23 | Line ticks the list | Scroll: list `top 70%` to `bottom 50%`. Each row fires at its stop, reversible | Stop hollow; tick undrawn; text opacity 0.45 | Stop filled; tick drawn; text opacity 1 | Tick 320 ms; text 240 ms | snap | Fired by scroll position | SVG offset; ScrollTrigger | Same, on the rail |

## 5. Demo websites

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-30 | Ivory band and pin | Band expand as RUN-20. Pin: sticky stage plus 3 spacers at 50 svh, as in `index.html` | Band inset | Full bleed | Scrubbed | linear | `scrub: 0.5` | `clip-path`; CSS sticky | No pin |
| RUN-31 | Heading and sub | Stage `top 80%`, once | Heading mask-rise; sub opacity 0, y 12 px | In place | 900 ms; 600 ms | glide | Sub +200 ms | SplitText words | Same |
| RUN-32 | Line into the track | Scroll: section `top 60%` to `top 64px` | Undrawn | Drawn to stop 3 | Scrubbed | linear | `scrub: 0.5` | SVG offset | Rail |
| RUN-33 | Track advances | Timer 1800 ms while pinned in view, or scroll progress, as in `index.html`. Stops at the last step. Pauses while the pointer is over the stage or focus is inside it | `--k` = n | `--k` = n + 1, the next card arriving from the right | 900 ms | track | One step per tick | `index.html` script | Plain grid |
| RUN-34 | Arriving card opens | With RUN-33, on the card entering view | Media `clip-path: inset(0 100% 0 0)`; inner fill scale 1.06 | `inset(0 0 0 0)`; scale 1 | 700 ms | glide | 100 ms after the step starts | GSAP on step | None |
| RUN-35 | Stops light and line runs on | With RUN-33. Stops 1 to 3 lit at pin start; stop `k + 3` lights per step. After the last step the line runs to X-R and down | Stop hollow; run undrawn | Stop filled; run drawn | 500 ms | dolly | None | SVG offset, stepped | Rail stops per card |

## 6. Demo automations

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-40 | Night rises | Scroll: section `top 90%` to `top 30%` | Night layer `clip-path: inset(100% 0 0 0)` | `inset(0)` | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Same |
| RUN-41 | Heading and sub | Stage `top 60%`, once | As RUN-31 | In place | 900 ms; 600 ms | glide | Sub +200 ms | SplitText words | Same |
| RUN-42 | Rows slide in | Timer 1800 ms while pinned, or scroll, as in `index.html`. Pauses as RUN-33 | Row opacity 0, x 64 px | Opacity 1, x 0 | 700 ms | track | One row per tick | `index.html` CSS | All rows showing |
| RUN-43 | Panel swaps | With RUN-42 | Old text opacity 1 | Old text out over 200 ms; new title mask-rise; badge and text fade in | Out 200 ms; in 400 ms | glide | None | GSAP around `setFlowPanel()` | None |
| RUN-44 | Packet runs the nodes | After RUN-43; once per panel | Nodes dim at 50%; 6 px ember dot at node 1 | Dot reaches the last node; each node lights to 100% as it passes | 900 ms | linear | 120 ms between nodes | GSAP on dot `x` | Plays once on `top 75%`, for LedgerLine only |
| RUN-45 | Stops and line | With RUN-42. Line runs on to X-L and down after the last row | Hollow; undrawn | Filled; drawn | 500 ms | dolly | None | SVG offset, stepped | Rail |

## 7. How we work

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-50 | Paper returns | Scroll: section `top 100%` to `top 45%` | Paper layer `clip-path: inset(100% 0 0 0)` | `inset(0)` | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Same |
| RUN-51 | Heading | Heading `top 80%`, once | Mask-rise, line | In place | 900 ms | glide | 100 ms per line | SplitText lines | Same |
| RUN-52 | Line crosses; steps arrive | Scroll: steps `top 75%` to `top 30%`. Each step fires at its stop, reversible | Line undrawn; numeral y 24 px, `wght` 300, opacity 0.4; title and text opacity 0 | Drawn; y 0, `wght` 700, opacity 1; text opacity 1 | Line scrubbed; step parts 500 ms | linear; glide | Fired by line position | SVG offset; `font-variation-settings` | Rail; steps fire at `top 70%` |

## 8. Writing

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-60 | Sand band | As RUN-20 | Inset | Full bleed | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Plain band |
| RUN-61 | "Writing" | As RUN-21 | Mask 110; `wght` 300 | In place; `wght` 700 | 900 ms; scrubbed | glide; linear | None | SplitText; variable weight | Same |
| RUN-62 | Intro stays | Sticky, `top: 120px` | — | — | — | — | — | CSS sticky | Static |
| RUN-63 | Cover opens | Feature `top 75%`, once | Media `inset(0 100% 0 0)`; fill scale 1.08 | `inset(0)`; scale 1 | 900 ms | glide | None | GSAP | Same |
| RUN-64 | Rows and stops | Each row `top 85%`, once | Opacity 0, y 16 px; stop hollow | Opacity 1, y 0; stop filled | 500 ms | glide | Fired per row | ScrollTrigger | Same |

## 9. FAQ

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-70 | Ivory band and heading | Band as RUN-20. Heading `top 80%`, once | Inset; mask-rise | Full bleed; in place | Scrubbed; 900 ms | linear; glide | 100 ms per line | `clip-path`; SplitText | Plain band; same heading |
| RUN-71 | Questions arrive | List `top 80%`, once | Opacity 0, y 16 px | Opacity 1, y 0 | 500 ms | glide | 60 ms apart | GSAP | Same |
| RUN-72 | Line and stops | Scroll: list `top 70%` to `bottom 60%`; each stop fires at its question | Undrawn; hollow | Drawn; filled | Scrubbed; 240 ms | linear; snap | Fired by position | SVG offset | Rail |
| RUN-73 | Question opens | `toggle` on `details` | `+`; row fill `scaleX` 0, left origin; height closed; answer opacity 0, y 12 px | `−` after a 180° turn; `scaleX` 1; height open; opacity 1, y 0 | Sign 240 ms; fill 320 ms; height 320 ms; answer 240 ms | snap; glide | Answer +80 ms | GSAP on height; CSS on the rest | Same |

Closing runs the same in reverse over 240 ms.

## 10. Final CTA

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-80 | Field band | As RUN-20 | Inset | Full bleed | Scrubbed | linear | `scrub: 0.5` | `clip-path` | Plain band |
| RUN-81 | H2 and body | H2 `top 80%`, once | Mask-rise, word; body opacity 0, y 12 px | In place | 900 ms; 600 ms | glide | 100 ms per word; body +300 ms | SplitText | Same |
| RUN-82 | Line runs to the button | Scroll: section `top 70%` to `center 60%` | Undrawn | Drawn to the terminal stop | Scrubbed | linear | `scrub: 0.5` | SVG offset | Rail |
| RUN-83 | Line lands | Line complete, once | Terminal stop hollow; ring scale 1, opacity 0; button fill `scaleX` 0, left origin, over a ghost state | Stop filled; ring scale 2.4, opacity 0.8 then 0; button filled | Ring 600 ms; fill 500 ms | glide; dolly | Fill +120 ms | GSAP | Same |

If the visitor reaches the button without the line finishing, RUN-83 plays anyway on `top 90%` of the button row.

## 11. Page-wide moments

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Technique | Below 1024 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-90 | Section transitions | The band moments above. Two kinds only: band expand (sand, ivory, field) and rise (night, paper after night) | — | — | Scrubbed | linear | `clip-path` | Band expand is off; rises stay |
| RUN-91 | Theme switch | Click on the toggle | Old theme | A circle grows from the toggle to cover the page | 500 ms | dolly | `document.startViewTransition()` with a `clip-path: circle()` animation; plain 240 ms colour fade where unsupported | Same |
| RUN-92 | Header on dark bands | Band top reaches 64 px, reversible | Paper scope | Band's scope | 240 ms | glide | ScrollTrigger toggling `data-band` on the header | Same |

## 12. Hover, focus and press

| Element | State | Motion | Duration | Easing |
| --- | --- | --- | --- | --- |
| Primary and ghost buttons | Hover (fine pointer) | Colour to hover value | 160 ms | glide |
| Any button | Press | Scale 0.98 | 120 ms | glide |
| Inline link | Hover | Underline redraws from the left | 240 ms | glide |
| Link arrow `→` | Hover | x 4 px | 160 ms | glide |
| Service list row | Hover | Text to primary; x 4 px | 160 ms | glide |
| Showcase card | Hover | y −4 px; inner fill scale 1.03 | 240 ms | glide |
| Flow row | Hover | Row fill to `--color-night-raised` | 160 ms | glide |
| Post row | Hover | Arrow x 4 px; title to text colour | 160 ms | glide |
| FAQ summary | Hover | Text to primary | 160 ms | glide |
| Any focusable | Focus-visible | Ring appears at once, never animated | 0 ms | none |

## 13. Reduced motion and no script

- `prefers-reduced-motion: reduce`: no pin, no timer, no masks, no scrub. Every line is fully drawn, every stop filled, and every section shows its final state. Hover changes colour only. This matches the existing media-query gates in `index.html`.
- No JavaScript: the page shows its final state, with static lines.

## 14. Stage A re-check

| Check | Result |
| --- | --- |
| Not-plain 1, flat background | Pass. Five surfaces, and each change is a moment (RUN-13, 20, 30, 40, 50, 60, 70, 80) |
| Not-plain 2, default dividers | Pass. Sections separate by surface and line |
| Not-plain 3, typographic motion | Pass. RUN-02, 10, 21, 52, 61, 81 do more than fade |
| Prototype-ready | Pass. Every moment has trigger, range, start and end state, duration, easing, stagger and technique. Theme switch, section transitions, hover and focus are all covered. |
