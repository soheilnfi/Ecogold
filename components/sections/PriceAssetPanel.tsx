"use client";

import { useLiveData } from "@/lib/hooks/useLiveData";
import { resolveFreshness } from "@/lib/freshness";
import { formatPercent, formatToman } from "@/lib/format";
import { copy } from "@/content/copy.fa";
import { FreshnessSeal } from "@/components/data/FreshnessSeal";
import { SpreadCalculator } from "@/components/data/SpreadCalculator";
import type { AssetKey, PriceResponse } from "@/lib/mock/prices";

const POLL_MS = 10_000;

export function PriceAssetPanel({ asset }: { asset: AssetKey }) {
  const { data, fetchFailed, loading } = useLiveData<PriceResponse>(
    `/api/prices?asset=${asset}`,
    { intervalMs: POLL_MS }
  );

  const status = resolveFreshness({
    serverStatus: fetchFailed ? "unavailable" : data?.status,
    asOf: data?.asOf ?? null,
    kind: "price",
  });

  const t = copy.priceTransparency;
  const unavailable = status === "unavailable" || !data;
  const stale = status === "stale";

  const cells = [
    { label: t.labels.buy, value: unavailable ? t.states.unavailable : formatToman(data!.buy!) },
    { label: t.labels.sell, value: unavailable ? t.states.unavailable : formatToman(data!.sell!) },
    {
      label: t.labels.spread,
      value: unavailable
        ? t.states.unavailable
        : `${formatToman(data!.spread!.amount)} (${formatPercent(data!.spread!.percent)})`,
    },
    {
      label: t.labels.fee,
      value: unavailable ? t.states.unavailable : formatPercent(data!.feePercent!, 1),
    },
  ];

  return (
    <div className="pt-8">
      {stale && (
        <div className="mb-6 rounded-md bg-warn-bg px-4 py-3 text-sm font-bold text-warn">
          {t.states.delayed}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-card bg-surface-2" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cells.map((cell) => (
            <div key={cell.label} className="rounded-card border border-line bg-surface p-4">
              <p className="text-xs text-muted">{cell.label}</p>
              <p className="mt-2 text-sm font-bold tabular-nums text-ink-900">{cell.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        {!loading && <FreshnessSeal status={status} asOf={data?.asOf ?? null} variant="relative" />}
        <p className="text-xs text-muted">{t.updateNote}</p>
      </div>

      <div className="mt-8 rounded-card border border-line bg-surface p-5 sm:p-6">
        <p className="text-sm font-bold text-ink-900">{t.spreadExplainer.title}</p>
        <p className="mt-2 text-sm leading-7 text-muted">{t.spreadExplainer.body}</p>
      </div>

      <div className="mt-6">
        <SpreadCalculator buy={unavailable ? null : data!.buy} sell={unavailable ? null : data!.sell} disabled={unavailable} />
      </div>
    </div>
  );
}
