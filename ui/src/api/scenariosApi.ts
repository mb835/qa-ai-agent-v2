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

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("API ERROR /api/scenarios:", data);
    throw new Error(
      data?.details ||
        data?.error ||
        "Failed to generate scenario (unknown backend error)"
    );
  }

  return data;
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

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("API ERROR /additional/steps:", data);
    throw new Error(
      data?.details ||
        data?.error ||
        "Failed to generate additional test steps"
    );
  }

  return data;
}
