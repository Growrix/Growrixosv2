import { expect, test } from "@playwright/test";

test.describe("homepage smoke", () => {
  test("loads with one main#main and a skip link to it", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);

    await expect(page.locator("main#main")).toHaveCount(1);
    await expect(page.locator('a[href="#main"]')).toHaveCount(1);
  });
});
