"use client";

import { useId } from "react";

import { Button } from "@/components/ui/Button";
import type { ChatAction } from "@/lib/utils/chat-config";

export type EscalationRailProps = {
  railHeading: string | null;
  railBody: string | null;
  actions: ChatAction[];
  rulesHeading: string | null;
  rules: string[];
};

/** C-35 (>= 1024 px only): each block hidden when empty. */
export function EscalationRail({
  railHeading,
  railBody,
  actions,
  rulesHeading,
  rules,
}: EscalationRailProps) {
  const headingId = useId();
  const items = rules.filter((rule) => rule.trim().length > 0);
  if (
    !railHeading &&
    !railBody &&
    actions.length === 0 &&
    !rulesHeading &&
    items.length === 0
  )
    return null;

  return (
    <aside
      aria-labelledby={railHeading ? headingId : undefined}
      className="hidden w-80 shrink-0 flex-col gap-4 overflow-y-auto border-s border-border p-5 lg:flex"
    >
      {railHeading ? (
        <h3 id={headingId} className="text-h3 text-text">
          {railHeading}
        </h3>
      ) : null}
      {railBody ? (
        <p className="text-small text-text-muted">{railBody}</p>
      ) : null}
      {actions.length > 0 ? (
        <div className="flex flex-col gap-2">
          {actions.map((action) => (
            <Button
              key={action.key}
              href={action.href}
              variant="outline"
              fullWidth
              trackId={action.trackId}
              trackLocation="chat"
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
      {rulesHeading || items.length > 0 ? (
        <div className="flex flex-col gap-2 rounded-md border border-border bg-inset p-4">
          {rulesHeading ? (
            <h3 className="text-small font-bold text-text">{rulesHeading}</h3>
          ) : null}
          {items.length > 0 ? (
            <ul className="flex list-disc flex-col gap-1 ps-5 text-small text-text-muted">
              {items.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
