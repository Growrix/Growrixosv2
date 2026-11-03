---
name: rate-limit-pattern
description: The default rate-limiting approach for any port that handles public-unauthed traffic (webhook endpoints, sign-in, sign-up, public API). Lives at the port layer so the adapter picks the store (KV, Upstash, DB). Used by api-dev and the auth/email/payments devs.
---

# Rate-limit pattern

## Where it goes

**At the port**, not inside each adapter.

```
lib/rate-limit/
  index.ts        <- port: check(key, { limit, window }), reset(key)
  <provider>.ts   <- adapter: @upstash/ratelimit, a Postgres table, in-memory, etc.
```

Every port that handles public traffic calls `rateLimit.check(ip, { limit: 10, window: '1m' })` **before** any auth check. Hitting the limit returns a typed `{ ok: false, error: 'rate_limited' }`.

## Which routes need it

- **Always:** sign-in, sign-up, password reset, forgot-password
- **Always:** every webhook route (even verified webhooks can be flooded)
- **Usually:** search endpoints that touch the DB expensively
- **Usually:** public read endpoints (marketing site, public pricing)
- **Sometimes:** authenticated write endpoints that can be abused by one logged-in attacker

## Default budgets

- **Sign-in / sign-up / password reset:** 5 attempts / 15 min / IP + 5 / hour / email
- **Webhooks:** 100 / 10s / provider (never block legit webhook retries)
- **Public read:** 60 / minute / IP
- **Authenticated writes:** 300 / minute / user (effectively unlimited for real users, catches scripts)

## The port shape

```typescript
export type RateLimitResult = { ok: true; remaining: number } | { ok: false; retryAfterSec: number }

export declare function check(key: string, opts: { limit: number; window: string }): Promise<RateLimitResult>
export declare function reset(key: string): Promise<void>
```

## Adapter choices (for an adapter skill to document per vendor)

- **Upstash Redis** — serverless-friendly, free tier, works globally
- **Postgres table** (same DB as the app) — one less vendor, slightly slower, writes contend with app writes
- **In-memory** — fine for dev, broken on multi-instance prod
- **Vercel KV / Cloudflare KV** — hosting-provider-native, zero extra config

## Rules

- **Rate-limit by IP AND by target** (email, user ID, API key). An attacker rotating IPs still gets limited by email.
- **Return `retryAfterSec` and set the `Retry-After` header.** Not just a 429.
- **Never rate-limit on a cold storage backend.** The check is in the hot path; it must be sub-10ms.
- **Flag the rate limit in Sentry/monitoring at 50% consumption** so you see the attack starting, not after the user complains.
