import { test, expect } from '@playwright/test';

test('smoke – otevření Seznam registrace', async ({ page }) => {
  await page.goto('https://registrace.seznam.cz');

  // 1️⃣ správná URL
  await expect(page).toHaveURL(/registrace\.seznam\.cz/);

  // 2️⃣ klíčový registrační headline (uživatelsky významný prvek)
  await expect(
    page.getByText('Create a new e-mail address', { exact: false })
  ).toBeVisible();

  // 3️⃣ kontrola, že existuje možnost pokračovat v registraci
  await expect(
    page.getByRole('button', { name: /continue|next|create/i })
  ).toBeVisible();
});
