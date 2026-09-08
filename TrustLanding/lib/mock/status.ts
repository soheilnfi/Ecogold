import { seededRandom } from "./seed";
import type { MockScenario } from "./scenario";

export type ServiceState = "operational" | "degraded" | "down";

export interface ServiceDay {
  date: string;
  uptime: number;
  incidentMinutes: number;
}

export interface ServiceEntry {
  key: string;
  label: string;
  sla: string | null;
  state: ServiceState;
  uptime30d: number;
  days: ServiceDay[];
}

export interface StatusResponse {
  asOf: string | null;
  overall: "operational" | "degraded" | "outage" | "unknown";
  services: ServiceEntry[];
  status: "ok" | "stale" | "unavailable";
}

const DAY_MS = 24 * 60 * 60_000;

const SERVICE_DEFS = [
  { key: "trade", label: "خرید و فروش", sla: "معاملهٔ طلا باید همیشه (۲۴/۷) در دسترس باشد" },
  { key: "depositToman", label: "واریز ریالی", sla: "SLA: حداکثر ۲۴ ساعت" },
  { key: "withdrawToman", label: "برداشت ریالی", sla: "SLA: حداکثر ۷۲ ساعت" },
  { key: "physicalDelivery", label: "دریافت فیزیکی", sla: null },
  { key: "livePrice", label: "قیمت لحظه‌ای", sla: null },
] as const;

// دو سرویس عمداً وضعیت غیرکامل دارند تا حالت‌های واقعی صفحهٔ وضعیت دیده شود
const DEGRADED_KEYS = new Set(["support"]);
const DOWN_KEYS = new Set<string>([]);

function buildDays(now: number, key: string, forcedState: ServiceState): ServiceDay[] {
  const rand = seededRandom(`status-${key}-v1`);
  const days: ServiceDay[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now - i * DAY_MS).toISOString().slice(0, 10);
    const isToday = i === 0;
    let incidentMinutes = 0;

    if (isToday && forcedState === "down") {
      incidentMinutes = 90;
    } else if (isToday && forcedState === "degraded") {
      incidentMinutes = 12;
    } else if (rand() > 0.94) {
      incidentMinutes = Math.round(rand() * 40);
    }

    const uptime = Math.max(0, Math.round((1 - incidentMinutes / 1440) * 1000) / 10);
    days.push({ date, uptime, incidentMinutes });
  }

  return days;
}

function average(values: number[]): number {
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100;
}

export function buildStatusResponse(scenario: MockScenario, now: number): StatusResponse {
  if (scenario === "unavailable" || scenario === "down") {
    return { asOf: null, overall: "unknown", services: [], status: "unavailable" };
  }

  const asOfMs = scenario === "stale" ? now - 45 * 60_000 : now - 90_000;
  const asOf = new Date(asOfMs).toISOString();

  const services: ServiceEntry[] = SERVICE_DEFS.map(({ key, label, sla }) => {
    const forcedState: ServiceState = DOWN_KEYS.has(key)
      ? "down"
      : DEGRADED_KEYS.has(key)
        ? "degraded"
        : "operational";
    const days = buildDays(now, key, forcedState);
    return {
      key,
      label,
      sla,
      state: forcedState,
      uptime30d: average(days.map((d) => d.uptime)),
      days,
    };
  });

  const overall = services.some((s) => s.state === "down")
    ? "outage"
    : services.some((s) => s.state === "degraded")
      ? "degraded"
      : "operational";

  return {
    asOf,
    overall,
    services,
    status: scenario === "stale" ? "stale" : "ok",
  };
}
