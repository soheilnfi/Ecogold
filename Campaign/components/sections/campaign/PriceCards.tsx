"use client";

import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { resolveFreshness, type FreshnessStatus } from "@/lib/freshness";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FreshnessSeal } from "@/components/data/FreshnessSeal";
import { AssetPriceCard } from "@/components/sections/campaign/AssetPriceCard";
import type { AssetKey, PriceResponse } from "@/lib/mock/prices";

const ASSETS: readonly AssetKey[] = ["gold", "silver", "coin"];
const POLL_MS = 10_000;

function useAssetPrice(asset: AssetKey) {
  const { data, fetchFailed, loading } = useLiveData<PriceResponse>(
    `/api/prices?asset=${asset}`,
    { intervalMs: POLL_MS }
  );

  const status = resolveFreshness({
    serverStatus: fetchFailed ? "unavailable" : data?.status,
    asOf: data?.asOf ?? null,
    kind: "price",
  });

  return { data: data ?? null, status, loading };
}

/** بدترین وضعیت بین دارایی‌ها — مُهر مشترک نباید از ضعیف‌ترین منبع خوش‌بین‌تر باشد */
function worstStatus(statuses: FreshnessStatus[]): FreshnessStatus {
  if (statuses.includes("unavailable")) return "unavailable";
  if (statuses.includes("stale")) return "stale";
  return "ok";
}

export function PriceCards() {
  const t = copy.campaign.priceTicker;

  // تعداد دارایی‌ها ثابت است، پس فراخوانی هوک به ازای هرکدام امن است
  const gold = useAssetPrice("gold");
  const silver = useAssetPrice("silver");
  const coin = useAssetPrice("coin");
  const byAsset = { gold, silver, coin };

  const sealStatus = worstStatus([gold.status, silver.status, coin.status]);
  const sealAsOf =
    [gold, silver, coin]
      .map((a) => a.data?.asOf ?? null)
      .filter((v): v is string => v !== null)
      .sort()[0] ?? null;

  return (
    <section id="prices" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-20">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-display-l font-black text-ink-900">{t.title}</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ASSETS.map((asset, idx) => (
            <Reveal key={asset} delay={idx * 0.08}>
              <AssetPriceCard
                asset={asset}
                data={byAsset[asset].data}
                status={byAsset[asset].status}
                loading={byAsset[asset].loading}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <FreshnessSeal status={sealStatus} asOf={sealAsOf} variant="relative" />
          <p className="text-xs text-muted">{t.note}</p>
        </div>
      </div>
    </section>
  );
}
