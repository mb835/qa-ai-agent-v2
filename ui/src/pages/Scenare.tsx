import { useState } from 'react';

type ScenarioType = 'acceptance' | 'negative' | 'security';
type Action = 'scenario' | 'skeleton' | 'run';

export default function Scenarios() {
  const [type, setType] = useState<ScenarioType>('acceptance');
  const [action, setAction] = useState<Action>('scenario');

  const [scenario, setScenario] = useState<any>(null);
  const [code, setCode] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generateScenario() {
    setLoading(true);
    setScenario(null);
    setCode(null);
    setTestResult(null);

    const res = await fetch('http://localhost:3000/api/scenario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Udělej nákup notebooku',
        type
      })
    });

    const data = await res.json();
    setScenario(data);
    setLoading(false);
  }

  async function generatePlaywright() {
    if (!scenario) return;

    setLoading(true);
    setCode(null);
    setTestResult(null);

    const res = await fetch('http://localhost:3000/api/playwright', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario })
    });

    const data = await res.json();
    setCode(data.code);
    setLoading(false);
  }

  async function runTest() {
    setLoading(true);
    setTestResult(null);

    const res = await fetch('http://localhost:3000/api/run-test', {
      method: 'POST'
    });

    const data = await res.json();
    setTestResult(data);
    setLoading(false);
  }

  return (
    <div style={{ padding: 32, maxWidth: 1000 }}>
      <h1>QA AI Agent – Scénáře</h1>

      {/* SCREEN 1 – CO CHCI DĚLAT */}
      <h3>Co chceš udělat</h3>
      <label>
        <input
          type="radio"
          checked={action === 'scenario'}
          onChange={() => setAction('scenario')}
        />
        Vygenerovat scénář
      </label>
      <br />
      <label>
        <input
          type="radio"
          checked={action === 'skeleton'}
          onChange={() => setAction('skeleton')}
        />
        Vygenerovat Playwright skeleton
      </label>
      <br />
      <label>
        <input
          type="radio"
          checked={action === 'run'}
          onChange={() => setAction('run')}
        />
        Spustit test
      </label>

      {/* SCENARIO TYPE */}
      <h3 style={{ marginTop: 24 }}>Typ scénáře</h3>
      <select value={type} onChange={(e) => setType(e.target.value as ScenarioType)}>
        <option value="acceptance">Akceptační</option>
        <option value="negative">Negativní</option>
        <option value="security">Bezpečnostní</option>
      </select>

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: 24 }}>
        {action === 'scenario' && (
          <button onClick={generateScenario} disabled={loading}>
            Generovat scénář
          </button>
        )}

        {action === 'skeleton' && scenario && (
          <button onClick={generatePlaywright} disabled={loading}>
            Vygenerovat Playwright skeleton
          </button>
        )}

        {action === 'run' && (
          <button onClick={runTest} disabled={loading}>
            Spustit test (debug)
          </button>
        )}
      </div>

      <p style={{ marginTop: 16, opacity: 0.7 }}>
        ℹ️ Test se spouští v debug režimu. Prohlížeč zůstane otevřený
        a test se zastaví na <code>page.pause()</code>.
      </p>

      {loading && <p>⏳ Pracuji…</p>}

      {scenario && (
        <>
          <h2>Scénář</h2>
          <pre>{JSON.stringify(scenario, null, 2)}</pre>
        </>
      )}

      {code && (
        <>
          <h2>Playwright skeleton</h2>
          <pre>{code}</pre>
        </>
      )}

      {testResult && (
        <>
          <h2>Výsledek testu</h2>
          <p>
            Status:{' '}
            <strong style={{ color: testResult.status === 'passed' ? 'green' : 'red' }}>
              {testResult.status}
            </strong>
          </p>
          <pre>{testResult.output}</pre>
        </>
      )}
    </div>
  );
}
