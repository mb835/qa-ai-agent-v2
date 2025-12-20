export default function RunTestButton() {
  const runTest = async () => {
    await fetch('http://localhost:3000/api/tests/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testFile: 'tests/manual/saucedemo-e2e.spec.ts',
      }),
    });
  };

  return (
    <button onClick={runTest}>
      ▶ Spustit Playwright test
    </button>
  );
}
