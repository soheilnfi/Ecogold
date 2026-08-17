import { seededRandom } from "./seed";
import type { MockScenario } from "./scenario";

export type AssetKey = "gold" | "silver" | "coin";

export interface PriceResponse {
  asset: AssetKey;
  unit: "gram" | "piece";
  buy: number | null;
  sell: number | null;
  spread: { amount: number; percent: number } | null;
  feePercent: number | null;
  asOf: string | null;
  latencyMs: number | null;
  status: "ok" | "delayed" | "unavailable";
}

const BASE: Record<AssetKey, { unit: "gram" | "piece"; buy: number; sell: number; feePercent: number }> = {
  gold: { unit: "gram", buy: 19_150_000, sell: 19_000_000, feePercent: 0.5 },
  silver: { unit: "gram", buy: 232_000, sell: 227_000, feePercent: 0.5 },
  coin: { unit: "piece", buy: 182_000_000, sell: 178_500_000, feePercent: 0.3 },
};

export function isAssetKey(value: string | null): value is AssetKey {
  return value === "gold" || value === "silver" || value === "coin";
}

export function buildPriceResponse(
  asset: AssetKey,
  scenario: MockScenario,
  now: number
): PriceResponse {
  if (scenario === "unavailable" || scenario === "down") {
    return {
      asset,
      unit: BASE[asset].unit,
      buy: null,
      sell: null,
      spread: null,
      feePercent: null,
      asOf: null,
      latencyMs: null,
      status: "unavailable",
    };
  }

  // نوسان کوچک شبیه به بازار زنده، ولی در بازهٔ ۱۰ ثانیه‌ای پایدار
  const rand = seededRandom(`price-${asset}-${Math.floor(now / 10_000)}`);
  const jitter = 1 + (rand() - 0.5) * 0.004;
  const base = BASE[asset];
  const buy = Math.round((base.buy * jitter) / 1000) * 1000;
  const sell = Math.round((base.sell * jitter) / 1000) * 1000;
  const spreadAmount = buy - sell;

  const asOfMs = scenario === "stale" ? now - 5 * 60_000 : now - 3_000;

  return {
    asset,
    unit: base.unit,
    buy,
    sell,
    spread: { amount: spreadAmount, percent: Math.round((spreadAmount / sell) * 1000) / 10 },
    feePercent: base.feePercent,
    asOf: new Date(asOfMs).toISOString(),
    latencyMs: 400 + Math.round(rand() * 500),
    status: scenario === "stale" ? "delayed" : "ok",
  };
}
