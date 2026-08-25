import { describe, expect, it } from "vitest";
import {
  formatCount,
  formatDecimal,
  formatDuration,
  formatFileSize,
  formatGrams,
  formatNumber,
  formatPercent,
  formatPieces,
  formatToman,
  toLatinDigits,
  toPersianDigits,
} from "./format";

describe("toPersianDigits", () => {
  it("converts latin digits to persian digits", () => {
    expect(toPersianDigits("2026")).toBe("۲۰۲۶");
  });

  it("leaves non-digit characters untouched", () => {
    expect(toPersianDigits("CVG-14050324")).toBe("CVG-۱۴۰۵۰۳۲۴");
  });
});

describe("toLatinDigits", () => {
  it("converts persian digits back to latin", () => {
    expect(toLatinDigits("۰۲۱-۸۲۸۰۰۸۶۰")).toBe("021-82800860");
  });
});

describe("formatNumber", () => {
  it("adds persian thousand separators", () => {
    expect(formatNumber(8432000)).toBe("۸٬۴۳۲٬۰۰۰");
  });

  it("rounds fractional values", () => {
    expect(formatNumber(1234.6)).toBe("۱٬۲۳۵");
  });
});

describe("formatToman", () => {
  it("appends تومان", () => {
    expect(formatToman(10000)).toBe("۱۰٬۰۰۰ تومان");
  });
});

describe("formatGrams", () => {
  it("formats integers without decimals", () => {
    expect(formatGrams(1)).toBe("۱ گرم");
  });

  it("formats fractional grams", () => {
    expect(formatGrams(0.5)).toBe("۰٫۵۰ گرم");
  });
});

describe("formatPieces", () => {
  it("formats integers without decimals", () => {
    expect(formatPieces(1)).toBe("۱ عدد");
  });

  it("formats fractional pieces", () => {
    expect(formatPieces(0.5)).toBe("۰٫۵۰ عدد");
  });
});

describe("formatPercent", () => {
  it("formats with one decimal by default", () => {
    expect(formatPercent(102.4)).toBe("۱۰۲٫۴٪");
  });

  it("formats below-threshold values", () => {
    expect(formatPercent(98.2)).toBe("۹۸٫۲٪");
  });
});

describe("formatFileSize", () => {
  it("formats bytes", () => {
    expect(formatFileSize(500)).toBe("۵۰۰ بایت");
  });

  it("formats kilobytes", () => {
    expect(formatFileSize(184320)).toBe("۱۸۰ کیلوبایت");
  });

  it("formats megabytes", () => {
    expect(formatFileSize(2 * 1024 * 1024)).toBe("۲٫۰ مگابایت");
  });
});

describe("formatCount", () => {
  it("formats plain counts with persian digits", () => {
    expect(formatCount(1284)).toBe("۱٬۲۸۴");
  });
});

describe("formatDecimal", () => {
  it("formats a decimal with persian digits and separator, no unit", () => {
    expect(formatDecimal(4.7)).toBe("۴٫۷");
  });
});

describe("formatDuration", () => {
  it("formats seconds under a minute", () => {
    expect(formatDuration(45)).toBe("۰:۴۵");
  });

  it("formats minutes and seconds with a padded second", () => {
    expect(formatDuration(65)).toBe("۱:۰۵");
  });

  it("formats exact minutes", () => {
    expect(formatDuration(120)).toBe("۲:۰۰");
  });
});
