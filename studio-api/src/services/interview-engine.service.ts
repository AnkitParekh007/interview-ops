import { v4 as uuidv4 } from 'uuid';
import type { InterviewSession, InterviewMessage } from '../models/studio.models.js';
import { sessionStore } from './session-store.service.js';
import { getAvatarStateForMessage } from './avatar-state.service.js';
import { generateResponse, generateScorecard, generateStudyPlan } from './mock-interviewer.service.js';

function createMessage(role: InterviewMessage['role'], content: string): InterviewMessage {
  return {
    id: uuidv4(),
    role,
    content,
    createdAt: new Date().toISOString(),
    avatarState: getAvatarStateForMessage(role),
  };
}

export function createSession(track: string, mode: string, provider: string): InterviewSession {
  const session: InterviewSession = {
    id: uuidv4(),
    track,
    mode,
    provider,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
  };

  // System greeting
  session.messages.push(
    createMessage(
      'system',
      `Interview session started. Track: ${track}, Mode: ${mode}, Provider: ${provider}. This is a practice session only.`
    )
  );

  // Interviewer welcome
  session.messages.push(
    createMessage(
      'interviewer',
      `Welcome to your ${mode} interview practice session for the ${track} track. I will be your interviewer today. Remember, this is a safe space to practice — take your time and think through your answers.`
    )
  );

  // First question
  const firstQuestion = generateResponse(mode, 0);
  session.messages.push(createMessage('interviewer', firstQuestion));

  sessionStore.save(session);
  return session;
}

export function addCandidateMessage(sessionId: string, content: string): InterviewSession {
  const session = sessionStore.get(sessionId);
  if (!session) {
    throw new Error(`Session not found: ${sessionId}`);
  }
  if (session.status === 'finished') {
    throw new Error('Cannot add messages to a finished session.');
  }

  // Add candidate message
  session.messages.push(createMessage('candidate', content));

  // Count candidate messages to determine which response to generate
  const candidateCount = session.messages.filter((m) => m.role === 'candidate').length;
  const response = generateResponse(session.mode, candidateCount);
  session.messages.push(createMessage('interviewer', response));

  session.updatedAt = new Date().toISOString();
  sessionStore.save(session);
  return session;
}

export function finishSession(sessionId: string): InterviewSession {
  const session = sessionStore.get(sessionId);
  if (!session) {
    throw new Error(`Session not found: ${sessionId}`);
  }

  session.status = 'finished';
  session.scorecard = generateScorecard(session.track, session.mode);
  session.studyPlan = generateStudyPlan();

  // Add coach summary
  session.messages.push(
    createMessage(
      'coach',
      `Great effort! Your practice session is complete. Review your scorecard and study plan below to identify areas for improvement. Keep practicing!`
    )
  );

  session.updatedAt = new Date().toISOString();
  sessionStore.save(session);
  return session;
}
