import type { InterviewOpsConfig } from '../config/config.schema.js';

export function buildSimulatePrompt(
  track: string,
  mode: string,
  duration: number,
  config: InterviewOpsConfig,
  trackContent: string,
  modeContent: string,
  rubricContent: string,
): string {
  return `You are an expert technical interviewer running a practice interview session.

## Session Parameters
- Track: ${track}
- Mode: ${mode}
- Duration: ${duration} minutes
- Difficulty: ${config.interview.difficulty}
- Style: ${config.interview.style}

## Track Context
${trackContent}

## Mode Guidelines
${modeContent}

## Rubric
${rubricContent}

## Instructions
Generate a complete interview session packet that includes:

1. **Interview Questions** — Generate 6-8 realistic, high-quality questions appropriate for the track and mode. Make them specific and realistic, not generic.

2. **Follow-Up Questions** — For each main question, provide 2-3 follow-up probes that a skilled interviewer would ask.

3. **Scorecard** — Provide a completed scorecard with scores (1-5) for each rubric dimension with brief rationale for each score. Assume a "good but imperfect" candidate to make feedback useful.

4. **Detailed Feedback** — Honest, practical feedback covering:
   - What was strong
   - What needs improvement
   - Specific actionable suggestions

5. **Improved Answer Example** — Take one of the questions and provide:
   - A weak example answer (common mistakes)
   - A strong example answer (best practices)
   - Explanation of what makes the strong answer better

6. **Study Plan** — A focused 1-2 week study plan to improve performance in this track/mode.

## Ethics Notice
Include a clear notice that this is a PRACTICE-ONLY tool and must not be used during live interviews, for real-time answer injection, or any form of live cheating.

Format the entire response in clean Markdown.`;
}

export function buildAnswerEvalPrompt(
  question: string,
  answer: string,
  rubricContent: string,
  track: string,
  mode: string,
): string {
  return `You are an expert technical interviewer evaluating a candidate's answer.

## Interview Context
- Track: ${track}
- Mode: ${mode}

## Question
${question}

## Candidate's Answer
${answer}

## Rubric
${rubricContent}

## Instructions
Please evaluate this answer and provide:

1. **Score** — Score each rubric dimension (1-5) with brief justification

2. **Overall Assessment** — A paragraph summarizing the answer quality

3. **Strengths** — What the candidate did well (3-5 bullet points)

4. **Areas for Improvement** — What was weak or missing (3-5 bullet points)

5. **Improved Answer** — A substantially better version of this answer that demonstrates what excellent looks like

6. **Hire Signal** — Based on this answer: Strong Hire / Hire / Lean Hire / Lean No Hire / No Hire

Format as clean Markdown.`;
}

export function buildPlanPrompt(
  resume: string,
  jobDescription: string,
  config: InterviewOpsConfig,
): string {
  return `You are an expert technical interview coach. Create a personalized interview preparation plan.

## Target Role
${jobDescription}

## Candidate Resume
${resume}

## Interview Config
- Default Track: ${config.project.default_track}
- Default Mode: ${config.project.default_mode}
- Difficulty: ${config.interview.difficulty}
- Duration: ${config.interview.duration_minutes} minutes

## Instructions
Create a detailed, actionable 2-week interview preparation plan that includes:

1. **Gap Analysis** — Compare the resume to the job requirements. Identify:
   - Strengths to highlight
   - Skills gaps to address
   - Experience to frame better

2. **Week 1 Plan** — Day-by-day preparation for foundations:
   - Behavioral story preparation
   - Technical review priorities
   - Practice exercises

3. **Week 2 Plan** — Day-by-day for mock interviews and polish:
   - Mock interview schedule
   - Final prep and research
   - Company-specific preparation

4. **Key Resources** — Specific books, documentation, courses, and practice resources for this role

5. **Top 5 Questions to Prepare** — The most likely questions for this specific role

6. **Candidate Questions to Ask** — 5-7 thoughtful questions to ask the interviewer

7. **Red Flags to Avoid** — Common mistakes candidates make for this type of role

## Ethics Notice
This plan is for practice and genuine preparation only. All answers should represent real skills and actual experience.

Format as clean, organized Markdown with clear sections.`;
}
