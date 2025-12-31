import { useState } from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaListOl,
  FaExclamationTriangle,
  FaLightbulb,
} from "react-icons/fa";

import { generateScenario } from "../api/scenariosApi";
import AiGeneratedBadge from "../components/AiGeneratedBadge";
import LoadingOverlay from "../components/LoadingOverlay";

export default function TestScenariosPage() {
  const [intent, setIntent] = useState("");
  const [scenario, setScenario] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [loadingAdditionalId, setLoadingAdditionalId] = useState<string | null>(null);
  const [additionalDetails, setAdditionalDetails] = useState<Record<string, any>>({});

  async function handleGenerate() {
    if (!intent.trim()) return;

    try {
      setLoading(true);
      const data = await generateScenario(intent);
      setScenario(data.testCase);
      setAdditionalDetails({});
    } catch {
      alert("Chyba při generování QA analýzy");
    } finally {
      setLoading(false);
    }
  }

  async function loadAdditionalDetail(tc: any) {
    if (additionalDetails[tc.id] || loadingAdditionalId) return;

    try {
      setLoadingAdditionalId(tc.id);

      const res = await fetch(
        "http://localhost:3000/api/scenarios/additional/steps",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ additionalTestCase: tc }),
        }
      );

      const data = await res.json();

      setAdditionalDetails((prev) => ({
        ...prev,
        [tc.id]: data,
      }));
    } finally {
      setLoadingAdditionalId(null);
    }
  }

  return (
    <div className="px-8 py-6 relative">
      {loading && <LoadingOverlay text="Probíhá QA analýza…" />}

      <div className="max-w-7xl mx-auto">
        {/* INPUT */}
        <div className="mb-8 space-y-4">
          <label className="block text-sm text-slate-300">Testovací záměr</label>

          <textarea
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 p-3"
          />

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
            >
              Spustit QA analýzu
            </button>
          </div>
        </div>

        {scenario && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 relative">
              <div className="absolute top-4 right-4">
                <AiGeneratedBadge />
              </div>

              <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <FaClipboardList />
                {scenario.title}
              </h2>

              <p className="text-sm text-slate-400 mb-6">
                {scenario.description}
              </p>

              {/* Preconditions */}
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-400" />
                Předpoklady
              </h3>

              <ul className="list-disc list-inside text-sm text-slate-300 mb-6">
                {scenario.preconditions.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              {/* Steps */}
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <FaListOl />
                Kroky testu (Acceptance / Happy Path)
              </h3>

              {/* ⬇️ TADY JE FIX – UI řeší číslování */}
              <ol className="list-decimal list-inside text-sm text-slate-300 mb-6 space-y-1">
                {scenario.steps.map((s: string, i: number) => (
                  <li key={i}>{s.replace(/^\d+[\.\)]\s*/, "")}</li>
                ))}
              </ol>

              <p className="text-sm text-slate-300 mb-6">
                <strong>Očekávaný výsledek:</strong>{" "}
                {scenario.expectedResult}
              </p>

              {/* ADDITIONAL */}
              <h3 className="font-semibold mt-8 mb-3">
                Další testovací případy
              </h3>

              <ul className="space-y-3">
                {scenario.additionalTestCases.map((tc: any) => (
                  <li
                    key={tc.id}
                    onClick={() => loadAdditionalDetail(tc)}
                    className="cursor-pointer rounded-lg border border-slate-800 bg-slate-950 p-4 hover:border-indigo-500 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">
                        {tc.type} – {tc.title}
                      </div>

                      {loadingAdditionalId === tc.id && (
                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      {tc.description}
                    </div>

                    {additionalDetails[tc.id] && (
                      <div className="mt-4 text-sm text-slate-300 border-t border-slate-800 pt-4">
                        {/* 🔥 implicitní předpoklady */}
                        <div className="mb-3 text-xs text-slate-400">
                          <strong>Předpoklady:</strong> Uživatel je na relevantní
                          stránce aplikace a má potřebná oprávnění.
                        </div>

                        {/* ⬇️ číslované kroky */}
                        <ol className="list-decimal list-inside space-y-1">
                          {additionalDetails[tc.id].steps.map(
                            (s: string, i: number) => (
                              <li key={i}>{s}</li>
                            )
                          )}
                        </ol>

                        <p className="mt-3 text-xs text-slate-400">
                          {additionalDetails[tc.id].expectedResult}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <FaLightbulb className="text-yellow-400" />
                Expert QA Insight
              </h3>

              <p className="text-sm text-slate-300 mb-4">
                {scenario.expert.reasoning}
              </p>

              <h4 className="font-semibold mb-1">
                Coverage (Acceptance Scope)
              </h4>
              <ul className="list-disc list-inside text-sm text-green-400 mb-4">
                {scenario.expert.coverage.covers.map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>

              <h4 className="font-semibold flex items-center gap-2 mb-1">
                <FaExclamationTriangle className="text-red-400" />
                Rizika
              </h4>
              <ul className="list-disc list-inside text-sm text-slate-300 mb-4">
                {scenario.expert.risks.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <h4 className="font-semibold mb-1">
                Automation Tips (Playwright)
              </h4>
              <ul className="list-disc list-inside text-sm text-slate-300">
                {scenario.expert.automationTips.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
