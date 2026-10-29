import { Button } from "@/components/ui/Button";
import type { CtaFitCall, CtaTeardown, Nullable } from "@/lib/cms/types";

import { MobileCtaBarController } from "./MobileCtaBarController";

export type MobileCtaBarProps = {
  fitCall: Nullable<CtaFitCall>;
  teardown: Nullable<CtaTeardown>;
};

/**
 * C-15 (server part): the two bar buttons, rendered on the server and handed
 * to the behaviour island. Fit call primary (`labelShort`, flex 1.4) and
 * teardown outline (`teardown.labelShort`, flex 1), both 44 px,
 * `trackLocation="sticky"`. A button whose label or href is empty is not
 * rendered; with neither, the bar is not rendered (R-03).
 */
export function MobileCtaBar({ fitCall, teardown }: MobileCtaBarProps) {
  const fit =
    fitCall?.labelShort && fitCall.href
      ? { label: fitCall.labelShort, href: fitCall.href }
      : null;
  const tear =
    teardown?.labelShort && teardown.href
      ? { label: teardown.labelShort, href: teardown.href }
      : null;
  if (!fit && !tear) return null;

  return (
    <MobileCtaBarController>
      {fit ? (
        <span className="flex flex-[1.4]">
          <Button
            href={fit.href}
            variant="primary"
            size="md"
            fullWidth
            trackId={fitCall?.trackId ?? undefined}
            trackLocation="sticky"
          >
            {fit.label}
          </Button>
        </span>
      ) : null}
      {tear ? (
        <span className="flex flex-1">
          <Button
            href={tear.href}
            variant="outline"
            size="md"
            fullWidth
            trackId={teardown?.trackId ?? undefined}
            trackLocation="sticky"
          >
            {tear.label}
          </Button>
        </span>
      ) : null}
    </MobileCtaBarController>
  );
}
