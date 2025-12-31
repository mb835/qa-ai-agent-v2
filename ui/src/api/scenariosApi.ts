const API_URL = "http://localhost:3000";

/* =========================
   GENERATE MAIN SCENARIO
   ========================= */
export async function generateScenario(intent: string) {
  const res = await fetch(`${API_URL}/api/scenarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ intent }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate scenario");
  }

  return res.json();
}

/* =========================
   GENERATE ADDITIONAL STEPS (LAZY)
   ========================= */
export async function generateAdditionalSteps(additionalTestCase: {
  id: string;
  type: string;
  title: string;
  description: string;
}) {
  const res = await fetch(`${API_URL}/api/scenarios/additional/steps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      additionalTestCase,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate additional test steps");
  }

  return res.json();
}
