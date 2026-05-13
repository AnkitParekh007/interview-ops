import { describe, it, expect } from 'vitest';
import { InterviewOpsConfigSchema } from '../src/config/config.schema.js';

describe('Config Schema', () => {
  it('parses empty input with all defaults', () => {
    const result = InterviewOpsConfigSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.project.default_track).toBe('senior-frontend');
      expect(result.data.model.provider).toBe('mock');
      expect(result.data.interview.duration_minutes).toBe(45);
      expect(result.data.ethics.practice_only).toBe(true);
      expect(result.data.ethics.block_live_cheating_features).toBe(true);
      expect(result.data.ethics.no_hidden_overlay).toBe(true);
    }
  });

  it('parses partial config and fills defaults', () => {
    const result = InterviewOpsConfigSchema.safeParse({
      project: { name: 'My Prep', default_track: 'angular-developer' },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.project.name).toBe('My Prep');
      expect(result.data.project.default_track).toBe('angular-developer');
      expect(result.data.project.default_mode).toBe('behavioral');
      expect(result.data.model.provider).toBe('mock');
    }
  });

  it('ethics config always has cheating blocked by default', () => {
    const result = InterviewOpsConfigSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.ethics.block_live_cheating_features).toBe(true);
      expect(result.data.ethics.no_hidden_overlay).toBe(true);
      expect(result.data.ethics.no_real_time_answer_injection).toBe(true);
    }
  });
});
