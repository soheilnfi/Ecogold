import { test, expect } from "@playwright/test";

test.describe("سناریوی قطع منبع", () => {
  test("هیچ عددی بدون داده سبز/معتبر نمایش داده نمی‌شود", async ({ page }) => {
    await page.goto("/?mock=unavailable");

    // ترازوی هیرو: به‌جای عدد، پیام «در دسترس نیست»
    await expect(page.getByText("نسبت پوشش در دسترس نیست")).toBeVisible();

    // چیپ وضعیت هدر هرگز سبز نمی‌شود وقتی داده نیست
    await expect(page.getByText("همهٔ سرویس‌ها فعال")).toHaveCount(0);
    await expect(page.getByText("وضعیت در دسترس نیست").first()).toBeVisible();

    // سکشن وضعیت سرویس‌ها: پیام خنثی، نه کارت‌های سبز
    await expect(page.getByText("پایش موقتاً در دسترس نیست")).toBeVisible();

    // سکشن گزارش پوشش: بدون عدد، دکمهٔ دانلود غیرفعال (نه لینک شکسته)
    const coverageSection = page.locator("#coverage");
    await expect(coverageSection.getByText("نسبت پوشش در دسترس نیست").first()).toBeVisible();
    const downloadBtn = coverageSection.getByRole("link", { name: "دانلود گزارش مهر ماه (PDF)" });
    await expect(downloadBtn).toHaveClass(/pointer-events-none/);

    // قیمت: به‌جای عدد، «—»
    await page.locator('a[href="#price"]').first();
    const priceCells = page.locator("#price").getByText("—");
    await expect(priceCells.first()).toBeVisible();
  });
});
