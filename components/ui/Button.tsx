import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "md" | "lg";
/** `pill` = `--radius-pill` (header CTA pill, wireframe §4.1). */
export type ButtonShape = "rounded" | "pill";

type Labelled =
  | { children: ReactNode; ariaLabel?: string }
  /** Icon-only: an accessible name is required. */
  | { children?: undefined; ariaLabel: string };

type AsLink = {
  href: string;
  type?: undefined;
};

type AsButton = {
  href?: undefined;
  type?: "button" | "submit" | "reset";
};

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  fullWidth?: boolean;
  iconStart?: IconName;
  iconEnd?: IconName;
  trackId?: string;
  trackLocation?: string;
  className?: string;
} & Labelled &
  (AsLink | AsButton);

const BASE =
  "inline-flex items-center justify-center gap-2 font-sans text-center select-none " +
  "disabled:pointer-events-none disabled:opacity-60 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-60";

// Hover is gated to (hover: hover) and (pointer: fine) by the custom `hover`
// variant in globals.css. `active:` gives press feedback on touch too.
// Disabled controls get no pointer events, so no hover or press style.
const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary shadow-1 hover:bg-primary-hover active:bg-primary-hover",
  outline:
    "border border-border-control bg-surface text-text hover:bg-inset active:bg-inset",
  ghost: "bg-transparent text-text hover:bg-inset active:bg-inset",
};

const SIZE: Record<ButtonSize, { text: string; box: string; square: string }> =
  {
    md: { text: "text-button", box: "min-h-11", square: "size-11" },
    lg: { text: "text-button-lg", box: "min-h-12", square: "size-12" },
  };

const SHAPE: Record<ButtonShape, { radius: string; padding: string }> = {
  rounded: { radius: "rounded-md", padding: "px-5" },
  pill: { radius: "rounded-pill", padding: "px-4" },
};

/** C-01: `<a>` when `href` is set, otherwise `<button>`. */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    shape = "rounded",
    disabled = false,
    fullWidth = false,
    iconStart,
    iconEnd,
    trackId,
    trackLocation,
    className,
    children,
    ariaLabel,
  } = props;

  const iconOnly = children === undefined || children === null;
  const classes = cn(
    BASE,
    VARIANT[variant],
    SIZE[size].text,
    SHAPE[shape].radius,
    iconOnly ? SIZE[size].square : cn(SIZE[size].box, SHAPE[shape].padding),
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {iconStart ? <Icon name={iconStart} /> : null}
      {children}
      {iconEnd ? <Icon name={iconEnd} /> : null}
    </>
  );

  const track = {
    "data-track-id": trackId,
    "data-track-location": trackLocation,
  };

  if (props.href !== undefined) {
    return (
      <a
        href={disabled ? undefined : props.href}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        className={classes}
        {...track}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
      {...track}
    >
      {content}
    </button>
  );
}
