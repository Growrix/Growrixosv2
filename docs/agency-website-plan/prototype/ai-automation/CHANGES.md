# CHANGES — AI Automation main page prototype

## Round 2 — tools section, concept "Wiring Board" (2026-10-31)

**Asked:** a section as high as possible showing the tools the studio works with, with official icons, text and an animated visual of how the tools work together.

**Built:** `pages/ai-automation.md` v2 S2 and `pages/ai-automation.motion.md` v2 §3, placed straight after the hero.
- An ivory board on night. Tools sit as stations on a graph, and four example runs move through them: `New inquiry`, `Deal moves stage`, `Request in Slack`, `A step fails`.
- The graph builds itself once, then a packet travels tool to tool, lighting each stop and writing that step's result. The failure run stops at Claude and takes the route to a person in Slack.
- The board loops only while in view. It has a Pause button, and a tab plays that run once.
- A text list under the graph says what each tool does. Below 1024 px the graph becomes a vertical chain and the list sits in a closed row.
- `#answer` now rises over night, and the page line has 29 stops.

**Logos:**
- n8n: the owner's 2026 symbol, fetched from `guidelines.n8n.design`.
- Make, Zapier, Slack: Simple Icons files with their brand colour. Slack's file is one colour, not the four-colour mark.
- GoHighLevel: **no logo.** The owner's kit keeps its files behind Google Slides, so it could not be fetched. It shows the name and `Logo file needed`, as the plan says. Please supply the Space Blue SVG.
- Claude is text, and the webhook is a plain line glyph.
- Nothing here is permission to publish these marks (X-41).

**Departures from the plan:**
- The ring grows to radius 12, not scale 1.5, because a transform on an SVG circle moved it off its stop.
- Below 1024 px the rail fills without a moving dot.
- Slack's colour `#4A154B` comes from general knowledge of the brand, because the Simple Icons data had no Slack entry to read it from.
- All tool copy stays DRAFT.

**Visual QA (round-2 screenshots):**
1. Not plain: yes. Night and ivory add a strong second beat.
2. Signature moment: visible in `1440-light-s02-tools.png`. Stills cannot show the packet.
3. Type personality: yes.
4. Contrast: readable by eye. Not measured.
5. Mobile: no overflow at 375 px. The short answer now starts at about 2,190 px, as the plan warned (D-A7).
6. Built as planned: yes, with the departures above.

**Functional check (script):** at 1440 × 900 and 375 × 667: the loop moved from run to run, Pause held it, a tab played one run and left it on Play, and the failure route showed. All 29 stops lit. Reduced motion shows a still run with no Pause button. No console errors. Off-screen pausing was not measured directly.

**Review answer:** awaiting.

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
