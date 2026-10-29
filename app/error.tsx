"use client";

import { StatusPageShell } from "@/components/layout/StatusPageShell";

// Route error boundary (C-26 StatusPageShell; client, as Next requires).
// Renders inside the root layout, so the chrome and #main stay.
//
// Copy: the plan sources it from siteSettings.statusPages.error, but a client
// error boundary cannot call the server-only CMS fetcher and the plan defines
// no channel for passing that copy to it (reported as a plan gap). Until that
// is decided, and while B-08 leaves the copy empty anyway, the shell gets no
// copy and renders nothing (R-03). Error capture (Sentry) belongs to the
// launch slice; there is no monitoring port in this slice.
export default function RouteError() {
  return <StatusPageShell kind="error" copy={null} />;
}
