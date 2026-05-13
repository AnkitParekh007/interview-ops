import { join } from 'node:path';
import type { InterviewSession } from '../models/studio.models.js';
import { FileStore } from './file-store.service.js';

const dataDir = join(process.cwd(), '.interviewops-studio', 'sessions');
const store = new FileStore<InterviewSession>(dataDir);

export const sessionStore = {
  async getAll(): Promise<InterviewSession[]> {
    const sessions = await store.getAll();
    return sessions.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  async get(id: string): Promise<InterviewSession | undefined> {
    return store.get(id);
  },
  async save(session: InterviewSession): Promise<void> {
    return store.save(session);
  },
};
