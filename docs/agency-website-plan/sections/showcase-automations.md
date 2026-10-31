# sections/showcase-automations — Automations showcase (LedgerLine and demos; pinned reveal on desktop)

- **Title:** Automations showcase: LedgerLine internal build and demo cards, pinned reveal on desktop, static fallback below
- **Status:** review (redesign round, 31 Oct 2026; needs the user's decisions at the gate)
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Scope:** this section only. It is the second of the two showcase sections that replace the Work section (02 S3). The Websites showcase is in `sections/showcase-websites.md`. Mechanics, fallbacks, budget and accessibility are the same as the Websites showcase and are referenced there, not repeated, except where they differ (§5, §6).
- **Depends-on:** `sections/showcase-websites.md` v1 (shared mechanics); `02-homepage-copy.md` v2 (LedgerLine card copy and link, reused); `03-decisions.md` (this round).

## 1. Copy status

- **Reused (approved copy):** LedgerLine card text and link from `02-homepage-copy.md` S3, card 1: "Our document-intake automation, now in its third version. Not a client project. The build log covers what it does and what changed between versions." Link "Read the build log" to `/work/[slug]`. Label "Internal build".
- **Superseded (approved copy):** the Work heading, sub and "See all work" link. Replaced by the PROPOSED copy in §2.
- **Reused as labels:** "Demo build", "Internal build", "Illustrative example".
- **PROPOSED (new):** the section heading and sub.

## 2. Content

### Section heading and sub (PROPOSED)

- **H2:** "Automations, shown as they run." (PROPOSED)
- **Sub:** "Our own build and demo runs, recorded with test data. Each card carries its label, and no result is claimed beyond it." (PROPOSED)

### Cards (default: six per section)

| Slot | Label (required) | Title | Summary | Link |
| --- | --- | --- | --- | --- |
| 1 | Internal build | LedgerLine (approved) | Approved copy (§1) | "Read the build log" → `/work/[slug]`, only when that page is live |
| 2 | Demo build | Slot: demo title (PROPOSED placeholder) | Slot: one-line description of the recorded test run | Only when live |
| 3 | Demo build | Slot | Slot | Only when live |
| 4 | Demo build | Slot | Slot | Only when live |
| 5 | Demo build | Slot | Slot | Only when live |
| 6 | Demo build | Slot | Slot | Only when live |

- LedgerLine is card 1 by order. It is the only card with real content today.
- The summary of LedgerLine (about 150 characters) is over the 140-character limit for `cardSummary` (X-9 in `03-decisions.md`). At about 45 characters a line it is four lines, which fits the pinned card budget. The CMS limit is the binding constraint, so either the copy or the limit must change (§8, AS-D3).
- Honest-label rules are the Websites rules (`sections/showcase-websites.md` §2): demo needs a test-run description; client project needs consent (none here); an illustrative example says it is not a client result.

## 3. Components and CMS fields (proposed)

- `ShowcaseSection` and `ShowcaseCard`: as in `sections/showcase-websites.md` §3.
- `homePage.showcase.automations.heading` — required when shown. `sub` — optional.
- Cards: `workEntry` with `showcase` = `automations`, `featured`, `order` (proposed additions, X-19). LedgerLine is `badge` = internal, `order` = 1.

## 4. Layout

Same as `sections/showcase-websites.md` §4, for every breakpoint:

- Desktop (≥1024 px, motion allowed, height at least 700 px): pinned stage, three equal columns, reserved space, segments equal to complete cards minus three.
- Tablet (768 to 1023 px) and mobile (below 768 px): static, all cards shown in order.

Pin behaviour with LedgerLine only: one complete card. Under the live threshold (§8), the section is hidden on the live site. In the prototype it shows the LedgerLine card and the slots, for review.

## 5. Differences from the Websites showcase

- **Card 1 is a real card.** It has a thumbnail only if one exists. None is planned now, so it is text-only. Its card is 296 px like the others.
- **Label mix.** Five slots are "Demo build". LedgerLine is "Internal build". Both badges are text and use the same chip.
- **Link.** Card 1's link is the only one that goes to a page that does not exist yet (`/work/[slug]`). It is hidden until that page is live (D-19), which means LedgerLine shows with no link on the live site until then.

## 6. States

As in `sections/showcase-websites.md` §6, plus:

| State | Result |
| --- | --- |
| LedgerLine link page not live | Link not rendered; the card still shows its label, title and summary |
| LedgerLine card only | Hidden on the live site under the proposed threshold (AS-D1 below). In the prototype, shown for review |

## 7. Accessibility

As in `sections/showcase-websites.md` §7, with one note: the LedgerLine link's text "Read the build log" is unique in the section, so no link needs extra context.

## 8. Decisions for the gate (Automations)

| ID | Decision | Recommendation | Consequence |
| --- | --- | --- | --- |
| AS-D1 | Live threshold for Automations | At least three complete cards (same rule as Websites). With LedgerLine alone at launch, the section is hidden on the live site | The Automations section does not show on the live site until two demo or internal cards are complete. This is the most visible effect of the rule; the user should decide it |
| AS-D2 | LedgerLine link | Keep `/work/[slug]` as the build-log route and build it later, or remove the link until then | Keeps the approved link text. The link is hidden until the route is live (D-19) |
| AS-D3 | LedgerLine summary length | Raise the CMS limit to 150 characters (fits four lines, so the pinned budget still holds), or shorten the approved text to 140 characters (copy change, needs approval) | The approved text is about 150 characters. At the current 140 limit, validation rejects it |
| AS-D4 | Heading copy | "Automations, shown as they run." (PROPOSED) | Needs approval |
| AS-D5 | Cards per section, segment length and pin | As in `sections/showcase-websites.md` §9 (SHW-D5, SHW-D6, SHW-D9) | Same decisions, applied to both sections |

Decisions also logged in `03-decisions.md` (this round).
