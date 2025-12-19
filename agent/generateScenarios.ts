import { openai } from './aiClient.ts';

export async function generateScenarios(text: string) {
  const r = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: 'Jsi senior QA. Vrať scénáře (happy, edge, negative).' },
      { role: 'user', content: text }
    ]
  });
  return r.choices[0].message.content;
}
