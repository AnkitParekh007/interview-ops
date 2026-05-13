import path from 'path';
import { fileExists, readMarkdown, listFiles } from '../utils/fs-utils.js';

const RUBRICS_DIR = path.resolve(process.cwd(), 'rubrics');

export function getRubricsDir(): string {
  return RUBRICS_DIR;
}

export function listRubrics(): string[] {
  const files = listFiles(RUBRICS_DIR, '.md');
  return files.map((f) => f.replace('.md', ''));
}

export function rubricExists(rubricName: string): boolean {
  const rubricPath = path.join(RUBRICS_DIR, `${rubricName}.md`);
  return fileExists(rubricPath);
}

export function loadRubric(rubricName: string): string {
  const rubricPath = path.join(RUBRICS_DIR, `${rubricName}.md`);
  if (!fileExists(rubricPath)) {
    throw new Error(`Rubric not found: ${rubricName}`);
  }
  return readMarkdown(rubricPath);
}

// Map track + mode to an appropriate rubric
const RUBRIC_MAP: Record<string, string> = {
  'behavioral': 'behavioral-rubric',
  'coding': 'coding-rubric',
  'system-design': 'system-design-rubric',
  'frontend-architecture': 'frontend-architecture-rubric',
  'recruiter-screen': 'recruiter-screen-rubric',
  'project-deep-dive': 'project-deep-dive-rubric',
  'ai-assisted-engineering': 'ai-engineer-rubric',
  'angular': 'frontend-architecture-rubric',
  'react': 'frontend-architecture-rubric',
  'debugging': 'coding-rubric',
  'code-review': 'coding-rubric',
  'take-home-review': 'coding-rubric',
  'candidate-questions': 'communication-rubric',
};

export function getRubricForMode(mode: string, track?: string): string {
  // Check track-specific rubrics first
  if (track) {
    if (track.includes('ai-') || track === 'ai-agentic-engineer' || track === 'ai-frontend-engineer') {
      if (mode === 'behavioral') return 'behavioral-rubric';
      return 'ai-engineer-rubric';
    }
    if (track === 'engineering-manager') {
      return 'senior-engineer-rubric';
    }
  }

  return RUBRIC_MAP[mode] ?? 'behavioral-rubric';
}

export function loadRubricForMode(mode: string, track?: string): string {
  const rubricName = getRubricForMode(mode, track);
  return loadRubric(rubricName);
}
