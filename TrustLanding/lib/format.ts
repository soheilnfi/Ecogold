const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** هر رشتهٔ حاوی رقم لاتین را به ارقام فارسی تبدیل می‌کند */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

const numberFormatter = new Intl.NumberFormat("en-US");

/** «۰٫۵۰» — رقم اعشاری لاتین (.) را به جداکنندهٔ فارسی (٫) تبدیل می‌کند */
function toPersianDecimal(fixed: string): string {
  const [intPart, decPart] = fixed.split(".");
  const body = decPart ? `${intPart}٫${decPart}` : intPart;
  return toPersianDigits(body);
}

/** جداکنندهٔ هزارگان + ارقام فارسی، مثل «۸٬۴۳۲٬۰۰۰» */
export function formatNumber(value: number): string {
  return toPersianDigits(numberFormatter.format(Math.round(value))).replace(/,/g, "٬");
}

export function formatToman(value: number): string {
  return `${formatNumber(value)} تومان`;
}

export function formatGrams(value: number): string {
  const text = Number.isInteger(value) ? formatNumber(value) : toPersianDecimal(value.toFixed(2));
  return `${text} گرم`;
}

/** درصد با اعشار فارسی (٫) و علامت ٪، مثل «۱۰۲٫۴٪» */
export function formatPercent(value: number, decimals = 1): string {
  return `${toPersianDecimal(value.toFixed(decimals))}٪`;
}

/** عدد اعشاری فارسی بدون واحد، مثل «۴٫۷» — برای امتیاز/میانگین */
export function formatDecimal(value: number, decimals = 1): string {
  return toPersianDecimal(value.toFixed(decimals));
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${toPersianDigits(bytes)} بایت`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${toPersianDigits(Math.round(kb))} کیلوبایت`;
  const mb = kb / 1024;
  return `${toPersianDecimal(mb.toFixed(1))} مگابایت`;
}

export function formatCount(value: number): string {
  return toPersianDigits(numberFormatter.format(Math.round(value))).replace(/,/g, "٬");
}
