# CHANGES — home prototype (agency plan)

## Round 3 — sections 1 and 2 only

**Asked:** simplify the hero to one column with the left-column content only, and make the services section the second section. Build only sections 1 and 2.

**Built:**
- Section 1, hero: eyebrow, H1, subhead, "Book a free 20-min call" and "See all services", exactly as the user wrote them. No right column, no slides, no pin, no motion.
- Section 2, services: three ledger rows in order, Develop, AI Automation and Growth. Copy from the approved slide copy in `02-homepage-copy.md`, unchanged. Each row has an H2, a body, links and a CTA.
- Header and footer kept as chrome. The other sections (Who we are, Work, How we work, Industries, Writing, FAQ, Final CTA) are removed from this prototype. They stay in the git history at commit `c6ea0c9`, the rollback point.

**Shown for review, not final:**
- Service links and the CTAs point to pages that are not live. Under the rule in `pages/home.md`, they should be hidden until the target is live (D-24). They are shown here so the layout can be judged.
- Services has no heading (D-25 default).

**Checked in the browser:** 1440 px and 375 px. No horizontal scroll at 375 px. The hero has no pin and no motion.

**Font:** system fallback. The build loads DM Sans.

## Round 2 — 31 Oct 2026

**Source:** `pages/home.md` §8 (prototype handover, Stage A approved), `02-homepage-copy.md` v2, decisions D-12 to D-22 at their defaults.

**Applied (handover P-1 to P-13):**
- P-1 S2 heading is "Who we are".
- P-2 and P-10 S4 step numbers and hero slide numbers use muted text, not the accent.
- P-3 demo and example cards are labelled "Review only" and are not part of the build.
- P-4 "See all work" link added under S3, marked as shown on the live site only once `/work` is live.
- P-5 FAQ question 1 removed until D-1 is confirmed. Five items remain.
- P-6 Google Fonts link removed. The prototype uses the system fallback. The build self-hosts DM Sans.
- P-7 eyebrows "Work", "How we work" and "Questions" removed.
- P-8 S7 heading is "Questions before you book."
- P-9 LinkedIn removed from the footer. Upwork remains.
- P-11 draft badge kept.
- P-12 S3 and S5 are still rendered here for review, as the handover allows.
- P-13 menu unchanged.

**Also applied from D-22:** the visible email address is removed from the footer. The "Email us" button in S8 stays.

**Checked in the browser (1440×900, pane emulation):** the hero is pinned and slides change at the expected scroll points. FAQ count is 5. No LinkedIn, no visible email, no Google Fonts link, and no eyebrow text left on Work, How we work or Questions.

**Not verified:** the 375 px layout after this round. The earlier round passed there, and this round changed only text and colours. Firefox and Safari for the pinned hero are still untested.

**Open, not applied (handover §8.5, conflicts X-1 to X-13):** these need decisions or a revision of the locked repo spec. They do not change the prototype.

**Font note:** the system fallback is visibly different from DM Sans. Judge the layout, not the typeface, until the build loads DM Sans.
