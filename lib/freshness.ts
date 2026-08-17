/**
 * تنها منبع تصمیم دربارهٔ وضعیت تازگی داده در کل پروژه.
 * هیچ کامپوننتی نباید مستقیماً asOf را با زمان فعلی مقایسه کند —
 * همه از resolveFreshness عبور می‌کنند تا رفتار در همه‌جا یکسان بماند.
 */

export type FreshnessStatus = "ok" | "stale" | "unavailable";

export type DataKind =
  | "price"
  | "status"
  | "coverage"
  | "licenses"
  | "incidents"
  | "reviews";

/** SLA پیش‌فرض تازگی به میلی‌ثانیه — سند بخش ۴ */
export const FRESHNESS_SLA_MS: Record<DataKind, number> = {
  price: 60_000,
  status: 5 * 60_000,
  coverage: 24 * 60 * 60_000,
  licenses: 24 * 60 * 60_000,
  incidents: 24 * 60 * 60_000,
  reviews: 24 * 60 * 60_000,
};

export interface ResolveFreshnessInput {
  /** وضعیتی که خودِ سرور اعلام کرده */
  serverStatus: FreshnessStatus | string | undefined | null;
  /** زمان‌مُهر ISO دادهٔ دریافتی */
  asOf: string | null | undefined;
  kind: DataKind;
  /** زمان «الان»، برای تست‌پذیری قابل تزریق است؛ پیش‌فرض Date.now() */
  now?: number;
}

/**
 * قاعده: سرور فقط می‌تواند وضعیت را بدتر کند، نه بهتر.
 * اگر سرور unavailable گفت، همیشه unavailable می‌ماند.
 * اگر عمر داده از SLA گذشت، حتی با سرور ok، نتیجه stale می‌شود.
 */
export function resolveFreshness({
  serverStatus,
  asOf,
  kind,
  now = Date.now(),
}: ResolveFreshnessInput): FreshnessStatus {
  if (serverStatus === "unavailable") return "unavailable";
  if (!asOf) return "unavailable";

  const asOfMs = new Date(asOf).getTime();
  if (Number.isNaN(asOfMs)) return "unavailable";

  const age = now - asOfMs;
  const sla = FRESHNESS_SLA_MS[kind];
  const serverSaysStale = serverStatus === "stale" || serverStatus === "delayed";

  if (age > sla) return "stale";
  return serverSaysStale ? "stale" : "ok";
}

/** آیا در این وضعیت مجاز به نمایش نشانگر مثبت (سبز/فعال) هستیم؟ — بدون داده، بدون سبز */
export function canShowPositive(status: FreshnessStatus): boolean {
  return status === "ok";
}
