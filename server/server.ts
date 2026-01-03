import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

/* =========================
   CORS
========================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   AI – GENERATE QA ANALYSIS
========================= */
app.post("/api/scenarios", async (req, res) => {
  const { intent } = req.body;

  if (!intent || typeof intent !== "string") {
    return res.status(400).json({
      error: "Chybí nebo je neplatný testovací záměr.",
    });
  }

  try {
    const prompt = `
VRAŤ POUZE VALIDNÍ JSON.

Jsi senior QA automation architekt (enterprise úroveň).
Používáš výhradně Playwright.

Vytvoř:
- 1 hlavní ACCEPTANCE test
- 5 dalších testů: NEGATIVE, EDGE, SECURITY, UX, DATA

KAŽDÝ TEST MUSÍ OBSAHOVAT:
- id
- type
- title
- description
- expectedResult
- qaInsight:
  - reasoning
  - coverage (array)
  - risks (array)
  - automationTips (array)

Pouze ACCEPTANCE test má navíc:
- preconditions
- steps

DALŠÍ TESTY:
- kroky se generují až později

STRUKTURA IDEÁLNĚ:

{
  "testCase": {
    "id": "",
    "type": "",
    "title": "",
    "description": "",
    "preconditions": [],
    "steps": [],
    "expectedResult": "",
    "qaInsight": {
      "reasoning": "",
      "coverage": [],
      "risks": [],
      "automationTips": []
    },
    "additionalTestCases": []
  }
}

TESTOVACÍ ZÁMĚR:
"${intent}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.25,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "Odpověz výhradně jako validní JSON objekt.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("AI nevrátila žádný obsah.");
    }

    const parsed = JSON.parse(content);

    /* =========================
       🔧 NORMALIZACE ODPOVĚDI AI
    ========================= */
    const testCase = parsed.testCase ?? parsed;

    if (!testCase || typeof testCase !== "object") {
      throw new Error("AI nevrátila testCase objekt.");
    }

    // povinné fallbacky – AI není deterministická
    testCase.qaInsight ??= {
      reasoning: "",
      coverage: [],
      risks: [],
      automationTips: [],
    };

    testCase.preconditions ??= [];
    testCase.steps ??= [];
    testCase.additionalTestCases ??= [];

    // sjednocený výstup pro FE
    res.json({
      testCase,
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({
      error: "Chyba při generování QA analýzy",
      details: String(error),
    });
  }
});

/* =========================
   AI – GENERATE STEPS FOR ADDITIONAL TEST CASE
========================= */
app.post("/api/scenarios/additional/steps", async (req, res) => {
  const { additionalTestCase } = req.body;

  if (!additionalTestCase?.id || !additionalTestCase?.type) {
    return res.status(400).json({
      error: "Neplatný test case.",
    });
  }

  try {
    const prompt = `
VRAŤ POUZE VALIDNÍ JSON.

Jsi senior QA automation expert.
Používáš Playwright.

Vygeneruj kroky pro test:

TYP: ${additionalTestCase.type}
NÁZEV: ${additionalTestCase.title}
POPIS: ${additionalTestCase.description}

STRUKTURA:
{
  "steps": ["string"],
  "expectedResult": "string"
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "Odpověz pouze jako JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("AI nevrátila žádný obsah.");
    }

    const parsed = JSON.parse(content);

    res.json({
      steps: parsed.steps ?? [],
      expectedResult: parsed.expectedResult ?? "",
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({
      error: "Chyba při generování kroků",
      details: String(error),
    });
  }
});

/* =========================
   JIRA – EXPORT TEST CASE (MOCK)
========================= */
app.post("/api/integrations/jira/export", (req, res) => {
  try {
    const { testCase } = req.body;

    if (!testCase) {
      return res.status(400).json({
        error: "Chybí testCase payload.",
      });
    }

    const jiraPayload = {
      summary: testCase.title,
      preconditions: testCase.preconditions ?? "N/A",
      steps: (testCase.steps ?? []).map(
        (s: { step: string; expected: string }, index: number) => ({
          order: index + 1,
          action: s.step,
          expectedResult: s.expected,
        })
      ),
    };

    res.json({
      mode: "MOCK",
      message: "Test case převeden do JIRA formátu",
      jiraPayload,
    });
  } catch (error) {
    console.error("JIRA EXPORT ERROR:", error);
    res.status(500).json({
      error: "Chyba při exportu do JIRA",
    });
  }
});

/* =========================
   SERVER START
========================= */
app.listen(3000, () => {
  console.log("✅ Backend běží na http://localhost:3000");
});
