type Step = {
  action: string;
  url?: string;
  selector?: string;
  value?: string;
};

export function generatePlaywrightTest(steps: Step[]): string {
  const lines: string[] = [];

  lines.push(`import { test, expect } from '@playwright/test';`);
  lines.push('');
  lines.push(`test('Generated happy path test', async ({ page }) => {`);

  for (const step of steps) {
    switch (step.action) {
      case 'goto':
        lines.push(`  await page.goto('${step.url}');`);
        break;

      case 'fill':
        lines.push(
          `  await page.fill('${step.selector}', '${step.value}');`
        );
        break;

      case 'click':
        lines.push(`  await page.click('${step.selector}');`);
        break;

      case 'expectVisible':
        lines.push(
          `  await expect(page.locator('${step.selector}')).toBeVisible();`
        );
        break;

      default:
        lines.push(`  // Unknown action: ${step.action}`);
    }
  }

  lines.push('});');

  return lines.join('\n');
}
