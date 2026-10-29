// C-30: loads the C-31 modal as a separate chunk on the first trigger hover,
// focus or press (91-stack.md §3). Rejection or > 8 s → `loadState: "failed"`;
// ChatRoot then sends a visitor who pressed a trigger to `concierge.contactHref`.

import { lazy, type ComponentType } from "react";

import type { ChatModalProps } from "./ChatModal";
import { chatStore } from "./chat-store";

const LOAD_TIMEOUT_MS = 8000;

type ModalModule = { default: ComponentType<ChatModalProps> };

let pending: Promise<ModalModule> | null = null;

/** Starts the chunk load once; later calls return the same promise. */
export function preloadChatModal(): Promise<ModalModule> {
  if (pending) return pending;
  chatStore.setLoadState("loading");
  pending = new Promise<ModalModule>((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(new Error("chat modal load timeout")),
      LOAD_TIMEOUT_MS,
    );
    import("./ChatModal").then(
      (mod) => {
        window.clearTimeout(timer);
        resolve({ default: mod.ChatModal });
      },
      (error: unknown) => {
        window.clearTimeout(timer);
        reject(error instanceof Error ? error : new Error(String(error)));
      },
    );
  });
  pending.then(
    () => chatStore.setLoadState("ready"),
    // Handled fully: the failed state routes the visitor to contact (R).
    () => chatStore.setLoadState("failed"),
  );
  return pending;
}

/** Rendered by ChatRoot only once `loadState === "ready"`. */
export const LazyChatModal = lazy(preloadChatModal);
