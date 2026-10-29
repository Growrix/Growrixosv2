# Growrix OS — নতুন Website Build Plan (growrixos.com)

**Document:** 02 / New website build plan · **তারিখ:** 28 Oct 2026 · **Build window:** 2 Nov – 22 Nov 2026 (MVP live), তারপর Week 4–12 · **Owner:** Mohammad (solo founder, Dhaka, UTC+6)

**এই document কীভাবে পড়বেন:**
- ব্যাখ্যা বাংলায়। Website-এ যা যাবে (headline, subhead, CTA, section copy, microcopy, meta title/description, FAQ) সব ইংরেজিতে, সরাসরি paste করার মতো।
- `{{DOUBLE_BRACES}}` মানে আসল তথ্য বসাতে হবে। Launch-এর আগে site-এ একটাও `{{…}}` থাকা চলবে না (QA checklist §10.4)।
- কোনো copy-তে এমন সংখ্যা নেই যা এখনো মাপা হয়নি। Client result, logo বা testimonial বানানো হয়নি। প্রমাণ বলতে: LedgerLine document-intake demo, 6টা demo automation (Loom walkthrough সহ), free n8n template, process transparency, founder credential আর guarantee।
- বাইরের তথ্যের পাশে source link আছে। সব উৎস শেষে "Sources" অংশে একসঙ্গে।
- এটা একটা **সম্পূর্ণ নতুন site**-এর plan: নতুন codebase, নতুন content, নতুন URL structure। AI builder (Claude Code, v0, Lovable ইত্যাদি)-কে §0 আর §12 সরাসরি দেওয়া যাবে।

### Placeholder তালিকা (একবার ঠিক করে Sanity `siteSettings`-এ বসান)

| Placeholder | কী বসবে | কখন লাগবে |
|---|---|---|
| `{{FOUNDER_FULL_NAME}}` | Upwork ID verification-এ যে নাম আছে হুবহু সেটা | Day 1 (copy, schema, OG) |
| `{{FOUNDER_FIRST_NAME}}` | যে নামে client ডাকবেন | Day 1 |
| `{{FOUNDER_HEADSHOT}}` | একটাই পেশাদার ছবি, সব platform-এ একই | Week 1 |
| `{{UPWORK_PROFILE_URL}}`, `{{LINKEDIN_URL}}`, `{{LINKEDIN_COMPANY_URL}}`, `{{GITHUB_URL}}`, `{{YOUTUBE_URL}}` | Profile link | Week 1 |
| `{{WHATSAPP_NUMBER}}` | +880 নম্বর (ঐচ্ছিক) | Week 2 |
| `{{YEARS_EXPERIENCE}}` | Development-এ কত বছর | Week 1 |
| `{{PILOT_SPOTS_LEFT}}` | Founding-client pilot-এর বাকি spot (3 থেকে শুরু) | সবসময় সত্য রাখতে হবে |
| `{{DEMO_1_TITLE}}` … `{{DEMO_6_TITLE}}` | Upwork-এ publish করা 6টা demo automation-এর title হুবহু | Week 3 |
| `{{LOOM_ID_*}}` | প্রতিটা walkthrough-এর Loom ID | Week 3 |
| `{{CARE_ESSENTIAL_PRICE}}`, `{{CARE_GROWTH_PRICE}}`, `{{CARE_PRIORITY_PRICE}}` | Care plan-এর exact মাসিক দাম ($300–$1,000-এর মধ্যে) | Week 2 |
| `{{MEDIAN_REPLY_SECONDS}}` | নিজের lead-flow-এর মাপা median reply time | 30 দিনের data হওয়ার পর |
| `{{INSURANCE_STATUS}}` | Professional indemnity insurance আছে কি না (সৎ উত্তর) | Week 3 |
| `{{LAST_UPDATED}}` | Page-এর শেষ review তারিখ (CMS থেকে auto) | Auto |

### Day-1 সিদ্ধান্ত (2 Nov, build শুরুর আগে)

1. **Founder-এর public নাম।** Upwork-এর verified নাম, site, LinkedIn, GitHub, YouTube, schema আর email signature-এ হুবহু এক নাম। Offshore buyer-এর বড় ভয় identity fraud আর middleman ([Full Scale](https://fullscale.io/blog/offshore-development-reference-checks/))। নাম এক হলে সেই ভয়ের উত্তর আপনাআপনি হয়ে যায়।
2. **Canonical host:** `https://www.growrixos.com` (apex `growrixos.com` → www, 308)।
3. **Custom-domain email:** `hello@growrixos.com` (Google Workspace বা Zoho)। Zapier Solution Partner হতেও এটা লাগে, Gmail address গ্রহণযোগ্য নয় ([Zapier](https://zapier.com/l/solution-partner))।
4. **Hosting plan:** Vercel **Pro**। Vercel-এর নিজের নীতি অনুযায়ী Hobby plan "non-commercial personal use only", আর "advertising the sale of a product or service" commercial usage-এর উদাহরণ ([Vercel Fair Use](https://vercel.com/docs/limits/fair-use-guidelines))। Service বিক্রির site তাই Pro-তে চালাতে হবে (দাম vercel.com/pricing-এ যাচাই করুন)।
5. **Headshot:** একটা natural-light ছবি, যেটা সব platform-এ যাবে।

---

## 0. Builder brief (English, paste into any AI builder)

**ব্যাখ্যা:** নিচের পুরো block-টা AI builder-এর প্রথম message বা project instruction হিসেবে paste করুন। এটা এক পাতায় brand, audience, goal, stack, page list, tone আর do/don't বলে দেয়। বিস্তারিত spec-এর জন্য builder-কে এই document-এর §2–§9 দেখতে বলুন।

```md
# BUILDER BRIEF — growrixos.com (Growrix OS)

## What we are building
A brand-new, fast, trustworthy marketing website for Growrix OS: a founder-led business that builds
AI automation systems for professional service firms (law firms and accounting/bookkeeping firms),
using n8n for workflows and Claude (Anthropic) for the AI steps. New codebase, new content. About 20 routes at MVP.

## Brand
- Name: "Growrix OS" (two words, capital "OS"). Never "GrowrixOS", "Growrixos" or "Growrix" alone.
- One-liner: "AI automation systems for professional service firms, built on n8n and Claude."
- Founder: {{FOUNDER_FULL_NAME}}, solo, based in Dhaka, Bangladesh (UTC+6). Clients in the US, UK, Canada, Australia.
- Voice: first person singular ("I", never "we" or "our team"), plain English, specific, calm, no hype.
  Short sentences. Reading level grade 7–9.

## Audience (in order)
1. Owners / operations managers at small law firms (personal injury, immigration) and
   accounting, bookkeeping and tax firms (US first, then UK, Canada, Australia).
2. Marketing, web and GoHighLevel agencies that want a white-label AI automation offer.
3. Upwork clients checking that the freelancer is real.
4. Visitors referred by ChatGPT, Perplexity, Claude, Gemini or Google AI Mode.

## Conversion goals (every page)
1. Primary: "Book a free 20-min fit call" → /book (Cal.com inline embed).
2. Async alternative: "Prefer async? Get a free Loom teardown" → /audit#teardown (form).
3. Paid: "Request a paid audit ($297–$497)" → /audit#audit (form).
Upwork visitors get a "Hire me through Upwork" link instead of being pushed to book.

## Offers and prices (show exactly these ranges)
- AI Intake & Speed-to-Lead System: $2,500–$5,000 setup; Care Plan $500–$1,000/month.
- Document Intake & Chase Autopilot: $1,500–$3,500 setup; Care Plan $300–$750/month.
- Automation Audit: $297–$497 (credited to the build). Workflow Sprint: $400–$1,200.
- Automation Care Plans: from $300/month.
- Agency Partner Program (white-label): builds $500–$1,500; care $100–$300 per end-client/month.
- Conversion website / landing page: add-on only, bundled with a system. Never sold alone.
- Founding-client pilot: first 3 direct clients ~40% off in exchange for a case study + testimonial.
- No SaaS or mobile-app offers anywhere.

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS · Sanity CMS · Vercel (Pro) · Cal.com embed ·
forms POST to /api/lead → signed webhook → n8n · GA4 (Consent Mode v2) + Search Console + Bing.
All marketing pages are statically generated Server Components. Headings, body copy, prices, FAQs
and transcripts MUST be in the initial HTML (AI crawlers do not run JavaScript).
Client islands only: Cal.com embed, forms, Loom click-to-load facade, optional calculator.
Content comes from the CMS; components are presentational shells with no hardcoded copy.

## Pages (MVP)
/ · /services · /services/ai-intake-speed-to-lead · /services/document-intake-autopilot · /audit ·
/care-plans · /partners · /industries · /industries/law-firms · /industries/accounting-firms ·
/work · /work/[slug] · /pricing · /about · /security · /contact · /book · /legal/privacy ·
/legal/terms · custom 404 · /thanks (noindex)
The two industry pages use the SAME template and section order; only data differs.

## Design
Warm off-white background, near-black warm ink, ONE orange accent used ONLY for interactive
elements (buttons, links, focus rings). Display: Bricolage Grotesque. Body: DM Sans. Tabular numbers
for prices and metrics. Ledger-style rows with hairline dividers, generous whitespace, max width ~1200px.
Real founder photo. Custom SVG workflow diagrams. Motion: minimal, ≤200ms, off under
prefers-reduced-motion. WCAG 2.2 AA. Mobile-first. Lighthouse mobile ≥90 performance, ≥95 a11y.

## Do
- Show price ranges on every offer page and on /pricing.
- Label every proof item: "Client project", "Internal build", "Demo build" or "Illustrative example".
- Put a small source link under every statistic.
- Show founder photo, name and timezone on home, about and every service/industry page.
- Add an answer-first summary (who / what / price / timeline) right under each hero.
- Hide any section whose CMS data is empty.

## Don't
- No client logos, testimonials, star ratings, review badges, "trusted by" strips, or vanity counters
  unless a verified, consented record exists in the CMS.
- No stock photos of handshakes or robots, no neon gradients, no glassmorphism, no "10X" language.
- No content that only appears after client-side fetching.
- Never show CMS placeholder or empty-state text to visitors.
- Never invent numbers, clients or results.
```

---

## 1. লক্ষ্য, success metric আর conversion strategy

### 1.1 Site-এর আসল কাজ

প্রথম 6–12 মাস Google organic search প্রায় কোনো lead দেবে না। Ahrefs-এর 2M+ page-এর study-তে নতুন page-এর মাত্র 1.74% এক বছরের মধ্যে top 10-এ ওঠে ([Ahrefs](https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/))। তাই launch-এর পর site-এর প্রথম কাজ traffic আনা নয়, **অন্য channel থেকে আসা visitor-কে convert করা**:
- Cold email (law বনাম accounting split test, ~23 Nov থেকে)
- LinkedIn DM আর content
- Upwork proposal (buyer নাম ধরে Google করেন)
- Agency partner outreach
- AI assistant-এর referral

প্রত্যেকে আসেন একই প্রশ্ন নিয়ে: "এই মানুষটা কি আসল, আর আমার সমস্যাটা কি এ সমাধান করতে পারে?" Site-এর প্রতিটা section এই প্রশ্নের উত্তর দেবে।

### 1.2 Success metric (launch-এর পর প্রথম 90 দিন)

| Metric | Target | কীভাবে মাপবেন |
|---|---|---|
| Fit call booked ÷ unique visitor (industry landing page, source = email/linkedin) | ≥ 3% | GA4 `booking_confirmed` ÷ users, UTM দিয়ে filter |
| Site-wide primary conversion (call + teardown + audit request) | ≥ 2% | GA4 key events ÷ users |
| Lead form-এ automated প্রথম reply | < 60 সেকেন্ড | n8n log: `replied_at − received_at` |
| Lead form-এ মানুষের প্রথম reply | < 4 business hours (Dhaka) | HubSpot activity timestamp |
| Fit call → paid audit বা sprint | ≥ 25% | HubSpot pipeline |
| Loom teardown → fit call | ≥ 30% | HubSpot pipeline |
| Industry page conversion (law বনাম accounting) | তুলনার জন্য, target নেই | GA4 exploration, page = `/industries/*` |
| AI-assistant referral session | Track করুন, target নেই | GA4 "AI Assistants" channel (§8.7) |
| Core Web Vitals (mobile p75) | LCP ≤ 2.0s, INP ≤ 150ms, CLS ≤ 0.05 | Vercel Speed Insights |

**Benchmark context:** Unbounce-এর 41,000 landing page-এর data-তে professional services-এর median conversion 6.1% ([Unbounce](https://unbounce.com/conversion-benchmark-report/))। এগুলো campaign landing page, পুরো site নয়, তাই site-wide target ইচ্ছা করে কম ধরা হয়েছে। AI referral সংখ্যায় খুব কম (B2B traffic-এর ~0.33%) ([Relevant Audience / Demandbase](https://www.relevantaudience.com/geo/chatgpt-referrals-b2b-303-percent-growth/)), কিন্তু একটা case study-তে ChatGPT visitor 15.9% হারে convert করেছে ([Seer](https://www.seerinteractive.com/insights/case-study-6-learnings-about-how-traffic-from-chatgpt-converts))।

### 1.3 CTA hierarchy (সারা site-এ একই)

সফল automation agency আর solo consultant-দের প্রায় সবাই একটা primary CTA ব্যবহার করে: free 15–30 মিনিটের call বা audit ([XRAY](https://www.xray.tech/), [Zaps Studio](https://zapsstudio.com/), [ResonateOps](https://resonateops.com/n8n-consultant))। AY Automate "Don't want a call?" নামে একটা লিখিত বিকল্পও রাখে ([AY Automate](https://www.ayautomate.com/agency/n8n-dev))। Growrix OS-এর জন্য তিন স্তরের ladder:

| স্তর | CTA label (English, exact) | Destination | কার জন্য | কোথায় দেখাবে |
|---|---|---|---|---|
| **Primary** | `Book a free 20-min fit call` | `/book` | যিনি কথা বলতে রাজি | প্রতিটা hero, header button, প্রতিটা page-এর শেষ |
| **Async alternative** | `Prefer async? Get a free Loom teardown` | `/audit#teardown` | Call এড়াতে চান, অন্য timezone | Primary-র ঠিক পাশে, secondary style |
| **Paid commitment** | `Request a paid audit ($297–$497)` | `/audit#audit` | ইতিমধ্যে বিশ্বাস করেন, লিখিত plan চান | /pricing, service page-এর pricing block, final CTA-র text link |
| **Partner** | `Book a 20-min partner call` | `/book?type=partner` | Agency | শুধু /partners আর agency band-এ |
| **Upwork** | `Prefer to hire through Upwork? View my profile` | `{{UPWORK_PROFILE_URL}}` | Upwork থেকে আসা visitor | /about, /pricing FAQ, footer |

**Loom teardown-এর নিয়ম:**
- Visitor form পূরণ করেন: website URL, যে workflow সবচেয়ে বেশি ভোগাচ্ছে, কোন software ব্যবহার করেন।
- Mohammad 2 business day-এর মধ্যে 3–5 মিনিটের Loom পাঠান।
- Capacity রক্ষা করতে সপ্তাহে সর্বোচ্চ 5টা। Page-এ সৎভাবে লেখা থাকবে।
- Cold email-এর প্রথম message-এ video নয়। শুধু যাঁরা reply করেন তাঁদের জন্য Loom ([ListKit](https://www.listkit.io/blog/loom-video-cold-email-outreach-strategy))।

**Upwork-এর সীমা:** Upwork-এ পাওয়া client-কে platform-এর বাইরে নিয়ে গিয়ে direct payment নেওয়া Upwork-এর terms-এ নিষিদ্ধ (current wording [Upwork legal](https://www.upwork.com/legal)-এ যাচাই করুন)। তাই site-এ একটা স্পষ্ট "Prefer to hire through Upwork?" link থাকবে। আর founding-client pilot discount Upwork-এ কখনো উল্লেখ করা যাবে না, কারণ review-এর বদলে free বা discounted কাজ offer করা Upwork-এ নিষিদ্ধ ([Upwork Help](https://support.upwork.com/hc/en-us/articles/17989850384531--What-is-feedback-building))।

### 1.4 Visitor type অনুযায়ী conversion path

| Visitor | কোথা থেকে | Landing page | তাঁর মনের প্রশ্ন | Site যা দেখাবে (ক্রমানুসারে) | CTA |
|---|---|---|---|---|---|
| **A. Direct buyer** (law বা accounting firm-এর owner/ops) | Cold email, LinkedIn DM, referral | `/industries/law-firms` বা `/industries/accounting-firms` (email-এ সরাসরি UTM link) | "আমার firm-এর সমস্যা কি এ বোঝে? খরচ কত? ঝুঁকি কী?" | Vertical pain stat (source সহ) → 3টা workflow → price band → ethics/security block → founder strip → FAQ | Fit call; async-pref হলে Loom teardown |
| **B. Agency partner** (marketing/web/GHL agency) | LinkedIn, community, partner outreach | `/partners` | "আমার client-এর সামনে আমাকে ছোট করবে না তো? Margin আছে? Client চুরি করবে না তো?" | "Add an AI offer without hiring" → white-label নিয়ম → wholesale price → NDA/non-solicit → sample deliverable | Partner call |
| **C. Upwork visitor** (legitimacy check) | Proposal পড়ে Google-এ "Growrix OS" বা founder-এর নাম | `/` বা `/about` | "Proposal-এর মানুষ আর site-এর মানুষ কি একই?" | একই নাম আর ছবি → Dhaka, UTC+6 সৎভাবে → demo build ও Loom → "Verify me" row → security page | `Hire me through Upwork` (booking push করা হবে না) |
| **D. AI-search referral** | ChatGPT, Perplexity, Claude, Gemini, AI Mode | Service page, `/pricing`, `/work/[slug]` | "AI যা বলল সেটা কি ঠিক? এখনই দাম আর scope পাব?" | Hero-র নিচে answer-first summary → price band → proof → FAQ | Fit call (friction যত কম তত ভালো) |

**Path C-র জন্য "Verify me" block:** About page আর footer-এ Upwork, LinkedIn, GitHub আর YouTube link, প্রতিটায় একই headshot, আর লেখা: `Same person, same name, same photo everywhere.` Upwork profile-এ বাইরের link দেওয়া যায় না, কিন্তু buyer নিজেই নাম ধরে খোঁজেন। সেই খোঁজে সব জায়গায় একই জিনিস পাওয়াটাই trust।

**Path A-র জন্য UTM convention:** `?utm_source=coldemail&utm_medium=email&utm_campaign={law|acct}_split_v1&utm_content={step}`। Canonical tag সবসময় query ছাড়া path দেবে (§9.10)।

### 1.5 Trust নীতি → positive requirement

Business সিদ্ধান্তে trust নিয়ে যা ঠিক হয়েছে, নতুন site-এ তা নিচের requirement হিসেবে বাস্তবায়ন হবে:

| Trust নীতি | Site requirement | কোথায় |
|---|---|---|
| Founder face | একই headshot + পুরো নাম + location + timezone | Home hero card, S9, /about, প্রতিটা service/industry page-এর founder strip, OG image |
| শুধু সৎ প্রমাণ | প্রতিটা proof item-এ honest badge; testimonial শুধু verified + consented record থেকে; logo wall নেই | `/work`, home S6, Sanity validation (§9.3) |
| Price range | প্রতিটা offer page-এ range, /pricing-এ সব range আর payment terms | সব offer page, /pricing, Service schema |
| Fixed scope | "Fixed price, agreed before work starts" + scope document প্রতিটা project-এ | Trust row, /pricing "Every project includes" |
| Guarantee | 30-day fix guarantee, একই wording সব জায়গায় | Trust row, /pricing, service page FAQ |
| Security page | Plain-English data handling, যা করা হয় শুধু তাই | `/security`, প্রতিটা service/industry page থেকে link |
| Timezone overlap | একই timezone statement + "Your 9 AM = my …" table | /about, /book, /contact, home S9, FAQ |

ResonateOps (Chile থেকে একা কাজ করা n8n consultant) ঠিক এই মডেলে চলে: নাম, credential, location, fixed price, তিন সপ্তাহ, 60-day guarantee, কোনো logo wall নেই ([ResonateOps](https://resonateops.com/n8n-consultant))। GrowwStacks প্রকাশ্যে price range আর "30 days of free support after go-live" দেখায় ([GrowwStacks](https://www.growwstacks.com/))। Business customer-রা price-কে সবচেয়ে গুরুত্বপূর্ণ তথ্য মনে করেন, আর price লুকানো site-কে "evasive and untrustworthy" ভাবেন ([NN/g](https://www.nngroup.com/articles/show-price/))।

---

## 2. Brand foundations

### 2.1 নাম ব্যবহারের নিয়ম

| নিয়ম | ঠিক | ভুল |
|---|---|---|
| Brand name | **Growrix OS** | GrowrixOS, Growrixos, GROWRIX OS, Growrix (একা) |
| Domain (text-এ) | growrixos.com | www.GrowrixOS.com |
| Possessive | Growrix OS's | Growrix's |
| প্রথম উল্লেখ (page-এ) | Growrix OS, founder-led AI automation for professional service firms | — |
| Founder | {{FOUNDER_FULL_NAME}}, Founder & Automation Engineer | CEO, "our team" |
| Pronoun | "I" (solo founder, সৎ) | "we", "our experts" |
| Offer names | AI Intake & Speed-to-Lead System · Document Intake & Chase Autopilot · Automation Audit · Workflow Sprint · Automation Care Plan · Agency Partner Program | Abbreviation বা বিকল্প নাম |

"I" ব্যবহারের কারণ: solo founder-কে "we" বললে পরে ধরা পড়লে trust নষ্ট হয়। ResonateOps-এর মতো সফল solo consultant নিজের নাম আর পরিচয় সামনে রাখেন ([ResonateOps](https://resonateops.com/n8n-consultant))।

### 2.2 Tagline options

| # | Tagline (English) | কখন ব্যবহার করবেন |
|---|---|---|
| 1 | **Never miss an inquiry. Never chase a document.** | Default (দুই vertical-ই ধরে)। OG title, LinkedIn banner |
| 2 | AI automation systems for professional service firms. | Descriptor / one-liner। Schema, directory, bio |
| 3 | The systems behind fast, organised firms. | About, email signature |
| 4 | Fixed scope. Your accounts. A founder who answers. | Trust-focused ad বা partner deck |
| 5 | Every inquiry answered. Every document collected. | Split-test-এর পর (§5.4), winner অনুযায়ী অর্ধেকটা ব্যবহার করুন |

### 2.3 Voice

| গুণ | মানে | উদাহরণ (English) |
|---|---|---|
| Plain | কোনো jargon নয়, buyer-এর ভাষা | "Your clients reply to an email." ("leverage AI-driven omnichannel ingestion" নয়) |
| Specific | সংখ্যা, সময়, tool-এর নাম | "Live in 2–4 weeks." "Works with Clio and MyCase." |
| Calm | Hype নেই, চাপ নেই | "If automation isn't worth it for you yet, I'll say so." |
| Accountable | দায় নেওয়া, সীমা স্বীকার করা | "Not my thing: native mobile apps." |
| Honest | প্রমাণ label করা, যা নেই তা দাবি না করা | "Demo build, recorded with test data." |

**নিষিদ্ধ শব্দ:** revolutionary, game-changing, 10X, unleash, supercharge, cutting-edge, seamless, AI employee, fully autonomous, guaranteed results।

### 2.4 Messaging pillars

| Pillar | Core message (English) | প্রমাণ | কোথায় |
|---|---|---|---|
| 1. No lead left waiting | "Every inquiry gets a reply in under a minute, day or night." | Clio/HBR stat, site-এর নিজের lead flow (visitor নিজে test করতে পারেন) | Intake service, law page, home S2–S5 |
| 2. No document chasing | "Clients get the right request list and polite reminders until everything arrives." | Mango stat, LedgerLine internal build | Document service, accounting page |
| 3. You own it, fixed and guaranteed | "Fixed price before we start. Built in your accounts. 30-day fix guarantee." | Payment terms, ownership block, /security | Trust row, /pricing |
| 4. One accountable builder | "You talk to the person who builds your system." | Founder face, verify-me row, timezone table | /about, home S9 |
| 5. AI with guardrails | "AI drafts and sorts. People decide." | Human-in-the-loop design, logging | Guardrails section, /security |

### 2.5 Visual direction

**Mood:** "Calm, precise, accountable." Buyer একজন managing partner বা firm owner, যিনি ঝুঁকি এড়ান। Site দেখে যেন মনে হয় একজন careful engineer-এর কাজ, AI hype-এর নয়। Law আর accounting firm-এর চেনা ভাষা: ledger, checklist, status, timestamp।

- **Layout:** 12-column grid, max-width 1200px, প্রচুর white space। Card-এর বদলে ledger-style row আর hairline divider।
- **Founder visibility:** hero-তে founder card (photo + নাম + "Dhaka, UTC+6" + verify link)। প্রতিটা service/industry page-এ founder strip।
- **Imagery:**
  - আসল founder photo, natural light।
  - Custom SVG workflow diagram, আসল node নাম সহ (Webhook → Claude → Clio)।
  - আসল product screenshot: n8n canvas, status board, Telegram alert। Test data, sensitive অংশ blur।
  - কোনো stock "handshake", robot, brain বা circuit illustration নয়।
- **Motion (minimal):**
  - শুধু অর্থবহ জায়গায়: overnight timeline-এ ধাপে ধাপে highlight, diagram-এ step highlight।
  - Micro-interaction ≤ 200ms। Parallax, auto-play carousel বা scroll-jacking নয়।
  - `prefers-reduced-motion`-এ সব static।
- **Status language:** সবুজ = complete, amber = waiting, ধূসর = illustrative। Timeline আর status-board mockup-এ একই রং।

### 2.6 Color আর typography token (প্রস্তাব)

Mohammad-এর নিজের convention মেনে: warm neutral background, harsh সাদা নয়, আর orange শুধু interactive element-এ।

```css
/* app/styles/tokens.css — light theme (dark mode: Phase 3, optional) */
:root {
  /* Surfaces */
  --color-bg:            #FAF8F5;  /* warm off-white page background */
  --color-surface:       #FFFFFF;  /* raised panels, form fields */
  --color-surface-muted: #F3F0EB;  /* alternate section band */
  --color-line:          #E7E2DA;  /* hairline dividers */

  /* Text */
  --color-ink:           #1C1917;  /* headings + body */
  --color-ink-muted:     #57534E;  /* secondary text, captions */
  --color-ink-subtle:    #78716C;  /* source lines, meta (≥4.5:1 on bg – verify) */

  /* Accent — interactive ONLY (buttons, links, focus) */
  --color-accent:        #C2410C;  /* orange; ~4.9:1 on --color-bg, white text on it ~5.2:1 */
  --color-accent-hover:  #9A3412;
  --color-accent-soft:   #FFEDD5;  /* focus halo / selected chip bg */
  --color-on-accent:     #FFFFFF;

  /* Status (diagrams, timeline, badges — never for CTAs) */
  --color-status-done:   #15803D;
  --color-status-wait:   #B45309;
  --color-status-illus:  #64748B;

  /* Radius / shadow / spacing */
  --radius-sm: 6px;  --radius-md: 10px;  --radius-pill: 999px;
  --shadow-1: 0 1px 2px rgb(28 25 23 / 0.06);
  --space-section: clamp(64px, 9vw, 120px);
  --max-content: 1200px;  --max-prose: 68ch;
}
```

Contrast ratio-গুলো হিসাব করা আনুমানিক মান। Build-এর সময় WebAIM contrast checker বা axe দিয়ে যাচাই করুন (WCAG AA: body ≥ 4.5:1, বড় text ও UI ≥ 3:1)।

**Typography:**

| Role | Font | Weight | Size (mobile → desktop) | নোট |
|---|---|---|---|---|
| Display (H1) | Bricolage Grotesque | 600 | 36 → 56px, line-height 1.08 | বেশি গম্ভীর চাইলে শুধু H1-এ DM Serif Display |
| H2 | Bricolage Grotesque | 600 | 28 → 40px | |
| H3 | DM Sans | 600 | 20 → 24px | |
| Body | DM Sans | 400 | 17 → 18px, line-height 1.6 | |
| Small / source line | DM Sans | 400 | 13–14px | `--color-ink-subtle` |
| Numbers (price, metric) | DM Sans | 500 | — | `font-variant-numeric: tabular-nums` |

`next/font/google` দিয়ে self-host, subset `latin`, `display: swap`, সর্বোচ্চ 2 family।

### 2.7 Logo guidance

- **Wordmark:** "Growrix OS", Bricolage Grotesque 600, ink রঙে। "OS" অংশ একটু হালকা weight বা ছোট tracking-এ, যাতে দুই শব্দ স্পষ্ট পড়া যায়।
- **Monogram (favicon / avatar):** একটা "G", একটা ছোট বর্গাকার "status dot" সহ (complete-এর ধারণা)। Ink background-এ off-white, অথবা উল্টো।
- **Accent ব্যবহার নয়:** Orange interactive-এর জন্য সংরক্ষিত, তাই logo-তে orange নেই। এতে button আর logo কখনো গুলিয়ে যায় না।
- **এড়িয়ে চলুন:** robot, brain, circuit, sparkle, gradient, 3D।
- **Files:** `logo.svg` (wordmark), `mark.svg` (monogram), `logo-512.png` (schema-র জন্য), `favicon.ico` + `icon.svg` + `apple-icon.png` (Next.js `app/` convention)।
- **Clear space:** চারদিকে "G"-এর উচ্চতার সমান ফাঁকা জায়গা। Minimum width: wordmark 96px, mark 16px।
- **একই avatar সব জায়গায় নয়:** personal profile-এ (LinkedIn, Upwork, GitHub) founder-এর headshot। Company page আর YouTube channel icon-এ monogram।

---

## 3. Information architecture

### 3.1 পূর্ণ sitemap

```
/                                      Home
/services                              Services hub (short; links to every offer)
  /services/ai-intake-speed-to-lead    Offer 1 — AI Intake & Speed-to-Lead System
  /services/document-intake-autopilot  Offer 2 — Document Intake & Chase Autopilot
/audit                                 Offer 3 — free Loom teardown (#teardown), Automation Audit (#audit),
                                                 Workflow Sprint (#sprint)
/care-plans                            Offer 4 — Automation Care Plans
/partners                              Offer 5 — Agency Partner Program (white-label)
/industries                            Industries hub (2 cards only)
  /industries/law-firms                Vertical A (PI / immigration / family)
  /industries/accounting-firms         Vertical B (accounting / bookkeeping / tax)
/work                                  Proof index: internal build + demo builds (+ client projects later)
  /work/[slug]                         One entry (case-study template, §6)
/pricing                               Every price range, add-ons (#website-add-on), pilot (#pilot),
                                       payment terms, guarantee, FAQ (#faq)
/about                                 Founder, story, hours, verify-me links
/security                              Security & data handling
/contact                               Email, form, WhatsApp, hours
/book                                  Cal.com inline booker (fit call; ?type=partner for partner call)
/thanks                                Form confirmation (noindex)
/legal/privacy                         Privacy policy
/legal/terms                           Website terms
— Phase 2 (Week 5+) —
/resources                             Free n8n templates and checklists
  /resources/[slug]
/blog                                  Articles (added to nav after ≥3 posts)
  /blog/[slug]
— System —
/sitemap.xml  /robots.txt  /llms.txt (optional)  /opengraph-image (per route)
```

**Website add-on-এর জন্য আলাদা page নেই।** এটা শুধু system-এর সঙ্গে bundle হিসেবে বিক্রি হয়, তাই `/pricing#website-add-on` block আর দুই service page-এর একটা ছোট section-এ থাকবে।

**SaaS / mobile app:** কোনো page নেই। /services hub-এর একদম শেষে এক লাইন: `SaaS and mobile builds: by referral only.`

### 3.2 Header navigation

```
[Growrix OS]   Services ▾   Industries ▾   Work   Pricing   Partners   About      [Book a free 20-min fit call]
               ├ AI Intake & Speed-to-Lead   ├ Law firms
               ├ Document Intake & Chase     └ Accounting firms
               ├ Automation Audit & Sprint
               └ Care Plans
```

- সর্বোচ্চ 6টা top-level item। Resources আর Blog প্রথমে footer-এ থাকবে, content জমলে header-এ আসবে।
- **Industries dropdown-এর ক্রম** CMS-এর `industry.isPrimary` থেকে আসবে। Split test-এর আগে alphabetical (Accounting, Law)। Winner ঠিক হলে winner উপরে (§5.4)।
- **Mobile:** hamburger menu, আর header-এ সবসময় দেখা যায় এমন একটা ছোট `Book a call` pill।
- **Sticky behaviour:** desktop-এ header sticky। Mobile-এ 40% scroll-এর পর নিচে একটা CTA bar: `Book a free 20-min fit call` + `Loom teardown`। এটা footer বা form ঢেকে দেবে না (form-এ focus থাকলে লুকিয়ে যাবে)।
- Dropdown keyboard-accessible (Enter/Space খোলে, Esc বন্ধ করে), hover-only নয়।

### 3.3 Footer

```
Column 1 — Growrix OS
  AI automation systems for professional service firms, built on n8n and Claude.
  Founder-led from Dhaka, Bangladesh (UTC+6). Working with firms in the US, UK, Canada and Australia.
  hello@growrixos.com

Column 2 — Services            Column 3 — Industries      Column 4 — Company
  AI Intake & Speed-to-Lead      Law firms                  About
  Document Intake & Chase        Accounting firms           Work
  Automation Audit & Sprint                                 Pricing
  Care Plans                   Column 5 — Free stuff        Security
  Agency Partner Program         n8n templates (Phase 2)    Contact
                                 Blog (Phase 2)             Book a call

Verify me:  [Upwork] [LinkedIn] [GitHub] [YouTube]   Same person, same name, same photo everywhere.
© {{YEAR}} Growrix OS · Privacy · Terms · Prefer to hire through Upwork? View my profile
```

Phase 2-র link-গুলো content publish না হওয়া পর্যন্ত render হবে না (CMS-এ entry না থাকলে hide)।

### 3.4 URL convention

| নিয়ম | উদাহরণ |
|---|---|
| Lowercase, hyphen, ইংরেজি শব্দ | `/services/document-intake-autopilot` |
| Trailing slash নেই (`trailingSlash: false`) | `/pricing`, `/pricing/` নয় |
| URL-এ তারিখ বা ID নেই | `/blog/law-firm-intake-automation-cost`, `/blog/2026/11/...` নয় |
| Slug publish-এর পর বদলাবে না | বদলাতেই হলে `next.config.ts`-এ `permanent: true` (308) redirect যোগ করুন |
| Fixed anchor ID (copy-তে আর email-এ link হয়) | `#teardown`, `#audit`, `#sprint`, `#faq`, `#website-add-on`, `#pilot` |
| Query param শুধু tracking-এর জন্য (`utm_*`, `type`) | Canonical সবসময় query ছাড়া |
| Host একটাই | `https://www.growrixos.com` |
| Industry page সবসময় `/industries/{plural-noun}` | ভবিষ্যতে নতুন vertical একই pattern-এ |

---

## 4. Page-by-page spec

### 4.0 সব page-এ যা একই থাকবে

- **Answer-first summary:** hero-র ঠিক নিচে 40–60 শব্দে who / what / price / timeline। AI-search visitor আর AI crawler দুই পক্ষই এখান থেকে সরাসরি উত্তর পায়।
- **Founder strip:** ছবি, নাম, "Dhaka, UTC+6", verify link (component `FounderStrip`)।
- **Closing CTA block:** primary + async + paid ladder (component `CtaLadder`)।
- **Visible FAQ:** `<details>/<summary>` দিয়ে, content initial HTML-এ। Google FAQ rich result 7 May 2026 থেকে সবার জন্য বন্ধ ([Passionfruit](https://www.getpassionfruit.com/blog/what-changed-with-google-drops-faq-rich-results-and-what-to-do-now)), তবু visible FAQ রাখুন, কারণ AI feature "query fan-out" দিয়ে উপপ্রশ্নের উত্তর খোঁজে ([Google AI features](https://developers.google.com/search/docs/appearance/ai-features))।
- **Schema:** সব inner page-এ `BreadcrumbList`। Root layout-এ `Organization` + `WebSite` + `Person` (§8.3)।
- **"Last updated: {{LAST_UPDATED}}"** service, industry আর pricing page-এর নিচে। ChatGPT-এ cite হওয়া list-গুলোর 79.1% গত বছরের মধ্যে update হয়েছিল ([Ahrefs](https://ahrefs.com/blog/best-lists-research/))।
- **Stat-এর নিচে source line:** ছোট লেখা, link সহ (component `SourceLink`)।

**Reusable copy block** (একবার লিখে Sanity `siteSettings`-এ রাখুন, সব page সেখান থেকে নেবে):

- **Timezone statement:** `I'm based in Dhaka, Bangladesh (UTC+6). Live calls fit UK mornings, US Eastern mornings and Australian afternoons — the booking calendar shows every slot in your timezone. Most build work happens while you're offline, so you start your day with progress, not questions.`
- **Guarantee:** `30-day fix guarantee. If anything I built breaks or doesn't do what we agreed in the scope within 30 days of go-live, I fix it at no extra cost.`
- **Ownership:** `You own everything. The workflows run in your accounts, the credentials stay in your vault, and you get the full export and documentation at handover.`
- **Payment terms:** `Fixed price, agreed in writing before work starts. 50% to begin, 50% on delivery. Invoices in USD; pay by bank transfer (ACH or SWIFT) via Payoneer, or hire me through Upwork.`
- **Human-in-the-loop:** `AI drafts and sorts. People decide. Anything that goes to a client, a court or a tax authority waits for a human approval step unless you explicitly switch it off.`
- **Trust row (hero-র নিচে):** `Fixed price before we start` · `You own every workflow` · `30-day fix guarantee`
- **Founder strip:** `Built and supported by {{FOUNDER_FULL_NAME}}, founder of Growrix OS. Dhaka, Bangladesh (UTC+6). Verify me: Upwork · LinkedIn · GitHub`
- **Honest-proof note (proof section-এর নিচে):** `Every item is labelled: client project, internal build, demo build or illustrative example. I don't blur the four.`

---

### 4.1 /services/ai-intake-speed-to-lead — AI Intake & Speed-to-Lead System

**উদ্দেশ্য:** Offer 1 বিক্রি করা। Law vertical-এর মূল service page, কিন্তু অন্য professional firm-এর জন্যও কাজ করবে (copy-তে "law firms and professional practices")।
**Target keywords** (সব volume unverified, §7.2): speed to lead automation · lead response automation · AI intake for law firms · Clio intake automation · missed call text back automation।
**Schema:** `Service` + `Offer` (PriceSpecification 2500–5000 USD) + `BreadcrumbList` + `FAQPage` (optional)।

**Section order:**
1. Hero
2. Answer-first summary
3. The problem (cited stats)
4. How it works (diagram + numbered steps)
5. What you get
6. Works with (text list, logo নয়)
7. Timeline
8. Pricing block
9. See it working (demo + নিজের lead flow)
10. Guardrails
11. Website add-on
12. Founder strip
13. FAQ
14. Closing CTA

**Copy:**

- **Eyebrow:** `AI Intake & Speed-to-Lead System`
- **H1:** `Answer every new inquiry in under a minute — even at 2 AM.`
- **Subhead:** `I build intake systems for law firms and professional practices. Web forms, chat and missed calls get an instant, on-brand reply, are qualified by AI against your criteria, and land in Clio, MyCase or your CRM with a consult booked. Built on n8n and Claude. Fixed scope, fixed price, live in 2–4 weeks.`
- **CTAs:** `Book a free 20-min fit call` · `Prefer async? Get a free Loom teardown`
- **Trust row:** reusable block
- **Answer-first summary:**
  - **For:** `Law firms (personal injury, immigration, family) and other firms that pay for leads and lose them to slow follow-up.`
  - **What it does:** `Instant reply → AI qualification → booking → CRM record → staff alert → follow-up until the lead books or says no.`
  - **Price:** `$2,500–$5,000 setup · optional Care Plan $500–$1,000/month.`
  - **Timeline:** `2–4 weeks from kickoff to go-live.`
- **H2 — The problem:** `Most firms don't have a lead problem. They have a response problem.`
  - Body: `In Clio's 2024 secret-shopper study, only 40% of law firms answered the phone, and 48% neither answered nor called back. Personal-injury firms spend an average of $284 per lead. Research on online leads found that firms contacting a lead within an hour were nearly 7× more likely to qualify it than firms that waited longer.`
  - Source line: `Sources: Clio Legal Trends 2024 via 2Civility · Rankings.io · Harvard Business Review (2011)` → [2Civility](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/) · [Rankings.io](https://rankings.io/personal-injury-lead-costs/) · [HBR](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)
- **H2 — How it works:** `From first message to booked consult, without anyone watching the inbox.`
  1. `Capture` — `Web form, website chat, missed-call text-back and email all feed one workflow.`
  2. `Reply instantly` — `A personal SMS or email in your voice, within 60 seconds, using templates you approved.`
  3. `Qualify with AI` — `Claude scores the inquiry against your intake rules: practice area, jurisdiction, urgency and a conflicts flag.`
  4. `Book` — `A calendar link or callback slot, matched to the right person.`
  5. `Record` — `Contact and lead created in Clio, MyCase, Lawmatics or HubSpot.`
  6. `Alert` — `Slack, Teams or SMS to whoever handles intake.`
  7. `Follow up` — `A short sequence that stops the moment they book or reply.`
  - Diagram caption: `Every step is logged. If a step fails, it retries, then alerts a person.`
- **H2 — What you get:**
  - `A working intake workflow in your own n8n (cloud or self-hosted) and your own accounts`
  - `Qualification rules tuned to your practice areas, with a human-review queue for edge cases`
  - `Instant-reply and follow-up templates we write together (no legal advice, ever)`
  - `CRM or practice-management integration and staff alerts`
  - `A one-page dashboard: inquiries, response time, booked consults`
  - `Loom walkthrough, written runbook and a 30-day fix guarantee`
- **H2 — Works with the tools you already use:** `Clio · MyCase · Lawmatics · HubSpot · GoHighLevel · Cal.com / Calendly · Twilio · Gmail / Outlook · Slack / Teams · any website platform`
  - Builder note: শুধু সেই tool রাখুন যেগুলো demo বা client build-এ আসলেই connect করা হয়েছে। Logo নয়, text list।
- **H2 — Timeline:** `Week 1: map your intake and write the rules together. Week 2: build and connect. Week 3: test with replayed inquiries. Week 4: go live, train your team, hand over.`
- **H2 — Pricing:** `Setup $2,500–$5,000, fixed in writing before we start. Optional Care Plan $500–$1,000/month. Not sure yet? Start with a paid Automation Audit ($297–$497), credited in full to the build.`
  - CTAs: `See full pricing` → /pricing · `Request a paid audit` → /audit#audit
  - Pilot line (শুধু `{{PILOT_SPOTS_LEFT}}` > 0 হলে): `Founding-client pilot: {{PILOT_SPOTS_LEFT}} of 3 spots left at about 40% off, in exchange for a case study.` → /pricing#pilot
- **H2 — See it working:**
  - Body: `Send an inquiry through the contact form on this site and time the reply. That's this system, running on my own business.`
  - Card: `[Demo build] {{DEMO_LAW_INTAKE_TITLE}}` — `Recorded end-to-end with test data.` → /work/{{slug}}
  - CTA: `Send a test inquiry` → /contact
- **H2 — Guardrails:** `Automation first, AI only where it earns its place.`
  - `Human approval on anything client-facing that isn't a pre-approved template.`
  - `The AI classifies and routes. It never gives legal advice or promises outcomes.`
  - `Every run is logged; failures retry, then alert a person.`
  - `Minimum data to the AI step; sensitive fields can be redacted first.` → `How I handle your data` → /security
- **H2 — Need a page that converts too?** `If your intake page is the bottleneck, I can bundle a fast, conversion-focused Next.js practice-area landing page with technical SEO built in. Only available together with an automation system.` → /pricing#website-add-on
- **Founder strip:** reusable
- **FAQ (8):**
  1. **Will the AI give legal advice to prospects?** — `No. Replies are approved templates plus factual next steps. The AI classifies and routes; it doesn't advise. Every message carries your firm's standard disclaimer.`
  2. **Does it work with Clio, MyCase or Lawmatics?** — `Yes, through their APIs. On the fit call I'll confirm your plan includes API access before quoting.`
  3. **What about missed phone calls?** — `A missed call triggers an instant text-back with a booking link and logs the lead. I don't sell a standalone AI voice receptionist; I connect intake to the tools you already pay for.`
  4. **Who owns the system?** — `You do. It runs in your accounts, with your credentials, and you get the full export and documentation.`
  5. **How do you handle confidential information?** — `Least-privilege access, credentials stored in your vault, no client data kept on my machines, and a mutual NDA before kickoff. The Security page has the details.`
  6. **How long until it's live?** — `Usually 2–4 weeks, depending on how many intake channels and practice areas we connect.`
  7. **What happens if something breaks after launch?** — `For 30 days I fix it free. After that, a Care Plan covers monitoring, fixes and small changes, or I quote fixes as needed.`
  8. **You're in Bangladesh — how do calls work?** — `I'm on UTC+6. Calls fit US Eastern mornings and UK mornings, and the booking page shows times in your zone. Most work happens async, with Loom updates.`
- **Closing CTA:** H2 `See what your intake would look like.` · Body `Twenty minutes, one workflow, an honest answer. If a feature already in your software would solve it, I'll tell you.` · ladder
- **Meta title (≤60):** `AI Intake & Speed-to-Lead System for Law Firms | Growrix OS`
- **Meta description (≤155):** `Reply to every inquiry in under a minute, qualify it with AI, and book consults into Clio or your CRM. Fixed price $2,500–$5,000. Live in 2–4 weeks.`

---

### 4.2 /services/document-intake-autopilot — Document Intake & Chase Autopilot

**উদ্দেশ্য:** Offer 2। Accounting vertical-এর মূল service page। LedgerLine v3 এর প্রধান প্রমাণ।
**Target keywords** (unverified): client document collection automation · automate document requests accountants · document chasing automation · bookkeeping client onboarding automation · n8n document processing।
**Schema:** `Service` + `Offer` (1500–3500 USD) + `BreadcrumbList` + `FAQPage` (optional)।

**Section order:**
1. Hero
2. Answer-first summary
3. Problem
4. How it works
5. What you get
6. Works with
7. Built on real work: LedgerLine
8. Timeline
9. Pricing
10. Your clients' data
11. Website add-on (এক লাইন)
12. Founder strip
13. FAQ
14. Closing CTA

**Copy:**

- **Eyebrow:** `Document Intake & Chase Autopilot`
- **H1:** `Stop chasing client documents.`
- **Subhead:** `I build a system that requests the right documents from each client, sends polite reminders until they arrive, reads and files what comes in with AI, and shows your team a live status board. For accounting, bookkeeping and tax firms. Fixed price, live in 2–3 weeks.`
- **CTAs:** `Book a free 20-min fit call` · `Prefer async? Get a free Loom teardown`
- **Answer-first summary:**
  - **For:** `Accounting, bookkeeping and tax practices that lose hours every week to "did you get my W-2?" emails.`
  - **What it does:** `Per-client request lists → automatic reminders → AI checks, names and files uploads → missing-item follow-ups → status board.`
  - **Price:** `$1,500–$3,500 setup · optional Care Plan $300–$750/month.`
  - **Timeline:** `2–3 weeks.`
- **H2 — The problem:** `Your team wasn't hired to send reminder emails.`
  - Body: `69% of accounting firms say getting documents from clients on time is a problem. Firms already using AI report saving about 18 hours per employee per month — yet only 37% invest in training their teams to use it.`
  - Source line: [Stealth Agents compilation of Mango / Financial Cents data](https://stealthagents.com/research/accounting-client-document-collection-workload-statistics-2026) · [CPA Practice Advisor / Karbon](https://www.cpapracticeadvisor.com/2025/02/20/report-shows-firms-that-embrace-ai-have-competitive-advantage/156365/)
- **H2 — How it works:** `From "please send" to "filed and complete", without a single manual reminder.`
  1. `Request` — `A checklist per client, built from last year's file or your engagement type.`
  2. `Remind` — `Email or SMS on a schedule you set, in your voice, stopping the moment items arrive.`
  3. `Read` — `Claude identifies the document type, tax year and client, and flags blurry or wrong uploads.`
  4. `File` — `Renamed and saved to the right folder in Google Drive, SharePoint, Karbon, TaxDome or your document system.`
  5. `Report` — `A status board: who's complete, who's missing what, who needs a call.`
- **H2 — What you get:** `Request-list templates per engagement type` · `Reminder sequences you approve` · `AI classification with a human-review queue` · `Filing rules and a naming convention` · `Status board` · `Runbook, Loom walkthrough and a 30-day fix guarantee`
- **H2 — Works with:** `Google Drive · SharePoint / OneDrive · Karbon · TaxDome · Financial Cents · QuickBooks Online · Xero · Gmail / Outlook · Twilio` (শুধু যা আসলেই connect করেছেন)
- **H2 — Built on real work: LedgerLine**
  - Card badge: `Internal build`
  - Body: `LedgerLine is my own document-intake automation, now in its third version. It's an internal build, not a client project. The write-up shows exactly what it does, what broke in versions 1 and 2, and what version 3 fixed.`
  - CTA: `Read the LedgerLine build log` → /work/ledgerline-document-intake · `Watch the walkthrough` (Loom facade)
- **H2 — Timeline:** `Week 1: map your engagement types and write the request lists. Week 2: build reminders, AI reading and filing. Week 3: test on sample documents, train your team, go live.`
- **H2 — Pricing:** `$1,500–$3,500 setup, fixed in writing before we start. Care Plan $300–$750/month. Or start with a paid Automation Audit ($297–$497), credited to the build — or a Workflow Sprint ($400–$1,200) that automates one reminder sequence first.`
- **H2 — Your clients' data:** `Documents stay in your storage. The AI step uses Anthropic's commercial API, which by default doesn't train on customer inputs and outputs. I work with least-privilege access and design the system to support your Written Information Security Plan.` → /security
- **Website add-on line:** `Need a faster client-onboarding page? I can bundle a conversion-focused landing page with the system.` → /pricing#website-add-on
- **FAQ (8):**
  1. **Will my clients need to learn a new portal?** — `No. They get a link or an email they can reply to with attachments. If you already use a portal such as TaxDome, Karbon or SmartVault, the system works with it.`
  2. **How accurate is the AI document reading?** — `It's good at identifying common forms and statements, and it flags anything it isn't sure about for a person to check. Nothing is silently misfiled. On the fit call I'll show you the test results from my own build.`
  3. **Is client financial data sent to AI?** — `Only the document content needed for classification, through a commercial API whose provider states it doesn't train on that data by default. Sensitive fields can be redacted before the AI step.`
  4. **Do you support our WISP and IRS Publication 4557 obligations?** — `I design to support them — access controls, logging and data minimisation — but compliance stays your firm's responsibility. I'll document exactly what the system touches.`
  5. **Can reminders sound like us?** — `Yes. We write them together, and you approve every template before go-live.`
  6. **What if a client sends the wrong document?** — `The system flags it and sends a friendly "this looks like last year's statement" follow-up, or routes it to your team.`
  7. **How long does setup take?** — `2–3 weeks for one engagement type; about one extra week for each additional workflow.`
  8. **Can we start small?** — `Yes. A Workflow Sprint ($400–$1,200) automates one reminder sequence first, and you can expand later.`
- **Closing CTA:** H2 `See what your busy season could look like.` · ladder
- **Meta title:** `Client Document Collection Automation for Accountants | Growrix OS`
- **Meta description:** `Automatic document requests, reminders and AI filing for accounting and bookkeeping firms. Fixed price $1,500–$3,500. Live in 2–3 weeks. You own it.`

*Source note (page-এ নয়):* IRS Publication 4557 ([IRS](https://www.irs.gov/pub/irs-pdf/p4557.pdf)) আর Anthropic-এর commercial-data নীতি ([Anthropic Privacy Center](https://privacy.claude.com/en/articles/7996885-will-anthropic-train-on-my-inputs-and-outputs)) launch-এর আগে আবার যাচাই করুন। অন্য LLM provider ব্যবহার করলে wording সেই অনুযায়ী বদলান।

---

### 4.3 /audit — free Loom teardown, Automation Audit, Workflow Sprint

**উদ্দেশ্য:** Entry offer। Paid commitment-এর জায়গা, আর async visitor-এর জন্য free teardown।
**Keywords:** automation audit · workflow automation audit · n8n workflow audit · AI automation consultant।
**Schema:** `Service` + 2টা `Offer` (Audit 297–497, Sprint 400–1200) + `BreadcrumbList`।

**Section order:**
1. Hero
2. Three option cards (`#teardown`, `#audit`, `#sprint`)
3. What the audit covers
4. Sample audit deliverable (redacted screenshot, Phase 2-এ; MVP-তে outline list)
5. How the credit works
6. Teardown request form (`#teardown`)
7. Audit request form (`#audit`)
8. FAQ
9. Closing CTA

**Copy:**
- **H1:** `Find out what to automate first — before you spend real money.`
- **Subhead:** `Three ways to start, from a free 5-minute video to a working automation in about a week.`
- **Card 1 — `Free Loom teardown` · $0:** `Send me your website and the workflow that annoys you most. Within 2 business days you get a 3–5 minute video showing where leads or documents slip through, and what I'd fix first. No call needed. Limited to 5 per week.` CTA: `Request a teardown`
- **Card 2 — `Automation Audit` · $297–$497:** `A 45-minute working session plus a written plan: your current workflows mapped, the top 3 automations ranked by hours saved and revenue protected, tool recommendations, a fixed quote and a build timeline. 100% credited to your build if you go ahead within 30 days.` CTA: `Request a paid audit`
- **Card 3 — `Workflow Sprint` · $400–$1,200:** `One workflow, built and live in about a week. Good for a first reminder sequence, a form-to-CRM sync or a missed-call text-back.` CTA: `Book a fit call to scope it`
- **H2 — What the audit covers:** `Intake and lead response` · `Document flow` · `Tools and integrations` · `Data and access risks` · `Quick wins vs. system builds`
- **H2 — What you receive:** `A written plan (PDF and Loom), a workflow map, a ranked list of automations with estimated hours saved, a fixed quote, and a build timeline you can use with me or anyone else.`
- **H2 — How the credit works:** `Pay for the audit, then decide. If you book a build within 30 days, the full audit fee comes off the build price.`
- **Teardown form** (fields): `Your name` · `Work email` · `Firm website` · `Which workflow hurts most?` (select: New inquiries / Missed calls / Client documents / Onboarding / Something else) · `What software do you use for it?` · `Anything I should know?` (optional) · consent checkbox। Submit: `Send my teardown request`। Success: `Got it. You'll get a confirmation email in a minute and your video within 2 business days.`
- **Audit form** (fields): name · work email · firm · website · firm type · team size · `What do you want the audit to answer?` · consent। Submit: `Request my audit`। Success: `Thanks. I'll reply within one business day with two time options and a payment link.`
- **FAQ (6):**
  1. **Why pay for an audit when others offer free calls?** — `A free call gets you opinions; the audit gets you a written plan and a fixed quote you can use with anyone. And the fee is credited to your build.`
  2. **What's the difference between $297 and $497?** — `$297 covers one team or workflow area. $497 covers intake and documents together, or more than five tools.`
  3. **What do you need from me?** — `45 minutes, view-only screen-share of the tools involved, and a list of who touches each step.`
  4. **What if you find nothing worth automating?** — `Then the audit says so in writing, and you've avoided a bad project. If a setting inside your existing software would do, I'll tell you.`
  5. **Is the Loom teardown really free?** — `Yes. It's how I show my thinking before you pay anything. There's no automated sales sequence afterwards — just one follow-up email from me.`
  6. **How do I pay for the audit?** — `By USD bank transfer through Payoneer, or through Upwork if you prefer. You'll get an invoice before the session.`
- **Meta title:** `Automation Audit for Law & Accounting Firms | Growrix OS`
- **Meta description:** `Free 5-minute Loom teardown, a $297–$497 audit credited to your build, or a one-week Workflow Sprint. Find out what to automate first.`

---

### 4.4 /care-plans — Automation Care Plans

**Keywords:** n8n maintenance · automation maintenance retainer · workflow monitoring service।
**Schema:** `Service` + 3টা `Offer` + `BreadcrumbList`।
**Section order:** Hero → 3 tier rows → What "monitoring" means → Response times (সৎ) → What's not included → FAQ → CTA।

**Copy:**
- **H1:** `Automations break quietly. Care Plans catch it first.`
- **Subhead:** `Monitoring, fixes, small changes and a monthly report for systems I built — or ones you inherited, after an audit.`
- **Tiers** (exact দাম Mohammad বসাবেন, binding range $300–$1,000/mo):
  - **Essential — {{CARE_ESSENTIAL_PRICE}}/month (from $300):** `Error monitoring and alerts · fixes for anything that breaks · API and credential renewals · monthly health report · response within 1 business day.`
  - **Growth — {{CARE_GROWTH_PRICE}}/month:** `Everything in Essential · up to 4 hours of changes per month · AI prompt tuning · quarterly review call.`
  - **Priority — {{CARE_PRIORITY_PRICE}}/month (up to $1,000):** `Everything in Growth · up to 8 hours of changes · same-business-day response (Dhaka hours) · small new workflows.`
  - Note line: `Typical: document systems $300–$750/month, intake systems $500–$1,000/month.`
- **H2 — What monitoring means:** `Every workflow reports failures to me automatically. I see an error before your staff notice a missing reply — and you get a plain-English note of what happened and what I changed.`
- **H2 — Response times, honestly:** `I'm on UTC+6. Alerts reach me around the clock, and my working day overlaps US nights and UK mornings, so most fixes land before your team starts. I don't promise 24/7 phone support.`
- **H2 — Not included:** `Software subscriptions (n8n, Twilio, AI usage, your CRM) stay on your accounts. New systems are quoted separately.`
- **FAQ (6):**
  1. **Can you look after automations someone else built?** — `Yes, after a paid audit of the existing setup so we both know what we're dealing with.`
  2. **What counts as a "change"?** — `Editing a message template, adding a field, adjusting a rule or connecting one more form. New systems or integrations are quoted separately.`
  3. **Can I cancel?** — `Yes. Plans are monthly, with 30 days' notice.`
  4. **What if something breaks at 3 AM in New York?** — `That's mid-afternoon in Dhaka. Alerts reach me, and on business days I usually start the fix the same day. Priority plans get same-business-day response.`
  5. **Are hosting and tool costs included?** — `No. They stay on your accounts so you keep ownership. I'll estimate them up front.`
  6. **Do unused hours roll over?** — `No, but I'll suggest improvements each month so the hours get used on what matters.`
- **Meta title:** `Automation Care Plans: n8n & AI Workflow Maintenance | Growrix OS`
- **Meta description:** `Monitoring, fixes and monthly improvements for your n8n and AI automations. Plans from $300/month. Cancel anytime with 30 days' notice.`

---

### 4.5 /partners — Agency Partner Program (white-label)

**উদ্দেশ্য:** Track 1-এর cash flow। Pitch হবে "add an AI offer without hiring", "outsourcing" নয়। CallRail-এর data অনুযায়ী 62% agency AI চালু করতে চায়, কিন্তু মাত্র 17% outsourcing-কে priority মনে করে ([CallRail 2025 Outlook](https://cdn.mediavalet.com/usva/callrail/dR4GkaMLLkKjeisNH22zjQ/1C0nbRtR0kyLPvwqJtgyOQ/Original/CallRail_2025%20Outlook%20for%20Marketing%20Agencies_Ebook.pdf))।
**Keywords** (unverified): white label AI automation · white label n8n · white label AI agency services · GoHighLevel automation partner।
**Schema:** `Service` + `Offer` + `BreadcrumbList`।

**Section order:**
1. Hero
2. Who this is for
3. What you can resell
4. How white-label works (4 steps)
5. The rules I work by
6. Wholesale pricing
7. Sample deliverables
8. Founder strip
9. Partner FAQ
10. Partner call CTA

**Copy:**
- **H1:** `Add an AI automation offer to your agency — without hiring.`
- **Subhead:** `I build intake, speed-to-lead and document automations under your brand, for your clients. You own the relationship and set the price. I stay behind the scenes.`
- **CTAs:** `Book a 20-min partner call` · `See wholesale pricing` (#pricing)
- **H2 — Who this is for:** `Marketing, web and GoHighLevel agencies whose clients keep asking about AI — and who'd rather sell it than build it.`
- **H2 — What you can resell:** `AI speed-to-lead and missed-call text-back` · `AI intake and qualification into the client's CRM` · `Document request and reminder automation` · `GoHighLevel workflows extended with n8n and Claude`
- **H2 — How it works:**
  1. `You sell the outcome. I can join your scoping call as "your automation engineer", or stay fully behind the scenes.`
  2. `I build in your client's accounts (or yours).`
  3. `You get white-label handover docs and Loom walkthroughs with your branding.`
  4. `Optional monthly care, billed to you, not your client.`
- **H2 — The rules I work by:** `No contact with your clients unless you ask.` · `Mutual NDA and a non-solicitation clause as standard.` · `Your brand on every document.` · `Fixed wholesale price per build, agreed before work starts.`
- **H2 — Wholesale pricing (starting points):** `Builds from $500–$1,500 depending on scope. Ongoing care from $100–$300 per end-client per month. You set your own retail price.`
  - Internal note (page-এ নয়): এগুলো অনুমান, কোনো sourced benchmark নেই। Agency-র 50–70% margin target ধরে উল্টো দিক থেকে হিসাব ([KrishaWeb](https://www.krishaweb.com/?p=45332))। প্রথম 3 partner-এর পর update করুন।
- **H2 — Sample deliverables:** `Anonymised runbook, a handover Loom and a demo build you can show your client — available on request after a partner call.` + 1–2 `/work` card (`[Demo build]` badge সহ)
- **FAQ (7):**
  1. **Will you ever contact my client directly?** — `Only if you introduce us. Non-solicitation is in every partner agreement.`
  2. **Do you work inside GoHighLevel?** — `Yes — GHL workflows, plus n8n for what GHL can't do natively: AI qualification, document handling and custom APIs.`
  3. **What does a first project usually look like?** — `One speed-to-lead or missed-call workflow for one of your clients, so you can test the fit with low risk.`
  4. **Hourly or per project?** — `Fixed per project. You know your margin before you quote.`
  5. **Who supports the client after launch?** — `You stay first line; I'm second line through a partner care plan.`
  6. **Can I see your work?** — `Yes. Demo builds and Loom walkthroughs are on the Work page, and I'll share a sample white-label runbook after a partner call.`
  7. **How do you invoice partners?** — `In USD, 50% to start and 50% on delivery, by bank transfer via Payoneer.`
- **Meta title:** `White-Label AI Automation for Agencies | Growrix OS Partners`
- **Meta description:** `Resell AI intake, speed-to-lead and document automations under your brand. Fixed wholesale pricing, NDA, non-solicit, no client contact unless you ask.`

---

### 4.6 Industry page template (দুই page-এর জন্য একই)

**কেন একই template:** Cold-email split test (law বনাম accounting)-এর তুলনা fair রাখতে, আর Jan 6–8, 2027-এর niche সিদ্ধান্তের পর rebuild ছাড়াই একটাকে primary করতে। দুই page একই component, একই section order, একই CTA। আলাদা শুধু CMS data।

| # | Section | Component | CMS field (`industry`) |
|---|---|---|---|
| 1 | Hero (eyebrow, H1, subhead, 2 CTA, founder mini-card) | `IndustryHero` | `eyebrow`, `h1`, `subhead` |
| 2 | Answer-first summary | `AnswerSummary` | `summary {for, whatItDoes, price, timeline}` |
| 3 | The math (3 stat + optional calculator) | `StatRow`, `LossCalculator` | `stats[]`, `calculator` (optional) |
| 4 | Three workflows firms start with | `WorkflowTriad` | `workflows[3]` |
| 5 | How the main system works (diagram) | `WorkflowDiagram` | `primaryService → service.steps` |
| 6 | Compliance & confidentiality block | `ComplianceBlock` | `complianceBlock` |
| 7 | Pricing | `PriceBand` | `primaryService.priceMin/Max` + audit |
| 8 | Proof | `ProofGrid` | `relatedWork[]` |
| 9 | Founder strip + timezone | `FounderStrip` | `siteSettings` |
| 10 | FAQ | `FaqList` | `faqs[]` |
| 11 | Closing CTA | `CtaLadder` | `closingHeadline` |

**Schema:** `Service` (`audience` = BusinessAudience, `areaServed`) + `BreadcrumbList`। নিজেকে `LegalService` বা `AccountingService` type দেবেন না, সেগুলো firm-এর নিজের জন্য।

### 4.7 /industries/law-firms

**Keywords** (unverified): law firm intake automation · legal intake automation · personal injury lead follow up automation · immigration law firm automation · Clio automation।
**Cold-email UTM:** `?utm_source=coldemail&utm_medium=email&utm_campaign=law_split_v1`

**Copy:**
- **Eyebrow:** `For personal injury, immigration and family law firms`
- **H1:** `Your next client already called. Did anyone answer?`
- **Subhead:** `AI intake and speed-to-lead systems for law firms: instant replies, qualified leads in Clio or MyCase, and consults booked while you're in court. Built on n8n and Claude, in your accounts.`
- **CTAs:** `Book a free 20-min fit call` · `Prefer async? Get a free Loom teardown`
- **Answer-first summary:**
  - **For:** `Small and mid-sized PI, immigration and family firms in the US, UK, Canada and Australia.`
  - **What it does:** `Answers every web, chat and missed-call inquiry within a minute, qualifies it against your intake rules, books the consult and records it in your practice-management software.`
  - **Price:** `$2,500–$5,000 setup · Care Plan $500–$1,000/month.`
  - **Timeline:** `2–4 weeks.`
- **H2 — The math:** `What slow intake costs a firm that pays for leads.`
  - Stat 1: `48%` — `of law firms neither answered nor returned a prospective client's call in Clio's 2024 secret-shopper study.` [2Civility / Clio](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/)
  - Stat 2: `$284` — `average spend per lead across 13 personal-injury firms analysed by Rankings.io.` [Rankings.io](https://rankings.io/personal-injury-lead-costs/)
  - Stat 3: `~7×` — `more likely to qualify a lead when you respond within an hour.` [HBR](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)
  - Calculator (Phase 2, optional): `Leads per month × cost per lead × % not answered = money spent on leads nobody spoke to.` Formula আর ব্যাখ্যা static HTML-এ, শুধু input interaction client-side।
- **H2 — Three workflows firms start with:**
  1. `New inquiry → booked consult` — `Form or chat answered in under a minute, qualified, booked, and logged in Clio.`
  2. `Missed call → text-back → callback booked` — `Every missed call gets a text with a booking link, and the lead is logged.`
  3. `Signed client → retainer, ID and documents on autopilot` — `Engagement letter, ID check and document requests sent and chased automatically.`
- **H2 — How it works:** (service-এর 7 ধাপ, diagram) → link `See the full system` → /services/ai-intake-speed-to-lead
- **H2 — Built for legal ethics, not around them:** `The assistant never gives legal advice, never promises outcomes, and identifies itself as automated. Conflict checks and engagement decisions stay with your staff. I follow the ABA's guidance on generative AI (Formal Opinion 512) when deciding what the AI may and may not do — your jurisdiction's rules still govern, and you approve every message template.` Source: [ABA Formal Opinion 512](https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf)
- **H2 — Pricing:** `$2,500–$5,000 setup, fixed before we start. Start smaller with a $297–$497 audit (credited) or a $400–$1,200 missed-call Workflow Sprint.`
- **H2 — See it working:** law demo card(s) + `Send a test inquiry` → /contact
- **FAQ (8):**
  1. **Does this replace our receptionist or answering service?** — `No. It covers the gaps — after hours, lunch, busy mornings — and makes sure nothing waits until someone checks the inbox.`
  2. **Does it work with Clio Grow, MyCase or Lawmatics?** — `Yes, through their APIs. I'll confirm your plan's API access before quoting.`
  3. **Can a prospect still reach a real person?** — `Always. Every message offers a one-tap callback request, and urgent inquiries alert your team immediately.`
  4. **What about Spanish-speaking leads?** — `Bilingual templates are possible. Any AI-drafted reply in another language waits for approval unless it's a pre-approved template.`
  5. **Are the messages attorney advertising?** — `They're your firm's communications, so have the templates reviewed under your state's or regulator's rules. I'll provide them in a format that's easy to review.`
  6. **Do we need anything for US text messaging?** — `Business texting in the US requires A2P 10DLC registration through your SMS provider. I'll walk you through it during setup.` (Builder note: [Twilio A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc) launch-এর আগে যাচাই করুন)
  7. **How do you keep client information confidential?** — `Least-privilege access, credentials in your vault, minimal data sent to the AI step, full logging and a mutual NDA. See the Security page.`
  8. **What do you need from us to start?** — `A 20-minute call, your intake criteria, and admin access to the tools we'll connect. I'll send a one-page checklist.`
- **Closing CTA:** H2 `Find out how many inquiries are slipping through.`
- **Meta title:** `Law Firm Intake Automation & Speed-to-Lead | Growrix OS`
- **Meta description:** `Instant replies, AI-qualified leads and booked consults for PI, immigration and family law firms. Works with Clio and MyCase. Fixed price, 2–4 weeks.`

### 4.8 /industries/accounting-firms

**Keywords** (unverified): accounting firm automation · bookkeeping automation services · tax document collection automation · accounting client onboarding automation · Karbon automation · TaxDome automation।
**Cold-email UTM:** `?utm_source=coldemail&utm_medium=email&utm_campaign=acct_split_v1`

**Copy:**
- **Eyebrow:** `For accounting, bookkeeping and tax firms`
- **H1:** `Busy season without the document chase.`
- **Subhead:** `Automated document requests, reminders and AI filing for accounting, bookkeeping and tax firms in the US, UK, Canada and Australia. Your clients reply to an email; your team sees a status board.`
- **CTAs:** same ladder
- **Answer-first summary:**
  - **For:** `Practices with 2–50 staff that collect documents from dozens or hundreds of clients each season.`
  - **What it does:** `Sends each client the right request list, reminds them until everything arrives, reads and files uploads with AI, and shows who's missing what.`
  - **Price:** `$1,500–$3,500 setup · Care Plan $300–$750/month.`
  - **Timeline:** `2–3 weeks.`
- **H2 — The math:** `Where the hours go every busy season.`
  - Stat 1: `69%` — `of accounting firms say getting client documents on time is a problem (Mango, 2025).` [Stealth Agents compilation](https://stealthagents.com/research/accounting-client-document-collection-workload-statistics-2026)
  - Stat 2: `65.2%` — `of firms name document collection their biggest workflow challenge, up from 53.8% (Financial Cents).` [Stealth Agents compilation](https://stealthagents.com/research/accounting-client-document-collection-workload-statistics-2026)
  - Stat 3: `~18 hours` — `saved per employee per month by firms already using AI, yet only 37% invest in training.` [CPA Practice Advisor / Karbon](https://www.cpapracticeadvisor.com/2025/02/20/report-shows-firms-that-embrace-ai-have-competitive-advantage/156365/)
  - Calculator (Phase 2, optional): `Clients × reminder emails per client × minutes per email = staff hours spent chasing.`
- **H2 — Three workflows firms start with:**
  1. `Document request → reminders → AI filing` — `Each client gets a personal checklist; reminders stop when items arrive; uploads are named and filed.`
  2. `New client onboarding` — `Engagement letter, ID, prior returns and access requests collected in one guided flow.`
  3. `Website inquiry → qualified → proposal sent` — `New inquiries answered instantly, sorted by service and size, with a proposal link for good fits.`
- **H2 — How it works:** document service-এর 5 ধাপ → `See the full system` → /services/document-intake-autopilot
- **H2 — Data security for tax and accounting work:** `I design every system to support your Written Information Security Plan and IRS Publication 4557 safeguards: least-privilege access, credentials in your vault, documents kept in your storage, minimal data sent to the AI step, and full logs. For UK, Canadian and Australian firms I sign a data processing agreement and keep data in the systems and regions you already use. Compliance stays your firm's responsibility; I document exactly what the system touches.` Sources: [IRS Pub 4557](https://www.irs.gov/pub/irs-pdf/p4557.pdf) · [IRS Security Summit WISP guide (Pub 5708)](https://www.irs.gov/newsroom/security-summit-releases-new-data-security-plan-to-help-tax-professionals-new-wisp-simplifies-complex-area)
  - Builder note: UK GDPR/international transfer-এর wording launch-এর আগে UK ICO guidance দেখে যাচাই করুন। এখানে তা যাচাই করা হয়নি।
- **H2 — Proof:** LedgerLine card (`Internal build`) + accounting demo card + Loom
- **H2 — Pricing:** `$1,500–$3,500 setup. Start with a $297–$497 audit (credited) or a $400–$1,200 Workflow Sprint for one reminder sequence.`
- **FAQ (8):**
  1. **Do you work with TaxDome, Karbon or Financial Cents?** — `Yes, through their APIs or email integrations. If your tool has no API for a step, I'll say so before quoting.`
  2. **Our clients aren't tech-savvy. Will this confuse them?** — `They receive a plain email or text and reply with attachments or use a simple upload link. No new app, no login.`
  3. **Is it safe to let AI read tax documents?** — `The AI step only sees what it needs to classify a document, through a commercial API that doesn't train on your data by default. Sensitive fields can be redacted first, and anything uncertain goes to a person.`
  4. **Can we be ready before busy season?** — `A first system takes 2–3 weeks. Start in December or early January and you'll be live before most W-2s and 1099s arrive.`
  5. **Do you work with UK, Canadian and Australian firms?** — `Yes. I sign a data processing agreement and work in the tools and regions you already use.`
  6. **We already have a client portal. Do we still need this?** — `Often the portal is fine and the chasing is the problem. The system can send requests and reminders that point clients to your existing portal.`
  7. **What happens to documents that don't match anything?** — `They land in a review queue with the AI's best guess, and your team decides.`
  8. **Can we start with one service line?** — `Yes. Most firms start with individual tax returns or monthly bookkeeping clients, then add more.`
- **Closing CTA:** H2 `See what a calmer busy season would look like.`
- **Meta title:** `Accounting Firm Document Collection Automation | Growrix OS`
- **Meta description:** `Stop chasing client documents. Automated requests, reminders and AI filing for accounting and bookkeeping firms. Fixed price from $1,500. You own it.`

**Split-test নিয়ম:** দুই page-এর design, section order, CTA আর load speed একই থাকবে। শুধু vertical-specific content আলাদা। Winner বাছাই হবে cold-email-এর positive reply rate আর booked call দিয়ে (Marketing plan-এর নিয়ম); page conversion সহায়ক তথ্য। Loser page মুছবেন না, শুধু nav-এ নিচে নামবে।

---

### 4.9 /pricing

**উদ্দেশ্য:** NN/g-এর নির্দেশনা মেনে typical scenario আর range দেখানো ([NN/g](https://www.nngroup.com/articles/show-price/))। AI-search visitor (path D)-এর সবচেয়ে বড় landing page। Zaps Studio-র public 3-tier price band এই ধরনের layout-এর ভালো উদাহরণ ([Zaps Studio](https://zapsstudio.com/))।
**Keywords:** AI automation pricing · how much does workflow automation cost · n8n developer cost · AI intake system cost।
**Schema:** প্রতিটা Service-এর `Offer` reference (`@id`) + `BreadcrumbList`। কোনো `AggregateRating` নয়।

**Section order:**
1. Hero
2. Start here (3 entry rows)
3. Systems (2 rows)
4. Care Plans
5. Agency partners
6. Add-ons (`#website-add-on`)
7. Founding-client pilot (`#pilot`)
8. What every project includes
9. Payment terms
10. Guarantee
11. FAQ (`#faq`)
12. Closing CTA

**Copy:**
- **H1:** `Clear prices. Fixed scope. No surprises.`
- **Subhead:** `Every project gets a fixed quote in writing before work starts. These ranges show where most projects land.`
- **Start here:**
  - `Free Loom teardown` — `$0` — `A 3–5 minute video on where leads or documents slip through.`
  - `Automation Audit` — `$297–$497` — `Written plan and fixed quote. Credited to your build.`
  - `Workflow Sprint` — `$400–$1,200` — `One workflow, live in about a week.`
- **Systems:**
  - `AI Intake & Speed-to-Lead System` — `$2,500–$5,000 setup` — `Instant replies, AI qualification, booking and CRM. 2–4 weeks.`
  - `Document Intake & Chase Autopilot` — `$1,500–$3,500 setup` — `Requests, reminders, AI filing and a status board. 2–3 weeks.`
- **Care Plans:** `From $300/month. Document systems $300–$750 · Intake systems $500–$1,000.` → /care-plans
- **Agency partners:** `Builds from $500–$1,500 · care from $100–$300 per end-client per month.` → /partners
- **`#website-add-on` — H3 `Conversion-focused website or landing page (add-on only)`:** `Fast Next.js landing or practice-area pages with technical SEO built in, bundled with an automation system. Quoted together with your system; not sold on its own.`
- **`#pilot` — H3 `Founding-client pilot`:** `I'm taking 3 founding clients at about 40% off a system build, in exchange for a detailed case study and a testimonial you're happy to put your name to. {{PILOT_SPOTS_LEFT}} of 3 spots left.`
  - নিয়ম: শুধু direct client-এর জন্য। Spot সংখ্যা সবসময় সত্য। `{{PILOT_SPOTS_LEFT}}` = 0 হলে block লুকাবে।
- **H2 — Every project includes:** `A written scope document` · `Built and run in your accounts` · `Documentation and a Loom walkthrough` · `30-day fix guarantee` · `Mutual NDA on request`
- **H2 — Payment terms:** reusable block
- **H2 — Guarantee:** reusable block
- **FAQ (`#faq`, 8):**
  1. **Why ranges instead of exact prices?** — `Price depends on how many channels, tools and rules we connect. The fit call or audit turns the range into a fixed quote.`
  2. **Are software subscriptions included?** — `No. n8n, Twilio, AI usage and your CRM stay on your accounts, so you own them. I'll estimate monthly running costs up front.`
  3. **How do I pay from the US, UK, Canada or Australia?** — `By USD bank transfer (ACH or SWIFT) to my Payoneer receiving account, or hire me through Upwork if you prefer its escrow.`
  4. **Do you sign NDAs?** — `Yes, a mutual NDA before we share anything sensitive.`
  5. **Who owns the workflows?** — `You do, on full payment. Everything is built in your accounts from day one.`
  6. **What if the project takes longer than planned?** — `The price is fixed. If you add scope, I quote the change before doing it.`
  7. **Do you build SaaS products or mobile apps?** — `Not as a public service. If you've been referred for one, get in touch and I'll tell you honestly whether I'm the right fit.`
  8. **Can I hire you through Upwork?** — `Yes. Same person, same scope and quality. View my Upwork profile.` → `{{UPWORK_PROFILE_URL}}`
- **Meta title:** `Pricing: AI Automation for Law & Accounting Firms | Growrix OS`
- **Meta description:** `Audits from $297, systems from $1,500, care plans from $300/month. Fixed quotes, 50% upfront, 30-day fix guarantee. See every price range.`

---

### 4.10 /about

**উদ্দেশ্য:** Path C (legitimacy) আর E-E-A-T। নাম, credential, location, কীভাবে কাজ হয়, আর verify link।
**Keywords:** {{FOUNDER_FULL_NAME}} · Growrix OS founder · n8n automation developer Bangladesh (secondary)।
**Schema:** `AboutPage` + `Person` (`@id` …/about#founder) + `Organization` reference।

**Section order:**
1. Hero (photo + H1 + subhead)
2. Short story
3. What I'm good at / not good at
4. How I work (async + calls)
5. Hours & timezone (table)
6. Credentials & tools
7. Verify me
8. Closing CTA (Upwork link সহ)

**Copy:**
- **H1:** `Hi, I'm {{FOUNDER_FIRST_NAME}}. I build the automations behind fast, organised firms.`
- **Subhead:** `Founder of Growrix OS. Developer working in Node.js, TypeScript, Next.js, n8n and Claude. Based in Dhaka, Bangladesh, working with firms in the US, UK, Canada and Australia.`
- **Story (~120 words):** `I've spent {{YEARS_EXPERIENCE}} years building software, starting with production Next.js websites for clients. The more sites I shipped, the more I noticed the same thing: the website brought in inquiries, and then they sat in an inbox. So I moved down the funnel. Today I build the systems that answer, qualify, collect and file — the unglamorous, important work between a prospect's first message and a signed, organised client. I run my own business on the same stack I sell: the form on this site, the reply you'll get, and the AI agents that help me research and draft all run on n8n and Claude, with me approving what goes out.`
- **H2 — What I'm good at, and what I'm not:**
  - Good at: `Connecting the tools you already pay for` · `AI that classifies and drafts, with guardrails` · `Clear documentation and handover`
  - Not my thing: `Standalone AI voice receptionists` · `Native mobile apps` · `"Fully autonomous AI employees"`
  - Line: `If a feature already in your software would solve the problem, I'll tell you on the first call.`
- **H2 — How I work:** `Fixed scope in writing. A short kickoff call, then async progress: a Loom update when you start your day, and a call whenever a decision needs one. You approve every message template before anything goes live.`
- **H2 — Hours:** timezone statement + table (static HTML; client-side script শুধু visitor-এর local time highlight করবে):

  | Your city | Your 9:00 AM is my (Dhaka) | Good call window (your time, Nov–Mar) |
  |---|---|---|
  | New York / Toronto | 8:00 PM (7:00 PM during US daylight time) | 8:00 AM – 12:00 PM |
  | London | 3:00 PM (2:00 PM during UK summer time) | 8:00 AM – 11:00 AM |
  | Sydney | 4:00 AM (5:00 AM outside AU daylight time) | 2:00 PM – 4:00 PM |

  Builder note: DST-এর কারণে মান বদলায়। Table-টা hardcode না করে `Intl.DateTimeFormat` দিয়ে build-time-এ (Dhaka UTC+6, DST নেই) আর client-এ visitor-এর zone দিয়ে হিসাব করুন। Static fallback-এ শুধু "Calls: 8–11 AM London · 8 AM–12 PM New York · 2–4 PM Sydney" লিখুন, যেটা Cal.com availability (§9.6) থেকে আসে।
- **H2 — Credentials & tools:** `n8n · Claude (Anthropic API) · Node.js / TypeScript · Next.js · HubSpot · GoHighLevel` + earned badge (শুধু পাওয়ার পরে: Upwork badge, Make/Zapier certification, n8n Creator profile, Anthropic course certificate)। Badge না থাকলে block-টাই নেই।
- **H2 — Verify me:** `Upwork · LinkedIn · GitHub · YouTube` + `Same person, same name, same photo everywhere.`
- **Closing:** `Book a free 20-min fit call` · `Prefer to hire through Upwork? View my profile`
- **FAQ (5):**
  1. **Is Growrix OS a company or one person?** — `One person: me. I build and support every system myself, and I'll tell you up front if a project needs more hands.`
  2. **Why Bangladesh?** — `It's home. The timezone means I work while US firms sleep, and the cost base lets me offer fixed prices below onshore agencies without cutting corners.`
  3. **Do you subcontract?** — `Not without your written permission.`
  4. **What happens if you're unavailable?** — `Every system ships with a runbook and a recorded walkthrough so another n8n developer could take over. Care Plan clients get advance notice of any planned time off.`
  5. **Can I talk to a past client?** — `As founding-client projects finish, I'll share references who've agreed to it. Until then, I'll walk you through demo builds live.`
- **Meta title:** `About {{FOUNDER_FULL_NAME}}, Founder of Growrix OS`
- **Meta description:** `Founder-led AI automation for professional service firms, built from Dhaka (UTC+6) for clients in the US, UK, Canada and Australia. Verify me on Upwork and LinkedIn.`

---

### 4.11 /security

**উদ্দেশ্য:** Buyer-এর #1 আপত্তির উত্তর। AI না নেওয়া small business-এর 61.2% privacy/security-কে বাধা বলেছেন ([Homebase](https://www.joinhomebase.com/blog/small-business-ai-data-report)); accounting firm-দের 70% data security নিয়ে চিন্তিত ([CPA Practice Advisor](https://www.cpapracticeadvisor.com/2025/02/20/report-shows-firms-that-embrace-ai-have-competitive-advantage/156365/))।
**নিয়ম:** যা করা হয় শুধু তাই লিখবেন। SOC 2, HIPAA, ISO বা "bank-grade" claim নয়।
**Schema:** `WebPage` + `BreadcrumbList`।

**Section order:**
1. Hero
2. Six principles
3. Access & credentials
4. Where data lives
5. AI providers
6. Logging & human review
7. What I don't do
8. Incident response
9. Legal (NDA, DPA, IP)
10. FAQ
11. CTA

**Copy:**
- **H1:** `How I handle your data.`
- **Subhead:** `Plain-English answers to the questions your partners, clients and insurers will ask.`
- **Principles:**
  1. `Your accounts, not mine` — `Workflows run in your n8n, CRM and storage.`
  2. `Least privilege` — `I ask only for the access each step needs, and you can revoke it at any time.`
  3. `Credentials stay in your vault` — `Stored in n8n's encrypted credential store or your password manager, never in email or chat.`
  4. `Minimum data to AI` — `Only the text a step needs is sent to the AI model; sensitive fields can be redacted first.`
  5. `Humans approve` — `Client-facing messages that aren't pre-approved templates wait for a person.`
  6. `Everything is logged` — `Every run, every AI decision, every failure.`
- **H2 — Access & credentials:** `I work through named accounts you create for me, with two-factor authentication. At handover I remove my access and send you a checklist confirming it.`
- **H2 — Where data lives:** `In the tools you already use — your CRM, practice-management software, Google Drive or SharePoint. I don't copy client files to my own devices or storage.`
- **H2 — AI providers:** `By default I use Anthropic's Claude through its commercial API. Anthropic states that it does not train on commercial customers' inputs and outputs unless the customer opts in. Zero-data-retention arrangements are available for eligible API use.` Links: [Anthropic: training](https://privacy.claude.com/en/articles/7996885-will-anthropic-train-on-my-inputs-and-outputs) · [Anthropic: zero data retention](https://privacy.claude.com/en/articles/8956058)
- **H2 — Logging & human review:** `Each workflow keeps an execution log. AI classifications below a confidence threshold go to a review queue. You can see what the system did and why.`
- **H2 — What I don't do:** `Handle protected health information (I don't sign HIPAA business associate agreements)` · `Store your client files on my devices` · `Use your data to train anything` · `Subcontract your project without written permission`
- **H2 — Incident response:** `If I learn of a security incident affecting your systems, I'll notify you within 48 hours with what happened, what was exposed and what I've done about it.`
- **H2 — Legal:** `Mutual NDA as standard · Data processing agreement available for UK, EU, Canadian and Australian clients · IP and ownership transfer to you on full payment.`
- **FAQ (6):**
  1. **Where are you located, and does that matter for data?** — `I'm in Dhaka, Bangladesh. Your data stays in your own systems and regions; I access it remotely with the permissions you grant.`
  2. **Can you work only inside our tenant or VPN?** — `Yes. I can work through accounts and devices you control.`
  3. **What happens to my access when the project ends?** — `It's revoked at handover, and you get a checklist confirming it. Care Plan clients keep a limited monitoring account.`
  4. **Do you carry professional insurance?** — `{{INSURANCE_STATUS}}` (সৎ উত্তর দিন। না থাকলে: `Not currently. The fixed scope, your-accounts model and the 30-day fix guarantee are how I limit risk for clients.`)
  5. **Will you complete our vendor security questionnaire?** — `Yes. Send it over and I'll answer it in writing.`
  6. **Which AI model sees our data?** — `Anthropic's Claude via the commercial API by default. If your policy requires a different provider, we'll agree it in the scope.`
- **Meta title:** `Security & Data Handling | Growrix OS`
- **Meta description:** `Least-privilege access, credentials in your vault, minimum data sent to AI, human approval and full logging. How Growrix OS protects your firm's data.`

---

### 4.12 /work (index)

**উদ্দেশ্য:** সব proof এক জায়গায়, honest badge সহ।
**Schema:** `CollectionPage` + `ItemList` + `BreadcrumbList`।
**Copy:**
- **H1:** `Work: build logs and demo builds`
- **Subhead:** `Client projects are marked "Client project". My own systems are "Internal build". Systems built with test data to show how something works are "Demo build". I don't blur them.`
- **Filter chips:** `All · Internal build · Demo build · Law · Accounting · Agencies` (+ `Client project` শুধু কমপক্ষে একটা client entry publish হলে)
- **Empty-state নিয়ম:** কোনো filter-এ entry না থাকলে সেই chip render হবে না। "No projects match" লেখা কখনো দেখানো যাবে না।
- **Card:** badge · title (outcome) · one-line summary · tags · Loom thumbnail · `Watch the walkthrough →`
- **MVP entries:** `/work/ledgerline-document-intake` (Internal build) + 2টা demo (একটা law-intake, একটা agency/GHL বা accounting) — বাকি 4টা demo Week 4–6-এ।
- **FAQ (5):**
  1. **Why so many demo builds?** — `Because I'd rather show you a working system recorded with test data than show you logos you can't check. Client case studies are added as founding-client projects finish.`
  2. **Are the demos real software?** — `Yes. Each one is a working n8n workflow; the walkthrough shows it running end to end.`
  3. **Can I see one live?** — `Yes. On a fit call I'll run any demo with your example data.`
  4. **Can I get the workflow files?** — `Some are free on the Resources page. Others are part of paid builds.`
  5. **Will my project become a case study?** — `Only if you agree in writing. Founding-client pilots include one by design.`
- **Meta title:** `Build Logs & Demo Builds | Growrix OS`
- **Meta description:** `Recorded walkthroughs of AI intake and document automation systems built on n8n and Claude — each one honestly labelled as internal, demo or client work.`

---

### 4.13 /book

- **H1:** `Book a free 20-minute fit call`
- **Subhead:** `We'll look at one workflow, I'll tell you honestly whether automation is worth it, and you'll leave with a rough price range. No slide deck.`
- **Left column (static HTML):**
  - `What happens on the call` — `1. You show me the workflow that's leaking leads or hours.` · `2. I tell you what I'd automate, what I wouldn't, and why.` · `3. You get a price range and next step — or an honest "not yet".`
  - Timezone statement
  - `Prefer async? Get a free Loom teardown instead.` → /audit#teardown
- **Right column:** Cal.com inline embed (`fit-call-20`; `?type=partner` হলে `partner-call-20`)।
- **Noscript / embed failure fallback:** `Calendar not loading? Email hello@growrixos.com with two times that suit you.`
- **FAQ (5):**
  1. **Is the call really free?** — `Yes. 20 minutes, no obligation, no follow-up sequence.`
  2. **Do I need to prepare anything?** — `Just bring the one workflow you'd fix first. A screen-share helps but isn't required.`
  3. **What timezone are the slots in?** — `Yours. The calendar detects your timezone automatically.`
  4. **None of the times work for me.** — `Email hello@growrixos.com and I'll find a slot, or request a Loom teardown instead.`
  5. **Who will I speak to?** — `Me, {{FOUNDER_FIRST_NAME}}, the person who would build your system.`
- **Meta title:** `Book a Free 20-Minute Fit Call | Growrix OS`
- **Meta description:** `Pick a time in your timezone. 20 minutes, one workflow, an honest answer and a price range. Or request a free Loom teardown instead.`

### 4.14 /contact

- **H1:** `Talk to a person, not a sales team.`
- **Subhead:** `Send a message and you'll get an instant confirmation, then a personal reply from me within one business day.`
- **Content:** `hello@growrixos.com` (visible, clickable) · lead form (§9.7) · WhatsApp `{{WHATSAPP_NUMBER}}` ("best for quick questions") · timezone statement
- **Dogfooding line (data হওয়ার পর):** `Median automated first reply on this site over the last 30 days: {{MEDIAN_REPLY_SECONDS}} seconds (from my n8n logs).` সংখ্যা না থাকলে লাইনটাই render হবে না।
- **Form microcopy:**
  - Field labels: `Your name` · `Work email` · `Firm name` · `Website` · `What kind of firm are you?` · `Team size` · `What's slipping through the cracks?` · `Rough budget` · `How did you hear about me?`
  - Consent: `I agree to be contacted about my inquiry. A human reads every message; an AI model helps sort it. See the privacy policy.`
  - Submit: `Send message` · Sending: `Sending…` · Success: `Thanks — check your inbox. A confirmation is on its way, and I'll reply personally within one business day.` · Error: `Something went wrong on my side. Please email hello@growrixos.com — I'll get it straight away.`
  - Validation: `Please enter your name.` · `Please use a valid email address.` · `Tell me a little about the problem (at least 20 characters).`
- **FAQ (5):**
  1. **How fast will I hear back?** — `An automated confirmation within a minute, and a personal reply within one business day (Dhaka time).`
  2. **Is the instant reply written by AI?** — `No. It's a template I wrote. AI only helps sort your message so it reaches me with the right priority.`
  3. **Can I just email you?** — `Yes: hello@growrixos.com.`
  4. **Do you take calls by phone or WhatsApp?** — `WhatsApp for quick questions. For project conversations, book a fit call so it's in both our calendars.`
  5. **What happens to my details?** — `They go to my CRM and are used only to reply to you. The privacy policy lists every tool involved.`
- **Meta title:** `Contact Growrix OS`
- **Meta description:** `Email, form or WhatsApp. Instant confirmation and a personal reply within one business day from the founder.`

### 4.15 /services (hub) আর /industries (hub)

**/services**
- **H1:** `Two systems, one goal: nothing falls through the cracks.`
- **Subhead:** `Every offer has a fixed scope, a published price range and a 30-day fix guarantee.`
- **Rows:** 2 systems (price + timeline + link) → Audit & Sprint → Care Plans → Agency Partner Program
- **Last line:** `SaaS and mobile builds: by referral only.`
- **FAQ (5):** "Which system should I start with?" (`If you lose leads, start with intake. If you lose hours to chasing documents, start with document intake. Not sure? Get a free teardown.`) · "Can I buy both?" (`Yes; they share the same CRM and alerts, so the second one costs less to add.`) · "Do you use Zapier or Make?" (`I build mainly on n8n, and work in Zapier, Make or GoHighLevel when that's what you already use.`) · "Why n8n?" (`It can run in your own account or server, handles complex logic, and keeps per-run costs low.`) · "Do you offer websites?" (`Only as an add-on bundled with a system.`)
- **Meta title:** `AI Automation Services for Professional Firms | Growrix OS`
- **Meta description:** `AI intake and document automation systems, audits, sprints, care plans and a white-label partner program. Fixed scope and published price ranges.`

**/industries**
- **H1:** `Built for firms where every inquiry and every document matters.`
- **2 card:** Law firms · Accounting firms (ক্রম `isPrimary` অনুযায়ী)
- **Line:** `Other professional service firm? The same systems work for many practices — book a fit call and I'll tell you honestly.`
- **Meta title:** `Industries: Law & Accounting Firm Automation | Growrix OS`
- **Meta description:** `AI intake and document automation designed for law firms and accounting, bookkeeping and tax practices in the US, UK, Canada and Australia.`
- (Hub-এ FAQ নেই; thin page এড়াতে প্রতিটা card-এ 3 লাইনের summary।)

### 4.16 /resources, /blog (Phase 2), legal, 404, /thanks

- **/resources H1:** `Free n8n templates and checklists for professional firms.` প্রতিটা resource একই সঙ্গে n8n template gallery, GitHub আর YouTube-এ publish হবে (§8.5)। Meta: `Free n8n Templates for Law & Accounting Firms | Growrix OS`।
- **/blog H1:** `Notes from building automation for professional firms.` কমপক্ষে 3টা post না হওয়া পর্যন্ত nav-এ নেই। প্রতিটা post-এ author byline → /about।
- **/legal/privacy:** কোন data নেওয়া হয়, কোথায় যায় (Vercel, HubSpot, n8n host, Anthropic, Cal.com, Google Analytics, Cloudflare Turnstile, Google Workspace), কতদিন রাখা হয়, কীভাবে মুছতে বলবেন। UK/EU visitor-এর জন্য lawful basis আর rights। Template ব্যবহার করলেও প্রতিটা tool নিজে মিলিয়ে নিন।
- **/legal/terms:** website use terms (project terms আলাদা contract-এ)।
- **404 (`app/not-found.tsx`):** H1 `That page doesn't exist.` · Body `It may have moved, or the link was mistyped. Here's where most people are headed:` · links: Home · Pricing · Law firms · Accounting firms · Book a call। Status 404, `noindex`।
- **/thanks:** H1 `Thanks — check your inbox.` · Body `A confirmation is on its way. While you wait, here's a 5-minute walkthrough of one of my builds.` + একটা Loom facade + `Book a free 20-min fit call`। `noindex`, sitemap-এ নেই।

---

## 5. Homepage: ASCII wireframe, পূর্ণ copy আর niche hero variant

### 5.1 Wireframe (desktop; mobile-এ সব column stack হবে)

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│ [Growrix OS]  Services▾ Industries▾ Work Pricing Partners About [Book a fit call]  │ ← sticky header
├────────────────────────────────────────────────────────────────────────────────────┤
│ S1 HERO                                                                            │
│  eyebrow: AI automation for law & accounting firms · Founder-led · Dhaka (UTC+6)   │
│  H1 (2 lines)                                            ┌───────────────────────┐ │
│  Subhead (2–3 lines)                                     │ Founder photo         │ │
│  [Book a free 20-min fit call] [Prefer async? Loom]      │ {{FOUNDER_FULL_NAME}} │ │
│  ✓ Fixed price  ✓ You own it  ✓ 30-day fix guarantee     │ Founder & builder     │ │
│                                                          │ Upwork·LinkedIn·GitHub│ │
│                                                          └───────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S2 PROBLEM STRIP — 3 stat cells (ledger row), each with a source link              │
│   48% …law firms     │   69% …accounting firms     │   ~7× …respond within an hour │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S3 TWO SYSTEMS — 2 large panels (order follows industry.isPrimary)                 │
│  ┌ AI Intake & Speed-to-Lead ─────────┐  ┌ Document Intake & Chase Autopilot ──────┐│
│  │ outcome · 4 bullets · from $2,500  │  │ outcome · 4 bullets · from $1,500       ││
│  │ [See how it works →]               │  │ [See how it works →]                    ││
│  └────────────────────────────────────┘  └─────────────────────────────────────────┘│
├────────────────────────────────────────────────────────────────────────────────────┤
│ S4 OVERNIGHT TIMELINE   label: "Illustrative example — not a client log"           │
│  9:40 PM ●── 9:41 PM ●── 9:43 PM ●── 11:15 PM ●── 6:45 AM ●                        │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S5 TRY IT — "This site runs the system I sell."  [Send a test inquiry]             │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S6 PROOF — 3 cards from /work, each with Loom thumbnail + honest badge             │
│  [Internal build] LedgerLine   [Demo build] Law intake   [Demo build] Agency       │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S7 HOW A PROJECT RUNS — 4 steps: Fit call → Audit & quote → Build → Handover       │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S8 PRICING SNAPSHOT — 4 columns: Audit · Sprint · Systems · Care   [Full pricing →]│
├────────────────────────────────────────────────────────────────────────────────────┤
│ S9 ONE ACCOUNTABLE BUILDER — photo + bio + timezone + security mini-list + verify  │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S10 AGENCIES BAND — one line + [Explore the partner program →]                     │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S11 FAQ — 8 questions (<details>, content in HTML)                                 │
├────────────────────────────────────────────────────────────────────────────────────┤
│ S12 FINAL CTA — H2 + 3-option ladder                                               │
├────────────────────────────────────────────────────────────────────────────────────┤
│ FOOTER (§3.3)                                                                      │
└────────────────────────────────────────────────────────────────────────────────────┘
Mobile: S1 founder card moves below CTAs (compact: photo 56px + name + verify links);
sticky bottom CTA bar appears after 40% scroll.
```

**Homepage-এ যা থাকবে না:** logo wall, testimonial carousel (verified testimonial না আসা পর্যন্ত), "trusted by" strip, vanity counter ("100+ automations"), blog block (≥3 post না হওয়া পর্যন্ত), dev-stack logo strip, auto-play কিছু।

### 5.2 পূর্ণ homepage copy (split test চলাকালীন default, দুই vertical সমান)

**Meta title:** `AI Automation for Law & Accounting Firms | Growrix OS`
**Meta description:** `I build AI intake and document automation for professional service firms on n8n and Claude. Instant lead replies, no document chasing. Fixed price, you own it.`
**OG title:** `Never miss an inquiry. Never chase a document.`
**OG description:** `Founder-led AI automation systems for law and accounting firms. Fixed price, 2–4 weeks, 30-day fix guarantee.`

**S1 — Hero**
- Eyebrow: `AI automation systems for professional service firms · Founder-led from Dhaka (UTC+6)`
- H1: `Never miss a client inquiry. Never chase a document again.`
- Subhead: `I build AI automation systems for law and accounting firms: instant replies to every new inquiry, qualified leads in your CRM, and document collection that chases itself. Built on n8n and Claude, in your accounts. Fixed scope, fixed price, live in 2–4 weeks.`
- Primary CTA: `Book a free 20-min fit call`
- Secondary CTA: `Prefer async? Get a free Loom teardown`
- Trust row: `Fixed price before we start` · `You own every workflow` · `30-day fix guarantee`
- Founder card: `{{FOUNDER_FULL_NAME}}` / `Founder & builder, Growrix OS` / `Dhaka, Bangladesh · UTC+6` / `Verify me: Upwork · LinkedIn · GitHub`

**S2 — Problem strip**
- H2: `The leak isn't your marketing. It's what happens after someone reaches out.`
- Cell 1: `48%` — `of law firms neither answered nor returned a prospective client's call in Clio's 2024 secret-shopper study.` · source [2Civility / Clio](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/)
- Cell 2: `69%` — `of accounting firms struggle to get client documents on time.` · source [Stealth Agents (Mango 2025)](https://stealthagents.com/research/accounting-client-document-collection-workload-statistics-2026)
- Cell 3: `~7×` — `more likely to qualify a lead when you respond within an hour, according to Harvard Business Review research.` · source [HBR](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)

**S3 — Two systems**
- H2: `Two systems, built for the way professional firms actually work.`
- Panel A: `AI Intake & Speed-to-Lead System`
  - Outcome: `Every inquiry gets a reply in under a minute, a qualification score and a booked consult — day or night.`
  - Bullets: `Web form, chat and missed-call text-back` · `AI qualification against your intake rules` · `Clio, MyCase, HubSpot or GoHighLevel` · `Staff alerts and automatic follow-up`
  - Price line: `From $2,500 setup · live in 2–4 weeks`
  - Link: `See how it works →`
- Panel B: `Document Intake & Chase Autopilot`
  - Outcome: `Clients get the right request list and polite reminders until everything arrives. Your team gets a live status board.`
  - Bullets: `Per-client request lists` · `Reminders that stop when items arrive` · `AI reads, names and files uploads` · `Drive, SharePoint, Karbon or TaxDome`
  - Price line: `From $1,500 setup · live in 2–3 weeks`
  - Link: `See how it works →`

**S4 — Overnight timeline**
- H2: `What happens while you sleep`
- Label (always visible): `Illustrative example of a system I build — not a client log.`
- `9:40 PM` — `A prospect fills in your "Free consultation" form after a car accident.`
- `9:41 PM` — `They get a personal text and email confirming you received it, with a link to book.`
- `9:43 PM` — `AI checks practice area, location and urgency, flags it "high priority", and creates the lead in Clio.`
- `11:15 PM` — `They book a 9:30 AM consult. Your intake specialist gets a summary in Slack.`
- `6:45 AM` — `Your morning brief: 3 new inquiries, 2 consults booked, 1 needs a callback, and 4 clients still missing documents — reminders already sent.`

**S5 — Try it**
- H2: `This site runs the system I sell.`
- Body: `Send a test inquiry through the contact form and time the reply. It runs on the same n8n + Claude stack I'd build for you: instant confirmation, AI sorting, CRM record and an alert on my phone.`
- CTA: `Send a test inquiry` → /contact
- Small print: `AI helps sort your message. A human — me — writes the personal reply.`
- Data line (30 দিনের data হওয়ার পর): `Median automated first reply, last 30 days: {{MEDIAN_REPLY_SECONDS}} seconds.`

**S6 — Proof**
- H2: `Proof you can watch, not logos you can't check.`
- Sub: `Every card is labelled honestly: internal build, demo build, or client project.`
- Card 1: `[Internal build]` `LedgerLine — document intake, version 3` / `What it does, what broke in v1 and v2, and what v3 fixed.`
- Card 2: `[Demo build]` `{{DEMO_LAW_INTAKE_TITLE}}` / `Form → AI qualification → CRM → booked consult, recorded end to end with test data.`
- Card 3: `[Demo build]` `{{DEMO_AGENCY_TITLE}}` / `How a partner agency would resell it.`
- Link: `See all work →`
- নিয়ম: প্রথম pilot client-এর case study publish হলে Card 1-এর জায়গায় সেটা আসবে, LedgerLine Card 2-তে নামবে।

**S7 — How a project runs**
- H2: `How a project runs`
- `1 · Fit call (20 min, free)` — `One workflow, an honest yes or no, and a price range.`
- `2 · Audit & fixed quote` — `A written plan with the top automations ranked by impact. $297–$497, credited to your build.`
- `3 · Build (2–4 weeks)` — `Weekly Loom updates. You approve every message template before anything goes live.`
- `4 · Handover & 30-day guarantee` — `Runbook, walkthrough, full ownership. Anything that breaks in the first 30 days, I fix free.`

**S8 — Pricing snapshot**
- H2: `Prices on the page, not behind a call.`
- `Automation Audit` · `$297–$497` · `Credited to your build`
- `Workflow Sprint` · `$400–$1,200` · `One workflow, about a week`
- `Systems` · `$1,500–$5,000` · `Intake or document automation`
- `Care Plans` · `From $300/month` · `Monitoring, fixes, improvements`
- Link: `See full pricing and payment terms →`

**S9 — One accountable builder**
- H2: `One person, accountable from first call to handover.`
- Body: `I'm {{FOUNDER_FIRST_NAME}}, founder of Growrix OS — a developer working in Node.js, TypeScript, Next.js, n8n and Claude, based in Dhaka, Bangladesh. You talk to the person who builds your system. No account managers, no handoffs to people you've never met.`
- Timezone statement (reusable)
- Mini-list: `Mutual NDA before kickoff` · `Built in your accounts, with least-privilege access` · `Minimum data sent to AI, with human approval steps` → `How I handle your data →`
- Verify row: `Same person, same name, same photo everywhere:` Upwork · LinkedIn · GitHub · YouTube

**S10 — Agencies band**
- Body: `Run a marketing, web or GoHighLevel agency? Add an AI automation offer under your brand — without hiring.`
- Link: `Explore the partner program →`

**S11 — FAQ**
- H2: `Questions firms ask before booking`
1. **What exactly do you build?** — `Automation systems that connect the tools you already use — your website, phone, email, CRM or practice-management software and document storage — so inquiries get answered and documents get collected without someone watching an inbox. I build on n8n and use Claude for the parts that need judgement, like qualifying an inquiry or reading a document.`
2. **Who is this for?** — `Small and mid-sized professional service firms: mainly law firms (personal injury, immigration, family) and accounting, bookkeeping and tax practices in the US, UK, Canada and Australia. Marketing agencies can resell it through the partner program.`
3. **How much does it cost?** — `Audits $297–$497, single-workflow sprints $400–$1,200, full systems $1,500–$5,000, and optional care plans from $300/month. You get a fixed quote before any work starts.`
4. **How long does it take?** — `A sprint takes about a week. A full system takes 2–4 weeks from kickoff to go-live.`
5. **Will AI talk to my clients without supervision?** — `Only with templates you've approved. Anything else waits for a human. The AI classifies, drafts and routes; your team decides.`
6. **Who owns the system?** — `You do. It runs in your accounts, with your credentials, and you get the documentation and a recorded walkthrough at handover.`
7. **You're in Bangladesh. How does that work day to day?** — `Calls fit US Eastern mornings, UK mornings and Australian afternoons, and the booking calendar shows times in your zone. Build work happens while you're offline, with a Loom update when you start your day. Payment is by USD bank transfer via Payoneer, or through Upwork.`
8. **What if it breaks?** — `For 30 days after go-live, I fix anything that doesn't work as scoped at no cost. After that, a care plan covers monitoring and fixes, or I quote fixes as needed.`

**S12 — Final CTA**
- H2: `See what you'd automate first.`
- Body: `Twenty minutes, one workflow, an honest answer. If automation isn't worth it for you yet, I'll say so.`
- Buttons: `Book a free 20-min fit call` · `Get a free Loom teardown` · text link `Or request a paid audit ($297–$497)`

### 5.3 Homepage schema

Root `@graph` (Organization + WebSite + Person, §8.3) + homepage-এ `ItemList` (দুই Service-এর `@id`)। FAQ markup optional।

### 5.4 Niche-winner hero variant (Jan 6–8, 2027-এর পর)

Winner ঠিক হলে Sanity-তে `industry.isPrimary = true` দিন। Homepage `homePage.heroVariant` field (`dual` / `law` / `accounting`) সেই অনুযায়ী বদলাবে। Code বদলাতে হবে না।

| Element | `dual` (default, split test চলাকালীন) | `law` জিতলে | `accounting` জিতলে (বা ফল অস্পষ্ট হলে default) |
|---|---|---|---|
| Eyebrow | `AI automation systems for professional service firms · Founder-led from Dhaka (UTC+6)` | `AI intake for personal injury, immigration and family law firms · Founder-led` | `AI document automation for accounting, bookkeeping and tax firms · Founder-led` |
| H1 | `Never miss a client inquiry. Never chase a document again.` | `Answer every new client inquiry in under a minute — even when you're in court.` | `Stop chasing client documents.` |
| Subhead | §5.2 | `AI intake and speed-to-lead systems for law firms. Instant replies, qualified leads in Clio or MyCase, consults booked automatically. Built on n8n and Claude, in your accounts. Fixed price, live in 2–4 weeks.` | `Automated document requests, reminders and AI filing for accounting and bookkeeping firms. Your clients reply to an email; your team sees who's done. Fixed price, live in 2–3 weeks.` |
| S2 stat order | Law · Accounting · HBR | Law 48% · $284/lead · HBR 7× | 69% · 65.2% · ~18 hrs |
| S3 panel order | Intake, Document | Intake (large), Document (small) | Document (large), Intake (small) |
| S4 timeline | PI inquiry scenario | PI inquiry scenario | Accounting scenario (নিচে) |
| S6 proof order | LedgerLine, law demo, agency demo | Law demo, missed-call demo, LedgerLine | LedgerLine, accounting demo, onboarding demo |
| Meta title | `AI Automation for Law & Accounting Firms \| Growrix OS` | `Law Firm Intake Automation & Speed-to-Lead \| Growrix OS` | `Document Collection Automation for Accountants \| Growrix OS` |
| Meta description | §5.2 | `Instant replies, AI-qualified leads and booked consults for law firms. Works with Clio and MyCase. Fixed price $2,500–$5,000, live in 2–4 weeks.` | `Automated document requests, reminders and AI filing for accounting firms. Fixed price $1,500–$3,500, live in 2–3 weeks. You own it.` |
| OG title | `Never miss an inquiry. Never chase a document.` | `Every inquiry answered in under a minute.` | `Busy season without the document chase.` |
| Nav Industries order | Accounting, Law | Law, Accounting | Accounting, Law |

**Accounting timeline scenario (S4, `accounting` variant):**
- `8:05 PM` — `A client uploads a W-2 and a 1099 by replying to your reminder email.`
- `8:06 PM` — `AI identifies both forms and the tax year, renames them and files them in the client's folder.`
- `8:06 PM` — `Their checklist updates: 5 of 7 items received. The next reminder now asks only for the two missing items.`
- `10:30 PM` — `Another client sends last year's bank statement by mistake. The system replies politely asking for this year's.`
- `8:00 AM` — `Your status board: 41 clients complete, 12 missing one item, 3 flagged for a call.`
- Label: `Illustrative example of a system I build — not a client log.`

---

## 6. Demo build আর case study template

### 6.1 চার ধরনের entry, একটাই layout

| Type | Badge (English, exact) | কখন | নিয়ম |
|---|---|---|---|
| Client case study | `Client project` | Pilot client লিখিত sign-off দেওয়ার পর | Client-এর নাম বা অনুমোদিত anonymised বর্ণনা, লিখিত consent (`consentOnFile = true`), metric client-এর data থেকে |
| Internal build | `Internal build` | LedgerLine | `Built for my own use, not for a client.` স্পষ্ট লেখা |
| Demo build | `Demo build` | 6টা demo automation | `Built with test data to show how it works. Not a client project.` Metric শুধু test run থেকে, আর সেটা বলা থাকবে |
| Illustrative | `Illustrative example` | Homepage timeline, diagram mockup | কোনো সংখ্যাকে result হিসেবে দেখানো যাবে না |

Ovidius-এর case study format সবচেয়ে কাজের: প্রতিটা case শুরু হয় before → after metric দিয়ে, যেমন "$700 → $12.11 per article" বা "20 days → 30 min" ([Ovidius](https://www.ovidius.ai/platforms/n8n))। CXL পরামর্শ দেয় আসল নাম, পদবি, ছবি আর সংখ্যা রাখতে ([CXL](https://cxl.com/blog/b2b-case-studies/))। Demo build-এর ক্ষেত্রে "after" metric আসবে শুধু test run থেকে।

### 6.2 Page structure (`/work/[slug]`)

```
Breadcrumb: Work › [Title]
[Badge]  [Industry tag]  [System tag]  Built with: n8n · Claude · [tools]

H1: [Outcome in plain words]
Subhead: [Who / what / how long — one sentence]
Honesty line (demo/internal only): "Built with test data to show how it works. Not a client project."

┌ METRIC BAR (3–4 tiles) ────────────────────────────────────────────────────┐
│ Client: before → after      Demo: "Test run: 50 sample inquiries → …"      │
│ Under each tile: measured over [period] · source [n8n logs / CRM export]    │
└────────────────────────────────────────────────────────────────────────────┘

▶ LOOM WALKTHROUGH (3–6 min) — click-to-load facade
  Transcript (edited, static HTML, collapsible <details> but in the DOM)

H2 The problem this solves       (3–5 sentences; for client: the firm, the leak, what it cost)
H2 What I built                  (diagram + numbered workflow steps in text)
H2 Guardrails                    (human approvals, what the AI is NOT allowed to do)
H2 Results / Test run            (metric table + how each was measured + caveats)
H2 What broke and what I changed (honest; strongest first-hand signal)
H2 Client's words                (client projects only: verified testimonial with name, role, photo)
H2 Tech details                  (nodes/tools, run volume, monthly running cost estimate)
H2 Timeline & price band         ("Built in 2.5 weeks · fits the $2,500–$5,000 band")

CTA: "Want this for your firm?" [Book a free 20-min fit call] [See the service →]
Related: matching /services page + matching /industries page
```

**Schema:** `Article` (author → Person `@id`) + `VideoObject` (Loom/YouTube থাকলে) + `BreadcrumbList`। Testimonial-এ `Review` markup নয়।

### 6.3 Metric-এর নিয়ম

- **প্রতিটা metric-এর পাশে:** কী মাপা হয়েছে, কতদিন ধরে, data কোথা থেকে।
- **ভালো metric:** median first-response time · % inquiries replied < 5 min · consults booked/month · documents complete by deadline (%) · reminder emails sent by staff (before) বনাম system (after) · manual review rate · monthly running cost।
- **Demo-তে "results" নয়, "test run":** যেমন `Processed 50 sample documents: 46 classified correctly, 4 routed to human review.`
- **Estimate হলে "approx."।** কোনো সংখ্যা round-up নয়। Self-reported হলে বলা থাকবে।
- **Sanity validation:** `badge = demo` হলে `testRunDescription` required; `badge = client` হলে `consentOnFile = true` না হলে publish fail (§9.3)।

### 6.4 Loom embed (performance + AI-crawler friendly)

- **Facade:** `next/image` thumbnail + play button। Click করলে তবেই `<iframe src="https://www.loom.com/embed/{id}">` load হবে। LCP আর JS budget রক্ষা পায়।
- **Transcript:** Loom transcript সামান্য edit করে video-র নিচে static HTML-এ। AI crawler JavaScript render করে না ([Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler)), video-ও দেখে না, তাই transcript-টাই তাদের কাছে content।
- **Schema:** `VideoObject` (name, description, thumbnailUrl, uploadDate, duration, embedUrl)।
- **YouTube:** একই walkthrough YouTube-এ, title-এ "Growrix OS"। AI visibility-র সঙ্গে সবচেয়ে শক্ত correlation YouTube mention-এর (~0.737) ([Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations/))।

### 6.5 Demo slot map (6টা demo + LedgerLine)

Upwork-এ publish করা 6টা demo automation নিচের slot-এ বসান। Title হুবহু Upwork-এর মতো রাখুন (entity consistency)। কোনো slot-এ মানানসই demo না থাকলে slot খালি রাখুন, নতুন কিছু দাবি করবেন না।

| Slot | Suggested focus | Badge | কোন page-এ দেখাবে | MVP (Week 3)? |
|---|---|---|---|---|
| L | LedgerLine — document intake v3 | Internal build | Home S6, document service, accounting page | **হ্যাঁ** |
| D1 | Law intake: form → AI qualification → CRM → booked consult (`{{DEMO_LAW_INTAKE_TITLE}}`) | Demo build | Home S6, intake service, law page | **হ্যাঁ** |
| D2 | Agency white-label: GHL + n8n lead flow (`{{DEMO_AGENCY_TITLE}}`) | Demo build | Home S6, /partners | **হ্যাঁ** |
| D3 | Missed-call text-back → booking | Demo build | Law page, intake service | Week 4–5 |
| D4 | Document request + reminder sequence | Demo build | Accounting page, document service | Week 4–5 |
| D5 | Client onboarding (engagement letter + ID + docs) | Demo build | Accounting page | Week 5–6 |
| D6 | AI lead qualification + CRM sync (generic) | Demo build | /services, /work | Week 5–6 |

### 6.6 LedgerLine entry: প্রথম draft (paste-ready skeleton)

- **Slug:** `ledgerline-document-intake`
- **Badge:** `Internal build`
- **H1:** `LedgerLine: an AI document-intake system, rebuilt three times until it held up`
- **Subhead:** `A document-intake automation I built for my own use on n8n and Claude. It requests, reads, names and files client documents — this is version 3.`
- **Honesty line:** `Built for my own use, not for a client. Numbers below come from test runs on sample documents.`
- **Metric bar (Week 2-এ নিজের test data দিয়ে মাপুন; না মাপা পর্যন্ত tile দেখাবে না):** `Sample documents processed` · `Classified correctly on first pass` · `Routed to human review` · `Average time per document`
- **H2 The problem this solves:** `Firms collect the same documents from the same clients every year, and most of the work is reminders, renaming and filing. LedgerLine automates that loop and leaves the judgement calls to a person.`
- **H2 What I built:** 5-step list (Request → Remind → Read → File → Report) + n8n canvas screenshot।
- **H2 Guardrails:** `Low-confidence classifications go to a review queue. Nothing is deleted. Every action is logged.`
- **H2 What broke and what I changed:** `Version 1: {{V1_PROBLEM}} → Version 2: {{V2_CHANGE}} → Version 3: {{V3_CHANGE}}` (আসল সমস্যাগুলো লিখুন। এটা Google যে "non-commodity, first-hand" content চায় ঠিক তাই ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)))
- **H2 Tech details:** nodes, AI model tier, storage, estimated monthly running cost।
- **CTA:** `Want this for your firm?` · `See the Document Intake & Chase Autopilot →`

### 6.7 Demo build card (listing-এ ব্যবহার)

```
[Demo build]  [Law]
{{DEMO_TITLE}}
One line: what it does, for whom.
Built with: n8n · Claude · Clio (test account)
▶ 4-min walkthrough
Watch the walkthrough →
```

---

## 7. SEO plan

### 7.1 বাস্তব প্রত্যাশা

- **প্রথম 0–3 মাস:** indexing, branded query ("Growrix OS", founder-এর নাম) আর long-tail impression। Lead আসবে off-site channel থেকে।
- **3–9 মাস:** নির্দিষ্ট use-case page rank করতে শুরু করতে পারে। যেসব নতুন page top 10-এ ওঠে, তাদের 40.8% এক মাসের মধ্যেই ওঠে ([Ahrefs](https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/))।
- **9–18 মাস:** নিয়মিত organic inquiry আশা করা যায়, যদি publishing আর off-site mention চলতে থাকে।
- **Head term "ai automation agency" এড়িয়ে চলুন।** এর সবচেয়ে বড় related query "what is ai automation agency"; মানে বেশিরভাগ searcher agency *শুরু* করতে চান, hire করতে নয় ([Google Trends via Firecrawl](https://trends.firecrawl.dev/explore?q=ai+automation+agency&date=today+12-m))।
- **Informational blog মূলত AI Overview-এর ভেতরেই পড়া হবে।** AI summary থাকলে মানুষ traditional result-এ click করেন 8% visit-এ, না থাকলে 15%-এ ([Pew](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/))। Transactional SERP-এ AIO 5% কমেছে, commercial SERP-এ 71% বেড়েছে ([Semrush](https://www.semrush.com/blog/ai-overviews-commercial-search-study/))। তাই অগ্রাধিকার: pricing, service, industry আর case study page।

### 7.2 Keyword map

> **সব volume UNVERIFIED।** Research-এ নির্ভরযোগ্য volume বা KD data পাওয়া যায়নি। "ai automation agency"-র ~2,900/mo একটা unsourced estimate ([IdeaProof](https://ideaproof.io/guides/ai-automation-agency))। "n8n expert"-এর জন্য Trends কোনো related query-ই দেয়নি, অর্থাৎ absolute volume ছোট। Launch-এর আগে Google Keyword Planner আর Ahrefs free keyword generator দিয়ে যাচাই করুন। Launch-এর 6 সপ্তাহ পর GSC-এর আসল impression দেখে map আবার সাজান।

| Keyword cluster (primary → secondary) | Intent | Target URL | Volume | Priority |
|---|---|---|---|---|
| law firm intake automation · legal intake automation · AI intake for law firms | Commercial | /industries/law-firms | unverified (সম্ভবত কম, মূল্য বেশি) | P1 |
| speed to lead automation · lead response automation · instant lead response | Commercial | /services/ai-intake-speed-to-lead | unverified | P1 |
| Clio intake automation · Clio n8n · Clio Grow automation | Commercial / integration | /services/ai-intake-speed-to-lead + resource template | unverified | P1 |
| missed call text back law firm · missed call text back automation | Commercial | /industries/law-firms (section) + blog | unverified | P2 |
| client document collection automation · automate document requests accountants | Commercial | /services/document-intake-autopilot | unverified | P1 |
| tax document collection automation · busy season document chase | Commercial (seasonal, Dec–Mar) | /industries/accounting-firms | unverified | P1 |
| Karbon automation · TaxDome automation · Financial Cents automation | Integration | resource template (শুধু আসল build থাকলে) | unverified | P2 |
| bookkeeping client onboarding automation | Commercial | /industries/accounting-firms | unverified | P2 |
| white label AI automation · white label n8n · GoHighLevel automation partner | Commercial (B2B partner) | /partners | unverified | P1 |
| AI automation pricing · how much does workflow automation cost · n8n developer cost | Commercial investigation | /pricing + blog | unverified | P1 |
| automation audit · workflow automation audit | Commercial | /audit | unverified | P2 |
| n8n maintenance · automation maintenance retainer | Commercial | /care-plans | unverified | P3 |
| n8n vs zapier vs make for accounting firms | Comparison | blog | unverified | P2 |
| hire n8n developer · n8n expert · n8n agency | Transactional (n8n directory আর Fiverr-এর দখলে) | /services (secondary mention) | unverified (ছোট) | P3 |
| Growrix OS · {{FOUNDER_FULL_NAME}} | Navigational | / , /about | — | P1 (entity) |

### 7.3 On-page নিয়ম

1. **একটা H1 প্রতি page-এ।** Primary keyword H1 বা subhead-এ, স্বাভাবিক ভাষায়।
2. **Title ≤ 60 chars**, format `[Outcome/Keyword] | Growrix OS`। **Description ≤ 155 chars**, ভেতরে একটা price বা timeline।
3. **URL** ছোট, lowercase, hyphen; কখনো বদলাবে না (§3.4)।
4. **Answer-first summary** hero-র নিচে, 40–60 শব্দ।
5. **সব core content initial HTML-এ।** Accordion চলবে, কিন্তু content DOM-এ থাকতে হবে (§8.1)।
6. **প্রতিটা stat-এর পাশে source link।** E-E-A-T-এর জন্য ভালো; GEO paper-এ statistics ও citation যোগ করলে simulated engine-এ visibility বেড়েছে, যদিও live engine-এ ফল মিশ্র ([arXiv 2311.09735](https://arxiv.org/pdf/2311.09735))।
7. **Image:** `next/image`, অর্থপূর্ণ `alt`। Diagram-এর ধাপগুলো পাশে text-এ।
8. **Author:** blog আর resource-এ byline → /about, Person schema সহ।
9. **Freshness:** service, industry আর pricing page-এ "Last updated"।
10. **noindex:** /thanks, filtered /work view (`?filter=`), tag page, pagination ≥ 2, `isIndexable = false` resource।
11. **Heading-এ keyword stuffing নয়।** প্রতিটা H2 একটা প্রশ্নের উত্তর দেবে।

### 7.4 Internal linking (hub-and-spoke)

```
                    ┌──────────────── / (home) ────────────────┐
                    ▼                                          ▼
     /services/ai-intake-speed-to-lead  ◄────►  /services/document-intake-autopilot
          ▲          ▲          ▲                    ▲            ▲            ▲
          │          │          │                    │            │            │
 /industries/law-firms  /work/[law demos]   /work/ledgerline   /work/[acct demos]  /industries/accounting-firms
          ▲                     ▲                    ▲                              ▲
          └────── blog posts & /resources templates (each links UP to 1 service + 1 industry) ─────┘

 Every page → /pricing and /book.   /partners ↔ both services.   Every service & industry page → /security.
 /audit ← every service, industry and pricing page.   /about ← founder strip on every page.
```

- প্রতিটা case study তার matching service আর industry page-এ link করবে; সেগুলোও case study-তে ফিরে link করবে।
- প্রতিটা blog post অন্তত একটা service আর একটা industry page-এ link করবে।
- Anchor text descriptive: `document collection automation for accountants`, "click here" নয়।
- সব inner page-এ breadcrumb + BreadcrumbList।

### 7.5 নিরাপদ, সীমিত programmatic page

Google স্পষ্ট বলে: fan-out variant ধরার জন্য বা AI দিয়ে "without adding value" অনেক page বানানো **scaled content abuse** ([Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies), [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))। তাই:

- **একমাত্র template:** `/resources/[slug]`, প্রতিটা একটা **আসল, চালু n8n workflow**।
- **প্রতিটা page-এ বাধ্যতামূলক:** downloadable workflow JSON · screenshot · node list · setup steps · Loom বা YouTube walkthrough · পরিচিত সীমাবদ্ধতা · সংশ্লিষ্ট service-এ link।
- **সংখ্যা:** প্রথম 6 মাসে সর্বোচ্চ 12টা, প্রতিটা নিজে review করা।
- **Indexing gate:** Sanity-তে `isIndexable` boolean, checklist পূর্ণ হলে তবেই true। False হলে `noindex` আর sitemap থেকে বাদ।
- **প্রথম slug-গুলো:** `clio-website-form-to-lead` · `missed-call-text-back-twilio-n8n` · `client-document-reminders-google-drive` · `karbon-document-request-reminders` · `ghl-to-n8n-ai-lead-qualification`।
- **কখনো নয়:** "AI receptionist for [200 cities]", "[tool] + [tool]" matrix, AI-generated industry clone page।

### 7.6 Content calendar: প্রথম 3 মাস (12 titles)

সপ্তাহে একটা post, launch-এর পরের সপ্তাহ থেকে। প্রতিটার সঙ্গে একটা LinkedIn carousel আর (build থাকলে) একটা YouTube video। Split test চলাকালীন law আর accounting সমান ভাগ; Jan 6–8-এর সিদ্ধান্তের পর বাকিগুলো winner-এর দিকে।

| # | সপ্তাহ শুরু | Title (English) | Intent | Vertical | Links to |
|---|---|---|---|---|---|
| 1 | Nov 23, 2026 | How Much Does Law Firm Intake Automation Cost? Real Price Ranges | Commercial / pricing | Law | /pricing, intake service |
| 2 | Nov 30 | Client Document Collection for Accountants: Portal Software vs. Custom Automation | Commercial investigation | Accounting | document service |
| 3 | Dec 7 | White-Label AI Automation for Agencies: What to Charge, What to Outsource, How to Sell It | Commercial (partner) | Agency | /partners |
| 4 | Dec 14 | Clio + n8n: Turn Website Inquiries into Leads and Booked Consults (Free Template) | Integration / template | Law | resource, intake service |
| 5 | Dec 21 | Busy-Season Prep: Automate Tax Document Requests Before January (Free Checklist) | Commercial, seasonal | Accounting | accounting page, /audit |
| 6 | Dec 28 | LedgerLine Build Log: What Broke in v1 and v2 of an AI Document-Intake System | First-hand proof | Accounting | /work/ledgerline-document-intake |
| 7 | Jan 4, 2027 | Speed-to-Lead for Law Firms: What the Research Says, and a 60-Second Reply System | Problem-aware | Law | law page |
| 8 | Jan 11 | Is It Safe to Use AI on Client Tax Documents? A Practical Guide for Small Firms | Objection handling | Accounting | /security |
| 9 | Jan 18 | Missed-Call Text-Back for Law Firms: What It Should (and Shouldn't) Say | Commercial | Law → winner অনুযায়ী বদলাতে পারে | law page |
| 10 | Jan 25 | n8n vs Zapier vs Make for Accounting and Law Firms: An Honest Comparison | Comparison | Both | /services, /pricing |
| 11 | Feb 1 | Hiring an Offshore Automation Developer: 12 Questions to Ask (and My Answers) | Trust / legitimacy | Both | /about, /security |
| 12 | Feb 8 | Case Study: [First founding client] — [before → after metric] | Proof | Winner | /work/[slug] |

**নিয়ম:** Post 12 শুধু তখনই, যখন আসল client data আর লিখিত consent আছে। না থাকলে তার জায়গায় আরেকটা demo-build walkthrough। Holiday সপ্তাহে (Dec 21, Dec 28) post আগে লিখে schedule করুন।

---

## 8. AEO / GEO plan

**মূল নীতি:** Google-এর official অবস্থান হলো AI feature-এর জন্য কোনো বিশেষ AEO/GEO কৌশল লাগে না। লাগে indexable, crawlable page আর "non-commodity", first-hand content ([Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))। AI visibility-র সবচেয়ে শক্ত correlate **off-site**: YouTube mention (~0.737), তারপর branded web mention; backlink-এর correlation অনেক দুর্বল ([Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations/))। তাই নিচের effort-এর বড় অংশ site-এর বাইরে।

### 8.1 SSR/SSG বাধ্যতামূলক

GPTBot, ClaudeBot আর PerplexityBot JavaScript render করে না ([Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler))। তাই:
- সব marketing page **Server Component + static generation**। Sanity content build-এ fetch, publish হলে on-demand revalidate (§9.2)।
- Price, FAQ, workflow step, metric আর transcript **initial HTML-এ**। Accordion = `<details>/<summary>`।
- Client-only শুধু: Cal.com embed, form, Loom iframe, calculator interaction, analytics।
- **Test (CI-তে চালান):** `curl -s -A "GPTBot" https://www.growrixos.com/pricing | grep -q '\$297'` — HTML-এ price না পেলে fail।
- AI crawler-এর 404 rate 34%-এর বেশি পাওয়া গেছে ([Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler))। Sitemap পরিষ্কার আর internal link নির্ভুল রাখুন।

### 8.2 robots.txt (exact)

`app/robots.ts` থেকে generate করুন, অথবা `public/robots.txt`। দুটো একসঙ্গে নয়।

```txt
# robots.txt — https://www.growrixos.com
# Policy: we want to be found and cited. Search/retrieval AND training bots are allowed.
# Utility paths are blocked for everyone.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /thanks

# AI search, user-triggered fetchers and training crawlers — explicitly allowed.
# Disallows are repeated because a bot that matches a named group ignores the * group.
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
Allow: /
Disallow: /api/
Disallow: /thanks

Sitemap: https://www.growrixos.com/sitemap.xml
```

**ব্যাখ্যা:**
- **Search আর retrieval bot** (OAI-SearchBot, Claude-SearchBot, Claude-User) block করলে ChatGPT আর Claude search-এ site দেখাবে না ([OpenAI](https://developers.openai.com/api/docs/bots), [Anthropic](https://support.claude.com/en/articles/8896518))।
- **Training bot** (GPTBot, ClaudeBot, Google-Extended) allow করা একটা business সিদ্ধান্ত। নতুন brand পরিচিত হতে চায়, তাই allow। এর সরাসরি citation-লাভ প্রমাণিত নয়।
- **Google-Extended** AI Overviews বা AI Mode নিয়ন্ত্রণ করে না; সেগুলো চলে Googlebot আর snippet control দিয়ে ([Google](https://developers.google.com/search/docs/appearance/ai-features))।
- **Vercel Firewall:** bot protection বা "AI bots" managed rule চালু থাকলে এই bot block হতে পারে। Dashboard-এ নিশ্চিত করুন।
- **Disallow ≠ noindex:** /thanks-এ `noindex` meta-ও দিন।
- PerplexityBot-এর official doc এই research-এ যাচাই হয়নি; Perplexity-র docs দেখে নিন।

### 8.3 Schema set (JSON-LD), সংক্ষিপ্ত আর সঠিক

Structured data AI feature-এর জন্য বাধ্যতামূলক নয়, তবে visible content-এর সঙ্গে মিলতে হবে ([Google AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))। সব JSON-LD একই CMS data থেকে generate হবে, যাতে page আর schema কখনো আলাদা না হয়।

| Page | Types |
|---|---|
| Root layout (সব page) | `Organization` + `WebSite` + `Person` (`@graph`, `@id` দিয়ে) |
| / | + `ItemList` (দুই Service) |
| /about | `AboutPage` + `Person` |
| Service, /audit, /care-plans, /partners | `Service` + `Offer` (`PriceSpecification` min/max) + `BreadcrumbList` |
| /pricing | Service `@id` reference সহ `Offer` list + `BreadcrumbList` |
| Industry page | `Service` (`audience`, `areaServed`) + `BreadcrumbList` |
| /work/[slug], /blog/[slug] | `Article` / `BlogPosting` (author → Person `@id`) + `VideoObject` (থাকলে) + `BreadcrumbList` |
| /work | `CollectionPage` + `ItemList` |
| FAQ block | `FAQPage` **optional**। 7 May 2026 থেকে FAQ rich result বন্ধ ([Passionfruit](https://www.getpassionfruit.com/blog/what-changed-with-google-drops-faq-rich-results-and-what-to-do-now), [iNet Ventures](https://inetventures.com/blog/why-google-dropped-faq-rich-results))। Markup valid, ক্ষতি নেই, লাভও সামান্য |
| Testimonial | `Review` / `AggregateRating` **নয়**। নিজের Organization-এর self-serving review star পায় না |

**Root `@graph`:**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.growrixos.com/#org",
      "name": "Growrix OS",
      "url": "https://www.growrixos.com/",
      "logo": "https://www.growrixos.com/logo-512.png",
      "description": "AI automation systems for professional service firms, built on n8n and Claude.",
      "email": "hello@growrixos.com",
      "founder": { "@id": "https://www.growrixos.com/about#founder" },
      "areaServed": ["US", "GB", "CA", "AU"],
      "knowsAbout": ["Workflow automation", "n8n", "AI intake systems", "Document automation",
                     "Law firm intake", "Accounting firm document collection"],
      "sameAs": [
        "{{LINKEDIN_COMPANY_URL}}",
        "{{YOUTUBE_URL}}",
        "{{GITHUB_URL}}"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.growrixos.com/about#founder",
      "name": "{{FOUNDER_FULL_NAME}}",
      "jobTitle": "Founder & Automation Engineer",
      "worksFor": { "@id": "https://www.growrixos.com/#org" },
      "image": "https://www.growrixos.com/founder.jpg",
      "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD" },
      "knowsAbout": ["n8n", "Claude", "TypeScript", "Node.js", "Next.js", "AI agents"],
      "sameAs": [
        "{{LINKEDIN_URL}}",
        "{{UPWORK_PROFILE_URL}}",
        "{{GITHUB_URL}}",
        "{{YOUTUBE_URL}}"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.growrixos.com/#website",
      "url": "https://www.growrixos.com/",
      "name": "Growrix OS",
      "publisher": { "@id": "https://www.growrixos.com/#org" }
    }
  ]
}
```

**Service page উদাহরণ:**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.growrixos.com/services/document-intake-autopilot#service",
  "name": "Document Intake & Chase Autopilot",
  "serviceType": "Client document collection automation",
  "provider": { "@id": "https://www.growrixos.com/#org" },
  "audience": { "@type": "BusinessAudience", "audienceType": "Accounting, bookkeeping and tax firms" },
  "areaServed": ["US", "GB", "CA", "AU"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "PriceSpecification", "minPrice": 1500, "maxPrice": 3500, "priceCurrency": "USD"
    },
    "description": "One-time setup, fixed quote before work starts. Optional care plan $300–$750/month."
  }
}
```

### 8.4 Entity consistency (সব জায়গায় একই তথ্য)

AI system brand চেনে বিভিন্ন জায়গার mention মিলিয়ে। প্রতিটা profile-এ নিচের "entity card" হুবহু ব্যবহার করুন।

| Field | Canonical value (English, exact) |
|---|---|
| Brand | Growrix OS |
| One-liner | AI automation systems for professional service firms, built on n8n and Claude. |
| Founder | {{FOUNDER_FULL_NAME}}, Founder & Automation Engineer |
| Location | Dhaka, Bangladesh (UTC+6) · serving US, UK, Canada, Australia |
| Website | https://www.growrixos.com |
| Email | hello@growrixos.com |
| Headshot | একই ছবি সব personal profile-এ |
| Services wording | AI Intake & Speed-to-Lead System · Document Intake & Chase Autopilot · Automation Audit · Care Plans · Agency Partner Program |

| Platform | কী ঠিক করবেন |
|---|---|
| LinkedIn (personal) | Headline: `AI automation for law & accounting firms · n8n + Claude · Founder, Growrix OS`। Website field = growrixos.com। Featured-এ /work entry আর Loom |
| LinkedIn (company page) | "Growrix OS" নামে page, একই one-liner, website, monogram logo |
| Upwork | Profile name = verified নাম = site-এর নাম। Title-এ client-এর ভাষা ("n8n automation", "AI agent", "Claude")। Upwork-এর AI recruiter Uma এখন client-দের জন্য auto-shortlist করে ([Upwork IR](https://investors.upwork.com/news-releases/news-release-details/upwork-updates-spring-2026-ai-powered-innovations-help-small))। Portfolio item-এর title = /work-এর demo title। Profile-এ external link বা contact নয় |
| GitHub | Profile README-তে one-liner + site link। Public repo-তে n8n template JSON |
| YouTube | Channel name `{{FOUNDER_FULL_NAME}} · Growrix OS`। প্রতিটা description-এর প্রথম লাইনে brand আর site link |
| n8n community / Creator profile | একই নাম আর ছবি, profile-এ site link |
| Clutch, GoodFirms, DesignRush | Free listing, একই one-liner, category "AI automation" / "workflow automation" |
| Google Business Profile | Service-area business হিসেবে eligibility যাচাই করুন; eligible না হলে বাদ |
| Email signature | `{{FOUNDER_FULL_NAME}} · Founder, Growrix OS · growrixos.com · Dhaka (UTC+6)` |

**মাসিক audit:** Google-এ "Growrix OS" আর founder-এর নাম লিখে দেখুন সব profile একই তথ্য দেখায় কিনা।

### 8.5 Off-site mention plan ($0 budget, প্রথম 90 দিন)

| সপ্তাহ | কাজ | কেন |
|---|---|---|
| 1 | Custom-domain email, GSC, Bing Webmaster Tools, LinkedIn company page | Zapier Solution Partner-এর পূর্বশর্ত ([Zapier](https://zapier.com/l/solution-partner)) |
| 3–8 | n8n template gallery-তে 3টা free workflow (Clio intake, document reminders, missed-call text-back) | Verified creator হতে 3টা accepted template লাগে ([n8n community](https://community.n8n.io/t/where-can-i-sell-my-n8n-workflow-i-am-looking-for-marketplaces-not-the-creator-hub/212963)); high-authority mention |
| 3–12 | প্রতিটা template আর /work entry-র YouTube walkthrough (5–10 মিনিট) | সবচেয়ে শক্ত AI-visibility correlate ([Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations/)) |
| 1–12 | LinkedIn: সপ্তাহে 3টা post, অন্তত 1টা carousel | Carousel-এ engagement সবচেয়ে বেশি, 7.00% ([Socialinsider](https://www.socialinsider.io/blog/linkedin-content-study/)); AI Mode-এ LinkedIn সবচেয়ে বেশি cite হওয়া domain-এর একটা ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)) |
| 3–12 | r/n8n, r/automation, n8n forum-এ সপ্তাহে 3–5টা সত্যিকারের সাহায্যমূলক উত্তর, link spam ছাড়া | ChatGPT ও Perplexity-র top source, তবে volatile ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)) |
| 4 | Zapier Solution Partner আবেদন; Make certification শুরু | Partner directory listing ([Make](https://make.com/en/partners-directory)) |
| 4–8 | Clutch আর GoodFirms free listing; প্রথম client-দের কাছে verified review চাওয়া | Recommendation prompt-এ "best X" list ChatGPT-এর cited source-এর 43.8% ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)) |
| 8–12 | "Best n8n agencies / automation consultants" list-এর author-দের কাছে সৎ pitch (demo link সহ) | List-এ উপরে থাকা আর recommendation-এর মধ্যে correlation আছে |
| ongoing | n8n Expert Partner-এর দিকে এগোনো (invitation-only, ≥3 active n8n customer) | [n8n](https://n8n.io/expert-partners/) |

**যা করবেন না:** কেনা mention, fake review, নিজের বানানো "best of" list-এ নিজেকে #1। Google "inauthentic mentions" স্পষ্টভাবে নিরুৎসাহিত করে ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))।

**মাপবেন কীভাবে:** মাসে একবার ChatGPT, Perplexity, Claude আর Gemini-তে একই 5টা prompt (যেমন `best automation consultant for accounting firm document collection`, `who can automate law firm intake with Clio`)। ফল একটা sheet-এ। সঙ্গে GSC-এর Generative AI performance report ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))।

### 8.6 llms.txt (optional, কম মূল্য)

Google llms.txt ব্যবহার করে না ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))। একটা log study-তে 97% llms.txt file-এ কোনো AI request-ই আসেনি ([PPC Land](https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/))। ~10 মিনিটের কাজ, তাই Week 4–8-এ চাইলে দিন (`app/llms.txt/route.ts` বা `public/llms.txt`, CMS price থেকে generate করলে ভালো):

```md
# Growrix OS
> AI automation systems for professional service firms (law and accounting), built on n8n and Claude by {{FOUNDER_FULL_NAME}}, Dhaka, Bangladesh (UTC+6). Serving the US, UK, Canada and Australia.

## Services
- [AI Intake & Speed-to-Lead System](https://www.growrixos.com/services/ai-intake-speed-to-lead): $2,500–$5,000 setup, 2–4 weeks
- [Document Intake & Chase Autopilot](https://www.growrixos.com/services/document-intake-autopilot): $1,500–$3,500 setup, 2–3 weeks
- [Automation Audit & Workflow Sprint](https://www.growrixos.com/audit): $297–$497 (credited) / $400–$1,200
- [Care Plans](https://www.growrixos.com/care-plans): from $300/month
- [Agency Partner Program](https://www.growrixos.com/partners): white-label, builds from $500

## Key pages
- [Pricing](https://www.growrixos.com/pricing)
- [Security & data handling](https://www.growrixos.com/security)
- [About the founder](https://www.growrixos.com/about)
- [Work: build logs and demo builds](https://www.growrixos.com/work)
```

### 8.7 GA4: AI referral tracking

**Admin → Data display → Channel groups → Create new channel group** ("Default + AI")। Default rule copy করুন, নতুন channel **"AI Assistants"** যোগ করে **Referral-এর উপরে** রাখুন। Condition: *Session source* matches regex:

```regex
^(.*\.)?(chatgpt\.com|chat\.openai\.com|openai\.com|perplexity\.ai|claude\.ai|anthropic\.com|gemini\.google\.com|bard\.google\.com|copilot\.microsoft\.com|copilot\.cloud\.microsoft|edgeservices\.bing\.com|meta\.ai|grok\.com|x\.ai|chat\.deepseek\.com|deepseek\.com|chat\.mistral\.ai|mistral\.ai|you\.com|phind\.com|poe\.com|kagi\.com)$
```

- ChatGPT অনেক সময় link-এ `utm_source=chatgpt.com` যোগ করে; তখনও source `chatgpt.com`, regex ধরবে।
- Exploration: "Session source / medium" × key event — AI Assistants থেকে কতজন এসেছেন, কতজন book করেছেন।
- Google AI Overviews / AI Mode-এর click আলাদা করা যায় না, `google / organic`-এ থাকে। এর জন্য GSC-এর Generative AI report।
- Cal.com booking form-এর "Where did you hear about me?"-তে `AI assistant (ChatGPT, Claude, etc.)` option রাখুন, যাতে self-reported data-ও পান।

---

## 9. Technical architecture

### 9.1 Stack আর hosting

| Layer | পছন্দ | নোট |
|---|---|---|
| Framework | Next.js (App Router, latest stable) + TypeScript (strict) + Tailwind CSS | Mohammad-এর standard stack। Content data থেকে, component শুধু presentational shell |
| CMS | Sanity (hosted Studio `growrixos.sanity.studio`, অথবা আলাদা route) | Free plan দিয়ে শুরু; limit sanity.io/pricing-এ যাচাই করুন |
| Hosting | **Vercel Pro** | Hobby "non-commercial personal use only"; service বিক্রির site commercial usage ([Vercel Fair Use](https://vercel.com/docs/limits/fair-use-guidelines)) |
| Booking | Cal.com (free) inline embed | Real-time booking, visitor-এর timezone auto |
| Automation | n8n (self-hosted VPS বা n8n Cloud) | Lead flow নিজের product-এর dogfood |
| AI | Claude via Anthropic API | Qualification আর summary only; visitor-facing text নয় |
| CRM | HubSpot Free CRM | Contacts, deals, pipeline |
| Email | Google Workspace (hello@growrixos.com) | Instant reply এখান থেকে; fallback alert Resend free tier |
| Alerts | Telegram bot | Mohammad-এর phone-এ |
| Spam | Cloudflare Turnstile (free) + honeypot + rate limit | |
| Analytics | GA4 (Consent Mode v2) · GSC · Bing Webmaster · Vercel Speed Insights · (optional) PostHog free | |
| Video | Loom (walkthrough), YouTube (একই video, discoverability) | Click-to-load facade |

### 9.2 Rendering per page

| Route | Rendering | Data | Revalidation |
|---|---|---|---|
| `/` | Static (SSG) | `homePage`, `service[]`, `workEntry[]` (featured), `industry[]`, `siteSettings` | Sanity webhook → `/api/revalidate` → tag `home` |
| `/services`, `/services/[slug]` | SSG + `generateStaticParams` | `service` | tag `service:{slug}` |
| `/audit`, `/care-plans`, `/partners`, `/pricing`, `/security`, `/about`, `/industries` | SSG | `page` / `service` / `offer` / `siteSettings` | tag per document |
| `/industries/[slug]` | SSG + `generateStaticParams` | `industry` + referenced service ও work | tag `industry:{slug}` |
| `/work`, `/work/[slug]` | SSG + `generateStaticParams` | `workEntry` | tag `work` |
| `/resources`, `/resources/[slug]` (Phase 2) | SSG | `resource` | tag `resource` |
| `/blog`, `/blog/[slug]` (Phase 2) | SSG, backup `revalidate = 3600` | `post` | tag `post` |
| `/book` | Static shell + client island (`CalEmbed`) | `siteSettings` | — |
| `/contact`, `/thanks` | Static shell + client island (`LeadForm`) | `siteSettings` | — |
| `/api/lead` | Route Handler, Node runtime, dynamic | — | — |
| `/api/revalidate` | Route Handler, Sanity webhook signature verify | — | — |
| `sitemap.xml`, `robots.txt`, `opengraph-image` | `app/sitemap.ts`, `app/robots.ts`, `opengraph-image.tsx` (next/og) | Sanity slug + `_updatedAt` | Build + on-demand |

**নিয়ম:**
- কোনো marketing page-এর root-এ `"use client"` থাকবে না।
- Client island মাত্র চারটা: `CalEmbed`, `LeadForm`, `LoomFacade`, `LossCalculator` (Phase 2)। প্রতিটা `next/dynamic` বা interaction-এ load।
- Draft দেখতে Sanity Draft Mode / Visual Editing। Production HTML-এ draft কখনো নয়।
- Revalidation API: Next.js version অনুযায়ী `revalidateTag(tag)`; Next.js 16-এ cache profile সহ signature (docs যাচাই করুন)।
- Next.js 16-এ `middleware.ts`-এর নাম `proxy.ts` ([Next.js docs](https://nextjs.org/docs/app/getting-started/proxy))।

### 9.3 Sanity content model

| Model | মূল field | বিশেষ নিয়ম |
|---|---|---|
| `siteSettings` (singleton) | brandName, oneLiner, email, whatsapp, timezoneStatement, guaranteeText, ownershipText, paymentTermsText, humanInLoopText, trustRow[], founder (ref `person`), verifyLinks[] {platform, url}, pilotSpotsLeft (number 0–3), medianReplySeconds (number, optional), callWindows[] {city, tz, from, to}, defaultSeo | Reusable block-এর একমাত্র উৎস। `medianReplySeconds` খালি থাকলে line render হবে না |
| `person` | name, firstName, role, photo, bio (portable text), location, timezone, credentials[], sameAs[] | Founder-এর জন্য একটাই document |
| `homePage` (singleton) | heroVariant (`dual`/`law`/`accounting`), heroByVariant {eyebrow, h1, subhead, ogTitle, metaTitle, metaDescription}, problemStats[] → `stat`, timelineByVariant[], featuredWork[] → `workEntry`, faqs[] → `faq` | §5.4 variant এখান থেকে |
| `service` | title, slug, eyebrow, h1, subhead, summary {for, whatItDoes, price, timeline}, problem {headline, body, stats[] → `stat`}, steps[] {title, body}, deliverables[], integrations[] (string), timeline[], priceMin, priceMax, carePriceMin, carePriceMax, guardrails[], addonNote, faqs[] → `faq`, relatedWork[] → `workEntry`, seo {title, description, ogImage}, lastReviewed (date) | priceMin/Max থেকে copy আর Service schema দুটোই generate, যাতে কখনো না মেলার সুযোগ না থাকে |
| `offer` | name, slug, kind (`entry`/`system`/`care`/`partner`/`addon`), priceMin, priceMax, unit (`one-time`/`month`/`per-client-month`), description, anchorId | /pricing আর schema-র জন্য |
| `industry` | title, slug, eyebrow, h1, subhead, summary {…}, stats[] → `stat`, calculator {enabled, formula, labels}, workflows[3] {title, body}, primaryService → `service`, complianceBlock (portable text), relatedWork[] → `workEntry`, faqs[] → `faq`, closingHeadline, utmCampaign, **isPrimary** (boolean), seo, lastReviewed | দুই industry-র জন্য একই schema; `isPrimary` = nav ক্রম আর home variant-এর সংকেত। Validation: একসঙ্গে সর্বোচ্চ একটা `isPrimary = true` |
| `workEntry` | title, slug, **badge** (`client`/`internal`/`demo`), industry → `industry`, services[] → `service`, outcomeHeadline, subhead, honestyLine, metrics[] {label, before, after, unit, measuredOver, source}, **testRunDescription** (required if badge = demo), loom {id, thumbnail, transcript}, youtubeUrl, problem, built (portable text + diagram), guardrails, results, whatBroke, testimonial → `testimonial` (only if client), techStack[], monthlyRunningCost, durationWeeks, priceBand, upworkPortfolioUrl, **consentOnFile** (boolean, required true if badge = client), publishedAt | Badge নিয়ম validation-এ enforce |
| `testimonial` | quote, personName, role, company, photo, companyUrl, linkedinUrl, **verificationStatus** (`unverified` / `verified_email` / `verified_linkedin` / `verified_upwork` / `verified_platform_review`), **verificationEvidence** (file/URL, private, frontend query-তে কখনো নয়), **consentDate** (date), **consentScope** (`site` / `site_and_marketing`), **consentEvidence** (file, private), verifiedBy, relatedWork → `workEntry`, expiresAt (optional) | Frontend শুধু verified + consented record আনবে (নিচের query)। Default `unverified` |
| `faq` | question, answer (plain portable text), tags[] (`home`/`service`/`industry`/`pricing`/`security`/`partner`), order | একই FAQ একাধিক page-এ reuse |
| `stat` | value, label, sourceName, **sourceUrl (required)**, year | Source URL ছাড়া publish হবে না |
| `resource` (Phase 2) | title, slug, type (`n8nTemplate`/`checklist`/`calculator`), workflowJson (file), screenshots[], nodeList[], setupSteps, limitations, loom/youtube, externalLinks {n8nGallery, github}, relatedService → `service`, **isIndexable** (boolean) | False হলে `noindex` আর sitemap-এর বাইরে (§7.5) |
| `post` (Phase 2) | title, slug, excerpt, body, author → `person` (required), vertical, relatedService, relatedIndustry, publishedAt, updatedAt, seo | |
| `legalPage` | title, slug, body, lastUpdated | Privacy, Terms |

**Testimonial query (একমাত্র অনুমোদিত frontend query):**

```groq
*[_type == "testimonial"
  && verificationStatus != "unverified"
  && defined(consentDate)
  && (!defined(expiresAt) || expiresAt > now())]
| order(consentDate desc){
  quote, personName, role, company,
  "photo": photo.asset->url, linkedinUrl, companyUrl
}
```

**Sanity validation উদাহরণ (`workEntry`):**

```ts
defineField({
  name: "consentOnFile",
  type: "boolean",
  validation: (Rule) =>
    Rule.custom((value, ctx) =>
      (ctx.document as any)?.badge === "client" && value !== true
        ? "Client projects need written consent on file before publishing."
        : true),
}),
defineField({
  name: "testRunDescription",
  type: "text",
  validation: (Rule) =>
    Rule.custom((value, ctx) =>
      (ctx.document as any)?.badge === "demo" && !value
        ? "Demo builds must describe the test run (e.g. '50 sample inquiries')."
        : true),
}),
```

**Lead data Sanity-তে রাখবেন না।** PII থাকবে শুধু HubSpot-এ (আর n8n execution log-এ, retention সীমিত)।

### 9.4 Performance budget

Google-এর "good" threshold (p75): LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 ([web.dev](https://web.dev/articles/vitals))। Target এর চেয়ে কড়া:

| Metric / budget | Target (mobile, p75) |
|---|---|
| LCP | ≤ 2.0 s |
| INP | ≤ 150 ms |
| CLS | ≤ 0.05 |
| First-load JS (marketing page) | ≤ 130 KB gzip |
| Hero image (founder photo) | ≤ 100 KB AVIF/WebP, `priority`, explicit width/height |
| Fonts | সর্বোচ্চ 2 family, `next/font`, subset latin, `display: swap` |
| First load-এ third-party script | 0 (GA4 consent-এর পর; Cal.com আর Loom interaction-এ; Turnstile শুধু form visible হলে) |
| Lighthouse (mobile) | Performance ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO 100 |
| HTML size (home) | ≤ 120 KB uncompressed |

**ধরে রাখার উপায়:** GitHub Actions-এ Lighthouse CI (home, একটা service, একটা industry, pricing, book)। Budget ভাঙলে PR fail। Real-user data Vercel Speed Insights-এ।

### 9.5 Analytics stack

| Tool | কাজ | নোট |
|---|---|---|
| GA4 | Acquisition, key events, AI channel (§8.7) | Consent Mode v2। UK/EU visitor-এর জন্য consent banner (UK GDPR/PECR); consent ছাড়া analytics cookie নয় |
| Google Search Console | Index, query, Generative AI performance report | Domain property (DNS TXT) |
| Bing Webmaster Tools | Bing index | ChatGPT search ঐতিহাসিকভাবে Bing index-এর ওপর নির্ভর করেছে বলে ধারণা (এই research-এ যাচাই হয়নি) — সস্তা insurance। GSC থেকে import |
| Vercel Speed Insights | Real-user CWV | Pro-তে আছে |
| PostHog free (optional) | Funnel (CTA → booker open → booked), form drop-off | Cookieless mode রাখলে banner-এর বাইরে চালানো যায়; current free limit যাচাই করুন |

**Event নাম (exact):**

| Event | Params | GA4 key event? |
|---|---|---|
| `cta_click` | `cta_id` (`fit_call`/`teardown`/`audit`/`partner_call`/`upwork`), `location` (`hero`/`header`/`sticky`/`section`/`final`) | না |
| `booker_open` | `event_type` | না |
| `booking_confirmed` | `event_type` (`fit-call-20`/`partner-call-20`) | **হ্যাঁ** |
| `lead_submitted` | `form_type` (`contact`/`teardown`/`audit`/`partner`), `segment_hint` | **হ্যাঁ** |
| `loom_teardown_requested` | — | **হ্যাঁ** |
| `audit_requested` | — | **হ্যাঁ** |
| `loom_play` | `entry_slug` | না |
| `pricing_viewed` | — | না |
| `upwork_link_click` | `location` | না |
| `verify_link_click` | `platform` | না |

`booking_confirmed` আসবে Cal.com embed-এর `bookingSuccessfulV2` event থেকে (`bookingSuccessful` নামটা Cal.com deprecated করেছে) ([Cal.com embed events](https://cal.com/help/embedding/embed-events))। Server-side নিশ্চয়তার জন্য Cal.com webhook → n8n → HubSpot-ও চলবে।

### 9.6 Cal.com booking

- **Event types:**
  - `fit-call-20` — 20 min, free, buffer 10 min, minimum notice 4 hours, দিনে সর্বোচ্চ 3টা।
  - `partner-call-20` — 20 min, agency-র জন্য।
  - `audit-session-45` — paid audit-এর জন্য; link পাঠানো হবে payment-এর পর (public নয়)।
- **Availability (Dhaka time, UTC+6, DST নেই):**
  - 09:00–11:00 → Sydney 14:00–16:00 (AEDT)
  - 14:00–17:00 → London 08:00–11:00 (GMT)
  - 19:00–23:00 → New York / Toronto 08:00–12:00 (EST)
  - DST-এ visitor-এর local time Cal.com নিজেই ঠিক করে; Dhaka-র window একই থাকে।
- **Booking question (ছোট):** `Firm name` · `Website` · `Your role` · `Which best describes you?` (Law firm / Accounting, bookkeeping or tax firm / Agency / Other) · `What's the one workflow you'd fix first?` · `Where did you hear about me?` (Upwork / Email / LinkedIn / AI assistant / Google / Referral / Other)।
- **Embed:** `@calcom/embed-react` inline, `/book`-এ client island; CTA থেকে modal নয়, সরাসরি /book (একটা page, একটা measure)। `?type=partner` হলে partner event।
- **Listener:** `Cal("on", { action: "bookingSuccessfulV2", callback })` → GA4 `booking_confirmed`।
- **Webhook:** `BOOKING_CREATED`, `BOOKING_RESCHEDULED`, `BOOKING_CANCELLED` → n8n → HubSpot stage update → follow-up sequence বন্ধ → Telegram alert।
- **Reminder:** Cal.com native email + n8n থেকে 2 ঘণ্টা আগে একটা "what to prepare" email:
  - Subject: `Our call in 2 hours — one thing to bring`
  - Body: `Hi {{first_name}}, looking forward to our call. To make the 20 minutes count, have the one workflow you'd fix first open on your screen (or just be ready to describe it). If anything changes, you can reschedule from your calendar invite. — {{FOUNDER_FIRST_NAME}}`

### 9.7 Lead form → n8n → Claude → HubSpot → instant reply + Telegram (dogfooding)

এটাই site-এর সবচেয়ে শক্তিশালী প্রমাণ: visitor নিজেই Speed-to-Lead product test করতে পারেন। HBR-এর গবেষণায় এক ঘণ্টার মধ্যে যোগাযোগ করলে qualify হওয়ার সম্ভাবনা প্রায় 7 গুণ ([HBR](https://hbr.org/2011/03/the-short-life-of-online-sales-leads))।

**একটাই pipeline, চারটা form:** `contact`, `teardown`, `audit`, `partner` — সবাই `/api/lead`-এ যায়, `formType` field দিয়ে আলাদা।

**Contact form field:** name · work email · firm name · website · firm type (select: Law firm / Accounting, bookkeeping or tax firm / Marketing or web agency / Other professional firm / Other) · team size (1–5 / 6–20 / 21–50 / 50+) · "What's slipping through the cracks?" (textarea, min 20 chars) · budget band (Under $1,000 / $1,000–$3,000 / $3,000–$5,000 / $5,000+ / Not sure yet) · how heard (select) · consent checkbox · hidden: `utm_*`, `landing_page`, `referrer`, `tz` (Intl), `form_started_at` · honeypot (`company_website`, visually hidden, `tabindex=-1`, `autocomplete=off`) · Turnstile token।

**Flow:**

```
[Browser] LeadForm (client island)
   │ POST /api/lead (JSON)
   ▼
[Next.js Route Handler /api/lead — Node runtime]
   1. Parse + validate with zod (types, lengths, email format, consent === true)
   2. Reject if honeypot filled OR (now − form_started_at) < 3 s  → return 200 silently (don't teach bots)
   3. Verify Turnstile token server-side (POST challenges.cloudflare.com/turnstile/v0/siteverify)
   4. Rate-limit by IP + email (e.g. 5/hour, 20/day) via Upstash Redis free tier or Vercel Firewall rule
   5. Build payload {lead, meta:{ip_country, user_agent, received_at}}; sign HMAC-SHA256(body, N8N_WEBHOOK_SECRET)
      → header X-Growrix-Signature, X-Growrix-Timestamp
   6. POST to N8N_WEBHOOK_URL (timeout 4 s)
   7. On failure/timeout: send fallback email via Resend to hello@ (full payload) + Telegram message
      "n8n unreachable — lead saved to fallback email" → still return 200 to the visitor
   8. Return 200 {ok:true} → client: router.push('/thanks?type=' + formType) + GA4 lead_submitted
   ▼
[n8n workflow: "Lead intake — growrixos.com"]
   W1  Webhook (POST, respond immediately 200)
   W2  Code: verify HMAC + timestamp (±5 min); reject if invalid
   W3  Set: normalise fields, received_at = $now, lead_id = uuid
   W4  Claude (Anthropic node or HTTP Request) — classification only, JSON output (schema below),
       low temperature, small/fast model tier
   W5  IF segment == "spam" → log + stop (no reply, no CRM)
   W6  Switch on segment + formType → pick PRE-APPROVED reply template (below)
   W7  Gmail (hello@growrixos.com): send instant reply; replied_at = $now
   W8  HubSpot: upsert contact (by email) + create deal in pipeline "Inbound", stage "New inquiry";
       properties: segment, fit_score, urgency, summary, form_type, utm_*, landing_page,
       response_seconds = replied_at − received_at
   W9  Telegram: alert to Mohammad (format below); fit_score ≥ 4 or urgency = high → also mark "HOT"
   W10 Wait 24 h → HubSpot: stage still "New inquiry" AND no human reply logged? → follow-up #2
   W11 Wait 72 h → still none → "close the loop" email; stage → "Nurture"
   ─── Separate workflow: Cal.com webhook → find contact → stage "Call booked" → cancel W10/W11
   ─── Separate workflow: daily 08:00 Dhaka → Telegram digest (new leads, booked calls, median reply time)
   ─── Error workflow: any failure → Telegram alert with execution link
```

**Claude classification output (JSON schema):**

```json
{
  "type": "object",
  "required": ["segment", "fit_score", "urgency", "budget_fit", "summary", "suggested_next_step", "red_flags"],
  "properties": {
    "segment": { "enum": ["law", "accounting", "agency", "other_professional", "other", "spam"] },
    "fit_score": { "type": "integer", "minimum": 1, "maximum": 5 },
    "urgency": { "enum": ["low", "medium", "high"] },
    "budget_fit": { "type": "boolean" },
    "summary": { "type": "string", "maxLength": 280 },
    "suggested_next_step": { "enum": ["fit_call", "loom_teardown", "paid_audit", "partner_call", "decline_politely"] },
    "red_flags": { "type": "array", "items": { "type": "string" } }
  }
}
```

**Qualification prompt (English, system message):**

```text
You classify inbound inquiries for Growrix OS, a solo founder who builds AI automation systems
(n8n + Claude) for professional service firms. You do NOT write any text that the prospect will see.

Ideal fit: law firms (personal injury, immigration, family) and accounting, bookkeeping or tax firms
in the US, UK, Canada or Australia with 2–50 staff, describing lost leads, slow replies, missed calls,
or document chasing. Agencies wanting white-label automation are "agency" and a good fit.
Offers and prices: Audit $297–$497; Sprint $400–$1,200; Intake system $2,500–$5,000;
Document system $1,500–$3,500; Care plans from $300/month.
Not offered: SaaS products, mobile apps, standalone websites, HIPAA/PHI projects.

Rules:
- fit_score 5 = ideal segment + clear pain + budget ≥ $1,000 or "not sure"; 1 = unrelated or not offered.
- budget_fit = false only if the stated budget is under $1,000 AND the request is a full system.
- urgency "high" only if the message mentions a deadline, busy season, or leads being lost now.
- suggested_next_step: paid_audit if they ask for a plan or quote; loom_teardown if they prefer async
  or are outside call hours; partner_call for agencies; decline_politely for not-offered work; else fit_call.
- segment "spam" for SEO/marketing pitches, link offers, crypto, or gibberish.
- summary: one neutral sentence, no personal data beyond firm name.
Return ONLY JSON matching the schema.
```

**Instant reply template (English, pre-approved; শুধু safe merge field: `{{first_name}}`, `{{firm}}`, CTA link):**

- **Law / accounting / other professional (fit_call):**
  - Subject: `Got your message, {{first_name}}`
  - Body: `Hi {{first_name}}, thanks for reaching out about {{firm}}. This is an automatic confirmation — the same kind of instant reply I build for firms — and I'll send a personal reply within one business day (I'm in Dhaka, UTC+6). If you'd like to skip the back-and-forth, you can pick a time for a free 20-minute fit call here: {{booking_link}}. — {{FOUNDER_FIRST_NAME}}, Growrix OS`
- **Teardown request:**
  - Subject: `Your Loom teardown is in the queue`
  - Body: `Hi {{first_name}}, thanks — I've got your request. You'll get a 3–5 minute video within 2 business days showing where leads or documents slip through and what I'd fix first. Nothing to do in the meantime. — {{FOUNDER_FIRST_NAME}}`
- **Audit request:**
  - Subject: `Your automation audit request`
  - Body: `Hi {{first_name}}, thanks for requesting an audit. I'll reply within one business day with two time options and an invoice ($297–$497 depending on scope, credited to any build within 30 days). — {{FOUNDER_FIRST_NAME}}`
- **Agency:**
  - Subject: `Partner program — next step`
  - Body: `Hi {{first_name}}, thanks for your interest in the partner program. I'll reply personally within one business day. If it's easier, grab a 20-minute partner call here: {{partner_booking_link}}. — {{FOUNDER_FIRST_NAME}}`
- **decline_politely (not-offered work):** instant reply একই generic confirmation; personal reply-তে Mohammad নিজে সৎভাবে বলবেন। AI কখনো decline পাঠাবে না।

**Telegram alert format (plain text):**

```
[NEW LEAD] {segment} · fit {fit_score}/5 · urgency {urgency}{ · HOT if applicable}
{firm} — {name}
{summary}
Next: {suggested_next_step} · Budget: {budget_band}
Source: {utm_source}/{utm_campaign} · Page: {landing_page}
Auto-reply sent in {response_seconds}s
HubSpot: {deal_url}
```

**নিয়ম:**
- AI শুধু classify আর summarise করে। Visitor-কে যা যায় তা সবসময় approved template — Growrix যে "human-in-the-loop" বিক্রি করে, এটা তারই প্রয়োগ।
- **Public stat শুধু data জমার পর:** 30 দিনের data হলে `siteSettings.medianReplySeconds` বসান (HubSpot `response_seconds`-এর median)। না থাকলে line render হবে না।
- n8n webhook URL আর secret env var-এ, code-এ নয়।
- n8n execution data retention 30 দিন (PII কমাতে)।
- Privacy policy-তে HubSpot, n8n host, Anthropic, Google Workspace, Cal.com, Turnstile, GA4 সবার উল্লেখ।

### 9.8 Form আর spam protection

| স্তর | কী | কেন |
|---|---|---|
| 1 | Honeypot field + minimum fill time (3 s) | সস্তা bot ধরে; fail হলে silent 200 |
| 2 | Cloudflare Turnstile (managed/invisible mode) | Free, privacy-friendly CAPTCHA বিকল্প; server-side verify বাধ্যতামূলক |
| 3 | zod validation + length limit (message ≤ 3,000 chars) | Payload abuse রোধ |
| 4 | Rate limit (IP + email) | Flood রোধ |
| 5 | HMAC-signed webhook + timestamp | n8n endpoint-এ সরাসরি fake POST রোধ |
| 6 | Claude `spam` segment | মানুষের লেখা sales pitch আলাদা করা |
| 7 | Accessible error message, `aria-live` status | Spam protection যেন মানুষকে আটকে না দেয় |

### 9.9 Security headers

`next.config.ts`-এর `headers()`-এ সব route-এর জন্য:

```ts
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://app.cal.com https://challenges.cloudflare.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://cdn.loom.com https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://app.cal.com https://api.cal.com https://challenges.cloudflare.com https://vitals.vercel-insights.com",
  "frame-src https://app.cal.com https://cal.com https://www.loom.com https://challenges.cloudflare.com https://www.youtube-nocookie.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: csp }, // switch to Content-Security-Policy after 1 clean week
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-Frame-Options", value: "DENY" },
];
```

- **CSP tradeoff:** nonce-ভিত্তিক strict CSP নিলে page dynamic rendering-এ চলে যায়, যা SSG-র সঙ্গে সাংঘর্ষিক ([Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy))। তাই static site-এ allowlist CSP; প্রথম সপ্তাহ Report-Only, console আর report দেখে তারপর enforce।
- Cal.com, Loom, Turnstile-এর আসল domain build-এর সময় browser devtools-এ মিলিয়ে নিন।
- HSTS `preload` দিন শুধু তখন, যখন নিশ্চিত যে সব subdomain HTTPS-এ।
- Sanity Studio আলাদা host-এ রাখলে site-এর CSP সহজ থাকে।

### 9.10 Canonical, sitemap, OG image

**Host:**
- Vercel Domains-এ `www.growrixos.com` primary; `growrixos.com` → `www` (308)।
- Production deployment-এর `*.vercel.app` alias-কে canonical host-এ redirect (`proxy.ts` / `middleware.ts`):

```ts
import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "www.growrixos.com";

export function proxy(req: NextRequest) { // Next.js ≤15: export function middleware(...)
  const host = req.headers.get("host") ?? "";
  if (process.env.VERCEL_ENV === "production" && host !== CANONICAL_HOST) {
    const url = req.nextUrl.clone();
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/|api/revalidate).*)"] };
```

- **Preview deployment:** Vercel preview-এ `X-Robots-Tag: noindex` header আছে কিনা দেখুন; না থাকলে `VERCEL_ENV !== "production"` হলে root metadata-তে `robots: { index: false, follow: false }`।

**Canonical:**
- Root layout-এ `metadataBase: new URL("https://www.growrixos.com")`।
- প্রতিটা page-এর `generateMetadata`-এ `alternates: { canonical: "/path" }` (query ছাড়া)।

**Sitemap (`app/sitemap.ts`):**
- শুধু 200-status, indexable URL। /thanks, `isIndexable = false` resource, filtered view বাদ।
- `lastModified` = Sanity `_updatedAt`।
- GSC আর Bing-এ submit।

**OG image:**
- প্রতিটা route-এ `opengraph-image.tsx` (next/og), 1200×630।
- Template: warm off-white background · "Growrix OS" wordmark · page H1 (CMS) · একটা chip (price range বা "Demo build") · নিচে ছোট founder headshot + নাম।
- Fonts OG route-এ local file থেকে load।
- `twitter:card = summary_large_image`। LinkedIn Post Inspector দিয়ে চেক।

### 9.11 Accessibility (WCAG 2.2 AA)

- **Structure:** semantic landmark (`header`, `nav`, `main`, `footer`), এক H1, heading ক্রম ঠিক, skip link `Skip to content`।
- **Contrast:** body ≥ 4.5:1, বড় text আর UI ≥ 3:1। Orange accent শুধু interactive element-এ; warm background-এর ওপর আলাদা করে যাচাই।
- **Keyboard ও focus:** সব interactive element-এ visible focus ring (`--color-accent` 2px outline + offset)। Dropdown, `<details>`, Cal.com embed-এ keyboard trap নেই।
- **Form:** প্রতিটা field-এ `<label>`, error `aria-describedby`-তে, submit status `aria-live="polite"`, error হলে প্রথম invalid field-এ focus।
- **Motion:** `prefers-reduced-motion`-এ timeline আর diagram animation বন্ধ।
- **Media:** প্রতিটা Loom-এর transcript; diagram-এর ধাপ text-এ।
- **Target size:** ≥ 24×24 CSS px (WCAG 2.2, 2.5.8)।
- **Language:** `<html lang="en">`।
- **Test:** axe DevTools + Playwright `@axe-core/playwright` CI-তে + keyboard-only pass + VoiceOver/NVDA দিয়ে home, /book, /contact।

### 9.12 Environment variable

```bash
# .env.example
NEXT_PUBLIC_SITE_URL=https://www.growrixos.com
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=            # server only (draft mode)
SANITY_REVALIDATE_SECRET=         # webhook signature
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
N8N_WEBHOOK_URL=
N8N_WEBHOOK_SECRET=
RESEND_API_KEY=                   # fallback email only
FALLBACK_ALERT_EMAIL=hello@growrixos.com
TELEGRAM_BOT_TOKEN=               # fallback alert from /api/lead
TELEGRAM_CHAT_ID=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_CAL_FIT_CALL=growrixos/fit-call-20
NEXT_PUBLIC_CAL_PARTNER_CALL=growrixos/partner-call-20
```

Secret কখনো `NEXT_PUBLIC_` prefix-এ নয়। Vercel-এ Production আর Preview আলাদা value (Preview-তে n8n test webhook)।

---

## 10. নতুন domain-এর launch plan

### 10.1 Launch-এর আগে (Week 3, 16–19 Nov)

- [ ] **Domain ও DNS:** Vercel Domains-এ `www.growrixos.com` primary, `growrixos.com` → www 308। SSL active।
- [ ] **Email authentication (hello@):** SPF, DKIM, DMARC (`p=none` দিয়ে শুরু, 2–4 সপ্তাহ পর `quarantine`)। Instant reply যেন spam-এ না যায়।
- [ ] **Cold email আলাদা domain থেকে:** growrixos.com থেকে কখনো bulk cold email নয়। Outreach-এর জন্য আলাদা sending domain (Marketing plan অনুযায়ী), যাতে main domain-এর reputation সুরক্ষিত থাকে। Bulk sender-দের জন্য Google/Yahoo/Microsoft SPF/DKIM/DMARC আর 0.3%-এর নিচে spam complaint enforce করে ([Close](https://help.close.com/docs/requirements-for-bulk-email-senders))।
- [ ] **Preview deployment noindex** নিশ্চিত (header check)।
- [ ] **Vercel Firewall:** AI bot আর Googlebot/Bingbot block হচ্ছে না।
- [ ] **Analytics:** GA4 property, Consent Mode v2, key event, "AI Assistants" channel group।
- [ ] **Cal.com:** দুটো event live, availability ঠিক, webhook → n8n test।
- [ ] **n8n:** production webhook, HMAC secret, error workflow, Telegram bot।
- [ ] **HubSpot:** pipeline "Inbound" (New inquiry → Replied → Call booked → Audit/Sprint → Won / Nurture / Lost), custom properties।

### 10.2 Launch দিনে (Fri 20 Nov; buffer Sat–Sun 21–22 Nov)

1. Production deploy → সব route-এ smoke test (QA checklist §10.4)।
2. **Google Search Console:** Domain property (DNS TXT record) verify।
3. **Bing Webmaster Tools:** GSC থেকে import করে verify।
4. **Sitemap submit:** `https://www.growrixos.com/sitemap.xml` দুই জায়গায়।
5. **URL Inspection → Request indexing** (GSC-তে, দিনে সীমিত সংখ্যক): `/`, `/industries/law-firms`, `/industries/accounting-firms`, `/services/ai-intake-speed-to-lead`, `/services/document-intake-autopilot`, `/pricing`, `/about`, `/security`, `/partners`, `/work/ledgerline-document-intake`। Bing-এ URL Submission tool দিয়ে একই list।
6. **Clean 404/410 hygiene (standard new-launch practice):** নতুন sitemap-এর বাইরের যেকোনো path পরিষ্কার status দেবে:
   - অজানা path → custom 404 page, HTTP 404, `noindex`, helpful link সহ (§4.16)। কোনো "soft 404" নয় (200 status-এ "not found" লেখা নয়), আর সব অজানা URL home-এ redirect নয়।
   - কোনো path জেনেবুঝে স্থায়ীভাবে সরানো হলে (যেমন launch-এর পর একটা test page) → 410 (`proxy.ts`-এ ছোট একটা `GONE_PATHS` list থেকে)।
   - Launch-এর পর GSC → Pages report → "Not found (404)" সপ্তাহে একবার দেখুন। কোনো আসল page ভুল করে 404 দিলে ঠিক করুন; বাকি 404 স্বাভাবিক, কিছু করতে হবে না।
7. **Social:** LinkedIn (personal + company), Upwork profile, GitHub, YouTube-এ website link আর entity card (§8.4) একই।
8. **Directory:** Clutch / GoodFirms free listing শুরু (approval-এ সময় লাগে)।

### 10.3 Launch-এর পরের প্রথম সপ্তাহ (23–29 Nov, cold email শুরুর সপ্তাহ)

- [ ] প্রতিদিন: Telegram digest দেখুন; n8n error workflow খালি কিনা।
- [ ] CSP Report-Only log দেখুন → সমস্যা না থাকলে enforce।
- [ ] GSC Coverage: key URL indexed হচ্ছে কিনা।
- [ ] Industry page-এ UTM দিয়ে আসা session GA4-এ ঠিক দেখাচ্ছে কিনা।
- [ ] Mobile-এ real device test (iPhone Safari + Android Chrome)।

### 10.4 Launch QA checklist

**Trust ও content**
- [ ] কোনো unverifiable logo, testimonial, rating, review badge বা vanity counter নেই
- [ ] প্রতিটা stat-এর পাশে কাজ করা source link
- [ ] প্রতিটা /work entry-তে সঠিক badge (Client project / Internal build / Demo build)
- [ ] Founder-এর নাম আর ছবি site, schema, OG, LinkedIn, Upwork, GitHub-এ এক
- [ ] Timezone statement সব জায়গায় একই, শুধু "Dhaka (UTC+6)"
- [ ] Price range সব জায়গায় মেলে: service page, /pricing, schema, llms.txt (থাকলে), Claude qualification prompt
- [ ] Founding-pilot spot সংখ্যা সত্য; Upwork-এ এর কোনো উল্লেখ নেই
- [ ] কোথাও `{{…}}`, lorem ipsum, "TODO" বা CMS empty-state text নেই (`grep -r "{{" .next/server` build output-এ)
- [ ] খালি CMS section render হয় না

**Conversion**
- [ ] প্রতিটা page-এ primary CTA → /book কাজ করে
- [ ] Cal.com test booking → confirmation email → GA4 `booking_confirmed` → n8n → HubSpot stage "Call booked" → Telegram alert
- [ ] Contact form valid submit → instant email < 60 s → HubSpot contact + deal → Telegram alert
- [ ] Teardown, audit আর partner form একই ভাবে কাজ করে, সঠিক template যায়
- [ ] Honeypot ভরা / 3 s-এর কম / invalid Turnstile → reject (visitor-কে error নয়)
- [ ] n8n বন্ধ থাকলে fallback email + Telegram যায়, visitor success দেখেন
- [ ] Mobile sticky CTA bar কিছু ঢেকে দেয় না
- [ ] "Hire me through Upwork" link সঠিক profile-এ যায়

**SEO / AEO**
- [ ] `growrixos.com/pricing` → 308 → `https://www.growrixos.com/pricing`; production `*.vercel.app` → 308 → www
- [ ] কোনো redirect chain নেই (একবারেই final URL)
- [ ] প্রতিটা indexable page-এ self-referencing canonical, unique title (≤ 60) আর description (≤ 155)
- [ ] `curl -A GPTBot` দিয়ে /pricing, দুই service আর দুই industry page-এর HTML-এ H1, price আর FAQ text পাওয়া যায়
- [ ] robots.txt live আর §8.2-এর সঙ্গে হুবহু মেলে
- [ ] sitemap.xml-এ শুধু 200-status indexable URL; /thanks নেই
- [ ] অজানা path → 404 (soft 404 নয়); `GONE_PATHS` → 410
- [ ] Schema validator.schema.org-এ error-free আর visible content-এর সঙ্গে মেলে
- [ ] /thanks আর /api `noindex` / disallow
- [ ] OG image প্রতিটা key page-এ render হয় (LinkedIn Post Inspector)

**Performance ও accessibility**
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100 (home, service, industry, pricing, book)
- [ ] First-load JS ≤ 130 KB gzip; Loom আর Cal.com শুধু interaction-এ
- [ ] Keyboard-only navigation পুরো site-এ; focus দৃশ্যমান; skip link কাজ করে
- [ ] axe-এ কোনো critical/serious issue নেই; contrast pass

**Security ও legal**
- [ ] Security header সব route-এ (securityheaders.com দিয়ে চেক)
- [ ] কোনো secret client bundle-এ নেই
- [ ] UK/EU visitor-এর জন্য consent banner; consent ছাড়া GA4 cookie set হয় না
- [ ] Privacy policy-তে প্রতিটা third-party tool-এর নাম
- [ ] Form-এ AI-processing disclosure আর consent checkbox

---

## 11. Build schedule

**Constraint:** cold-email outreach ~23 Nov 2026 শুরু, আর তার আগেই industry landing page live থাকতে হবে। Build শুরু 2 Nov (সোমবার)। Launch target **শুক্রবার 20 Nov**, Sat–Sun 21–22 Nov buffer।

**MVP-র ক্রম কেন এমন:** cold email-এর link যাবে industry page-এ, Upwork visitor যাবেন home আর about-এ, আর সব CTA শেষ হয় /book-এ। তাই আগে shared foundation, তারপর conversion path-এর page, শেষে supporting page।

**Priority label:** **P0** = launch-এর জন্য বাধ্যতামূলক · **P1** = Week 3-এ চাই, দেরি হলে Week 4-এর প্রথম দুই দিনে · **P2** = Week 4+।

### Week 1 (2–8 Nov): Foundation + homepage

- [ ] P0 · Day-1 সিদ্ধান্ত: founder public নাম, headshot, hello@growrixos.com, Vercel Pro, www canonical
- [ ] P0 · Repo scaffold (Next.js + TS strict + Tailwind + ESLint/Prettier), Vercel project, preview noindex
- [ ] P0 · Design tokens (§2.6), fonts, base layout, header/nav, footer, mobile sticky CTA
- [ ] P0 · Sanity project + schema: `siteSettings`, `person`, `homePage`, `service`, `offer`, `industry`, `workEntry`, `testimonial`, `faq`, `stat`, `legalPage` + validation rules
- [ ] P0 · Data access layer (`lib/cms/*`), typed GROQ queries, revalidate webhook
- [ ] P0 · Core component library: `Button`, `Section`, `AnswerSummary`, `TrustRow`, `FounderCard`, `FounderStrip`, `VerifyRow`, `StatRow` + `SourceLink`, `PriceBand`, `FaqList`, `CtaLadder`, `HonestBadge`
- [ ] P0 · Homepage (S1–S12) CMS content সহ
- [ ] P0 · SEO base: `metadataBase`, `generateMetadata` helper, root JSON-LD `@graph`, `robots.ts`, `sitemap.ts`
- [ ] P0 · LedgerLine-এর test run মাপা শুরু (metric bar-এর জন্য)
- [ ] P1 · Founder photo shoot, OG image template

### Week 2 (9–15 Nov): Conversion path pages + lead automation

- [ ] P0 · `/industries/[slug]` template → law-firms আর accounting-firms content (একই template)
- [ ] P0 · `/services/ai-intake-speed-to-lead` আর `/services/document-intake-autopilot`
- [ ] P0 · `/pricing` (সব anchor সহ)
- [ ] P0 · `/book` (Cal.com embed + listener) আর Cal.com event/availability setup
- [ ] P0 · `/contact` + `LeadForm` + `/api/lead` (zod, honeypot, Turnstile, rate limit, HMAC, fallback)
- [ ] P0 · `/thanks`
- [ ] P0 · n8n workflow W1–W9 + error workflow + Telegram bot + HubSpot pipeline; reply template approve
- [ ] P0 · `/audit` (3 card + teardown form + audit form)
- [ ] P1 · `WorkflowDiagram` (SVG) দুই system-এর জন্য
- [ ] P1 · Cal.com webhook workflow

### Week 3 (16–22 Nov): Supporting pages, proof, QA, launch

- [ ] P0 · `/about` (verify-me, timezone table)
- [ ] P0 · `/security`
- [ ] P0 · `/work` index + `/work/[slug]` template + 3 entry: LedgerLine (L), law demo (D1), agency demo (D2) — Loom facade + transcript
- [ ] P0 · `/legal/privacy`, `/legal/terms`, custom 404
- [ ] P0 · `/partners`
- [ ] P1 · `/care-plans` (দেরি হলে /pricing-এর Care block দিয়ে launch, page Week 4-এ)
- [ ] P1 · `/services` hub আর `/industries` hub
- [ ] P0 · GA4 + Consent Mode + key events; GSC + Bing প্রস্তুত
- [ ] P0 · Security headers (Report-Only), OG image সব route-এ
- [ ] P0 · Lighthouse + axe + keyboard pass; QA checklist (§10.4)
- [ ] P0 · **Fri 20 Nov: launch** → GSC/Bing verify, sitemap submit, request indexing (§10.2)
- [ ] Sat–Sun 21–22 Nov: buffer, bug fix, cold email-এর UTM link test

### Weeks 4–8 (23 Nov – 27 Dec): Proof আর content

- [ ] Cold-email split test চলাকালীন দুই industry page-এ কোনো বড় পরিবর্তন নয় (তুলনা fair রাখতে); শুধু bug fix
- [ ] বাকি 4টা demo build (D3–D6) `/work`-এ, প্রতিটায় Loom + transcript + YouTube upload
- [ ] Lead-flow W10–W11 (follow-up) আর daily digest workflow
- [ ] CSP enforce (এক সপ্তাহ clean report-এর পর)
- [ ] `/resources` + প্রথম 3টা n8n template (n8n gallery, GitHub আর site-এ একসঙ্গে)
- [ ] `/blog` + post 1–5 (§7.6); nav-এ blog আসবে post 3-এর পর
- [ ] Clutch / GoodFirms listing complete; Zapier Solution Partner আবেদন
- [ ] Lighthouse CI GitHub Action; Playwright smoke + axe test
- [ ] (Optional) `LossCalculator` industry page-এ — **split test শেষ না হওয়া পর্যন্ত দুই page-এ একসঙ্গে বা কোনোটায় নয়**
- [ ] (Optional) llms.txt
- [ ] প্রথম founding-client কাজ শুরু হলে kickoff-এর দিনই "before" metric মাপা
- [ ] ~22 Dec: 30 দিনের lead-flow data হলে `medianReplySeconds` বসান
- [ ] মাসিক AI-prompt check (§8.5) আর entity audit (§8.4)

### Weeks 9–12 (28 Dec 2026 – 24 Jan 2027): Niche narrowing আর scale

- [ ] 31 Dec: split-test data জড়ো (প্রাথমিক পাঠ)
- [ ] **Jan 6–8: চূড়ান্ত niche সিদ্ধান্ত** (Marketing plan-এর নিয়ম; অস্পষ্ট হলে accounting)
- [ ] Sanity-তে winner `industry.isPrimary = true`, `homePage.heroVariant` = `law` বা `accounting` (§5.4) — কোনো code পরিবর্তন নয়
- [ ] Nav-এর Industries ক্রম, homepage meta/OG, S3 panel আর S6 proof ক্রম আপনাআপনি বদলাচ্ছে কিনা যাচাই
- [ ] Winner industry page-এ গভীরতা: calculator চালু, আরও FAQ, winner-specific demo উপরে
- [ ] Loser page রেখে দিন (indexed, nav-এ নিচে); কোনো redirect নয়
- [ ] Content calendar post 7–12 winner-এর দিকে ঝুঁকিয়ে দিন
- [ ] প্রথম pilot client-এর case study draft (consent সহ) → home S6 Card 1
- [ ] Verified testimonial এলে (`verificationStatus` + `consentDate`) তবেই testimonial row দেখান
- [ ] Comparison page: "n8n vs Zapier vs Make for [winner vertical]"
- [ ] Earned badge (Upwork, Make/Zapier, n8n creator) পেলে /about-এ যোগ
- [ ] প্রথম partner-দের পর wholesale price যাচাই করে /partners update
- [ ] GSC-এর 6–8 সপ্তাহের query data দেখে keyword map (§7.2) আবার সাজান

---

## 12. Repo structure, component list আর AI coding agent-এর prompt sequence

### 12.1 Repo structure

```
growrixos-web/
├─ app/
│  ├─ (marketing)/
│  │  ├─ layout.tsx                 # header, footer, sticky CTA, root JSON-LD
│  │  ├─ page.tsx                   # home
│  │  ├─ services/page.tsx
│  │  ├─ services/[slug]/page.tsx
│  │  ├─ industries/page.tsx
│  │  ├─ industries/[slug]/page.tsx # ONE template for law + accounting
│  │  ├─ audit/page.tsx
│  │  ├─ care-plans/page.tsx
│  │  ├─ partners/page.tsx
│  │  ├─ pricing/page.tsx
│  │  ├─ work/page.tsx
│  │  ├─ work/[slug]/page.tsx
│  │  ├─ about/page.tsx
│  │  ├─ security/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ book/page.tsx
│  │  ├─ thanks/page.tsx
│  │  ├─ legal/[slug]/page.tsx
│  │  ├─ resources/...              # Phase 2
│  │  └─ blog/...                   # Phase 2
│  ├─ api/
│  │  ├─ lead/route.ts
│  │  └─ revalidate/route.ts
│  ├─ opengraph-image.tsx           # default; per-route overrides where needed
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ not-found.tsx
│  ├─ icon.svg · apple-icon.png · favicon.ico
│  └─ globals.css                   # imports styles/tokens.css
├─ components/
│  ├─ ui/          Button, Link, Badge, Chip, Container, Section, Divider, Details
│  ├─ layout/      SiteHeader, NavDropdown, MobileMenu, StickyCtaBar, SiteFooter, Breadcrumbs, SkipLink
│  ├─ sections/    Hero, IndustryHero, AnswerSummary, ProblemStrip, StatRow, SystemPanels,
│  │               WorkflowSteps, WorkflowDiagram, Deliverables, IntegrationsList, TimelineSteps,
│  │               OvernightTimeline, TryItBlock, ProofGrid, ProcessSteps, PricingSnapshot,
│  │               PriceBand, PricingTable, OptionCards, ComplianceBlock, GuardrailsList,
│  │               AgencyBand, FaqList, CtaLadder, LegalBody
│  ├─ trust/       TrustRow, FounderCard, FounderStrip, VerifyRow, HonestBadge, SourceLink,
│  │               GuaranteeNote, TimezoneTable, LastUpdated, MetricTile, MetricBar
│  ├─ work/        WorkCard, WorkFilter, WorkEntryLayout, TranscriptBlock
│  └─ islands/     CalEmbed, LeadForm, LoomFacade, LossCalculator, ConsentBanner, LocalTimeHighlight
├─ lib/
│  ├─ cms/         client.ts, queries.ts, fetchers.ts (typed), image.ts
│  ├─ seo/         metadata.ts, jsonld.ts (Organization/Person/Service/Breadcrumb/Article/Video)
│  ├─ analytics/   gtag.ts, events.ts (typed event names)
│  ├─ lead/        schema.ts (zod), turnstile.ts, ratelimit.ts, sign.ts, fallback.ts
│  └─ utils/       format-price.ts, timezones.ts, cn.ts
├─ sanity/
│  ├─ schemaTypes/ siteSettings, person, homePage, service, offer, industry, workEntry,
│  │               testimonial, faq, stat, legalPage, resource, post
│  ├─ seed/        seed.ts (loads all copy from this plan into the dataset)
│  └─ sanity.config.ts
├─ styles/tokens.css
├─ proxy.ts                         # canonical host + GONE_PATHS (middleware.ts on Next ≤15)
├─ next.config.ts                   # security headers, images, redirects (only for future slug changes)
├─ tests/        e2e/ (Playwright: smoke, forms, a11y), lighthouserc.json
├─ n8n/          lead-intake.json, cal-webhook.json, error-workflow.json, daily-digest.json (exported)
├─ .env.example
└─ README.md
```

### 12.2 Component rules

- **Presentational only:** প্রতিটা component props নেয়, ভেতরে কোনো hardcoded copy নেই। সব text CMS থেকে (Mohammad-এর standard)।
- **Server by default:** `islands/`-এর বাইরে কোনো component-এ `"use client"` নয়।
- **Empty = hidden:** data না থাকলে component `null` return করবে।
- **Honest by type:** `HonestBadge` শুধু চারটা value নেয় (`client` / `internal` / `demo` / `illustrative`); TypeScript union দিয়ে enforce।
- **One source for price:** `PriceBand`, `PricingTable` আর `jsonld.ts` একই `offer`/`service` data থেকে।

### 12.3 AI coding agent-এর prompt sequence (Claude Code-এর জন্য, English, ক্রমানুসারে)

**ব্যাখ্যা:** প্রতিটা prompt একটা আলাদা session বা ধাপ। প্রতিটার শেষে agent-কে test/build চালাতে আর diff দেখাতে বলুন, তারপর পরেরটা দিন। প্রথম prompt-এর সঙ্গে §0 Builder brief আর এই পুরো document project-এ রাখুন (যেমন `docs/build-plan.md`)।

**Prompt 1 — Scaffold**
```text
Read docs/build-plan.md (sections 0, 2.6, 3, 9, 12) before writing code.
Create a new Next.js App Router project "growrixos-web" with TypeScript strict, Tailwind CSS,
ESLint and Prettier. Add styles/tokens.css exactly as in section 2.6 and map the tokens into the
Tailwind theme (colors, radius, spacing, max widths). Load Bricolage Grotesque (600) and DM Sans
(400/500/600) with next/font, subset latin, display swap. Create the folder structure from section 12.1
with empty placeholder files where needed. Add .env.example from section 9.12.
Do not add any page copy yet. Run build and lint; fix all errors.
```

**Prompt 2 — Sanity schemas + data layer**
```text
Set up Sanity (separate studio config in /sanity) with the schema types in section 9.3:
siteSettings, person, homePage, service, offer, industry, workEntry, testimonial, faq, stat, legalPage.
Implement every validation rule listed (stat.sourceUrl required; workEntry consentOnFile/testRunDescription
rules; only one industry with isPrimary=true; testimonial default verificationStatus "unverified").
Create lib/cms with a typed client, GROQ queries and fetchers that tag requests for on-demand
revalidation (tags: home, service:{slug}, industry:{slug}, work, settings). The testimonial fetcher
must use exactly the query in section 9.3. Add app/api/revalidate/route.ts that verifies the Sanity
webhook signature and revalidates tags. Generate TypeScript types for all documents.
```

**Prompt 3 — Seed content**
```text
Write sanity/seed/seed.ts that creates all documents with the English copy from sections 4, 5 and 6
of docs/build-plan.md: siteSettings (all reusable blocks from 4.0), person (with {{placeholders}}
kept as literal strings), homePage (dual variant + law + accounting variants from 5.4), both services,
all offers, both industries, the LedgerLine workEntry and two demo workEntries, all FAQs and stats
with their source URLs, and legal page stubs. Keep copy word-for-word. Make the script idempotent
(createOrReplace with stable _id values).
```

**Prompt 4 — Layout + core components**
```text
Build the marketing layout: SkipLink, SiteHeader (nav from section 3.2 with an accessible
NavDropdown; Industries order comes from industry.isPrimary), MobileMenu, StickyCtaBar (mobile only,
appears after 40% scroll, hides when a form field is focused), SiteFooter (section 3.3, hide links
whose target has no content). Then build the components in section 12.1 under ui/, trust/ and
sections/ that the homepage needs. All components are server components, take typed props,
contain no hardcoded copy, and return null when their data is empty. Follow WCAG 2.2 AA
(section 9.11). Add a /dev/components page (noindex, excluded from sitemap, disabled in production)
to preview them.
```

**Prompt 5 — SEO base**
```text
Implement lib/seo/metadata.ts (generateMetadata helper: title ≤60, description ≤155, canonical
without query, OG/Twitter from CMS, metadataBase https://www.growrixos.com, noindex on non-production)
and lib/seo/jsonld.ts (Organization, WebSite, Person @graph exactly as section 8.3; Service with
Offer/PriceSpecification from CMS prices; BreadcrumbList; Article; VideoObject; CollectionPage).
Add app/robots.ts that outputs exactly the robots.txt in section 8.2, app/sitemap.ts (indexable
200-status URLs only, lastModified from _updatedAt), app/not-found.tsx (section 4.16, real 404 status),
and proxy.ts (canonical host redirect + GONE_PATHS returning 410) from section 9.10 and 10.2.
Add a default opengraph-image.tsx following the template in section 9.10.
```

**Prompt 6 — Homepage**
```text
Build app/(marketing)/page.tsx following the wireframe in section 5.1 and the content model in
homePage. Support heroVariant dual/law/accounting (section 5.4) purely from CMS data, including
section order changes for S3 and S6. The overnight timeline animates step highlights only when
prefers-reduced-motion is not set, and always shows the "Illustrative example" label.
Verify with curl that H1, all prices and all FAQ answers are in the initial HTML.
```

**Prompt 7 — Industry template + services**
```text
Build app/(marketing)/industries/[slug]/page.tsx as ONE template with the 11-section order in
section 4.6, used by both law-firms and accounting-firms. No conditional layout per industry —
only data differs. Then build services/[slug] following sections 4.1 and 4.2, including
WorkflowSteps, a WorkflowDiagram SVG component that renders steps from CMS (text equivalent in HTML),
IntegrationsList, TimelineSteps, PriceBand, GuardrailsList, FounderStrip, FaqList (<details>) and
CtaLadder. Add the Service + BreadcrumbList JSON-LD. Add generateStaticParams for both routes.
```

**Prompt 8 — Pricing, audit, care plans, partners**
```text
Build /pricing (section 4.9, all anchors: #website-add-on, #pilot, #faq; pilot block hidden when
pilotSpotsLeft is 0), /audit (section 4.3, three OptionCards with anchors #teardown #audit #sprint
and two forms that reuse LeadForm with formType teardown/audit), /care-plans (4.4) and /partners (4.5).
All prices come from the offer/service documents so page copy and JSON-LD always match.
```

**Prompt 9 — Lead form + API**
```text
Build components/islands/LeadForm.tsx (client) and app/api/lead/route.ts (Node runtime) exactly as
section 9.7 and 9.8: zod schema in lib/lead/schema.ts, honeypot + 3-second minimum, Cloudflare
Turnstile server verification, Upstash rate limit (5/hour per IP and per email), HMAC-SHA256
signature with timestamp headers, 4-second timeout to N8N_WEBHOOK_URL, and fallback (Resend email +
Telegram message) when n8n fails — the visitor still gets success. Use the exact microcopy from
section 4.14. On success, fire GA4 lead_submitted and navigate to /thanks?type={formType}.
Write unit tests for validation, signature and fallback paths.
```

**Prompt 10 — Booking + analytics + consent**
```text
Build components/islands/CalEmbed.tsx with @calcom/embed-react (inline, event from
NEXT_PUBLIC_CAL_FIT_CALL or NEXT_PUBLIC_CAL_PARTNER_CALL when ?type=partner), listening for
"bookingSuccessfulV2" to fire GA4 booking_confirmed. Build /book (section 4.13) with a static left
column and a fallback message if the embed fails. Add lib/analytics with typed events from
section 9.5, GA4 loaded only after consent (Consent Mode v2 defaults denied), and a small accessible
ConsentBanner shown to visitors whose timezone/locale suggests UK/EU (with a footer link to change choice).
Track cta_click on every CTA via a data attribute, not inline handlers.
```

**Prompt 11 — About, security, work, contact, legal**
```text
Build /about (section 4.10; TimezoneTable computed with Intl from siteSettings.callWindows, static
fallback text; VerifyRow), /security (4.11), /contact (4.14; medianReplySeconds line only when set),
/thanks, /legal/[slug], /services hub and /industries hub (4.15). Build /work and /work/[slug]
(section 6.2): WorkFilter hides chips with zero entries, HonestBadge, MetricBar that shows
"measured over" and "source" under every tile, LoomFacade (click-to-load iframe, thumbnail via
next/image) and TranscriptBlock rendered in HTML. Add Article + VideoObject JSON-LD.
```

**Prompt 12 — Security headers, performance, tests**
```text
Add the security headers from section 9.9 in next.config.ts (CSP as Report-Only for now).
Audit bundle size: first-load JS per marketing route must be ≤130 KB gzip; make Cal.com, Loom,
Turnstile and GA4 load only when needed. Add Playwright tests: every route returns 200 (unknown route
404, GONE_PATHS 410), primary CTA reaches /book, LeadForm happy path with mocked API, @axe-core/playwright
with zero serious/critical issues, and a test that fetches /pricing with a GPTBot user agent and asserts
"$297" is present in the raw HTML. Add lighthouserc.json with the budgets in section 9.4 and a GitHub
Action that runs build, tests and Lighthouse CI on every PR.
```

**Prompt 13 — Pre-launch QA**
```text
Go through the launch QA checklist in section 10.4 item by item against the production preview.
For each item report pass/fail with evidence (command output, screenshot path or URL). Search the
built output for "{{", "lorem", "TODO" and CMS empty-state strings and list every hit.
Do not mark anything as passing without evidence. Fix what you can; list what needs a human
(e.g. founder name, Loom IDs, insurance status).
```

**Prompt 14 — Post-decision switch (Jan 2027)**
```text
The niche test winner is {law|accounting}. Without changing component code, update CMS data:
set industry.isPrimary on the winner, set homePage.heroVariant, and confirm that nav order,
homepage hero, meta/OG, S3 panel order and S6 proof order all follow (section 5.4). Report every
changed document and paste the new homepage <title> and H1 from the production HTML.
```

---

## Sources (এই plan-এ ব্যবহৃত বাইরের উৎস)

- **Competitor pattern:** [ResonateOps](https://resonateops.com/n8n-consultant) · [Zaps Studio](https://zapsstudio.com/) · [Ovidius](https://www.ovidius.ai/platforms/n8n) · [XRAY.Tech](https://www.xray.tech/) · [AY Automate](https://www.ayautomate.com/agency/n8n-dev) · [GrowwStacks](https://www.growwstacks.com/) · [Goodspeed](https://goodspeed.studio/n8n-agency)
- **Conversion / CRO:** [NN/g — State the Price](https://www.nngroup.com/articles/show-price/) · [NN/g — B2B usability](https://www.nngroup.com/articles/b2b-usability/) · [Unbounce Conversion Benchmark Report](https://unbounce.com/conversion-benchmark-report/) · [CXL — B2B case studies](https://cxl.com/blog/b2b-case-studies/) · [ListKit Loom playbook](https://www.listkit.io/blog/loom-video-cold-email-outreach-strategy) · [Full Scale — offshore reference checks](https://fullscale.io/blog/offshore-development-reference-checks/)
- **Vertical evidence:** [2Civility / Clio Legal Trends 2024](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/) · [Rankings.io — PI lead costs](https://rankings.io/personal-injury-lead-costs/) · [HBR — The Short Life of Online Sales Leads](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) · [Stealth Agents — accounting document collection stats](https://stealthagents.com/research/accounting-client-document-collection-workload-statistics-2026) · [CPA Practice Advisor / Karbon](https://www.cpapracticeadvisor.com/2025/02/20/report-shows-firms-that-embrace-ai-have-competitive-advantage/156365/) · [Homebase — small business AI data](https://www.joinhomebase.com/blog/small-business-ai-data-report) · [CallRail 2025 Outlook](https://cdn.mediavalet.com/usva/callrail/dR4GkaMLLkKjeisNH22zjQ/1C0nbRtR0kyLPvwqJtgyOQ/Original/CallRail_2025%20Outlook%20for%20Marketing%20Agencies_Ebook.pdf) · [KrishaWeb — agency margins](https://www.krishaweb.com/?p=45332) · [ABA Formal Opinion 512](https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf) · [IRS Publication 4557](https://www.irs.gov/pub/irs-pdf/p4557.pdf) · [IRS Security Summit WISP guide](https://www.irs.gov/newsroom/security-summit-releases-new-data-security-plan-to-help-tax-professionals-new-wisp-simplifies-complex-area) · [Twilio A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc)
- **SEO / AEO / GEO:** [Google — Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) · [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies) · [Vercel — The rise of the AI crawler](https://vercel.com/blog/the-rise-of-the-ai-crawler) · [OpenAI crawlers](https://developers.openai.com/api/docs/bots) · [Anthropic crawlers](https://support.claude.com/en/articles/8896518) · [Ahrefs — AI brand visibility correlations](https://ahrefs.com/blog/ai-brand-visibility-correlations/) · [Ahrefs — best lists research](https://ahrefs.com/blog/best-lists-research/) · [Ahrefs — how long to rank](https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/) · [Semrush — most cited domains in AI](https://www.semrush.com/blog/most-cited-domains-ai/) · [Semrush — AI Overviews on commercial search](https://www.semrush.com/blog/ai-overviews-commercial-search-study/) · [Pew Research — AI summaries and clicks](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) · [Seer — ChatGPT traffic conversion](https://www.seerinteractive.com/insights/case-study-6-learnings-about-how-traffic-from-chatgpt-converts) · [Relevant Audience / Demandbase](https://www.relevantaudience.com/geo/chatgpt-referrals-b2b-303-percent-growth/) · [Passionfruit — FAQ rich results](https://www.getpassionfruit.com/blog/what-changed-with-google-drops-faq-rich-results-and-what-to-do-now) · [iNet Ventures — FAQ rich results](https://inetventures.com/blog/why-google-dropped-faq-rich-results) · [PPC Land — llms.txt usage](https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/) · [GEO paper, arXiv 2311.09735](https://arxiv.org/pdf/2311.09735) · [Google Trends via Firecrawl](https://trends.firecrawl.dev/explore?q=ai+automation+agency&date=today+12-m) · [IdeaProof](https://ideaproof.io/guides/ai-automation-agency) · [Socialinsider — LinkedIn content study](https://www.socialinsider.io/blog/linkedin-content-study/)
- **Platform, policy আর technical:** [Vercel Fair Use Guidelines (Hobby = non-commercial)](https://vercel.com/docs/limits/fair-use-guidelines) · [Next.js — Proxy (formerly middleware)](https://nextjs.org/docs/app/getting-started/proxy) · [Next.js — Content Security Policy](https://nextjs.org/docs/app/guides/content-security-policy) · [Cal.com — embed events](https://cal.com/help/embedding/embed-events) · [web.dev — Core Web Vitals](https://web.dev/articles/vitals) · [Zapier Solution Partner](https://zapier.com/l/solution-partner) · [n8n Expert Partners](https://n8n.io/expert-partners/) · [n8n community — Creator Hub](https://community.n8n.io/t/where-can-i-sell-my-n8n-workflow-i-am-looking-for-marketplaces-not-the-creator-hub/212963) · [Make partners directory](https://make.com/en/partners-directory) · [Upwork — feedback-building policy](https://support.upwork.com/hc/en-us/articles/17989850384531--What-is-feedback-building) · [Upwork legal](https://www.upwork.com/legal) · [Upwork — Uma (Spring 2026)](https://investors.upwork.com/news-releases/news-release-details/upwork-updates-spring-2026-ai-powered-innovations-help-small) · [Anthropic — training on inputs/outputs](https://privacy.claude.com/en/articles/7996885-will-anthropic-train-on-my-inputs-and-outputs) · [Anthropic — zero data retention](https://privacy.claude.com/en/articles/8956058) · [Close — bulk sender requirements](https://help.close.com/docs/requirements-for-bulk-email-senders)
