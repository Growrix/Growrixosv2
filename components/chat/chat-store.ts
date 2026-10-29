// C-30 chat store (05 §5): a plain module store read through
// `useSyncExternalStore` (no zustand, 91-stack.md §2). Every trigger island
// imports the same module instance, so no provider is needed.

import type { ChatOpenLocation } from "@/lib/analytics/events";

export type ChatOpener = ChatOpenLocation;
export type ChatLoadState = "idle" | "loading" | "ready" | "failed";

export type ChatState = {
  readonly isOpen: boolean;
  readonly initialPrompt?: string;
  readonly opener?: ChatOpener;
  readonly loadState: ChatLoadState;
};

const SERVER_STATE: ChatState = { isOpen: false, loadState: "idle" };

let state: ChatState = SERVER_STATE;
const listeners = new Set<() => void>();

function set(patch: Partial<ChatState>): void {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

export const chatStore = {
  get: (): ChatState => state,
  getServer: (): ChatState => SERVER_STATE,
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  open(opener: ChatOpener, initialPrompt?: string): void {
    if (state.isOpen) return;
    set({ isOpen: true, opener, initialPrompt });
  },
  close(): void {
    set({ isOpen: false, initialPrompt: undefined });
  },
  setLoadState(loadState: ChatLoadState): void {
    if (state.loadState !== loadState) set({ loadState });
  },
};
