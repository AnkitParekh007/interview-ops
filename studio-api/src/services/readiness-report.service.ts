import { v4 as uuidv4 } from 'uuid';
import { join } from 'node:path';
import type { InterviewSession, ReadinessReport, WeaknessMapItem } from '../models/studio.models.js';
import { FileStore } from './file-store.service.js';

const dataDir = join(process.cwd(), '.interviewops-studio', 'reports');
const store = new FileStore<ReadinessReport>(dataDir);

export async function getReadinessReport(sessionId: string): Promise<ReadinessReport | undefined> {
  const all = await store.getAll();
  return all.find((r) => r.sessionId === sessionId);
}

export async function generateReadinessReport(session: InterviewSession): Promise<ReadinessReport> {
  // Check if one already exists
  const existing = await getReadinessReport(session.id);
  if (existing) return existing;

  const candidateMessages = session.messages.filter((m) => m.role === 'candidate');
  const candidateCount = candidateMessages.length;

  // Calculate readiness score from scorecard if available
  let readinessScore = 50;
  let hireSignal = 'Lean Hire';
  if (session.scorecard) {
    const ratio = session.scorecard.overallScore / session.scorecard.maxScore;
    readinessScore = Math.round(ratio * 100);
    hireSignal = session.scorecard.hireSignal;
  }

  // Boost for engagement
  if (candidateCount >= 3) readinessScore = Math.min(100, readinessScore + 5);
  if (candidateCount >= 5) readinessScore = Math.min(100, readinessScore + 5);

  // Build strengths from scorecard dimensions
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  if (session.scorecard) {
    for (const dim of session.scorecard.dimensions) {
      if (dim.score >= 4) {
        strengths.push(`${dim.name}: ${dim.feedback}`);
      } else if (dim.score <= 3) {
        weaknesses.push(`${dim.name}: ${dim.feedback}`);
      }
    }
  }
  if (strengths.length === 0) {
    strengths.push('Engaged in practice session', 'Showed willingness to learn');
  }
  if (weaknesses.length === 0) {
    weaknesses.push('Need more practice sessions for detailed feedback');
  }

  // Weakness map
  const weaknessMap: WeaknessMapItem[] = buildWeaknessMap(session);

  // Top actions
  const topActions = [
    'Practice answering with the STAR framework for behavioral questions',
    'Work through 3-5 coding problems on your weakest data structures',
    'Record yourself answering and review for filler words and pacing',
    'Research your target company and prepare tailored examples',
    'Do a full mock interview with timed responses',
  ];

  // Recommended modes
  const allModes = [
    'behavioral', 'coding', 'system-design', 'frontend-architecture',
    'angular', 'react', 'debugging', 'code-review', 'recruiter-screen',
  ];
  const recommendedModes = allModes
    .filter((m) => m !== session.mode)
    .slice(0, 3);

  // Study plans
  const sevenDayPlan = [
    'Day 1: Review your weakest scorecard dimension and study fundamentals.',
    'Day 2: Practice 3 problems in your weakest area.',
    'Day 3: Do a behavioral mock session focusing on STAR format.',
    'Day 4: System design review — practice drawing architectures.',
    'Day 5: Full mock interview with a timer.',
    'Day 6: Research target company culture and recent engineering blog posts.',
    'Day 7: Rest and light review. Prepare your top 3 questions for the interviewer.',
  ];

  const fourteenDayPlan = [
    'Week 1: Build foundations — 2 coding problems per day, 2 behavioral stories, 1 system design.',
    'Week 2: Apply and refine — 3 full mock interviews, refine weak areas from Week 1 feedback.',
  ];

  const thirtyDayPlan = [
    'Week 1-2: Build strong fundamentals across all interview types.',
    'Week 3: Intensive mock interviews — 1 per day across different modes.',
    'Week 4: Company-specific prep — tailor stories and examples to target role.',
    'Final days: Light review, rest, and confidence building.',
  ];

  const summary = `Based on your ${session.mode} practice session for the ${session.track} track, your readiness score is ${readinessScore}/100 (${hireSignal}). You answered ${candidateCount} question(s). ${readinessScore >= 70 ? 'You are on a good track — keep refining your answers.' : 'Focus on the recommended actions below to improve your readiness.'}`;

  const report: ReadinessReport = {
    id: uuidv4(),
    sessionId: session.id,
    readinessScore,
    hireSignal,
    summary,
    strengths,
    weaknesses,
    topActions,
    recommendedModes,
    weaknessMap,
    sevenDayPlan,
    fourteenDayPlan,
    thirtyDayPlan,
    createdAt: new Date().toISOString(),
  };

  await store.save(report);
  return report;
}

function buildWeaknessMap(session: InterviewSession): WeaknessMapItem[] {
  const items: WeaknessMapItem[] = [];

  if (session.scorecard) {
    for (const dim of session.scorecard.dimensions) {
      let severity: 'low' | 'medium' | 'high';
      if (dim.score >= 4) severity = 'low';
      else if (dim.score >= 3) severity = 'medium';
      else severity = 'high';

      items.push({
        area: dim.name,
        severity,
        evidence: dim.feedback,
        recommendation: getRecommendation(dim.name, severity),
      });
    }
  }

  // Ensure at least 3 items
  if (items.length < 3) {
    const defaults: WeaknessMapItem[] = [
      { area: 'Communication Clarity', severity: 'medium', evidence: 'Need more practice to evaluate.', recommendation: 'Practice explaining concepts out loud.' },
      { area: 'Technical Depth', severity: 'medium', evidence: 'Need more practice to evaluate.', recommendation: 'Deep-dive into core concepts of your stack.' },
      { area: 'Problem Solving', severity: 'low', evidence: 'Baseline assessment.', recommendation: 'Continue regular practice with varied problems.' },
    ];
    for (const d of defaults) {
      if (items.length >= 5) break;
      if (!items.find((i) => i.area === d.area)) {
        items.push(d);
      }
    }
  }

  return items.slice(0, 5);
}

function getRecommendation(area: string, severity: 'low' | 'medium' | 'high'): string {
  const recs: Record<string, string> = {
    'STAR Structure': 'Practice structuring every answer as Situation, Task, Action, Result.',
    'Communication Clarity': 'Record yourself answering and review for conciseness.',
    'Self-Awareness': 'Reflect on past projects and identify lessons learned before each session.',
    'Impact & Ownership': 'Quantify your achievements — use numbers, percentages, and metrics.',
    'Adaptability': 'Prepare stories about times you changed course or handled ambiguity.',
    'Problem Solving': 'Solve 2-3 problems daily, focusing on approach before code.',
    'Code Quality': 'Practice writing clean, well-named code with edge case handling.',
    'Complexity Analysis': 'Review Big O for common algorithms and data structures.',
    'Requirements Gathering': 'Practice asking clarifying questions before designing.',
    'High-Level Design': 'Draw system diagrams and explain component interactions.',
    'Scalability': 'Study caching, load balancing, and database scaling patterns.',
    'Tradeoffs': 'For every design decision, list 3 alternatives and their tradeoffs.',
    'Technical Depth': 'Deep-dive into the internals of tools and frameworks you use.',
    'Testing Mindset': 'Start every problem by listing test cases before writing code.',
    'Technical Knowledge': 'Review fundamentals of your primary tech stack daily.',
    'Depth of Experience': 'Prepare detailed stories about 3-5 of your strongest projects.',
    'Growth Mindset': 'Keep a learning journal to track new concepts and reflections.',
  };
  return recs[area] ?? `Focus on improving ${area} through targeted practice sessions.`;
}

export async function getAllReports(): Promise<ReadinessReport[]> {
  return store.getAll();
}
