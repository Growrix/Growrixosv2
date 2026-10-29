"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

import { VisuallyHidden } from "@/components/ui/VisuallyHidden";

import type { HeaderNavItem } from "./nav-types";

export type NavDropdownProps = {
  item: HeaderNavItem;
  /** `ui.submenuToggle`; while empty (B-07) the button name is the item label only. */
  toggleSuffix?: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  /** Server-rendered `chevron-down` icon (keeps the icon map out of the client bundle). */
  chevron: ReactNode;
};

/**
 * C-12 (client, inside C-11): disclosure button + list of child links (XL).
 * Opens on click / Enter / Space (native button), never on hover. Escape
 * closes and returns focus to the trigger; clicking outside or tabbing out
 * closes. One open at a time is enforced by C-11 (it owns the open key).
 * `.no-js`: the button is hidden and a plain link to `item.href` shows instead.
 */
export function NavDropdown({
  item,
  toggleSuffix,
  open,
  onToggle,
  onClose,
  chevron,
}: NavDropdownProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // While open: a press outside closes (pointerdown, so a press on another
  // trigger closes this one before that one opens); Escape closes and
  // returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const srSuffix = toggleSuffix ? ` ${toggleSuffix}` : null;

  return (
    <li
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (open && !rootRef.current?.contains(event.relatedTarget as Node))
          onClose();
      }}
    >
      {/* .no-js: plain link to the parent page. */}
      <a
        href={item.href}
        className="inline-flex min-h-11 items-center px-3 text-button js:hidden"
      >
        {item.label}
      </a>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="inline-flex min-h-11 items-center gap-1 px-3 text-button no-js:hidden"
      >
        {item.label}
        {srSuffix ? <VisuallyHidden>{srSuffix}</VisuallyHidden> : null}
        {chevron}
      </button>
      <ul
        id={panelId}
        hidden={!open}
        className="absolute start-0 top-full min-w-65 rounded-md border border-border-strong bg-surface py-2"
      >
        {item.children.map((child) => (
          <li key={child.key}>
            <a
              href={child.href}
              onClick={onClose}
              className="flex min-h-11 items-center px-4 text-button"
            >
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
