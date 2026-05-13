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
  candidateProfileId?: string;
  readinessReportId?: string;
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

export interface CandidateProfile {
  id: string;
  resumeText?: string;
  jobDescriptionText?: string;
  targetCompany?: string;
  targetRole?: string;
  seniorityLevel?: string;
  interviewDate?: string;
  focusAreas: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReadinessReport {
  id: string;
  sessionId: string;
  readinessScore: number;
  hireSignal: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  topActions: string[];
  recommendedModes: string[];
  weaknessMap: WeaknessMapItem[];
  sevenDayPlan: string[];
  fourteenDayPlan: string[];
  thirtyDayPlan: string[];
  createdAt: string;
}

export interface WeaknessMapItem {
  area: string;
  severity: 'low' | 'medium' | 'high';
  evidence: string;
  recommendation: string;
}

export interface StarStory {
  id: string;
  title: string;
  category: 'leadership' | 'conflict' | 'failure' | 'ownership' | 'impact' | 'technical-depth' | 'collaboration' | 'ambiguity';
  situation: string;
  task: string;
  action: string;
  result: string;
  metrics?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalSessions: number;
  sessionsByMode: Record<string, number>;
  averageReadinessScore: number;
  strongestAreas: string[];
  weakestAreas: string[];
  mostPracticedTrack: string;
  mostPracticedMode: string;
  recentSessions: InterviewSession[];
  recommendedNextMode: string;
}
