import { Router } from 'express';

const router = Router();

const tracks = [
  { id: 'junior-frontend', name: 'Junior Frontend', icon: '\uD83C\uDF31', description: 'Entry-level frontend developer interview preparation.' },
  { id: 'senior-frontend', name: 'Senior Frontend', icon: '\uD83C\uDFD7\uFE0F', description: 'Senior frontend engineer with architecture and leadership focus.' },
  { id: 'angular-developer', name: 'Angular Developer', icon: '\uD83D\uDD34', description: 'Angular-specific deep dive covering signals, RxJS, and DI.' },
  { id: 'react-developer', name: 'React Developer', icon: '\u269B\uFE0F', description: 'React-specific practice including hooks, state, and rendering.' },
  { id: 'fullstack-developer', name: 'Fullstack Developer', icon: '\uD83D\uDD04', description: 'End-to-end development covering frontend, backend, and databases.' },
  { id: 'ai-frontend-engineer', name: 'AI Frontend Engineer', icon: '\uD83E\uDD16', description: 'Frontend engineering with AI integration and LLM-powered features.' },
  { id: 'ai-agentic-engineer', name: 'AI Agentic Engineer', icon: '\uD83E\uDDE0', description: 'Building AI agents, tool use, and agentic workflows.' },
  { id: 'devrel-engineer', name: 'DevRel Engineer', icon: '\uD83C\uDF10', description: 'Developer relations, advocacy, and community engineering.' },
  { id: 'engineering-manager', name: 'Engineering Manager', icon: '\uD83D\uDCCB', description: 'Engineering management covering team leadership and delivery.' },
];

router.get('/tracks', (_req, res) => {
  res.json(tracks);
});

export default router;
