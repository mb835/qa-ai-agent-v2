import fs from "fs";
import path from "path";
import { resolveTemplate } from "./resolveTemplate";
import { generatePlaywrightTest } from "./generatePlaywrightTest";
import { TestCase } from "./types";

export async function generateTest(intent: string) {
  const steps = resolveTemplate(intent);

  const testCase: TestCase = {
    id: `TC-${Date.now()}`,
    title: intent,
    steps,
  };

  const code = generatePlaywrightTest(testCase);

  const outputDir = path.resolve(__dirname, "../../../tests/generated");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, `${testCase.id}.spec.ts`);
  fs.writeFileSync(filePath, code, "utf-8");

  return filePath;
}
