---
name: migration-safety-checklist
description: The sequence `migration-runner` must follow before applying any DB migration to a production environment. Not optional for destructive migrations. The agentic system uses this skill as a hard gate — the migration doesn't run if the checklist isn't completed and recorded.
---

# Migration safety checklist

## Classify first

Every migration is one of:
- **Additive** — new table, new column (with default), new index. Safe to apply any time.
- **Reversible** — rename a column, change a type with a cast, add a constraint that current data satisfies. Apply with care.
- **Destructive** — DROP TABLE, TRUNCATE, DELETE without WHERE, NOT NULL on an existing column with rows, column type change that loses data. Requires the full checklist.

## For additive migrations
- [ ] Dry-run against shadow DB — pass
- [ ] Apply to prod
- [ ] Verify with a smoke query

## For reversible migrations (add the above plus)
- [ ] `-- rollback:` comment at the bottom of the migration, specifying how to undo
- [ ] Dry-run reverses successfully on shadow DB
- [ ] Confirmed no running queries depend on the pre-migration shape
- [ ] Apply to prod, pause 30s, verify

## For destructive migrations (add all the above plus)
- [ ] Fresh backup within the last hour, location documented
- [ ] Written rollback plan (not just the SQL — the operational steps)
- [ ] Dry-run against shadow DB
- [ ] Expected row counts documented BEFORE applying
- [ ] Explicit user approval in the chat ("yes, apply destructive migration XXX")
- [ ] Apply to prod
- [ ] Verify row counts and smoke queries
- [ ] Keep the backup until 48 hours after apply

## Hard rules

- **Never bulk-apply.** One migration at a time, in order.
- **Never skip dry-run.** The shadow DB is cheap; a bad prod migration isn't.
- **Never ignore a `-- rollback:` comment that's missing.** If a destructive migration doesn't have one, send it back to `database-dev` first.
- **Never apply during peak traffic unless rolling back a worse bug.** 2am local time or a scheduled window is the default.

## The recorded log

The migration-runner writes `docs/reports/migration-<timestamp>.md` capturing:
- Classification of each migration applied
- Shadow DB results
- Prod apply timestamps
- Expected vs actual row counts
- Any errors encountered + resolution

This log is what `/retrospective` reads to improve the pattern for next time.
