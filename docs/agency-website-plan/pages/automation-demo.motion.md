# pages/automation-demo.motion — Motion spec

- **Title:** Every automation demo template moment, with trigger, states, timing and technique
- **Status:** review (31 Oct 2026; Stage A)
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** motion-choreographer
- **Depends-on:** `01-art-direction-ai-automation.md` v1; `02-tokens.md` v4 (§6, §6b); `pages/automation-demo.md` v1; `pages/home.motion.md` v5.
- **Intensity:** 2 at most, light. `CLIENT` ("just give light animations, no need something like homepage or main page").

## 1. Technique

- **No motion library.** CSS transitions and keyframes, plus one small script: a single IntersectionObserver that adds a class once.
- **Nothing is scroll-scrubbed. Nothing pins. No signal line is drawn by scroll. No timers.**
- **Properties:** `transform` and `opacity`, and `clip-path` on the headings.
- **Hidden states sit behind a `.js` class,** set in the head as on the homepage. Without JavaScript, or with reduced motion, everything shows its final state.
- **The H1, answer and buttons have no entrance.** They are visible at first paint.

**Trigger notation:** `top 85%` means the element's top reaches 85% down the viewport. Every scroll moment plays once and does not reverse.

## 2. Moments

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Delay / stagger | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DEMO-01 | Header nodes light | Load, once | Node opacity 0.5 | Opacity 1 | 300 ms each | glide | 200 ms between nodes, starts 300 ms | CSS keyframes with `animation-delay` | Same | RUN-44, without the dot |
| DEMO-02 | H2 rise | Heading `top 85%` | `clip-path: inset(0 0 100% 0)`, y 24 px | `inset(0)`, y 0 | 600 ms | glide | None | CSS transition on a class | Same | RUN-51, block, in CSS |
| DEMO-03 | Content arrives | Block `top 85%` | Opacity 0, y 12 px | Opacity 1, y 0 | 400 ms | glide | 60 ms, up to 4 siblings | CSS transition on a class | Same | RUN-71 |
| DEMO-04 | Media frame arrives | Frame `top 90%` | Opacity 0, y 16 px | Opacity 1, y 0 | 500 ms | glide | None | CSS transition on a class | Opacity only | RUN-34, without the wipe |
| DEMO-05 | Step stop fills | Each step `top 75%` | Stop hollow, scale 0.6 | Stop filled, scale 1 | 240 ms | snap | Fired by position | CSS transition on a class | Same | RUN-12 |
| DEMO-06 | FAQ row opens | `toggle` on `details` | `+`; row fill `scaleX` 0, left origin | `−`, turned 180°; `scaleX` 1 | Sign 240 ms; fill 320 ms | snap | None | CSS only, already in `.faq details`. The answer opens natively, with no height animation | Same | RUN-73, lighter |
| DEMO-07 | Final button fill | Button row `top 85%` | Fill `scaleX` 0, left origin | `scaleX` 1 | 500 ms | dolly | None | CSS transition, `.final.awaiting` | Same | RUN-83, fill only |
| DEMO-08 | Video starts | Click on `Play the walkthrough` | Poster opacity 1 | Poster opacity 0; player in the same box | 160 ms | glide | None | Script swaps the poster for the player | Same | New, one line |
| DEMO-09 | Screenshot opens | Click on a screenshot | `dialog` opacity 0, scale 0.98 | Opacity 1, scale 1 | 200 ms | glide | None | Native `dialog`, CSS on `[open]` | Same | New, CSS only |
| DEMO-10 | Preview card hover | Hover, fine pointer only | Card y 0; button arrow x 0 | Card y −4 px; arrow x 4 px | 240 ms | glide | None | CSS | None | Showcase card hover |

## 3. Page-wide moments

| ID | Moment | Trigger | Start state | End state | Duration | Easing | Technique | Below 1024 | Reuses |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DEMO-90 | Section transitions | None | Surfaces change at the section edge, with no moving band | — | — | — | Plain edge | Same | None |
| DEMO-91 | Theme switch | Click on the toggle | As RUN-91 | As RUN-91 | 500 ms | dolly | As RUN-91 | Same | RUN-91 |
| DEMO-92 | Header on dark bands | Band top reaches 64 px, reversible | Paper scope | Band's scope | 240 ms | glide | The same IntersectionObserver, toggling `data-band`. No ScrollTrigger | Same | RUN-92, lighter |
| DEMO-93 | Move between pages | Link to or from the main page | Old page | New page | 250 ms cross-fade | Browser default | `@view-transition { navigation: auto; }` in CSS only. Plain navigation where unsupported | Same | AIA-93 |

## 4. Hover, focus and press

As `pages/home.motion.md` §12. Anchor chips: text to primary on hover, 160 ms, glide. Focus rings appear at once and are never animated.

## 5. Reduced motion and no script

- `prefers-reduced-motion: reduce`: every section shows its final state, every stop is filled and the buttons are filled. Hover changes colour only. This matches the global rule in `index.html`.
- No JavaScript: the same final state. The video block shows its poster and a plain link to the Loom. The screenshots link to the full-size image.

## 6. Stage A re-check

| Check | Result |
| --- | --- |
| Not-plain 1, flat background | Pass. Five surfaces, changing at section edges |
| Not-plain 2, default dividers | Pass. Sections separate by surface |
| Not-plain 3, typographic motion | Pass. DEMO-02 does more than fade |
| Prototype-ready | Pass. Every moment has trigger, states, duration, easing, stagger and technique |
| User's Gate 1 direction | Pass. No library, no pin, no scrub, no timer. Ten small moments: eight are lighter forms of homepage moments, and two are new small interactions (DEMO-08, DEMO-09) |
