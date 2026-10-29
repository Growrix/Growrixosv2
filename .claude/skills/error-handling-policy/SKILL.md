---
name: error-handling-policy
description: The cross-cutting rulebook for how every capability-dev handles errors — when to retry, when to fail fast, user-facing message format, monitoring context, error-boundary placement. Prevents each capability-dev from improvising their own error style, which is how an inconsistent error UX ships. Loaded by frontend-dev, ui-dev, api-dev, auth-dev, database-dev, email-dev, storage-dev, payments-dev, monitoring-dev during Phase 2 Build.
---

# Error-handling policy

Every capability-dev follows these rules. If a review finds code that doesn't match this policy, `code-reviewer` flags it and `bug-fixer` routes to the owning dev.

## 1. Classify every error

```
┌──────────────────────┬──────────────────────────────────────┬───────────────────┐
│ Class                │ Example                              │ Response           │
├──────────────────────┼──────────────────────────────────────┼───────────────────┤
│ user-recoverable     │ Invalid email in a form              │ Show inline error │
│                      │ Password too short                   │ Guide to fix      │
├──────────────────────┼──────────────────────────────────────┼───────────────────┤
│ business             │ Payment declined                     │ User-friendly msg │
│                      │ Rate limited                         │ + retry guidance  │
│                      │ Not authorized                       │                   │
├──────────────────────┼──────────────────────────────────────┼───────────────────┤
│ transient-system     │ DB timeout                           │ Retry (backoff)   │
│                      │ Network error                        │ Then fail with    │
│                      │ Provider webhook delivery failed     │ context           │
├──────────────────────┼──────────────────────────────────────┼───────────────────┤
│ permanent-system     │ Programming bug (null deref)         │ Capture to        │
│                      │ Config missing (no DATABASE_URL)     │ monitoring,       │
│                      │ Dependency crashed                   │ fail fast         │
└──────────────────────┴──────────────────────────────────────┴───────────────────┘
```

## 2. When to retry — a decision tree

```
Error happened.
├── Is the operation idempotent? ────────── no → DO NOT retry (data corruption risk)
│                                            └── fail fast + log + user-friendly msg
├── yes → Is the error transient?
│          ├── yes (timeout, 5xx from a flaky dep) → retry with EXPONENTIAL BACKOFF
│          │                                          max 3 attempts, max 10s total
│          └── no (4xx, validation, business rule)  → DO NOT retry; it won't change
└── After retries exhausted → fail; capture with full context
```

**Idempotent operations** — safe to retry: GET, PUT with full state, UPSERT, "ensure exists" patterns.
**Non-idempotent operations** — never auto-retry: POST that creates records without idempotency keys, charge-a-card, send-email.

Add idempotency keys to non-idempotent operations where possible; THEN they're safe to retry.

## 3. User-facing error messages

Rules:
- **Never show a stack trace.** Not in prod, not in staging. Dev only.
- **Say what went wrong** (specific, not "something broke").
- **Say what the user can try** ("sign in again", "check your connection", "contact support with reference <id>").
- **No apologies.** "Sorry about that!" is noise. Users want solutions.
- **No blame.** Not "invalid email you entered" — just "email address isn't recognized."
- **Keep it ≤ 2 sentences.** Longer and users won't read.
- **Include a reference ID** for persistent-system errors so support can trace.

**Format** (consistent across the app):

```jsx
<ErrorMessage
  title="Couldn't save your changes"
  body="Your session may have expired. Sign in again?"
  action={<Button onClick={signIn}>Sign in</Button>}
  reference="err_abc123"   {/* only for system errors; omit for user-recoverable */}
/>
```

## 4. Monitoring capture

- **user-recoverable + business**: do NOT capture to monitoring (noise). Log the counter metric (how often this specific form field errors) but not the full error.
- **transient-system (final failure after retries)**: capture with context: user ID, request ID, retry count, which dependency.
- **permanent-system**: capture immediately with full stack, request body (minus secrets), user ID, request ID.

**Context stripping before capture** (always):
- Remove `Authorization` headers
- Remove `Cookie` headers
- Remove `req.body.password`, `req.body.token`, `req.body.card`, `req.body.ssn` keys
- Remove any key matching `/secret|token|password|credit|ssn/i`

The `monitoring-dev`'s port exposes `captureException(err, ctx)` which does this stripping automatically — business code just calls it with raw context.

## 5. Error boundary placement

- **Route segment** (`app/<segment>/error.tsx` in Next): catches any uncaught error in that segment's render tree. Required per segment.
- **Global** (`app/global-error.tsx`): catches layout failures. One per app.
- **Suspense boundaries**: every `<Suspense>` has a sibling `<ErrorBoundary>`. Hang-on-failure is worse than a visible error.
- **Third-party widgets** (maps, players, embedded iframes): wrap in a local error boundary. One broken embed shouldn't blank the page.

Each boundary:
1. Calls `captureException(err, { context: 'segment:<name>' })` (via the monitoring port).
2. Renders a user-friendly message per rule 3.
3. Offers a `reset()` button where the framework supports it.

## 6. Hard rules — no exceptions

- **No empty catch blocks.** `catch (e) {}` is banned. If an error is truly ignorable, catch + comment why + still log at `debug` level.
- **No swallowed errors.** Catch + rethrow with context, OR catch + handle fully. Not catch + do-nothing.
- **No logging raw tokens.** Follow the context-stripping rules above.
- **No `alert()` for errors.** Use the ErrorMessage component.
- **No breaking changes to error shapes mid-release.** If an API's error response structure changes, that's a breaking change — bump a version.
- **Never retry non-idempotent operations without an idempotency key.** Payment double-charges are catastrophic.

## 7. What a reviewer looks for

`code-reviewer` runs these greps against every PR:

```bash
grep -r 'catch\s*(\s*\w*\s*)\s*{\s*}' app/ components/ lib/  # empty catch
grep -r 'console\.error' app/ components/ lib/               # should use captureException
grep -r 'alert(' app/ components/                            # user-facing alert
```

Any hit is a finding.
