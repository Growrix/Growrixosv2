# 01 — Art direction (homepage)

- **Title:** Art direction for the homepage, S2 to S8 (S1 approved)
- **Status:** review (revision 3, 31 Oct 2026; needs the user's approval)
- **Version:** 3
- **Last-updated:** 2026-10-31
- **Owner-agent:** site-planner
- **Depends-on:** `00-brief.md` v2; `02-tokens.md` v1; `docs/Claude research/02 New website build plan.md` §2.5 (read-only).

## 1. Direction in one paragraph

Calm, precise, accountable. The page reads like a careful studio's ledger, not a launch page. Structure comes from hairline rules, rows and plain type. Cards appear only where they carry proof, because each proof item is a discrete object with a label. The hero is one column with no motion. The page is quiet throughout, with a short fade as the only motion. `CLIENT` (mood, 31 Oct 2026 request) `PROJECT (research §2.5)`.

## 2. Visual language

| Rule | What it means on this page | Source |
| --- | --- | --- |
| Ledger over cards | Steps (S4), posts (S6) and questions (S7) are hairline rows. Cards are used only for proof (S3) | `PROJECT (research §2.5)`, `ASSUMED` (section-level choice) |
| Accent is interactive only | Accent colour appears on links, buttons and focus rings. Never on numbers, rules, badges or decorative marks | `PROJECT (research §2.5, §2.6)` |
| Neutral proof badges | Badges show their label as text on a neutral chip. No colour coding by label | `PROJECT (research §2.5 status language)`, `ASSUMED` |
| No decorative imagery | No stock photos, illustrations, gradients, icons used as decoration, or shadows beyond the card hairline | `PROJECT (research §2.5 refusal list)` |
| Media only when real | Work media is a real screenshot with test data, sensitive fields blurred. Absent media means a text-only card | `PROJECT (research §2.5)` |
| One display face, one body face | Bricolage Grotesque for headings, DM Sans for text. Two families only | `PROJECT (research §2.6)`, `PROJECT (CLAUDE.md, ≤2 families)` |
| Generous space | Section padding uses the app's section token. No content above the hero fold except the hero | `PROJECT (app/globals.css, --space-section)` |

## 3. Layout system

- Container: 1200 px maximum content width. Side gutter 20 px mobile, 32 px from 640 px, 40 px from 1024 px. `PROJECT (app/globals.css)`.
- Grid: 12 columns desktop, 8 tablet, 4 mobile. Column gap 16 px below 1024 px, 24 px from 1024 px. `PROJECT (app/globals.css, --grid-gap)`, `ASSUMED` for the column counts.
- Prose measure: 68 characters maximum. `PROJECT (app/globals.css, --container-prose)`.

## 4. Section rhythm

- Each section starts with a hairline top border in the border token. Section padding uses the section token. The hero is the only section without a top border. `ASSUMED`.
- No full-bleed colour bands other than S5 (industries row). S5 is the one band, to mark a secondary offer. `ASSUMED`.
- Section order (revision 3, proposed): hero, services, studio, work, process, industries, writing, FAQ, close. Services moves to position 2, pending approval (R3-P3). The rest is the approved order from `docs/revised-website-plan/03-homepage-hero.md` §7.

## 5. Risks to flag

- **Stock-SaaS order.** The order (hero, studio, proof, process, FAQ, close) is conventional. The refusal list calls out stock order. With the pinned hero removed in revision 3, differentiation has to come from the ledger treatment and the typography. This is the main risk of the revision. It is a risk, not a refusal, because the order is approved. `ASSUMED` (risk call).
- **Proof is thin.** Only one internal build is confirmed (LedgerLine, D-8 decided). S3 may show two cards with placeholders until more proof is supplied. Partial states are designed in `pages/home.md` §3.
- **Low-end devices.** No pinned element remains in revision 3. Test the page on a mid-range Android phone for layout and the reveal fade.
- **Regulated sector.** The homepage names law firms in one line (S5). No legal claims, no outcomes, no ethics copy on the homepage. `PROJECT (05-law-niche-and-content.md §4)`.

## 6. Imagery and iconography

- None on S2 to S8 at launch. Optional S3 media only (see §2).
- Icons: directional arrows on links (decorative) and the FAQ chevron (decorative). The chat launcher icon comes from the existing layout (out of scope). `PROJECT (app/layout.tsx)`.

## 7. Boldness and intensity

- Boldness: 2 of 4, quiet. `ASSUMED` (the prototype brief uses 2).
- Motion intensity: hero 0 (no motion, revision 3). Services and S2 to S8: 2 (restrained: short fade on reveal, hover and focus feedback). `ASSUMED`.

## 8. Visual references

- None supplied. Proposed patterns, not sites to copy: ledger rows with hairline rules (research §2.5). `UNVERIFIED` (no URLs checked).

## 9. Locales and direction

- One locale, English, left-to-right. `PROJECT (app/layout.tsx, lang="en")`. `ASSUMED` that no RTL locale is planned. Adding RTL later is rework.
- Dark theme is supported by the app. The homepage plan carries dark values (see `02-tokens.md`).
