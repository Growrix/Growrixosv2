/**
 * R-06: per-variant fields are objects `{ dual (required), law?, accounting? }`.
 * An empty `law` / `accounting` value falls back to `dual` in the fetcher (pickVariant()).
 */
import { defineField } from "sanity";
import type { FieldDefinition } from "sanity";

export const VARIANTS = [
  { title: "Dual (default)", value: "dual" },
  { title: "Law", value: "law" },
  { title: "Accounting", value: "accounting" },
] as const;

/**
 * Builds `{dual, law, accounting}`. `make(required)` returns the inner field definition;
 * `dual` gets `required = true`, the other two `false` (empty = fall back to dual).
 */
export function byVariant(
  name: string,
  make: (
    variantName: "dual" | "law" | "accounting",
    required: boolean,
  ) => FieldDefinition,
  opts: { title?: string; description?: string } = {},
) {
  return defineField({
    name,
    title: opts.title,
    type: "object",
    description:
      opts.description ??
      "Dual is required. Empty Law / Accounting values fall back to Dual.",
    options: { collapsible: true, collapsed: false },
    fields: [make("dual", true), make("law", false), make("accounting", false)],
  });
}
