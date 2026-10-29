import "server-only";

import { PortableText, type PortableTextComponents } from "next-sanity";

import type { PortableText as PortableTextValue } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

/** Plain portable text: normal paragraphs, no marks (06 §3, §4). */
const COMPONENTS: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
};

/** True when at least one block has visible text (R-03: empty → nothing). */
export function hasPortableText(value: PortableTextValue): boolean {
  return value.some(
    (block) =>
      Array.isArray(block.children) &&
      block.children.some((span) => (span.text ?? "").trim().length > 0),
  );
}

export type PortableBodyProps = {
  value: PortableTextValue;
  className?: string;
};

/**
 * Server-only portable-text renderer for the S9 bio (C-49) and the S11 FAQ
 * answers (C-51), via `next-sanity`'s `PortableText` re-export. Renders
 * nothing when the value has no text.
 */
export function PortableBody({ value, className }: PortableBodyProps) {
  if (!hasPortableText(value)) return null;
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <PortableText value={value} components={COMPONENTS} />
    </div>
  );
}
