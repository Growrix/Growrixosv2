// Theme constants (02-tokens.md §1.1). C-18 (HeadBootstrap) inlines the same
// storage key in its pre-paint script.

export type Theme = "light" | "dark";

/** `localStorage` key; values `light` / `dark` only. */
export const THEME_STORAGE_KEY = "growrix-os-theme";

/**
 * Server value of `<meta name="theme-color">` (02-tokens.md §1.1: the light
 * `--c-bg`). The toggle (C-13) rewrites it to the active theme's `--c-bg`.
 */
export const SERVER_THEME_COLOR = "#f5f1e8";
