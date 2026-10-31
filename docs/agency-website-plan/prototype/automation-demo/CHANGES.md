# CHANGES — automation demo template prototype

## Round 1 — demo template, shown with LedgerLine (2026-10-31)

**Asked:** build the approved template for the demo slug pages, with light motion, good mobile reading and SEO in mind.

**Built:** `pages/automation-demo.md` v1 and `pages/automation-demo.motion.md` v1.
- Seven sections on five surfaces, with the homepage's header, mega menu, footer, buttons, FAQ and gradient headings.
- H1, answer and buttons show at first paint. The answer sits straight after the H1.
- See it running: video with a click-to-play poster and a transcript, a live preview card, and four screenshots that open larger.
- The preview card draws the real file at 1280 × 800, scaled down, and loads it near the viewport. The whole card opens the file in a new tab. Below 768 px it shows a still slot, as planned.
- `sample-demo.html` is the stand-in for an HTML demo. It sends `noindex`.
- A small switch at the bottom left shows the template with one media kind. It is a prototype tool, not part of the build.
- No motion library, no pin, no scroll-drawn line. The file is 84 KB, against 232 KB for the homepage.

**Copy:** draft copy from the plan, unchanged. Slots stay labelled. No Loom link exists, so `Play the walkthrough` swaps to a labelled empty box.

**Departures from the plan:**
- Slots on the night surface use `#1b3336`, as on the main page. It is not in the token file.
- The card's link is the button, and a small script makes the rest of the card open it. An `<a>` around a frame is invalid HTML. The plan said the whole card is one link.
- `Related` shows two cards, because the plan gives two.
- The template's sample related links go back to this same page. `Document intake details →` goes to the main page's services section, because the service page does not exist yet.

**Bug fixed in this round:** a homepage rule hid `.hero-ctas` on any page with the `.js` class. Scripts did not catch it. The screenshots did.

**Visual QA (round-1 screenshots):**
1. Not plain: yes. Five surfaces change at each section edge (`1440-light-000.png` to `100.png`).
2. Signature moment: the preview card shows the real sample file, in `1440-light-025.png`.
3. Type personality: yes, in the large gradient headings.
4. Contrast: readable by eye, in both themes. Not measured.
5. Mobile: no overflow at 375 px. The H1 is 3 lines. The primary button ends 621 px down, inside the first screen at 667 px tall. The second button ends at 683 px, just below it. The meta line sits after them.
6. Built as planned: yes, with the departures above.

**Functional check (script, against the local server):** at 1440 × 900, 375 × 812 and 375 × 667: all reveal moments fired, the card opened the file in a new tab, the dialog opened and closed with Escape, the play button swapped, and the switch hid the other media kinds. No console errors. Keyboard and screen-reader use were not tested.

**Review answer:** awaiting.
