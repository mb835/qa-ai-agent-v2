import { useState } from "react";

type Step = {
  action: string;
  url?: string;
  selector?: string;
  value?: string;
};

type Scenario = {
  type: string;
  name: string;
  steps: Step[];
};

export default function Scenare() {
  const [intent, setIntent] = useState("");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setError(null);

    const res = await fetch("http://localhost:3000/scenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Chyba generování");
      return;
    }

    setScenarios(data.scenarios);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>QA AI Agent – Scénáře</h1>

      <textarea
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
        placeholder="Zadej testovací záměr"
        style={{ width: "100%", height: 100 }}
      />

      <button onClick={generate} style={{ marginTop: 12 }}>
        Generovat scénáře
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {scenarios.map((s, i) => (
        <div key={i} style={{ marginTop: 24 }}>
          <h2>[{s.type}] {s.name}</h2>
          <ol>
            {s.steps.map((step, j) => (
              <li key={j}>
                <code>{JSON.stringify(step)}</code>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
