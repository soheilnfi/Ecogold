import { test, expect } from "@playwright/test";

test.describe("سناریوی پوشش زیر آستانه با فلگ threshold", () => {
  test("coverage=98.2 → پیام مصوب به‌جای عدد رندر می‌شود", async ({ page }) => {
    await page.goto("/?ratio=98.2");

    // پیام مصوب سیاست threshold باید حداقل یک‌بار دیده شود (هیرو یا سکشن گزارش)
    await expect(
      page.getByText("نسبت پوشش زیر آستانهٔ افشای عمومی است").first()
    ).toBeVisible();

    // عدد خام ۹۸٫۲٪ هرگز نباید در صفحه رندر شود
    await expect(page.getByText("۹۸٫۲٪")).toHaveCount(0);
  });
});
