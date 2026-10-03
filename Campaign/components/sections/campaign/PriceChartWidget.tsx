"use client";

import dynamic from "next/dynamic";
import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { resolveFreshness } from "@/lib/freshness";
import { formatClock } from "@/lib/jalali";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { FreshnessSeal } from "@/components/data/FreshnessSeal";
import type { AssetKey, PriceResponse } from "@/lib/mock/prices";

const PriceChart = dynamic(() => import("./PriceChart"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-card bg-surface-2" />,
});

const POLL_MS = 60_000;

function AssetChart({ asset }: { asset: AssetKey }) {
  const t = copy.campaign.priceChart;
  const { data, fetchFailed, loading } = useLiveData<PriceResponse>(
    `/api/prices?asset=${asset}`,
    { intervalMs: POLL_MS }
  );

  const status = resolveFreshness({
    serverStatus: fetchFailed ? "unavailable" : data?.status,
    asOf: data?.asOf ?? null,
    kind: "price",
  });

  const history = status === "unavailable" ? null : (data?.history ?? null);

  return (
    <div className="pt-8">
      <div className="h-72 w-full sm:h-80">
        {loading && !data ? (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            {t.states.loading}
          </div>
        ) : !history || history.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-card border border-dashed border-line text-sm text-muted">
            {t.states.unavailable}
          </div>
        ) : (
          <PriceChart
            points={history.map((point) => ({
              timeLabel: formatClock(point.at),
              price: point.price,
            }))}
            seriesLabel={t.seriesLabel}
          />
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <FreshnessSeal status={status} asOf={data?.asOf ?? null} variant="relative" />
        <p className="text-xs text-muted">{t.note}</p>
      </div>
    </div>
  );
}

export function PriceChartWidget() {
  const t = copy.campaign.priceChart;

  return (
    <section id="price-chart" className="scroll-mt-20 border-b border-line bg-surface-2">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-display-l font-black text-ink-900">{t.title}</h2>
          <p className="mt-4 max-w-xl text-body leading-8 text-ink-500">{t.subtitle}</p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <Tabs
            items={[
              { key: "gold", label: t.tabs.gold, content: <AssetChart asset="gold" /> },
              { key: "silver", label: t.tabs.silver, content: <AssetChart asset="silver" /> },
              { key: "coin", label: t.tabs.coin, content: <AssetChart asset="coin" /> },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
