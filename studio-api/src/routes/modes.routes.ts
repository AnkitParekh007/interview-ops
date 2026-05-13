import { Router } from 'express';

const router = Router();

const modes = [
  { id: 'recruiter-screen', name: 'Recruiter Screen', icon: '\uD83D\uDCDE', description: 'Initial recruiter phone screen practice.' },
  { id: 'behavioral', name: 'Behavioral', icon: '\uD83D\uDDE3\uFE0F', description: 'Behavioral interview using the STAR framework.' },
  { id: 'coding', name: 'Coding', icon: '\uD83D\uDCBB', description: 'Live coding and algorithm problem solving.' },
  { id: 'system-design', name: 'System Design', icon: '\uD83C\uDFD7\uFE0F', description: 'Large-scale system design and architecture.' },
  { id: 'frontend-architecture', name: 'Frontend Architecture', icon: '\uD83C\uDFA8', description: 'Frontend architecture, state management, and performance.' },
  { id: 'angular', name: 'Angular', icon: '\uD83D\uDD34', description: 'Angular-specific technical interview.' },
  { id: 'react', name: 'React', icon: '\u269B\uFE0F', description: 'React-specific technical interview.' },
  { id: 'project-deep-dive', name: 'Project Deep Dive', icon: '\uD83D\uDD0D', description: 'Walk through a past project in depth.' },
  { id: 'debugging', name: 'Debugging', icon: '\uD83D\uDC1B', description: 'Debugging scenarios and root cause analysis.' },
  { id: 'code-review', name: 'Code Review', icon: '\uD83D\uDD0E', description: 'Review code for quality, performance, and correctness.' },
  { id: 'ai-assisted-engineering', name: 'AI-Assisted Engineering', icon: '\uD83E\uDD16', description: 'AI-assisted development practices and evaluation.' },
  { id: 'take-home-review', name: 'Take-Home Review', icon: '\uD83C\uDFE0', description: 'Present and defend a take-home assignment.' },
  { id: 'candidate-questions', name: 'Candidate Questions', icon: '\u2753', description: 'Practice asking insightful questions to interviewers.' },
];

router.get('/modes', (_req, res) => {
  res.json(modes);
});

export default router;
