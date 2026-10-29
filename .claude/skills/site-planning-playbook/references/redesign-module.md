# Part F: Redesign, Audit & Migration Module

## 0. Scope and why this module exists

The core agent plans new websites from a brief. It cannot yet take an existing site and redesign it. This module adds that capability. It covers three entry points:

1. **Live URL**: the existing site is reachable on the public web.
2. **Codebase**: the existing site is a repository the owner can share (for example a Next.js repo on GitHub).
3. **Design files**: the existing design exists as Figma, Claude Design exports, or screenshots only.

The module produces four outputs: an audit of what exists, an as-is token and content inventory, a keep/change/remove decision for every page, and a migration plan that protects SEO and URLs. A redesign plan is written only after these four exist. A redesign is never planned from the new brief alone.

## 1. Permission and safety gate (runs first)

No audit starts until these are confirmed in the brief:

- The requester owns the site or has written permission from the owner. Record the owner's name and the date of permission in `00-brief.md`.
- Access to private areas (admin, members-only, checkout, staging with basic auth) uses credentials supplied by the owner through environment variables. Credentials never appear in any plan file.
- The audit respects `robots.txt` and the site's terms of service. Pages behind login are audited only with owner-provided access.
- Competitor sites are used for reference only. Their layouts, copy, and proprietary imagery are never copied. The plan describes patterns in the agent's own words.

If permission is missing, the Brief Intake agent stops and asks. It does not proceed on assumptions.

## 2. New sub-agents

Five sub-agents are added to the roster in `architecture-roster.md`:

| Sub-agent | Role | Main inputs | Main outputs |
|---|---|---|---|
| Site Auditor | Discovers pages, captures screenshots, measures performance, checks SEO and accessibility baselines | Live URL or staging URL, optional repo | `00-audit/*` |
| Brand Extractor | Records the current colours, fonts, spacing, logo usage, and tone-of-voice samples | Audit output, screenshots | `01-as-is/tokens.md`, `01-as-is/voice-samples.md` |
| Content Migrator | Inventories page content and maps it to the new data-file schema | Crawled content, data-file schemas | `01-as-is/content-inventory.md`, `migration/content-map.md` |
| Migration Planner | Builds the old-to-new URL map, redirect rules, and launch and rollback plan | Page inventory, keep/change decisions | `migration/url-map.csv`, `migration/redirects.md`, `migration/launch-plan.md` |
| Before/After Critic | Compares old and new on visuals, content parity, links, performance, and accessibility | Baselines, new build plan | `qa/before-after.md` |

The Critic in this module is separate from the Critic in the core roster. It checks regressions, not the quality of the new design.

## 3. Audit pipeline (Site Auditor)

Run these steps in order. Record each result in `00-audit/`.

**3.1 Discovery**
- Fetch `robots.txt` and `sitemap.xml`. If the sitemap is missing or incomplete, extract internal links from the homepage and the navigation, then follow them to depth 3.
- No dedicated crawl tool is listed in this session. Use `firecrawl_scrape` for each URL, or `WebFetch` for simple pages. Verify whether Firecrawl offers a crawl or map capability before relying on it.
- Output: `00-audit/page-inventory.md`, one row per URL, with page type, template guess, and HTTP status.

**3.2 Visual capture**
- Use Playwright MCP to take full-page screenshots at 375, 768, and 1440 pixel widths for every page in the inventory.
- Record console errors, failed network requests, and broken internal links during capture.
- Output: `00-audit/screenshots/index.md`, listing each file with its URL and width.

**3.3 Performance baseline**
- Use Chrome DevTools MCP to run a Lighthouse audit and a performance trace on the homepage and on one representative page per template.
- Add field data where available: CrUX, PageSpeed Insights, or a Search Console export. If the client cannot provide field data, mark the field section as "not available" and never estimate it.
- Output: `00-audit/performance-baseline.md`, with LCP, INP, and CLS per page. Use the thresholds in `quality-standard.md`: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75.

**3.4 SEO baseline**
- For every page, record the title, meta description, H1, canonical URL, `robots` directives, and structured-data types.
- Request a Search Console export of top pages by impressions and clicks, if the owner grants access. These pages are protected in the plan; see section 5.
- Output: `00-audit/seo-baseline.md`.

**3.5 Accessibility baseline**
- Check contrast, visible focus, heading order, alt text presence, and keyboard reachability of navigation and forms. Use an automated checker if one is connected; otherwise check manually on the captured screenshots and in a keyboard-only walkthrough.
- Output: `00-audit/a11y-baseline.md`.

**3.6 Technical fingerprint**
- Record the framework and CMS if detectable, the number of third-party scripts, the number of font files and weights, image formats, and the total JavaScript on the homepage.
- Output: `00-audit/tech-fingerprint.md`.

If a codebase is provided, the Site Auditor also reads the repository through GitHub MCP to record routes, components, data sources, and dependencies. The repo structure is recorded in `00-audit/codebase-map.md`.

## 4. As-is brand and content extraction

**4.1 Tokens**
- Record the computed colours, fonts, font sizes, spacing scale, border radii, and shadows from the live site. Save them as an as-is token set in `01-as-is/tokens.md`.
- Mark each token as **keep**, **evolve**, or **replace**. The Style Director makes the decision during the redesign, not the extractor.
- Logos and imagery are recorded for reference only. Reuse is allowed only for assets the owner owns.

**4.2 Voice**
- Collect 5–10 representative text samples per page type. Store them in `01-as-is/voice-samples.md`. These samples guide tone in the redesign. They are never reused as final copy without the owner's approval.

**4.3 Content inventory**
- For every page, list each content block and map it to a field in the new data-file schema. Record facts such as prices, dates, licence numbers, legal text, and addresses. These are copied exactly unless the owner approves a change.
- Flag outdated claims, broken links, and placeholder text.
- Output: `01-as-is/content-inventory.md`, plus `migration/content-map.md`.

## 5. Keep / change / remove decisions

Every page receives one decision and one reason. The decision is recorded in `migration/page-decisions.md`.

| Decision | When to use it | URL rule |
|---|---|---|
| **Keep URL, redesign** | The page has traffic, rankings, or links | URL stays the same. No redirect needed. |
| **Keep URL, rewrite content** | The page ranks but its copy is outdated or thin | URL stays the same. Title and H1 change only with a reason. |
| **Merge** | Two or more pages cover the same intent | The retired URLs get 301 redirects to the surviving page. |
| **Remove** | The page is obsolete and has no traffic or links | Return 410 for permanent removal, or redirect to the nearest relevant page. |
| **New** | The redesign needs a page that does not exist yet | No old URL. Add it to the sitemap at launch. |

Rules:
- Pages in the top 20% by organic traffic or with external backlinks default to **keep URL**. Changing these requires a written reason.
- A decision is never made without traffic data or an explicit owner statement that the page is obsolete.
- The Critic checks every decision against the audit before the plan is approved.

## 6. Migration and SEO preservation (Migration Planner)

**6.1 URL map**
- Create `migration/url-map.csv` with three columns: old URL, new URL, and status code (301, 410, or 200). Every old URL that returned 200 must appear in this file.

**6.2 Redirects**
- Write the redirects in `migration/redirects.md`. Verify the current Next.js method for redirects through Context7 before finalising the file. Do not rely on memory for the syntax.
- Redirect chains are not allowed. Each old URL points directly to its final destination.

**6.3 Preservation rules**
- Keep the sitemap complete. Regenerate it at launch and submit it again in Search Console.
- Keep canonical tags correct on every new page.
- Preserve structured data where it is still accurate.
- Do not change a title or H1 on a ranking page without a reason written in the decision log.

**6.4 Launch and rollback**
- Launch in stages: staging review with the owner, then a limited release if the client wants one, then full release.
- Write a rollback plan in `migration/launch-plan.md` that names the exact step to restore the old site.
- After launch, monitor 404 errors and redirect hits for at least 30 days. Sentry can capture runtime errors if connected.

## 7. Before/after QA (Before/After Critic)

The Critic compares old and new builds on five dimensions. Each dimension has a pass rule. A failure blocks launch.

| Dimension | Method | Pass rule |
|---|---|---|
| Visual parity | Playwright screenshots of old and new at 375, 768, and 1440 | Every change is listed in the decision log with a reason |
| Content parity | Compare the content inventory with the new pages | Every fact is present, or its removal is approved by the owner |
| Link parity | Crawl the new site and compare with the URL map | Zero unmapped 404s; every redirect resolves in one hop |
| Performance | Lighthouse and performance trace on the new build | LCP, INP, and CLS are equal to or better than the baseline |
| Accessibility | Repeat the baseline checks | No new violations; no reduction in keyboard access |

Output: `qa/before-after.md`, with one table per dimension and a final pass or fail line.

## 8. Redesign brief additions

The Brief Intake agent must ask these questions in addition to the standard brief fields:

- What is working on the current site, and what must be kept? (brand equity, a flagship page, a logo, a tone)
- What is not working? (conversion, speed, mobile experience, content age, technical debt)
- Which analytics and Search Console access is available, and is the owner willing to share exports?
- Which CMS or data source feeds the current site? Can the new site keep it?
- Is there a staging environment for the new build?
- Is there a launch date, and does the business have seasonal traffic patterns?
- Are there legal or compliance pages that must not change without review?

Mark any unanswered item as ASSUMED, following the rule in `architecture-roster.md`.

## 9. Codebase-based redesign

When the owner has a repository, the redesign can follow the codebase instead of starting from new design files:

- Keep the existing routing structure where it works. Change it only with a reason in the decision log.
- Migrate route by route, not all at once. Each route moves into the new design system with its own before/after check.
- Use GitHub MCP to read the components before writing any plan that changes them.
- Claude Design can read codebases and design files to build a design system (see the research notes for the source and its limits). Verify this on a real repository before relying on it. If the import is weak, the Style Director builds the tokens manually from section 4.1.

## 10. Tool additions for this module

| Tool | Status | Purpose in this module |
|---|---|---|
| Playwright MCP | Required | Visual capture and before/after screenshots |
| Chrome DevTools MCP | Required | Lighthouse and performance traces |
| GitHub MCP | Required when a repo exists | Reading components and routes |
| Firecrawl | Recommended | Page scraping for discovery and content extraction |
| Search Console and analytics access | Owner-provided | Traffic-based decisions and SEO baseline |
| Accessibility checker | Verify | Automated accessibility baseline (no connector confirmed in this session) |
| Sentry | Recommended | Post-launch error monitoring |

## 11. Acceptance test for the module

Use a site the owner controls, with a known set of 10–15 pages, a sitemap, and at least one repository. The module passes only if it produces:

1. A complete page inventory with a screenshot for every page at three widths.
2. A baseline report with performance, SEO, and accessibility numbers for each template.
3. A content inventory with every fact mapped to the new schema.
4. A decision for every page, with a reason and a traffic check for each ranking page.
5. A URL map with no unmapped live URLs and no redirect chains.
6. A before/after report that finds at least one deliberate change and records it.

Failure on any item means the module is not ready for client use.

## 12. Verification list (not confirmed in this research)

- Whether Firecrawl offers a crawl or map operation in this session
- Whether Claude Design's web-capture flow (pulling a live site into a design) works as described in secondary sources
- The current Next.js redirect syntax in the installed version
- Whether an automated accessibility checker is available as a connector


---

## Part G: Redesign module additions

Add these five sub-agents to the roster in Part A. Their full definitions are in Part F: Site Auditor, Brand Extractor, Content Migrator, Migration Planner, and Before/After Critic.

Add these paths to the output tree:
- `00-audit/`: `page-inventory.md`, `screenshots/index.md`, `performance-baseline.md`, `seo-baseline.md`, `a11y-baseline.md`, `tech-fingerprint.md`, and `codebase-map.md` when a repository exists
- `01-as-is/`: `tokens.md`, `voice-samples.md`, `content-inventory.md`
- `migration/`: `page-decisions.md`, `url-map.csv`, `redirects.md`, `content-map.md`, `launch-plan.md`
- `qa/`: `before-after.md`
- `95-decisions.md` records every keep, change and remove decision, and every redesign choice with its reason.
