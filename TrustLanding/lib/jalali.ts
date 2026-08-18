import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import jalaliday from "jalaliday";
import "dayjs/locale/fa";
import { toPersianDigits } from "./format";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(jalaliday);
dayjs.locale("fa");

export const TEHRAN_TZ = "Asia/Tehran";

function toTehran(input: string | number | Date): Dayjs {
  return dayjs(input).tz(TEHRAN_TZ).calendar("jalali");
}

/** «۲۴ خرداد ۱۴۰۵» */
export function formatJalaliDate(input: string | number | Date): string {
  return toPersianDigits(toTehran(input).format("D MMMM YYYY"));
}

/** «۱۳:۳۰» به وقت تهران، با ارقام فارسی */
export function formatClock(input: string | number | Date): string {
  return toPersianDigits(toTehran(input).format("HH:mm"));
}

/** «امروز ۱۳:۳۰» یا «دیروز ۱۳:۳۰» یا تاریخ کامل اگر قدیمی‌تر باشد */
export function formatFriendlyDateTime(
  input: string | number | Date,
  now: string | number | Date = Date.now()
): string {
  const target = toTehran(input);
  const today = toTehran(now);
  const diffDays = today.startOf("day").diff(target.startOf("day"), "day");

  if (diffDays === 0) return `امروز ${formatClock(input)}`;
  if (diffDays === 1) return `دیروز ${formatClock(input)}`;
  return `${formatJalaliDate(input)} ساعت ${formatClock(input)}`;
}

/** «۲ دقیقه پیش» / «۳ ساعت پیش» / «۵ روز پیش» */
export function formatRelativeFromNow(
  input: string | number | Date,
  now: string | number | Date = Date.now()
): string {
  const diffMs = dayjs(now).diff(dayjs(input));
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "همین الان";
  if (diffMs < hour) return `${toPersianDigits(Math.floor(diffMs / minute))} دقیقه پیش`;
  if (diffMs < day) return `${toPersianDigits(Math.floor(diffMs / hour))} ساعت پیش`;
  return `${toPersianDigits(Math.floor(diffMs / day))} روز پیش`;
}

/** برای شناسهٔ گزارش: «CVG-14050324» بر مبنای تاریخ جلالی */
export function jalaliReportSuffix(input: string | number | Date): string {
  return toTehran(input).format("YYYYMMDD");
}
