/**
 * `siteSettings` (singleton, _id "siteSettings") — shared chrome. Spec: 06 §1, §1.1, §1.2.
 */
import { defineArrayMember, defineField, defineType } from "sanity";
import type { CustomValidator, FieldDefinition } from "sanity";
import { ctaObject } from "../objects/cta";
import {
  hrefField,
  stringField,
  stringListField,
  textField,
} from "../lib/fields";
import { httpsUrlRule, noPlaceholders } from "../lib/rules";

/** §1.1 interface strings. Every key is required (a nameless control can never ship). */
const UI_KEYS: Array<{ name: string; title: string; description: string }> = [
  { name: "skipLink", title: "Skip link", description: "Skip link text." },
  {
    name: "navLabel",
    title: "Main nav label",
    description: "aria-label of the main nav (1–2 words).",
  },
  {
    name: "footerNavLabel",
    title: "Footer nav label",
    description: "aria-label of the footer nav (1–2 words).",
  },
  {
    name: "menuOpen",
    title: "Menu open",
    description: "Mobile menu button name (closed state).",
  },
  {
    name: "menuClose",
    title: "Menu close",
    description: "Mobile menu button name (open state).",
  },
  {
    name: "submenuToggle",
    title: "Submenu toggle suffix",
    description: "Read after the item label on dropdown buttons.",
  },
  {
    name: "themeToggle",
    title: "Theme toggle",
    description: "Accessible name of the theme toggle (names the dark theme).",
  },
  {
    name: "themeRowLabel",
    title: "Theme row label",
    description: "Visible label of the theme row in the mobile menu.",
  },
  {
    name: "unitPerMonth",
    title: "Unit per month",
    description: "Appended by {priceMonthly:<slug>}.",
  },
  {
    name: "chatOpen",
    title: "Chat open",
    description: "Header chat button and launcher name.",
  },
  {
    name: "chatClose",
    title: "Chat close",
    description: "Chat close button name.",
  },
  {
    name: "verifyMe",
    title: "Verify me",
    description: "Lead-in before verify links in the founder card.",
  },
  {
    name: "sourcePrefix",
    title: "Source prefix",
    description: "Lead-in before a stat source link.",
  },
  {
    name: "externalSuffix",
    title: "External link suffix",
    description: "Visually hidden text after external links.",
  },
  {
    name: "illustrativeBadge",
    title: "Illustrative badge",
    description: "HonestBadge label.",
  },
  {
    name: "internalBadge",
    title: "Internal badge",
    description: "HonestBadge label.",
  },
  { name: "demoBadge", title: "Demo badge", description: "HonestBadge label." },
  {
    name: "clientBadge",
    title: "Client badge",
    description: "HonestBadge label.",
  },
];

const VERIFY_PLATFORMS = [
  { title: "Upwork", value: "upwork" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "GitHub", value: "github" },
  { title: "YouTube", value: "youtube" },
];

/** 02 §2.1: never "Growrix" alone (always "Growrix OS"). */
const brandNameRule: CustomValidator<unknown> = (value) =>
  typeof value === "string" && /\bGrowrix\b(?!\s+OS\b)/.test(value)
    ? 'Name rule (02 §2.1): write "Growrix OS", never "Growrix" alone.'
    : true;

const uniquePlatforms: CustomValidator<unknown> = (value) => {
  if (!Array.isArray(value)) return true;
  const platforms = (value as Array<{ platform?: string }>).map(
    (v) => v.platform,
  );
  return new Set(platforms).size === platforms.length
    ? true
    : "Each platform may appear only once.";
};

/** Fields required for the chat to render (B-06): enforced as warnings, not errors (06 §1.2). */
const CHAT = "warning" as const;

const statusPage = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      stringField("heading", { required: true, max: 60 }),
      textField("body", { required: true, max: 160 }),
    ],
    validation: (rule) => rule.required(),
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "ctas", title: "CTAs" },
    { name: "navigation", title: "Navigation & footer" },
    { name: "trust", title: "Trust blocks" },
    { name: "ui", title: "Interface strings" },
    { name: "concierge", title: "Concierge chat" },
    { name: "status", title: "Status pages" },
  ],
  fields: [
    {
      ...stringField("brandName", {
        required: true,
        description: 'Exactly "Growrix OS".',
        custom: [
          (value) =>
            value === undefined || value === "Growrix OS"
              ? true
              : 'Must be exactly "Growrix OS".',
        ],
      }),
      group: "brand",
    },
    { ...stringField("oneLiner", { required: true, max: 90 }), group: "brand" },
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "brand",
      validation: (rule) => [
        rule.required().email(),
        rule.custom(noPlaceholders),
      ],
    }),

    defineField({
      name: "ctas",
      title: "CTAs",
      type: "object",
      group: "ctas",
      validation: (rule) => rule.required(),
      fields: [
        ctaObject("fitCall", {
          title: "Fit call (primary)",
          labelMax: 32,
          labelShortMax: 18,
          labelMobileMax: 12,
        }),
        ctaObject("teardown", {
          title: "Loom teardown (async)",
          labelMax: 42,
          labelShortMax: 18,
        }),
        ctaObject("audit", {
          title: "Paid audit",
          description: "Label uses {price:automation-audit}.",
          labelMax: 48,
          labelPrices: true,
        }),
        ctaObject("upwork", {
          title: "Upwork",
          description:
            "The link target comes from Verify links (platform Upwork); hidden while that URL is empty.",
          labelMax: 60,
          withHref: false,
          withTrackId: false,
        }),
      ],
    }),

    defineField({
      name: "navigation",
      title: "Header navigation",
      type: "array",
      group: "navigation",
      description: "Up to 6 top-level items, in display order.",
      of: [defineArrayMember({ type: "navItem" })],
      validation: (rule) => rule.required().min(1).max(6),
    }),

    {
      ...stringListField("trustRow", {
        title: "Trust row",
        required: true,
        exact: 3,
        itemMax: 40,
      }),
      group: "trust",
    },
    {
      ...textField("timezoneStatement", { required: true, max: 400, rows: 4 }),
      group: "trust",
    },
    {
      ...stringField("honestProofNote", { required: true, max: 160 }),
      group: "trust",
    },
    defineField({
      name: "verifyLinks",
      title: "Verify links",
      type: "array",
      group: "trust",
      description: "An empty URL hides that link.",
      of: [
        defineArrayMember({
          type: "object",
          name: "verifyLink",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: { list: VERIFY_PLATFORMS, layout: "radio" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => [
                rule.uri({ scheme: ["https"] }),
                rule.custom(httpsUrlRule as CustomValidator<unknown>),
              ],
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
      validation: (rule) => rule.custom(uniquePlatforms),
    }),
    defineField({
      name: "medianReplySeconds",
      title: "Median reply (seconds)",
      type: "number",
      group: "trust",
      description: "Real 30-day median only. Empty hides the S5 data line.",
      validation: (rule) => rule.integer().min(1).max(3600),
    }),

    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "navigation",
      validation: (rule) => rule.required(),
      fields: [
        textField("descriptor", { required: true, max: 260, rows: 4 }),
        defineField({
          name: "columns",
          title: "Columns",
          type: "array",
          description: "Up to 4 columns.",
          of: [defineArrayMember({ type: "footerColumn" })],
          validation: (rule) => rule.required().min(1).max(4),
        }),
        stringField("verifyLabel", { required: true, max: 60 }),
        defineField({
          name: "legalLinks",
          title: "Legal links",
          type: "array",
          description: "Exactly 2: Privacy, Terms.",
          of: [defineArrayMember({ type: "link" })],
          validation: (rule) => rule.required().length(2),
        }),
      ],
    }),

    defineField({
      name: "ui",
      title: "Interface strings",
      type: "object",
      group: "ui",
      validation: (rule) => rule.required(),
      fields: UI_KEYS.map((k) =>
        stringField(k.name, {
          title: k.title,
          description: k.description,
          required: true,
          max: 40,
        }),
      ),
    }),

    defineField({
      name: "statusPages",
      title: "Status pages",
      type: "object",
      group: "status",
      validation: (rule) => rule.required(),
      fields: [
        statusPage("notFound", "Not found (404)"),
        statusPage("error", "Error"),
      ],
    }),

    defineField({
      name: "concierge",
      title: "Concierge chat",
      type: "object",
      group: "concierge",
      description:
        "Required fields are warnings: while any of them is empty, every chat trigger is hidden (06 §1.2, B-06).",
      fields: [
        stringField("title", { required: CHAT, max: 30 }),
        stringField("subtitle", { required: CHAT, max: 140 }),
        stringField("assistantLabel", {
          required: CHAT,
          max: 20,
          custom: [brandNameRule],
        }),
        textField("intro", { required: CHAT, max: 300 }),
        stringListField("starterPrompts", {
          maxItems: 4,
          minItems: 0,
          itemMax: 60,
        }),
        stringField("inputLabel", { required: CHAT, max: 30 }),
        stringField("inputPlaceholder", { required: CHAT, max: 90 }),
        stringField("sendLabel", { required: CHAT, max: 12 }),
        stringField("pendingText", { required: CHAT, max: 80 }),
        textField("escalationReply", { required: CHAT, max: 300 }),
        textField("errorReply", { required: CHAT, max: 200 }),
        stringField("noAnswerCue", { max: 40 }),
        stringListField("escalationActions", {
          required: CHAT,
          minItems: 1,
          maxItems: 3,
          options: {
            list: [
              { title: "Fit call", value: "fitCall" },
              { title: "Loom teardown", value: "teardown" },
              { title: "Contact", value: "contact" },
            ],
          },
        }),
        stringField("contactLabel", { required: CHAT, max: 24 }),
        hrefField("contactHref", { required: CHAT, internalOnly: true }),
        stringField("railHeading", { max: 40 }),
        textField("railBody", { max: 200 }),
        stringField("rulesHeading", { max: 40 }),
        stringListField("rules", { maxItems: 3, minItems: 0, itemMax: 120 }),
      ] as FieldDefinition[],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
