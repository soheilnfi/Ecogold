import { test, expect } from "@playwright/test";

test.describe("سناریوی دادهٔ کهنه", () => {
  test("دادهٔ کهنه همیشه با برچسب «قدیمی» نمایش داده می‌شود، هرگز به‌عنوان تازه", async ({
    page,
  }) => {
    await page.goto("/?mock=stale");

    // مُهر تازگی باید برچسب «داده قدیمی» را نشان دهد
    await expect(page.getByText("داده قدیمی").first()).toBeVisible();

    // چیپ وضعیت هدر با دادهٔ کهنه هرگز «همهٔ سرویس‌ها فعال» نشان نمی‌دهد
    await expect(page.getByText("همهٔ سرویس‌ها فعال")).toHaveCount(0);

    // بنر تأخیر قیمت باید دیده شود
    await expect(page.getByText("قیمت‌ها با تأخیر نمایش داده می‌شوند")).toBeVisible();

    // عدد پوشش هنوز نمایش داده می‌شود (کهنه بودن یعنی برچسب، نه پنهان‌کردن عدد)
    await expect(page.locator("#coverage").getByText("۱۰۲٫۴٪")).toBeVisible();
  });
});
