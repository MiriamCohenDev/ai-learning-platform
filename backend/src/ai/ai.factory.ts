import { AiProvider } from './ai-provider.interface';
import { MockAiProvider } from './mock-ai.provider';
import { OpenAiProvider } from './openai.provider';

/**
 * Factory function to create an AiProvider instance.
 * 
 * Design:
 * - Uses a Strategy-like pattern to allow multiple AI implementations.
 * - Selects the implementation based on environment variable AI_MODE:
 *   - "mock" -> returns MockAiProvider for development/testing.
 *   - any other value (or undefined) -> returns OpenAiProvider for real AI calls.
 * 
 * This allows the rest of the application to depend on the AiProvider interface
 * without worrying about the underlying implementation.
 */
export function createAiProvider(): AiProvider {
  if (process.env.AI_MODE === 'mock') {
    return new MockAiProvider();
  }

  return new OpenAiProvider();
}
