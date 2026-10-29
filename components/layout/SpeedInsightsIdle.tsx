"use client";

import { useEffect, useState, type ComponentType } from "react";

/** 91-stack.md §3: fallback when `requestIdleCallback` is missing (Safari). */
const FALLBACK_DELAY_MS = 3000;

type SpeedInsightsComponent = ComponentType<Record<string, never>>;

/**
 * Speed Insights island (91-stack.md §3, 90-performance.md §2). Renders
 * nothing at first. After the browser is idle (`requestIdleCallback`, or a
 * 3 s timeout where it does not exist) it imports
 * `@vercel/speed-insights/next` with `import()`, so the package is a separate
 * lazy chunk and never part of first-load JS, then renders it once.
 */
export function SpeedInsightsIdle() {
  const [Insights, setInsights] = useState<SpeedInsightsComponent | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      import("@vercel/speed-insights/next")
        .then((mod) => {
          if (!cancelled) setInsights(() => mod.SpeedInsights);
        })
        .catch(() => {
          // Monitoring is optional: a failed chunk load changes nothing.
        });
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load);
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const timer = window.setTimeout(load, FALLBACK_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return Insights ? <Insights /> : null;
}
