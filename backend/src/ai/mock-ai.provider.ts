import { AiProvider } from './ai-provider.interface';

export class MockAiProvider implements AiProvider {
  async generateLesson(prompt: string): Promise<string | null> {
    
    return `
Mock Lesson:
This is a mock lesson generated for development.
    `;
  }
}
