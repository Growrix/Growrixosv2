# pages/home.motion — Motion spec (revision 3: hero has no motion; services and S2 to S8 short fade)

- **Title:** Motion for the homepage
- **Status:** review (revision 3, 31 Oct 2026; needs the user's approval)
- **Version:** 3
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Depends-on:** `pages/home.md` v3; `02-tokens.md` v2 (motion tokens); `03-decisions.md` (R3-P1 supersedes the approved hero motion, P2 to P5).

## 1. Rules

- **Intensity 0 for the hero.** No motion. The approved pinned sequence is superseded (R3-P1, needs approval).
- **Intensity 2 for the rest of the page** (restrained). Services and S2 to S8: one short scroll fade per section block, hover and focus feedback. `ASSUMED`.
- **Purpose tag on every moment.** Tags: `[orient]` shows structure as it arrives; `[feedback]` confirms an interaction; `[guide]` leads the eye to the next content.
- **CSS only.** No JavaScript in the homepage sections. No motion library (`CLIENT` rule, `PROJECT CLAUDE.md`).
- **No pinned element.** No scroll-linked effect on the hero.
- **Reveal is a short fade.** No translate, no scale, no stagger. `CLIENT` (31 Oct 2026).
- **Reduced motion:** all moments in this file are removed, content stays visible. Colour changes on hover and press remain, instant.
- **No motion without a tag.** Parallax, scroll-jacking, autoplay, counters, looping animation and theme transitions are not used.
- **Progressive enhancement:** without scroll-linked animation support, content is visible and static. Without CSS, content is still readable.

## 2. Moments

| ID | Moment | Where | Tag | Behaviour | Duration | Reduced motion |
| --- | --- | --- | --- | --- | --- | --- |
| SM-01 | Section reveal | Services and S2 to S8, each section block | `[orient]` | Opacity from 0 to 1 as the section enters the view. Range: from the start of entry to 30% of entry. No translate | Scroll-linked (no time value). Completes within the first 30% of the entry | Off. Content visible |
| SM-02 | Button and link colour | Hero CTAs, services links and CTAs, buttons | `[feedback]` | Background, border and text colour change on hover | 160 ms (`--dur-m`), ease-signal | Colour change stays, instant |
| SM-03 | Press feedback | Buttons (hero, S8) | `[feedback]` | Scale to 0.98 while pressed (app `motion-press`, M-01) | 100 ms (`--dur-s`) | Off |
| SM-04 | Link arrow nudge | Arrow glyph on services links and CTAs, S2 About, S3 links, S5 link | `[feedback]` | Arrow moves 4 px right on hover (mirrored under RTL) | 160 ms (`--dur-m`) | Off |
| SM-05 | FAQ chevron | S7 summary | `[feedback]` | Chevron rotates when an item opens | 160 ms (`--dur-m`) | Instant |
| SM-06 | Focus ring | Every focusable element | `[feedback]` | Outline appears instantly. Never transitioned | 0 ms | Same |

Notes:

- SM-01 is scroll-linked, so it has no time value. The fade completes inside the first 30% of the element's entry into view. `ASSUMED` that this reading of the short-motion rule is acceptable; confirm at the gate.
- SM-02 to SM-05 are hover or press effects. They apply only on hover-capable fine pointers.
- No motion on the hero H1 or the hero subhead. The H1 is the LCP element and must be visible in the first paint.
- No height animation on the FAQ (it moves content under the reader and risks layout shift). Native `details` opens without animation.

## 3. Scroll mechanics (SM-01)

- Timeline: view-based, per section block. The block is the animated element.
- Keyframes: opacity only. From 0 to 1. Initial state is visible; the animation is applied only inside a support check for scroll-linked animation, and only when reduced motion is not requested.
- Fill: none needed beyond the keyframes. The element ends at its natural state.
- Cleanup: none; no script.
- Test: each section fades in once as it enters; no re-triggering on scroll back.

## 4. Reduced-motion and support matrix

| Condition | Services and S2 to S8 | Hero |
| --- | --- | --- |
| Motion allowed, scroll-linked supported | SM-01 to SM-06 | No motion |
| Reduced motion requested | Colour feedback only (SM-02). Everything else off | No motion |
| Scroll-linked not supported | Static. Content visible | No motion |
| No CSS | Readable, unstyled | Readable, unstyled |
| No JavaScript | All features work (native disclosure, links) | All features work (links) |

## 5. Forbidden on the homepage

- Parallax on any element.
- Scroll-jacking or any pin (the hero pin is superseded, R3-P1).
- Stagger across cards, steps or services blocks.
- Looping or autoplaying animation.
- Counters.
- Translate or scale on reveal.
- Motion on the hero (no entrance, no background motion, no scroll effect).
- Theme transition (app M-06).
- Motion libraries.

## 6. Hero (revision 3)

- The hero has no motion. The H1 and subhead are plain text in the first paint.
- The approved pinned three-slide sequence (`docs/revised-website-plan/03-homepage-hero.md` §1 to §5, P2 to P5) is superseded for this plan pending approval (`03-decisions.md`, R3-P1). Its scroll-linked CSS is not built.
