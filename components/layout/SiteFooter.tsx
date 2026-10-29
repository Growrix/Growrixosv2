import { VerifyRow } from "@/components/trust/VerifyRow";
import { TextLink } from "@/components/ui/TextLink";
import { resolveVerifyLinks } from "@/lib/cms/platforms";
import type { CtaUpwork, Nullable, SiteSettings } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { CHROME_IDS } from "./chrome-state";

/** Wireframe §4.2 legal row: "© year + brandName". */
const COPYRIGHT_SIGN = "©";

/**
 * Link-column grid by column count `n` (wireframe §4.2): T = 3 columns for
 * n = 3 and 2 × 2 for n = 4 (the table's worked examples; see report);
 * D = an equal `n`-column sub-grid in cols 5–12.
 */
const COLUMN_GRID: Record<number, string> = {
  1: "md:grid-cols-1 lg:grid-cols-1",
  2: "md:grid-cols-2 lg:grid-cols-2",
  3: "md:grid-cols-3 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export type SiteFooterProps = {
  footer: SiteSettings["footer"];
  verifyLinks: SiteSettings["verifyLinks"];
  upwork: Nullable<CtaUpwork>;
  brandName: string | null;
  /** `ui.footerNavLabel`; the `aria-label` is omitted while empty (B-07). */
  footerNavLabel?: string;
  /** `ui.externalSuffix` for the external links (empty → omitted, B-07). */
  externalSuffix?: string;
};

/** Footer nav and legal links: muted text, underline + ink on hover. */
const FOOTER_LINK =
  "inline-flex min-h-11 items-center text-text-muted hover:text-text hover:underline hover:underline-offset-3 active:text-text";

/**
 * C-16 (server). `<footer>` (contentinfo): descriptor → `<nav id="footer-nav">`
 * with column headings as H2 → verify row → legal row. `id="footer-nav"` is
 * the no-JS target of the menu button. Renders nothing when every block is
 * empty (R-03). The year is rendered at build time.
 */
export function SiteFooter({
  footer,
  verifyLinks,
  upwork,
  brandName,
  footerNavLabel,
  externalSuffix,
}: SiteFooterProps) {
  const columns = footer.columns
    .map((col) => ({
      key: col._key,
      heading: col.heading,
      links: col.links.filter(
        (l): l is { _key: string; label: string; href: string } =>
          Boolean(l.label && l.href),
      ),
    }))
    .filter((col) => col.links.length > 0);
  const legalLinks = footer.legalLinks.filter(
    (l): l is { _key: string; label: string; href: string } =>
      Boolean(l.label && l.href),
  );
  // `ctas.upwork.href` comes from `verifyLinks[platform=upwork]` (06 §1).
  const upworkUrl =
    verifyLinks.find((v) => v.platform === "upwork")?.url ?? null;
  const upworkLabel = upwork?.label ?? null;
  const copyright = brandName
    ? `${COPYRIGHT_SIGN} ${new Date().getFullYear()} ${brandName}`
    : null;

  const hasLegal =
    Boolean(copyright) ||
    legalLinks.length > 0 ||
    Boolean(upworkUrl && upworkLabel);
  // C-22: `footer.verifyLabel` then every platform with a URL (wireframe §4.2).
  const hasVerify = resolveVerifyLinks(verifyLinks).length > 0;
  if (!footer.descriptor && columns.length === 0 && !hasVerify && !hasLegal)
    return null;

  return (
    <footer
      id={CHROME_IDS.footer}
      className="border-t border-border bg-bg pt-12 pb-[calc(var(--bar-h)+16px)] text-small text-text md:pb-12"
    >
      <div className="mx-auto box-content flex max-w-content flex-col gap-8 px-(--gutter)">
        <div className="grid gap-8 lg:grid-cols-12">
          {footer.descriptor ? (
            <p className="max-w-prose text-text-muted lg:col-span-4">
              {footer.descriptor}
            </p>
          ) : null}
          {columns.length > 0 ? (
            <nav
              id={CHROME_IDS.footerNav}
              aria-label={footerNavLabel || undefined}
              className={cn(
                "grid gap-8 lg:col-span-8 lg:col-start-5",
                COLUMN_GRID[Math.min(columns.length, 4)],
              )}
            >
              {columns.map((col) => (
                <div key={col.key}>
                  {col.heading ? (
                    <h2 className="mb-1 font-bold text-text">{col.heading}</h2>
                  ) : null}
                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => (
                      <li key={link._key}>
                        <a href={link.href} className={FOOTER_LINK}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          ) : null}
        </div>

        <VerifyRow
          label={footer.verifyLabel}
          links={verifyLinks}
          externalSuffix={externalSuffix}
          singleLineFromLg
          className="md:pe-24"
        />

        {hasLegal ? (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-text-muted md:pe-24 lg:flex-nowrap">
            {copyright ? <p>{copyright}</p> : null}
            {legalLinks.length > 0 ? (
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link._key}>
                    <a href={link.href} className={FOOTER_LINK}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {upworkUrl && upworkLabel ? (
              <TextLink
                href={upworkUrl}
                external
                externalSuffix={externalSuffix}
                className="inline-flex min-h-11 items-center"
              >
                {upworkLabel}
              </TextLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
