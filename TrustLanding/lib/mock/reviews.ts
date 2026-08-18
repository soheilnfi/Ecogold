import type { MockScenario } from "./scenario";

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: true;
}

export interface ReviewsResponse {
  asOf: string | null;
  status: "ok" | "stale" | "unavailable";
  average: number;
  total: number;
  items: ReviewItem[];
}

const DAY_MS = 24 * 60 * 60_000;

export function buildReviewsResponse(
  scenario: MockScenario,
  now: number,
  limit: number
): ReviewsResponse {
  if (scenario === "unavailable" || scenario === "down") {
    return { asOf: null, status: "unavailable", average: 0, total: 0, items: [] };
  }

  const all: ReviewItem[] = [
    {
      id: "rev-1",
      name: "علی ر.",
      rating: 5,
      date: new Date(now - 3 * DAY_MS).toISOString(),
      text: "گزارش پوشش دارایی رو هر روز چک می‌کنم، همیشه به‌روزه و دانلود واقعی داره نه یه فایل ثابت.",
      verified: true,
    },
    {
      id: "rev-2",
      name: "مریم س.",
      rating: 4,
      date: new Date(now - 9 * DAY_MS).toISOString(),
      text: "برداشتم دقیقاً طبق همون زمانی بود که گفته بودن، فقط یه‌بار کمی بیشتر از ۲ ساعت طول کشید.",
      verified: true,
    },
    {
      id: "rev-3",
      name: "حسین ک.",
      rating: 5,
      date: new Date(now - 14 * DAY_MS).toISOString(),
      text: "تست دریافت وجه ۱۰ هزار تومانی خیالم رو راحت کرد قبل از اینکه مبلغ بزرگ‌تری واریز کنم.",
      verified: true,
    },
    {
      id: "rev-4",
      name: "زهرا م.",
      rating: 5,
      date: new Date(now - 21 * DAY_MS).toISOString(),
      text: "اسپرد قیمت رو شفاف کنار خود قیمت نشون می‌ده، برخلاف چندتا اپ دیگه که باید دنبالش می‌گشتی.",
      verified: true,
    },
    {
      id: "rev-5",
      name: "امیر ت.",
      rating: 4,
      date: new Date(now - 28 * DAY_MS).toISOString(),
      text: "دریافت فیزیکی طلا رو امتحان کردم، فقط پیگیری نوبت مراجعه حضوری یه‌کم زمان برد.",
      verified: true,
    },
    {
      id: "rev-6",
      name: "نگار پ.",
      rating: 5,
      date: new Date(now - 35 * DAY_MS).toISOString(),
      text: "وقتی یه اختلال کوتاه تو سرویس واریز پیش اومد، همون‌جا تو صفحهٔ رخدادها اعلامش کرده بودن.",
      verified: true,
    },
  ];

  return {
    asOf: new Date(now - 3 * 60 * 60_000).toISOString(),
    status: scenario === "stale" ? "stale" : "ok",
    average: 4.7,
    total: 1284,
    items: all.slice(0, Math.max(0, limit)),
  };
}
