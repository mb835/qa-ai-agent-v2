```typescript
import { test, expect } from '@playwright/test';

test.describe('Alza.cz - První nákup - Happy Path', () => {
  const testEmail = `testuser+${Date.now()}@example.com`;
  const testPassword = 'Test1234!';
  const productSearch = 'Apple AirPods Pro'; // příklad produktu

  test('Registrace nového uživatele s platnou emailovou adresou, heslem a osobními údaji', async ({ page }) => {
    await page.goto('https://www.alza.cz/registrace.htm');

    await page.fill('input#Email', testEmail);
    await page.fill('input#Password', testPassword);
    await page.fill('input#PasswordConfirm', testPassword);
    // vyplnění osobních údajů
    await page.fill('input#FirstName', 'Jan');
    await page.fill('input#LastName', 'Novak');
    await page.check('input#TermsAccepted');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Registrace byla úspěšná')).toBeVisible();
  });

  test('Přihlášení nového uživatele', async ({ page }) => {
    await page.goto('https://www.alza.cz/prihlaseni.htm');

    await page.fill('input#Email', testEmail);
    await page.fill('input#Password', testPassword);
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Účet')).toBeVisible();
  });

  test('Vyhledání vybraného produktu pomocí vyhledávacího pole', async ({ page }) => {
    await page.goto('https://www.alza.cz/');
    await page.fill('input[name="q"]', productSearch);
    await page.press('input[name="q"]', 'Enter');

    await expect(page).toHaveURL(/q=/);
    await expect(page.locator('div.product')).toBeVisible();
  });

  test('Výběr produktu z výsledků vyhledávání', async ({ page }) => {
    await page.goto(`https://www.alza.cz/`);
    await page.fill('input[name="q"]', productSearch);
    await page.press('input[name="q"]', 'Enter');
    await page.click('div.product a.product-link >> nth=0');

    await expect(page.locator('h1.title')).toContainText(/AirPods Pro|Apple/);
  });

  test('Přidání produktu do košíku', async ({ page }) => {
    await page.goto(`https://www.alza.cz/`);
    await page.fill('input[name="q"]', productSearch);
    await page.press('input[name="q"]', 'Enter');
    await page.click('div.product a.product-link >> nth=0');

    // čekání na dostupnost tlačítka Přidat do košíku
    await page.click('button.add-to-cart, button#addToCart');

    await expect(page.locator('div.cart-popup')).toBeVisible();
    await expect(page.locator('div.cart-popup')).toContainText(productSearch.split(' ')[0]);
  });

  test('Zobrazení košíku a ověření správného produktu a ceny', async ({ page }) => {
    await page.goto('https://www.alza.cz/kosik.htm');

    const productTitle = await page.locator('div.cart-item .product-title').innerText();
    expect(productTitle).toContain('Apple');

    const productPrice = await page.locator('div.cart-item .price').innerText();
    expect(productPrice).toMatch(/\d+ Kč/);
  });

  test('Výběr způsobu doručení (doručení domů)', async ({ page }) => {
    await page.goto('https://www.alza.cz/kosik/doprava.htm');

    await page.click('input[name="DeliveryType"][value*="home"]'); // zvolení doručení domů
    await expect(page.locator('input[name="DeliveryType"][value*="home"]')).toBeChecked();
  });

  test('Výběr způsobu platby (platba kartou online)', async ({ page }) => {
    await page.goto('https://www.alza.cz/kosik/platba.htm');

    await page.click('input[name="PaymentType"][value*="card-online"]');
    await expect(page.locator('input[name="PaymentType"][value*="card-online"]')).toBeChecked();
  });

  test('Zadání dodacích a fakturačních údajů', async ({ page }) => {
    await page.goto('https://www.alza.cz/kosik/adresa.htm');

    await page.fill('input#DeliveryFirstName', 'Jan');
    await page.fill('input#DeliveryLastName', 'Novak');
    await page.fill('input#DeliveryStreet', 'Testovací 123');
    await page.fill('input#DeliveryCity', 'Praha');
    await page.fill('input#DeliveryZip', '10000');
    await page.fill('input#DeliveryPhone', '123456789');

    await page.fill('input#InvoiceFirstName', 'Jan');
    await page.fill('input#InvoiceLastName', 'Novak');
    await page.fill('input#InvoiceStreet', 'Testovací 123');
    await page.fill('input#InvoiceCity', 'Praha');
    await page.fill('input#InvoiceZip', '10000');
    await page.fill('input#InvoicePhone', '123456789');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Souhrn objednávky')).toBeVisible();
  });

  test('Ověření souhrnu objednávky', async ({ page }) => {
    await page.goto('https://www.alza.cz/kosik/souhrn.htm');

    await expect(page.locator('div.order-summary')).toBeVisible();
    await expect(page.locator('div.order-summary')).toContainText(productSearch.split(' ')[0]);
  });

  test('Potvrzení a odeslání objednávky', async ({ page }) => {
    await page.goto('https://www.alza.cz/kosik/souhrn.htm');

    await page.click('button[type="submit"]'); // potvrzení objednávky

    await expect(page.locator('text=Děkujeme za Vaši objednávku')).toBeVisible();
  });

  test('Obdržení potvrzovacího emailu s detaily objednávky', async ({ request }) => {
    // Tento krok obvykle vyžaduje přístup k e-mailové službě.
    // Ukázka je pouze náznak:
    // await expectEmailReceived(testEmail, 'Potvrzení objednávky');
  });

  test('Kontrola stavu objednávky v uživatelském účtu', async ({ page }) => {
    await page.goto('https://www.alza.cz/prihlaseni.htm');

    await page.fill('input#Email', testEmail);
    await page.fill('input#Password', testPassword);
    await page.click('button[type="submit"]');

    await page.goto('https://www.alza.cz/uzivatel/objednavky.htm');
    await expect(page.locator('table.orders')).toContainText('Nová'); // předpoklad statusu
  });

  test('Přijetí a převzetí zásilky', async ({ page }) => {
    // Tento krok nelze automatizovat na frontendu bez integrace s dopravcem.
    // Může být součástí e2e testování mimo scope webu.
  });
});
```