import express from "express";
import cors from "cors";
import { generateScenarios } from "./agent/scenarioEngine.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/scenarios", async (req, res) => {
  const { prompt } = req.body;
  const result = await generateScenarios(prompt);
  res.json(result);
});

app.listen(3000, () => {
  console.log("✅ Backend běží na http://localhost:3000");
});
