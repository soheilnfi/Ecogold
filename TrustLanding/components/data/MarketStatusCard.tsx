"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/copy.fa";
import { Chip } from "@/components/ui/Chip";
import { isMarketOpenNow } from "@/lib/market-hours";

const CHECK_INTERVAL_MS = 60_000;

type MarketTab = (typeof copy.limitedMarkets.tabs)[number];

export function MarketStatusCard({ market }: { market: MarketTab }) {
  const t = copy.limitedMarkets;
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () =>
      setOpen(isMarketOpenNow({ openHour: market.openHour, closeHour: market.closeHour }));
    check();
    const timer = setInterval(check, CHECK_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [market.openHour, market.closeHour]);

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-ink-900">{market.label}</p>
        {open !== null && <Chip tone={open ? "ok" : "unavailable"}>{open ? t.openNow : t.closedNow}</Chip>}
      </div>
      <p className="mt-3 text-xs tabular-nums text-muted">
        {t.hoursLabel}: {market.hoursText}
      </p>
    </div>
  );
}
