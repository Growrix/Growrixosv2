# CHANGES — growrix-home-v2

## Round 1 — 30 Oct 2026

**Asked:** build a new prototype of the homepage and menu from the revised plan. Do not refactor the earlier menu prototype.

**Built:** `index.html`, one file, plain CSS and a small inline script.
- Header with the Services mega menu (Develop / Automate with Industries → Law firms / Grow), Work, Pricing, About, Contact, and the header CTA. Blog is left out until 3 posts exist.
- Pinned hero (≥768px, ≥560px tall, motion allowed, `animation-timeline` supported). Fixed H1 and subhead. Three slides in order Develop → Automate → Grow, driven by scroll.
- Stacked fallback for mobile, reduced motion, and browsers without scroll-linked animation.
- Sections after the hero: recent work (labelled), how I work (four steps), niche row (law firms), FAQ (six), final CTA, footer.

**Checked in the browser pane:**
- 1440×900: the stage is sticky. Slide opacity by scroll position: slide 1 at 0, slide 2 at 600–1200, slide 3 at 1800.
- 375×812: all three slides stacked, no horizontal scroll, the Menu toggle shows.
- Viewport emulation was reset afterwards.

**Departures from the agent's default brief:**
1. **Location.** Written to `docs/revised-website-plan/prototype/home-v2/`, not `docs/frontend-plans/<slug>/prototype/`. The repo `CLAUDE.md` forbids editing `docs/frontend-plans/**`, and this work lives in the revised plan.
2. **Motion.** CSS only (`position: sticky` and `animation-timeline`), with no GSAP and no ScrollTrigger. This follows approved decision P2 (no motion library).
3. **Styling.** Plain CSS with the research tokens. No Tailwind Play CDN.
4. **Pinned breakpoint.** Pinned only from 768px wide and 560px tall. Below that, the plan's stacked layout applies.

**Placeholders and draft copy:**
- Founder name: "Mohammad" in the H1 and footer, with "[surname — O3]" next to the name in the founder card. Confirm under O3.
- Work cards: the "Demo build" and "Illustrative example" titles are bracketed placeholders. LedgerLine is the only real item, labelled Internal build.
- Headshot: an inline SVG placeholder, not a photo.
- FAQ answers are draft copy, written from the research and the approved positioning.
- The "PROTOTYPE · draft copy" badge is fixed at the bottom right.

**Not verified:**
- Pinned behaviour in Firefox and Safari. The stacked fallback covers browsers without support, but I haven't tested the pin there.
- The 768–1023px range in pinned mode. The layout was checked at 1440 and 375 only.
- Keyboard focus moving into off-screen slides (plan 03 §5). Needs a manual test.

**Not in this prototype (deferred scope):** pricing, the full pages, the law-firm page, the blog section.

**Next:** feedback with `/prototype growrix-home-v2 <changes>`, or approve and run `/plan-ui growrix-home-v2 finalize` when the plan is ready.
