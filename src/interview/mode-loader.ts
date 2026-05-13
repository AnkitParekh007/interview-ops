import path from 'path';
import { fileExists, readMarkdown, listFiles } from '../utils/fs-utils.js';
import { ModeNotFoundError } from '../utils/errors.js';

const MODES_DIR = path.resolve(process.cwd(), 'modes');

export function getModesDir(): string {
  return MODES_DIR;
}

export function listModes(): string[] {
  const files = listFiles(MODES_DIR, '.md');
  return files
    .filter((f) => !f.startsWith('_'))
    .map((f) => f.replace('.md', ''));
}

export function modeExists(modeName: string): boolean {
  const modePath = path.join(MODES_DIR, `${modeName}.md`);
  return fileExists(modePath);
}

export function loadMode(modeName: string): string {
  const modePath = path.join(MODES_DIR, `${modeName}.md`);
  if (!fileExists(modePath)) {
    throw new ModeNotFoundError(modeName);
  }
  return readMarkdown(modePath);
}

export function getModeDescription(modeName: string): string {
  try {
    const content = loadMode(modeName);
    const lines = content.split('\n');
    // Find Purpose section
    const purposeIdx = lines.findIndex((l) => l.includes('## Purpose'));
    if (purposeIdx !== -1 && lines[purposeIdx + 1]) {
      return lines[purposeIdx + 1].trim();
    }
    const fallback = lines.find((l) => l.trim() && !l.startsWith('#'));
    return fallback?.trim() ?? modeName;
  } catch {
    return modeName;
  }
}
