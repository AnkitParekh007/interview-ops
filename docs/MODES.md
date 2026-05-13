# Interview Modes

Interview modes define the type of interview you're simulating. Each mode changes the questions generated, the rubric used, and the evaluation approach.

List all modes:

```bash
npm run modes
```

---

## Available Modes

### `recruiter-screen`

Simulates a 20–30 minute recruiter or sourcer call. Evaluates: role fit clarity, motivation authenticity, compensation and availability readiness, communication quality. Questions focus on why you're looking, what you've done at a high level, and whether you're a plausible fit for the role.

---

### `behavioral`

STAR-format behavioral interview. Evaluates: leadership, conflict resolution, ownership, failure/learning, collaboration, growth mindset. Questions are realistic and targeted to seniority — senior tracks get harder questions requiring team influence and systemic impact.

---

### `coding`

Technical coding interview simulation. Evaluates: problem understanding, approach quality, code correctness, complexity awareness, edge case handling, testing, and the ability to communicate while coding. Questions cover frontend-relevant algorithms, TypeScript-specific patterns, and common data structure problems.

---

### `system-design`

High-level system design discussion. Evaluates: requirements gathering, architecture clarity, data modeling, scalability thinking, reliability and fault tolerance, API design, and tradeoff articulation. Suitable for senior and staff-level candidates.

---

### `frontend-architecture`

Frontend-specific architecture discussion. Evaluates: component design, state management strategy, performance optimization approach, accessibility plan, testing strategy, design system thinking, and API integration patterns. Common at senior+ levels.

---

### `angular`

Angular-specific technical interview. Covers: standalone components, Angular Signals (signal, computed, effect), RxJS operators and their tradeoffs, change detection (Default vs OnPush), reactive forms vs template-driven forms, routing with lazy loading, dependency injection patterns, and performance optimization.

---

### `react`

React-specific technical interview. Covers: hooks (useState, useEffect, useCallback, useMemo, useRef, custom hooks), state management (React Query, Zustand, Context, Redux), React Server Components, Suspense, performance optimization (memo, lazy, code splitting), and testing with React Testing Library.

---

### `project-deep-dive`

Deep-dive into a past project. Evaluates: storytelling structure, technical depth, decision rationale, metrics and impact, team dynamics and collaboration, and lessons learned. Interviewers probe for ownership, influence, and seniority signal.

---

### `debugging`

Structured debugging interview. Evaluates: debugging process (how you approach an unknown problem), hypothesis formation, log and tool usage, reproduction steps, root cause analysis, and fix validation. Tests systematic thinking under uncertainty.

---

### `code-review`

Code review interview. Evaluates: ability to read unfamiliar code, identify risks (correctness, security, performance), suggest improvements, assess maintainability, and communicate feedback constructively.

---

### `ai-assisted-engineering`

Interview about using AI tools in engineering. Evaluates: how you use AI coding tools ethically and effectively, prompting strategy, output validation, debugging AI-generated code, privacy and security awareness, and knowing when NOT to use AI. Increasingly common at companies that ship AI-powered products.

---

### `take-home-review`

Review of a take-home assignment. Evaluates: code quality, README quality, architecture decisions, test coverage, edge case handling, and how well you present and defend your work in a walkthrough.

---

### `candidate-questions`

Practice asking questions to the interviewer. Generates a list of thoughtful questions to ask about the team, technical culture, growth opportunities, product direction, and role expectations — with guidance on what makes each question strong.

---

## Using a Mode

```bash
npm run start -- --track <track> --mode <mode>
```

Examples:

```bash
npm run start -- --track senior-frontend --mode behavioral
npm run start -- --track angular-developer --mode angular
npm run start -- --track ai-agentic-engineer --mode ai-assisted-engineering
npm run start -- --track senior-frontend --mode candidate-questions
```

---

## Adding a Mode

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to add a new mode.
