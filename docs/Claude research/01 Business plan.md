# Growrix OS — Business Plan (Nov 2026 – Oct 2027)

*প্রস্তুত: 28 Oct 2026 · ভিত্তি: `00_fixed_decisions.md` (binding) ও "Growrix OS business and website plan" research synthesis · যেখানে "(অনুমান)" লেখা, সেটা আমার হিসাব, কোনো উৎসের সংখ্যা নয়।*

---

## 1. Executive summary

- **কী বদলাচ্ছে:** Growrix OS ছয়-service-এর generalist studio (website, SaaS, mobile, SEO…) থেকে সরে **"AI automation systems for professional service firms" (n8n + Claude)** হচ্ছে। বিক্রি হবে outcome: *no missed inquiries, faster lead response, no document chasing*।
- **কেন:** Demand-এর ফাঁকটা integration-এ। 76% US owner AI ব্যবহার করেন, কিন্তু মাত্র 14%-এর ক্ষেত্রে সেটা core operations-এ embedded, আর 73% implementation সাহায্য চান ([Goldman Sachs/BusinessWire](https://www.businesswire.com/news/home/20260317141697/en/Survey-Small-Businesses-Embrace-AI-But-Need-Training-and-Support-to-Fully-Harness-It))। Upwork-এ AI integration-এর demand +178% YoY ([Upwork IR](https://investors.upwork.com/news-releases/news-release-details/upworks-demand-skills-2026-demand-top-ai-skills-more-doubles-ai))। অন্যদিকে website, mobile আর standalone SEO-তে AI builder আর সস্তা offshore supply-এর চাপ বেশি।
- **দুই-track GTM:** Track 1 (week 1 থেকে cash): Upwork/Fiverr আর **Agency Partner Program** (white-label)। Track 2 (vertical): cold email-এ law (PI/immigration, US) বনাম accounting/bookkeeping (US/UK/AU)-এর 30-দিনের split test। ~day 60-এ winner বাছাই হবে। Result অস্পষ্ট হলে default accounting।
- **Offer ladder:** Audit ($297–497, build-এ credit হবে) → Core system (Intake $2.5–5k / Document Chase $1.5–3.5k) → Care Plan ($300–1,000/mo)। প্রথম 3 জন direct client ~40% ছাড় পাবেন, বিনিময়ে case study আর testimonial দেবেন (শুধু Upwork-এর বাইরে)।
- **সংখ্যা (base case, অনুমান):** M1–2-এ মোট ~$3.2k, M3–6-এ $4.7–7.4k/mo, M12-এ ~$11k/mo, যার ~$5k recurring। 12 মাসে gross ~$89k। Conservative case-এ M12 ~$8.2k/mo, 12 মাসে ~$49k।
- **সবচেয়ে বড় constraint টাকা নয়, সময়।** Base case-এ M7 থেকে delivery-র ভার ~120–140 ঘণ্টা/মাস। তাই price বাড়ানো আর subcontractor আনার decision rule আগে থেকেই ঠিক করা আছে (§11)।
- **Payment:** Upwork + Payoneer, backup হিসেবে local fintech। শর্ত 50% upfront / 50% on delivery। US LLC আপাতত নয়।

---

## 2. Business model, positioning, ICP

### 2.1 Business model (এক লাইনে)
**Fixed-scope setup fee + monthly care retainer।** Setup fee থেকে cash flow আসে, retainer থেকে predictability। Agency channel volume বাড়ায় কিন্তু margin কম রাখে। Website শুধু add-on, যাতে automation-এর premium-এর সঙ্গে যুক্ত থাকে।

| Revenue stream | ভূমিকা | M12 base mix (অনুমান) |
|---|---|---|
| Direct setup (core systems, sprint, audit, web add-on) | প্রধান আয়, case study তৈরি | ~36% |
| Recurring care (direct + agency end-client) | Predictability, সবচেয়ে বেশি effective rate | ~41% |
| Agency wholesale builds | Volume, client call ছাড়া | ~18% |
| Upwork/Fiverr | Review/JSS, শুরুর cash | ~5% (M1-এ ~60%) |

### 2.2 Positioning statement (client-facing, English)

> **For** law and accounting firms in the US, UK and Australia **who** lose revenue to slow lead response and lose staff hours chasing client documents, **Growrix OS builds** AI automation systems on n8n + Claude that plug into the tools they already use (Clio, MyCase, Karbon, QuickBooks, Google/Microsoft 365). **Unlike** generic "AI agencies" or bargain marketplace freelancers, we sell one fixed-scope outcome at a published price, with human-in-the-loop safeguards, client-owned accounts and a 30-day fix guarantee, built and supported directly by the founder.

Split test শেষ হলে (~day 60) "law and accounting firms" অংশটা একটি vertical-এ নামিয়ে আনতে হবে।

### 2.3 ICP + buyer persona (প্রতিটি track)

| | **Track 1a: Upwork/Fiverr buyer** | **Track 1b: Agency partner** | **Track 2a: Law firm** | **Track 2b: Accounting/bookkeeping** |
|---|---|---|---|---|
| **কারা** | US/UK/CA/AU SMB owner, ops manager, startup founder যিনি n8n/AI agent/Claude job post করেন | 3–20 জনের marketing/web/GoHighLevel agency (US/UK/AU), যারা home services, dental বা legal client সামলায় | US PI/immigration firm, 2–25 জন attorney | US/UK/AU CPA/EA/bookkeeping firm, 2–30 জন staff |
| **Buyer** | Job poster নিজেই | Agency owner/founder | Managing partner, firm administrator, intake manager | Owner/partner, operations manager |
| **Pain** | ভাঙা Zap/workflow, দ্রুত integration দরকার, in-house কেউ নেই | Client AI চাইছে, কিন্তু dev নেই। Hiring ব্যয়বহুল। 62% AI চালু করতে চায়, কিন্তু মাত্র 17% outsourcing-কে priority মনে করে ([CallRail](https://cdn.mediavalet.com/usva/callrail/dR4GkaMLLkKjeisNH22zjQ/1C0nbRtR0kyLPvwqJtgyOQ/Original/CallRail_2025%20Outlook%20for%20Marketing%20Agencies_Ebook.pdf)) | 48% firm phone ধরে না, callback-ও করে না ([Clio 2024 via 2Civility](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/))। PI lead-এর গড় খরচ $284 ([Rankings.io](https://rankings.io/personal-injury-lead-costs/))। Clio-তে হাতে data entry | 69% firm সময়মতো document পায় না। Client communication-এ সপ্তাহে 9.3 ঘণ্টা যায় ([Stealth Agents compilation](https://stealthagents.com/research/accounting-client-document-collection-workload-statistics-2026))। 70% data security নিয়ে চিন্তিত ([CPA Practice Advisor/Karbon](https://www.cpapracticeadvisor.com/2025/02/20/report-shows-firms-that-embrace-ai-have-competitive-advantage/156365/)) |
| **Trigger** | নতুন job post (payment verified, ≤10 proposal) | Client AI receptionist/chatbot চেয়েছে। Agency "AI package" launch করছে। Automation specialist hire করার post দিয়েছে | Ad spend বাড়ানো, intake staff hire বা চলে যাওয়া, Clio/Lawmatics-এ switch, responsiveness নিয়ে খারাপ review | Busy season-এর আগের planning (Oct–Dec) বা পরের retro (Apr–May, US)। Karbon/TaxDome চালু করা। Staff চলে যাওয়া |
| **আপত্তি** | দাম, review নেই | Margin, white-label গোপনীয়তা, নির্ভরযোগ্যতা | Confidentiality, AI ভুল করবে, voice-AI vendor-রা আগেই pitch করেছে | Data security, offshore access, season-এর মাঝে পরিবর্তন |
| **Hook (English)** | "Fixed-price n8n + Claude build, delivered overnight your time." | "Add an AI offer without hiring." | "You pay ~$284 per lead. Half of firms don't answer the phone." | "Stop chasing client documents." |

---

## 3. Offer architecture

**সাধারণ নিয়ম (সব offer-এ):** fixed scope আর লিখিত SOW। 50% upfront / 50% on delivery। **30-day fix guarantee** (scope-এর ভেতরের bug বিনা খরচে ঠিক করা হবে)। Client নিজের account-এর মালিক থাকবেন। Human-in-the-loop থাকবে। Chatbot/voice-এ AI disclosure থাকবে (EU user থাকলে EU AI Act Art. 50 প্রযোজ্য, Aug 2026 থেকে; [Beancount explainer](https://beancount.io/blog/2026/09/17/eu-ai-act-article-50-transparency-rules-chatbot-disclosure-deepfake-labeling-guide), secondary উৎস)।

**"Launch" price** = প্রথম 3 জন direct pilot client-এর জন্য ~40% ছাড়, বিনিময়ে named case study, testimonial আর metric শেয়ারের অনুমতি। এটা **Upwork-এর বাইরে**, কারণ review-এর জন্য free বা discount কাজ Upwork-এ নিষিদ্ধ ([Upwork Help](https://support.upwork.com/hc/en-us/articles/17989850384531--What-is-feedback-building))। **"Standard"** = pilot শেষ হওয়ার পরের list price।

### 3.1 AI Intake & Speed-to-Lead System (lead offer: law)

| | |
|---|---|
| **Deliverables** | Web form + website chat capture (optional: missed-call text-back)। Claude দিয়ে LLM qualification (practice area, jurisdiction, urgency)। 60 সেকেন্ডের মধ্যে SMS/email reply। Consult booking (Cal.com/Calendly)। CRM sync (Clio Grow / MyCase / Lawmatics / HubSpot, একটি)। 5-touch follow-up (10 দিন)। Intake staff-কে Slack/email alert। Weekly lead report (Sheets/Looker Studio)। Runbook + Loom walkthrough |
| **Scope boundary (out)** | নিজস্ব voice product বানানো (Plus-এ client-এর Retell/Vapi account configure করা হবে)। Ads management। Legal advice বা conflict-check logic (শুধু flag করা হবে)। ২টির বেশি intake channel বা ১টির বেশি CRM। পুরনো lead-এর ১টির বেশি import। Custom CRM development |
| **Timeline** | 3–4 সপ্তাহ (discovery → handoff) |
| **Price** | Lite $2,500 (1 channel) · **Standard $3,500** · Plus $5,000 (voice + 2nd location/CRM) · **Launch (pilot) $2,100** |
| **Care** | $500–1,000/mo (Standard বা Priority tier) |
| **Upsell** | Document Chase (retainer/engagement document), practice-area landing page add-on, voice add-on |

### 3.2 Document Intake & Chase Autopilot (lead offer: accounting; LedgerLine v3 থেকে তৈরি)

| | |
|---|---|
| **Deliverables** | Engagement type অনুযায়ী request list (যেমন 1040, 1120-S, monthly close)। Client-এর existing portal বা storage-এ upload link (TaxDome/Karbon/SharePoint/Drive)। Email+SMS reminder cadence। Claude দিয়ে classification ও extraction, confidence threshold-এর নিচে গেলে **human review queue**। Naming convention মেনে filing। "Missing docs per client" status dashboard। Staff-এর জন্য weekly digest |
| **Scope boundary (out)** | Tax preparation বা bookkeeping entry। Practice management software বদলানো। Handwritten OCR। ৩টির বেশি engagement template। Historical document migration |
| **Timeline** | 2–3 সপ্তাহ |
| **Price** | Lite $1,500 (1 template, reminders + dashboard) · **Standard $2,500** · Plus $3,500 (QBO/Karbon field-এ extraction) · **Launch (pilot) $1,500** |
| **Care** | $300–750/mo |
| **Upsell** | Intake system (নতুন client inquiry), second engagement type, client-portal landing page |

### 3.3 Entry offers

| Offer | Deliverables | Scope boundary | Timeline | Launch → Standard |
|---|---|---|---|---|
| **Automation Audit** | 45-মিনিটের call (বা async questionnaire + Loom)। Current-process map। Top 3 opportunity, প্রতিটির ROI estimate সহ। Fixed quote | কোনো build নয়। ১টি department | 5 business day | **$297 → $497**। 30 দিনের মধ্যে build sign করলে **100% credit** |
| **Workflow Sprint** | ১টি workflow, ≤3টি integration, error alert, Loom handoff | AI step থাকলে Plus price। কোনো CRM migration নয় | 5–7 দিন | $400 (simple) · **$800** · $1,200 (AI step সহ) |

### 3.4 Automation Care Plan (retainer)

| Tier | Price | কী থাকে | Response (Dhaka UTC+6) |
|---|---|---|---|
| Essentials | **$300/mo** | Monitoring, error alert, ≤2 ঘণ্টা fix/change, monthly 1-page report, platform update | 1 business day |
| Standard | **$500/mo** | ≤4 ঘণ্টা change, prompt tuning, quarterly review call | 1 business day, US overnight fix |
| Priority | **$1,000/mo** | ≤8 ঘণ্টা change, নতুন ছোট workflow, monthly call | 4 ঘণ্টা within overlap window |

ঘণ্টা পরের মাসে roll over হবে না। Cap-এর বেশি কাজ হলে $75/hr (অনুমান), অথবা Sprint হিসেবে quote করা হবে। Minimum term 3 মাস, তারপর month-to-month (30 দিনের notice)।

### 3.5 Agency Partner Program (white-label)

| | |
|---|---|
| **Deliverables** | Agency-র branding-এ build। Agency-র জন্য Loom handoff আর runbook। End-client-এর সঙ্গে সরাসরি যোগাযোগ শুধু agency চাইলে |
| **Wholesale price** | Build $500 (single workflow) / **$1,000** (standard system) / $1,500 (complex) + **$100–300/mo per end-client** care। *এই wholesale price-গুলো অনুমান, কোনো sourced benchmark নেই।* প্রথম partner-এর প্রথম build-এ launch price $750 |
| **Agency-র margin** | GHL agency AI package retail-এ $1,200–2,500/mo-তে বিক্রি করে ([NetPartners](https://netpartners.marketing/gohighlevel-agency-pricing-guide/))। Agency-গুলোর margin target 50–70% ([KrishaWeb](https://www.krishaweb.com/?p=45332)) |
| **শর্ত** | Mutual NDA, দুই দিকেই non-solicit, partner-প্রতি quarterly volume review |

### 3.6 Website add-on (শুধু system-এর সঙ্গে bundle)
- Practice-area / service landing page: **$1,000–1,500**। 5-page conversion site: **$2,500–4,000**। এটা $2k–10k band-এর নিচের দিক ([WebFX](https://www.webfx.com/web-development/pricing) freelancer band থেকে, অনুমান)।
- Technical SEO ভেতরে থাকবে: SSG/ISR, schema, Core Web Vitals, redirects, GSC setup। আলাদা SEO retainer থাকবে না।
- **Public offer থেকে বাদ:** SaaS আর mobile app। শুধু referral বা inbound এলে case-by-case নেওয়া হবে।

### 3.7 Upsell path

```
Free 15–30 min call / Loom (reply-only)
        ↓
Automation Audit $297–497  ──(100% credit)──┐
        ↓                                   ↓
Workflow Sprint $400–1,200  →  Core System (Intake $2.5–5k / Doc Chase $1.5–3.5k)
                                            ↓ (+ Website add-on)
                               Care Plan $300–1,000/mo
                                            ↓ (quarterly review)
                               2nd system / Priority tier / referral
```
লক্ষ্য: core build-এর ≥60–75% যেন care plan-এ যায় (§11)।

### 3.8 যে tool-এর খরচ client সরাসরি দেবেন (client-owned accounts)

| Tool | আনুমানিক খরচ | Note |
|---|---|---|
| n8n Cloud **বা** self-host VPS | €20/mo (2.5k executions) – €50/mo ([Taskip](https://taskip.net/ai-automation-agency-pricing/)); VPS ~$5–15/mo (অনুমান) | Client-এর নামে account। Growrix-কে user হিসেবে invite করবেন |
| Make / Zapier (দরকার হলে) | Make $12–21/mo ([Taskip](https://taskip.net/ai-automation-agency-pricing/)) | — |
| Anthropic API key | Usage-based। SMB volume-এ সাধারণত মাসে কম (অনুমান) | Client-এর billing, client-এর key |
| Twilio (SMS/number) | Usage-based | A2P registration client-এর নামে |
| Voice (Retell/Vapi) — শুধু Plus | $0.07–0.31/min ([Layer3Labs](https://www.layer3labs.io/guides/ai-answering-service-cost)) | — |
| CRM/PM: Clio, MyCase, Lawmatics, Karbon, TaxDome, QBO | Client-এর আগে থেকেই আছে | — |
| Cal.com/Calendly, Google/M365, domain, Vercel hosting (web add-on) | Client-এর plan অনুযায়ী | — |

---

## 4. Pricing logic vs market benchmarks

| Growrix offer | Growrix price | Market benchmark | উৎস |
|---|---|---|---|
| Automation Audit | $297–497 | Agency audit $2,000–5,000 | [Taskip](https://taskip.net/ai-automation-agency-pricing/) |
| Workflow Sprint | $400–1,200 | n8n single workflow $400–1,200। Zaps Studio Rescue Sprint $1,000–3,000। Upwork n8n visible sample-এর median ~$175 | [BULDRR](https://buldrr.com/pricing), [Zaps Studio](https://zapsstudio.com/), [Upwork n8n jobs](https://www.upwork.com/freelance-jobs/n8n/) |
| Document Chase | $1,500–3,500 | SB setup $1,500–5,000। Multi-workflow + AI $1,500–4,500 | [Taskip](https://taskip.net/ai-automation-agency-pricing/), [BULDRR](https://buldrr.com/pricing) |
| Intake System | $2,500–5,000 | CRM lead-routing build $6,500 flat। RevOps System $3,000–12,000 | [Taskip](https://taskip.net/ai-automation-agency-pricing/), [Zaps Studio](https://zapsstudio.com/) |
| Care Plan | $300–1,000/mo | Freelance support retainer $300–1,200। SB retainer $500–1,500। Partner retainer $500–3,500 | [Taskip](https://taskip.net/ai-automation-agency-pricing/), [Zaps Studio](https://zapsstudio.com/) |
| Agency wholesale | $500–1,500 + $100–300/mo | GHL AI package retail $1,200–2,500/mo। White-label landing page partner cost $500–1,500 | [NetPartners](https://netpartners.marketing/gohighlevel-agency-pricing-guide/), [KrishaWeb](https://www.krishaweb.com/?p=45332) |
| Website add-on | $1,000–4,000 | Freelancer $1k–50k+ per project। India agency $10–30/hr | [WebFX](https://www.webfx.com/web-development/pricing), [Dribbble](https://content-hub.dribbble.com/tips/web-development-agency-costs) |
| **Effective hourly target** | **$40–75** | Offshore $25–75। Freelance $40–150। Onshore n8n $80–150 | [Taskip](https://taskip.net/ai-automation-agency-pricing/), [Ad Snipper](https://adsnipper.com/blog/hire-n8n-developer/) |

*সতর্কতা: প্রায় সব benchmark agency বা vendor blog থেকে এসেছে, তাই একটু বাড়িয়ে বলা হতে পারে। SMB-রা আসলে কত দিয়েছে, তার কোনো independent survey পাওয়া যায়নি।*

**Buyer-এর ROI anchor:** 66% SMB AI user মাসে $500–2,000 সাশ্রয়ের কথা বলেন ([Thryv](https://investor.thryv.com/news/news-details/2025/AI-Adoption-Among-Small-Businesses-Surges-41-in-2025-According-to-New-Survey-from-Thryv/))। তাই $300–1,000/mo care plan সেই সাশ্রয়ের ভেতরেই পড়ে। Law-এ ROI-র হিসাব সহজ: প্রতি মাসে একটা বাড়তি signed case-ই সাধারণত পুরো setup fee-র চেয়ে বেশি মূল্যের। Signed case-এর value firm অনুযায়ী আলাদা, তাই discovery-তে client-এর নিজের সংখ্যা জেনে নিতে হবে।

### কেন দামের লড়াইয়ে নামা যাবে না
1. **Supply-র চাপ:** Bangladesh বিশ্বের দ্বিতীয় বৃহত্তম online labour supplier, প্রায় 650,000 জন active freelancer ([socialprotection.gov.bd](https://socialprotection.gov.bd/wp-content/uploads/2026/02/Bangladeshs-500M-Industry.pdf))। Pakistan-ভিত্তিক n8n talent $15/hr-এ পাওয়া যায় ([Ad Snipper](https://adsnipper.com/blog/hire-n8n-developer/))। দামে প্রতিযোগিতা করলে সবসময় কেউ না কেউ আরও সস্তায় দেবে।
2. **Capacity-র হিসাব (সবচেয়ে শক্ত যুক্তি):** মাসে ~120 delivery hour × $25/hr = **$3,000-এ ceiling**। $10k/mo target-এ পৌঁছাতে blended **≥$83/hr** লাগবে। এটা কেবল productized reuse (LedgerLine), retainer ($100–150+/hr effective) আর setup fee দিয়েই সম্ভব।
3. **Signal:** Enns-এর "Vendor vs Expert" কাঠামোয় specialist দাম ঠিক করেন, vendor দাম মেনে নেন ([PulseRevOps summary](https://pulserevops.com/knowledge/bs0067))। সস্তা দাম buyer-এর কাছে ঝুঁকির signal।
4. **Upwork micro-job:** $15–300-এর job শুধু review বা JSS-এর জন্য নেওয়া হবে, আর M4 থেকে ধীরে ধীরে বন্ধ করা হবে (§6-এর Upwork column দেখুন)।

**Price বাড়ানোর নিয়ম:** 3টি pilot case study publish হলে launch price বন্ধ হবে। Close rate একটানা 2 মাস >40% থাকলে বা delivery hour >120 হলে Standard price +15–20% বাড়বে (§11)।

---

## 5. Unit economics

**Fee-এর ধারণা (planning):**
- **Upwork:** service fee এখন variable 0–15%। Agency-দের ক্ষেত্রে বাস্তবে ~11–13.5% দেখা যায় ([GigRadar](https://gigradar.io/blog/upwork-fees))। Local bank-এ withdrawal $0.99। FX markup ~1–2% ([ElevatePay](https://www.elevatepay.co/blog/upwork-fees-bangladesh))। প্রতি Connect $0.15, proposal-প্রতি ~16টি (~$2.40) ([SnipeWork](https://snipework.com/blog/upwork-connects-cost-2026))। **Planning-এ মোট ~13.5% ধরা হয়েছে।**
- **Fiverr:** 20% কাটে, earning clear হয় 14 দিনে ([HireInSouth](https://hireinsouth.com/post/fiverr-pricing))।
- **Payoneer (direct client):** Bangladesh-এর official fee schedule পাওয়া যায়নি। **Planning-এ ~3% all-in ধরা হয়েছে (অনুমান)।** payoneer.com/bd-তে receiving, card payment আর withdrawal-এর fee নিজে যাচাই করুন।

| Offer | Price (launch → standard) | ঘণ্টা (sales + delivery, অনুমান) | Effective $/hr (launch → standard, fee বাদে) | Note |
|---|---|---|---|---|
| Automation Audit | $297 → $497 | 5 (1 + 4) | ~$58 → ~$96 | Convert হলে credit যায়, তাই এর আসল কাজ conversion |
| Workflow Sprint | $800 | 12 (2 + 10) | ~$65 | — |
| Document Chase (Standard) | $1,500 → $2,500 | 38 (6 + 32), LedgerLine reuse-এ কমে ~30 হবে | ~$38 → ~$64 (reuse-এ ~$80) | সবচেয়ে বেশি template-যোগ্য |
| Intake System (Standard) | $2,100 → $3,500 | 58 (8 + 50) | ~$35 → ~$58 | Plus $5,000 / ~70h ≈ $69 |
| Care Standard | $500/mo | 3–4/mo | ~$120–160 | Margin-এর মূল উৎস |
| Care Essentials | $300/mo | 2/mo | ~$145 | — |
| Agency build | $1,000 | 17 (2 + 15) | ~$57 | Template reuse-এ বাড়বে |
| Agency end-client care | $200/mo | 1–2/mo | ~$95–190 | — |
| Website add-on (landing page) | $1,500 | 16 | ~$90 | Next.js + AI-assisted |
| Upwork contract (typical early) | $500 | 10 | ~$43 | 13.5% fee বাদে |

**পর্যবেক্ষণ:** pilot price-এ effective rate ~$35–40/hr, যা target band-এর নিচের সীমায়। এটা ইচ্ছাকৃত এবং সাময়িক (3টি deal)। Standard price-এ setup কাজ $58–80/hr, retainer $95–160/hr।

### Mohammad-এর মাসিক tool খরচ

| Phase | মাসিক খরচ | কী কী |
|---|---|---|
| M1 (প্রথম 2 সপ্তাহ) | ~$25 | Workspace $7 ([9to5Google](https://9to5google.com/2025/01/15/google-workspace-price-increase-2025/)), domain, Connects-এর শুরু |
| M2–M6 | ~$110–130 | + 2–3টি secondary domain (~$15/yr প্রতিটি), 4–6টি inbox ($3–7 প্রতিটি), Smartlead Base $39 / Instantly Growth $47 ([Prospeo](https://prospeo.io/s/instantly-pricing)), Connects $20–60, dev VPS ~$6 (অনুমান) |
| M7–M12 | ~$150–170 | + Vercel Pro $20 (অনুমান, যাচাই করুন। Hobby plan non-commercial ব্যবহারের জন্য, তাই business site-এর জন্য উপযুক্ত নয়), extra inbox |
| Optional | +$90–120 | Sales Navigator ($89.99–119.99, [Valley](https://www.joinvalley.co/blog/linkedin-sales-navigator-cost-explained-2026))। **শুধু তখনই কিনবেন যখন LinkedIn থেকে call আসছে** |

Claude subscription আর অন্যান্য existing tool আগে থেকেই চলছে, তাই এখানে ধরা হয়নি।

### Solo capacity limit
- মোট কাজের সময় ~160 h/mo (7.5h × 21–22 দিন)। এর মধ্যে sales, content আর admin ~35–40 h। **ফলে delivery ceiling ~120 h/mo।**
- এই ceiling-এ মোটামুটি যা ধরে (অনুমান): **1টি core build (35–50h) + 1–2টি agency build (15–30h) + 1টি sprint (10h) + 1–2টি audit (8h) + ~8টি direct care (24–32h) + ~8টি agency end-client care (8–16h)**।
- **মাসে 2টির বেশি core build একসঙ্গে নেওয়া যাবে না।** Retainer 15–16টি ছাড়ালে নতুন build-এর জায়গা থাকবে না। তখন subcontractor লাগবে (§11)।

---

## 6. 12-month revenue projection

**Model-এর assumptions (সবই অনুমান):**
- Calendar: M1 = Nov 2026। Cold email infra week 1-এ, warmup 2–4 সপ্তাহ, split test মোটামুটি Dec–Jan, winner বাছাই ~early Jan।
- Retainer billing শুরু হয় build শেষ হওয়ার **পরের মাস** থেকে। Revenue দেখানো হয়েছে billing-এর মাসে। 50/50 split-এর কারণে আসল cash কিছুটা আগে-পরে আসবে।
- Audit: মাসে 2টি, তার 1টি build-এ convert হয়। শুধু non-converted audit-এর $397 আলাদা revenue হিসেবে ধরা হয়েছে।
- Sprint: মাসে 1টি × $800। 20% care-এ যায় ($300)।
- Fee: Upwork 13.5%, direct 3%।

| Assumption | Base | Conservative |
|---|---|---|
| প্রথম direct pilot | M3 | M4 |
| Direct core build | M3–M5-এ 3টি pilot, M6 থেকে 1/mo | M4 থেকে প্রতি ~1.5 মাসে 1টি |
| Agency builds | M3 থেকে ~1/mo, M10+-এ মাঝে মাঝে 2 | প্রতি ~1.5 মাসে 1টি |
| Care attach (core → care) | 75%। Doc $400, Intake $600 | 60%। Doc $350, Intake $500 |
| Agency end-client care | 80% attach × $200 | 70% × $150 |
| Monthly churn (retainer) | 5% | 8% |
| Upwork/Fiverr | $600–1,200, M9 থেকে কমিয়ে $600 | $500–1,000 |
| Website add-on | 2টি (M7, M10) | 0 |

### Base case

| Month | Upwork/Fiverr | Direct setup | Agency builds | Recurring | **Gross** | Fees | Tools | **Net** | Direct care clients | Agency end-clients | Delivery hrs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 Nov | 600 | 397 | 0 | 0 | **997** | 93 | 25 | **879** | 0 | 0 | 21 |
| M2 Dec | 1,000 | 1,197 | 0 | 0 | **2,197** | 171 | 110 | **1,916** | 0.2 | 0 | 41 |
| M3 Jan | 1,200 | 2,697 | 750 | 60 | **4,707** | 267 | 120 | **4,320** | 1.1 | 0.8 | 96 |
| M4 Feb | 1,200 | 3,297 | 1,000 | 577 | **6,074** | 308 | 120 | **5,646** | 2.0 | 1.6 | 117 |
| M5 Mar | 1,200 | 2,697 | 1,000 | 1,218 | **6,115** | 309 | 130 | **5,676** | 2.9 | 2.3 | 103 |
| M6 Apr | 1,000 | 3,697 | 1,000 | 1,677 | **7,374** | 326 | 130 | **6,918** | 3.7 | 3.0 | 101 |
| M7 May | 1,000 | 6,197 | 1,000 | 2,113 | **10,310** | 414 | 150 | **9,746** | 4.5 | 3.6 | 138 ⚠ |
| M8 Jun | 1,000 | 3,697 | 1,000 | 2,678 | **8,375** | 356 | 150 | **7,868** | 5.2 | 4.2 | 107 |
| M9 Jul | 800 | 4,697 | 1,000 | 3,064 | **9,561** | 371 | 150 | **9,040** | 5.9 | 4.8 | 123 ⚠ |
| M10 Aug | 600 | 5,197 | 2,000 | 3,581 | **11,378** | 404 | 170 | **10,803** | 6.5 | 6.2 | 135 ⚠ |
| M11 Sep | 600 | 4,697 | 1,000 | 4,082 | **10,379** | 374 | 170 | **9,834** | 7.2 | 6.7 | 124 ⚠ |
| M12 Oct | 600 | 3,997 | 2,000 | 4,548 | **11,145** | 397 | 170 | **10,577** | 7.7 | 7.9 | 125 ⚠ |

**12 মাসে gross ~$88.6k, net ~$83.2k। M12-এর পর exit MRR ~$5.0k।** ⚠ চিহ্ন মানে delivery 120h ceiling ছাড়িয়েছে। M9 থেকে base case টিকিয়ে রাখতে price বাড়ানো বা part-time subcontractor লাগবে (subcontractor খরচ, ধরা যাক ~40h × $10–15/hr = $400–600, model-এ ধরা হয়নি)।

### Conservative case

| Month | Upwork/Fiverr | Direct setup | Agency builds | Recurring | **Gross** | Fees | Tools | **Net** | Delivery hrs |
|---|---|---|---|---|---|---|---|---|---|
| M1 Nov | 500 | 0 | 0 | 0 | **500** | 68 | 25 | **408** | 11 |
| M2 Dec | 800 | 397 | 0 | 0 | **1,197** | 120 | 110 | **967** | 26 |
| M3 Jan | 800 | 800 | 750 | 0 | **2,350** | 154 | 120 | **2,076** | 44 |
| M4 Feb | 1,000 | 1,897 | 0 | 165 | **3,062** | 197 | 120 | **2,745** | 65 |
| M5 Mar | 1,000 | 1,197 | 1,000 | 362 | **3,559** | 212 | 130 | **3,217** | 59 |
| M6 Apr | 1,000 | 2,300 | 0 | 498 | **3,798** | 219 | 130 | **3,449** | 70 |
| M7 May | 1,000 | 1,197 | 1,000 | 728 | **3,925** | 223 | 150 | **3,552** | 62 |
| M8 Jun | 1,000 | 2,497 | 1,000 | 835 | **5,332** | 265 | 150 | **4,917** | 104 |
| M9 Jul | 1,000 | 3,697 | 0 | 1,173 | **5,870** | 281 | 150 | **5,439** | 83 |
| M10 Aug | 1,000 | 1,197 | 1,000 | 1,349 | **4,546** | 241 | 170 | **4,135** | 66 |
| M11 Sep | 800 | 3,697 | 1,000 | 1,406 | **6,903** | 291 | 170 | **6,442** | 96 |
| M12 Oct | 800 | 4,697 | 1,000 | 1,669 | **8,166** | 329 | 170 | **7,667** | 116 |

**12 মাসে gross ~$49.2k, net ~$45.0k। Exit MRR ~$2.0k।**

**Target-এর সঙ্গে তুলনা:**

| Target (fixed) | Base | Conservative |
|---|---|---|
| M1–2: প্রথম $1–3k | ~$3.2k ✔ | ~$1.7k ✔ |
| M3–6: $3–6k/mo | $4.7–7.4k (উপরের সীমায়) | $2.4–3.8k (নিচের সীমায়, M3-এ miss) |
| M12: $8–15k/mo | ~$11.1k ✔ | ~$8.2k (ঠিক সীমায়) |

**Model-এর সবচেয়ে sensitive input:** (1) care attach আর churn, কারণ M12-এ base revenue-র ~41% recurring। (2) M6 থেকে মাসে 1টি direct core build আসবে কিনা। (3) Accounting firm-এর seasonality: US busy season Jan–Apr 15। Base case-এ M3 আর M5-এর doc pilot এই সময়ে পড়েছে। ঝুঁকি কমাতে এই সময়ে UK/AU firm, অথবা monthly-close bookkeeper (যাদের কাজ কম seasonal) লক্ষ্য করুন (সাধারণ জ্ঞান থেকে, যাচাই হয়নি)।

---

## 7. Operations

### 7.1 Delivery process

| ধাপ | কাজ | Output / artifact | সময় (core build) | Gate |
|---|---|---|---|---|
| 0. Qualify | Reply → Loom (3–5 মিনিট, শুধু যাঁরা reply করেছেন) → call বা async questionnaire | Qualification note | — | Budget, tool access, decision-maker নিশ্চিত |
| 1. Discovery | Audit বা discovery call, current process map, baseline metric (response time, missing-doc rate) | Process map, baseline sheet | 2–3 দিন | Client baseline confirm করেছেন |
| 2. Spec | Scope, integration list, data flow, HITL point, acceptance test | **SOW + spec (1–3 পাতা)** | 1–2 দিন | Signed SOW + 50% payment |
| 3. Build | Client-owned account-এ build। Staging/test data দিয়ে কাজ। প্রতি সপ্তাহে Loom update | Workflow, prompt, dashboard | 1–2.5 সপ্তাহ | Internal QA checklist pass |
| 4. QA | Acceptance test, edge case, error path, AI output review (20–50টি sample) | QA report | 2–3 দিন | Client UAT sign-off |
| 5. Handoff | Go-live, runbook, Loom walkthrough, credential হস্তান্তর নিশ্চিত করা | Runbook, handoff checklist | 1 দিন | বাকি 50% payment |
| 6. Care | 30-day fix guarantee, monitoring, monthly report, quarterly ROI review | Monthly report (baseline-এর সঙ্গে তুলনা) | চলমান | Day 25-এ care plan offer |

**Time-zone অভ্যাস:** Dhaka UTC+6, তাই US Eastern-এর সঙ্গে overlap মোটামুটি সকাল 8–10 ET (Dhaka-র সন্ধ্যা/রাত)। UK-র সঙ্গে overlap দুপুর থেকে বিকেল। Site-এ এই overlap সৎভাবে লিখুন (*"Primary CET hours"* মুছে ফেলুন)। "Overnight delivery for US clients"-কে সুবিধা হিসেবে দেখান।

### 7.2 যে SOP আর template বানাতে হবে (প্রথম 30 দিনে, অগ্রাধিকার অনুযায়ী)
1. **MSA + SOW template** (Intake, Doc Chase, Sprint, Agency-র জন্য আলাদা SOW), mutual NDA, DPA addendum।
2. **Proposal template** (1 পাতা: problem → outcome → scope → price → timeline → guarantee)।
3. **Discovery questionnaire** (vertical-অনুযায়ী) + baseline-metric sheet।
4. **Credential & access SOP** + offboarding checklist (§7.5)।
5. **Build QA checklist** (error handling, retries, logging, AI disclosure, HITL, PII masking)।
6. **Handoff runbook template** + Loom script।
7. **Care-plan monthly report template**।
8. **Reusable n8n module library:** LedgerLine-এর component (document classify/extract, reminder cadence), lead-qualify prompt, CRM connector (Clio, Karbon, QBO)। Hour কমানো আর margin বাড়ানোর মূল জায়গা এটাই।
9. **Cold email + LinkedIn sequence** (niche-প্রতি), Loom-audit script, Upwork proposal snippet।
10. **Invoice template** + payment-reminder sequence।

### 7.3 Tool stack (Growrix-এর নিজের)
Google Workspace (custom-domain email, Drive) · Smartlead বা Instantly (cold email) · Apollo free (lead data; Google Maps scrape করবেন না, কারণ এটা Terms-এ নিষিদ্ধ, [Thunderbit](https://thunderbit.com/blog/is-scraping-google-maps-legal)) · Upwork · Loom (free) · Cal.com (free) · n8n (dev/demo-র জন্য self-host VPS) · Claude (build, drafting) · Next.js + Vercel (site) · Bitwarden বা এ ধরনের password manager · Google Sheets (CRM/pipeline, শুরুতে) · Payoneer (invoicing/receiving)। খরচ §5-এ।

### 7.4 নিজের AI agent org কীভাবে কাজে লাগাবেন (human approval সহ)

| কাজ | Agent কী করবে | Mohammad কী approve করবেন |
|---|---|---|
| Lead research | Firm list, decision-maker, trigger signal (hiring post, Clio switch) খুঁজবে | List-এর মান, CASL/Spam Act-এর ঝুঁকি থাকলে সেই lead বাদ |
| Outreach drafting | Email বা LinkedIn first-line personalize করবে (<50 শব্দ) | প্রতিটি sequence; প্রথম 2 সপ্তাহ প্রতিটি email |
| Spec/SOW draft | Discovery note থেকে SOW draft | Scope boundary আর price, সবসময় |
| Build support | Boilerplate workflow, prompt variant, test case | Code review, production deploy |
| QA | Edge-case test data, AI-output evaluation | Final QA sign-off |
| Content | LinkedIn carousel, YouTube script, n8n template description | Publish-এর আগে |

**কঠোর নিয়ম:** কোনো agent client-এর production credential রাখবে না। Client-এর real PII agent org-এর কাছে যাবে না, শুধু synthetic বা redacted data যাবে। Agent client-কে সরাসরি কোনো message পাঠাবে না।

### 7.5 Credential ও security handling (এটাই sales asset; site-এর Security page-এ লিখুন)
1. **Client-owned accounts:** n8n, API key, Twilio, CRM সবকিছু client-এর নামে আর client-এর billing-এ থাকবে। Growrix শুধু **invited user** হিসেবে, least-privilege role-এ ঢুকবে।
2. **Password বা key কখনো email, chat বা WhatsApp-এ নেওয়া হবে না।** OAuth বা invite পদ্ধতিই প্রথম পছন্দ। তা না হলে password manager-এর secure share। Mohammad কখনো client-এর হয়ে password টাইপ করবেন না; client নিজে n8n credential store-এ enter করবেন।
3. Mohammad-এর সব account-এ 2FA (hardware key বা authenticator)। প্রতিটি client-এর জন্য আলাদা n8n project বা instance।
4. **Data minimization:** AI prompt-এ শুধু প্রয়োজনীয় field যাবে। Log-এ PII mask করা হবে। Retention নিয়ম SOW-এ লেখা থাকবে।
5. **HITL:** কম confidence-এর output, lead disqualify করা, আর বাইরে যাওয়া sensitive message, সবকিছু মানুষ review করবেন।
6. **Offboarding:** handoff বা contract শেষ হলে access revoke, key rotate করার অনুরোধ, লিখিত confirmation।
7. **Dhaka-র infrastructure:** UPS আর backup mobile internet রাখুন। Care-plan SLA-তে "1 business day" লিখুন, "instant" নয়।

---

## 8. Legal ও finance (Bangladesh থেকে)

### 8.1 Payment rails

| Rail | Status (Oct 2026) | ব্যবহার |
|---|---|---|
| **Upwork** | চালু। Local bank-এ $0.99, Payoneer-এ ~$2 ([ElevatePay](https://www.elevatepay.co/blog/upwork-fees-bangladesh)) | Marketplace client |
| **Payoneer** | USD ACH/SWIFT receiving। bKash বা local bank-এ withdrawal ([bKash](https://www.bkash.com/en/products-services/payoneer)) | **Direct ও agency client-এর প্রধান rail** |
| nsave / ElevatePay / PriyoPay | USD ACH receiving, BDT payout ([nsave](https://www.nsave.com/bangladesh/wise)) | Backup (একটা আগে থেকে verify করে রাখুন) |
| Wise (receiving), PayPal, Stripe, Mercury | **Bangladesh resident-দের জন্য পাওয়া যায় না** ([GlobalSolo](https://www.globalsolo.global/blog/us-bank-account-bangladeshi-founder-getting-paid-2026), [TBS](https://www.tbsnews.net/node/1411786)) | ব্যবহার করবেন না, বা এসব দিয়ে workaround খুঁজবেন না |

**শর্ত:** setup 50% upfront / 50% on delivery ([Digital Agency Network](https://digitalagencynetwork.com/ai-automation-pricing/))। Care plan মাসের শুরুতে advance-এ। Invoice net 7। 14 দিন পেরোলে কাজ বন্ধ। Agency partner: প্রথম 2টি build-এ 50/50, তারপর net 15।

**Upwork সতর্কতা:** Upwork-এ পাওয়া client-কে Upwork-এর বাইরে নেওয়া circumvention policy-র আওতায় পড়ে (সাধারণত 24 মাসের নিয়ম আর conversion fee; Upwork ToS-এ যাচাই করুন)। Pilot discount আর off-platform deal শুধু cold email, LinkedIn বা referral থেকে আসা client-এর জন্য।

### 8.2 Invoicing
- প্রতিটি invoice-এ থাকবে: Growrix OS-এর নাম, **Mohammad-এর legal name (Payoneer KYC-র নামের সঙ্গে হুবহু মিলতে হবে)**, Dhaka-র address, invoice number, SOW reference, milestone, USD amount, Payoneer payment details।
- Invoice পাঠানো হবে Payoneer "Request a payment" দিয়ে, অথবা PDF template + Payoneer receiving account দিয়ে।
- প্রতিটি inward remittance-এর record (bank বা PRC) রাখুন। এটা cash incentive আর tax exemption দুটোর জন্যই লাগবে।

### 8.3 Contracts (MSA + SOW)। Template একজন lawyer-কে একবার review করিয়ে নিন (অনুমান: $150–400 এককালীন খরচ)
- **MSA (একবার sign হবে):** payment terms, IP, confidentiality, data protection, warranty (30-day fix), **liability cap = গত 12 মাসে দেওয়া fee**, indirect damage বাদ, termination, non-solicit, governing law ও dispute resolution। Offshore buyer foreign-law IP নিয়ে চিন্তা করেন ([Full Scale](https://fullscale.io/blog/offshore-development-reference-checks/))। তাই client-এর jurisdiction বা একটা neutral jurisdiction প্রস্তাব করুন, সঙ্গে online arbitration (lawyer-এর পরামর্শ নিন)।
- **SOW (প্রতিটি project-এ):** deliverables, **out-of-scope list**, timeline, acceptance criteria, milestone payment, client-এর দায়িত্ব (access, data, tool subscription)।
- **IP:** পুরো payment হলে client-specific deliverable-এর মালিকানা client-এর। **Growrix-এর pre-existing IP** (LedgerLine component, reusable n8n module, prompt library) Growrix-এর থাকবে, client পাবেন perpetual, non-exclusive license। এটা margin রক্ষার জন্য জরুরি।
- **DPA basics:** client controller, Growrix processor। Processing-এর বিষয় ও উদ্দেশ্য, sub-processor-এর তালিকা (n8n, Anthropic, Twilio, যা client-এর account-এ চলছে), security measure, breach notice (যেমন 72 ঘণ্টার মধ্যে), কাজ শেষে deletion বা return। **UK/EU client-এর ক্ষেত্রে** UK GDPR/GDPR Art. 28-এর processor terms লাগবে। Bangladesh-এ transfer হলে transfer mechanism (UK IDTA বা SCC addendum) লাগতে পারে। এগুলো research-এ যাচাই হয়নি, তাই UK client নেওয়ার আগে নিশ্চিত হয়ে নিন।
- **Vertical-specific (যাচাই করুন, research-এ গভীরভাবে দেখা হয়নি):** Law firm-এর ক্ষেত্রে client confidentiality আর non-lawyer vendor supervision-এর নিয়ম আছে (US bar rules, UK SRA)। US tax preparer-দের ক্ষেত্রে tax return information-এর গোপনীয়তা আর FTC Safeguards Rule-এর অধীনে service-provider oversight-এর বাধ্যবাধকতা আছে। সাধারণত vendor-কে confidentiality আর security clause sign করতে হয়। প্রথম client-এর আগে প্রত্যেকটা নিজে যাচাই করুন।
- **Agency partner:** white-label confidentiality, end-client non-solicit (12–24 মাস), subcontractor IP assignment agency-র কাছে (payment সাপেক্ষে)।

### 8.4 Bangladesh incentive ও tax (সতর্কতা সহ)

| বিষয় | তথ্য | সতর্কতা |
|---|---|---|
| Freelancing income tax | Finance Act 2026: freelancing income exempt ([PwC BD](https://www.pwc.com/bd/en/assets/pdfs/budget/finance-act-2026-key-amendments.pdf)) | তবু return file করতে হবে। এটা "freelancing" নাকি "ITES business", সেটা tax practitioner-কে দিয়ে নিশ্চিত করান |
| ITES exemption | 30 Jun 2027 পর্যন্ত। "Website development" আর "IT Freelancing" তালিকায় আছে, SEO আলাদা করে নেই ([LegalSeba](https://legalseba.com/bd-resources/tax-exemption-for-information-technology-enabled-services-ites-in-bangladesh/)) | Return filing আর exemption certificate লাগতে পারে। Expiry-র পর কী হবে, তা পরিকল্পনায় রাখুন |
| Cash incentive | Individual freelancer 2.5%, ITES company 6% ([socialprotection.gov.bd](https://socialprotection.gov.bd/wp-content/uploads/2026/02/Bangladeshs-500M-Industry.pdf)) | Recognized channel-এর audit trail লাগে। Subsidy-র ওপর 5% withholding ([PwC](https://www.pwc.com/bd/en/assets/pdfs/budget/finance-act-2026-key-amendments.pdf))। LDC graduation-এর পর incentive কমে যেতে পারে ([Financial Express](https://thefinancialexpress.com.bd/economy/ldc-graduation-deferral-decision-due-september)) |
| Repatriation | ~4 মাসের মধ্যে দেশে আনুন। Incentive দাবি আর FX নিয়ম মানা দুটোর জন্যই ([GlobalSolo](https://www.globalsolo.global/blog/us-bank-account-bangladeshi-founder-getting-paid-2026)) | Circular-টি Bangladesh Bank-এর site-এ যাচাই হয়নি |
| Paperwork | FY27 budget অনুযায়ী $5,000 পর্যন্ত formalities ছাড়া আনা যায় ([UNB](https://unb.com.bd/category/Bangladesh/budget-allows-freelancers-content-creators-to-remit-5000-without-paperwork-minister/188852)) | Freelancer ID (Jan 2026) নিয়ে নিন, কিন্তু bank হাতে লেখা earning certificate চাইতে পারে |

**Action:** M1-এ একজন tax practitioner-এর সঙ্গে 1 ঘণ্টা বসুন। TIN/return, incentive-এর জন্য কী document লাগবে, আর ITES vs freelancing classification, তিনটি বিষয় পরিষ্কার করে নিন।

### 8.5 US LLC — pros/cons

| Pros | Cons |
|---|---|
| US buyer-এর কাছে "US entity" হিসেবে বেশি trust | Form 5472 প্রতি বছর, revenue $0 হলেও। জমা না দিলে **প্রতি form-এ $25,000 penalty** ([GlobalSolo](https://www.globalsolo.global/blog/stripe-atlas-vs-firstbase-vs-doola-pricing-comparison-2026)) |
| ভবিষ্যতে Stripe বা US payment processor ব্যবহারের পথ খোলে | **Bank account পাওয়াটাই কঠিন।** Mercury Bangladesh-কে prohibited করেছে ([GlobalSolo](https://www.globalsolo.global/blog/us-bank-account-bangladeshi-founder-getting-paid-2026)) |
| Contract-এ US-entity counterparty | বছরে ~$500–2,000 compliance খরচ (Delaware franchise $400, registered agent, 5472 filing) |
| — | Bangladesh-এর repatriation আর incentive নিয়ম তবু প্রযোজ্য, ফলে কাগজপত্রের কাজ দ্বিগুণ |

**সিদ্ধান্ত:** **এখন নয়।** আবার ভাববেন যখন (a) টানা 3 মাস revenue ≥$8k, (b) কোনো bank (Mercury নয়) আসলে account approve করেছে, আর (c) অন্তত 2 জন buyer US entity চেয়েছেন।

---

## 9. Risks ও mitigations

| # | Risk | সম্ভাবনা / প্রভাব | Mitigation |
|---|---|---|---|
| 1 | Cold email reply rate খুব কম (typical 0.74%, [Smartlead](https://www.smartlead.ai/benchmarks)) | উচ্চ / উচ্চ | <50 শব্দের first email, trigger-based list, শুধু reply করলে Loom। §11-এর copy-rewrite rule। Track 1 দিয়ে cash flow চালু রাখা |
| 2 | Deliverability বা domain burn | মাঝারি / উচ্চ | Secondary domain, SPF/DKIM/DMARC, inbox-প্রতি দিনে ≤25–30 email, bounce <2%, complaint <0.1% ([Close](https://help.close.com/docs/requirements-for-bulk-email-senders)) |
| 3 | Compliance (CAN-SPAM, PECR, CASL, Spam Act) | মাঝারি / উচ্চ | US-কে অগ্রাধিকার। UK-তে শুধু limited company। CA/AU-তে শুধু conspicuously published address, সঙ্গে source log। Physical address আর opt-out দেওয়া |
| 4 | Split test অস্পষ্ট বা ছুটির মৌসুমে বিকৃত (Dec) | উচ্চ / মাঝারি | Fixed rule: default accounting। দরকার হলে 2 সপ্তাহ বাড়ানো, কিন্তু day 75-এর বেশি নয় |
| 5 | Upwork account risk (off-platform, review-এর জন্য free কাজ) | কম / উচ্চ | Policy মানা। Pilot discount শুধু off-platform lead-এর জন্য |
| 6 | Payoneer hold বা freeze | কম / উচ্চ | KYC-র নাম আর invoice-এর নাম মেলানো। Backup fintech আগেই verify করে রাখা। ~4 মাসের মধ্যে repatriation |
| 7 | Client data breach বা credential leak | কম / খুব উচ্চ | §7.5 SOP, client-owned account, DPA, liability cap, 2FA |
| 8 | AI ভুল (ভুলভাবে lead disqualify, ভুল document classification) | মাঝারি / উচ্চ | HITL, confidence threshold, 20–50 sample-এর QA, monthly prompt review |
| 9 | Scope creep | উচ্চ / মাঝারি | SOW-এ out-of-scope list। Change request = Sprint quote। Care-hour cap |
| 10 | Capacity বা burnout (M7 থেকে >120h) | উচ্চ / উচ্চ | §11-এর price-raise আর subcontract rule। Upwork micro-job বন্ধ করা। Module reuse |
| 11 | Concentration (একজন agency partner বা client-এর ওপর নির্ভরতা) | মাঝারি / মাঝারি | এক source থেকে revenue-র ≤30% |
| 12 | Funded voice-AI vendor (law) | উচ্চ / মাঝারি | Voice product না বানানো। Clio/MyCase integration আর document flow-কেই মূল offer রাখা |
| 13 | Accounting seasonality (US Jan–Apr 15) | উচ্চ / মাঝারি | Oct–Dec আর Apr–May-এ sell করা। Busy season-এ UK/AU আর monthly-close bookkeeper-কে লক্ষ্য করা |
| 14 | Trust ঘাটতি (BD identity, নামের অমিল, unverifiable claim) | উচ্চ / উচ্চ | Day-1 এ নাম এক করা, fake-looking claim মুছে ফেলা, founder-এর face আর video, published price, guarantee |
| 15 | Platform বা policy পরিবর্তন (n8n pricing, CRM API, BD incentive/LDC) | মাঝারি / মাঝারি | Client-owned stack, tool-agnostic design (n8n/Make/code), প্রতি quarter-এ tax review |
| 16 | Dhaka-য় বিদ্যুৎ বা internet বিভ্রাট | মাঝারি / মাঝারি | UPS, backup 4G, "1 business day" SLA |

---

## 10. এখনই যেসব decision নিতে হবে (checklist)

- [ ] **Public founder name:** "Mohammad" নাকি "Nayeem"? Site, Upwork, LinkedIn, Payoneer KYC, contract আর invoice-এ legal name এক হতে হবে। *(Day 1)*
- [ ] Custom-domain email (`@growrixos.com`) চালু করুন। Google Workspace $7/mo। *(Day 1–2)*
- [ ] growrix-os.vercel.app থেকে growrixos.com-এ 308 redirect আর canonical। Vercel plan ঠিক করুন (Hobby নাকি Pro)।
- [ ] Final price point-এ সম্মতি: Intake Standard $3,500, Doc Chase Standard $2,500, Audit $297 (launch), Care $300/$500/$1,000, Agency $500/$1,000/$1,500 + $100–300।
- [ ] Pilot terms: প্রথম 3 জন direct client ~40% ছাড় পাবেন, বিনিময়ে named case study, testimonial (video হলে ভালো) আর metric শেয়ারের অনুমতি। Pilot price-এ care plan-এর ছাড়ও থাকবে কি? (সুপারিশ: না, care থাকবে list price-এ)
- [ ] Guarantee-এর wording: "30-day fix guarantee" (bug-fix)। Money-back হবে কি? (সুপারিশ: না, শুধু fix)
- [ ] Cold email tool: Smartlead Base $39 নাকি Instantly Growth $47। Secondary domain-এর নাম। Inbox provider।
- [ ] Fiverr: একটা gig রাখবেন কি? (সুপারিশ: হ্যাঁ, একটা n8n + Claude gig, maintenance-mode-এ)
- [ ] Hosting policy: শুধু client-owned n8n (সুপারিশ), নাকি Growrix-managed hosting add-on-ও?
- [ ] Contract template-এর উৎস আর lawyer review। Governing law নিয়ে অবস্থান।
- [ ] Tax practitioner appointment (M1)। Backup fintech (nsave/ElevatePay) KYC।
- [ ] Subcontractor policy: কখন, কাকে, কোন কাজে (শুধু build support, client contact নয়), NDA আর IP assignment সহ।
- [ ] Credential SOP final করে Security page-এ publish করা।
- [ ] US LLC: **এখন নয়** (§8.5-এর trigger)। লিখে রাখুন যাতে বারবার আলোচনা না হয়।
- [ ] Weekly time budget: delivery, sales/outreach আর content-এর ঘণ্টা আলাদা করে ঠিক করুন (যেমন 60/30/10%)।

---

## 11. KPIs ও decision rules

### Weekly / monthly KPI

| Area | KPI | Target | উৎস / ভিত্তি |
|---|---|---|---|
| Cold email | Reply rate | ≥0.75% (typical), stretch 1.4% | [Smartlead](https://www.smartlead.ai/benchmarks) |
| | Positive reply (of sends) | ≥0.25% | ~30% of replies ([Skool example](https://www.skool.com/learn-ai/closed-5k-in-less-then-30-days-of-starting-my-ai-agency), self-reported) |
| | Bounce / spam complaint | <2% / <0.1% (hard limit 0.3%) | [Smartlead](https://www.smartlead.ai/benchmarks), [Close](https://help.close.com/docs/requirements-for-bulk-email-senders) |
| LinkedIn | Acceptance / reply | ≥25% / ≥8% | [Expandi](https://expandi.io/blog/linkedin-outreach-benchmarks-2026/) (28.5% / 10.4%) |
| Upwork | Proposals/mo, win rate | 30–40, ≥5% after first 40 | [Vortenza](https://www.vortenza.com/tools/upwork-proposal-calculator) (3–8%, unsourced) |
| Sales | Qualified call → close | 15–30% | [Prospeo](https://prospeo.io/s/average-sales-close-rate) |
| | Audit → build conversion | ≥50% | অনুমান |
| Delivery | On-time delivery | ≥90% | — |
| | Delivery hours/mo | ≤120 | §5 |
| | Effective $/hr (blended) | ≥$40 by M4, ≥$60 by M9 | §4 |
| Retention | Care attach | ≥60% (base 75%) | §6 |
| | Monthly churn | ≤5% | §6 |
| Finance | MRR | $1.5k by M6, $4–5k by M12 (base) | §6 |
| | Collections | 100% within 14 days | — |
| | Concentration | কোনো একক source থেকে ≤30% | — |

### Decision rules (if → then)

1. **Niche winner (canonical নিয়ম — সব ডকুমেন্টে একই; বিস্তারিত `03 Marketing plan.md`):** প্রাথমিক পাঠ Dec 21 (~day 50), চূড়ান্ত সিদ্ধান্ত **Jan 6–8** (ছুটিতে দেরিতে আসা reply গুনে)। একটা niche জিতবে যদি positive reply অন্যটির **≥2x**, absolute পার্থক্য **≥3**, এবং booked call **≥1 বেশি**। Law যদি call-এ স্পষ্টভাবে এগিয়ে থাকে, বেশি deal value-র কারণে law নেওয়া যায়। অস্পষ্ট হলে → **accounting (default)**। দুই niche-এই <2 positive reply হলে আগে deliverability/copy ঠিক করে re-test। Test কোনোভাবেই day 75 (Jan 15)-এর বেশি টানা যাবে না।
2. **Copy বা list ব্যর্থ:** কোনো niche-এ 1,000 send-এর পর positive reply <0.15% হলে copy আর list বদলান (একবারে একটা variable)। 2 বার rewrite-এর পরও <0.15% থাকলে hook বদলান, offer নয়।
3. **Deliverability:** bounce >2% বা complaint >0.1% হলে সেই inbox-এ পাঠানো বন্ধ। List verify করুন, warmup আবার চালু করুন।
4. **Upwork:** 40টি proposal পাঠিয়েও 0টি hire হলে profile title, skill tag আর first 2 line নতুন করে লিখুন (Uma shortlist-এর keyword: "n8n automation", "AI agent", "Claude")। M4-এর পর $300-এর নিচের job আর নেবেন না।
5. **Price বাড়ানো:** 3টি pilot case study publish হলে launch price শেষ। Close rate টানা 2 মাস >40% হলে, অথবা pipeline-এ ≥3 সপ্তাহের backlog থাকলে, Standard price +15–20%।
6. **Capacity:** delivery hours টানা 2 মাস >120 হলে (base case-এ M9–M10) part-time subcontractor আনুন (প্রথমে ~40h/mo, শুধু build support), এবং/অথবা rule 5 প্রয়োগ করুন। Care client-এর সংখ্যা >15 হলে নতুন build-এর lead time জানিয়ে দিন।
7. **Care plan:** attach <50% হলে day 25-এর offer আর monthly ROI report পর্যালোচনা করুন। Care-এর কাজ টানা 2 মাস cap ছাড়ালে client-কে উপরের tier-এ নিন।
8. **Agency channel:** 60 দিনে 0টি partner পেলে pitch-এ "add an AI offer without hiring" আর একটা ready-made demo যোগ করুন। একজন partner revenue-র >30% হলে নতুন partner খোঁজাকে অগ্রাধিকার দিন।
9. **Revenue checkpoint:** M6-এ monthly gross <$3k (conservative-এর নিচে) হলে 2 সপ্তাহের review করুন: channel mix, offer আর price-to-value। Upwork-এ Project Catalog listing যোগ করুন। Paid ads তবু নয়।
10. **Sales Navigator:** শুধু তখনই কিনবেন যখন LinkedIn থেকে মাসে ≥2টি call আসছে।
11. **US LLC:** §8.5-এর তিনটি শর্ত পূরণ না হওয়া পর্যন্ত বিষয়টা খোলা হবে না।

---

*মূল সতর্কতা: price band আর funnel-এর হিসাবের বেশিরভাগ vendor blog আর একটি self-reported উদাহরণ থেকে নেওয়া। প্রথম 60 দিনের নিজের data যদি এই অনুমান থেকে আলাদা হয়, তাহলে নিজের data-কেই অগ্রাধিকার দিন, আর §6-এর model সেই অনুযায়ী আপডেট করুন।*
