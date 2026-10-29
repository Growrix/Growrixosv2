import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/utils/cn";

import { splitTrailingArrow } from "./copy-glyphs";

export type SectionLinkProps = {
  href: string;
  /** CMS link label, rendered verbatim. */
  label: string;
  /** Visually hidden text that tells repeated labels apart (e.g. a service title). */
  srSuffix?: string;
  trackId?: string;
  trackLocation?: string;
  className?: string;
};

/**
 * Standalone section link: C-02 `arrow` variant (>= 44 px tall). When the
 * copy already ends in an arrow glyph (" →"), no arrow icon is added; the
 * copy's own glyph stays visible, is hidden from assistive technology and is
 * mirrored under RTL like the icon would be.
 */
export function SectionLink({
  href,
  label,
  srSuffix,
  trackId,
  trackLocation,
  className,
}: SectionLinkProps) {
  const { text, glyph } = splitTrailingArrow(label);

  if (!glyph) {
    return (
      <TextLink
        href={href}
        arrow
        srSuffix={srSuffix}
        trackId={trackId}
        trackLocation={trackLocation}
        className={className}
      >
        {label}
      </TextLink>
    );
  }

  return (
    <TextLink
      href={href}
      srSuffix={srSuffix}
      trackId={trackId}
      trackLocation={trackLocation}
      className={cn("inline-flex min-h-11 items-center gap-1", className)}
    >
      <span>{text}</span>
      <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
        {glyph.trim()}
      </span>
    </TextLink>
  );
}
