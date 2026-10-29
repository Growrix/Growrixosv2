import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { Icon } from "./Icon";
import { VisuallyHidden } from "./VisuallyHidden";

export type TextLinkProps = {
  href: string;
  children: ReactNode;
  /** `arrow` variant: standalone link with an arrow after the text (>= 44px). */
  arrow?: boolean;
  external?: boolean;
  /** `ui.externalSuffix`, read after external link text (visually hidden). */
  externalSuffix?: string;
  /** Visually hidden text that disambiguates repeated link text. */
  srSuffix?: string;
  trackId?: string;
  trackLocation?: string;
  className?: string;
};

/** C-02: `inline` (inside a sentence) or `arrow` (standalone). */
export function TextLink({
  href,
  children,
  arrow = false,
  external = false,
  externalSuffix,
  srSuffix,
  trackId,
  trackLocation,
  className,
}: TextLinkProps) {
  // Leading space keeps the hidden text a separate word for screen readers.
  const srText = srSuffix ? " " + srSuffix : null;
  const externalText = external && externalSuffix ? " " + externalSuffix : null;
  return (
    <a
      href={href}
      rel={external ? "noopener" : undefined}
      data-track-id={trackId}
      data-track-location={trackLocation}
      className={cn(
        "text-primary underline decoration-1 underline-offset-3 hover:decoration-2",
        arrow && "inline-flex min-h-11 items-center gap-1",
        className,
      )}
    >
      {children}
      {srText ? <VisuallyHidden>{srText}</VisuallyHidden> : null}
      {externalText ? <VisuallyHidden>{externalText}</VisuallyHidden> : null}
      {arrow ? <Icon name="arrow-right" className="motion-arrow" /> : null}
    </a>
  );
}
