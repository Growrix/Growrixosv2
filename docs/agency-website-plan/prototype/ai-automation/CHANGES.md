# CHANGES — AI Automation main page prototype

## Round 1 — concept "Run Record" (2026-10-31)

**Asked:** build the approved plan for the AI Automation main page, reusing the homepage design.

**Built:** `pages/ai-automation.md` v1 and `pages/ai-automation.motion.md` v1.
- Eight sections on five surfaces, with the homepage's header, mega menu, footer, buttons, icons, FAQ and gradient headings.
- One signal line through the page, with 27 stops, ending in the final button.
- The H1, subhead and buttons show at first paint, with no entrance.
- The run panel in the hero runs a packet once, then a stroke draws under the gradient phrase.
- The one pin: "How does an automation actually run?" Each scroll step lights a station and adds a row to the run log. No timers.
- Below 1024 px, everything stacks. Only the five demo cards pin and move sideways.
- GSAP 3.13.0 and ScrollTrigger are inlined. SplitText is left out.

**Copy:** draft copy from the plan, unchanged. Links to pages that do not exist yet point inside this page. `Visit demo` on LedgerLine goes to `../automation-demo/index.html`, which is built next, so it is a dead link for now.

**Departures from the plan:**
- Demo automations: the line steps around the heading, as on the homepage.
- The run panel and run log titles are styled text, not headings, because the plan's heading outline does not list them.
- Pinned stations show the index beside the title, to fit the stage at 700 px tall.
- Below 1024 px, or in a window under 700 px tall, the run log shows only its label and failure line, because each station carries its own log line.
- Slots on the night surface use `#1b3336`, which is not in the token file, so they stand apart from the night and from the cards.
- Demo heading fires at `top 45%`, not `top 60%`, because its text is light until the night has risen.
- Easing stand-ins as on the homepage: `expo.out` and `power2.inOut`.

**Visual QA (round-1 screenshots):**
1. Not plain: yes. Surfaces change at each section (`1440-light-s01` to `s08`), and rules are not the separators.
2. Signature moments: hero, answer ticks, demos and the run log are visible. Stills cannot show the packet.
3. Type personality: yes. Bricolage carries it.
4. Contrast: readable on every surface by eye. Not measured.
5. Mobile: no overflow at 375 px. The H1 is 3 lines, and the primary button ends 518 px down, inside the first screen at 667 px tall.
6. Built as planned: yes, with the departures above.

**Functional check (script):** at 1440 × 900, 375 × 812 and 375 × 667, scrolling lit all 27 stops, reached all five demo cards and landed the button. The run log filled row by row at 1440 px. No console errors. Hand swiping was not simulated.

**Review answer:** awaiting.
