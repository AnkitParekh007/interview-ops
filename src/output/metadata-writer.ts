import path from 'path';
import { writeFile, readFile, fileExists } from '../utils/fs-utils.js';
import type { SessionMetadata } from '../interview/interview-session.types.js';

export function writeMetadata(sessionDir: string, metadata: SessionMetadata): void {
  const metaPath = path.join(sessionDir, 'metadata.json');
  writeFile(metaPath, JSON.stringify(metadata, null, 2));
}

export function readMetadata(sessionDir: string): SessionMetadata | null {
  const metaPath = path.join(sessionDir, 'metadata.json');
  if (!fileExists(metaPath)) return null;

  try {
    const raw = readFile(metaPath);
    return JSON.parse(raw) as SessionMetadata;
  } catch {
    return null;
  }
}
