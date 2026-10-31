# 04 — Page templates

> **Deferred.** Not in current scope. Current scope is the structure, the menu and the homepage (see 00-README). Kept as reference for later.

Every page is built from a template. A template fixes the section order, the components and the CMS fields. Copy changes go in the CMS, not in the code.

## 1. Template list

| Template | Used by | Notes |
|---|---|---|
| **Pillar hub** | `/services/develop`, `/services/automation`, `/services/grow` | Explains one pillar, links to its services |
| **Service** | Every service page | The standard offer page |
| **Niche** | `/services/automation/industries/law-firms`, later the law sub-pages under Develop and Grow | Same structure as Service, with niche proof and niche FAQ |
| **Industries hub** | `/services/automation/industries` | Short list of live niches |
| **Founder / About** | `/about` | Person-first |
| **Pricing** | `/pricing` | Ranges and terms |
| **Work index / entry** | `/work`, `/work/[slug]` | Honest-label proof |
| **Blog post** | `/blog/[slug]` | Answer-first, sources, related links |
| **Partners** | `/partners` | Secondary, footer-linked |
| **Utility** | `/contact`, `/book`, `/security`, `/legal/*`, `/thanks`, 404 | Plain layouts |

## 2. Pillar hub (Develop, Automate, Grow)

| # | Section | Notes |
|---|---|---|
| 1 | Hero | H1 names the pillar. Subhead says what it is in plain words |
| 2 | Answer-first summary | Who / what / price / timeline, 40–60 words. If no price is entered for a pillar, the price line is omitted. Never write "to be confirmed" on a visitor-facing page |
| 3 | Services in this pillar | Cards, one per service, with one-line outcome and a link |
| 4 | How I work | Same four steps as the homepage |
| 5 | Proof | Labelled work relevant to this pillar only |
| 6 | Founder strip | Photo, name, timezone, verify links |
| 7 | FAQ | Four to six questions specific to the pillar |
| 8 | Closing CTA | Primary CTA ladder |

## 3. Service page

| # | Section | Notes |
|---|---|---|
| 1 | Hero | Eyebrow (service name), H1, subhead, primary CTA + secondary CTA |
| 2 | Answer-first summary | Required |
| 3 | The problem | Cited stats where they exist, otherwise plain statement of the problem |
| 4 | How it works | Numbered steps, diagram where it helps |
| 5 | What you get | Concrete deliverables |
| 6 | Works with | Text list of tools actually connected in a build. No logos |
| 7 | Timeline | Week-by-week, only when the service has a real timeline |
| 8 | Pricing block | Range, fixed-price statement, link to `/pricing` |
| 9 | Proof | Labelled items only |
| 10 | Industries | Links to the niche pages for this service, when they exist. Hidden when none |
| 11 | Founder strip | Required |
| 12 | FAQ | Six to eight, visible, `<details>` |
| 13 | Closing CTA | Ladder |

## 4. Niche page (law firms)

Same section order as the Service template, with these additions:

- Niche eyebrow naming the firm types ("For personal injury, immigration and family law firms").
- A **"Also for law firms"** row linking to the niche sub-pages under Develop and Grow once they are live (hidden until then).
- A **legal-ethics block** placed before pricing.
- Niche FAQ, including the questions the research already wrote for law (FAQ items 1–8 in research §4.7).
- Breadcrumb: `Home › Services › Automate › Industries › Law firms`.

### Law-firm copy: reuse plan

The copy in research §4.7 was written for the law page and is still the base. Reuse it with these changes:

| Research element | Change for this plan |
|---|---|
| H1 `Your next client already called. Did anyone answer?` | Keep |
| Subhead | Keep. Remove "Built on n8n and Claude, in your accounts" only if it reads too heavy; otherwise keep |
| CTAs | Keep the two-CTA pair; links to `/book` and `/services/automation/audit#teardown` |
| Answer-first summary, stat row, three workflows, ethics block, pricing, FAQ | Keep as written |
| "See the full system" link | Points to `/services/automation/ai-intake-speed-to-lead` |
| Closing H2 | Keep |
| Meta title | Keep. Format per 02 rules |

The research's law copy must be re-read in the founder's voice before publishing. It was written for a law-first homepage.

## 5. Service copy drafts for Develop and Grow

No copy for these pages exists in the research. The drafts below are starting points. They contain no numbers, no client names and no unverified claims. Each needs your review. Prices and proof are open items (07, O1 and O2).

### 5.1 Develop — pillar hub

- **H1:** `I build the product: websites, apps and SaaS.`
- **Subhead:** `Marketing sites and web apps, mobile apps, and SaaS products. Scoped and priced before I start, built to be maintained after launch.`

### 5.2 Web development

- **H1:** `Fast websites your team can update, and search engines can read.`
- **Subhead:** `Marketing sites and web apps built on Next.js, with content managed in a CMS so your team can edit pages without a developer. Scoped and priced before work starts.`
- **Deliverables to confirm:** source code in your repo or account, CMS access for your team, handover notes, 30-day fix guarantee.

### 5.3 Mobile apps

- **H1:** `Mobile apps, scoped before the first line of code.`
- **Subhead:** `iOS and Android apps for a clear, specific job. I tell you early whether a mobile app is the right answer, or whether a website is enough.`
- **Open:** the stack (native, cross-platform, or both) is not decided in the research. Do not publish a stack claim until it is (07, O4).
- **Note:** the research's line "Not my thing: native mobile apps" is removed. Replace it with the real scope statement once the stack is set.

### 5.4 SaaS products

- **H1:** `SaaS products, from first idea to paying users.`
- **Subhead:** `I build the product, the sign-in, billing, admin tools and the marketing site around it, as one codebase you own.`
- **Open:** billing provider, multi-tenant support, and whether SaaS is a full build or a referral (07, O4). Do not list features that are not yet built.

### 5.5 Grow — pillar hub

- **H1:** `Get found by people, and cited by AI assistants.`
- **Subhead:** `Technical SEO, answer-engine (AEO) and generative-engine (GEO) work, with clear reporting on what changed.`

### 5.6 SEO

- **H1:** `Technical SEO and content that bring the right people to your site.`
- **Subhead:** `Site structure, speed, metadata, schema and a content plan built around the questions your buyers ask. I report what moved, and I don't promise rankings.`

### 5.7 AEO and GEO

- **H1:** `Be clear, citable and easy to find for AI answer engines.`
- **Subhead:** `Answer-first pages, structured data, clean crawl access, and entity consistency across the places AI assistants look. I measure referral traffic and mentions, and I don't promise citations.`

## 6. Founder / About

| # | Section | Notes |
|---|---|---|
| 1 | Hero | Headshot, H1 (`I'm {{FOUNDER_FULL_NAME}}, a founder-builder in Dhaka.`), two-line intro |
| 2 | Story | Short, first person. How the founder came to build these things. Written by the founder, not drafted by a tool |
| 3 | What I do | Three pillars, one sentence each |
| 4 | How I work | Same four steps, plus timezone statement |
| 5 | Verify me | Upwork, LinkedIn, GitHub, YouTube with the same headshot. Line: "Same person, same name, same photo everywhere." |
| 6 | Working hours | Timezone table: "Your 9 AM = my …" for UK, US Eastern, Australia |
| 7 | Hire through Upwork | Link, not a push |

## 7. Pricing page

- Ranges for every priced service. Fixed-price statement. Payment terms (50% to begin, 50% on delivery, USD invoices, bank transfer). Guarantee wording. Ownership wording.
- The founding-client pilot appears here as a block with an anchor (`#pilot`). Shown only while spots remain (CMS value).
- Pricing FAQ. Pricing is never hidden behind a form.

## 8. Blog post

| # | Section | Notes |
|---|---|---|
| 1 | Title and byline | Byline is the founder, linked to About. "Last updated" date |
| 2 | Answer-first summary | 40–60 words |
| 3 | Body | Headings are questions. Each stat has a source line |
| 4 | Related | One service link and one niche link (for law posts, the law page) |
| 5 | FAQ | Three to five, when the topic has real questions |
| 6 | Closing CTA | One CTA matched to the post's topic |

## 9. Work entry (case study)

Same template as research §6, with these rules:

- The badge at the top is one of: **Client project**, **Internal build**, **Demo build**, **Illustrative example**. No other label.
- Written in first person singular: "I built", "I connected".
- A Loom or video embed loads on click (facade), so the page stays light.
- Metrics need a source or a note that they are from my own test data.

## 10. Partners (secondary)

- Not in the main nav. Linked from the footer, About and the Automate pages' footers.
- Audience: agencies and referral partners who want to resell or refer. Keep the existing research content for white-label terms, but drop the "agency" self-description: this is "a referral and partner arrangement with me", not "our agency partner program".
- Sales route: `/book?type=partner`.
