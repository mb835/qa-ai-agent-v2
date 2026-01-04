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
   GENERATE ADDITIONAL STEPS
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
    throw new Error("Failed to generate additional steps");
  }

  return res.json();
}

/* =========================
   GENERATE EXPERT QA INSIGHT ⭐
========================= */
export async function generateExpertInsight(testCase: {
  id: string;
  type: string;
  title: string;
  description: string;
}) {
  const res = await fetch(`${API_URL}/api/scenarios/insight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      testCase,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate expert insight");
  }

  return res.json();
}
