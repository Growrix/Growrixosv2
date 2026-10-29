import { TextLink } from "@/components/ui/TextLink";
import { ALL_VERIFY_PLATFORMS, resolveVerifyLinks } from "@/lib/cms/platforms";
import type { VerifyLink, VerifyPlatform } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

export type VerifyRowProps = {
  /** Lead-in (`ui.verifyMe`, `builder.verifyLabel`, `footer.verifyLabel`); omitted while empty. */
  label?: string | null;
  /** `siteSettings.verifyLinks`. */
  links: readonly VerifyLink[];
  /** Platforms shown (S1: Upwork, LinkedIn, GitHub; S9 and footer: all). */
  platforms?: readonly VerifyPlatform[];
  /** `ui.externalSuffix` (visually hidden; omitted while empty, B-07). */
  externalSuffix?: string;
  /** Keep the lead-in and links on one line from 1024 px (footer, wireframe §4.2). */
  singleLineFromLg?: boolean;
  className?: string;
};

/**
 * C-22 (server). Lead-in, then a `<ul>` of external `TextLink`s named after
 * the platform (`lib/cms/platforms.ts`). Each link with an empty URL is
 * hidden; with no link left the whole row is hidden (R-03). Font size is
 * inherited from the caller. Links are >= 44 px tall with 16 px between them.
 */
export function VerifyRow({
  label,
  links,
  platforms = ALL_VERIFY_PLATFORMS,
  externalSuffix,
  singleLineFromLg = false,
  className,
}: VerifyRowProps) {
  const items = resolveVerifyLinks(links, platforms);
  if (items.length === 0) return null;
  const lead = label?.trim();

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2",
        singleLineFromLg && "lg:flex-nowrap",
        className,
      )}
    >
      {lead ? <p className="text-text-muted">{lead}</p> : null}
      <ul
        className={cn(
          "flex flex-wrap items-center gap-x-4 gap-y-2",
          singleLineFromLg && "lg:flex-nowrap",
        )}
      >
        {items.map((item) => (
          <li key={item.key} data-platform={item.platform}>
            <TextLink
              href={item.url}
              external
              externalSuffix={externalSuffix}
              className="inline-flex min-h-11 items-center"
            >
              {item.name}
            </TextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
