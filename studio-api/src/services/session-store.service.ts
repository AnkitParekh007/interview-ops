import { InterviewSession } from '../models/studio.models.js';

const sessions = new Map<string, InterviewSession>();

export const sessionStore = {
  getAll(): InterviewSession[] {
    return Array.from(sessions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  get(id: string): InterviewSession | undefined {
    return sessions.get(id);
  },
  save(session: InterviewSession): void {
    sessions.set(session.id, session);
  },
};
