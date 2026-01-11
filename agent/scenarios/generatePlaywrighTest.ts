import { TestCase } from "./types";
import { stepsToPlaywrightCode } from "./playwrightGenerator";

export function generatePlaywrightTest(testCase: TestCase): string {
  const stepsCode = stepsToPlaywrightCode(testCase.steps);

  return `
import { test, expect } from "@playwright/test";

test(${JSON.stringify(testCase.title)}, async ({ page }) => {
${stepsCode}
});
`.trim();
}
