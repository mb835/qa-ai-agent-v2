import fs from "fs";
import path from "path";

/**
 * Vstupní typ – backend VYNUTÍ strukturu
 */
export type Scenario = {
  tag: "HAPPY" | "EDGE" | "NEGATIVE" | "SECURITY";
  title: string;
  steps: string[];
};

/**
 * Překlad jednoho scénáře do Playwright testu
 */
function generatePlaywrightTest(scenario: Scenario): string {
  const testName = `[${scenario.tag}] ${scenario.title}`;

  const steps = scenario.steps
    .map((step, index) => {
      return `    // ${index + 1}. ${step}`;
    })
    .join("\n");

  return `
import { test, expect } from "@playwright/test";

test("${testName}", async ({ page }) => {
${steps}

    // TODO: map steps → Playwright actions
});
`.trim();
}

/**
 * Uloží každý scénář jako samostatný .spec.ts soubor
 */
export function generatePlaywrightFiles(scenarios: Scenario[]) {
  const baseDir = path.resolve("playwright/tests");

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  scenarios.forEach((scenario) => {
    const fileSafeName =
      scenario.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const fileName = `${scenario.tag.toLowerCase()}-${fileSafeName}.spec.ts`;
    const filePath = path.join(baseDir, fileName);

    const content = generatePlaywrightTest(scenario);
    fs.writeFileSync(filePath, content, "utf-8");
  });
}
