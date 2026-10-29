"use client";

import { GlobalErrorPage } from "@/components/layout/GlobalErrorPage";
import { GLOBAL_ERROR_COPY } from "@/lib/static-copy/global-error";

import { fontDisplay, fontSans } from "./fonts";
import "./globals.css";

// Root error (C-27). Replaces the root layout, so it is standalone: its own
// <html> and <body>, static copy (C-66), no CMS chrome, light theme only.
// The copy is TBD-from-client (B-08): while it is empty the body is empty.
// Error capture (Sentry) belongs to the launch slice.
export default function GlobalError() {
  const title = GLOBAL_ERROR_COPY.heading.trim();
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${fontDisplay.variable} ${fontSans.variable}`}
    >
      <body>
        {title ? <title>{title}</title> : null}
        <GlobalErrorPage copy={GLOBAL_ERROR_COPY} />
      </body>
    </html>
  );
}
