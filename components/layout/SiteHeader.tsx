import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { CmsNavItem, SiteSettings, UiStrings } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { HeaderController } from "./HeaderController";
import { toHeaderNav } from "./nav-types";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

/**
 * Chat entry points owned by C-30 (slice 6). Rendered only when
 * `chatAvailable` is true (every required `concierge` field set, 06 §1.2).
 */
export type HeaderChatSlots = {
  /** Header chat button (T/L, XL; icon only, name `ui.chatOpen`). */
  trigger?: ReactNode;
  /** Mobile-menu chat entry (label `concierge.title`). */
  menuEntry?: ReactNode;
};

export type SiteHeaderProps = {
  brandName: string | null;
  navigation: CmsNavItem[];
  ctas: SiteSettings["ctas"];
  ui: UiStrings;
  /** `concierge.title`: the mobile-menu chat entry label (slice 6). */
  chatLabel: string | null;
  chatAvailable: boolean;
  chat?: HeaderChatSlots;
};

/** Sun and moon both in the DOM; `[data-theme]` decides which shows (C-13). */
function ThemeIcons() {
  return (
    <>
      <Icon name="sun" size={24} className="dark:hidden" />
      <Icon name="moon" size={24} className="hidden dark:block" />
    </>
  );
}

/**
 * C-10 (server shell). `<header>` (banner) with `data-header-state="solid"`
 * (server, no-JS and failed-hydration state); C-11 takes over on hydration.
 * DOM order (wireframe §2): wordmark link → nav (XL) → chat button (T/L, XL)
 * → theme toggle (T/L, XL) → header CTA → menu button (M, T/L) → menu panel.
 * Renders nothing without `brandName` (the home link would be nameless).
 */
export function SiteHeader({
  brandName,
  navigation,
  ctas,
  ui,
  chatLabel,
  chatAvailable,
  chat,
}: SiteHeaderProps) {
  if (!brandName) return null;

  const fitCall = ctas.fitCall;
  const teardown = ctas.teardown;
  const fitHref = fitCall?.href ?? null;
  const themeLabel = ui.themeToggle;
  const showChat = chatAvailable && Boolean(chatLabel);

  // Header CTA: one link per breakpoint band (wireframe §4.1); the hidden
  // ones are `display: none`, so only one is in the accessibility tree.
  // The M pill follows the < 360 px compact rule (wireframe §4.1.1).
  const headerCtas: { label: string | null; band: string; pill: boolean }[] = [
    { label: fitCall?.labelMobile ?? null, band: "flex md:hidden", pill: true },
    {
      label: fitCall?.labelShort ?? null,
      band: "hidden md:flex xl:hidden",
      pill: false,
    },
    { label: fitCall?.label ?? null, band: "hidden xl:flex", pill: false },
  ];

  const menuCtas =
    (fitCall?.label && fitHref) || (teardown?.label && teardown.href) ? (
      <div className="flex flex-col gap-3">
        {fitCall?.label && fitHref ? (
          <Button
            href={fitHref}
            variant="primary"
            size="md"
            fullWidth
            trackId={fitCall.trackId ?? undefined}
            trackLocation="menu"
          >
            {fitCall.label}
          </Button>
        ) : null}
        {teardown?.label && teardown.href ? (
          <Button
            href={teardown.href}
            variant="outline"
            size="md"
            fullWidth
            trackId={teardown.trackId ?? undefined}
            trackLocation="menu"
          >
            {teardown.label}
          </Button>
        ) : null}
      </div>
    ) : null;

  // M only: the theme row lives in the menu (D-026). Hidden while
  // `ui.themeToggle` is empty (B-07); the visible row label is omitted while
  // `ui.themeRowLabel` is empty.
  const themeRow = themeLabel ? (
    <div className="flex min-h-11 items-center justify-between gap-4 md:hidden">
      {ui.themeRowLabel ? (
        <span className="text-button text-text">{ui.themeRowLabel}</span>
      ) : null}
      <ThemeToggle
        label={themeLabel}
        variant="menu-row"
        icons={<ThemeIcons />}
      />
    </div>
  ) : null;

  const menuChat = showChat ? (chat?.menuEntry ?? null) : null;
  const menuExtras =
    themeRow || menuChat || menuCtas ? (
      <>
        {themeRow}
        {menuChat}
        {menuCtas}
      </>
    ) : null;

  return (
    <header
      data-header-state="solid"
      className="site-header fixed inset-x-0 top-0 z-(--z-header) h-(--chrome-h)"
    >
      <div className="mx-auto box-content flex h-full max-w-content items-center gap-2 px-(--gutter) compact:gap-1.5">
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center rounded-sm"
        >
          <Wordmark brandName={brandName} />
        </Link>
        <HeaderController
          navigation={toHeaderNav(navigation)}
          ui={{
            navLabel: ui.navLabel,
            submenuToggle: ui.submenuToggle,
            menuOpen: ui.menuOpen,
            menuClose: ui.menuClose,
          }}
          menuExtras={menuExtras}
          icons={{
            chevron: <Icon name="chevron-down" />,
            menu: <Icon name="bars-3" size={24} />,
            close: <Icon name="x-mark" size={24} />,
          }}
        >
          {showChat && chat?.trigger ? (
            <span className="hidden md:flex">{chat.trigger}</span>
          ) : null}
          {themeLabel ? (
            <span className="hidden md:flex">
              <ThemeToggle label={themeLabel} icons={<ThemeIcons />} />
            </span>
          ) : null}
          {fitHref
            ? headerCtas.map(({ label, band, pill }) =>
                label ? (
                  <span key={band} className={band}>
                    <Button
                      href={fitHref}
                      variant="primary"
                      size="md"
                      shape={pill ? "pill" : "rounded"}
                      trackId={fitCall?.trackId ?? undefined}
                      trackLocation="header"
                      className={cn(
                        "whitespace-nowrap",
                        pill && "compact:px-3 compact:text-button-compact",
                      )}
                    >
                      {label}
                    </Button>
                  </span>
                ) : null,
              )
            : null}
        </HeaderController>
      </div>
    </header>
  );
}
