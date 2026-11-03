---
name: backup-dr-plan
description: The backup + disaster recovery plan every production system needs. Written in Phase 1 by system-architect, implemented in Phase 4 by hosting-dev + migration-runner, verified before Phase 4 gate closes. Covers backup cadence, retention, restore testing, and RTO/RPO targets. Not just "the DB has backups" — a verified plan with a restore drill cadence a senior dev would set before launch.
---

# Backup + disaster recovery plan

A backup you've never restored is a wish, not a backup. This skill defines what gets backed up, how often, where, how long, and — critically — how often you prove you can restore it.

## The four decisions (made in Phase 1 by `system-architect`)

### 1. RPO — Recovery Point Objective
*"How much data can we afford to lose?"*

- **MVP / internal tools:** 24 hours (daily backup)
- **Early-stage SaaS:** 1 hour (hourly backup or PITR)
- **Revenue-critical:** 15 min or less (continuous WAL archiving / managed PITR)

Pick ONE. Document it in `docs/architecture.md` → Observability section.

### 2. RTO — Recovery Time Objective
*"How long can we be down?"*

- **MVP:** 24 hours
- **Early-stage SaaS:** 4 hours
- **Revenue-critical:** 1 hour

Pick ONE. This drives tooling choice (manual restore script vs managed failover).

### 3. What to back up
Not just the DB. The full list a senior dev considers:

- **Primary DB** (Postgres / MySQL / etc.) — tables + roles + policies
- **Blob / file storage** (uploaded files, user avatars) — if any
- **Secrets store** (Vercel/AWS SM contents) — key rotation events logged, not full values
- **Code + infra config** — git repo + any out-of-git IaC state
- **Analytics event data** (if the raw stream matters)
- **Audit logs** (regulatory requirement for finance / health / etc.)

Document each with: provider, backup method, cadence, retention.

### 4. Where backups live
- **Not on the same provider as production.** If AWS us-east-1 goes down, your backup in AWS us-east-1 is also down.
- **Not in the same account.** Compromised prod account must not grant backup deletion.
- **Encrypted at rest** with a different key than production.

## Where this plugs into the system

### Phase 1 — `system-architect`
Adds a `## Backup + DR` section to `docs/architecture.md`:
- RPO + RTO targets
- Table of each data category + backup provider + cadence + retention + restore procedure link
- One-paragraph DR scenario walkthrough: "If the DB region fails, we restore from <backup location> to <alternate region> in <X hours>."

### Phase 4 — `migration-runner` + `hosting-dev`
Implements:
- **Backup automation**: cron / scheduled function that runs the backup at the committed cadence. For Neon, Supabase, PlanetScale — managed backups cover this; verify the retention matches the plan.
- **Restore script**: `scripts/restore-from-backup.ts` that takes a backup timestamp and restores to a target DB (never prod directly; always restore to a shadow first).
- **Monthly restore drill** scheduled: `scripts/drill-restore.ts` that restores last-week's backup to a scratch DB, runs smoke queries, reports success/failure. Scheduled via Vercel Cron / GitHub Actions.

### Phase 4 gate (`phase4-coordinator` verifies before marking complete)
- [ ] `docs/architecture.md` has the Backup + DR section with specific RPO/RTO
- [ ] Backup automation is live (verified by looking at the backup provider's dashboard — the most recent backup is within RPO)
- [ ] Restore script exists and has been **run at least once** against a scratch DB — not just written
- [ ] `scripts/drill-restore.ts` is scheduled and the next run is within 30 days
- [ ] Alert fires if a backup fails (ties to `observability-strategy` skill)

## Rules

- **A backup you haven't restored is a wish.** The drill is non-optional.
- **Restore to a scratch DB, never to prod.** A "restore to prod" is for the actual DR event, not practice.
- **RPO/RTO in writing beats aspirational targets.** "15 minutes" that nobody confirmed can be met is worse than "4 hours" that's been proven.
- **Secrets go in a separate backup system.** DB backup provider shouldn't have the keys to decrypt production.
- **Document the restore procedure** in `docs/runbooks/db-restore.md` with specific commands. During an incident is not when to figure out the syntax.

## Anti-patterns

- 💀 **"The DB provider handles backups"** — provider defaults rarely match a specific RPO. Verify.
- 💀 **Backing up to the same AWS account** — a compromised account owns everything.
- 💀 **Testing restores "when we have time"** — translates to never.
- 💀 **Backing up code but not infra config** — restoring to a new region without the Vercel/Fly config is a half-restore.
- 💀 **90-day backups** on data under GDPR right-to-delete — your backup retention becomes a compliance problem.
