import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

type Step = {
  action: "goto" | "fill" | "click" | "expectVisible" | "expectHidden";
  url?: string;
  selector?: string;
  value?: string;
};

type Scenario = {
  type: string;
  name: string;
  steps: Step[];
};

type ScenarioFile = {
  scenarios: Scenario[];
};

// načteme JSON (ten si můžeš ukládat z backendu)
const scenariosPath = path.join(__dirname, "../scenarios.json");
const scenarioData: ScenarioFile = JSON.parse(
  fs.readFileSync(scenariosPath, "utf-8")
);

for (const scenario of scenarioData.scenarios) {
  test(`${scenario.type}: ${scenario.name}`, async ({ page }) => {
    for (const step of scenario.steps) {
      switch (step.action) {
        case "goto":
          if (!step.url) throw new Error("Missing url");
          await page.goto(step.url);
          break;

        case "fill":
          await page.fill(step.selector!, step.value ?? "");
          break;

        case "click":
          await page.click(step.selector!);
          break;

        case "expectVisible":
          await expect(page.locator(step.selector!)).toBeVisible();
          break;

        case "expectHidden":
          await expect(page.locator(step.selector!)).toBeHidden();
          break;

        default:
          throw new Error(`Unknown action: ${step.action}`);
      }
    }
  });
}
