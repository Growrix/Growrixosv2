# CHANGES — home prototype (agency plan)

## Round 8 — "Our services" heading

**Asked:** show "Our services" on the section.

**Changed:** a visible H2 "Our services" sits above the stage, before the pinned part starts. This replaces the no-heading default (D-25) for this prototype. The heading is the user's own wording, so it is treated as approved. It is not in `02-homepage-copy.md` yet, so that file needs updating if you keep it.

## Round 7 — services: pinned two-column stage

**Asked:** the services section pinned while scrolling, in two columns, with each service type as its own slide. Think about the overall design.

**Design:**
- Desktop (≥1024 px, motion allowed): a left stage stays pinned. It shows the pillar, its approved H2 and body, a progress bar and a large outlined numeral (01, 02, 03). On the right, each service is a full-height slide, grouped by pillar in the approved order.
- As the right column scrolls, the stage changes to the pillar that is in the middle of the screen, with a short fade. The progress bar fills while the pillar is active.
- Mobile, tablet, reduced motion: one column. Each pillar's panel sits above its slides. Nothing is pinned.

**Copy:**
- Pillar headings and bodies are the approved copy (`02-homepage-copy.md`, S1 slides 1 to 3).
- Service slide titles are the approved link labels.
- Service slide descriptions are **DRAFT**, marked in the prototype. They are not approved copy and need your review.

**Mechanism:** a short inline script (IntersectionObserver) sets the active pillar. The page has no other script. The build needs a client-island decision under `91-stack.md` §3 and D-013, because it is a new island. A CSS-only version is possible with scroll-linked timelines, but the first attempt timed the fades wrongly, so it is not used here.

**Checked in the browser:** 1440×900. The stage stays pinned, and the active pillar changes at the expected points (develop, then AI Automation, then Growth). Mobile at 375 px: one column, no horizontal scroll.

**Supersedes:** the services direction in the last design round (three equal columns, SV-D1) is replaced by this pinned layout. The brand colours and both themes are kept.

**Not changed:** the hero (sections 1 and 2 only). Animations beyond this services stage are not planned yet.

## Round 6 — hero subhead on two lines

**Asked:** the subhead should not run to three lines.

**Changed:** from 768 px up, the subhead column is 780 px wide (was 46 characters). It sets on two lines at 1440 px and 1024 px. Phones are unchanged.

## Round 5 — hero H1 on one line

**Asked:** widen the title so it sits on one line.

**Changed:** the hero column is 1200 px wide (was 800 px). From 768 px up, the H1 does not wrap and its size scales from 28 px to 46 px. Checked at 1440 px (44.6 px, one line) and 1024 px (31.7 px, one line).

**Not changed:** below 768 px the H1 still wraps. The sentence cannot fit one line on a phone at a readable size. Say if you want a smaller phone size instead.

## Round 4 — layout centred, brand colours and themes

**Asked:** centre the hero on both axes; use the brand colours and themes the project already maintains.

**Changed:**
- Hero is centred horizontally and vertically in the first viewport (measured: content centre matches the hero centre at 1440×900). Text is centred, with the CTAs centred below.
- Colours now come from the brand tokens in `docs/frontend-plans/homepage/02-tokens.md` (the same values as `app/globals.css`): teal primary `#0e6b63` on warm background `#f5f1e8`, ink `#171a1f`, muted `#5c6470`, hairlines `#d5ccbb`, and the decorative mark `#c56a3b` on the hero eyebrow rule. The orange accent from the research (decision D-12) is no longer used. This supersedes D-12.
- Light and dark themes are both included, keyed to `data-theme` on `<html>`, as in the repo. The default is light. A "Dark theme" toggle sits in the header, and it stays visible on mobile.
- Primary buttons use the primary fill with on-primary text. Secondary buttons are outlined.

**Checked in the browser:** light and dark at 1440 px (hero centred, services rows and links use the token colours), and 375 px (no horizontal scroll, header fits).

**Not changed:** the font is still the system fallback. The brand face is Manrope in the repo; D-13 chose DM Sans. This is still open (X-3). Animations are not included, as requested.

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
