"use client";

import {
  useId,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";

import { Button } from "@/components/ui/Button";

export type ChatComposerProps = {
  inputLabel: string;
  placeholder: string;
  sendLabel: string;
  pending: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

const MIN_LENGTH = 2;
const MAX_LENGTH = 600;

/** C-33: visible label, 16 px textarea (2 rows → 160 px), Send is primary. */
export function ChatComposer({
  inputLabel,
  placeholder,
  sendLabel,
  pending,
  value,
  onChange,
  onSubmit,
  textareaRef,
}: ChatComposerProps) {
  const id = useId();
  const disabled = pending || value.trim().length < MIN_LENGTH;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!disabled) onSubmit();
  };

  // Enter sends, Shift+Enter adds a line; never during IME composition.
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    )
      return;
    event.preventDefault();
    if (!disabled) onSubmit();
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 border-t border-border px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5"
    >
      <label htmlFor={id} className="text-small text-text-muted">
        {inputLabel}
      </label>
      <div className="flex flex-col items-end gap-2 sm:flex-row">
        <textarea
          ref={textareaRef}
          id={id}
          name="message"
          rows={2}
          maxLength={MAX_LENGTH}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          className="field-sizing-content max-h-40 min-h-18 w-full resize-none rounded-md border border-border-control bg-surface px-3 py-3 text-input text-text placeholder:text-text-muted"
        />
        <Button type="submit" disabled={disabled} iconEnd="paper-airplane">
          {sendLabel}
        </Button>
      </div>
    </form>
  );
}
