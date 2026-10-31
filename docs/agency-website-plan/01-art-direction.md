# 01 — Art direction and creative concept (homepage, revision 4)

- **Title:** Creative concept, art direction and visual language for the homepage
- **Status:** review (revision 4, 31 Oct 2026; needs the user's decisions at the gate)
- **Version:** 4
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Depends-on:** `00-brief.md` v3; `02-tokens.md` v3 (brand colour set §6a, motion §6); `pages/home.wireframe.md` v1; `pages/home.motion.md` v4; `02-homepage-copy.md` v2 (copy fixed, not changed); `03-decisions.md`.
- **Hard limits:** no copy change. Navigation and section order unchanged. Brand tokens and both themes kept.

## 1. What this file decides

- The overall visual idea that ties the homepage together.
- Three concepts, and the recommended one.
- The visual language rules that every section follows.
- What makes the page distinct from a generic studio homepage.

Motion rules are in `pages/home.motion.md`. Layout per section is in `pages/home.wireframe.md`. Copy is not touched: `02-homepage-copy.md` is the copy source and stays as approved.

## 2. Concepts

### Concept A — The ledger (recommended)

- **Idea:** the studio keeps a ledger. The page reads as a document being written. Structure comes from hairline rules that draw across the page as you reach each section. Index numerals and proof entries behave like ledger lines.
- **Signature moves:**
  1. Every section starts with a hairline that draws from left to right as it enters. The rule is the section's first mark.
  2. Pillar eyebrows ("01 / 03 · Develop") and step numbers are the only indexes. One index numeral at a time is shown in the mark colour (`#c56a3b` light, `#e8895a` dark), so the decorative colour never repeats in view.
  3. The fine grid texture (`--color-grid-line`) sits behind the hero only, fading to the edges, so the page starts on paper.
  4. Automations is the one band. It is the night band (`#0c1a1b`), a deliberate change of register, the place where the proof of automation is shown.
  5. Showcase cards are entries: a label badge, a title, a summary, a link. They reveal one by one as the ledger fills.
- **Why it is distinct:** the device is structural, not decorative. The motion is the drawing of rules and the filling of entries, which is what a ledger does. It is not a gradient, a blob, a stock illustration or a particle field.
- **Fit with the copy:** the copy already uses ledger-language ("labelled by how it was made", "status", "one line"). The concept makes that visible without new words.
- **Risk:** quiet. It needs the typography and the rules to carry the page. Mitigated by the night band and the pinned showcases, which are the two strongest moments.

### Concept B — Build log

- **Idea:** the page is a build log. A fixed progress rail on the right edge fills as the visitor scrolls. Each section is a build step, and each band change is a handoff between steps.
- **Signature moves:** a fixed progress rail (decorative, `aria-hidden`); a band change at each handoff; the showcases read as build steps.
- **Why it is distinct:** strong sense of progress and a clear arc down the page.
- **Cost:** a fixed rail adds a persistent layer on every breakpoint and competes with the header. The rail's `aria-current` would need a script, which is a new island (rejected in §6). The concept's brand tie is weaker.

### Concept C — Two registers

- **Idea:** the studio work reads in the light register (Develop, Growth, the approved copy), and the automation proof reads in the night register, with each theme giving its own version of the same page.
- **Signature moves:** full-bleed night bands in both themes; a dramatic contrast between sections.
- **Why it is distinct:** the most theatrical option.
- **Cost:** it doubles the contrast management in both themes, and a full night page is at odds with the calm, precise mood from the research and the approved copy.

### Recommendation

Concept A, with the night band from Concept B used once, for the Automations showcase (decision C-D6). Concept C is rejected. Concept B's rail is rejected for its script cost and its persistent layer.

## 3. Visual language (applies to every section)

| Rule | What it means on the page |
| --- | --- |
| Rules before boxes | Sections, steps and rows are separated by hairlines that draw in. Cards are used only for showcase entries and only where the copy has a label. |
| One index at a time | The mark colour (`--color-mark`) appears on one numeral or the leading rule of one element in view. The locked cap (one mark element in view) holds. |
| Accent is interactive | Primary teal is used for links, buttons and focus. It is never used for numbers, rules or badges. |
| Badges are text | Demo build, Internal build, Illustrative example: the label is text on a neutral chip. No colour codes a label. |
| No decorative imagery | No stock photos, icons used as decoration, gradients, blobs, particles or 3D. |
| Grid texture in one place | The grid texture is behind the hero only. It is static apart from the parallax on the hero layer (lite: off). |
| Type carries the page | Display face for H1 and H2. DM Sans for body and labels. Two families. |
| Motion has a reason | Every motion is one of: a rule drawing in (structure), content rising in (arrival), a card or step revealing (sequence), or feedback on an action (interaction). Nothing else moves. |

## 4. Brand and both themes

- Light and dark themes are keyed to `data-theme` on `<html>`, as in the locked spec. Every colour token has a light and a dark value (`02-tokens.md` §6a).
- The page background is warm off-white in light and black in dark. Surfaces step up slightly in both.
- The night band is the same in both themes (`#0c1a1b`), so the Automations band keeps its character in light and dark. Its text and focus colours are the night-band set.
- Contrast: every text and control pair passes, as recorded in `02-tokens.md` §6a. The build re-checks with axe.

## 5. Distinctiveness checklist

- No gradient text, no blurred blobs, no glass panels other than the existing header.
- No custom cursor, no magnetic buttons, no particles, no 3D, no looping motion.
- The page's rhythm comes from the rules and the pinned showcases, not from effects.
- Each section can be understood without motion (see `pages/home.motion.md` §7).

## 6. Boldness and intensity

- Boldness: 3 of 4 (expressive but disciplined). The night band and the pinned showcases are the bold moves; everything else stays quiet.
- Motion intensity: 3 of 4 (expressive) on full tier, with the lite and none tiers below it (`pages/home.motion.md` §2). Supersedes the earlier intensity 2 (DEC-37).

## 7. Risks

- **Quiet first screen.** With the hero one column and centred, the first screen relies on the grid texture and the H1. Mitigated by the hero rule draw and the H1 rise.
- **Two pinned showcases back to back.** Long scroll (about 4,400 px of pinned travel at default settings). Mitigated by segment length choice (SHW-D6).
- **Night band contrast in light theme.** The band is dark on a light page. It must not look like an error; it is a deliberate change of register and sits between two light sections.
- **Motion on low-power devices.** Covered by the lite tier and the budget in `pages/home.motion.md` §8.

## 8. Imagery and iconography

- No photography. No stock imagery. Showcase thumbnails are real screenshots only, as before.
- No icons except the arrow glyph and the FAQ chevron, both decorative.
- The grid texture is a CSS pattern, not an image.

## 9. Locales

- One locale, English, left-to-right. RTL is not in scope; the arrow nudge mirrors if RTL is added later (`pages/home.motion.md`).
