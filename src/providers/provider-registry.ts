import 'dotenv/config';
import { MockProvider } from './mock.provider.js';
import { OpenAIProvider } from './openai.provider.js';
import { AnthropicProvider } from './anthropic.provider.js';
import { GeminiProvider } from './gemini.provider.js';
import type { InterviewProvider } from './provider.types.js';
import { ProviderError } from '../utils/errors.js';

type ProviderFactory = () => InterviewProvider;

const REGISTRY: Record<string, ProviderFactory> = {
  mock: () => new MockProvider(),
  openai: () => new OpenAIProvider(),
  anthropic: () => new AnthropicProvider(),
  gemini: () => new GeminiProvider(),
};

export function getProvider(name?: string): InterviewProvider {
  const providerName = name ?? process.env['INTERVIEWOPS_PROVIDER'] ?? 'mock';
  const factory = REGISTRY[providerName];

  if (!factory) {
    throw new ProviderError(
      `Unknown provider: "${providerName}". Available providers: ${Object.keys(REGISTRY).join(', ')}`,
    );
  }

  const provider = factory();

  if (!provider.isAvailable()) {
    throw new ProviderError(
      `Provider "${providerName}" is not available. Check that the required API key is set in your .env file.`,
      providerName,
    );
  }

  return provider;
}

export interface ProviderInfo {
  name: string;
  available: boolean;
  selected: boolean;
  requiresKey: boolean;
}

export function listProviders(): ProviderInfo[] {
  const selectedName = process.env['INTERVIEWOPS_PROVIDER'] ?? 'mock';

  return Object.entries(REGISTRY).map(([name, factory]) => {
    const provider = factory();
    return {
      name,
      available: provider.isAvailable(),
      selected: name === selectedName,
      requiresKey: name !== 'mock',
    };
  });
}
