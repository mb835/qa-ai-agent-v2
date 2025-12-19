import { openai } from './aiClient.ts';

export async function generateTest(prompt: string) {
  const r = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: 'Vracíš pouze Playwright test v TypeScriptu.' },
      { role: 'user', content: prompt }
    ]
  });
  return r.choices[0].message.content;
}
