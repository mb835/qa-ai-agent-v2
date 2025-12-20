import { test, expect } from "@playwright/test";

test("Generated happy path test", async ({ page }) => {
  await page.goto("https://www.alza.cz", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#alzacookies")).toBeVisible();
  await page.waitForSelector("#alzacookies a:has-text(\"Rozumím\")");
  await page.locator("#alzacookies a:has-text(\"Rozumím\")").scrollIntoViewIfNeeded();
  await page.click("#alzacookies a:has-text(\"Rozumím\")", { force: true });
  // JS fallback click (for stubborn overlays like cookies)
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) (el as HTMLElement).click();
  }, "#alzacookies a:has-text(\"Rozumím\")");
  await expect(page.locator("#alzacookies")).toBeHidden();
  await expect(page.locator("input[name='SearchText']")).toBeVisible();
  await page.waitForSelector("input[name='SearchText']");
  await page.fill("input[name='SearchText']", "notebook");
  await page.waitForSelector("button[type='submit']");
  await page.locator("button[type='submit']").scrollIntoViewIfNeeded();
  await page.click("button[type='submit']");
  // JS fallback click (for stubborn overlays like cookies)
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) (el as HTMLElement).click();
  }, "button[type='submit']");
});