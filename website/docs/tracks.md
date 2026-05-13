---
sidebar_position: 7
title: Tracks
description: Interview tracks available in InterviewOps.
---

# Tracks

Interview tracks define the role you're preparing for. Each track sets the
seniority expectations, skill focus areas, and evaluation criteria.

```bash
npm run tracks
```

## Available tracks

| Track | Description |
|---|---|
| `ai-agentic-engineer` | Agentic AI engineering: agents, RAG, tools, orchestration, evals |
| `ai-frontend-engineer` | Frontend engineers building AI-powered products |
| `angular-developer` | Angular: Signals, RxJS, change detection, DI, routing, forms |
| `react-developer` | React: hooks, state, performance, server components |
| `senior-frontend` | Senior frontend architecture, leadership, platform ownership |
| `junior-frontend` | Junior developer fundamentals and growth mindset |
| `fullstack-developer` | Frontend + backend + deployment + cloud basics |
| `devrel-engineer` | Developer advocacy, technical communication, community |
| `engineering-manager` | Leadership, hiring, delivery, people management |

## Using a track

```bash
npm run start -- --track <track-name> --mode <mode-name>
```

Examples:

```bash
npm run start -- --track ai-agentic-engineer --mode ai-assisted-engineering
npm run start -- --track angular-developer --mode frontend-architecture
npm run start -- --track senior-frontend --mode project-deep-dive
```

## Track files

Track definitions live in `tracks/`. Each file defines:

- Who the track is for
- Expected skills
- Interview focus areas
- Common rounds
- Common weak spots
- Seniority expectations
- Example question categories
- Recommended modes

## Adding a track

See [Contributing](./contributing.md).
