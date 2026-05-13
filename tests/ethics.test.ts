import { describe, it, expect } from 'vitest';
import { MockProvider } from '../src/providers/mock.provider.js';

const BANNED_PHRASES = [
  'hidden overlay',
  'real-time cheating',
  'live answer injection',
  'screen share evasion',
  'stealth assistance',
  'bypass interview',
  'deceive interviewer',
];

describe('Ethics — Mock Provider', () => {
  it('mock output contains ethics notice', async () => {
    const provider = new MockProvider();
    const response = await provider.generateCompletion(
      'Generate a behavioral interview session. track: senior-frontend, mode: behavioral, 45 minutes',
    );
    const content = response.content.toLowerCase();
    expect(content).toContain('practice');
    expect(content).toContain('ethics');
  });

  it('mock output does not contain banned phrases', async () => {
    const provider = new MockProvider();
    const response = await provider.generateCompletion(
      'Generate a behavioral interview session. track: senior-frontend, mode: behavioral',
    );
    const content = response.content.toLowerCase();
    for (const phrase of BANNED_PHRASES) {
      expect(content, `Output should not contain banned phrase: "${phrase}"`).not.toContain(phrase);
    }
  });

  it('mock provider does not require API key', () => {
    const provider = new MockProvider();
    expect(provider.isAvailable()).toBe(true);
  });

  it('mock provider always produces content', async () => {
    const provider = new MockProvider();
    const response = await provider.generateCompletion('test prompt');
    expect(response.content).toBeTruthy();
    expect(response.content.length).toBeGreaterThan(100);
  });
});

describe('Ethics — Config Defaults', () => {
  it('default config blocks live cheating features', async () => {
    const { InterviewOpsConfigSchema } = await import('../src/config/config.schema.js');
    const result = InterviewOpsConfigSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.ethics.block_live_cheating_features).toBe(true);
      expect(result.data.ethics.no_hidden_overlay).toBe(true);
      expect(result.data.ethics.no_real_time_answer_injection).toBe(true);
      expect(result.data.ethics.practice_only).toBe(true);
    }
  });
});
