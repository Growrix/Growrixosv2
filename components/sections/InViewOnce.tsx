"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type InViewOnceProps = {
  /** Share of the wrapper that must be visible (C-53: 0.35). */
  threshold?: number;
  className?: string;
  children: ReactNode;
};

/**
 * C-53 (client). Sets `data-inview="true"` on its wrapper the first time
 * `threshold` of it is visible, then disconnects the observer. The children
 * stay server-rendered. Without IntersectionObserver the attribute is set at
 * once (the static, final state).
 */
export function InViewOnce({
  threshold = 0.35,
  className,
  children,
}: InViewOnceProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const done = () => el.setAttribute("data-inview", "true");
    if (typeof IntersectionObserver !== "function") {
      done();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          done();
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
