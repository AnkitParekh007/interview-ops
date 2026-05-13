export interface SessionMetadata {
  id: string;
  track: string;
  mode: string;
  date: string;
  durationMinutes: number;
  provider: string;
  model: string;
  version: string;
}

export interface QuestionSet {
  questions: string[];
  followUpQuestions: string[];
}

export interface ScorecardDimension {
  name: string;
  score: number;
  notes: string;
}

export interface Scorecard {
  dimensions: ScorecardDimension[];
  totalScore: number;
  maxScore: number;
  recommendation: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'Lean No Hire' | 'No Hire';
  summary: string;
}

export interface Feedback {
  strengths: string[];
  areasForImprovement: string[];
  detailedFeedback: string;
}

export interface ImprovedAnswer {
  question: string;
  original: string;
  improved: string;
  explanation: string;
}

export interface StudyPlan {
  weeklyPlan: string;
  resources: string[];
  focusAreas: string[];
}

export interface EthicsNotice {
  statement: string;
  allowedUses: string[];
  prohibitedUses: string[];
  generatedAt: string;
}

export interface InterviewSession {
  metadata: SessionMetadata;
  rawContent: string;
  questions?: QuestionSet;
  scorecard?: Scorecard;
  feedback?: Feedback;
  improvedAnswers?: ImprovedAnswer[];
  studyPlan?: StudyPlan;
  ethicsNotice: EthicsNotice;
}
