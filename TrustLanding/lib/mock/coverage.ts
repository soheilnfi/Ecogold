import { jalaliReportSuffix } from "@/lib/jalali";
import { seededRandom } from "./seed";
import type { MockScenario } from "./scenario";

export interface CoverageHistoryPoint {
  date: string;
  ratio: number;
}

export interface CoverageResponse {
  ratio: number | null;
  asOf: string | null;
  source: string;
  todayReport: { id: string; url: string; sizeBytes: number } | null;
  history: CoverageHistoryPoint[];
  status: "ok" | "stale" | "unavailable";
}

const DAY_MS = 24 * 60 * 60_000;
const REPORT_CYCLE_DAYS = 14;
const REPORT_COUNT = 30;

/**
 * گزارش پوشش هر ۱۴ روز یک‌بار تولید می‌شود، نه هر روز — نقاط نمودار/آرشیو فقط
 * روزهایی هستند که واقعاً گزارش داده شده؛ هیچ روز میانی ساخته نمی‌شود.
 */
function buildHistory(now: number, latestRatio: number): CoverageHistoryPoint[] {
  const rand = seededRandom("coverage-history-v1");
  const points: CoverageHistoryPoint[] = [];
  let ratio = latestRatio;

  for (let i = 0; i < REPORT_COUNT; i++) {
    const date = new Date(now - i * REPORT_CYCLE_DAYS * DAY_MS).toISOString().slice(0, 10);
    points.unshift({ date, ratio: Math.round(ratio * 10) / 10 });
    ratio += (rand() - 0.5) * 1.4;
    ratio = Math.min(104.5, Math.max(99.2, ratio));
  }

  points[points.length - 1] = { date: points[points.length - 1].date, ratio: latestRatio };
  return points;
}

export function buildCoverageResponse(
  scenario: MockScenario,
  now: number,
  ratioOverride: number | null
): CoverageResponse {
  const latestRatio = ratioOverride ?? 102.4;

  if (scenario === "unavailable" || scenario === "down") {
    return {
      ratio: null,
      asOf: null,
      source: "accounting",
      todayReport: null,
      history: [],
      status: "unavailable",
    };
  }

  const asOfMs = scenario === "stale" ? now - 2 * DAY_MS : now - 30 * 60_000;
  const asOf = new Date(asOfMs).toISOString();

  return {
    ratio: latestRatio,
    asOf,
    source: "accounting",
    todayReport: {
      id: `CVG-${jalaliReportSuffix(asOf)}`,
      url: `/reports/CVG-${jalaliReportSuffix(asOf)}.pdf`,
      sizeBytes: 184_320,
    },
    history: buildHistory(now, latestRatio),
    status: scenario === "stale" ? "stale" : "ok",
  };
}
