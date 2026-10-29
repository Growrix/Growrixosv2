---
name: error-boundary-pattern
description: Where error boundaries go in a Next.js (or equivalent) App Router product, and what they capture. Used by frontend-dev and monitoring-dev together — frontend writes the boundaries, monitoring wires them to the capture port.
---

# Error boundary pattern

## Where they go

### Framework-level (automatic)

- `app/error.tsx` — top-level route segment error. Catches server-render failures and uncaught client errors inside the segment.
- `app/global-error.tsx` — top-level layout failure (rare but necessary).
- `app/<segment>/error.tsx` — per-feature boundary. Prevents one broken feature from blanking the whole app.

### App-level (manual)

- Around `<Suspense>` boundaries that fetch user data.
- Around any third-party widget (map, video player, embedded iframe) that could throw.

## What each boundary does

1. Call the monitoring port: `captureException(err, { context: 'segment:<name>' })`. The port is `@/lib/monitoring`, not Sentry directly.
2. Render a user-facing message: specific where it can be (payments error), generic where it must be (unknown error).
3. Offer a recovery path: retry (reset), go back, or sign out.
4. Never leak stack traces to users in production.

## Shape

```tsx
'use client'
import { captureException } from '@/lib/monitoring'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  captureException(error, { context: 'dashboard' })
  return (
    <div role="alert" className="...">
      <h2>Something went wrong on this page</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Rules

- **Every route segment that fetches user-scoped data gets an `error.tsx`.** No exceptions.
- **Capture before UI.** `captureException` is called before anything else in the boundary.
- **Boundaries don't eat errors.** They log + show. They don't retry silently.
- **No `console.log(err)` in production code.** Monitoring port handles it.
- **The port is `@/lib/monitoring`, never Sentry (or whatever vendor) directly.** Port rule applies here too.
- **Suspense + error boundaries pair.** A loading state without an error boundary is a hang-on-failure.
