import fs from 'fs';
import path from 'path';
import { generatePlaywrightTest } from './playwrightGenerator';
import { resolveTemplate } from './resolveTemplate';

const intent = 'Vyhledat notebook na Alze a přidat do košíku';

const steps = resolveTemplate(intent);
const testCode = generatePlaywrightTest(steps);

const outputDir = path.resolve('tests/generated');
fs.mkdirSync(outputDir, { recursive: true });

const outputFile = path.join(outputDir, 'alza-add-to-cart.spec.ts');
fs.writeFileSync(outputFile, testCode);

console.log(`✅ Alza test generated: ${outputFile}`);
