# 05 — Law-firm niche and content plan

> **Deferred.** Not in current scope. Current scope is the structure, the menu and the homepage (see 00-README). Kept as reference for later.

Law firms are the niche. This file covers how the niche grows through content and search, without shaping the homepage.

## 1. Role of the niche

| Layer | Job | Pages |
|---|---|---|
| Front door | Introduce the founder and three pillars | Homepage (one line for law firms) |
| Offer page | Sell intake automation to law firms | `/services/automation/industries/law-firms` |
| Content cluster | Earn search and AI-answer visibility for law-firm questions | `/blog/*` (about 10 posts in the first cluster) |
| Service-specific niche pages | Sell web work and SEO to law firms, after content is in place | `/services/develop/web-development/industries/law-firms`, `/services/grow/seo/industries/law-firms` (Phase 4) |

The research's 90-day cold-email split test (law vs accounting) still applies to outreach. The site does not wait for it: law content starts at launch. Accounting content does not start until the Jan 2027 decision.

## 2. Keyword clusters (law)

> **All search volumes are unverified.** The research did not find reliable volume data. Confirm each cluster in Google Keyword Planner or another keyword tool before writing. Drop any cluster with no real demand; keep the priority logic but re-rank with real data.

| Cluster (primary → secondary) | Intent | Target URL | Priority |
|---|---|---|---|
| law firm intake automation · legal intake automation · AI intake for law firms | Commercial | `/services/automation/industries/law-firms` | P1 |
| speed to lead law firm · lead response automation for lawyers | Commercial | `/services/automation/ai-intake-speed-to-lead` (with a law section) | P1 |
| Clio intake automation · Clio n8n · Clio Grow automation | Integration | Clio post + law page | P1 |
| missed call text back law firm | Commercial | Law page section + post | P2 |
| personal injury lead follow-up automation | Commercial | Law page + post | P2 |
| immigration firm intake automation · immigration law lead follow-up | Commercial | Post (vertical) | P2 |
| family law intake automation | Commercial | Post (vertical, careful wording) | P3 |
| law firm website SEO · SEO for personal injury lawyers | Commercial | `/services/grow/seo/industries/law-firms` (Phase 4) | P2 |
| law firm website development · lawyer website builder vs custom | Commercial | `/services/develop/web-development/industries/law-firms` (Phase 4) | P2 |
| AI for law firms ethics · ABA Formal Opinion 512 | Informational / trust | Post | P2 |

## 3. First cluster: blog titles

Publish in this order. Each post is one answer-first article, sourced, with two internal links (one service or niche page, and one related post). Dates are not set here.

| # | Title (English) | Intent | Links to |
|---|---|---|---|
| 1 | How much does law firm intake automation cost? Real price ranges | Pricing | Law page, `/pricing` |
| 2 | Speed to lead for personal injury firms: what the research says | Problem | Law page, intake service |
| 3 | Missed-call text-back for law firms: what it should and shouldn't say | Commercial | Law page |
| 4 | Clio intake automation: forms, chat and calls into one record | Integration | Law page, intake service |
| 5 | Immigration firm lead follow-up: why intake needs more than a form | Vertical | Law page |
| 6 | Is it safe to use AI for law firm intake? What ABA Formal Opinion 512 says | Trust | Law page, `/security` |
| 7 | Law firm website SEO: a practical checklist | Grow preview | `/services/grow/seo`, law page |
| 8 | Custom law firm website or a builder? How to decide | Develop preview | `/services/develop/web-development`, law page |
| 9 | n8n vs Zapier vs Make for a small law firm: an honest comparison | Comparison | `/services/automation`, `/pricing` |
| 10 | Free template: Clio website form to lead | Template | Law page, intake service |
| 11 | Case study: [first law-firm client]: before and after | Proof | Law page, `/work/[slug]` |

Rules for post 11 and any client story: publish only with the client's written consent and real data. Until then, use a labelled **Demo build** post instead.

Post 10 is published only with a working workflow behind it (research §7.5 indexing gate applies: checklist complete, workflow JSON, screenshots, walkthrough).

## 4. Law-firm content guardrails

- **Not legal advice.** Every law post includes a short note: general information, not legal advice; consult a licensed attorney in your jurisdiction.
- **No outcomes.** No case results, no "more clients", no "guaranteed" language. Describe how the system works and what the firm controls.
- **Ethics before features.** Any AI-related post says what the AI does not do: no advice, no outcome promises, no decisions on conflicts or engagement.
- **Attribution.** Each stat has a visible source line with a link. Ethics claims cite the primary source (ABA Formal Opinion 512 PDF) and say the firm's own rules still govern.
- **No client names** without written consent.
- **US, UK, Canada, Australia** may each have different rules. Posts name the jurisdiction when the advice depends on it.

## 5. Internal linking for the niche

```
                 /services/automation/industries/law-firms  (niche page)
                    ▲        ▲                     ▲
                    │        │                     │
   intake service ◄─┘   law posts (1–6, 9, 10)     └─► /services/develop/web-development/industries/law-firms  (Phase 4)
                                                   └─► /services/grow/seo/industries/law-firms                  (Phase 4)

   Every law post → the law page + one service page (intake, SEO or web) + one related post.
   The law page → intake service, /pricing, /book, /security, the ethics block, and Phase 4 niche pages when live.
   Anchor text is descriptive: "Clio intake automation for law firms", not "click here".
```

Rules:

- The law page is the hub. Every law post links to it.
- The law page links to Develop and Grow niche pages only after they are published and indexed.
- Never link a niche page from the homepage body except the S5 one-line row.

## 6. Sequencing

| Step | Trigger to start | Output |
|---|---|---|
| A. Law page + intake service | Phase 2 gate passed | Two pages, live |
| B. First cluster (posts 1–6) | Law page live | Six posts, one per week, with LinkedIn carousel where useful |
| C. Posts 7–10 | Posts 1–6 live | Grow and Develop previews, comparison, template |
| D. Law sub-page under Grow (SEO) | Post 7 live and the law page indexed in Search Console, or 8 weeks after launch, whichever is later | `/services/grow/seo/industries/law-firms` |
| E. Law sub-page under Develop (web) | Post 8 live and the first client or demo proof exists | `/services/develop/web-development/industries/law-firms` |
| F. Case study (post 11) | Written consent and real data | `/work/[slug]` and post 11 |

Step D and E depend on Search Console data, not on dates. If the law page gets no impressions after 8 weeks, pause D and E and review the keyword map (section 2).

## 7. Measurement for the niche

| Question | Metric | Source |
|---|---|---|
| Does the law page convert? | Fit-call bookings ÷ visitors to `/services/automation/industries/law-firms` | GA4 key event `booking_confirmed` |
| Do posts feed the law page? | Sessions from blog posts that reach the law page | GA4 path exploration |
| Is search visibility growing? | Impressions and clicks for the law keyword cluster | Search Console |
| Is AI referral visible? | Sessions from AI assistant referrers | GA4 custom channel (research §8.7) |

No target is set until 90 days of data exist. Research §1.2 targets remain the reference point for the automation pages.
