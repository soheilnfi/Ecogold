/**
 * شبیه‌سازی خرابی/کهنگی برای هر Route Handler — بدون این، سناریوهای «قطع منبع»
 * و «دادهٔ کهنه» قابل تست نیستند.
 *
 * اولویت‌ها:
 *  ۱. کوئری‌پارام `?mock=` روی خودِ درخواست (فقط خارج از production) — برای Playwright
 *     که نمی‌خواهد بین سناریوها سرور را ری‌استارت کند.
 *  ۲. متغیر محیطی MOCK_SCENARIO، فرمت "coverage:stale,prices:down" یا "all:unavailable".
 *  ۳. پیش‌فرض "ok".
 */

export type MockScenario = "ok" | "stale" | "unavailable" | "down";

export const ENDPOINT_KEYS = [
  "coverage",
  "status",
  "prices",
  "incidents",
  "licenses",
  "reviews",
] as const;

export type EndpointKey = (typeof ENDPOINT_KEYS)[number];

function parseEnvScenarios(): Partial<Record<EndpointKey, MockScenario>> {
  const raw = process.env.MOCK_SCENARIO ?? "";
  const map: Partial<Record<EndpointKey, MockScenario>> = {};

  for (const pair of raw.split(",")) {
    const [rawKey, rawValue] = pair.split(":").map((s) => s.trim());
    if (!rawKey || !rawValue) continue;
    const value = rawValue as MockScenario;

    if (rawKey === "all") {
      for (const key of ENDPOINT_KEYS) map[key] = value;
    } else if ((ENDPOINT_KEYS as readonly string[]).includes(rawKey)) {
      map[rawKey as EndpointKey] = value;
    }
  }

  return map;
}

export function getScenario(request: Request, endpoint: EndpointKey): MockScenario {
  if (process.env.NODE_ENV !== "production") {
    const override = new URL(request.url).searchParams.get("mock");
    if (override) return override as MockScenario;
  }
  return parseEnvScenarios()[endpoint] ?? "ok";
}

/** عدد override برای تست دقیق (مثل coverage=98.2) — فقط خارج از production */
export function getNumberOverride(request: Request, param: string): number | null {
  if (process.env.NODE_ENV === "production") return null;
  const raw = new URL(request.url).searchParams.get(param);
  if (raw === null) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}
