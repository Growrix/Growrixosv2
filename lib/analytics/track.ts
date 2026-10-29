// C-64: the analytics port. `track()` does nothing in the homepage slice
// (pages/home.md §8); the launch slice wires it to GA4 behind consent.
//
// No delegated click listener is mounted in this slice on purpose: it would
// ship client JS on every page only to call this no-op. CTAs already carry
// `data-track-id` + `data-track-location` (verify links sit in an item with
// `data-platform`), so the launch slice adds one listener that reads those
// attributes and calls `track()`, together with GA4 and consent.

import type { AnalyticsEventName, AnalyticsEventParams } from "./events";

export function track<E extends AnalyticsEventName>(
  event: E,
  params: AnalyticsEventParams<E>,
): void {
  // Intentionally a no-op in this slice.
  void event;
  void params;
}
