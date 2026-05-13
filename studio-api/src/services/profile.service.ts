import { join } from 'node:path';
import type { CandidateProfile } from '../models/studio.models.js';
import { FileStore } from './file-store.service.js';

const dataDir = join(process.cwd(), '.interviewops-studio', 'profiles');
const store = new FileStore<CandidateProfile>(dataDir);

const DEFAULT_ID = 'default';

export async function getProfile(): Promise<CandidateProfile | undefined> {
  return store.get(DEFAULT_ID);
}

export async function updateProfile(updates: Partial<CandidateProfile>): Promise<CandidateProfile> {
  let existing = await store.get(DEFAULT_ID);
  const now = new Date().toISOString();

  if (!existing) {
    existing = {
      id: DEFAULT_ID,
      focusAreas: [],
      createdAt: now,
      updatedAt: now,
    };
  }

  const updated: CandidateProfile = {
    ...existing,
    ...updates,
    id: DEFAULT_ID,
    updatedAt: now,
  };

  await store.save(updated);
  return updated;
}
