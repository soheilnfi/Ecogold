import { describe, expect, it } from "vitest";
import { isBranchOpenNow } from "./branch-hours";

describe("isBranchOpenNow", () => {
  it("is open on a weekday during business hours", () => {
    // دوشنبه ۱۴۰۵/۰۵/۲۶ ساعت ۱۴:۰۰ به وقت تهران
    expect(isBranchOpenNow(new Date("2026-08-17T14:00:00+03:30").getTime())).toBe(true);
  });

  it("is closed on a weekday before opening", () => {
    expect(isBranchOpenNow(new Date("2026-08-17T09:00:00+03:30").getTime())).toBe(false);
  });

  it("is closed on a weekday after closing", () => {
    expect(isBranchOpenNow(new Date("2026-08-17T19:00:00+03:30").getTime())).toBe(false);
  });

  it("closes earlier (15:00) on Thursday", () => {
    // پنجشنبه ۱۴۰۵/۰۵/۲۹
    const open = new Date("2026-08-20T14:00:00+03:30").getTime();
    const closed = new Date("2026-08-20T16:00:00+03:30").getTime();
    expect(isBranchOpenNow(open)).toBe(true);
    expect(isBranchOpenNow(closed)).toBe(false);
  });

  it("is always closed on Friday", () => {
    // جمعه ۱۴۰۵/۰۵/۳۰
    expect(isBranchOpenNow(new Date("2026-08-21T12:00:00+03:30").getTime())).toBe(false);
  });
});
