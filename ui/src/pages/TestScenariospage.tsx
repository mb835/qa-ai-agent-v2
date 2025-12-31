import { useState } from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaListOl,
  FaExclamationTriangle,
  FaLightbulb,
  FaChevronDown,
  FaChevronRight,
  FaSpinner,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

import { generateScenario, generateAdditionalSteps } from "../api/scenariosApi";
import AiGeneratedBadge from "../components/AiGeneratedBadge";
import LoadingOverlay from "../components/LoadingOverlay";

export default function TestScenariosPage() {
  const [intent, setIntent] = useState("");
  const [scenario, setScenario] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  const [loadingAdditionalId, setLoadingAdditionalId] = useState<string | null>(null);

  async function handleGenerate() {
    if (!intent.trim()) return;

    try {
      setLoading(true);
      const data = await generateScenario(intent);
      setScenario(data.testCase);
      setShowAdditional(false);
    } catch (e) {
      alert("Chyba při generování QA analýzy");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateAdditional(tc: any) {
    if (tc.steps) return;

    try {
      setLoadingAdditionalId(tc.id);

      const data = await generateAdditionalSteps(tc);

      setScenario((prev: any) => ({
        ...prev,
        additionalTestCases: prev.additionalTestCases.map((t: any) =>
          t.id === tc.id ? { ...t, ...data } : t
        ),
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

        {scenario && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 relative">
              <div className="absolute top-4 right-4">
                <AiGeneratedBadge />
              </div>

              <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
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
              <ol className="list-decimal list-inside text-sm text-slate-300 mb-6 space-y-1">
                {scenario.steps.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>

              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-400" />
                Očekávaný výsledek
              </h3>
              <p className="text-sm text-slate-300 mb-6">
                {scenario.expectedResult}
              </p>

              {/* ADDITIONAL */}
              <button
                onClick={() => setShowAdditional(!showAdditional)}
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
              >
                {showAdditional ? <FaChevronDown /> : <FaChevronRight />}
                Další testovací případy ({scenario.additionalTestCases.length})
              </button>

              {showAdditional && (
                <div className="mt-4 space-y-4">
                  {scenario.additionalTestCases.map((tc: any) => (
                    <div
                      key={tc.id}
                      className="border border-slate-800 bg-slate-950 rounded-lg p-4"
                    >
                      <div
                        onClick={() => handleGenerateAdditional(tc)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="font-semibold">
                          {tc.type} – {tc.title}
                        </div>

                        {loadingAdditionalId === tc.id && (
                          <FaSpinner className="animate-spin text-indigo-400" />
                        )}
                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        {tc.description}
                      </p>

                      {tc.steps && (
                        <>
                          <p className="text-xs text-slate-500 mt-2 italic">
                            Předpoklady zděděny z Acceptance testu
                          </p>

                          <ol className="list-decimal list-inside text-sm text-slate-300 mt-3 space-y-1">
                            {tc.steps.map((s: string, i: number) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ol>

                          <p className="text-sm text-slate-400 mt-2">
                            <strong>Očekávaný výsledek:</strong>{" "}
                            {tc.expectedResult}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT – EXPERT */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <FaLightbulb className="text-yellow-400" />
                Expert QA Insight
              </h3>

              <p className="text-sm text-slate-300 mb-4">
                {scenario.expert.reasoning}
              </p>

              <h4 className="font-semibold flex items-center gap-2 mb-1">
                <FaShieldAlt className="text-green-400" />
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

              <h4 className="font-semibold flex items-center gap-2 mb-1">
                <FaRobot className="text-indigo-400" />
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
