"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";
import type { HeaderNavItem } from "./nav-types";

export type HeaderState = "solid" | "top" | "scrolled" | "hidden";

/** Wireframe §4.1.2 / C-11 thresholds (px). */
const TOP_MAX = 8;
const PIN_MAX = 64;
const HIDE_DELTA = 8;

export type HeaderControllerUi = {
  /** `ui.navLabel`; `aria-label` omitted while empty (B-07). */
  navLabel?: string;
  /** `ui.submenuToggle`; dropdown name = item label only while empty (B-07). */
  submenuToggle?: string;
  /** `ui.menuOpen` / `ui.menuClose`; without both the menu is not rendered. */
  menuOpen?: string;
  menuClose?: string;
};

export type HeaderControllerProps = {
  navigation: HeaderNavItem[];
  ui: HeaderControllerUi;
  /**
   * Server-rendered bar controls, in DOM order: chat button (slice 6),
   * theme toggle, header CTA (wireframe §2).
   */
  children?: ReactNode;
  /** Server-rendered tail of the mobile menu panel (see C-14). */
  menuExtras?: ReactNode;
  /** Server-rendered icons (keeps the icon map out of the client bundle). */
  icons: { chevron: ReactNode; menu: ReactNode; close: ReactNode };
};

/**
 * C-11 (client). Owns the header state machine and the C-12 / C-14 open
 * state. Writes `data-header-state` on the enclosing server `<header>`
 * (`solid` on the server, no-JS and failed hydration):
 * - `top`: on `/` at scrollY <= 8; `scrolled`: otherwise (C-11: the first set
 *   at hydration is `top` on `/` at the top, else `scrolled`);
 * - `hidden`: scrollY > 64 after >= 8 px of downward scroll since the last
 *   direction change; any upward scroll returns to `scrolled`;
 * - pinned (never `hidden`): menu open, a dropdown open, keyboard focus in
 *   the header, or scrollY <= 64 (D-016). The header is never `inert`.
 * Removes `html[data-home-top]` (set by C-18 before paint) on hydration.
 */
export function HeaderController({
  navigation,
  ui,
  children,
  menuExtras,
  icons,
}: HeaderControllerProps) {
  const isHome = usePathname() === "/";
  const rootRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Pin inputs read by the scroll handler (refs: no re-render per scroll).
  const focusPinRef = useRef(false);
  const statePinRef = useRef(false);
  const unhideRef = useRef<() => void>(() => {});

  // Scroll state machine (rAF-throttled, passive listener).
  useEffect(() => {
    const header = rootRef.current?.closest("header");
    if (!header) return;
    document.documentElement.removeAttribute("data-home-top");

    const isPinned = () => focusPinRef.current || statePinRef.current;
    let lastY = Math.max(0, window.scrollY);
    let anchorY = lastY;
    let lastDirection = 0;
    let frame = 0;

    const set = (next: HeaderState) => {
      if (header.dataset.headerState !== next)
        header.dataset.headerState = next;
    };

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const direction = Math.sign(y - lastY);
      if (direction !== 0 && direction !== lastDirection) {
        anchorY = lastY;
        lastDirection = direction;
      }
      lastY = y;

      if (y <= TOP_MAX) set(isHome ? "top" : "scrolled");
      else if (isPinned() || y <= PIN_MAX) set("scrolled");
      else if (direction > 0 && y - anchorY >= HIDE_DELTA) set("hidden");
      else if (direction < 0) set("scrolled");
      else if (header.dataset.headerState !== "hidden") set("scrolled");
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Keyboard focus entering the header pins it and reveals it at once.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Element;
      if (!target.matches(":focus-visible")) return;
      focusPinRef.current = true;
      if (header.dataset.headerState === "hidden") set("scrolled");
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!header.contains(event.relatedTarget as Node | null))
        focusPinRef.current = false;
    };

    unhideRef.current = () => {
      if (header.dataset.headerState === "hidden") set("scrolled");
    };

    // First set at hydration (no transition: M-02). `data-header-ready`
    // enables the M-02/M-03 transitions two frames later, after that first
    // state has been styled.
    update();
    let readyFrame = requestAnimationFrame(() => {
      readyFrame = requestAnimationFrame(() => {
        header.dataset.headerReady = "";
      });
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocusIn);
    header.addEventListener("focusout", onFocusOut);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      cancelAnimationFrame(readyFrame);
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocusIn);
      header.removeEventListener("focusout", onFocusOut);
      unhideRef.current = () => {};
    };
  }, [isHome]);

  // An open menu or dropdown pins the header.
  useEffect(() => {
    statePinRef.current = menuOpen || openDropdown !== null;
    if (statePinRef.current) unhideRef.current();
  }, [menuOpen, openDropdown]);

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);
  const onMenuChange = useCallback((open: boolean) => setMenuOpen(open), []);

  return (
    <div ref={rootRef} className="contents">
      {navigation.length > 0 ? (
        <nav
          aria-label={ui.navLabel || undefined}
          className="hidden xl:ms-8 xl:flex"
        >
          <ul className="flex items-center gap-2">
            {navigation.map((item) =>
              item.children.length > 0 ? (
                <NavDropdown
                  key={item.key}
                  item={item}
                  toggleSuffix={ui.submenuToggle}
                  open={openDropdown === item.key}
                  onToggle={() =>
                    setOpenDropdown((current) =>
                      current === item.key ? null : item.key,
                    )
                  }
                  onClose={closeDropdown}
                  chevron={icons.chevron}
                />
              ) : (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-md px-3 text-button whitespace-nowrap text-text hover:bg-inset active:bg-inset"
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
      ) : null}

      <div className="ms-auto flex items-center gap-2 compact:gap-1.5">
        {children}
        {ui.menuOpen && ui.menuClose ? (
          <MobileMenu
            navigation={navigation}
            navLabel={ui.navLabel}
            openLabel={ui.menuOpen}
            closeLabel={ui.menuClose}
            open={menuOpen}
            onOpenChange={onMenuChange}
            extras={menuExtras}
            openIcon={icons.menu}
            closeIcon={icons.close}
          />
        ) : null}
      </div>
    </div>
  );
}
