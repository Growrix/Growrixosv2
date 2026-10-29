"use client";

import { useEffect, useId, useRef, useState } from "react";

import { setChromeState } from "@/components/layout/chrome-state";
import { Icon } from "@/components/ui/Icon";
import type { ChatPromptKind } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import type { Concierge } from "@/lib/cms/types";
import type { ChatAction } from "@/lib/utils/chat-config";

import { ChatComposer } from "./ChatComposer";
import {
  ChatThread,
  type ChatMessageData,
  type ChatResponseState,
} from "./ChatThread";
import { EscalationRail } from "./EscalationRail";
import { StarterPrompts } from "./StarterPrompts";

export type ChatModalProps = {
  concierge: Concierge;
  /** `ui.chatClose`. */
  closeLabel: string;
  actions: ChatAction[];
  initialPrompt?: string;
  returnFocusTo: () => HTMLElement | null;
  onClose: () => void;
};

const ENDPOINT = "/api/v1/ai-concierge";

type ChatResponse =
  | {
      success: true;
      data: {
        answer: string;
        messageId: string;
        responseState: ChatResponseState;
        sessionId: string;
        suggestedActions: { label: string; href: string }[];
      };
    }
  | { success: false };

/**
 * C-31 (client, lazy chunk). Native `<dialog>` + `showModal()`: Escape, the
 * close button, a backdrop click or any link closes it; focus goes to the
 * textarea on open and back to `returnFocusTo()` on close (wireframe §4.4).
 */
export function ChatModal({
  concierge,
  closeLabel,
  actions,
  initialPrompt,
  returnFocusTo,
  onClose,
}: ChatModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sessionId = useRef<string | undefined>(undefined);
  const nextId = useRef(0);
  const [messages, setMessages] = useState<ChatMessageData[]>(() => [
    { id: "intro", role: "assistant", text: concierge.intro ?? "" },
  ]);
  const [draft, setDraft] = useState(initialPrompt ?? "");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    textareaRef.current?.focus();
    setChromeState({ dialogOpen: true });
    // Page scroll lock on <body>, so it never fights the menu's <html> lock.
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    // Backdrop click (the dialog box itself, outside the panel) or any link
    // closes it. Native listener: Escape and the close button are the
    // keyboard paths, so the dialog element needs no key handler.
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target === dialog || target.closest("a[href]")) dialog.close();
    };
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("click", onClick);
      body.style.overflow = previousOverflow;
      setChromeState({ dialogOpen: false });
      if (dialog.open) dialog.close();
      returnFocusTo()?.focus();
    };
  }, [returnFocusTo]);

  const makeId = () => `m${(nextId.current += 1)}`;

  const send = async (text: string, kind: ChatPromptKind) => {
    const message = text.trim();
    if (pending || message.length < 2) return;
    track("chat_message_sent", { prompt_kind: kind });
    setMessages((list) => [
      ...list,
      { id: makeId(), role: "user", text: message },
    ]);
    setDraft("");
    setPending(true);

    let reply: ChatMessageData;
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          pagePath: window.location.pathname,
          sessionId: sessionId.current,
        }),
      });
      const payload = (await response.json()) as ChatResponse;
      if (!response.ok || !payload.success) {
        throw new Error(`chat request failed (${response.status})`);
      }
      sessionId.current = payload.data.sessionId;
      reply = {
        id: payload.data.messageId,
        role: "assistant",
        text: payload.data.answer,
        responseState: payload.data.responseState,
        actions: payload.data.suggestedActions.map((action, index) => ({
          key: `${index}-${action.href}`,
          label: action.label,
          href: action.href,
          trackId: actions.find((known) => known.href === action.href)?.trackId,
        })),
      };
    } catch {
      // Handled fully (R): the visitor sees `errorReply` + the actions; the
      // raw error is never shown and the message text is never logged.
      reply = {
        id: makeId(),
        role: "assistant",
        text: concierge.errorReply ?? "",
        isError: true,
        actions,
      };
    }
    setMessages((list) => [...list, reply]);
    setPending(false);
  };

  const close = () => dialogRef.current?.close();

  const hasUserMessage = messages.some((message) => message.role === "user");

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      // Fires for Escape, the close button and link activation. Ignore a
      // stale event from a dev double-mount where the dialog reopened.
      onClose={() => {
        if (!dialogRef.current?.open) onClose();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-surface p-0 text-text backdrop:bg-overlay sm:m-auto sm:h-[min(88dvh,860px)] sm:w-[min(1120px,100%-2rem)] sm:rounded-lg sm:border sm:border-border-strong sm:shadow-3 sm:backdrop:backdrop-blur-xs"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start gap-3 border-b border-border px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-5">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 id={titleId} className="font-display text-chat-title">
              {concierge.title}
            </h2>
            <p id={descriptionId} className="text-small text-text-muted">
              {concierge.subtitle}
            </p>
          </div>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={close}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text hover:bg-inset active:bg-inset"
          >
            <Icon name="x-mark" size={24} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <ChatThread
              messages={messages}
              pending={pending}
              pendingText={concierge.pendingText ?? ""}
              assistantLabel={concierge.assistantLabel ?? ""}
              noAnswerCue={concierge.noAnswerCue ?? ""}
            />
            {hasUserMessage ? null : (
              <StarterPrompts
                prompts={concierge.starterPrompts}
                onPick={(prompt) => void send(prompt, "starter")}
              />
            )}
            <ChatComposer
              inputLabel={concierge.inputLabel ?? ""}
              placeholder={concierge.inputPlaceholder ?? ""}
              sendLabel={concierge.sendLabel ?? ""}
              pending={pending}
              value={draft}
              onChange={setDraft}
              onSubmit={() => void send(draft, "typed")}
              textareaRef={textareaRef}
            />
          </div>
          <EscalationRail
            railHeading={concierge.railHeading}
            railBody={concierge.railBody}
            actions={actions}
            rulesHeading={concierge.rulesHeading}
            rules={concierge.rules}
          />
        </div>
      </div>
    </dialog>
  );
}
