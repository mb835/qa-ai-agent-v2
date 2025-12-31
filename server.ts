import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* =========================
   HEALTH CHECK
   ========================= */
app.get("/health", (_, res) => {
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
Jsi senior QA automation architekt (enterprise úroveň, rok 2027).
Používáš VÝHRADNĚ Playwright.

UŽIVATEL zadává pouze TESTOVACÍ ZÁMĚR.
Tvým cílem je vytvořit PROFESIONÁLNÍ QA ANALÝZU VHODNOU DO PORTFOLIA.

VYTVOŘ:
1️⃣ PŘESNĚ JEDEN HLAVNÍ ACCEPTANCE TEST CASE
   - business-kritický happy path
   - reprezentuje, zda systém generuje hodnotu
   - musí být kompletní a samostatný

2️⃣ 5–6 DALŠÍCH TEST CASE
   - typy: NEGATIVE, EDGE, SECURITY, UX, DATA
   - nejsou acceptance
   - rozšiřují pokrytí rizik

EXPERT QA INSIGHT MUSÍ OBSAHOVAT:
- hluboké vysvětlení, PROČ je tento acceptance test klíčový
- jasný business kontext
- konkrétní rizika
- praktická Playwright doporučení (E2E pohled)

VRAŤ POUZE VALIDNÍ JSON VE STRUKTUŘE:

{
  "testCase": {
    "id": "TC-ACC-001",
    "title": "Krátký výstižný název acceptance testu",
    "description": "Popis hlavního business scénáře",
    "preconditions": string[],
    "steps": string[],
    "expectedResult": "string",
    "priority": "High",
    "notes": "",
    "expert": {
      "reasoning": "Detailní QA vysvětlení business významu testu",
      "coverage": {
        "covers": string[],
        "doesNotCover": string[]
      },
      "risks": string[],
      "automationTips": string[]
    },
    "additionalTestCases": [
      {
        "id": "neg-1",
        "type": "NEGATIVE",
        "title": "Název testu",
        "description": "Krátký popis rizika nebo odchylky"
      }
    ]
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
          content:
            "Jsi přísný senior QA architekt. Vrať POUZE JSON. Žádný jiný text.",
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

    res.json(JSON.parse(content));
  } catch (error: any) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      error: "Chyba při generování QA analýzy",
      details: error.message,
    });
  }
});

/* =========================
   AI – GENERATE STEPS FOR ADDITIONAL TEST CASE
   ========================= */
app.post("/api/scenarios/additional/steps", async (req, res) => {
  const { additionalTestCase } = req.body;

  try {
    const prompt = `
Jsi senior QA automation expert.
Používáš pouze Playwright.

VYGENERUJ DETAILNÍ TESTOVACÍ KROKY PRO:
Typ: ${additionalTestCase.type}
Název: ${additionalTestCase.title}
Popis: ${additionalTestCase.description}

VRAŤ POUZE JSON:
{
  "steps": string[],
  "expectedResult": "string"
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error("AI nevrátila žádný obsah.");
    }

    res.json(JSON.parse(content));
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/* =========================
   SERVER START
   ========================= */
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
