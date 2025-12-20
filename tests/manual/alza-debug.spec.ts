import { test, expect } from '@playwright/test';

test('Alza – HARD cookie kill (100% funkční)', async ({ page, context }) => {

  // 1️⃣ PŘED NAČTENÍM STRÁNKY – NASTAV COOKIE CONSENT
  await context.addCookies([
    {
      name: 'cookieConsent',
      value: 'accepted',
      domain: '.alza.cz',
      path: '/',
    },
    {
      name: 'consent',
      value: 'true',
      domain: '.alza.cz',
      path: '/',
    },
  ]);

  // 2️⃣ PŘED NAČTENÍM STRÁNKY – PŘEPÍŠ localStorage
  await page.addInitScript(() => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('consent', 'true');
    localStorage.setItem('cookiesAccepted', 'true');
  });

  // 3️⃣ ZABLOKUJ CONSENT SCRIPTY
  await page.route('**/*consent*', route => route.abort());
  await page.route('**/*cookie*', route => route.abort());
  await page.route('**/*gdpr*', route => route.abort());

  // 4️⃣ OTEVŘI ALZA
  await page.goto('https://www.alza.cz', {
    waitUntil: 'domcontentloaded',
  });

  // 5️⃣ TVRDÁ KONTROLA – COOKIE BANNER NESMÍ EXISTOVAT
  await expect(
    page.locator('text=Zkuste naše cookies')
  ).toHaveCount(0);

  // 6️⃣ REÁLNÁ AKCE – VYHLEDÁNÍ
  await page.fill('input[name="SearchText"]', 'notebook');
  await page.keyboard.press('Enter');

  // 7️⃣ PAUZA – VIDÍŠ, ŽE SE NIC NEZAVÍRÁ
  await page.pause();
});
