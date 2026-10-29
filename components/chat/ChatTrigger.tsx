"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

import { CHROME_IDS } from "@/components/layout/chrome-state";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils/cn";

import { preloadChatModal } from "./chat-loader";
import { chatStore, type ChatOpener } from "./chat-store";

export type ChatTriggerVariant = "header-icon" | "menu-item" | "launcher";

export type ChatTriggerProps = {
  variant: ChatTriggerVariant;
  /** `ui.chatOpen` (header icon, launcher) or `concierge.title` (menu item,
   *  visible text = accessible name). */
  label: string;
  /** Server-rendered `chat-bubble-left-right` icon (not for the menu item). */
  icon?: ReactNode;
};

const OPENER: Record<ChatTriggerVariant, ChatOpener> = {
  "header-icon": "header",
  "menu-item": "menu",
  launcher: "launcher",
};

/** Pressed style appears only after this delay while the chunk loads (05 §5 L). */
const PRESSED_DELAY_MS = 300;

const VARIANT: Record<ChatTriggerVariant, string> = {
  "header-icon":
    "inline-flex size-11 items-center justify-center rounded-md text-text hover:bg-inset active:bg-inset data-pressed:bg-inset",
  "menu-item":
    "-mx-3 flex min-h-11 items-center rounded-md px-3 text-start text-button text-text hover:bg-inset active:bg-inset data-pressed:bg-inset",
  launcher:
    "focus-two-tone fixed end-6 bottom-6 z-(--z-launcher) hidden size-14 items-center justify-center rounded-pill bg-primary text-on-primary shadow-3 hover:bg-primary-hover active:bg-primary-hover data-pressed:bg-primary-hover md:inline-flex",
};

/** C-30 trigger: one store, three entry points (wireframe §4.4). */
export function ChatTrigger({ variant, label, icon }: ChatTriggerProps) {
  const opener = OPENER[variant];
  const ref = useRef<HTMLButtonElement>(null);
  const {
    isOpen,
    opener: current,
    loadState,
  } = useSyncExternalStore(
    chatStore.subscribe,
    chatStore.get,
    chatStore.getServer,
  );
  const busy = isOpen && current === opener && loadState === "loading";

  useEffect(() => {
    const button = ref.current;
    if (!busy || !button) return;
    const timer = window.setTimeout(() => {
      button.dataset.pressed = "";
    }, PRESSED_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      delete button.dataset.pressed;
    };
  }, [busy]);

  const onPress = () => {
    // Repeat presses while loading (or while open) are ignored.
    if (chatStore.get().isOpen) return;
    preloadChatModal();
    track("chat_open", { location: opener });
    chatStore.open(opener);
  };

  const iconOnly = variant !== "menu-item";
  return (
    <button
      ref={ref}
      type="button"
      id={variant === "launcher" ? CHROME_IDS.chatLauncher : undefined}
      data-chat-opener={opener}
      // The mobile menu closes itself on this attribute (wireframe §4.4 step 1).
      data-menu-close={variant === "menu-item" ? "" : undefined}
      aria-label={iconOnly ? label : undefined}
      aria-busy={busy || undefined}
      onPointerEnter={preloadChatModal}
      onPointerDown={preloadChatModal}
      onFocus={preloadChatModal}
      onClick={onPress}
      className={cn(VARIANT[variant], "no-js:invisible")}
    >
      {iconOnly ? icon : label}
    </button>
  );
}
