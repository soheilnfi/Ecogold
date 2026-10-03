import dayjs from "dayjs";
import { TEHRAN_TZ } from "./jalali";

export interface MarketHours {
  openHour: number;
  closeHour: number;
}

/** آیا اکنون در بازهٔ ساعت معاملاتی بازار قرار دارد (به وقت تهران) */
export function isMarketOpenNow(hours: MarketHours, now: number = Date.now()): boolean {
  const t = dayjs(now).tz(TEHRAN_TZ);
  const hour = t.hour() + t.minute() / 60;
  return hour >= hours.openHour && hour < hours.closeHour;
}
