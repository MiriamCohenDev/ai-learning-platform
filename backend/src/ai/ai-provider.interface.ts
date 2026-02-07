export interface AiProvider {
  generateLesson(prompt: string): Promise<string | null>;
}
