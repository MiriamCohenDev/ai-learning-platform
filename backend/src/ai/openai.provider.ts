import { OpenAI } from 'openai';
import { AiProvider } from './ai-provider.interface';

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
