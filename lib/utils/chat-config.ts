// Shared by the root layout (C-30 availability and props) and the chat API
// route (/api/v1/ai-concierge reply). Pure: no React, no vendor SDK.

import type { SiteSettings } from "@/lib/cms/types";

/** One reply / rail action (05 §5: labels and hrefs from `siteSettings.ctas`
 *  or `concierge.contact*`, in `concierge.escalationActions` order). */
export type ChatAction = {
  key: string;
  label: string;
  href: string;
  trackId?: string;
};

function filled(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Actions with a label and an href; incomplete entries are dropped (R-03). */
export function resolveEscalationActions(settings: SiteSettings): ChatAction[] {
  const { concierge, ctas } = settings;
  const actions: ChatAction[] = [];
  for (const key of concierge.escalationActions) {
    const source =
      key === "contact"
        ? { label: concierge.contactLabel, href: concierge.contactHref }
        : key === "fitCall"
          ? ctas.fitCall
          : ctas.teardown;
    if (!source || !filled(source.label) || !filled(source.href)) continue;
    const trackId =
      "trackId" in source && filled(source.trackId)
        ? source.trackId
        : undefined;
    actions.push({ key, label: source.label, href: source.href, trackId });
  }
  return actions;
}

/**
 * 06 §1.2 "Req yes" fields (B-06), plus the `ui.chatOpen` / `ui.chatClose`
 * control names. Any one empty → the chat is unavailable: no trigger renders
 * and the modal chunk is never requested.
 */
export function isChatAvailable(settings: SiteSettings | null): boolean {
  if (!settings) return false;
  const c = settings.concierge;
  const required = [
    c.title,
    c.subtitle,
    c.assistantLabel,
    c.intro,
    c.inputLabel,
    c.inputPlaceholder,
    c.sendLabel,
    c.pendingText,
    c.escalationReply,
    c.errorReply,
    c.contactLabel,
    c.contactHref,
    settings.ui.chatOpen,
    settings.ui.chatClose,
  ];
  return (
    required.every(filled) && resolveEscalationActions(settings).length > 0
  );
}
