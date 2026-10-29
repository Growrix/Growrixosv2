"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { ChatAction } from "@/lib/utils/chat-config";
import { cn } from "@/lib/utils/cn";

export type ChatResponseState = "answered" | "no_answer" | "escalation";

export type ChatMessageData = {
  id: string;
  role: "assistant" | "user";
  text: string;
  responseState?: ChatResponseState;
  /** Request failed: destructive icon next to the text (not colour alone). */
  isError?: boolean;
  actions?: ChatAction[];
  /** Always empty in this slice (escalation only). */
  sources?: { label: string; href: string }[];
};

export type ChatThreadProps = {
  messages: ChatMessageData[];
  pending: boolean;
  pendingText: string;
  assistantLabel: string;
  noAnswerCue: string;
};

const BUBBLE =
  "max-w-[88%] rounded-md px-4 py-3 text-chat whitespace-pre-line sm:max-w-[78%]";

/** C-32: assistant label line (text, not colour) + plain-text body. */
function ChatMessage({
  message,
  assistantLabel,
  noAnswerCue,
}: {
  message: ChatMessageData;
  assistantLabel: string;
  noAnswerCue: string;
}) {
  if (message.role === "user") {
    return (
      <div
        className={cn(
          BUBBLE,
          "self-end rounded-ee-sm bg-inverse text-on-inverse",
        )}
      >
        {message.text}
      </div>
    );
  }
  const noAnswer = message.responseState === "no_answer";
  return (
    <div className="flex flex-col items-start gap-2">
      <div
        className={cn(
          BUBBLE,
          "rounded-es-sm bg-inset text-text",
          noAnswer && "border border-border-control",
        )}
      >
        <p className="mb-1 flex items-center gap-1 text-badge text-text-muted">
          <Icon name="sparkles" />
          {assistantLabel}
        </p>
        {noAnswer && noAnswerCue ? (
          <p className="mb-1 flex items-center gap-1 text-small text-text-muted">
            <Icon name="information-circle" />
            {noAnswerCue}
          </p>
        ) : null}
        <p className="flex items-start gap-2">
          {message.isError ? (
            <Icon
              name="information-circle"
              className="mt-0.5 text-destructive"
            />
          ) : null}
          <span>{message.text}</span>
        </p>
      </div>
      {message.actions && message.actions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {message.actions.map((action) => (
            <Button
              key={action.key}
              href={action.href}
              variant="outline"
              trackId={action.trackId}
              trackLocation="chat"
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** C-32 thread: `role="log"`, polite, additions only; scrolls internally. */
export function ChatThread({
  messages,
  pending,
  pendingText,
  assistantLabel,
  noAnswerCue,
}: ChatThreadProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const log = ref.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages.length, pending]);

  return (
    <div
      ref={ref}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-busy={pending || undefined}
      className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5"
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          assistantLabel={assistantLabel}
          noAnswerCue={noAnswerCue}
        />
      ))}
      {pending ? (
        <div
          className={cn(
            BUBBLE,
            "self-start rounded-es-sm bg-inset text-text-muted",
          )}
        >
          {pendingText}
        </div>
      ) : null}
    </div>
  );
}
