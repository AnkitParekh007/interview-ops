import type { InterviewProvider, ProviderResponse } from './provider.types.js';

// --- Mock content generators ---

function detectTrackAndMode(prompt: string): { track: string; mode: string } {
  const p = prompt.toLowerCase();
  let track = 'senior-frontend';
  let mode = 'behavioral';

  if (p.includes('angular')) track = 'angular-developer';
  else if (p.includes('ai-agentic') || p.includes('agentic')) track = 'ai-agentic-engineer';
  else if (p.includes('ai-frontend')) track = 'ai-frontend-engineer';
  else if (p.includes('react')) track = 'react-developer';
  else if (p.includes('fullstack') || p.includes('full-stack')) track = 'fullstack-developer';
  else if (p.includes('junior')) track = 'junior-frontend';
  else if (p.includes('devrel')) track = 'devrel-engineer';
  else if (p.includes('manager') || p.includes('engineering-manager')) track = 'engineering-manager';

  if (p.includes('behavioral')) mode = 'behavioral';
  else if (p.includes('frontend-architecture') || p.includes('frontend architecture')) mode = 'frontend-architecture';
  else if (p.includes('project-deep-dive') || p.includes('project deep dive')) mode = 'project-deep-dive';
  else if (p.includes('coding')) mode = 'coding';
  else if (p.includes('system-design') || p.includes('system design')) mode = 'system-design';
  else if (p.includes('ai-assisted') || p.includes('ai assisted')) mode = 'ai-assisted-engineering';
  else if (p.includes('angular')) mode = 'angular';
  else if (p.includes('react')) mode = 'react';
  else if (p.includes('debug')) mode = 'debugging';
  else if (p.includes('code-review') || p.includes('code review')) mode = 'code-review';
  else if (p.includes('recruiter')) mode = 'recruiter-screen';
  else if (p.includes('take-home') || p.includes('take home')) mode = 'take-home-review';

  return { track, mode };
}

function getBehavioralQuestions(): string[] {
  return [
    '1. Tell me about a time you had to deliver a project under significant deadline pressure. Walk me through your approach and what you learned.',
    '2. Describe a situation where you disagreed with a technical decision your team or manager made. How did you handle it, and what was the outcome?',
    '3. Tell me about the most complex technical project you have owned end-to-end. What were the biggest challenges and how did you overcome them?',
    '4. Describe a time you had to influence a team decision without formal authority. What was your approach?',
    '5. Tell me about a significant professional mistake you made. What happened, what did you learn, and how did you apply that lesson?',
    '6. Describe how you have helped a junior engineer grow. What specific steps did you take and what was the result?',
    '7. Tell me about a time when requirements changed significantly mid-project. How did you adapt?',
  ];
}

function getFrontendArchitectureQuestions(): string[] {
  return [
    '1. Walk me through how you would architect a real-time analytics dashboard that needs to update every 5 seconds and support 50,000 concurrent users.',
    '2. How would you design a design system shared across 5 product teams with different tech stacks?',
    '3. Describe your approach to state management in a large-scale Angular or React application. When do you use local state vs global state vs server state?',
    '4. How do you approach accessibility in a component library? What does your process look like from design to deployment?',
    '5. Walk me through how you would structure a frontend codebase for a team of 15 engineers to minimize conflicts and maximize reusability.',
    '6. How do you optimize Core Web Vitals (LCP, CLS, FID/INP) in a heavily dynamic single-page application?',
    '7. Describe your testing strategy for a frontend architecture. What do you test, at what level, and why?',
  ];
}

function getProjectDeepDiveQuestions(): string[] {
  return [
    '1. Tell me about the most technically complex or impactful project you have worked on in the last 2 years. Start with the business problem and walk me through the architecture.',
    '2. What were the most significant technical decisions you made on this project? What alternatives did you consider and why did you reject them?',
    '3. What was the hardest technical problem you had to solve? Walk me through your debugging and problem-solving process.',
    '4. What were the measurable outcomes of this project? How did you define and track success?',
    '5. How did you collaborate with your team on architectural decisions? Were there any significant disagreements?',
    '6. Looking back, what would you do differently if you could start this project over?',
    '7. How would you improve the architecture today if given the opportunity and resources?',
  ];
}

function getCodingQuestions(): string[] {
  return [
    '1. Implement a debounce function in TypeScript that takes a function and a delay, and returns a debounced version of that function.',
    '2. Given an array of integers, find all pairs that sum to a target value. Optimize for time complexity.',
    '3. Implement a simple event emitter class with on(), off(), and emit() methods in TypeScript.',
    '4. Write a function that deep-clones a JavaScript object, handling nested objects, arrays, and primitive values.',
    '5. Implement a Promise.all polyfill that takes an array of promises and resolves when all resolve, or rejects when any reject.',
    '6. Given a string, find the longest substring without repeating characters. Explain your time and space complexity.',
    '7. Implement an LRU (Least Recently Used) cache with get() and put() methods. Target O(1) for both operations.',
  ];
}

function getAIAssistedQuestions(): string[] {
  return [
    '1. How do you use AI coding tools in your daily workflow? Walk me through a recent example where AI helped you solve a real problem.',
    '2. Describe a time when AI-generated code had a bug or gave you incorrect output. How did you catch it and what was your validation process?',
    '3. What information would you never put into an AI tool prompt, and why? How do you handle proprietary or sensitive code?',
    '4. How do you approach reviewing AI-generated code before committing it? What does your security review look like?',
    '5. A junior engineer on your team is using AI for everything and their skills are not growing. How do you handle this?',
    '6. When would you explicitly NOT use AI-generated code in a production feature? What are your lines?',
    '7. How do you construct prompts to get consistently better code output from AI tools? Walk me through your prompting strategy.',
  ];
}

function getMockQuestions(mode: string): string[] {
  switch (mode) {
    case 'behavioral':
      return getBehavioralQuestions();
    case 'frontend-architecture':
      return getFrontendArchitectureQuestions();
    case 'project-deep-dive':
      return getProjectDeepDiveQuestions();
    case 'coding':
      return getCodingQuestions();
    case 'ai-assisted-engineering':
      return getAIAssistedQuestions();
    default:
      return getBehavioralQuestions();
  }
}

function generateMockSession(track: string, mode: string, durationMinutes: number): string {
  const questions = getMockQuestions(mode);
  const date = new Date().toISOString().split('T')[0];

  return `# Interview Session: ${track} / ${mode}

**Generated**: ${date}
**Duration**: ${durationMinutes} minutes
**Provider**: Mock (no API key required)
**Track**: ${track}
**Mode**: ${mode}

---

## Interview Questions

${questions.join('\n\n')}

---

## Follow-Up Questions

For each question above, be prepared for the interviewer to ask:
- "Can you be more specific? Give me a concrete example."
- "What was the measurable impact or outcome?"
- "What would you do differently today?"
- "How did the team respond?"
- "What did you learn from that experience?"

---

## Session Notes

This is a practice session. Focus on:
1. Using specific, real examples from your experience
2. Quantifying your impact with numbers when possible
3. Using "I" statements to show personal ownership
4. Structuring answers with clear Situation → Task → Action → Result
5. Demonstrating self-awareness and continuous learning

---

## Scorecard

### Overall Performance
| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Communication Clarity | 4 | Clear and structured delivery |
| Technical Depth | 3 | Good fundamentals, room for more specificity |
| Ownership and Accountability | 4 | Strong ownership language throughout |
| STAR Structure | 3 | Good structure, results could be more quantified |
| Seniority Signal | 4 | Demonstrated appropriate senior-level thinking |

**Overall Score**: 18/25
**Hire Signal**: Lean Hire → Hire with additional technical depth

---

## Feedback

### Strengths
- Strong communication and clear storytelling
- Demonstrated ownership without blame-shifting
- Good use of specific examples from past work
- Showed learning mindset when discussing failures

### Areas for Improvement
- Quantify outcomes more precisely (e.g., "reduced load time by 40%" not "made it faster")
- In system design answers, proactively mention scalability considerations
- When describing team conflicts, be more specific about the resolution mechanism
- Practice the STAR format for the Result component — it's often the weakest part

### Study Plan Focus Areas
1. Review quantitative impact framing — have 5 metrics from past projects memorized
2. Practice behavioral answers out loud with a timer (2 minutes max per answer)
3. Prepare 3 stories that can flex across multiple question types
4. Rehearse the "failure" story — it's commonly asked and candidates often under-prepare it

---

## Improved Answer Example

**Question**: Tell me about a time you led a significant technical project.

**Before**: "I led the rebuild of our dashboard. It was complex because we had a lot of legacy code. We worked together as a team and eventually shipped it. The users were happy with the new version."

**After**: "In Q2 2024 at Fintech Corp, I led the full rebuild of our core data dashboard — a 3-month project with 2 other engineers. The legacy Angular.js codebase had 8-second load times and was blocking our product roadmap. I proposed a full rewrite using Angular 17 with signals-based state and lazy-loaded feature modules. I owned the architecture decision, wrote the migration plan, and coordinated weekly syncs with product and design. We shipped on time and reduced average load time from 8.2s to 1.1s (87% improvement). Monthly active users increased 23% in the following quarter. I also wrote a post-mortem on our testing gaps and introduced Playwright e2e tests to prevent regressions going forward."

---

## Ethics Notice

This session was generated for **practice purposes only**.

InterviewOps is a pre-interview preparation tool. It is NOT intended for:
- Use during a live interview
- Real-time answer injection
- Hidden screen overlays
- Any form of live cheating or impersonation

Use this feedback to practice, improve, and build genuine confidence before your interview.`;
}

function generateMockPrepPlan(prompt: string): string {
  const date = new Date().toISOString().split('T')[0];

  return `# Interview Preparation Plan

**Generated**: ${date}
**Provider**: Mock (no API key required)

---

## Executive Summary

Based on your resume and target role, here is a focused 2-week preparation plan. Your background shows strong frontend engineering experience. Key focus areas are: quantifying past impact, practicing behavioral storytelling, and deepening system design fundamentals.

---

## Week 1: Foundation

### Day 1–2: Behavioral Stories
- Write 5 STAR-format stories from your last 2 years
- One for each category: leadership, conflict, failure, collaboration, technical decision
- Time each story to 90–120 seconds
- Quantify every result with real numbers

### Day 3–4: Technical Depth
- Review Angular signals, computed, and effect — be ready to explain tradeoffs vs RxJS
- Review RxJS operators: switchMap vs mergeMap vs exhaustMap
- Practice OnPush change detection explanation with a whiteboard example

### Day 5–7: System Design
- Practice designing 2 systems: a notification system and a real-time dashboard
- Focus on: requirements gathering, data modeling, scalability, reliability

---

## Week 2: Practice

### Day 8–10: Mock Interviews
- Run 2 behavioral mock interviews using InterviewOps
- Run 1 frontend architecture session
- Review feedback and improve weak answers

### Day 11–12: Coding Practice
- Solve 5 frontend-specific problems: debounce, event emitter, deep clone, LRU cache
- Practice explaining complexity aloud
- Review 3 LeetCode medium problems in your weakest data structure area

### Day 13–14: Final Prep
- Research the company: product, engineering blog, recent news
- Prepare 5 thoughtful questions to ask the interviewer
- Do a full 45-minute mock interview without pausing
- Review your resume for quantifiable metrics to highlight

---

## Key Resources

### Behavioral
- "The STAR Interview Method" — prepare written answers first
- Lenny's Podcast — engineering leadership stories
- Staff Eng by Will Larson — for senior-level leadership framing

### Technical
- Angular Signals documentation (angular.dev)
- RxJS operator reference (rxjs.dev)
- Frontend Masters — Advanced Angular or React courses
- "Designing Data-Intensive Applications" — for system design depth

### Coding
- LeetCode — Arrays, Hash Maps, Sliding Window (top 20)
- Frontend-specific: debounce, throttle, deep clone, event emitter
- JavaScript.info — review closures, prototypes, async/await

---

## Candidate Strengths to Highlight
- 8 years of frontend engineering experience
- Direct experience with AI product integration
- Angular and React cross-expertise
- Recent signals adoption (modern Angular)

## Gap Areas to Address
- Quantify the impact of past projects more specifically
- Expand system design vocabulary for distributed systems
- Prepare concrete mentoring/leadership stories

---

## Ethics Notice

This plan was generated for **practice purposes only**. All preparation should represent genuine skills and real experience. InterviewOps does not support fabricating answers, real-time assistance, or any form of interview deception.`;
}

// --- Mock Provider ---

export class MockProvider implements InterviewProvider {
  readonly name = 'mock';

  isAvailable(): boolean {
    return true;
  }

  async generateCompletion(prompt: string, _systemPrompt?: string): Promise<ProviderResponse> {
    const { track, mode } = detectTrackAndMode(prompt);

    let content: string;

    if (prompt.toLowerCase().includes('prep plan') || prompt.toLowerCase().includes('preparation plan')) {
      content = generateMockPrepPlan(prompt);
    } else {
      const durationMatch = prompt.match(/(\d+)\s*minutes?/i);
      const duration = durationMatch ? parseInt(durationMatch[1], 10) : 45;
      content = generateMockSession(track, mode, duration);
    }

    return {
      content,
      model: 'mock-v1',
      provider: 'mock',
    };
  }
}
