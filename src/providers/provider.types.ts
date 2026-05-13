export interface ProviderMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ProviderResponse {
  content: string;
  model: string;
  provider: string;
}

export interface InterviewProvider {
  name: string;
  generateCompletion(prompt: string, systemPrompt?: string): Promise<ProviderResponse>;
  isAvailable(): boolean;
}
