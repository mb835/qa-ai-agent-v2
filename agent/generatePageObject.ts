import { openai } from './aiClient.ts';

export async function generatePageObject(code: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: 'Vytvoř Page Object Model. Vracíš pouze TypeScript kód.' },
      { role: 'user', content: code }
    ]
  });

  return response.choices[0].message.content;
}
