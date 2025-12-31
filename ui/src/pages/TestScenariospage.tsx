import { useState } from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaListOl,
  FaExclamationTriangle,
  FaLightbulb,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

import { generateScenario } from "../api/scenariosApi";
import AiGeneratedBadge from "../components/AiGeneratedBadge";
import LoadingOverlay from "../components/LoadingOverlay";

export default function TestScenariosPage() {
  const [intent, setIntent] = useState("");
  const [scenario, setScenario] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  async function handleGenerate() {
    if (!intent.trim()) return;

    try {
      setLoading(true);
      const data = await generateScenario(intent);
      setScenario(data.testCase);
      setShowAdditional(false);
    } catch (e) {
      console.error(e);
      alert("Chyba při generování QA analýzy");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-8 py-6 relative">
      {loading && <LoadingOverlay text="Probíhá QA analýza…" />}

      <div className="max-w-7xl mx-auto">
        {/* INPUT */}
        <div className="mb-8 space-y-4">
          <label className="block text-sm text-slate-300">
            Testovací záměr
          </label>

          <textarea
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Spustit QA analýzu
            </button>
          </div>
        </div>

        {/* SCENARIO */}
        {scenario && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* LEFT – ACCEPTANCE */}
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
              <div className="mb-6">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <FaCheckCircle className="text-green-400" />
                  Předpoklady
                </h3>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                  {scenario.preconditions.map((p: string, i: number) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="mb-6">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <FaListOl />
                  Kroky testu (Acceptance / Happy Path)
                </h3>
                <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
                  {scenario.steps.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>

              {/* Expected */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <FaCheckCircle className="text-green-400" />
                  Očekávaný výsledek
                </h3>
                <p className="text-sm text-slate-300">
                  {scenario.expectedResult}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Priorita: {scenario.priority}
                </p>
              </div>

              {/* ADDITIONAL TEST CASES */}
              {scenario.additionalTestCases?.length > 0 && (
                <div className="mt-8 border-t border-slate-800 pt-4">
                  <button
                    onClick={() => setShowAdditional(!showAdditional)}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
                  >
                    {showAdditional ? <FaChevronDown /> : <FaChevronRight />}
                    Další testovací případy ({scenario.additionalTestCases.length})
                  </button>

                  {showAdditional && (
                    <ul className="mt-4 space-y-3 text-sm">
                      {scenario.additionalTestCases.map((tc: any) => (
                        <li
                          key={tc.id}
                          className="rounded-lg border border-slate-800 bg-slate-950 p-3"
                        >
                          <div className="font-semibold">
                            {tc.type} – {tc.title}
                          </div>
                          <div className="text-slate-400 text-xs mt-1">
                            {tc.description}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT – EXPERT QA INSIGHT */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-1">
                <FaLightbulb className="text-yellow-400" />
                Expert QA Insight
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Odborné QA vyhodnocení a doporučení založené na testovacím záměru
              </p>

              <p className="text-sm text-slate-300 mb-4">
                {scenario.expert.reasoning}
              </p>

              <h4 className="font-semibold mb-1">
                Coverage (Acceptance Scope)
              </h4>
              <ul className="list-disc list-inside text-sm text-green-400 mb-4">
                {scenario.expert.coverage.covers.map(
                  (c: string, i: number) => (
                    <li key={i}>{c}</li>
                  )
                )}
              </ul>

              <h4 className="font-semibold flex items-center gap-2 mb-1">
                <FaExclamationTriangle className="text-red-400" />
                Rizika
              </h4>
              <ul className="list-disc list-inside text-sm text-slate-300 mb-4">
                {scenario.expert.coverage.doesNotCover.map(
                  (r: string, i: number) => (
                    <li key={`nc-${i}`}>{r}</li>
                  )
                )}
                {scenario.expert.risks.map((r: string, i: number) => (
                  <li key={`risk-${i}`}>{r}</li>
                ))}
              </ul>

              <h4 className="font-semibold mb-1">
                Automation Tips (Playwright)
              </h4>
              <ul className="list-disc list-inside text-sm text-slate-300">
                {scenario.expert.automationTips.map(
                  (t: string, i: number) => (
                    <li key={i}>{t}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
