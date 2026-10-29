// C-64: analytics event names and parameters as typed unions
// (pages/home.md §8; `chat_open`, `chat_message_sent` and the `menu` / `chat`
// CTA locations approved under D-014). Parameter values only: never message
// text or any other free-form user input.

/** `cta_id` values used on the homepage (02 §9.5; `partner_call` and `upwork` are not used here). */
export const CTA_IDS = ["fit_call", "teardown", "audit"] as const;
export type CtaId = (typeof CTA_IDS)[number];

/** `cta_click` `location`: 02 §9.5 values plus `menu` and `chat` (D-014). */
export const CTA_LOCATIONS = [
  "hero",
  "header",
  "sticky",
  "section",
  "final",
  "menu",
  "chat",
] as const;
export type CtaLocation = (typeof CTA_LOCATIONS)[number];

/** `verify_link_click` `platform` (matches `siteSettings.verifyLinks[].platform`). */
export const VERIFY_PLATFORMS = [
  "upwork",
  "linkedin",
  "github",
  "youtube",
] as const;
export type VerifyLinkPlatform = (typeof VERIFY_PLATFORMS)[number];

/** `upwork_link_click` `location` (footer only on this page). */
export type UpworkLinkLocation = "footer";

/** `chat_open` `location` (D-014). */
export const CHAT_OPEN_LOCATIONS = ["header", "menu", "launcher"] as const;
export type ChatOpenLocation = (typeof CHAT_OPEN_LOCATIONS)[number];

/** `chat_message_sent` `prompt_kind` (D-014). */
export type ChatPromptKind = "starter" | "typed";

/** Event name → its parameters. */
export type AnalyticsEventMap = {
  cta_click: { cta_id: CtaId; location: CtaLocation };
  verify_link_click: { platform: VerifyLinkPlatform };
  upwork_link_click: { location: UpworkLinkLocation };
  chat_open: { location: ChatOpenLocation };
  chat_message_sent: { prompt_kind: ChatPromptKind };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsEventParams<E extends AnalyticsEventName> =
  AnalyticsEventMap[E];
