// agent/aiClients.ts

import "dotenv/config";
import OpenAI from "openai";

/**
 * Centralized OpenAI client
 * - API key is loaded ONLY from environment variables
 * - Safe for public repositories
 */
if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY is not set. Create a .env file with OPENAI_API_KEY=..."
  );
}

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openaiClient;
