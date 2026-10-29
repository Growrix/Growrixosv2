// C-66: static copy for C-27 (GlobalErrorPage) only. Static because the CMS
// may be what failed. Every value is `TBD-from-client` (B-08): the strings
// stay empty until the client (or content-writer, with client approval)
// supplies them. Never put placeholder text here (R-01, R-03): C-27 renders
// each element only when its value is non-empty.

export type GlobalErrorCopy = {
  /** The page's single H1 (also used as the document title). */
  readonly heading: string;
  readonly body: string;
  /** Text of the link to `/`. */
  readonly homeLinkLabel: string;
  /** `siteSettings.email`'s seeded value, for the `mailto:` link. */
  readonly contactEmail: string;
};

export const GLOBAL_ERROR_COPY: GlobalErrorCopy = {
  heading: "",
  body: "",
  homeLinkLabel: "",
  contactEmail: "",
};
