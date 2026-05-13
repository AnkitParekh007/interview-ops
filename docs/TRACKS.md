# Interview Tracks

Interview tracks define the role you're preparing for. Each track sets the seniority expectations, skill focus, and evaluation criteria used during a session.

List all tracks:

```bash
npm run tracks
```

---

## Available Tracks

### `junior-frontend`

For developers with 0–2 years of experience. Focus on fundamentals: HTML/CSS/JavaScript, basic React or Angular, version control, debugging, and learning mindset. Expectations are calibrated for early-career engineers — interviewers look for curiosity and growth potential, not deep architectural knowledge.

---

### `senior-frontend`

For engineers with 5–10 years of experience. High expectations: component architecture, state management at scale, performance optimization (Core Web Vitals), accessibility (WCAG), design system ownership, TypeScript expertise, testing strategy, and the ability to influence technical direction across a team.

Recommended modes: `behavioral`, `frontend-architecture`, `project-deep-dive`, `coding`, `system-design`

---

### `angular-developer`

For Angular specialists. Covers the full modern Angular stack: standalone components, Signals (computed, effect), RxJS operators (switchMap, mergeMap, exhaustMap), OnPush change detection, reactive and template-driven forms, routing with lazy loading, dependency injection patterns, Angular Material, and NgRx or Signals-based state.

Recommended modes: `angular`, `frontend-architecture`, `behavioral`, `project-deep-dive`

---

### `react-developer`

For React specialists. Covers: functional components, hooks (useState, useEffect, useCallback, useMemo, useRef), React Query or SWR for server state, Zustand or Redux for client state, React Server Components (Next.js), performance optimization (memo, lazy), accessibility, and testing with React Testing Library.

Recommended modes: `react`, `frontend-architecture`, `behavioral`, `coding`

---

### `fullstack-developer`

For engineers who own both frontend and backend. Covers: REST and GraphQL API design, database schema design, authentication/authorization patterns, deployment pipelines, Docker basics, cloud fundamentals (AWS/GCP/Vercel), and the ability to reason about full system behavior.

Recommended modes: `system-design`, `coding`, `behavioral`, `project-deep-dive`

---

### `ai-frontend-engineer`

For frontend engineers building AI-powered products. Covers: streaming API integration, tool-call rendering, loading state patterns for LLM responses, prompt construction from the UI layer, AI SDK usage (Vercel AI SDK, Anthropic SDK), and designing AI experiences that are honest about capability and uncertainty.

Recommended modes: `ai-assisted-engineering`, `frontend-architecture`, `behavioral`, `project-deep-dive`

---

### `ai-agentic-engineer`

For engineers building AI agent systems. Covers: agent architectures (ReAct, plan-and-execute), tool use and function calling, multi-agent orchestration, RAG pipeline design, prompt engineering, output validation, safety and guardrails, MCP (Model Context Protocol), and observability for agent systems.

Recommended modes: `ai-assisted-engineering`, `system-design`, `behavioral`, `coding`

---

### `devrel-engineer`

For developer relations engineers. Covers: technical communication, live demo skills, documentation quality, community building, content creation (blog posts, videos, talks), open-source contribution strategy, and the ability to represent both developer needs to the product team and product capabilities to the developer community.

Recommended modes: `behavioral`, `project-deep-dive`, `candidate-questions`

---

### `engineering-manager`

For engineering managers. Covers: team health, hiring, performance management, delivery, technical strategy, cross-functional collaboration, incident response, roadmap communication, 1:1 effectiveness, and the balance between hands-on technical credibility and people leadership.

Recommended modes: `behavioral`, `project-deep-dive`, `system-design`

---

## Using a Track

```bash
npm run start -- --track <track-name> --mode <mode-name>
```

Example:

```bash
npm run start -- --track angular-developer --mode frontend-architecture
npm run start -- --track ai-agentic-engineer --mode ai-assisted-engineering
```

---

## Adding a Track

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to add a new track.
