import type { ComponentType, SVGProps } from "react";

import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

import { cn } from "@/lib/utils/cn";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

// C-05: Heroicons outline 24, per-icon imports. Only icons the plan names:
// arrow (C-02 arrow links), check (trust row, S3 bullets, security list),
// chevron (FAQ summary, nav dropdown), sparkles (chat assistant label),
// information (chat `no_answer` cue), sun / moon (C-13 theme toggle),
// bars-3 / x-mark (C-14 menu open / close), chat bubble (C-30 header
// trigger and launcher).
const ICONS = {
  "arrow-right": ArrowRightIcon,
  "bars-3": Bars3Icon,
  "chat-bubble-left-right": ChatBubbleLeftRightIcon,
  check: CheckIcon,
  "chevron-down": ChevronDownIcon,
  "information-circle": InformationCircleIcon,
  moon: MoonIcon,
  sparkles: SparklesIcon,
  sun: SunIcon,
  "x-mark": XMarkIcon,
} as const satisfies Record<string, HeroIcon>;

export type IconName = keyof typeof ICONS;
export type IconSize = 20 | 24;

/** Directional icons are mirrored under RTL (05 §0 logical CSS). */
const DIRECTIONAL: ReadonlySet<IconName> = new Set<IconName>(["arrow-right"]);

const SIZE_CLASS: Record<IconSize, string> = {
  20: "size-5",
  24: "size-6",
};

export type IconProps = {
  name: IconName;
  size?: IconSize;
  className?: string;
};

/** Always decorative (`aria-hidden`); meaning comes from adjacent text. */
export function Icon({ name, size = 20, className }: IconProps) {
  const Svg = ICONS[name];
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      className={cn(
        "shrink-0",
        SIZE_CLASS[size],
        DIRECTIONAL.has(name) && "rtl:-scale-x-100",
        className,
      )}
    />
  );
}
