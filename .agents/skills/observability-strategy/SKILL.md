---
name: observability-strategy
description: The plan for what to measure, when to alert, and who to wake up — written in Phase 1, applied in Phase 2 + 4. Used by system-architect to define SLOs, by monitoring-dev to wire alerts, and by phase4-coordinator to confirm alerts are tuned before marking Phase 4 complete. Not just "install Sentry" — a strategy, with on-call runbooks and alert thresholds that a senior dev would set before launch, not after the first incident.
---

# Observability strategy

Wiring Sentry is a 10-minute job. Deciding **what matters, what to alert on, and what to do when the alert fires** is the senior-dev part.

## The three pillars (set in Phase 1 by `system-architect`)

### 1. SLOs — Service Level Objectives

For each user-facing surface, pick ONE metric and ONE target:

| Surface | Metric | Target | Window |
|---|---|---|---|
| Public pages (`/`, landing) | p95 TTFB | ≤ 600ms | 30-day rolling |
| Authenticated page loads | p95 render time | ≤ 1500ms | 30-day rolling |
| Server actions (writes) | p95 response time | ≤ 400ms | 30-day rolling |
| Background jobs (cron, webhooks) | success rate | ≥ 99.5% | 30-day rolling |
| Uptime (any route returns 200) | availability | ≥ 99.9% (~43 min down/mo) | 30-day rolling |

**Default**: pick 3 SLOs. More than 5 is a signal nobody owns them.

### 2. Alerts — what fires a page

Alerts come in three severities:

- **🔴 Page (wake someone up):** SLO breach for 15 min, 5xx rate > 1% for 5 min, database down, auth provider down, prod deploy failed.
- **🟡 Ticket (handle in business hours):** Error-rate 2x baseline for 1 hour, dependency CVE Critical/High, backup failed, cert expires in 7 days.
- **🟢 Dashboard (look at weekly):** New user signups rate, feature adoption, cost tracking.

Every page-level alert MUST have:
- A one-sentence description of what's wrong
- A link to the runbook
- A link to the dashboard showing the breach

### 3. Runbooks — what to do when alerts fire

For every page-level alert, write a `docs/runbooks/<alert-name>.md`:

```markdown
# Runbook — <alert name>

## What this alert means
<One paragraph. The specific condition that fired this alert.>

## Who to contact first
<Role / rotation. Never a single person — rotation or escalation group.>

## First 3 steps
1. <Check specific dashboard URL>
2. <Check specific log query>
3. <Decide: continue investigation, failover, rollback>

## Known false-positive scenarios
<Specific; prevents alert fatigue.>

## Common root causes + fixes
- <Cause 1> → <specific fix with commands>
- <Cause 2> → ...

## Escalation
<When to page the next person. What info to pass.>

## Post-incident
<Blameless post-mortem template link. Update this runbook with what was learned.>
```

## Where this skill plugs into the system

- **Phase 1 (`system-architect`)** reads this skill when writing `docs/architecture.md` — adds a mandatory `## Observability` section listing the 3 SLOs + 5-10 alerts.
- **Phase 2 (`monitoring-dev`)** reads the SLOs + alerts from architecture.md, wires them into Sentry / Datadog / whatever the manifest's `monitoring.provider` is. Writes `docs/runbooks/*.md` as stubs.
- **Phase 4 (`phase4-coordinator`)** verifies before marking Phase 4 complete:
  - Every page-level alert in architecture.md is actually configured in the monitoring provider
  - Every alert has a corresponding runbook
  - The on-call rotation (or a single human) is named and knows they're on-call
  - A test alert has fired once to confirm the pager works

## Rules

- **SLOs are promises; alerts enforce them; runbooks resolve them.** Don't skip the runbook step — an alert without a runbook is noise.
- **Start with 3 SLOs.** It's easier to add more than to kill ones nobody owns.
- **Every alert has a verified recipient.** A page-level alert that goes to a stale Slack channel is a false sense of safety.
- **Alert on symptoms, not causes.** "p95 render time breached" > "database CPU at 80%". The former is user-visible; the latter is noise if it doesn't affect users.
- **Review alerts quarterly.** Kill the ones that only ever fire false positives. Add new ones for incidents that caught you by surprise.

## Anti-patterns (what senior devs avoid)

- 💀 **Alerting on every error.** Noise. Real errors drown in the stream.
- 💀 **Alerting without runbooks.** First-response person has to figure it out at 3am.
- 💀 **"Just watch the dashboard."** Dashboards are for post-hoc analysis, not detection.
- 💀 **Single-point-of-failure alert destination** (one person's email, one Slack channel without redundancy).
- 💀 **Measuring what's easy** instead of what matters. Response time is easy; p95 of a specific user journey is what matters.
