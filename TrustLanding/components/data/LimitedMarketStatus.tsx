"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/copy.fa";
import { Tabs } from "@/components/ui/Tabs";
import { Chip } from "@/components/ui/Chip";
import { isMarketOpenNow } from "@/lib/market-hours";

const CHECK_INTERVAL_MS = 60_000;

type MarketTab = (typeof copy.limitedMarkets.tabs)[number];

function MarketCard({ tab }: { tab: MarketTab }) {
  const t = copy.limitedMarkets;
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () =>
      setOpen(isMarketOpenNow({ openHour: tab.openHour, closeHour: tab.closeHour }));
    check();
    const timer = setInterval(check, CHECK_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [tab.openHour, tab.closeHour]);

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-ink-900">{tab.label}</p>
        {open !== null && <Chip tone={open ? "ok" : "unavailable"}>{open ? t.openNow : t.closedNow}</Chip>}
      </div>
      <p className="mt-3 text-xs tabular-nums text-muted">
        {t.hoursLabel}: {tab.hoursText}
      </p>
    </div>
  );
}

export function LimitedMarketStatus() {
  const t = copy.limitedMarkets;

  return (
    <div className="mt-10">
      <p className="text-sm font-bold text-ink-900">{t.title}</p>
      <p className="mt-1 max-w-xl text-xs text-muted">{t.subtitle}</p>
      <Tabs
        className="mt-4"
        items={t.tabs.map((tab) => ({
          key: tab.key,
          label: tab.label,
          content: (
            <div className="mt-4 max-w-sm">
              <MarketCard tab={tab} />
            </div>
          ),
        }))}
      />
    </div>
  );
}
