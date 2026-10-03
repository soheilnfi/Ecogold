import { seededRandom } from "./seed";
import type { MockScenario } from "./scenario";

export type AssetKey = "gold" | "silver" | "coin";

/** یک نقطه از سری تاریخی قیمت — میانگین خرید/فروش در آن ساعت */
export interface PricePoint {
  at: string;
  price: number;
}

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
  /** ۲۴ نقطهٔ ساعتی برای ویجت نمودار؛ در حالت قطع منبع null است */
  history: PricePoint[] | null;
  /** درصد تغییر نسبت به ۲۴ ساعت قبل — از همین history محاسبه می‌شود */
  change24hPercent: number | null;
}

const BASE: Record<AssetKey, { unit: "gram" | "piece"; buy: number; sell: number; feePercent: number }> = {
  gold: { unit: "gram", buy: 19_150_000, sell: 19_000_000, feePercent: 0.5 },
  silver: { unit: "gram", buy: 232_000, sell: 227_000, feePercent: 0.5 },
  coin: { unit: "piece", buy: 182_000_000, sell: 178_500_000, feePercent: 0.3 },
};

const HISTORY_HOURS = 24;
const HOUR_MS = 3_600_000;

/**
 * سری ۲۴ ساعتهٔ قیمت. کاملاً قطعی است: هر ساعت با seed خودش ساخته می‌شود، پس
 * رفرش صفحه نمودار را عوض نمی‌کند و سرور و کلاینت به یک مقدار می‌رسند.
 */
function buildHistory(asset: AssetKey, now: number): PricePoint[] {
  const base = BASE[asset];
  const mid = (base.buy + base.sell) / 2;
  const endBucket = Math.floor(now / HOUR_MS);
  const points: PricePoint[] = [];

  for (let i = HISTORY_HOURS - 1; i >= 0; i--) {
    const bucket = endBucket - i;
    const rand = seededRandom(`price-history-${asset}-${bucket}`);
    const drift = Math.sin(bucket / 6.5) * 0.011;
    const jitter = (rand() - 0.5) * 0.005;
    points.push({
      at: new Date(bucket * HOUR_MS).toISOString(),
      price: Math.round((mid * (1 + drift + jitter)) / 1000) * 1000,
    });
  }

  return points;
}

/** تغییر اولین تا آخرین نقطهٔ سری ۲۴ ساعته، بر حسب درصد */
function change24h(history: PricePoint[]): number | null {
  const first = history[0]?.price;
  const last = history[history.length - 1]?.price;
  if (!first || !last) return null;
  return Math.round(((last - first) / first) * 10_000) / 100;
}

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
      history: null,
      change24hPercent: null,
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
  const history = buildHistory(asset, now);

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
    history,
    change24hPercent: change24h(history),
  };
}
