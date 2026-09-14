"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/copy.fa";
import { Chip } from "@/components/ui/Chip";
import { isMarketOpenNow } from "@/lib/market-hours";
import { UptimeStrip } from "@/components/data/UptimeStrip";
import { buildDays, average, type ServiceDay } from "@/lib/mock/status";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

const CHECK_INTERVAL_MS = 60_000;

type MarketTab = (typeof copy.limitedMarkets.tabs)[number];

/** رنگ‌بندی کارت بر اساس درصد دسترس‌پذیری ۳۰ روزه، مطابق کارت‌های وضعیت سرویس بالای صفحه */
function uptimeTier(uptime: number): { bg: string; text: string } {
  if (uptime >= 90) return { bg: "bg-ok-bg", text: "text-ok" };
  if (uptime >= 80) return { bg: "bg-warn-bg", text: "text-warn" };
  return { bg: "bg-down-bg", text: "text-down" };
}

export function MarketStatusCard({ market }: { market: MarketTab }) {
  const t = copy.limitedMarkets;
  const [open, setOpen] = useState<boolean | null>(null);
  const [days, setDays] = useState<ServiceDay[] | null>(null);

  useEffect(() => {
    const check = () =>
      setOpen(isMarketOpenNow({ openHour: market.openHour, closeHour: market.closeHour }));
    check();
    const timer = setInterval(check, CHECK_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [market.openHour, market.closeHour]);

  useEffect(() => {
    setDays(buildDays(Date.now(), market.key, "operational"));
  }, [market.key]);

  const uptime30d = days ? average(days.map((d) => d.uptime)) : null;
  const tier = uptime30d !== null ? uptimeTier(uptime30d) : null;

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-ink-900">{market.label}</p>
        {open !== null && <Chip tone={open ? "ok" : "unavailable"}>{open ? t.openNow : t.closedNow}</Chip>}
      </div>

      {days && (
        <div className="mt-4">
          <UptimeStrip days={days} />
        </div>
      )}

      {uptime30d !== null && tier && (
        <>
          <p className={cn("mt-3 text-2xl font-black tabular-nums", tier.text)}>
            {formatPercent(uptime30d, 2)}
          </p>
          <p className="mt-0.5 text-xs text-muted">در ۳۰ روز گذشته</p>
        </>
      )}

      <p className="mt-1 text-xs font-bold text-ink-700">
        {t.hoursLabel}: {market.hoursText}
      </p>
    </div>
  );
}
