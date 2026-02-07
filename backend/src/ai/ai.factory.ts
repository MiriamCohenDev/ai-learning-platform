import { AiProvider } from './ai-provider.interface';
import { MockAiProvider } from './mock-ai.provider';
import { OpenAiProvider } from './openai.provider';

export function createAiProvider(): AiProvider {
  if (process.env.AI_MODE === 'mock') {
    return new MockAiProvider();
  }

  return new OpenAiProvider();
}
