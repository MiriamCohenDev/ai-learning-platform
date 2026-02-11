import { OpenAI } from 'openai';
import { AiProvider } from './ai-provider.interface';

/**
 * OpenAI provider for generating lessons using OpenAI API.
 * 
 * Implements AiProvider interface.
 * Uses OpenAI Chat Completions (gpt-3.5-turbo) to generate lesson text
 * based on the provided prompt.
 * 
 * Responsibilities:
 * - Initialize OpenAI client with API key from environment variables.
 * - Send prompt to OpenAI and extract generated content.
 * - Return the lesson string, or null if OpenAI response is missing.
 */
export class OpenAiProvider implements AiProvider {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generateLesson(prompt: string): Promise<string | null> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0].message?.content;
  }
}
