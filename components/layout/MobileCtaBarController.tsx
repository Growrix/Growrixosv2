"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  CHROME_IDS,
  getChromeState,
  getServerChromeState,
  subscribeChromeState,
} from "./chrome-state";

/** Wireframe §4.3: shown once 40 % of the scrollable height is passed. */
const SHOW_DEPTH = 0.4;

const TEXT_INPUT_TYPES = new Set([
  "text",
  "email",
  "search",
  "tel",
  "url",
  "password",
  "number",
]);

function isTextField(el: Element | null): boolean {
  if (!el) return false;
  if (el instanceof HTMLTextAreaElement) return true;
  if (el instanceof HTMLInputElement) return TEXT_INPUT_TYPES.has(el.type);
  return el instanceof HTMLElement && el.isContentEditable;
}

export type MobileCtaBarControllerProps = {
  /** Server-rendered fit-call and teardown buttons. */
  children: ReactNode;
};

/**
 * C-15 behaviour (client island). Shown after 40 % scroll depth; hidden
 * while the footer is in view (IntersectionObserver), while the mobile menu
 * or the chat dialog is open (shared chrome state), or while a text field
 * has focus. Hidden = moved out of view + `visibility: hidden` + `inert`.
 * Server render and no-JS: hidden. CSS limits the bar to < 768 px.
 */
export function MobileCtaBarController({
  children,
}: MobileCtaBarControllerProps) {
  const [deepEnough, setDeepEnough] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const { menuOpen, dialogOpen } = useSyncExternalStore(
    subscribeChromeState,
    getChromeState,
    getServerChromeState,
  );

  // Scroll depth (rAF-throttled, passive).
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setDeepEnough(
        scrollable > 0 && window.scrollY / scrollable >= SHOW_DEPTH,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    frame = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Footer visibility.
  useEffect(() => {
    const footer = document.getElementById(CHROME_IDS.footer);
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => {
      setFooterInView(entry?.isIntersecting ?? false);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Text-field focus anywhere on the page.
  useEffect(() => {
    const onFocusIn = (event: FocusEvent) =>
      setFieldFocused(isTextField(event.target as Element));
    const onFocusOut = (event: FocusEvent) =>
      setFieldFocused(isTextField(event.relatedTarget as Element | null));
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const shown =
    deepEnough && !footerInView && !fieldFocused && !menuOpen && !dialogOpen;

  return (
    <div
      id={CHROME_IDS.ctaBar}
      data-state={shown ? "shown" : "hidden"}
      inert={!shown}
      className="fixed inset-x-0 bottom-0 z-(--z-bar) flex gap-2 border-t border-border-strong bg-surface px-5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] data-[state=hidden]:invisible data-[state=hidden]:translate-y-full md:hidden"
    >
      {children}
    </div>
  );
}
