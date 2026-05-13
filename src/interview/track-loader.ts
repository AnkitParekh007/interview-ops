import path from 'path';
import { fileExists, readMarkdown, listFiles } from '../utils/fs-utils.js';
import { TrackNotFoundError } from '../utils/errors.js';

const TRACKS_DIR = path.resolve(process.cwd(), 'tracks');

export function getTracksDir(): string {
  return TRACKS_DIR;
}

export function listTracks(): string[] {
  const files = listFiles(TRACKS_DIR, '.md');
  return files.map((f) => f.replace('.md', ''));
}

export function trackExists(trackName: string): boolean {
  const trackPath = path.join(TRACKS_DIR, `${trackName}.md`);
  return fileExists(trackPath);
}

export function loadTrack(trackName: string): string {
  const trackPath = path.join(TRACKS_DIR, `${trackName}.md`);
  if (!fileExists(trackPath)) {
    throw new TrackNotFoundError(trackName);
  }
  return readMarkdown(trackPath);
}

export function getTrackDescription(trackName: string): string {
  try {
    const content = loadTrack(trackName);
    const lines = content.split('\n');
    // Find "Who This Is For" section
    const whoIdx = lines.findIndex((l) => l.includes('Who This Is For'));
    if (whoIdx !== -1 && lines[whoIdx + 1]) {
      return lines[whoIdx + 1].trim();
    }
    // Fallback: first non-empty, non-heading line
    const fallback = lines.find((l) => l.trim() && !l.startsWith('#'));
    return fallback?.trim() ?? trackName;
  } catch {
    return trackName;
  }
}
