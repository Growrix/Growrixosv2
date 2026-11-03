## Part H: Verify before the first real project

These items were not confirmed during research. Each must be checked against current documentation or the installed tool before the agent relies on it.

**Motion (Part B)**
- Browser support for CSS scroll-driven animations (`animation-timeline`). Gate it with `@supports`.
- Whether the App Router supports the view-transition API as described.
- The Lottie (100 KB) and Rive (150 KB) size limits are defaults, not sourced figures.

**Stack (Part E)**
- Install commands and package names for Context7, Chrome DevTools MCP, Firecrawl, Framelink, Lenis, Rive, Lottie and Spline.
- The Vercel, GitHub and Sentry endpoints.
- How `/design-sync` behaves.
- Whether `${VAR}` environment-variable expansion works in `.mcp.json`.

**Performance (Part D)**
- The exact Chrome DevTools MCP tool names. Check them against the installed README.
- Option names for Lenis, `useGSAP` and Sentry.

**Architecture and playbooks (Parts A and C)**
- WCAG 2.2 AA as the default, the 0–4 motion-intensity scale, and the budget-tier scope levers are design choices, not sourced facts. Confirm them with the owner.
- The performance budgets in Part C are proposed defaults, adjustable per client.

**Redesign (Part F)**
- Whether Firecrawl offers a crawl or map operation.
- Whether Claude Design's web-capture flow works as described in secondary sources.
- Whether an automated accessibility checker is available as a connector.
