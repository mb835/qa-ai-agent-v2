import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is missing. Add it to .env file.");
}

const openai = new OpenAI({ apiKey });

export type Step = {
  action: "goto" | "fill" | "click" | "expectVisible";
  url?: string;
  selector?: string;
  value?: string;
};

export type Scenario = {
  id: string;
  type: "HAPPY" | "EDGE" | "NEGATIVE" | "SECURITY";
  name: string;
  steps: Step[];
};

export async function generateScenarios(
  intent: string
): Promise<{ scenarios: Scenario[] }> {
  const systemPrompt = `
You are a senior QA engineer specializing in Playwright E2E automation.

Generate STRICT JSON only.
No markdown. No comments. No explanations.

JSON SCHEMA:
{
  "scenarios": [
    {
      "id": "string",
      "type": "HAPPY | EDGE | NEGATIVE | SECURITY",
      "name": "string",
      "steps": [
        {
          "action": "goto | fill | click | expectVisible",
          "url": "string?",
          "selector": "string?",
          "value": "string?"
        }
      ]
    }
  ]
}

RULES:
- steps must be executable in Playwright
- no empty arrays
- realistic selectors
- at least 1 scenario of each type
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: intent }
    ]
  });

  const raw = response.choices[0]?.message?.content;

  if (!raw) {
    throw new Error("Empty AI response");
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error("AI returned invalid JSON");
  }

  if (!Array.isArray(parsed.scenarios)) {
    throw new Error("Invalid scenarios format");
  }

  return parsed;
}
