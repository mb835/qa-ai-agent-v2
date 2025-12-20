import { Scenario } from '../scenarios/types';

export function generatePlaywrightSkeleton(scenario: Scenario): string {
  return `
import { test, expect } from '@playwright/test';

test('${scenario.name}', async ({ page }) => {
  // DEBUG MODE
  // Browser zůstane otevřený a test se zastaví
  await page.goto('https://www.alza.cz', { waitUntil: 'domcontentloaded' });
  await page.pause();

${scenario.steps
  .map(
    step => `
  // ${step.description}
  // TODO: implement action`
  )
  .join('\n')}
});
`;
}
