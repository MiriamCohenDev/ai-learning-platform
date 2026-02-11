/**
 * AiProvider interface defines the contract for any AI service implementation.
 * 
 * Implementations must provide a method to generate a lesson based on a user prompt.
 */
export interface AiProvider {
    /**
   * Generates a lesson based on the given prompt.
   * 
   * @param prompt - The user-provided prompt text to generate a lesson for.
   * @returns A Promise that resolves to a lesson string, or null if generation fails.
   */
  generateLesson(prompt: string): Promise<string | null>;
}
