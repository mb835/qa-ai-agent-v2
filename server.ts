import "dotenv/config"; // ⬅️ MUSÍ být úplně nahoře

import express from "express";
import cors from "cors";
import { generateScenarios } from "./agent/scenarioEngine";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/scenarios", async (req, res) => {
  try {
    const { intent } = req.body;

    if (!intent || typeof intent !== "string") {
      return res.status(400).json({ error: "Invalid intent" });
    }

    const result = await generateScenarios(intent);
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});
