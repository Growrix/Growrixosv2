"use client";

// Root error (C-27). Replaces the root layout, so it is standalone:
// its own <html> and <body>, static copy, no CMS chrome. The static copy and
// the `error` / `reset` props are wired in the status-pages slice.
export default function GlobalError() {
  return (
    <html lang="en" data-theme="light">
      <body />
    </html>
  );
}
