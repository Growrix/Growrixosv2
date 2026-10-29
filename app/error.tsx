"use client";

// Route error boundary (C-26 StatusPageShell, client as Next requires).
// Renders inside the root layout with chrome. Copy comes from
// siteSettings.statusPages.error in a later slice; no copy is hardcoded.
// The `error` and `reset` props Next passes are wired in when C-26 is built.
export default function RouteError() {
  return null;
}
