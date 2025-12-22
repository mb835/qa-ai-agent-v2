export function SkeletonPanel() {
  return (
    <section className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">
        Kostra Playwright testu
      </h2>

      <pre className="bg-slate-900 text-slate-100 rounded p-4 text-sm mb-4 overflow-auto">
{`test('login – šťastná cesta', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#user', 'standard_user');
  await page.fill('#pass', 'secret');
  await page.click('#login');
});`}
      </pre>

      <div className="flex gap-2">
        <button className="border px-3 py-1 rounded">Kopírovat</button>
        <button className="border px-3 py-1 rounded">Exportovat</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded">
          Spustit testy
        </button>
      </div>
    </section>
  );
}
