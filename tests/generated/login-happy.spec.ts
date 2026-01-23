import { test, expect } from "@playwright/test";

test("Generated happy path test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login", { waitUntil: "networkidle" });
  await page.waitForSelector("#username");
  await page.fill("#username", "tomsmith");
  await page.waitForSelector("#password");
  await page.fill("#password", "SuperSecretPassword!");
  await page.waitForSelector("button[type='submit']");
  await page.click("button[type='submit']");
  await expect(page.locator(".flash.success")).toBeVisible();
});