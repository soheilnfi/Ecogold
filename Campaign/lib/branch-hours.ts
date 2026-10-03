import dayjs from "dayjs";
import { TEHRAN_TZ } from "./jalali";

/**
 * ساعات کاری شعبهٔ ناصر خسرو — شنبه تا چهارشنبه ۱۰:۳۰ الی ۱۸:۰۰،
 * پنجشنبه ۱۰:۳۰ الی ۱۵:۰۰، جمعه‌ها تعطیل.
 * dayjs.day(): 0=یکشنبه ۱=دوشنبه ... ۵=جمعه ۶=شنبه (میلادی، مستقل از تقویم جلالی)
 */
export function isBranchOpenNow(now: number = Date.now()): boolean {
  const t = dayjs(now).tz(TEHRAN_TZ);
  const day = t.day();
  const hour = t.hour() + t.minute() / 60;

  if (day === 5) return false; // جمعه
  if (day === 4) return hour >= 10.5 && hour < 15; // پنجشنبه
  return hour >= 10.5 && hour < 18; // شنبه تا چهارشنبه
}
