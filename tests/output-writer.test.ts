import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { writeSession, getSessionDir } from '../src/output/output-writer.js';
import type { InterviewSession } from '../src/interview/interview-session.types.js';

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'interviewops-test-'));
}

function makeSession(): InterviewSession {
  return {
    metadata: {
      id: '2026-01-01-senior-frontend-behavioral',
      track: 'senior-frontend',
      mode: 'behavioral',
      date: '2026-01-01',
      durationMinutes: 45,
      provider: 'mock',
      model: 'mock-v1',
      version: '0.1.0',
    },
    rawContent: '# Mock session content\n\nThis is test content.',
    ethicsNotice: {
      statement: 'This is a practice-only tool.',
      allowedUses: ['Practice before interviews'],
      prohibitedUses: ['Use during live interviews'],
      generatedAt: '2026-01-01T00:00:00.000Z',
    },
  };
}

describe('Output Writer', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = makeTempDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('writes all required session files', () => {
    const sessionDir = path.join(tmpDir, 'test-session');
    const session = makeSession();

    writeSession(sessionDir, session);

    const requiredFiles = [
      'session.md',
      'questions.md',
      'scorecard.md',
      'feedback.md',
      'improved-answers.md',
      'study-plan.md',
      'ethics-notice.md',
      'metadata.json',
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(sessionDir, file);
      expect(fs.existsSync(filePath), `Expected ${file} to exist`).toBe(true);
      expect(fs.readFileSync(filePath, 'utf-8').length).toBeGreaterThan(0);
    }
  });

  it('ethics-notice.md contains practice-only statement', () => {
    const sessionDir = path.join(tmpDir, 'test-session-2');
    const session = makeSession();
    writeSession(sessionDir, session);

    const ethicsContent = fs.readFileSync(path.join(sessionDir, 'ethics-notice.md'), 'utf-8').toLowerCase();
    expect(ethicsContent).toContain('practice');
  });

  it('metadata.json contains correct session data', () => {
    const sessionDir = path.join(tmpDir, 'test-session-3');
    const session = makeSession();
    writeSession(sessionDir, session);

    const metadataRaw = fs.readFileSync(path.join(sessionDir, 'metadata.json'), 'utf-8');
    const metadata = JSON.parse(metadataRaw) as { track: string; mode: string; provider: string };
    expect(metadata.track).toBe('senior-frontend');
    expect(metadata.mode).toBe('behavioral');
    expect(metadata.provider).toBe('mock');
  });

  it('getSessionDir builds correct path', () => {
    const base = path.join('output', 'sessions');
    const sessionDir = getSessionDir(base, '2026-01-01-senior-frontend-behavioral');
    expect(sessionDir).toBe(path.join('output', 'sessions', '2026-01-01-senior-frontend-behavioral'));
  });
});
