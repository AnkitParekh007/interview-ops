import { ProviderError } from '../utils/errors.js';
import type { InterviewProvider, ProviderResponse } from './provider.types.js';

export class GeminiProvider implements InterviewProvider {
  readonly name = 'gemini';
  private readonly apiKey: string | undefined;
  private readonly model: string;

  constructor() {
    this.apiKey = process.env['GEMINI_API_KEY'];
    this.model = process.env['GEMINI_MODEL'] ?? 'gemini-2.0-flash';
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async generateCompletion(prompt: string, systemPrompt?: string): Promise<ProviderResponse> {
    if (!this.apiKey) {
      throw new ProviderError(
        'Gemini API key not configured. Set GEMINI_API_KEY in your .env file.',
        'gemini',
      );
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (systemPrompt) {
      contents.push({ role: 'user', parts: [{ text: systemPrompt }] });
      contents.push({ role: 'model', parts: [{ text: 'Understood. I will follow those instructions.' }] });
    }

    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 6000,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ProviderError(
        `Gemini API error (${response.status}): ${error}`,
        'gemini',
      );
    }

    const data = (await response.json()) as {
      candidates: Array<{
        content: { parts: Array<{ text: string }> };
      }>;
    };

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new ProviderError('Gemini returned an empty response.', 'gemini');
    }

    return {
      content,
      model: this.model,
      provider: 'gemini',
    };
  }
}
