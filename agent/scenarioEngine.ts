import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateScenarios(userPrompt: string) {
  const systemPrompt = `
Jsi senior QA engineer.
Analyzuj požadavek a vrať strukturovaný JSON se sekcemi:
- happyPath (pole kroků)
- edgeCases (pole)
- negativeScenarios (pole)
Piš česky, konkrétně a realisticky.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.3
  });

  return JSON.parse(response.choices[0].message.content);
}
