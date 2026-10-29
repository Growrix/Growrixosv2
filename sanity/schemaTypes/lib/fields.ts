/**
 * Field factories. Every string/text/portable-text field built here carries R-01
 * (noPlaceholders) and, unless it is a documented price field, the R-02 "no tokens" rule.
 */
import { defineArrayMember, defineField } from "sanity";
import type { CustomValidator, Rule } from "sanity";
import {
  hrefRule,
  internalPathRule,
  noPlaceholders,
  noPriceTokens,
  portableTextLength,
  priceTokenField,
  type PriceFieldOptions,
} from "./rules";

/** `true` = error when empty, `'warning'` = warning when empty, `false`/undefined = optional. */
export type Requirement = boolean | "warning";

export interface TextFieldOptions {
  title?: string;
  description?: string;
  required?: Requirement;
  max?: number;
  min?: number;
  /** Documented R-02 price field: tokens allowed, limits checked on resolved text. */
  prices?: PriceFieldOptions | true;
  /** Extra custom validators. */
  custom?: CustomValidator<unknown>[];
  initialValue?: string;
  readOnly?: boolean;
}

function requiredRule(rule: Rule, required: Requirement | undefined): Rule[] {
  if (required === true) return [rule.required()];
  if (required === "warning")
    return [
      rule.required().warning("Required before this content can be shown."),
    ];
  return [];
}

function textRules(rule: Rule, opts: TextFieldOptions): Rule[] {
  const rules: Rule[] = [
    ...requiredRule(rule, opts.required),
    rule.custom(noPlaceholders),
  ];
  if (opts.prices) {
    const priceOpts: PriceFieldOptions =
      opts.prices === true
        ? { min: opts.min, max: opts.max }
        : { min: opts.min, max: opts.max, ...opts.prices };
    rules.push(rule.custom(priceTokenField(priceOpts)));
  } else {
    rules.push(rule.custom(noPriceTokens));
    if (opts.max !== undefined) rules.push(rule.max(opts.max));
    if (opts.min !== undefined) rules.push(rule.min(opts.min));
  }
  for (const c of opts.custom ?? []) rules.push(rule.custom(c));
  return rules;
}

function describe(opts: TextFieldOptions): string | undefined {
  const parts: string[] = [];
  if (opts.description) parts.push(opts.description);
  if (opts.min !== undefined && opts.max !== undefined)
    parts.push(`${opts.min}–${opts.max} characters.`);
  else if (opts.max !== undefined) parts.push(`Max ${opts.max} characters.`);
  if (opts.prices)
    parts.push(
      "Prices only as tokens: {price:<slug>}, {priceFrom:<slug>}, {priceMonthly:<slug>}.",
    );
  return parts.length > 0 ? parts.join(" ") : undefined;
}

export function stringField(name: string, opts: TextFieldOptions = {}) {
  return defineField({
    name,
    title: opts.title,
    type: "string",
    description: describe(opts),
    initialValue: opts.initialValue,
    readOnly: opts.readOnly,
    validation: (rule) => textRules(rule as unknown as Rule, opts) as never,
  });
}

export function textField(
  name: string,
  opts: TextFieldOptions & { rows?: number } = {},
) {
  return defineField({
    name,
    title: opts.title,
    type: "text",
    rows: opts.rows ?? 3,
    description: describe(opts),
    validation: (rule) => textRules(rule as unknown as Rule, opts) as never,
  });
}

/** Array of strings with an exact or bounded count; every item is checked like a string field. */
export function stringListField(
  name: string,
  opts: {
    title?: string;
    description?: string;
    required?: Requirement;
    exact?: number;
    minItems?: number;
    maxItems?: number;
    itemMax?: number;
    options?: { list: Array<{ title: string; value: string }> };
  },
) {
  const count =
    opts.exact !== undefined
      ? `Exactly ${opts.exact} items.`
      : opts.maxItems !== undefined
        ? `${opts.minItems ?? 0}–${opts.maxItems} items.`
        : undefined;
  return defineField({
    name,
    title: opts.title,
    type: "array",
    description:
      [
        opts.description,
        count,
        opts.itemMax ? `Max ${opts.itemMax} characters each.` : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined,
    of: [
      defineArrayMember({
        type: "string",
        options: opts.options,
        validation: (rule) =>
          textRules(rule as unknown as Rule, {
            max: opts.itemMax,
            required: true,
          }) as never,
      }),
    ],
    options: opts.options ? { list: opts.options.list } : undefined,
    validation: (rule) => {
      const r = rule as unknown as Rule;
      const rules: Rule[] = [...requiredRule(r, opts.required)];
      if (opts.exact !== undefined) rules.push(r.length(opts.exact));
      if (opts.minItems !== undefined) rules.push(r.min(opts.minItems));
      if (opts.maxItems !== undefined) rules.push(r.max(opts.maxItems));
      rules.push(r.unique());
      return rules as never;
    },
  });
}

/** R-05 link target. `internalOnly` limits it to root-relative paths. */
export function hrefField(
  name: string,
  opts: {
    title?: string;
    required?: Requirement;
    internalOnly?: boolean;
    description?: string;
  } = {},
) {
  return defineField({
    name,
    title: opts.title,
    type: "string",
    description:
      opts.description ??
      (opts.internalOnly
        ? 'Root-relative path, for example "/contact".'
        : 'Root-relative path ("/book", "/audit#teardown") or absolute https:// URL.'),
    validation: (rule) => {
      const r = rule as unknown as Rule;
      return [
        ...requiredRule(r, opts.required),
        r.custom(noPlaceholders),
        r.custom(
          (opts.internalOnly
            ? internalPathRule
            : hrefRule) as CustomValidator<unknown>,
        ),
      ] as never;
    },
  });
}

/**
 * Plain portable text: normal paragraphs only, no headings, lists, images or links.
 * `prices: true` allows R-02 tokens inside spans (faq.answer).
 */
export function plainPortableTextField(
  name: string,
  opts: {
    title?: string;
    description?: string;
    required?: Requirement;
    maxChars?: number;
    prices?: boolean;
  } = {},
) {
  return defineField({
    name,
    title: opts.title,
    type: "array",
    description:
      [
        opts.description,
        opts.maxChars ? `Max ${opts.maxChars} characters.` : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined,
    of: [
      defineArrayMember({
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: { decorators: [], annotations: [] },
      }),
    ],
    validation: (rule) => {
      const r = rule as unknown as Rule;
      const rules: Rule[] = [
        ...requiredRule(r, opts.required),
        r.custom(noPlaceholders),
      ];
      rules.push(r.custom(opts.prices ? priceTokenField() : noPriceTokens));
      if (opts.maxChars !== undefined) {
        const max = opts.maxChars;
        rules.push(
          r.custom((value: unknown) =>
            portableTextLength(value) > max
              ? `Max ${max} characters (now ${portableTextLength(value)}).`
              : true,
          ),
        );
      }
      return rules as never;
    },
  });
}

export { requiredRule };
