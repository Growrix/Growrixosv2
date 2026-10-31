# 01 — Voice, terms and navigation

- **Title:** Voice, terminology and navigation labels
- **Status:** review
- **Version:** 1
- **Last-updated:** 2026-10-30
- **Owner-agent:** site-planner
- **Depends-on:** `00-brief.md` v1. Menu labels from `docs/revised-website-plan/prototype/menu.html` (current file on disk).

## 1. Voice

- **Speaker:** the studio, "we". Growrix OS is the name of the studio. `CLIENT`.
- **Team-neutral.** No "I", no founder's name, no personal headshot in copy, no "solo", no "one person", no "founder-led" as a claim. `CLIENT` (D5 reversed, DEC-05).
- **Team claims** (headcount, named people, locations, certifications, partner counts): `TBD-from-client`. Never written as fact until confirmed.
- **Tone:** calm, specific, accountable, honest. Plain words. Say what we do and what we don't. `PROJECT (docs/revised-website-plan/01-positioning.md §6)`.
- **Say what we don't do** where it helps the visitor, e.g. "Not our thing: native mobile apps without a clear brief." `ASSUMED`, to be confirmed.

## 2. Pillar names (exact)

| Pillar | Label (headings, nav, CTAs) | Running text |
| --- | --- | --- |
| Develop | Develop | "develop" as a verb is fine |
| AI Automation | AI Automation | "AI automation" as a descriptor |
| Growth | Growth | Do not use "growth" as a generic word. Use "search visibility" |

- Never write "Automate" or "Grow" as a pillar name. `CLIENT`.
- Pillar names are capitalised everywhere they are labels.

## 3. Service labels (exact, from the approved menu)

- Develop: Web development · Mobile apps · SaaS products.
- AI Automation: AI intake & speed-to-lead · Document intake & chase · Audit & sprint · Care plans · Industries → Law firms.
- Growth: SEO · AEO & GEO.

## 4. Proof labels (exact)

Every proof item carries exactly one of these:

- Client project
- Internal build
- Demo build
- Illustrative example

Rules: no label is used for work that does not exist. "Client project" needs written client consent and real data. `PROJECT (docs/revised-website-plan/05-law-niche-and-content.md §3)`.

## 5. Terms (used the same way everywhere)

- "30-day fix guarantee" — this exact wording. It covers anything the studio built, within the agreed scope, for 30 days after go-live. `PROJECT (docs/revised-website-plan/01-positioning.md §5)`. Terms to confirm: `TBD-from-client` (D-7).
- "Fixed price" and "fixed scope", agreed in writing before work starts. `PROJECT` (same source). Terms to confirm: `TBD-from-client` (D-7).
- "Free 20-min call" — this exact wording for the primary CTA.

## 6. Forbidden in copy

- Research word ban (`PROJECT`, research §2.3): revolutionary, game-changing, 10X, unleash, supercharge, cutting-edge, seamless, AI employee, fully autonomous, guaranteed results.
- Revised-plan additions (`PROJECT`, `01-positioning.md` §6): solutions, end-to-end digital transformation, one-stop shop, partner with us.
- Unproven superlatives: best, leading, top-rated, world-class, #1, trusted by.
- Any guarantee of rankings, leads or AI citations. Say what we do and what we measure. `CLIENT`.
- "Solo", "one person", "founder" as a selling point. `CLIENT`.

## 7. Numbers

- On the homepage in this part, the only numbers are structural: "20-min", "30-day", "four steps", "six questions".
- No prices, no statistics, no client counts, no response times, no results. `CLIENT`.
- Third-party statistics are not used until a source is checked and the user approves them. Not in this part.

## 8. Placeholders in this plan

- `[TBD-from-client: …]` appears only in these plan files. It is never rendered to a visitor. A CMS field that is empty renders nothing. `PROJECT (CLAUDE.md, R-01, R-03)`.

## 9. Navigation labels (approved structure)

Top level: Services ▾ · Work · Pricing · Blog · About · Contact · header CTA.

| Item | Label | Target |
| --- | --- | --- |
| Services (mega menu) | Services | `/services` |
| Pillar head | Develop | `/services/develop` |
| | AI Automation | `/services/ai-automation` |
| | Growth | `/services/growth` |
| Work | Work | `/work` |
| Pricing | Pricing | `/pricing` |
| Blog | Blog | `/blog` (shown after 3 published posts; hidden before that) |
| About | About | `/about` |
| Contact | Contact | `/contact` |
| Header CTA | Book a free 20-min call | `/book` |

Blog visibility: hidden until three published posts. The static menu prototype shows it; the build does not. `PROJECT (docs/revised-website-plan/02-sitemap-and-menu.md §1)`.

## 10. URL map (new names, pillar segments only)

| Label | Path |
| --- | --- |
| Develop pillar | `/services/develop` |
| Web development | `/services/develop/web-development` |
| Mobile apps | `/services/develop/mobile-apps` |
| SaaS products | `/services/develop/saas-products` |
| AI Automation pillar | `/services/ai-automation` |
| AI intake & speed-to-lead | `/services/ai-automation/ai-intake-speed-to-lead` |
| Document intake & chase | `/services/ai-automation/document-intake-autopilot` |
| Audit & sprint | `/services/ai-automation/audit` |
| Care plans | `/services/ai-automation/care-plans` |
| Industries → Law firms | `/services/ai-automation/industries/law-firms` |
| Growth pillar | `/services/growth` |
| SEO | `/services/growth/seo` |
| AEO & GEO | `/services/growth/aeo-geo` |

Rules:

- The old `/services/automation/...` and `/services/grow/...` are not used. `CLIENT`.
- Slugs below the pillar are unchanged from the revised sitemap. The document-intake slug is kept; see D-9 in `03-decisions.md`.
- Every homepage link goes to a live page. Links to pages not yet built are hidden, not greyed out. `PROJECT (docs/revised-website-plan/03-homepage-hero.md §7)`.
