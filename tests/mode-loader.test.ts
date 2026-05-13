import { describe, it, expect } from 'vitest';
import { listModes, loadMode, modeExists } from '../src/interview/mode-loader.js';

const EXPECTED_MODES = [
  '_shared',
  'recruiter-screen',
  'behavioral',
  'coding',
  'system-design',
  'frontend-architecture',
  'angular',
  'react',
  'project-deep-dive',
  'debugging',
  'code-review',
  'ai-assisted-engineering',
  'take-home-review',
  'candidate-questions',
];

describe('Mode Loader', () => {
  it('lists all modes', () => {
    const modes = listModes();
    expect(modes.length).toBeGreaterThanOrEqual(13);
    for (const mode of EXPECTED_MODES.filter((m) => m !== '_shared')) {
      expect(modes).toContain(mode);
    }
  });

  it('loads behavioral mode', () => {
    const content = loadMode('behavioral');
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(100);
  });

  it('loads ai-assisted-engineering mode', () => {
    const content = loadMode('ai-assisted-engineering');
    expect(content).toBeTruthy();
    expect(content.toLowerCase()).toContain('ai');
  });

  it('returns true for existing modes', () => {
    expect(modeExists('behavioral')).toBe(true);
    expect(modeExists('system-design')).toBe(true);
  });

  it('returns false for non-existent modes', () => {
    expect(modeExists('does-not-exist')).toBe(false);
  });

  it('throws ModeNotFoundError for unknown mode', () => {
    expect(() => loadMode('nonexistent-mode')).toThrow();
  });
});
