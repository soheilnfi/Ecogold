import type { MockScenario } from "./scenario";

export interface IncidentItem {
  id: string;
  date: string;
  type: "outage" | "maintenance" | "update";
  title: string;
  durationMinutes: number;
  description: string;
  resolved: boolean;
}

export interface IncidentsResponse {
  asOf: string | null;
  status: "ok" | "stale" | "unavailable";
  items: IncidentItem[];
}

const DAY_MS = 24 * 60 * 60_000;

function daysAgo(now: number, days: number): string {
  return new Date(now - days * DAY_MS).toISOString();
}

export function buildIncidentsResponse(
  scenario: MockScenario,
  now: number,
  limit: number
): IncidentsResponse {
  if (scenario === "unavailable" || scenario === "down") {
    return { asOf: null, status: "unavailable", items: [] };
  }

  const all: IncidentItem[] = [
    {
      id: "INC-2026-014",
      date: daysAgo(now, 4),
      type: "maintenance",
      title: "ارتقای زیرساخت درگاه پرداخت",
      durationMinutes: 40,
      description: "بازهٔ کوتاه عدم دسترسی به واریز تومانی برای ارتقای امنیتی درگاه.",
      resolved: true,
    },
    {
      id: "INC-2026-013",
      date: daysAgo(now, 11),
      type: "outage",
      title: "کندی در برداشت تومانی",
      durationMinutes: 25,
      description: "به‌دلیل اختلال در بانک واسط، برخی درخواست‌های برداشت با تأخیر پردازش شدند.",
      resolved: true,
    },
    {
      id: "INC-2026-012",
      date: daysAgo(now, 19),
      type: "update",
      title: "انتشار نسخهٔ جدید اپلیکیشن",
      durationMinutes: 0,
      description: "بهبود سرعت بارگذاری قیمت لحظه‌ای و رفع چند اشکال جزئی رابط کاربری.",
      resolved: true,
    },
    {
      id: "INC-2026-011",
      date: daysAgo(now, 33),
      type: "outage",
      title: "قطعی کوتاه سرویس قیمت لحظه‌ای",
      durationMinutes: 8,
      description: "به‌دلیل خطای موقت در فیدهای قیمت، نمایش قیمت لحظه‌ای برای چند دقیقه متوقف شد.",
      resolved: true,
    },
    {
      id: "INC-2026-010",
      date: daysAgo(now, 52),
      type: "maintenance",
      title: "ارتقای پایگاه‌دادهٔ گزارش پوشش",
      durationMinutes: 15,
      description: "تعمیرات برنامه‌ریزی‌شده در ساعات کم‌ترافیک شب، بدون قطعی کاربری.",
      resolved: true,
    },
  ];

  return {
    asOf: new Date(now - 60_000).toISOString(),
    status: scenario === "stale" ? "stale" : "ok",
    items: all.slice(0, Math.max(0, limit)),
  };
}
