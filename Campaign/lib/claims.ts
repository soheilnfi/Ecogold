/**
 * فهرست ادعاهای مجاز (Approved Claims List) — سند بخش ۵ و ۶.
 * هر عدد/جمله/مجوز قابل‌نمایش باید از این فهرست خوانده شود، نه هاردکد در کامپوننت.
 * چون ClaimKey از روی کلیدهای همین آبجکت مشتق می‌شود، ارجاع به کلید نامعتبر
 * در کامپایل TypeScript خطا می‌دهد — این‌طور «ادعای خارج از فهرست» مسدود می‌شود.
 */

export interface ApprovedClaim {
  label: string;
  source: string;
  owner: string;
  verification: string;
}

export const APPROVED_CLAIMS = {
  coverageRatio: {
    label: "نسبت پوشش دارایی",
    source: "سامانهٔ حسابداری",
    owner: "واحد مالی",
    verification: "مغایرت‌گیری روزانه",
  },
  priceQuote: {
    label: "قیمت خرید/فروش، اسپرد و کارمزد",
    source: "پلهٔ قیمت",
    owner: "محصول/تامین/فنی",
    verification: "قرارداد داده‌ای + پایش تأخیر",
  },
  serviceStatus: {
    label: "وضعیت لحظه‌ای سرویس‌ها",
    source: "سامانهٔ پایش سلامت",
    owner: "واحد فنی",
    verification: "health-check خودکار",
  },
  settlementPayout: {
    label: "تسویهٔ ریالی، برداشت و تست دریافت وجه",
    source: "API بانکی / عملیات",
    owner: "عملیات/مالی/فنی",
    verification: "ثبت وضعیت + rate-limit + SLA",
  },
  licenseRecord: {
    label: "مجوزها و مدارک",
    source: "اسناد حقوقی",
    owner: "واحد حقوقی",
    verification: "تأیید و تاریخ اعتبار",
  },
  incidentLog: {
    label: "رخدادها و آپدیت‌های سامانه",
    source: "فرایند مدیریت رخداد",
    owner: "واحد محصول",
    verification: "ثبت رسمی با تاریخ",
  },
  reviewRating: {
    label: "تجربهٔ کاربران و امتیازها",
    source: "سامانهٔ نظرات (نیازمند تراکنش واقعی)",
    owner: "واحد محصول",
    verification: "نشان «کاربر تأییدشده» + فیلتر محتوایی سرور",
  },
  physicalDeliveryTerms: {
    label: "شرایط دریافت فیزیکی (حداقل گرم، هزینه، زمان)",
    source: "تنظیمات عملیات",
    owner: "واحد عملیات",
    verification: "به‌روزرسانی دستی + بازبینی حقوقی",
  },
} as const satisfies Record<string, ApprovedClaim>;

export type ClaimKey = keyof typeof APPROVED_CLAIMS;

export function getClaim(key: ClaimKey): ApprovedClaim {
  const claim = APPROVED_CLAIMS[key];
  if (!claim) {
    throw new Error(`ادعای «${key}» در فهرست ادعاهای مجاز (lib/claims.ts) نیست.`);
  }
  return claim;
}
