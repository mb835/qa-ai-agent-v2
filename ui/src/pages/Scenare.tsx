
import { useState } from "react";

export default function Scenare() {
  const [text, setText] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/scenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text })
    });
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={run}>Spustit AI</button>

      {loading && <p>⏳ AI analyzuje…</p>}

      {data && (
        <>
          <h3>Happy Path</h3>
          <ul>{data.happyPath.map((s:any,i:number)=><li key={i}>{s}</li>)}</ul>

          <h3>Edge Cases</h3>
          <ul>{data.edgeCases.map((s:any,i:number)=><li key={i}>{s}</li>)}</ul>

          <h3>Negativní scénáře</h3>
          <ul>{data.negativeScenarios.map((s:any,i:number)=><li key={i}>{s}</li>)}</ul>
        </>
      )}
    </div>
  );
}
