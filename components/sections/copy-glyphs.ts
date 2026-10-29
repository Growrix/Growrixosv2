// Copy-vs-component glyphs. Some seeded copy is verbatim client text that
// already carries a visual glyph: link labels ending in " →" and S7 step
// titles starting with "1 · ". The copy is never edited. When the glyph is
// present the component does not add its own (no arrow icon, no extra step
// number); the glyph itself is kept visible but hidden from assistive
// technology, because the link or list already conveys it.

/** A trailing arrow in a link label, e.g. "See how it works →". */
const TRAILING_ARROW_RE = /\s*→\s*$/;

/** A leading step number in a title, e.g. "1 · Fit call". */
const LEADING_STEP_RE = /^\s*\d+\s*(?:·|\.|\))\s*/;

export type SplitGlyph = {
  /** The copy without the glyph part. */
  text: string;
  /** The glyph part exactly as written in the copy (with its spacing), or null. */
  glyph: string | null;
};

/** Splits a trailing arrow glyph off a link label. */
export function splitTrailingArrow(label: string): SplitGlyph {
  const match = TRAILING_ARROW_RE.exec(label);
  if (!match || match.index === 0) return { text: label, glyph: null };
  return { text: label.slice(0, match.index), glyph: match[0] };
}

/** Splits a leading step number ("1 · ") off a step title. */
export function splitLeadingStepNumber(title: string): SplitGlyph {
  const match = LEADING_STEP_RE.exec(title);
  if (!match || match[0].length >= title.length) {
    return { text: title, glyph: null };
  }
  return { text: title.slice(match[0].length), glyph: match[0] };
}
