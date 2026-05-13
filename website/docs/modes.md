---
sidebar_position: 8
title: Modes
description: Interview modes available in InterviewOps.
---

# Modes

Interview modes define the type of interview you're simulating.

```bash
npm run modes
```

## Available modes

| Mode | Description |
|---|---|
| `recruiter-screen` | Role fit, motivation, compensation readiness, communication |
| `behavioral` | STAR answers, leadership, conflict, ownership, failure/learning |
| `coding` | Problem-solving, complexity, edge cases, testing, communication |
| `system-design` | Requirements, architecture, data modeling, scalability, tradeoffs |
| `frontend-architecture` | Component design, state, performance, accessibility, design systems |
| `angular` | Signals, RxJS, change detection, forms, routing, DI |
| `react` | Hooks, state, effects, performance, server components |
| `project-deep-dive` | Past project storytelling, architecture decisions, metrics |
| `debugging` | Debugging process, hypothesis, root cause, fix validation |
| `code-review` | Reading code, finding risks, suggesting improvements |
| `ai-assisted-engineering` | AI ethics, prompting, output validation, debugging AI code |
| `take-home-review` | Code quality, README, architecture, tests |
| `candidate-questions` | Practice questions to ask the interviewer |

## Using a mode

```bash
npm run start -- --track <track> --mode <mode>
```

Examples:

```bash
npm run start -- --track senior-frontend --mode system-design
npm run start -- --track angular-developer --mode angular
npm run start -- --track ai-agentic-engineer --mode ai-assisted-engineering
npm run start -- --track senior-frontend --mode candidate-questions
```

## Adding a mode

See [Contributing](./contributing.md).
