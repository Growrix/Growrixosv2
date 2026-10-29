import type { Metadata } from "next";
import type { ReactNode } from "react";

import { HeadBootstrap } from "@/components/layout/HeadBootstrap";
import { SkipLink } from "@/components/ui/SkipLink";

import { fontDisplay, fontSans } from "./fonts";
import "./globals.css";

// Interim metadata for the homepage slice (preview only, D-027).
// The title is the fixed brand name; real metadata (metadataBase, description,
// Open Graph) is read from Sanity in a later slice.
export const metadata: Metadata = {
  title: "Growrix OS",
  robots: { index: false, follow: false },
};

// Root layout (D-025, 91-stack.md §3): all shared chrome lives here so
// not-found.tsx and error.tsx inherit the same landmarks and #main.
// Server Component: never "use client".
// DOM order = visual order = tab order (home.wireframe.md §2).
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    // suppressHydrationWarning: C-18 rewrites class, data-theme, data-motion
    // and data-home-top on <html> before hydration (applies to <html> only).
    <html
      lang="en"
      data-theme="light"
      className={`no-js ${fontDisplay.variable} ${fontSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* C-18 head bootstrap (inline script: removes `no-js`, applies the
            stored theme, sets `data-motion` before first paint). */}
        <HeadBootstrap />
        {/* C-08 JSON-LD @graph mounts here (siteSettings + person). */}
      </head>
      <body>
        {/* 1. C-07 SkipLink: first focusable element, targets #main.
            Interim text = the plan's documented value for `ui.skipLink`
            (06-content-schemas.md, CLIENT 02 §9.11). Replaced by the Sanity
            field when C-07 is built; styling (visible on focus) is ui-dev's. */}
        <SkipLink label="Skip to content" />

        {/* 2. C-10 Header (banner) mounts here. */}

        {/* 3. Main landmark. */}
        <main id="main">{children}</main>

        {/* 4. C-16 Footer (contentinfo) mounts here. */}

        {/* 5. C-15 Mobile CTA bar mounts here (after the footer in the DOM). */}

        {/* 6. C-30 Chat root (launcher + lazily loaded dialog) mounts here. */}
      </body>
    </html>
  );
}
