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

Uživatel zadává pouze TESTOVACÍ ZÁMĚR.
Tvým cílem je vytvořit PROFESIONÁLNÍ QA ANALÝZU VHODNOU DO PORTFOLIA.

VYTVOŘ:
1️⃣ PŘESNĚ JEDEN HLAVNÍ AKCEPTAČNÍ TEST (Happy Path)
2️⃣ 5 DALŠÍCH TEST CASE:
   - NEGATIVE
   - EDGE
   - SECURITY
   - UX
   - DATA

KAŽDÝ TEST CASE MUSÍ OBSAHOVAT:
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

AKCEPTAČNÍ TEST NAVÍC OBSAHUJE:
- preconditions
- steps

DALŠÍ TESTY:
- kroky se NEGENERUJÍ hned

STRUKTURA:
{
  "testCase": {
    "id": "TC-ACC-001",
    "type": "ACCEPTANCE",
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
    "additionalTestCases": [
      {
        "id": "",
        "type": "",
        "title": "",
        "description": "",
        "expectedResult": "",
        "qaInsight": {
          "reasoning": "",
          "coverage": [],
          "risks": [],
          "automationTips": []
        }
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
            "Musíš odpovědět výhradně jako validní JSON objekt. Slovo JSON musí být přítomné.",
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

    // 🧠 HARD VALIDACE KONTRAKTU
    if (
      !parsed.testCase ||
      !parsed.testCase.qaInsight ||
      !Array.isArray(parsed.testCase.additionalTestCases)
    ) {
      throw new Error("Neplatná struktura odpovědi AI.");
    }

    res.json(parsed);
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

  if (!additionalTestCase?.type || !additionalTestCase?.title) {
    return res.status(400).json({ error: "Neplatný test case." });
  }

  try {
    const prompt = `
VRAŤ POUZE VALIDNÍ JSON.

Jsi senior QA automation expert.
Používáš výhradně Playwright.

Vygeneruj DETAILNÍ testovací kroky pro tento test:

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
          content:
            "Odpověz výhradně jako JSON objekt. Slovo JSON musí být přítomné.",
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
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   SERVER START
========================= */
app.listen(3000, () => {
  console.log("✅ Backend běží na http://localhost:3000");
});
