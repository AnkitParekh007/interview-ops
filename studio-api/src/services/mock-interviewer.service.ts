import type { InterviewScorecard, StudyPlan, CandidateProfile } from '../models/studio.models.js';

interface ModePattern {
  openingQuestion: string;
  feedbackTemplate: (count: number) => string;
  followUpQuestions: string[];
}

const modePatterns: Record<string, ModePattern> = {
  behavioral: {
    openingQuestion:
      'Tell me about a time when you faced a significant technical challenge on a project. How did you approach it, and what was the outcome?',
    feedbackTemplate: (count) =>
      count <= 2
        ? "Good start. I'd like you to use the STAR format more explicitly — Situation, Task, Action, Result. Can you restructure your answer with clearer separation of each part?"
        : "Your STAR structure is improving. Let's go deeper — what metrics or measurable outcomes can you share? Specificity makes behavioral answers much stronger.",
    followUpQuestions: [
      'Describe a situation where you had to influence a decision without having direct authority.',
      'Tell me about a time you received critical feedback. How did you respond?',
      'Walk me through a project where you had to balance competing priorities from multiple stakeholders.',
    ],
  },
  coding: {
    openingQuestion:
      'Given an array of integers, write a function that finds the longest consecutive sequence. What is your approach, and what is the time and space complexity?',
    feedbackTemplate: (count) =>
      count <= 2
        ? "Let's talk about your approach. What data structure would give you optimal lookup time here? Think about the tradeoff between sorting vs. hashing."
        : "Good thinking. Now let's consider edge cases — what happens with an empty array? Duplicates? Very large inputs? How would you handle those?",
    followUpQuestions: [
      'How would you design a LRU cache? Walk me through the data structures and operations.',
      'Implement a function to serialize and deserialize a binary tree. Explain your encoding strategy.',
      'Write a function that finds all permutations of a string. What is the time complexity?',
    ],
  },
  'system-design': {
    openingQuestion:
      'Design a URL shortening service like bit.ly. Start with requirements gathering — what questions would you ask before diving into the design?',
    feedbackTemplate: (count) =>
      count <= 2
        ? 'Good requirements gathering. Now walk me through the high-level architecture — what are the core components, and how do they interact? Think about read vs. write patterns.'
        : "Let's discuss tradeoffs. How would you handle scalability? What happens when you need to serve 10x the current traffic? What are the bottlenecks?",
    followUpQuestions: [
      'How would you design a real-time chat system that supports millions of concurrent users?',
      'Design a notification system that handles email, push, and SMS. How do you ensure reliability?',
      'Walk me through designing a distributed rate limiter. What consistency guarantees do you need?',
    ],
  },
  'frontend-architecture': {
    openingQuestion:
      'You are tasked with building a large-scale dashboard application. How would you approach the frontend architecture? Consider state management, performance, and team scalability.',
    feedbackTemplate: (count) =>
      count <= 2
        ? 'Good overview. Let me push on state management — how do you decide what state lives in the component vs. a global store? How do you handle derived state?'
        : "Let's talk about performance at scale. How would you handle lazy loading, virtualization, and bundle optimization? What metrics would you track?",
    followUpQuestions: [
      'How would you architect a micro-frontend system? What are the tradeoffs vs. a monolith?',
      'Design an accessible component library. What patterns ensure consistency and a11y compliance?',
      'How would you implement real-time collaborative editing in a web application?',
    ],
  },
  angular: {
    openingQuestion:
      'Explain how Angular change detection works. When would you use OnPush vs. Default, and how do signals change the picture in Angular 17+?',
    feedbackTemplate: (count) =>
      count <= 2
        ? "Good foundation. Let's dive deeper into RxJS patterns — when would you use switchMap vs. mergeMap vs. concatMap? Give me a concrete scenario for each."
        : "Let's discuss dependency injection. How does Angular's hierarchical injector work? When would you use providedIn: 'root' vs. component-level providers?",
    followUpQuestions: [
      'How do Angular signals differ from RxJS observables? When would you choose one over the other?',
      'Walk me through how you would optimize a large Angular application with slow initial load times.',
      'Explain the Angular router — how do guards, resolvers, and lazy loading work together?',
    ],
  },
  react: {
    openingQuestion:
      'Explain the React rendering lifecycle. How do hooks like useEffect, useMemo, and useCallback affect rendering performance?',
    feedbackTemplate: (count) =>
      count <= 2
        ? "Good overview. Let's go deeper — when does React actually re-render a component? How does React.memo work, and when is it a premature optimization?"
        : "Let's discuss state management at scale. Compare useState, useReducer, Context, and external stores like Zustand or Redux Toolkit. When would you use each?",
    followUpQuestions: [
      'How would you implement a custom hook for data fetching with caching, error handling, and loading states?',
      'Explain React Server Components. How do they change the architecture of a React application?',
      'Walk me through how you would handle forms in React — controlled vs. uncontrolled, validation strategies.',
    ],
  },
  'ai-assisted-engineering': {
    openingQuestion:
      'How do you evaluate the quality of AI-generated code? What validation steps do you take before committing AI-assisted code to production?',
    feedbackTemplate: (count) =>
      count <= 2
        ? 'Good start. How do you handle prompt engineering for complex tasks? What strategies do you use to get better outputs from LLMs in a development workflow?'
        : "Let's discuss safety and evaluation. How do you ensure AI-generated code doesn't introduce security vulnerabilities? What testing strategies do you use?",
    followUpQuestions: [
      'How would you build a CI/CD pipeline that incorporates AI-assisted code review?',
      'Discuss the ethics of AI-assisted development. When should you disclose AI assistance?',
      'How do you handle hallucinations in AI-generated technical documentation?',
    ],
  },
  'project-deep-dive': {
    openingQuestion:
      'Walk me through the most impactful project you have worked on. What was your specific role, and what decisions did you own?',
    feedbackTemplate: (count) =>
      count <= 2
        ? "Good context. Let's talk about metrics — what was the measurable impact? How did you track success? What would you do differently with hindsight?"
        : "Let's discuss technical decisions. What were the key architectural choices, and what tradeoffs did you consider? Were there any decisions you would reverse?",
    followUpQuestions: [
      'Tell me about a technical decision on this project that you debated with your team. How did you resolve it?',
      'What was the hardest bug you encountered on this project? Walk me through the debugging process.',
      'How did you handle scope creep or changing requirements mid-project?',
    ],
  },
  'recruiter-screen': {
    openingQuestion:
      'Tell me about yourself and what you are looking for in your next role. What excites you about this opportunity?',
    feedbackTemplate: (count) =>
      count <= 2
        ? 'Good introduction. Can you be more specific about your achievements? Quantify your impact where possible — numbers and percentages make your story more compelling.'
        : "Strong narrative. Let's practice the salary/expectations question — how would you handle 'What are your compensation expectations?'",
    followUpQuestions: [
      'Why are you leaving your current position?',
      'What do you know about our company and this role?',
      'Where do you see yourself in 3-5 years?',
    ],
  },
  debugging: {
    openingQuestion:
      'You receive a report that a production API endpoint is returning 500 errors intermittently. Walk me through your debugging process step by step.',
    feedbackTemplate: (count) =>
      count <= 2
        ? 'Good initial approach. What tools would you use to investigate? Think about logging, monitoring, and how to reproduce intermittent issues.'
        : "Let's discuss root cause analysis. How do you distinguish between symptoms and root causes? What frameworks do you use for post-incident reviews?",
    followUpQuestions: [
      'A user reports that the page loads slowly but only on certain devices. How do you investigate?',
      'Your CI pipeline starts failing with flaky tests. How do you systematically address test flakiness?',
      'A memory leak is causing your Node.js service to crash every few hours. Walk me through your approach.',
    ],
  },
  'code-review': {
    openingQuestion:
      'I am going to show you a code snippet. Please review it for correctness, performance, readability, and potential issues.\n\n```typescript\nasync function fetchUserData(ids: number[]) {\n  const results = [];\n  for (const id of ids) {\n    const res = await fetch(`/api/users/${id}`);\n    const data = await res.json();\n    results.push(data);\n  }\n  return results;\n}\n```\n\nWhat issues do you see?',
    feedbackTemplate: (count) =>
      count <= 2
        ? 'Good catch on the sequential fetching. What other issues do you see? Think about error handling, typing, and what happens with a large array of IDs.'
        : "Excellent analysis. Now, how would you refactor this? Show me the improved version and explain each change you'd make.",
    followUpQuestions: [
      'Review this React component for potential issues: a component that fetches data in useEffect without cleanup.',
      'What code review practices do you follow on your team? How do you balance thoroughness with velocity?',
      'How do you handle disagreements during code review? Give me an example.',
    ],
  },
  'take-home-review': {
    openingQuestion:
      'Walk me through a take-home project you have completed. What architectural decisions did you make, and why? How did you prioritize features within the time constraint?',
    feedbackTemplate: (count) =>
      count <= 2
        ? 'Good overview. Let me ask about testing — what was your testing strategy? What tradeoffs did you make given the time constraint?'
        : "Let's discuss what you would improve if you had more time. What shortcuts did you take, and how would you address them in production?",
    followUpQuestions: [
      'How did you handle error states and edge cases in your solution?',
      'What documentation did you include? How did you make your code reviewable?',
      'If you had to extend this project to support 100x the data, what would you change?',
    ],
  },
  'candidate-questions': {
    openingQuestion:
      'Now it is your turn to ask questions. What would you like to know about the team, the role, or the company? Practice asking insightful questions.',
    feedbackTemplate: (count) =>
      count <= 2
        ? "That's a reasonable question. Try to ask questions that show you've done research about the company. Questions about team culture, technical stack decisions, and growth opportunities tend to leave a strong impression."
        : 'Great questions. Remember to also ask about challenges — what are the hardest problems the team is working on? This shows genuine interest and helps you evaluate the role.',
    followUpQuestions: [
      'What other questions would you ask to evaluate whether this team is a good fit for you?',
      'How would you ask about work-life balance without sounding disengaged?',
      'What question would you ask to understand the company engineering culture?',
    ],
  },
};

const defaultPattern: ModePattern = {
  openingQuestion:
    'Let us begin. Tell me about your experience and what makes you a strong candidate for this role.',
  feedbackTemplate: (count) =>
    count <= 2
      ? 'Thank you for your answer. Can you provide more specific examples to support your points?'
      : 'Good detail. Let me ask a follow-up to explore this area further.',
  followUpQuestions: [
    'What is a technical concept you recently learned that excited you?',
    'How do you stay current with industry trends and best practices?',
    'Describe your ideal development workflow.',
  ],
};

function buildPersonalizedOpening(profile: CandidateProfile, mode: string): string | null {
  const parts: string[] = [];

  if (profile.resumeText) {
    const resumeSnippet = profile.resumeText.substring(0, 200);
    if (mode === 'behavioral') {
      parts.push(`Your background mentions ${extractKeySkill(resumeSnippet)}. Tell me about a specific time you worked on that — what was the situation, what was your role, and what was the measurable outcome?`);
    } else if (mode === 'coding') {
      parts.push(`Based on your experience with ${extractKeySkill(resumeSnippet)}, I would like to start with a problem relevant to your background. Given a stream of events, how would you design a function to efficiently aggregate and query them? Walk me through your approach.`);
    } else if (mode === 'system-design') {
      parts.push(`Your background mentions ${extractKeySkill(resumeSnippet)}. Let us design a system related to that experience. How would you architect a scalable version of a system you have worked on? Start with requirements.`);
    } else {
      parts.push(`Your background mentions ${extractKeySkill(resumeSnippet)}. Tell me about a specific time you improved load time or rendering performance — what was the bottleneck, how did you diagnose it, and what was the measurable impact?`);
    }
  }

  if (profile.jobDescriptionText && parts.length === 0) {
    parts.push(`I see you are preparing for a role that involves ${extractKeySkill(profile.jobDescriptionText.substring(0, 200))}. Let us focus on that area.`);
  }

  if (profile.targetCompany && parts.length > 0) {
    parts.push(`I will tailor my questions to what ${profile.targetCompany} typically looks for.`);
  }

  return parts.length > 0 ? parts.join(' ') : null;
}

function extractKeySkill(text: string): string {
  const keywords = [
    'frontend performance', 'React', 'Angular', 'Vue', 'Node.js', 'TypeScript',
    'system design', 'distributed systems', 'microservices', 'machine learning',
    'cloud infrastructure', 'AWS', 'GCP', 'API design', 'database optimization',
    'CI/CD', 'DevOps', 'security', 'testing', 'mobile development',
    'performance optimization', 'scalability', 'data pipelines',
  ];
  const lower = text.toLowerCase();
  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase())) {
      return kw;
    }
  }
  // Fall back to a generic phrase
  return 'relevant technical experience';
}

export function generateResponse(mode: string, messageCount: number, profile?: CandidateProfile): string {
  const pattern = modePatterns[mode] ?? defaultPattern;

  if (messageCount === 0) {
    // Try personalized opening if profile is available
    if (profile) {
      const personalized = buildPersonalizedOpening(profile, mode);
      if (personalized) {
        return personalized;
      }
    }
    return pattern.openingQuestion;
  }

  const feedback = pattern.feedbackTemplate(messageCount);
  const followUpIndex = Math.min(messageCount - 1, pattern.followUpQuestions.length - 1);
  const followUp = pattern.followUpQuestions[followUpIndex];

  if (followUp && messageCount <= pattern.followUpQuestions.length) {
    return `${feedback}\n\nNext question: ${followUp}`;
  }

  return `${feedback}\n\nWe have covered a lot of ground. Is there anything you would like to revisit or elaborate on?`;
}

export function generateScorecard(track: string, mode: string): {
  overallScore: number;
  maxScore: number;
  hireSignal: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'Lean No Hire' | 'No Hire';
  dimensions: { name: string; score: number; feedback: string }[];
} {
  const dimensions = getDimensionsForMode(mode);
  const overallScore = dimensions.reduce((sum, d) => sum + d.score, 0);
  const maxScore = dimensions.length * 5;

  let hireSignal: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'Lean No Hire' | 'No Hire';
  const ratio = overallScore / maxScore;
  if (ratio >= 0.85) hireSignal = 'Strong Hire';
  else if (ratio >= 0.7) hireSignal = 'Hire';
  else if (ratio >= 0.55) hireSignal = 'Lean Hire';
  else if (ratio >= 0.4) hireSignal = 'Lean No Hire';
  else hireSignal = 'No Hire';

  return { overallScore, maxScore, hireSignal, dimensions };
}

function getDimensionsForMode(mode: string): { name: string; score: number; feedback: string }[] {
  switch (mode) {
    case 'behavioral':
      return [
        { name: 'STAR Structure', score: 4, feedback: 'Good use of the STAR framework. Consider being more specific with the Result.' },
        { name: 'Communication Clarity', score: 3, feedback: 'Clear overall, but some answers could be more concise.' },
        { name: 'Self-Awareness', score: 4, feedback: 'Strong reflection on lessons learned.' },
        { name: 'Impact & Ownership', score: 3, feedback: 'Good examples of ownership. Quantify impact more.' },
        { name: 'Adaptability', score: 4, feedback: 'Demonstrated flexibility in challenging situations.' },
      ];
    case 'coding':
      return [
        { name: 'Problem Solving', score: 4, feedback: 'Strong approach to breaking down problems.' },
        { name: 'Code Quality', score: 3, feedback: 'Clean code, but consider edge cases more thoroughly.' },
        { name: 'Complexity Analysis', score: 4, feedback: 'Good understanding of time and space complexity.' },
        { name: 'Communication', score: 3, feedback: 'Explained thinking clearly but could narrate more.' },
        { name: 'Testing Mindset', score: 3, feedback: 'Consider discussing test cases earlier in your approach.' },
      ];
    case 'system-design':
      return [
        { name: 'Requirements Gathering', score: 4, feedback: 'Asked good clarifying questions upfront.' },
        { name: 'High-Level Design', score: 3, feedback: 'Solid architecture. Consider more component interaction detail.' },
        { name: 'Scalability', score: 3, feedback: 'Good awareness of scaling challenges. Discuss specific numbers.' },
        { name: 'Tradeoffs', score: 4, feedback: 'Excellent discussion of tradeoffs between approaches.' },
        { name: 'Technical Depth', score: 3, feedback: 'Go deeper on database choices and caching strategies.' },
      ];
    default:
      return [
        { name: 'Technical Knowledge', score: 4, feedback: 'Demonstrated strong technical understanding.' },
        { name: 'Communication', score: 3, feedback: 'Clear explanations. Work on conciseness.' },
        { name: 'Problem Solving', score: 4, feedback: 'Good analytical approach.' },
        { name: 'Depth of Experience', score: 3, feedback: 'Share more specific real-world examples.' },
        { name: 'Growth Mindset', score: 4, feedback: 'Showed genuine interest in learning and improvement.' },
      ];
  }
}

export function generateStudyPlan(): {
  sevenDayPlan: string[];
  fourteenDayPlan: string[];
} {
  return {
    sevenDayPlan: [
      'Day 1: Review core data structures — arrays, linked lists, hash maps, trees.',
      'Day 2: Practice 3 coding problems focused on your weakest area.',
      'Day 3: Study system design fundamentals — load balancing, caching, databases.',
      'Day 4: Prepare 5 behavioral stories using the STAR framework.',
      'Day 5: Mock interview — have a friend or AI simulate a 45-minute session.',
      'Day 6: Deep dive into your target company tech stack and recent blog posts.',
      'Day 7: Rest and light review. Prepare questions to ask your interviewers.',
    ],
    fourteenDayPlan: [
      'Week 1: Foundation — cover data structures, algorithms, and system design basics. Complete 10 practice problems.',
      'Week 2: Application — do 3 full mock interviews, refine behavioral stories, research the company deeply, and prepare a project deep-dive presentation.',
    ],
  };
}
