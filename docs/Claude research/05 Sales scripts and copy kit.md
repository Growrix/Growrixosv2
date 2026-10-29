# Growrix OS: Sales Scripts & Copy Kit

**এই kit কী:** Cold email, LinkedIn, Upwork, Fiverr, Loom, call, proposal আর follow-up-এর জন্য copy-paste করার মতো লেখা। নোটগুলো বাংলায়, আর client-কে যা পাঠাবেন সব English-এ। `{{placeholder}}` বদলে পাঠান।

**Positioning (00_fixed_decisions অনুযায়ী):** "AI automation systems for professional service firms" (n8n + Claude), outcome-led: কোনো inquiry miss হবে না, lead-এ দ্রুত reply যাবে, document-এর পেছনে ছুটতে হবে না। Generalist studio হিসেবে pitch করবেন না।

---

## 0. পাঠানোর আগে: নিয়ম, placeholder আর proof library

### 0.1 পাঁচটা নিয়ম যা কখনো ভাঙবেন না

1. **শুধু সৎ proof দেখাবেন।** LedgerLine v3 (document-intake demo), Upwork portfolio-র 6টি demo automation, প্রকাশিত n8n template, আর নিচের library-র stat। কোনো client result, testimonial, client সংখ্যা বা "trusted by" লেখা যাবে না। এগুলো real না হওয়া পর্যন্ত বানানো যাবে না।
2. **LedgerLine আর demo-গুলোকে সবসময় "demo" বা "internal build" বলবেন।** কখনো "client project" বলবেন না।
3. **"I" ব্যবহার করুন, "we team" নয়।** আপনি একা কাজ করেন। একজন buyer পরে এটা জানতে পারলে বিশ্বাস হারাবেন।
4. **Location খোলাখুলি বলুন** (Dhaka, Bangladesh, UTC+6)। Time zone-কে সুবিধা হিসেবে দেখান।
5. **নিষিদ্ধ শব্দ:** revolutionize, game-changer, cutting-edge, supercharge, unlock, seamless, skyrocket, 10x, "AI employee", "fully autonomous", "guaranteed leads"। HIPAA/SOC 2/GDPR "compliant" দাবিও করবেন না।

> **Founder name:** About page-এ "Nayeem", কিন্তু owner Mohammad। পাঠানো শুরুর আগেই একটা নাম ঠিক করুন, তারপর Upwork, LinkedIn, site আর email signature-এ সেটাই ব্যবহার করুন। এই kit-এ নামের জায়গায় `{{founder_name}}` রাখা আছে।

### 0.2 Placeholder glossary

| Placeholder | মানে / উদাহরণ |
|---|---|
| `{{first_name}}`, `{{firm_name}}`, `{{agency_name}}` | Prospect-এর নাম, firm বা agency-র নাম |
| `{{founder_name}}`, `{{sender_first_name}}` | আপনার public নাম (একটাই) |
| `{{personalization_line}}` | প্রতিটি prospect-এর জন্য আলাদা একটি বাক্য (1.4 দেখুন) |
| `{{practice_area}}` | personal injury / immigration |
| `{{practice_mgmt_tool}}` | Clio, MyCase, Lawmatics, Filevine. না জানলে "your case management system" |
| `{{doc_storage}}` | Google Drive, SharePoint, Karbon, TaxDome, QuickBooks |
| `{{crm_platform}}` | GoHighLevel, HubSpot, Pipedrive |
| `{{demo_name}}`, `{{demo_link}}` | আপনার 6টি demo-র যেকোনোটির title/link, Upwork-এ যেভাবে publish করা আছে ঠিক সেভাবে |
| `{{ledgerline_link}}` | LedgerLine demo-র Loom বা portfolio link |
| `{{template_link}}` | প্রকাশিত n8n Creator Hub template। প্রকাশ না হলে লাইনটা মুছে দিন |
| `{{postal_address}}` | আসল postal address। Dhaka-র ঠিকানা চলে, অথবা একটা virtual mailbox |
| `{{unsubscribe_link}}` | Sending tool-এর unsubscribe link (Smartlead/Instantly) |
| `{{overlap_window}}` | যেমন "8–11am US Eastern" (EDT-এ Dhaka 6–9pm, EST-এ 7–10pm) বা "9am–1pm UK" (BST-এ Dhaka 2–6pm, GMT-এ 3–7pm) |
| `{{booking_link}}` | Cal.com link (real-time booking) |
| `{{season}}` | "tax season", "year-end", "month-end close" |

### 0.3 Proof & stats library (শুধু এগুলোই cite করবেন, এই wording-এ)

| # | Copy-তে যেভাবে লিখবেন | উৎস | সতর্কতা |
|---|---|---|---|
| S1 | "Clio's 2024 Legal Trends Report found 48% of law firms neither answered the phone nor called back a prospective client." | [Clio 2024 via 2Civility/IAALS](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/) | Secret-shopper study, সব ধরনের law firm। শুধু PI firm-এর data নয় |
| S2 | "Only 40% of firms answered calls in Clio's 2024 study, down from 56% in 2019." / "33% answered emails." | একই | একই |
| S3 | "Only 7% of law firms use a website chatbot, while 51% of prospective clients see one as a useful starting point." | একই | একই |
| S4 | "Personal injury firms pay around $284 per lead (Rankings.io's analysis of 13 firms' ad spend)." | [Rankings.io](https://rankings.io/personal-injury-lead-costs/) | Sample ছোট (13টি firm), উৎস একটি agency। Immigration-এ ব্যবহার করবেন না |
| S5 | "A Harvard Business Review study of 2,241 companies found firms that contacted a lead within an hour were nearly 7x more likely to qualify it." | [HBR 2011](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) | Data পুরনো (2011)। "classic study" বলুন |
| S6 | "Mango's 2025 survey found 69% of accounting firms struggle to get client documents on time." | [Stealth Agents compilation](https://stealthagents.com/research/accounting-client-document-collection-workload-statistics-2026) | Secondary compilation। বেশি ব্যবহারের আগে Mango-র original খুঁজে নিন |
| S7 | "In Financial Cents' data, getting documents from clients is the top workflow challenge (65.2%, up from 53.8%)." | একই | একই |
| S8 | "A 2024 Canopy survey of 240 firms found client communication takes 9.3 hours a week." | একই | একই |
| S9 | "Karbon's 2025 report: firms using AI save about 18 hours per employee per month; 70% of firms worry about data security." | [CPA Practice Advisor / Karbon](https://www.cpapracticeadvisor.com/2025/02/20/report-shows-firms-that-embrace-ai-have-competitive-advantage/156365/) | 18 ঘণ্টা সব ধরনের AI ব্যবহারের হিসাব, শুধু automation-এর নয়। "firms using AI" বলুন |
| S10 | "CallRail's 2025 agency outlook found 62% of marketing agencies plan to implement AI." | [CallRail PDF](https://cdn.mediavalet.com/usva/callrail/dR4GkaMLLkKjeisNH22zjQ/1C0nbRtR0kyLPvwqJtgyOQ/Original/CallRail_2025%20Outlook%20for%20Marketing%20Agencies_Ebook.pdf) | একই report-এ মাত্র 17% outsourcing-কে priority বলেছে। তাই "outsourcing" শব্দটা pitch-এ ব্যবহার করবেন না |
| S11 | "Goldman Sachs surveyed 1,256 US small business owners: 76% use AI, but only 14% say it's fully embedded in core operations." | [BusinessWire](https://www.businesswire.com/news/home/20260317141697/en/Survey-Small-Businesses-Embrace-AI-But-Need-Training-and-Support-to-Fully-Harness-It) | — |
| S12 | "Gartner expects over 40% of agentic AI projects to be cancelled by the end of 2027." | [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) | AI-hype objection-এর উত্তরে কাজে লাগে |

**Proof asset (সৎভাবে যা দেখানো যায়):** LedgerLine v3 document-intake demo · Upwork-এর 6টি demo automation · n8n template (প্রকাশ হওয়ার পর) · fixed price আর fixed scope · 30-day fix guarantee · client-owned account-এ build।

> LedgerLine-এর বর্ণনা ("checklist → reminders → uploads sorted and filed") v3-এর আসল feature-এর সঙ্গে মিলিয়ে নিন। যে feature নেই সেটা copy থেকে কেটে দিন।

---

## 1. Cold email sequences

### 1.1 Compliance checklist (প্রতিটি campaign-এর আগে)

- **US (CAN-SPAM):** প্রতিটি email-এ আসল postal address, কাজ করে এমন unsubscribe, সঠিক From/Reply-To থাকতে হবে। Opt-out 10 business day-এর মধ্যে কার্যকর করতে হবে। Subject-এ "Re:"/"Fwd:" দেওয়া যাবে না, ভুয়া urgency বা misleading কথাও না। Email-টা যে business offer, সেটা পড়েই যেন বোঝা যায়। নিচের template-গুলো এভাবেই লেখা।
- **UK (PECR + UK GDPR):** শুধু **limited company আর LLP**-তে পাঠাবেন। Sole trader আর কিছু partnership-এ consent ছাড়া পাঠানো যাবে না। অনেক ছোট UK accounting practice partnership, তাই Companies House-এ "Ltd/LLP" কিনা যাচাই করুন। প্রতিটি email-এ নিজের পরিচয় আর opt-out থাকবে। একটা legitimate-interests assessment (এক পাতা) লিখে রাখুন।
- **Canada (CASL) / Australia (Spam Act):** সাবধান। শুধু সেই address-এ পাঠান যেটা প্রকাশ্যে দেওয়া আছে আর recipient-এর ভূমিকার সঙ্গে email-এর বিষয় মেলে। কোথায় address পেয়েছেন তার source URL আর তারিখ log করুন। কেনা বা scrape করা list চলবে না। সন্দেহ থাকলে এই দুই দেশে email না করে LinkedIn ব্যবহার করুন।
- Google Maps scrape করে list বানাবেন না (Maps Terms-এ নিষিদ্ধ)।
- Spam complaint 0.3%-এর নিচে রাখুন (আদর্শ 0.1%)। Open rate দেখবেন না, reply দেখবেন।

### 1.2 Standard footer (প্রতিটি email-এর শেষে, বদলাবেন না)

```text
--
{{founder_name}} · Growrix OS · growrixos.com
{{postal_address}}
Not relevant? Reply "unsubscribe" or click {{unsubscribe_link}} and I won't email you again.
```

> Word count (50–90) শুধু body-র, footer বাদে। Plain text পাঠান: image, tracking pixel বা link-heavy signature দেবেন না। প্রথম email-এ link দেবেন না।
> Timing: Step 1 → Day 1, Step 2 → Day 4, Step 3 → Day 9, Step 4 → Day 16।

### 1.3 (a) Law firms: PI / immigration (speed-to-lead, missed intake)

> Immigration firm-এর জন্য S4 ($284) ব্যবহার করবেন না, কারণ ওটা PI-এর data। Immigration-এর আলাদা কোনো stat পাওয়া যায়নি। Step 1-এর দ্বিতীয় বাক্যের জায়গায় নিচের alt line দিন।

**Step 1 (Day 1)**
- Subject A: `after-hours intake at {{firm_name}}`
- Subject B: `question about {{firm_name}} intake`

```text
Hi {{first_name}},

Clio's 2024 study found 48% of law firms neither answered the phone nor called back a prospective client. When a PI lead costs around $284 (Rankings.io), every unanswered inquiry is paid-for silence.

{{personalization_line}}

I build intake systems that reply to every web, chat and missed-call inquiry within minutes, ask your screening questions, and log it in {{practice_mgmt_tool}}.

Worth a 3-minute video showing how this would work at {{firm_name}}?

{{sender_first_name}}
```

*Immigration alt line (দ্বিতীয় বাক্যের বদলে):* `For an immigration practice, each consult request that goes unanswered usually ends up with the next firm on the search page.`

**Step 2 (Day 4)**
- Subject A: `the first hour after an inquiry`
- Subject B: `{{firm_name}} after 6pm`

```text
Hi {{first_name}},

A classic Harvard Business Review study of 2,241 companies found that contacting a lead within an hour made it nearly 7x more likely to qualify. That's hard to hit when inquiries come in after hours or while your team is in court.

What I'd set up: an instant text and email reply, a few screening questions, a consult booking link, and a note in {{practice_mgmt_tool}} for your intake team. Nothing reaches a prospect without rules you approve.

Want the short video?

{{sender_first_name}}
```

**Step 3 (Day 9)**
- Subject A: `a working demo instead of a pitch deck`
- Subject B: `intake demo for {{practice_area}} firms`

```text
Hi {{first_name}},

I'll be straight with you: I run a small studio based in Dhaka, Bangladesh, and I don't have law-firm case studies to show yet.

What I do have: working demos you can click through, a fixed price agreed before any work starts, everything built inside accounts your firm owns, and a 30-day fix guarantee.

If useful, I'll record a free 3-minute review of how a new inquiry moves through {{firm_name}}'s website today. A yes or no is fine.

{{sender_first_name}}
```

**Step 4 (Day 16, breakup)**
- Subject A: `closing the loop on intake`
- Subject B: `should I stop emailing?`

```text
Hi {{first_name}},

I haven't heard back, so I'll assume intake isn't a priority right now and stop here.

If that changes, one reply is enough. I'll send a short video mapping how inquiries reach {{practice_mgmt_tool}} today and where they slip through, with no call needed.

Either way, thanks for reading, and good luck with your cases this quarter.

{{sender_first_name}}
```

### 1.4 (b) Accounting / bookkeeping (document chasing)

> UK firm-কে পাঠানোর আগে Ltd/LLP কিনা যাচাই করুন (1.1 দেখুন)। US CPA firm আর UK Ltd bookkeeping practice দুটোতেই এই sequence চলবে।

**Step 1 (Day 1)**
- Subject A: `client documents at {{firm_name}}`
- Subject B: `chasing bank statements every {{season}}`

```text
Hi {{first_name}},

Mango's 2025 survey found 69% of accounting firms struggle to get client documents on time.

{{personalization_line}}

I build document-intake automation: each client gets a checklist of what's missing, reminders go out on a schedule, and uploads are sorted and filed into {{doc_storage}}, with a status view for your team.

I have a working demo called LedgerLine. Want a 3-minute video of it, mapped to how {{firm_name}} collects documents now?

{{sender_first_name}}
```

**Step 2 (Day 4)**
- Subject A: `the reminder emails nobody wants to write`
- Subject B: `9.3 hours a week on client messages`

```text
Hi {{first_name}},

A 2024 Canopy survey of 240 firms found client communication takes 9.3 hours a week. Much of that is the same reminder, rewritten for each client.

The system I set up sends polite, escalating reminders only for what's still missing, and stops as soon as the file arrives. Anything unusual waits for your staff to approve before it goes out.

Is document chasing on your list before {{season}}?

{{sender_first_name}}
```

**Step 3 (Day 9)**
- Subject A: `where your client files would go`
- Subject B: `the data question, answered up front`

```text
Hi {{first_name}},

Karbon's 2025 report found 70% of firms worry about AI and data security, so here's my answer before you ask.

Everything runs in accounts your firm owns. I work with least-privilege access, no client files stay on my machines, and the AI only reads documents you choose to route to it. I'm based in Dhaka, Bangladesh, and available {{overlap_window}}.

Want a one-page security summary plus the LedgerLine demo video?

{{sender_first_name}}
```

**Step 4 (Day 16, breakup)**
- Subject A: `last note on document chasing`
- Subject B: `should I close your file?`

```text
Hi {{first_name}},

I haven't heard back, so I'll take that as "not now" and stop emailing.

If chasing documents becomes a headache again before {{season}}, reply with one word and I'll send a short video showing how intake and reminders would work at {{firm_name}}, using your current tools.

Thanks for your time either way.

{{sender_first_name}}
```

### 1.5 (c) Marketing / web agencies (white-label: "add an AI offer without hiring")

> "Outsourcing" শব্দটা ব্যবহার করবেন না (S10: মাত্র 17% agency এটাকে priority মনে করে)। Wholesale price ($500–1,500/build, $100–300/mo per client) একটা অনুমান, কোনো sourced benchmark নেই। প্রথম 2–3টি deal-এর পর দাম ঠিক করে নিন।

**Step 1 (Day 1)**
- Subject A: `an AI offer for {{agency_name}} clients`
- Subject B: `adding AI services without a new hire`

```text
Hi {{first_name}},

CallRail's 2025 outlook found 62% of agencies plan to roll out AI. Hiring an automation developer for a handful of client builds rarely makes sense, though.

{{personalization_line}}

I build AI and automation work under your brand: missed-call text-back, lead follow-up, intake bots and {{crm_platform}} integrations. You own the client and set the price. I deliver in the background.

Open to seeing a sample build?

{{sender_first_name}}
```

**Step 2 (Day 4)**
- Subject A: `how the wholesale numbers work`
- Subject B: `fixed wholesale pricing for {{agency_name}}`

```text
Hi {{first_name}},

Quick follow-up with the model, since that's usually the first question:

I quote you a fixed wholesale price per build, typically $500–1,500 depending on scope, plus an optional monthly care fee per client. You set your retail price and keep the margin.

Every build comes with a written scope, a walkthrough video you can rebrand for your client, and a 30-day fix window.

Worth 15 minutes to see if it fits?

{{sender_first_name}}
```

**Step 3 (Day 9)**
- Subject A: `white-label means I stay invisible`
- Subject B: `NDA first, then the build`

```text
Hi {{first_name}},

One concern I hear from agencies: "What if the contractor goes around me?"

My rules: I sign your NDA before seeing any client details, I never contact your clients unless you ask me to, and everything is built inside your or your client's accounts, so you keep full access.

I'm a solo builder in Dhaka, Bangladesh, which means your client work moves overnight your time. Want to see one of my demo builds?

{{sender_first_name}}
```

**Step 4 (Day 16, breakup)**
- Subject A: `closing this out`
- Subject B: `last note from me`

```text
Hi {{first_name}},

I'll stop here, since AI services may not be on the roadmap for {{agency_name}} right now.

If a client ever asks for missed-call text-back, an intake bot or a {{crm_platform}} automation you don't want to build in-house, reply to this thread. I'll send a fixed quote within a day.

Thanks, and good luck with the quarter.

{{sender_first_name}}
```

### 1.6 Personalization ideas (`{{personalization_line}}`)

> নিয়ম: যা যাচাই করতে পারবেন শুধু তা-ই লিখুন। প্রশংসা নয়, বরং পর্যবেক্ষণ লিখুন। কিছু না পেলে লাইনটা মুছে দিন। ভুল personalization না দেওয়ার চেয়েও খারাপ।

**Law firms (website থেকে):**
- After-hours path: "Your contact page asks visitors to call during office hours, and I couldn't find an after-hours option."
- Form: "Your free case evaluation form has {{n}} fields, and I didn't see any confirmation of when someone will respond."
- Chat: "I noticed {{firm_name}} doesn't have website chat. Clio's data says about half of prospective clients would use one."
- Languages: "Your site serves clients in {{language}}. An intake flow could reply in that language too."
- Ads (Google search-এ নিজে দেখা): "I saw {{firm_name}} running ads for '{{keyword}}' in {{city}}."
- স্বচ্ছ test (চাইলে): form-এ "This is a test from Growrix OS, not a real inquiry" লিখে submit করুন, তারপর auto-reply আসে কিনা দেখুন। **ভুয়া client সেজে inquiry দেবেন না।**

**Accounting/bookkeeping:**
- Portal: "Your site links a {{portal_tool}} client portal, so the upload side already exists. The chasing is usually the gap."
- Services: "You offer {{service}} for small businesses, which usually means monthly statements from every client."
- Season: "With {{season}} coming, I'm guessing the reminder emails are about to pile up."
- Team size (LinkedIn): "With a team of about {{n}}, each hour of chasing comes straight out of billable time."

**Agencies:**
- Niche: "You build for {{client_niche}}, a niche where missed-call text-back is an easy upsell."
- Stack: "I saw you're a {{crm_platform}} partner / use {{crm_platform}} for clients."
- Gap: "Your services page covers SEO, ads and websites but no AI or automation offer yet."
- Content: "Your recent post on {{topic}} …" (শুধু সত্যিই পড়ে থাকলে লিখবেন)

### 1.7 AI personalization prompt template

> আপনার agent org বা Claude-এ ব্যবহার করুন। Output পাঠানোর আগে প্রতিটি লাইন নিজে দেখে approve করবেন (human-in-the-loop)। প্রতি batch-এ অন্তত 10% লাইন website খুলে মিলিয়ে দেখুন।

```text
You are writing ONE personalization sentence for a cold email from Growrix OS (AI automation for {{icp}}: {{icp_offer}}).

INPUT
- Prospect: {{first_name}}, {{title}} at {{company_name}}
- Website text (scraped from their own site): <<<{{website_text}}>>>
- LinkedIn/about text (optional): <<<{{linkedin_text}}>>>

RULES
1. Use ONLY facts that appear in the input text. Do not guess, infer revenue, team size or software they "probably" use.
2. One sentence, 12–25 words, plain English, no flattery ("love your work", "impressive"), no exclamation marks.
3. The sentence must point to something observable that relates to {{pain}} (e.g., contact process, forms, office hours, client portal, services list, niche served).
4. Do not mention AI, automation or our offer. The rest of the email does that.
5. Do not use these words: revolutionize, game-changer, cutting-edge, supercharge, unlock, seamless.
6. If the input contains nothing specific and relevant, output exactly: SKIP

OUTPUT FORMAT
line: <the sentence or SKIP>
evidence: <the exact phrase from the input you based it on>
```

---

## 2. LinkedIn

> Automation tool ব্যবহার করবেন না (LinkedIn User Agreement-এ নিষিদ্ধ)। হাতে পাঠান, দিনে ~20টি invite, সপ্তাহে ~100টি। নতুন account হলে সপ্তাহে 20–30টি দিয়ে শুরু করুন। Connection note-এ pitch দেবেন না।

### 2.1 Connection notes (≤200 characters)

**Law (PI/immigration):**
```text
Hi {{first_name}}, I build intake automation for {{practice_area}} firms, mostly around faster replies to new inquiries. I'd like to follow your posts and share notes on intake.
```

**Accounting/bookkeeping:**
```text
Hi {{first_name}}, I work on client document intake for accounting firms: checklists, reminders, filing. I'd be glad to connect and swap notes on what's working this {{season}}.
```

**Agency owner:**
```text
Hi {{first_name}}, I build AI and automation work for agencies under their brand (n8n, {{crm_platform}}). Always good to know agency owners in {{client_niche}}. Happy to connect.
```

### 2.2 Follow-up DMs (3 per ICP)

> DM 1: accept করার 1–2 দিন পর। DM 2: 5–7 দিন পর। DM 3: আরও 7–10 দিন পর। প্রথম DM 400 character-এর নিচে রাখুন। Reply না এলে DM 3-এর পর থামুন।

**Law**
```text
DM1: Thanks for connecting, {{first_name}}. Quick question, no pitch: when an inquiry comes in after hours at {{firm_name}}, who sees it first, and roughly how soon?
```
```text
DM2: Asking because Clio's 2024 study found 48% of firms never answered or called back a prospective client. I've built a demo intake flow that replies within minutes, asks your screening questions and logs it in {{practice_mgmt_tool}}. Want me to send a 3-minute video?
```
```text
DM3: Last nudge from me. If intake ever moves up your list, I'm happy to record a short, free review of how a new inquiry moves through your site today. Otherwise, I'll just keep enjoying your posts.
```

**Accounting**
```text
DM1: Thanks for connecting, {{first_name}}. Curious: how does {{firm_name}} chase missing client documents today? Email templates, a portal, or someone on the phone?
```
```text
DM2: Asking because it's the most common complaint I hear (Mango's 2025 survey: 69% of firms struggle to get documents on time). I built a demo, LedgerLine, that sends checklists and reminders and files uploads automatically. Want a 3-minute video?
```
```text
DM3: Last one from me. If {{season}} gets heavy and you want a second pair of eyes on your intake process, I'm happy to send a free 3-minute review. No pressure either way.
```

**Agency**
```text
DM1: Thanks for connecting, {{first_name}}. Do your {{client_niche}} clients ever ask for AI or automation work, like missed-call text-back or follow-up sequences, that you'd rather not build in-house?
```
```text
DM2: I ask because that's what I do: build it under your brand, fixed wholesale price, NDA first, and I never contact your clients. Want to see a sample build and the pricing model?
```
```text
DM3: Last note. If a client request comes up that's outside your team's skills, send me the brief and I'll reply with a fixed quote within a day.
```

### 2.3 Ten post hooks

1. `48% of law firms didn't answer the phone or call back. That's from Clio's 2024 secret-shopper study, not a vendor pitch.`
2. `PI firms pay around $284 per lead. Here's where those leads leak out after they arrive.`
3. `69% of accounting firms struggle to get client documents on time. The fix usually isn't a new portal.`
4. `I built a document-intake automation for accounting firms. Here are the 5 rules I wouldn't break again.`
5. `Gartner expects over 40% of agentic AI projects to be cancelled by 2027. Here's how I scope automation so it doesn't end up in that 40%.`
6. `"Can't we just do this with Zapier?" Sometimes, yes. Here's how I decide.`
7. `The most useful AI step in my workflows is the one where a human clicks "approve".`
8. `I work from Dhaka, Bangladesh. My US clients' workflows get built while they sleep. Here's how async delivery works.`
9. `Agencies: your clients will ask for AI this year. Here are 3 offers you can add without hiring anyone.`
10. `A reminder email that stops the moment a document arrives sounds trivial. It's the hardest part to get right.`

### 2.4 Sample post 1: text post (law, stat-led)

```text
48% of law firms neither answered the phone nor called back.

That's from Clio's 2024 Legal Trends Report. Secret shoppers contacted firms as prospective clients. Only 40% of calls were answered, down from 56% in 2019. Only 33% of emails got a reply.

Now add the cost side. Rankings.io's analysis of 13 personal injury firms put the average cost per lead at around $284.

So the expensive part isn't getting the inquiry. It's what happens in the first hour after it arrives.

What a basic intake system covers:
→ Instant text + email reply, any time of day
→ 3–5 screening questions your team writes
→ A booking link for qualified inquiries
→ Every inquiry logged in your case management system
→ A human reviews anything unclear before it moves forward

None of this requires an "AI lawyer". The AI part is small: reading a free-text inquiry and sorting it. The rest is plumbing that should have existed already.

If you run intake at a firm, I'm curious: what's your after-hours process today?

#LegalTech #LawFirmIntake #Automation
```

### 2.5 Sample post 2: build-in-public (accounting, LedgerLine)

> নিচের নিয়মগুলো যেন LedgerLine-এ সত্যিই থাকে। যেটা নেই সেটা বাদ দিন বা "rule I'd add next" হিসেবে লিখুন।

```text
I built a client document-intake automation for accounting firms. It's called LedgerLine, and it's a demo, not a client project yet.

Why this problem: Mango's 2025 survey found 69% of accounting firms struggle to get client documents on time. In Financial Cents' data, it's the #1 workflow challenge.

5 rules I followed while building it:

1. One checklist per client, not one email to everyone. People ignore generic lists.
2. Reminders only mention what's still missing. Nobody likes being asked for something they've already sent.
3. Stop the moment the file arrives. Sounds obvious. It's where most DIY Zaps break.
4. The AI sorts and labels uploads, but a person approves anything it isn't sure about.
5. Everything lives in the firm's own accounts. If they stop working with me tomorrow, nothing breaks.

What I'm still figuring out: how firms want status reported. A dashboard? A weekly email? A column in their practice software?

Accountants: how do you track who still owes you documents today?

#Accounting #Bookkeeping #Automation #n8n
```

### 2.6 Sample post 3: carousel (PDF document) outline

**Title:** "7 places a law firm inquiry dies (and the fix for each)". Format: 9 slides, 1080×1350, প্রতি slide-এ একটি idea, বড় font।

| Slide | Headline | Body copy |
|---|---|---|
| 1 | 7 places a law firm inquiry dies | And the fix for each. Data: Clio 2024 Legal Trends Report. |
| 2 | 1. The phone rings after 5pm | 48% of firms neither answered nor called back (Clio 2024). Fix: missed-call text-back within 60 seconds. |
| 3 | 2. The web form goes to a shared inbox | No one owns it, so no one answers it. Fix: route every form to one owner + log it in your case system. |
| 4 | 3. No confirmation message | The prospect doesn't know if anyone saw it, so they call the next firm. Fix: an instant "we got it, here's what happens next" reply. |
| 5 | 4. No chat option | 7% of firms use chat; 51% of prospects see it as a useful start (Clio 2024). Fix: a simple intake chat that collects facts, not legal advice. |
| 6 | 5. Screening happens by phone tag | Fix: 3–5 screening questions answered by text before the call. |
| 7 | 6. Qualified leads wait for a callback | Fix: a booking link sent the moment screening is done. |
| 8 | 7. Unqualified leads get silence | Fix: a polite referral message, which protects your reputation. |
| 9 | Where to start | Fix #1 and #3 first. They're the cheapest and catch the most. Follow {{founder_name}} for more intake breakdowns. |

Caption:
```text
Most firms don't have a lead problem. They have a first-hour problem.

I mapped the 7 most common places an inquiry gets lost, with the data where it exists (Clio's 2024 secret-shopper study) and the simplest fix for each.

Which one is the hardest to fix at your firm?
```

---

## 3. Upwork

> **Policy:** Contract শুরুর আগে email, phone, WhatsApp বা Calendly দেবেন না, আর conversation Upwork-এর বাইরে নেবেন না। Review পাওয়ার জন্য free কাজ বা discount offer করা নিষিদ্ধ, তাই pilot discount শুধু Upwork-এর বাইরের client-দের জন্য। Specialized profile আর নেই (May 2026), তাই সব keyword একটা profile-এ রাখুন। Uma (AI recruiter) title আর skill tag দেখে shortlist করে, তাই client-এর ভাষায় লিখুন।

### 3.1 Profile titles (≤70 characters; একটা বেছে নিন)

1. `n8n & AI Automation Expert | Claude AI Agents | Make, Zapier, CRM`
2. `AI Automation Engineer: n8n, Make, Zapier, Claude AI Agents & CRM`
3. `n8n Automation + Claude AI Agent Developer | CRM & API Integrations`
4. `AI Agent & Workflow Automation | n8n, Zapier, Make | GoHighLevel CRM`
5. `Business Process Automation | n8n, Claude AI, Zapier, Make, HubSpot`

> "Expert" ব্যবহার নিয়ে দ্বিধা থাকলে #2 বা #3 নিন। এগুলো skill বলে, seniority দাবি করে না।

### 3.2 Profile overview (~1,500 characters)

> প্রথম ~200 character search result-এ দেখায়, তাই সবচেয়ে জরুরি কথা ওখানেই রাখা আছে। যে tool-এ হাতে-কলমে কাজ করেননি (যেমন GoHighLevel, HubSpot), সেটা বাদ দিন।

```text
I build AI automation that removes repetitive work: n8n, Make and Zapier workflows, Claude AI agents, and CRM integrations that move leads, documents and data without copy-paste.

What I build:
• n8n workflows (cloud or self-hosted), Make scenarios, Zapier Zaps
• AI agents and chatbots with Claude: lead qualification, intake, document sorting and data extraction, with human approval steps
• CRM automation: GoHighLevel, HubSpot, Pipedrive, plus webhooks and REST APIs
• Speed-to-lead: instant replies, booking links, follow-up sequences
• Document intake: client checklists, reminders, filing to Google Drive or SharePoint

How I work:
1. Written scope and fixed price before work starts
2. Built in your accounts, so you own every workflow and credential
3. Loom walkthrough and plain-English docs at handover
4. 30 days of free fixes for anything that doesn't work as scoped

Proof you can check: my portfolio has 6 working demo automations, including LedgerLine, a client document-intake system. I'm new to Upwork, so I let working demos speak first. Ask me to walk you through any of them on a short video call.

Stack: n8n, Make, Zapier, Claude API, Node.js, TypeScript, Next.js, webhooks, Google Workspace.

Based in Dhaka, Bangladesh (UTC+6). I reply within {{response_hours}} hours and I'm available for calls {{overlap_window}}.

Not a fit: projects that touch health records (PHI), or "fully autonomous" AI with no human review.

Send me your current process, even as a rough list of steps, and I'll tell you what I'd automate first.
```

### 3.3 Proposal templates

> নিয়ম: প্রথম লাইনে client-এর সমস্যা, তাঁর নিজের ভাষায়। "Dear Sir/Madam, I am an expert…" দিয়ে শুরু করবেন না। 120–180 শব্দ। একটা প্রশ্ন রাখুন যাতে reply করতে হয়। সবচেয়ে কাছের demo-র link দিন। Proposal-এ off-platform contact দেবেন না। "Less than 5 proposals" আর payment-verified job-এ, post হওয়ার 30–60 মিনিটের মধ্যে apply করুন।

**A. n8n workflow job**
```text
You're manually moving {{data}} from {{source_tool}} to {{destination_tool}}, and it breaks whenever {{edge_case_from_post}}. That's a good fit for n8n.

How I'd build it:
1. Trigger on {{trigger}} (webhook or schedule)
2. Clean and check the data, so duplicates and missing fields are caught before they reach {{destination_tool}}
3. Write to {{destination_tool}}, with an error branch that alerts you on {{alert_channel}} instead of failing silently
4. A short Loom walkthrough so your team can maintain it

Closest example from my portfolio: {{demo_name}} ({{demo_link}}). It does {{one_line_what_it_does}}.

Fixed price for this scope: ${{price}}, delivered in {{days}} days, with 30 days of fixes after handover. Built in your n8n instance, so you own it.

One question: is your n8n cloud or self-hosted, and do you already have API access to {{source_tool}}?

{{sender_first_name}}
```

**B. AI agent / chatbot job**
```text
You need a {{bot_type}} that answers {{audience}} accurately and hands off to a person when it shouldn't answer. The handoff is what most chatbots get wrong.

My approach:
1. Claude answers only from your approved content ({{knowledge_source}}), so it doesn't make up policies or prices
2. Clear rules for when it says "let me get a person", and that conversation goes to {{handoff_channel}}
3. It collects {{fields_to_capture}} and logs them in {{crm_or_sheet}}
4. You get a test sheet of {{n}} real questions with the bot's answers before launch, so you see how it behaves

Related demo: {{demo_name}} ({{demo_link}}).

Fixed price: ${{price}} for this scope, {{days}} days, plus 30 days of fixes. API costs (Claude/OpenAI) are billed to your own account, so you see exactly what you pay.

Question: what are the 3 questions your team answers most often today?

{{sender_first_name}}
```

**C. CRM / GoHighLevel integration job**
```text
Leads are coming into {{crm_platform}}, but {{problem_from_post}} (for example, follow-up isn't firing, or data isn't syncing with {{other_tool}}). That usually comes down to the trigger logic, not the CRM itself.

What I'd do:
1. Audit the current workflows and list exactly where leads stall (you get this as a short written list)
2. Fix or rebuild the {{workflow_name}} workflow with clear triggers, tags and pipeline stages
3. Connect {{other_tool}} via native integration, webhook or n8n, whichever is most stable
4. Test with real sample leads and record a Loom showing each path

Related demo: {{demo_name}} ({{demo_link}}).

Fixed price: ${{price}}, {{days}} days, 30 days of fixes. I'll work in your sub-account with the access level you choose.

Question: roughly how many new leads a week, and which step do you see them drop at?

{{sender_first_name}}
```

### 3.4 Project Catalog listings (2)

> Research বলছে প্রথম 3–6টি contract শেষ না হওয়া পর্যন্ত Catalog listing খুব একটা rank করে না। তবু এখনই বানিয়ে রাখুন, আর 30–60 সেকেন্ডের একটা video যোগ করুন।

**Listing 1**
- **Title:** `You will get an n8n automation workflow with AI steps for your business`
- **Description:**
```text
Tell me the repetitive task, and I'll turn it into a working n8n workflow, built in your account, tested with your real data, and documented so your team can maintain it.

Good fits: lead routing, form-to-CRM sync, invoice or document processing, Slack/email alerts, Google Sheets cleanup, AI classification or summarization with Claude.

Every tier includes: error alerts (so it never fails silently), a Loom walkthrough, and 30 days of fixes after delivery.

Before ordering, message me your process in a few steps so I can confirm the right tier.
```

| | Starter | Standard | Advanced |
|---|---|---|---|
| Price | $400 | $800 | $1,500 |
| Scope | 1 workflow, up to 2 apps, 1 trigger | 1–2 workflows, up to 4 apps, 1 AI step (Claude) | Up to 4 linked workflows, AI steps, human-approval step, logging sheet |
| Delivery | 4 days | 7 days | 12 days |
| Revisions | 1 | 2 | 3 |
| Docs + Loom | Yes | Yes | Yes + 30-min handover call |

**Listing 2**
- **Title:** `You will get an AI lead intake and follow-up system connected to your CRM`
- **Description:**
```text
New leads get a reply within minutes, are asked your screening questions, and land in your CRM with the right tags, so nobody waits until Monday.

What's built: instant email/SMS reply, AI qualification with Claude using your rules, booking link for qualified leads, CRM entry and owner notification. Anything unclear is flagged for a person to review.

Works with GoHighLevel, HubSpot, Pipedrive and most CRMs with an API. SMS and AI usage costs are billed to your own accounts.

Message me before ordering with your CRM and lead sources.
```

| | Starter | Standard | Advanced |
|---|---|---|---|
| Price | $600 | $1,200 | $2,500 |
| Scope | 1 lead source → instant reply → CRM entry | Up to 3 sources, AI qualification, booking link, owner alerts | Everything in Standard + missed-call text-back, 14-day follow-up sequence, weekly summary report |
| Delivery | 5 days | 10 days | 15 days |
| Revisions | 1 | 2 | 3 |

---

## 4. Fiverr (secondary listing)

> Fiverr প্রতি order-এর 20% রাখে, তাই দাম সেই হিসাবে ঠিক করুন। Order-এর আগে external contact share করা নিষিদ্ধ। Title-এ সর্বোচ্চ 80 character, description-এ 1,200। 5টি tag দিন। Response time 1 ঘণ্টার নিচে রাখার চেষ্টা করুন।

### 4.1 Gig 1: workflow automation

- **Title:** `I will build n8n, make or zapier automation workflows for your business`
- **Tags:** n8n, zapier, make automation, workflow automation, ai automation
- **Description:**
```text
Stop copying data between apps by hand. I'll build an automation that does it for you, in your own n8n, Make or Zapier account, so you own it completely.

WHAT I CAN AUTOMATE
• Form submissions → CRM, Google Sheets, Slack or email
• Lead follow-up and reminders
• Document and invoice processing, with AI sorting via Claude
• Syncing data between your tools through APIs and webhooks

WHAT YOU GET
• A tested workflow built with your real data
• Error alerts, so failures never go unnoticed
• A video walkthrough of how it works
• Free fixes for 30 days if something doesn't work as agreed

HOW TO ORDER
Message me first with the steps you do manually today. I'll confirm which package fits, or send a custom offer.

I'm based in Bangladesh (UTC+6), and US orders are usually worked on overnight your time.
```

| | Basic | Standard | Premium |
|---|---|---|---|
| Name | Simple Zap/Flow | Business Workflow | Automation System |
| Price | $150 | $450 | $1,100 |
| Includes | 1 workflow, 2 apps, up to 5 steps | 1–2 workflows, up to 4 apps, 1 AI step | Up to 4 workflows, AI steps, approval step, logging |
| Delivery | 3 days | 6 days | 10 days |
| Revisions | 1 | 2 | 3 |

### 4.2 Gig 2: AI agent / chatbot

- **Title:** `I will build a claude AI agent or chatbot connected to your CRM and tools`
- **Tags:** ai agent, ai chatbot, claude ai, lead qualification, crm automation
- **Description:**
```text
I'll build an AI assistant that answers from YOUR approved content, collects lead details, and hands off to a person when it should, instead of guessing.

GOOD FOR
• Website lead qualification and booking
• Client intake forms that ask follow-up questions
• Internal assistants that answer from your docs or SOPs
• Sorting and summarizing incoming emails or documents

HOW I KEEP IT ACCURATE
• Answers come only from content you approve
• Clear "I'll get a person" rules for anything outside that
• You review a test sheet of real questions and answers before launch

WHAT YOU GET
• A working agent on your site, chat or inbox, connected to your CRM or Google Sheets
• A video walkthrough and setup notes
• 30 days of free fixes
• AI and API costs are billed to your own account, with no markup

Message me first with what you want the agent to handle.
```

| | Basic | Standard | Premium |
|---|---|---|---|
| Name | FAQ Assistant | Lead Qualifier | Intake Agent + CRM |
| Price | $250 | $650 | $1,400 |
| Includes | Answers from up to 10 pages of your content, 1 channel | + lead capture, 5 screening questions, Sheet/CRM entry, handoff rules | + booking link, follow-up sequence, 2 channels, approval queue, test report |
| Delivery | 4 days | 8 days | 14 days |
| Revisions | 1 | 2 | 3 |

---

## 5. Loom teardown

> শুধু যাঁরা reply করে "yes" বলেছেন তাঁদের জন্য বানাবেন। প্রথম email-এ video দেবেন না। 3–5 মিনিট, কোনো price নয়, শেষে একটা CTA। ভুয়া client সেজে test করবেন না। শুধু public জিনিস দেখান, অথবা স্পষ্টভাবে "test" লেখা submission দিন।

### 5.1 Script (3–5 minutes)

```text
[0:00–0:20 | Their website on screen, your face bubble on]
Hi {{first_name}}, {{founder_name}} here from Growrix OS. As promised, this is a short look at how a new {{inquiry_or_document_request}} moves through {{firm_name}} today, and what I'd change first. About four minutes.

[0:20–1:30 | What I looked at: their real pages]
Here's your {{contact_page / intake form / client portal}}. A few things I noticed:
One: {{observation_1}}, for example "the form doesn't say when someone will reply."
Two: {{observation_2}}, for example "after 5pm, the only option is voicemail."
Three: {{observation_3}}, for example "there's no automatic confirmation, so the person can't tell if it went through."
(If you ran a labelled test:) I sent a test message marked "test, not a real inquiry" at {{time}} on {{day}}. {{result}}.

[1:30–3:15 | What a fixed version looks like: show demo]
Here's a demo I built, {{demo_name / LedgerLine}}. It's a demo, not a client system, but the flow is the same.
Step 1: {{inquiry arrives / client gets their checklist}}.
Step 2: {{instant reply + screening questions / reminders only for missing items}}.
Step 3: {{logged in {{practice_mgmt_tool}} / files sorted into {{doc_storage}}}}.
And here's the part I care most about: anything unclear goes to a person to approve. The AI doesn't make decisions on its own.

[3:15–4:15 | What it would take, without price]
For {{firm_name}}, I'd start with {{the single highest-impact fix}}. It connects to the {{tools}} you already use, it's built in your accounts, and you own it. Typical build time is {{n}} weeks, with a fixed scope agreed up front.

[4:15–4:40 | CTA]
If this is useful, reply to my email and I'll send a one-page plan with a fixed price. Or grab 20 minutes here: {{booking_link}}. Either way, thanks for watching.
```

### 5.2 Email that sends the Loom

- Subject A: `the {{firm_name}} intake video`
- Subject B: `your 4-minute review is ready`

```text
Hi {{first_name}},

Here's the video I mentioned: {{loom_link}}

It covers three things I noticed on {{firm_name}}'s {{page}}, a demo of how a fixed version would work, and what I'd tackle first. No pricing in it, just the map.

If it's useful, reply "send the plan" and I'll send a one-page scope with a fixed price. Or pick a time here: {{booking_link}}

{{sender_first_name}}
```

> এটা reply-র উত্তর, তাই একই thread-এ পাঠান। Footer/unsubscribe তবুও রেখে দিন।

---

## 6. 20-minute fit call script

> লক্ষ্য: "এখনই বিক্রি করা" নয়, বরং fit যাচাই করে paid audit ($297–497, build-এ credit হবে) অথবা সরাসরি proposal-এ যাওয়া। কথার বেশিরভাগ বলবেন prospect, আপনি মূলত শুনবেন।

### 6.1 Flow

```text
[0:00–2:00 | Frame]
"Thanks for making time. Here's what I'd suggest for the 20 minutes: I'll ask about how {{inquiries / documents}} flow today, you can ask me anything, and in the last few minutes we'll decide together whether there's a fit. If there isn't, I'll say so. Sound good?"

[2:00–10:00 | Discovery (the qualification questions below)]

[10:00–14:00 | Quantify]
"Let me play that back: about {{volume}} a {{week/month}}, roughly {{hours}} hours of staff time, and {{the leak}} is where things go wrong. Did I get that right?"
"If that step ran on its own, what would it be worth to you? Time back, fewer lost {{clients}}, or something else?"

[14:00–17:00 | Show, don't pitch]
Share screen: 60–90 seconds of the closest demo. "This is a demo, not a client system, but here's the same flow."
Mention: fixed scope, built in your accounts, human approval, 30-day fix guarantee.

[17:00–20:00 | Next step]
(See 6.3)
```

### 6.2 Qualification questions

| # | প্রশ্ন (English-এ জিজ্ঞেস করুন) | ভালো উত্তর | সতর্ক সংকেত |
|---|---|---|---|
| 1 | "Walk me through what happens from the moment a new {{inquiry/document request}} starts, step by step." | Step-গুলো স্পষ্ট বলতে পারেন | "Not sure, my assistant handles it" (অন্য কাউকে call-এ আনতে হবে) |
| 2 | "Roughly how many per week or month?" | Law: 20+ inquiries/mo; Accounting: 30+ clients | খুব কম volume হলে ROI দুর্বল |
| 3 | "Where does it break most often? Can you remember the last time?" | নির্দিষ্ট ঘটনা মনে আছে | কোনো ব্যথা নেই, শুধু কৌতূহল |
| 4 | "Which tools are involved today? {{practice_mgmt_tool / doc_storage / CRM}}, email, phone system?" | API আছে এমন tool | শুধু paper বা desktop software, API নেই |
| 5 | "Have you tried fixing this before? What happened?" | কিছু চেষ্টা করেছেন, শেখা আছে | "Tried 3 agencies, all failed" (expectation যাচাই করুন) |
| 6 | "Does any of this involve health information or anything regulated beyond normal client confidentiality?" | না | PHI/HIPAA থাকলে কাজ নেবেন না (n8n Cloud বা Zapier BAA দেয় না) |
| 7 | "Who else needs to be involved in deciding on this?" | উনি নিজেই, বা partner call-এ আছেন | Decision-maker নেই |
| 8 | "Is there a date this needs to work by, like {{season}} or a new ad campaign?" | নির্দিষ্ট deadline | "Someday" |
| 9 | "Have you set aside a budget range for fixing this? Projects like this usually land between {{range}}." | Range-এর মধ্যে | <$500, অথবা "AI-কে free হতে হবে" |
| 10 | "How would we know in 60 days that this worked?" | Measurable উত্তর | "AI that runs everything" (Gartner-এর 40%-এর দলে পড়বে) |

> Q9-এর range: Law intake $2,500–5,000 · Accounting doc intake $1,500–3,500 · Single workflow $400–1,200।

### 6.3 Transition to paid audit (or proposal)

**যখন scope অস্পষ্ট বা একাধিক system জড়িত:**
```text
"Based on what you've told me, I don't want to quote a build blind. Here's what I'd suggest: a paid Automation Audit. It's ${{audit_price}}, takes {{3–5}} business days, and you get a written map of your current {{intake/document}} flow, the 3 changes with the biggest payoff, and a fixed-price build plan. If you go ahead with the build within 30 days, the full ${{audit_price}} is credited toward it. If you don't, you keep the plan and can hand it to anyone. Want me to send the invoice and a short audit questionnaire today?"
```

**যখন scope স্পষ্ট:**
```text
"This is clear enough that I can skip the audit. I'll send a one-page proposal by {{day}} with three options and fixed prices. Can we set 15 minutes on {{date}} to go through it, or would you prefer to review it async and reply by email?"
```

**যখন fit নেই:**
```text
"Honestly, I don't think I'm the right fit for this, because {{reason}}. What I'd look at instead is {{alternative}}. If that changes, you know where to find me."
```

---

## 7. One-page proposal template + SOW boundaries

> Payment: 50% upfront, 50% delivery-তে। Direct client-এর টাকা Payoneer-এ নিন, local fintech (nsave/ElevatePay) backup হিসেবে রাখুন। Bangladesh থেকে PayPal, Stripe বা Wise receiving চলে না, তাই এগুলোর কথা proposal-এ লিখবেন না।

### 7.1 Proposal (copy into a doc / PDF)

```text
PROPOSAL: {{system_name}} for {{client_company}}
Prepared by {{founder_name}}, Growrix OS · {{date}} · Valid until {{date+14}}

1. THE PROBLEM (in your words)
{{2–3 sentences from the call, using their numbers. Example: "About 40 inquiries a month come in through the website and phone. After 5pm and on weekends they wait until the next business day, and you estimate 1 in 4 never gets a callback."}}

2. THE OUTCOME
When this is live: {{outcome_1, e.g., "every inquiry gets a reply within 5 minutes, any time"}}, {{outcome_2}}, {{outcome_3}}.
How we'll measure it: {{metric, e.g., "median first-response time and % of inquiries logged in Clio, compared before and after over 30 days"}}.

3. SCOPE
In scope: {{bullet list of systems, channels, integrations}}.
Not in scope: see the scope boundaries attached.

4. DELIVERABLES
• {{Workflow/agent 1}}: what it does in one line
• {{Workflow/agent 2}}
• Human-approval step for {{cases}}
• Error alerts to {{channel}}
• Written runbook + Loom walkthrough
• Handover session ({{30}} min)

5. TIMELINE
Week 1: access, mapping, build of {{core}}
Week 2: {{integrations}}, internal testing with sample data
Week 3: your review, fixes, go-live
(Async updates every {{2}} business days; calls available {{overlap_window}}.)

6. OPTIONS
GOOD: {{core_only}} ........................... ${{price_good}}
  Example: Workflow Sprint, the single highest-impact flow.
BETTER (recommended): {{full_system}} ......... ${{price_better}}
  Example: Full Intake & Speed-to-Lead System or Document Intake & Chase Autopilot.
BEST: Better + Automation Care Plan ({{n}} months) + {{add-on, e.g., practice-area landing page}} ... ${{price_best}} + ${{care_monthly}}/mo

7. GUARANTEE
30-day fix guarantee: if anything in scope doesn't work as described in this proposal within 30 days of go-live, I fix it at no charge.
You own everything: all workflows, accounts and credentials sit in your accounts from day one.

8. PAYMENT
50% to start, 50% on go-live. Invoiced in USD via {{Payoneer / payment_method}}. Third-party subscriptions (n8n, Twilio, Claude API, etc.) are paid by you directly, at cost.

9. NEXT STEP
Reply "approved: {{option}}" and I'll send the first invoice and an access checklist the same day. Earliest start date: {{start_date}}.
```

> Price reference (fixed decisions): Intake & Speed-to-Lead $2,500–5,000 setup + $500–1,000/mo care · Document Intake & Chase $1,500–3,500 + $300–750/mo · Workflow Sprint $400–1,200 · Audit $297–497 (credited)।

### 7.2 SOW scope boundary list (proposal-এর সঙ্গে attach করুন)

```text
SCOPE BOUNDARIES (what this project does NOT include unless added in writing)

1. Third-party fees: software subscriptions, SMS/phone numbers, AI API usage and hosting are billed to the client's accounts, not included in the price.
2. Data cleanup: fixing or de-duplicating existing CRM/practice-management data beyond {{n}} records.
3. New workflows, channels or integrations not listed in Section 3 of the proposal.
4. Content writing: legal, tax or marketing copy. The client supplies or approves all wording the system sends.
5. Professional advice: the system does not give legal, tax or financial advice and is not configured to.
6. Compliance certification: no HIPAA, SOC 2, or bar/regulator approval is provided or implied. No protected health information (PHI) is processed.
7. Vendor changes: breakage caused by a third-party API, pricing or policy change after go-live is covered only under a Care Plan, or quoted separately.
8. Revisions: {{2}} rounds of changes during the review week; later changes are quoted as change requests.
9. Training beyond the handover session and the written runbook.
10. Voice AI / phone-answering products, custom mobile apps, or website redesigns (unless listed as an add-on).
11. Ongoing monitoring and support after the 30-day fix window (available through the Automation Care Plan).
12. Delays caused by late access, missing credentials or slow approvals extend the timeline day-for-day.
```

---

## 8. Objection responses

> সংক্ষেপে উত্তর দিন, আত্মরক্ষার সুরে নয়। প্রতিটি উত্তর শেষ করুন একটা প্রশ্ন বা ছোট next step দিয়ে।

**"You're offshore / in Bangladesh. How do I know I can trust you?"**
```text
Fair question, and I'd rather you ask it now. Three things reduce the risk for you: (1) everything is built inside your accounts, so you never depend on access to mine; (2) you pay 50% to start and 50% only when it works, and the 30-day fix guarantee applies after that; (3) you can see working demos and talk to me on video before paying anything. On time zones: I'm in Dhaka (UTC+6) and keep {{overlap_window}} open for calls, so work you send in the afternoon gets done overnight your time. Would a short video call help you decide?
```

**"What about our client data and security?"**
```text
Reasonable concern, since most firms have it (Karbon found 70% of accounting firms do). How I handle it: the system runs in accounts your firm owns; I get least-privilege access that you can revoke any time; no client files are stored on my machines; the AI only sees the fields and documents you choose to route to it; and every action is logged. I'll sign your NDA, and I can self-host n8n on your server if you prefer. I don't take on work involving health records. Want my one-page data-handling summary?
```

**"AI makes things up. What if it tells a client something wrong?"**
```text
It can, which is why I don't let it work unsupervised. In my builds the AI does narrow jobs: sorting an inquiry, pulling fields from a document, drafting a reply. Anything it isn't sure about goes to a person to approve. Client-facing messages come from templates you write, and the AI only fills in the details. You also get a test sheet of real examples before launch, so you see how it behaves. Gartner expects over 40% of agentic AI projects to be cancelled by 2027, and most of those are "let the AI do everything" projects. This is the opposite of that.
```

**"That's more than we expected."**
```text
Understood. Two ways to bring it down without cutting corners: start with only the single workflow that fixes {{the biggest leak}} (around ${{price_good}}) and add the rest later, or start with the paid audit (${{audit_price}}, fully credited to the build) so you get a fixed plan before committing. For context, this setup is priced below what US agencies typically charge for a comparable build, and you own it outright. Which of those two works better for you?
```

**"We'll just do it ourselves with Zapier."**
```text
That might be the right call, honestly. If it's 2–3 apps and a simple trigger, Zapier works well and you don't need me. Where DIY usually struggles: reminders that need to stop once something arrives, duplicates, error handling when an app is down, and AI steps that need approval rules. If you want, I'll look at your plan and tell you in a few lines whether it's a DIY job. If it is, no charge. If you build it and get stuck, I also do one-off fixes.
```

**"We tried a chatbot before and it was useless."**
```text
That's common. Most website chatbots are built to "chat", not to finish a job. What I'd build is narrower: it asks your screening questions, books qualified people, logs everything in {{practice_mgmt_tool / CRM}}, and hands anything else to a person. It never tries to answer legal or tax questions. Before launch, you'd review its answers to a test set of {{n}} real inquiries, and if you don't like how it behaves, it doesn't go live. What went wrong with the last one?
```

---

## 9. Follow-ups, breakups, referrals, testimonials

### 9.1 After the proposal is sent

**Day 2**
```text
Hi {{first_name}}, just checking the proposal came through and made sense. Happy to answer anything by email or walk through it in 15 minutes: {{booking_link}}
```

**Day 5**
```text
Hi {{first_name}}, one thought since we spoke: if the full system feels like too much right now, the Good option ({{core_only}}) fixes {{the biggest leak}} on its own, and everything else can be added later without rework. Would that be easier to approve?
```

**Day 10 (breakup)**
```text
Hi {{first_name}}, I haven't heard back, so I'll assume the timing isn't right and close this out on my side. The proposal pricing holds until {{date}}. If priorities change after that, reply here and I'll update it. Thanks for the time you gave this.
```

### 9.2 No-show

```text
Hi {{first_name}}, looks like we missed each other today, no problem. Here's my calendar if you'd like to rebook: {{booking_link}}. Or, if async is easier, reply with the 2–3 steps that cause the most trouble and I'll send a short video instead.
```

### 9.3 Loom sent, no reply (3 days later)

```text
Hi {{first_name}}, did you get a chance to watch the {{firm_name}} video? The most useful part is at {{timestamp}}, where I show {{key_fix}}. Happy to send the one-page plan if it looked relevant.
```

### 9.4 Referral ask (go-live-এর 2–4 সপ্তাহ পর, যখন result দেখা যাচ্ছে)

```text
Hi {{first_name}}, glad to see {{specific_result_they_saw}} since go-live.

A quick ask: do you know one or two other {{firm_type}} owners who deal with the same {{inquiry/document}} problem? If so, I'd appreciate an intro, or you can forward this note.

[Forwardable]
"{{founder_name}} at Growrix OS built our {{system_name}}. It {{one_line_what_it_does}}. Worth a 15-minute chat if {{pain}} is a problem for you: {{booking_link}}"

No pressure at all, and thanks again for trusting me with this.
```

> Referral-এর বিনিময়ে টাকা বা কমিশন দিলে, তাঁকে যেন সেটা যাঁকে refer করছেন তাঁর কাছে প্রকাশ করতে বলেন।

### 9.5 Testimonial / case-study request

> Upwork-এ কিছুর বিনিময়ে review চাওয়া যাবে না। স্বাভাবিকভাবে feedback দিতে বলুন, কিন্তু star সংখ্যা বা ভালো review চাইবেন না। Direct client-এর testimonial হতে হবে তাঁর সৎ মত। FTC-র 2024 rule অনুযায়ী ভালো review-এর শর্তে compensation দেওয়া নিষিদ্ধ। Pilot client discount পেয়ে থাকলে testimonial-এর পাশে সেটা প্রকাশ করুন (যেমন "Pilot client, discounted rate")। Publish করার আগে written approval নিন।

```text
Subject: a short case study about {{system_name}}?

Hi {{first_name}},

Now that {{system_name}} has been running for {{n}} weeks, would you be open to a short case study? It helps other {{firm_type}} owners judge whether this kind of system is worth it.

What it involves (about 15 minutes, by email or a short call):
1. What was happening before? (e.g., how inquiries/documents were handled)
2. What made you decide to fix it now?
3. What's different since go-live? Any numbers you're comfortable sharing are welcome, but rough is fine.
4. Anything that didn't go smoothly, or that you'd want others to know?
5. Who would you recommend this to, and who wouldn't need it?

I'll write it up and send it to you for approval. Nothing is published until you sign off, and you choose how you're named: full name and firm, first name and city, or anonymous. Please be candid. An honest case study is more useful to readers than a glowing one.

Thanks,
{{sender_first_name}}
```

**Permission line (approval-এর সময় পাঠান):**
```text
Please reply "Approved" to confirm Growrix OS may publish the attached case study and quote on growrixos.com, LinkedIn and in sales materials, attributed as: {{attribution_choice}}. You can ask me to remove it at any time.
```

---

## 10. Pilot offer one-pager

> শুধু প্রথম 3 জন **direct** client-এর জন্য (Upwork-এ নয়)। ~40% ছাড়, বিনিময়ে case study আর সৎ feedback, শর্ত হিসেবে "positive" testimonial নয়। "3 slots" তখনই লিখবেন যখন সত্যিই 3টি slot থাকে। Slot ভরে গেলে page সরিয়ে দিন।

```text
GROWRIX OS PILOT PROGRAM: 3 SPOTS
AI intake and document automation for {{law firms / accounting firms}}, at about 40% off, in exchange for a case study.

WHY THIS EXISTS
I'm {{founder_name}}, a solo automation builder based in Dhaka, Bangladesh. I have working demos, including LedgerLine (a client document-intake system), but no published client case studies yet. Rather than invent proof, I'm offering 3 firms a reduced price to build it with me.

WHAT YOU GET (choose one)
• Intake & Speed-to-Lead System: every web, chat and missed-call inquiry gets a reply within minutes, is screened, and is logged in {{practice_mgmt_tool}}.
  Standard: ${{2,500–5,000}} → Pilot: ${{1,500–3,000}}
• Document Intake & Chase Autopilot: client checklists, automatic reminders for missing items only, and uploads sorted and filed into {{doc_storage}}.
  Standard: ${{1,500–3,500}} → Pilot: ${{900–2,100}}
Optional Care Plan after go-live at the standard monthly rate, cancel any time.

WHAT I ASK IN RETURN
1. A 20-minute kickoff call and quick replies during the 2–3 week build
2. Permission to measure one before/after number (e.g., response time, documents received on time)
3. An honest case study and quote after 30 days. You approve the final text, and you choose how you're named. Your feedback doesn't need to be positive, just true.

WHAT STAYS THE SAME AS FULL PRICE
• Fixed scope and price, agreed in writing
• Built in your accounts, so you own everything
• Human approval on anything the AI isn't sure about
• 30-day fix guarantee after go-live
• 50% to start, 50% on go-live

WHO IT'S FOR
{{US/UK}} {{firm_type}} with at least {{volume}} {{inquiries/clients}} a month, using {{tools}}, with one person who can approve decisions quickly.
Not a fit: anything involving health records, or projects that want AI to give legal or tax advice.

NEXT STEP
Book a 20-minute fit call: {{booking_link}}. Or reply "pilot" to {{email}} with your firm name and the tools you use.
Spots filled so far: {{n}}/3
```

---

## যা বাকি (পাঠানোর আগে)

- Founder-এর public নাম ঠিক করুন, আর custom-domain email ও `{{postal_address}}` set up করুন।
- 6টি demo-র title আর link `{{demo_name}}`/`{{demo_link}}`-এ বসান। LedgerLine-এর বর্ণনা v3-এর আসল feature-এর সঙ্গে মিলিয়ে নিন।
- Stat S6–S8 secondary compilation থেকে আসা। বেশি ব্যবহারের আগে Mango, Financial Cents আর Canopy-র original report খুঁজে নিন।
- UK solicitor-দের SRA নিয়ম আর UK GDPR processor চুক্তি (DPA) এখনো যাচাই হয়নি। UK law firm-কে target করার আগে দেখে নিন।
- Agency wholesale price আর Fiverr/Catalog-এর দাম অনুমান। প্রথম 3–5টি deal-এর পর data দেখে বদলান।
