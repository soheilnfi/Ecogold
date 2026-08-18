import { formatFriendlyDateTime, formatRelativeFromNow } from "@/lib/jalali";
import type { FreshnessStatus } from "@/lib/freshness";
import { cn } from "@/lib/cn";

const DOT_TONE: Record<FreshnessStatus, string> = {
  ok: "bg-ok",
  stale: "bg-warn",
  unavailable: "bg-unavailable",
};

const LABEL: Record<FreshnessStatus, string> = {
  ok: "به‌روز",
  stale: "داده قدیمی",
  unavailable: "در دسترس نیست",
};

/**
 * تنها راه نمایش زمان در کل پروژه — هیچ کامپوننتی نباید مستقیم asOf را فرمت کند.
 * برای stale/unavailable هرگز عدد/زمانِ گمراه‌کننده نمایش نمی‌دهد.
 */
export function FreshnessSeal({
  status,
  asOf,
  now,
  variant = "datetime",
  onVault = false,
  className,
}: {
  status: FreshnessStatus;
  asOf: string | null;
  now?: number;
  variant?: "datetime" | "relative";
  onVault?: boolean;
  className?: string;
}) {
  const timeText =
    status !== "unavailable" && asOf
      ? variant === "relative"
        ? formatRelativeFromNow(asOf, now)
        : formatFriendlyDateTime(asOf, now)
      : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 tabular-nums text-xs",
        onVault ? "text-vault-muted" : "text-muted",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          DOT_TONE[status],
          status === "ok" && "motion-safe:animate-pulse"
        )}
      />
      <span>
        {timeText ?? LABEL[status]}
        {status === "stale" && timeText ? ` · ${LABEL.stale}` : null}
      </span>
    </span>
  );
}
