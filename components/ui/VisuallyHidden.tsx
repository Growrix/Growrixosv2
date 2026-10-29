import type { ReactNode } from "react";

export type VisuallyHiddenProps = {
  children: ReactNode;
  as?: "span" | "div";
};

/** C-06: text for screen readers only. Empty children render nothing (R-03). */
export function VisuallyHidden({
  children,
  as: Tag = "span",
}: VisuallyHiddenProps) {
  if (children === null || children === undefined || children === "")
    return null;
  return <Tag className="sr-only">{children}</Tag>;
}
