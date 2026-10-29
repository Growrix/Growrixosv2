// Shared class strings and ids for the homepage sections (wireframe §5,
// 01 §3). Token utilities only.

/** Section H2: display 600, `--text-h2`, balanced (01 §3). */
export const H2_CLASS = "font-display text-h2 text-balance text-text";

/** Gap from the section H2 to its content: 32 px (M) / 48 px (D) (wireframe §5). */
export const H2_GAP_CLASS = "mb-8 lg:mb-12";

/** Panel, card, step and price-row titles: sans 700, `--text-h3`. */
export const H3_CLASS = "font-sans text-h3 text-text";

/** Paragraph copy (01 §3: `text-wrap: pretty`). */
export const BODY_CLASS = "text-body text-pretty text-text";

/** `<section aria-labelledby>` heading id (wireframe §2: `<section-id>-h`). */
export function headingId(sectionId: string): string {
  return `${sectionId}-h`;
}

/** Trimmed text, or null when empty (R-03). */
export function filled(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
