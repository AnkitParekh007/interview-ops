import { describe, it, expect, beforeEach } from 'vitest';
import { getProvider, listProviders } from '../src/providers/provider-registry.js';

describe('Provider Registry', () => {
  beforeEach(() => {
    process.env['INTERVIEWOPS_PROVIDER'] = 'mock';
  });

  it('returns mock provider by default', () => {
    const provider = getProvider('mock');
    expect(provider.name).toBe('mock');
    expect(provider.isAvailable()).toBe(true);
  });

  it('mock provider generates content without API key', async () => {
    const provider = getProvider('mock');
    const response = await provider.generateCompletion(
      'Generate a behavioral interview session for track: senior-frontend, mode: behavioral, 45 minutes',
    );
    expect(response.content).toBeTruthy();
    expect(response.provider).toBe('mock');
    expect(response.model).toBe('mock-v1');
  });

  it('lists all providers', () => {
    const providers = listProviders();
    const names = providers.map((p) => p.name);
    expect(names).toContain('mock');
    expect(names).toContain('openai');
    expect(names).toContain('anthropic');
    expect(names).toContain('gemini');
  });

  it('mock provider is always available', () => {
    const providers = listProviders();
    const mock = providers.find((p) => p.name === 'mock');
    expect(mock?.available).toBe(true);
    expect(mock?.requiresKey).toBe(false);
  });

  it('throws for unknown provider', () => {
    expect(() => getProvider('unknown-provider-xyz')).toThrow();
  });
});
