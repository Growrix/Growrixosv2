"use client";

export type StarterPromptsProps = {
  prompts: string[];
  onPick: (prompt: string) => void;
};

/** C-34: pill chips; one scrollable row < 640 px, wrapping at >= 640 px. */
export function StarterPrompts({ prompts, onPick }: StarterPromptsProps) {
  const items = prompts.filter((prompt) => prompt.trim().length > 0);
  if (items.length === 0) return null;
  return (
    <ul className="flex gap-2 overflow-x-auto px-4 pb-3 sm:flex-wrap sm:overflow-visible sm:px-5">
      {items.map((prompt) => (
        <li key={prompt} className="shrink-0">
          <button
            type="button"
            onClick={() => onPick(prompt)}
            className="motion-press min-h-11 rounded-pill border border-border-control bg-surface px-4 text-small text-text hover:bg-inset active:bg-inset"
          >
            {prompt}
          </button>
        </li>
      ))}
    </ul>
  );
}
