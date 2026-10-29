---
description: Run support-triager against the current inbound queue. Classifies, labels, assigns owners, and summarizes.
---

Invoke the `support-triager` subagent now. It must:

1. Pull inbound: `gh issue list --state open --json number,title,labels,body,createdAt,author`.
2. For each issue, classify per `.claude/agents/support-triager.md`.
3. For reproducible bugs, open the live product and verify the repro. Document in a comment.
4. Add appropriate labels (`bug`, `feature-request`, `question`, `duplicate`, `wontfix`).
5. For in-scope feature requests, add a `backlog` label and a one-line PRD framing.
6. Report back a summary: counts by category, top 3 items that need the user's attention, security flags if any.

Do NOT:
- Close issues without a reply.
- Guess at reproductions without opening the product.
- Promise fixes you don't own.
