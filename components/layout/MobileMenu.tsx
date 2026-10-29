"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { CHROME_IDS, setChromeState } from "./chrome-state";
import type { HeaderNavItem } from "./nav-types";

export type MobileMenuProps = {
  navigation: HeaderNavItem[];
  /** `ui.navLabel`; the `aria-label` is omitted while it is empty (B-07). */
  navLabel?: string;
  /** `ui.menuOpen` / `ui.menuClose`: the button names. */
  openLabel: string;
  closeLabel: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Server-rendered tail of the panel, after the hairline, in order:
   * theme row (M only), chat entry (slice 6), fit-call and teardown buttons.
   */
  extras?: ReactNode;
  /** Server-rendered `bars-3` / `x-mark` icons. */
  openIcon: ReactNode;
  closeIcon: ReactNode;
};

/** Ids made `inert` while the menu is open (wireframe §4.1.2). The CTA bar
 *  (C-15) hides itself, and so becomes inert, from the shared `menuOpen`. */
const INERT_IDS = [
  CHROME_IDS.main,
  CHROME_IDS.footer,
  CHROME_IDS.chatLauncher,
] as const;

/** At and above this width the desktop nav replaces the menu (D-026). */
const XL_QUERY = "(min-width: 80rem)";

/**
 * C-14 (client, inside C-11), below 1280 px. While open: page scroll locked,
 * main / footer / launcher `inert`, focus on the first link. Escape or the
 * button closes and returns focus to the button; any link closes it.
 * `.no-js`: the button is replaced by a link to `#footer-nav`.
 */
export function MobileMenu({
  navigation,
  navLabel,
  openLabel,
  closeLabel,
  open,
  onOpenChange,
  extras,
  openIcon,
  closeIcon,
}: MobileMenuProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const targets = INERT_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const previousInert = targets.map((el) => el.inert);
    targets.forEach((el) => {
      el.inert = true;
    });
    setChromeState({ menuOpen: true });

    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onOpenChange(false);
      buttonRef.current?.focus();
    };
    const xl = window.matchMedia(XL_QUERY);
    const onBreakpoint = () => {
      if (xl.matches) onOpenChange(false);
    };
    // Activating any link in the panel closes the menu (keyboard activation
    // of a link fires the same click event).
    const panel = panelRef.current;
    const onPanelClick = (event: MouseEvent) => {
      if ((event.target as Element).closest("a[href]")) onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    xl.addEventListener("change", onBreakpoint);
    panel?.addEventListener("click", onPanelClick);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      xl.removeEventListener("change", onBreakpoint);
      panel?.removeEventListener("click", onPanelClick);
      html.style.overflow = previousOverflow;
      targets.forEach((el, i) => {
        el.inert = previousInert[i] ?? false;
      });
      setChromeState({ menuOpen: false });
    };
  }, [open, onOpenChange]);

  return (
    <>
      {/* .no-js: the menu cannot open, so the button becomes a link to the
          footer navigation. */}
      <a
        href={`#${CHROME_IDS.footerNav}`}
        aria-label={openLabel}
        className="inline-flex size-11 items-center justify-center rounded-md text-text hover:bg-inset active:bg-inset xl:hidden js:hidden"
      >
        {openIcon}
      </a>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={CHROME_IDS.mobileMenu}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => onOpenChange(!open)}
        className="inline-flex size-11 items-center justify-center rounded-md text-text hover:bg-inset active:bg-inset aria-expanded:bg-inset xl:hidden no-js:hidden"
      >
        {open ? closeIcon : openIcon}
      </button>

      <div
        id={CHROME_IDS.mobileMenu}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-(--chrome-h) bottom-0 overflow-y-auto overscroll-contain bg-surface text-text xl:hidden"
      >
        <div className="mx-auto box-content flex max-w-content flex-col gap-4 px-(--gutter) py-6">
          {navigation.length > 0 ? (
            <nav aria-label={navLabel || undefined}>
              <ul className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className="-mx-3 flex min-h-11 items-center rounded-md px-3 text-button hover:bg-inset active:bg-inset"
                    >
                      {item.label}
                    </a>
                    {item.children.length > 0 ? (
                      <ul className="ms-1 mt-2 flex flex-col gap-2 border-s border-border ps-3">
                        {item.children.map((child) => (
                          <li key={child.key}>
                            <a
                              href={child.href}
                              className="flex min-h-11 items-center rounded-md px-3 text-button font-normal text-text-muted hover:bg-inset hover:text-text active:bg-inset"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {extras ? (
            <>
              <hr className="border-border" />
              <div className="flex flex-col gap-4">{extras}</div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
