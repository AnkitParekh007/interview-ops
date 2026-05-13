export type AvatarState =
  | 'idle'
  | 'greeting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'encouraging'
  | 'challenging'
  | 'scoring'
  | 'celebrating';

export type SessionStatus = 'draft' | 'active' | 'finished';

export type MessageRole = 'system' | 'interviewer' | 'candidate' | 'coach';

export interface InterviewSession {
  id: string;
  track: string;
  mode: string;
  provider: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
  messages: InterviewMessage[];
  scorecard?: InterviewScorecard;
  studyPlan?: StudyPlan;
}

export interface InterviewMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  avatarState?: AvatarState;
}

export interface InterviewScorecard {
  overallScore: number;
  maxScore: number;
  hireSignal: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'Lean No Hire' | 'No Hire';
  dimensions: InterviewScoreDimension[];
}

export interface InterviewScoreDimension {
  name: string;
  score: number;
  feedback: string;
}

export interface StudyPlan {
  sevenDayPlan: string[];
  fourteenDayPlan: string[];
}

export interface Track {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Mode {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  requiresKey: boolean;
}
