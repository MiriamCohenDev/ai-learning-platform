import { AiProvider } from './ai-provider.interface';

/**
 * Mock AI provider for development and testing.
 * 
 * Implements AiProvider interface.
 * Returns a static lesson string instead of calling a real AI service.
 * Useful for local testing, UI development, and avoiding API costs.
 */
export class MockAiProvider implements AiProvider {
  async generateLesson(prompt: string): Promise<string | null> {
    
    return `
Mock Lesson:
This is a mock lesson generated for development.
    `;
  }
}
