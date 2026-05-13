import path from 'path';
import { writeFile, ensureDir } from '../utils/fs-utils.js';
import type { InterviewSession } from '../interview/interview-session.types.js';

export function writeSession(sessionDir: string, session: InterviewSession): void {
  ensureDir(sessionDir);

  // Main session content
  writeFile(path.join(sessionDir, 'session.md'), buildSessionMd(session));

  // Questions
  writeFile(path.join(sessionDir, 'questions.md'), buildQuestionsMd(session));

  // Scorecard
  writeFile(path.join(sessionDir, 'scorecard.md'), buildScorecardMd(session));

  // Feedback
  writeFile(path.join(sessionDir, 'feedback.md'), buildFeedbackMd(session));

  // Improved answers
  writeFile(path.join(sessionDir, 'improved-answers.md'), buildImprovedAnswersMd(session));

  // Study plan
  writeFile(path.join(sessionDir, 'study-plan.md'), buildStudyPlanMd(session));

  // Ethics notice
  writeFile(path.join(sessionDir, 'ethics-notice.md'), buildEthicsNoticeMd(session));

  // Metadata
  writeFile(path.join(sessionDir, 'metadata.json'), JSON.stringify(session.metadata, null, 2));
}

function buildSessionMd(session: InterviewSession): string {
  return `# Interview Session: ${session.metadata.track} / ${session.metadata.mode}

**Session ID**: ${session.metadata.id}
**Date**: ${session.metadata.date}
**Duration**: ${session.metadata.durationMinutes} minutes
**Track**: ${session.metadata.track}
**Mode**: ${session.metadata.mode}
**Provider**: ${session.metadata.provider}
**Model**: ${session.metadata.model}

---

${session.rawContent}
`;
}

function buildQuestionsMd(session: InterviewSession): string {
  return `# Interview Questions

**Track**: ${session.metadata.track}
**Mode**: ${session.metadata.mode}
**Session**: ${session.metadata.id}

---

${session.rawContent}
`;
}

function buildScorecardMd(session: InterviewSession): string {
  return `# Scorecard

**Track**: ${session.metadata.track}
**Mode**: ${session.metadata.mode}
**Session**: ${session.metadata.id}
**Date**: ${session.metadata.date}

---

${session.rawContent}
`;
}

function buildFeedbackMd(session: InterviewSession): string {
  return `# Feedback

**Track**: ${session.metadata.track}
**Mode**: ${session.metadata.mode}
**Session**: ${session.metadata.id}

---

${session.rawContent}
`;
}

function buildImprovedAnswersMd(session: InterviewSession): string {
  return `# Improved Answers

**Track**: ${session.metadata.track}
**Mode**: ${session.metadata.mode}
**Session**: ${session.metadata.id}

---

${session.rawContent}
`;
}

function buildStudyPlanMd(session: InterviewSession): string {
  return `# Study Plan

**Track**: ${session.metadata.track}
**Mode**: ${session.metadata.mode}
**Session**: ${session.metadata.id}

---

${session.rawContent}
`;
}

function buildEthicsNoticeMd(session: InterviewSession): string {
  const notice = session.ethicsNotice;
  return `# Ethics Notice

**Generated**: ${notice.generatedAt}

---

## Statement

${notice.statement}

## Allowed Uses

${notice.allowedUses.map((u) => `- ${u}`).join('\n')}

## Prohibited Uses

${notice.prohibitedUses.map((u) => `- ${u}`).join('\n')}

---

InterviewOps is an open-source, ethical interview practice tool built for developers.
It is NOT a cheating tool and does NOT support any form of live interview assistance.

For more information, see [ETHICS.md](../../ETHICS.md).
`;
}

export function getSessionDir(outputBaseDir: string, sessionId: string): string {
  return path.join(outputBaseDir, sessionId);
}
