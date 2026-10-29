import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { HeadBootstrap } from "@/components/layout/HeadBootstrap";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/ui/SkipLink";
import { getLayoutData } from "@/lib/cms/fetchers";
import { SERVER_THEME_COLOR } from "@/lib/utils/theme";

import { fontDisplay, fontSans } from "./fonts";
import "./globals.css";

// Interim metadata for the homepage slice (preview only, D-027).
// The title is the fixed brand name; real metadata (metadataBase, description,
// Open Graph) is read from Sanity in a later slice.
export const metadata: Metadata = {
  title: "Growrix OS",
  robots: { index: false, follow: false },
};

// 02-tokens.md §1.1: server `theme-color` = light `--c-bg`; C-13 updates it.
export const viewport: Viewport = {
  themeColor: SERVER_THEME_COLOR,
};

/**
 * Interim skip-link text, used ONLY while no CMS data exists (B-01: no Sanity
 * project yet). It is the plan's documented seed value for `ui.skipLink`
 * (06-content-schemas.md §1.1, CLIENT 02 §9.11). Once layout data exists the
 * label comes from `ui.skipLink` alone (empty → no skip link). Remove this
 * constant when B-01 is resolved.
 */
const INTERIM_SKIP_LABEL = "Skip to content";

// Root layout (D-025, 91-stack.md §3): all shared chrome lives here so
// not-found.tsx and error.tsx inherit the same landmarks and #main.
// Server Component: never "use client". Static: the CMS read is a cached,
// tagged fetch (no cookies(), headers() or searchParams).
// DOM order = visual order = tab order (home.wireframe.md §2).
export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const data = await getLayoutData();
  const settings = data?.siteSettings ?? null;
  const ui = settings?.ui ?? {};
  const skipLabel = data ? (ui.skipLink ?? "") : INTERIM_SKIP_LABEL;

  // Chat (C-30, slice 6): available only when every required `concierge`
  // field is set (06 §1.2, B-06). False until slice 6 builds the triggers.
  const chatAvailable = false;

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
        {/* 1. C-07 SkipLink: first focusable element, targets #main. */}
        <SkipLink label={skipLabel} />

        {/* 2. C-10 Header (banner). Renders nothing without CMS data (R-03). */}
        {settings ? (
          <SiteHeader
            brandName={settings.brandName}
            navigation={settings.navigation}
            ctas={settings.ctas}
            ui={ui}
            chatLabel={settings.concierge.title}
            chatAvailable={chatAvailable}
          />
        ) : null}

        {/* 3. Main landmark. Below 768 px it always reserves the CTA bar
            height (wireframe §4.3: CLS 0). */}
        <main id="main" className="max-md:pb-(--bar-h)">
          {children}
        </main>

        {/* 4. C-16 Footer (contentinfo). */}
        {settings ? (
          <SiteFooter
            footer={settings.footer}
            verifyLinks={settings.verifyLinks}
            upwork={settings.ctas.upwork}
            brandName={settings.brandName}
            footerNavLabel={ui.footerNavLabel}
            externalSuffix={ui.externalSuffix}
          />
        ) : null}

        {/* 5. C-15 Mobile CTA bar (after the footer in the DOM; M only). */}
        {settings ? (
          <MobileCtaBar
            fitCall={settings.ctas.fitCall}
            teardown={settings.ctas.teardown}
          />
        ) : null}

        {/* 6. C-30 ChatRoot (launcher + lazily loaded dialog) mounts here in
            slice 6, rendered only when `chatAvailable`:
            {chatAvailable ? <ChatRoot ... /> : null} */}
      </body>
    </html>
  );
}
