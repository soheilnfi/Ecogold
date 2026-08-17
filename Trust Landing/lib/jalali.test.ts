import { describe, expect, it } from "vitest";
import {
  formatClock,
  formatFriendlyDateTime,
  formatJalaliDate,
  formatRelativeFromNow,
  jalaliReportSuffix,
} from "./jalali";

// 2026-06-14T13:30:00+03:30 (تهران) — نمونهٔ سند
const SAMPLE = "2026-06-14T13:30:00+03:30";

describe("formatClock", () => {
  it("renders HH:mm with persian digits", () => {
    expect(formatClock(SAMPLE)).toBe("۱۳:۳۰");
  });
});

describe("formatJalaliDate", () => {
  it("renders a jalali date with persian digits and month name", () => {
    const result = formatJalaliDate(SAMPLE);
    expect(result).toMatch(/^۲۴ /);
    expect(result).toContain("۱۴۰۵");
  });
});

describe("formatFriendlyDateTime", () => {
  it("prefixes with امروز when the same tehran day", () => {
    const now = "2026-06-14T20:00:00+03:30";
    expect(formatFriendlyDateTime(SAMPLE, now)).toBe("امروز ۱۳:۳۰");
  });

  it("prefixes with دیروز for the previous day", () => {
    const now = "2026-06-15T09:00:00+03:30";
    expect(formatFriendlyDateTime(SAMPLE, now)).toBe("دیروز ۱۳:۳۰");
  });

  it("falls back to a full jalali date for older timestamps", () => {
    const now = "2026-06-20T09:00:00+03:30";
    const result = formatFriendlyDateTime(SAMPLE, now);
    expect(result).toContain("۱۴۰۵");
    expect(result).toContain("۱۳:۳۰");
  });
});

describe("formatRelativeFromNow", () => {
  it("reports minutes for recent timestamps", () => {
    const asOf = new Date("2026-06-14T13:58:00+03:30");
    const now = new Date("2026-06-14T14:00:00+03:30");
    expect(formatRelativeFromNow(asOf, now)).toBe("۲ دقیقه پیش");
  });

  it("reports همین الان for sub-minute gaps", () => {
    const asOf = new Date("2026-06-14T13:59:50+03:30");
    const now = new Date("2026-06-14T14:00:00+03:30");
    expect(formatRelativeFromNow(asOf, now)).toBe("همین الان");
  });
});

describe("jalaliReportSuffix", () => {
  it("formats as YYYYMMDD in the jalali calendar", () => {
    expect(jalaliReportSuffix(SAMPLE)).toBe("14050324");
  });
});
