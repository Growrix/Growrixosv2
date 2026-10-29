import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/utils/cn";

export type SourceLinkProps = {
  /** `ui.sourcePrefix`; omitted while empty. */
  prefix?: string | null;
  /** `stat.sourceName`: the link text. */
  name: string | null;
  /** `stat.sourceUrl`. */
  url: string | null;
  /** `ui.externalSuffix` (visually hidden; omitted while empty, B-07). */
  externalSuffix?: string;
  className?: string;
};

/**
 * C-24 (server). Source line under an S2 stat: `--text-small` muted prefix,
 * then an external primary `TextLink` (>= 44 px tall, a standalone link).
 * No URL or no name → nothing is rendered (the stat is not published without
 * a source, 06 schema rule; R-03).
 */
export function SourceLink({
  prefix,
  name,
  url,
  externalSuffix,
  className,
}: SourceLinkProps) {
  const href = url?.trim();
  const text = name?.trim();
  if (!href || !text) return null;
  const lead = prefix?.trim();

  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-1 text-small text-text-muted",
        className,
      )}
    >
      {lead ? <span>{lead}</span> : null}
      <TextLink
        href={href}
        external
        externalSuffix={externalSuffix}
        className="inline-flex min-h-11 items-center"
      >
        {text}
      </TextLink>
    </p>
  );
}
