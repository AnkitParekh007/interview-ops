import { describe, it, expect } from 'vitest';
import { listTracks, loadTrack, trackExists } from '../src/interview/track-loader.js';

const EXPECTED_TRACKS = [
  'junior-frontend',
  'senior-frontend',
  'angular-developer',
  'react-developer',
  'fullstack-developer',
  'ai-frontend-engineer',
  'ai-agentic-engineer',
  'devrel-engineer',
  'engineering-manager',
];

describe('Track Loader', () => {
  it('lists all 9 tracks', () => {
    const tracks = listTracks();
    expect(tracks.length).toBe(9);
    for (const track of EXPECTED_TRACKS) {
      expect(tracks).toContain(track);
    }
  });

  it('loads senior-frontend track', () => {
    const content = loadTrack('senior-frontend');
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(100);
  });

  it('loads angular-developer track', () => {
    const content = loadTrack('angular-developer');
    expect(content).toBeTruthy();
    expect(content.toLowerCase()).toContain('angular');
  });

  it('loads ai-agentic-engineer track', () => {
    const content = loadTrack('ai-agentic-engineer');
    expect(content).toBeTruthy();
    expect(content.toLowerCase()).toContain('agent');
  });

  it('returns true for existing tracks', () => {
    expect(trackExists('senior-frontend')).toBe(true);
    expect(trackExists('angular-developer')).toBe(true);
  });

  it('returns false for non-existent tracks', () => {
    expect(trackExists('does-not-exist')).toBe(false);
  });

  it('throws TrackNotFoundError for unknown track', () => {
    expect(() => loadTrack('nonexistent-track')).toThrow();
  });
});
