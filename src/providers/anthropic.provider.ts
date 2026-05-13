import { ProviderError } from '../utils/errors.js';
import type { InterviewProvider, ProviderResponse } from './provider.types.js';

export class AnthropicProvider implements InterviewProvider {
  readonly name = 'anthropic';
  private readonly apiKey: string | undefined;
  private readonly model: string;

  constructor() {
    this.apiKey = process.env['ANTHROPIC_API_KEY'];
    this.model = process.env['ANTHROPIC_MODEL'] ?? 'claude-3-5-sonnet-latest';
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async generateCompletion(prompt: string, systemPrompt?: string): Promise<ProviderResponse> {
    if (!this.apiKey) {
      throw new ProviderError(
        'Anthropic API key not configured. Set ANTHROPIC_API_KEY in your .env file.',
        'anthropic',
      );
    }

    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: 6000,
      messages: [{ role: 'user', content: prompt }],
    };

    if (systemPrompt) {
      body['system'] = systemPrompt;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ProviderError(
        `Anthropic API error (${response.status}): ${error}`,
        'anthropic',
      );
    }

    const data = (await response.json()) as {
      content: Array<{ type: string; text: string }>;
      model: string;
    };

    const content = data.content?.[0]?.text;
    if (!content) {
      throw new ProviderError('Anthropic returned an empty response.', 'anthropic');
    }

    return {
      content,
      model: data.model ?? this.model,
      provider: 'anthropic',
    };
  }
}
