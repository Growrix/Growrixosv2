"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { CHROME_IDS } from "@/components/layout/chrome-state";
import type { Concierge } from "@/lib/cms/types";
import type { ChatAction } from "@/lib/utils/chat-config";

import { LazyChatModal } from "./chat-loader";
import { chatStore } from "./chat-store";
import { ChatTrigger } from "./ChatTrigger";

export type ChatRootProps = {
  concierge: Concierge;
  /** `ui.chatOpen` / `ui.chatClose`. */
  openLabel: string;
  closeLabel: string;
  /** `concierge.escalationActions` resolved against `siteSettings.ctas`. */
  actions: ChatAction[];
  /** Server-rendered `chat-bubble-left-right` icon for the launcher. */
  launcherIcon: ReactNode;
};

/**
 * C-30 (client, tiny, loads with the page). Renders the launcher (>= 768 px)
 * and, once the lazy C-31 chunk has loaded and a trigger was pressed, the
 * dialog. Rendered by the root layout only when the chat is available.
 */
export function ChatRoot({
  concierge,
  openLabel,
  closeLabel,
  actions,
  launcherIcon,
}: ChatRootProps) {
  const { isOpen, opener, initialPrompt, loadState } = useSyncExternalStore(
    chatStore.subscribe,
    chatStore.get,
    chatStore.getServer,
  );
  const contactHref = concierge.contactHref;

  // R: the chunk failed or took > 8 s after a press → reach a person instead.
  useEffect(() => {
    if (isOpen && loadState === "failed" && contactHref) {
      window.location.assign(contactHref);
    }
  }, [isOpen, loadState, contactHref]);

  // Focus-return target: the opener, or the menu button for the menu entry
  // (the entry itself is gone once the menu has closed).
  const returnFocusTo = useCallback((): HTMLElement | null => {
    const selector =
      opener === "menu"
        ? `button[aria-controls="${CHROME_IDS.mobileMenu}"]`
        : `[data-chat-opener="${opener ?? "launcher"}"]`;
    return document.querySelector<HTMLElement>(selector);
  }, [opener]);

  return (
    <>
      <ChatTrigger variant="launcher" label={openLabel} icon={launcherIcon} />
      {isOpen && loadState === "ready" ? (
        // The chunk has already resolved, so this never shows a fallback.
        <Suspense fallback={null}>
          <LazyChatModal
            concierge={concierge}
            closeLabel={closeLabel}
            actions={actions}
            initialPrompt={initialPrompt}
            returnFocusTo={returnFocusTo}
            onClose={chatStore.close}
          />
        </Suspense>
      ) : null}
    </>
  );
}
