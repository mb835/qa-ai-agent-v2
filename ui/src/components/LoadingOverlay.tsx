import { useEffect, useState } from "react";

type Phase = {
  label: string;
  hint: string;
  targetProgress: number;
};

const PHASES: Phase[] = [
  { label: "Analyzuji testovací záměr", hint: "Understanding intent", targetProgress: 20 },
  { label: "Identifikuji kritický business flow", hint: "Value detection", targetProgress: 40 },
  { label: "Navrhuji acceptance test", hint: "Happy-path modeling", targetProgress: 60 },
  { label: "Mapuji rizika a odchylky", hint: "Risk surface analysis", targetProgress: 80 },
  { label: "Finalizuji QA expert insight", hint: "Senior QA reasoning", targetProgress: 100 },
];

export default function LoadingOverlay() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [caret, setCaret] = useState(true);

  const phase = PHASES[phaseIndex];

  /* CARET */
  useEffect(() => {
    const i = setInterval(() => setCaret((c) => !c), 500);
    return () => clearInterval(i);
  }, []);

  /* PROGRESS */
  useEffect(() => {
    const i = setInterval(() => {
      setProgress((p) => {
        if (p >= phase.targetProgress) {
          if (phaseIndex < PHASES.length - 1) {
            setPhaseIndex((i) => i + 1);
          }
          return p;
        }

        const step = p < 30 ? 0.9 : p < 60 ? 0.5 : p < 85 ? 0.3 : 0.15;
        return Math.min(p + step, phase.targetProgress);
      });
    }, 40);

    return () => clearInterval(i);
  }, [phaseIndex, phase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
      <div className="flex flex-col items-center gap-10">

        {/* ================= CORE VISUAL ================= */}
        <div className="relative w-36 h-36">

          {/* OUTER ENERGY HALO */}
          <div className="absolute inset-[-14px] rounded-full ai-halo" />

          {/* ENERGY RING */}
          <div className="absolute inset-[-6px] rounded-full ai-energy-ring" />

          {/* CORE */}
          <div className="absolute inset-0 rounded-full ai-core">
            <div className="ai-noise" />
          </div>

          {/* ORBIT */}
          <div className="absolute inset-0 ai-orbit">
            <div className="ai-trail" />
          </div>
        </div>

        {/* ================= TEXT ================= */}
        <div className="text-center max-w-sm space-y-2">
          <div className="text-xs uppercase tracking-[0.35em] text-indigo-400">
            AI PROCESSING
          </div>

          <div className="text-sm text-slate-200">
            {phase.label}
            <span className="inline-block w-2">{caret ? "▍" : ""}</span>
          </div>

          <div className="text-xs text-slate-500">
            {phase.hint}
          </div>

          {/* PROGRESS */}
          <div className="mt-4">
            <div className="h-1.5 w-64 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              {Math.round(progress)} %
            </div>
          </div>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .ai-core {
          background: radial-gradient(circle at 30% 30%, #a78bfa, #4f46e5);
          box-shadow: 0 0 120px rgba(139,92,246,0.9);
          animation: corePulse 3s ease-in-out infinite;
          overflow: hidden;
        }

        .ai-noise {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08), transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05), transparent 40%);
          animation: noiseShift 6s ease-in-out infinite;
        }

        @keyframes noiseShift {
          0% { transform: translate(0,0); }
          50% { transform: translate(-4px,4px); }
          100% { transform: translate(0,0); }
        }

        @keyframes corePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .ai-orbit {
          animation: orbitSpin 4.5s linear infinite;
        }

        .ai-trail {
          position: absolute;
          top: -6px;
          left: 50%;
          width: 14px;
          height: 14px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: #a78bfa;
          box-shadow:
            0 0 20px rgba(167,139,250,0.9),
            0 0 40px rgba(167,139,250,0.6);
        }

        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .ai-halo {
          background: radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%);
          filter: blur(18px);
          animation: haloPulse 4s ease-in-out infinite;
        }

        @keyframes haloPulse {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }

        .ai-energy-ring {
          border: 1px solid rgba(139,92,246,0.4);
          box-shadow: 0 0 30px rgba(139,92,246,0.4);
          animation: ringSpin 10s linear infinite;
        }

        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
