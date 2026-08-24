import type { MockScenario } from "./scenario";

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: true;
  voiceDurationSeconds: number;
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
      voiceDurationSeconds: 34,
    },
    {
      id: "rev-2",
      name: "مریم س.",
      rating: 4,
      date: new Date(now - 9 * DAY_MS).toISOString(),
      text: "برداشتم دقیقاً طبق همون زمانی بود که گفته بودن، فقط یه‌بار کمی بیشتر از ۲ ساعت طول کشید.",
      verified: true,
      voiceDurationSeconds: 21,
    },
    {
      id: "rev-3",
      name: "حسین ک.",
      rating: 5,
      date: new Date(now - 14 * DAY_MS).toISOString(),
      text: "تست دریافت وجه ۱۰ هزار تومانی خیالم رو راحت کرد قبل از اینکه مبلغ بزرگ‌تری واریز کنم.",
      verified: true,
      voiceDurationSeconds: 47,
    },
    {
      id: "rev-4",
      name: "زهرا م.",
      rating: 5,
      date: new Date(now - 21 * DAY_MS).toISOString(),
      text: "اسپرد قیمت رو شفاف کنار خود قیمت نشون می‌ده، برخلاف چندتا اپ دیگه که باید دنبالش می‌گشتی.",
      verified: true,
      voiceDurationSeconds: 18,
    },
    {
      id: "rev-5",
      name: "امیر ت.",
      rating: 4,
      date: new Date(now - 28 * DAY_MS).toISOString(),
      text: "دریافت فیزیکی طلا رو امتحان کردم، فقط پیگیری نوبت مراجعه حضوری یه‌کم زمان برد.",
      verified: true,
      voiceDurationSeconds: 39,
    },
    {
      id: "rev-6",
      name: "نگار پ.",
      rating: 5,
      date: new Date(now - 35 * DAY_MS).toISOString(),
      text: "وقتی یه اختلال کوتاه تو سرویس واریز پیش اومد، همون‌جا تو صفحهٔ رخدادها اعلامش کرده بودن.",
      verified: true,
      voiceDurationSeconds: 26,
    },
    {
      id: "rev-7",
      name: "رضا ن.",
      rating: 5,
      date: new Date(now - 41 * DAY_MS).toISOString(),
      text: "مجوزها و شماره‌هاشون رو یکی‌یکی با سامانه‌های مرجع چک کردم، همه واقعی بودن.",
      verified: true,
      voiceDurationSeconds: 29,
    },
    {
      id: "rev-8",
      name: "فاطمه ح.",
      rating: 4,
      date: new Date(now - 48 * DAY_MS).toISOString(),
      text: "نمودار پوشش رو هر چند روز یه‌بار می‌بینم، نوسانش با چیزی که تو اخبار می‌گن هم‌خونه.",
      verified: true,
      voiceDurationSeconds: 15,
    },
    {
      id: "rev-9",
      name: "محمد ا.",
      rating: 5,
      date: new Date(now - 55 * DAY_MS).toISOString(),
      text: "کارمزد و اسپرد از همون اول شفاف بود، بعداً هیچ هزینهٔ پنهانی سرم در نیومد.",
      verified: true,
      voiceDurationSeconds: 33,
    },
    {
      id: "rev-10",
      name: "سارا ب.",
      rating: 5,
      date: new Date(now - 62 * DAY_MS).toISOString(),
      text: "پشتیبانی وقتی سؤال داشتم زود جواب داد، رفرنس تیکت هم برام مونده.",
      verified: true,
      voiceDurationSeconds: 22,
    },
    {
      id: "rev-11",
      name: "کیانوش د.",
      rating: 4,
      date: new Date(now - 69 * DAY_MS).toISOString(),
      text: "دریافت فیزیکی رو برای هدیه گرفتم، فقط کاش نوبت‌دهی حضوری یه‌کم سریع‌تر بود.",
      verified: true,
      voiceDurationSeconds: 41,
    },
    {
      id: "rev-12",
      name: "الهام ط.",
      rating: 5,
      date: new Date(now - 76 * DAY_MS).toISOString(),
      text: "بیمه‌نامهٔ انبار رو نشون دادن، این خیالم رو از بابت پشتوانهٔ فیزیکی راحت کرد.",
      verified: true,
      voiceDurationSeconds: 19,
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
