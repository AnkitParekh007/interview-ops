import { ProviderError } from '../utils/errors.js';
import type { InterviewProvider, ProviderResponse } from './provider.types.js';

export class OpenAIProvider implements InterviewProvider {
  readonly name = 'openai';
  private readonly apiKey: string | undefined;
  private readonly model: string;

  constructor() {
    this.apiKey = process.env['OPENAI_API_KEY'];
    this.model = process.env['OPENAI_MODEL'] ?? 'gpt-4.1-mini';
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async generateCompletion(prompt: string, systemPrompt?: string): Promise<ProviderResponse> {
    if (!this.apiKey) {
      throw new ProviderError(
        'OpenAI API key not configured. Set OPENAI_API_KEY in your .env file.',
        'openai',
      );
    }

    const messages: Array<{ role: string; content: string }> = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: prompt });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: 0.4,
        max_tokens: 6000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ProviderError(
        `OpenAI API error (${response.status}): ${error}`,
        'openai',
      );
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
      model: string;
    };

    const content = data.choices[0]?.message?.content;
    if (!content) {
      throw new ProviderError('OpenAI returned an empty response.', 'openai');
    }

    return {
      content,
      model: data.model ?? this.model,
      provider: 'openai',
    };
  }
}
