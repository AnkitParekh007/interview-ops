import { v4 as uuidv4 } from 'uuid';
import { join } from 'node:path';
import type { StarStory } from '../models/studio.models.js';
import { FileStore } from './file-store.service.js';

const dataDir = join(process.cwd(), '.interviewops-studio', 'star-stories');
const store = new FileStore<StarStory>(dataDir);

export async function getAllStories(): Promise<StarStory[]> {
  const stories = await store.getAll();
  return stories.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getStory(id: string): Promise<StarStory | undefined> {
  return store.get(id);
}

export async function createStory(
  data: Omit<StarStory, 'id' | 'createdAt' | 'updatedAt'>
): Promise<StarStory> {
  const now = new Date().toISOString();
  const story: StarStory = {
    ...data,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  await store.save(story);
  return story;
}

export async function updateStory(
  id: string,
  updates: Partial<StarStory>
): Promise<StarStory | undefined> {
  const existing = await store.get(id);
  if (!existing) return undefined;

  const updated: StarStory = {
    ...existing,
    ...updates,
    id, // ensure id cannot be changed
    updatedAt: new Date().toISOString(),
  };
  await store.save(updated);
  return updated;
}

export async function deleteStory(id: string): Promise<boolean> {
  const existing = await store.get(id);
  if (!existing) return false;
  await store.delete(id);
  return true;
}
