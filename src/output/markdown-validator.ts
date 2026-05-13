import path from 'path';
import { fileExists, readFile } from '../utils/fs-utils.js';

export interface ValidationResult {
  file: string;
  exists: boolean;
  nonEmpty: boolean;
  pass: boolean;
}

export const REQUIRED_SESSION_FILES = [
  'session.md',
  'questions.md',
  'scorecard.md',
  'feedback.md',
  'improved-answers.md',
  'study-plan.md',
  'ethics-notice.md',
  'metadata.json',
];

export function validateSession(sessionDir: string): ValidationResult[] {
  return REQUIRED_SESSION_FILES.map((fileName) => {
    const filePath = path.join(sessionDir, fileName);
    const exists = fileExists(filePath);
    let nonEmpty = false;

    if (exists) {
      try {
        const content = readFile(filePath);
        nonEmpty = content.trim().length > 0;
      } catch {
        nonEmpty = false;
      }
    }

    return {
      file: fileName,
      exists,
      nonEmpty,
      pass: exists && nonEmpty,
    };
  });
}

export function isSessionValid(sessionDir: string): boolean {
  const results = validateSession(sessionDir);
  return results.every((r) => r.pass);
}
