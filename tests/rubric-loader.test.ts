import { describe, it, expect } from 'vitest';
import { listRubrics, loadRubric, loadRubricForMode } from '../src/interview/rubric-loader.js';

describe('Rubric Loader', () => {
  it('lists all rubric files', () => {
    const rubrics = listRubrics();
    expect(rubrics.length).toBeGreaterThanOrEqual(9);
  });

  it('loads behavioral rubric', () => {
    const content = loadRubric('behavioral-rubric');
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(100);
  });

  it('loads coding rubric', () => {
    const content = loadRubric('coding-rubric');
    expect(content).toBeTruthy();
    expect(content.toLowerCase()).toContain('score');
  });

  it('maps behavioral mode to behavioral rubric', () => {
    const content = loadRubricForMode('behavioral', 'senior-frontend');
    expect(content).toBeTruthy();
  });

  it('maps frontend-architecture mode to correct rubric', () => {
    const content = loadRubricForMode('frontend-architecture', 'senior-frontend');
    expect(content).toBeTruthy();
  });

  it('throws for unknown rubric', () => {
    expect(() => loadRubric('nonexistent-rubric')).toThrow();
  });
});
