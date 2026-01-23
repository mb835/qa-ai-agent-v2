import inquirer from 'inquirer';
import fs from 'fs';
import { generateScenarios } from './agent/generateScenarios.ts';
import { generateTest } from './agent/generateTest.ts';

const { mode } = await inquirer.prompt([{
  type: 'list',
  name: 'mode',
  choices: ['Scenarios', 'Generate Test']
}]);

if (mode === 'Scenarios') {
  const { text } = await inquirer.prompt([{ name: 'text', message: 'Popis:' }]);
  const out = await generateScenarios(text);
  fs.writeFileSync('scenarios.txt', out);
  console.log('Scénáře hotové');
}

if (mode === 'Generate Test') {
  const s = fs.readFileSync('scenarios.txt','utf-8');
  const t = await generateTest(s);
  fs.writeFileSync('test.spec.ts', t);
  console.log('Test hotový');
}
