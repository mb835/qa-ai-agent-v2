export type ActionType =
  | 'goto'
  | 'fill'
  | 'click'
  | 'expectVisible'
  | 'pause';

export type Step = {
  action: ActionType;
  url?: string;
  selector?: string;
  value?: string;
  force?: boolean;
};

function ts(value?: string) {
  return value ? `"${value.replace(/"/g, '\\"')}"` : '""';
}

export function generatePlaywrightTest(steps: Step[]): string {
  const lines: string[] = [];

  lines.push(`import { test, expect } from '@playwright/test';`);
  lines.push(``);
  lines.push(`test('Generated test', async ({ page }) => {`);

  for (const step of steps) {
    switch (step.action) {
      case 'goto':
        lines.push(
          `  await page.goto(${ts(step.url)}, { waitUntil: 'domcontentloaded' });`
        );
        break;

      case 'fill':
        lines.push(`  await page.waitForSelector(${ts(step.selector)});`);
        lines.push(
          `  await page.fill(${ts(step.selector)}, ${ts(step.value)});`
        );
        break;

      case 'click':
        lines.push(`  await page.waitForSelector(${ts(step.selector)});`);
        lines.push(
          `  await page.click(${ts(step.selector)}, { force: true });`
        );
        break;

      case 'expectVisible':
        lines.push(
          `  await expect(page.locator(${ts(step.selector)})).toBeVisible();`
        );
        break;

      case 'pause':
        lines.push(`  await page.pause();`);
        break;
    }
  }

  lines.push(`});`);
  return lines.join('\n');
}
