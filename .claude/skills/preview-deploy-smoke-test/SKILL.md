---
name: preview-deploy-smoke-test
description: The quick HTTP sweep hosting-dev runs after every preview or prod deploy. Catches "nothing loads" bugs before the human sees them. Hits a small set of key routes, confirms 200s, and flags any 4xx/5xx.
---

# Preview-deploy smoke test

## What it checks

A short list of key routes derived from `docs/flows/*.md` — the handful that would make the product unusable if broken:

- `GET /` (landing)
- `GET /dashboard` (or the main authenticated page) — expects a redirect or 200
- `GET /_health` or `GET /api/health` if the project has one
- One `GET` from each major feature's primary page

Not every route. Not E2E. The point is "the deploy didn't completely break."

## How it runs

```bash
BASE_URL="https://preview-url.example.com"
for route in "/" "/dashboard" "/projects" "/calendar" "/analytics" "/notifications"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route")
  echo "$route → $status"
done
```

A route returning 2xx or an expected 3xx (e.g. unauth redirect) passes. 4xx or 5xx fails the smoke test.

## When it runs

- **After every preview deploy** — `ci-cd-engineer`'s preview workflow runs this and posts the result to the PR.
- **After every prod deploy** — `hosting-dev` runs this in the terminal; if it fails, flag for immediate rollback.
- **After every DB migration applied to prod** — `migration-runner` runs this to catch migrations that silently broke a query.

## What a failure means

- **5xx on a route that worked yesterday** → regression. Block the deploy; dispatch to the owning capability-dev via `bug-fixer`.
- **4xx on `/` or `/dashboard`** → routing or auth misconfiguration. The hosting adapter or middleware probably broke.
- **A route times out** → bigger problem than smoke tests catch. Flag and investigate before promoting.

## Rules

- The smoke test is a tripwire, not a test suite. Don't grow it to cover feature behavior — that's `test-writer`'s job.
- If a route is flaky, don't retry three times to make it green. One attempt per route. If flaky, the service is broken for some users.
- Never run smoke test as a blocking gate on `GET` routes that are inherently slow (reports, exports). Pick fast reps.
