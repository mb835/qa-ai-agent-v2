```typescript
import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    // Replace with your login page URL
    await page.goto('https://example.com/login');
  });

  test('successful login with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'validUser');
    await page.fill('input[name="password"]', 'validPassword');
    await page.click('button[type="submit"]');

    // Adjust selector to a post-login element visible after successful login
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('shows error message on invalid login', async ({ page }) => {
    await page.fill('input[name="username"]', 'invalidUser');
    await page.fill('input[name="password"]', 'wrongPassword');
    await page.click('button[type="submit"]');

    // Adjust selector to your error message element
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toHaveText(/invalid credentials/i);
  });

  test('login form validation - empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toHaveText(/required/i);
  });
});
```