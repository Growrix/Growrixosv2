// Shared state between the chrome islands (C-11/C-14, C-15, later C-30).
// A plain module store read through `useSyncExternalStore`: every client
// island imports the same module instance, so no provider or context island
// is needed (91-stack.md §2: no zustand).
//
// - `menuOpen`: written by C-14 (MobileMenu); C-15 hides while it is true.
// - `dialogOpen`: written by the chat modal in slice 6 (C-31); C-15 hides
//   while it is true (wireframe §4.3).

export type ChromeState = {
  readonly menuOpen: boolean;
  readonly dialogOpen: boolean;
};

const SERVER_STATE: ChromeState = { menuOpen: false, dialogOpen: false };

let state: ChromeState = SERVER_STATE;
const listeners = new Set<() => void>();

export function getChromeState(): ChromeState {
  return state;
}

/** Server and hydration snapshot: nothing is open. */
export function getServerChromeState(): ChromeState {
  return SERVER_STATE;
}

export function setChromeState(patch: Partial<ChromeState>): void {
  const next = { ...state, ...patch };
  if (next.menuOpen === state.menuOpen && next.dialogOpen === state.dialogOpen)
    return;
  state = next;
  listeners.forEach((listener) => listener());
}

export function subscribeChromeState(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Element ids the chrome islands look up (root layout, DOM order §2). */
export const CHROME_IDS = {
  main: "main",
  footer: "site-footer",
  footerNav: "footer-nav",
  mobileMenu: "mobile-menu",
  ctaBar: "mobile-cta-bar",
  /** C-30 launcher (slice 6). */
  chatLauncher: "chat-launcher",
} as const;
