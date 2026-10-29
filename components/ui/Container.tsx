import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type ContainerProps = {
  as?: "div" | "section" | "article" | "header" | "footer" | "nav" | "aside";
  className?: string;
  children: ReactNode;
};

/**
 * C-03: `--container-content` (1200px) of content, centred, with the
 * 20 / 32 / 40px side padding (`--gutter`, 02 §4) outside that width.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto box-content max-w-content px-(--gutter)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
