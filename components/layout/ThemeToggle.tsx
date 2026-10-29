"use client";

import { useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/utils/theme";

export type ThemeToggleProps = {
  /** `ui.themeToggle` (names the dark theme). The caller does not render the
   *  toggle while it is empty (B-07), so the button is never nameless. */
  label: string;
  /** `bar` (T/L, XL header) or `menu-row` (M, inside C-14). */
  variant?: "bar" | "menu-row";
  /**
   * Server-rendered sun and moon icons. Both stay in the DOM; CSS shows the
   * active one from `[data-theme]` (no hydration mismatch).
   */
  icons: ReactNode;
  className?: string;
};

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Keeps every toggle instance (bar + menu row) in sync with `<html>`. */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/** Server snapshot: the server default theme (light). */
const serverTheme = (): Theme => "light";

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode, blocked): the switch still applies
    // for this page view.
  }
  const color = getComputedStyle(html).getPropertyValue("--c-bg").trim();
  if (!color) return;
  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.append(meta);
  }
  meta.content = color;
}

/**
 * C-13 (client). `<button aria-pressed>`: pressed = dark active. Writes
 * `localStorage`, `data-theme` and `meta[name=theme-color]`; the switch is
 * instant (M-06: no transition). `.no-js` → `visibility: hidden`.
 */
export function ThemeToggle({
  label,
  variant = "bar",
  icons,
  className,
}: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label={label}
      data-variant={variant}
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-md text-text hover:bg-inset active:bg-inset no-js:invisible",
        // Menu row (M): a 1 px control boundary so it reads as a control
        // beside its visible label; the bar variant is a ghost icon button.
        variant === "menu-row" && "border border-border-control bg-surface",
        className,
      )}
    >
      {icons}
    </button>
  );
}
