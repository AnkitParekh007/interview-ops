---
sidebar_position: 13
title: Examples
description: Example use cases for InterviewOps.
---

# Examples

## Get example files

```bash
npm run examples
```

Copies `resume.example.md`, `job-description.example.md`, and `answer.example.md` to `input/`.

## Example: AI frontend engineer behavioral round

```bash
npm run start -- --track ai-frontend-engineer --mode behavioral
```

Generates questions about AI product leadership, streaming UI design, output validation,
prompt engineering decisions, and AI ethics in production.

## Example: Angular architecture round

```bash
npm run start -- --track angular-developer --mode frontend-architecture --duration 60
```

Generates questions about component architecture, Angular Signals vs RxJS tradeoffs,
OnPush change detection, lazy loading strategy, and design system integration.

## Example: System design round

```bash
npm run start -- --track senior-frontend --mode system-design
```

Generates a system design scenario (e.g. real-time dashboard, notification system)
with requirements, architecture discussion, data modeling, and scalability questions.

## Example: Project deep-dive

```bash
npm run start -- --track senior-frontend --mode project-deep-dive
```

Generates questions about past project storytelling, architecture decisions, measurable
outcomes, team collaboration, and lessons learned.

## Example: Prep plan from resume

```bash
npm run plan \
  -- --resume input/resume.example.md \
  --job input/job-description.example.md
```

Generates a 2-week personalized preparation plan based on the gap between your resume
and the target role requirements.

## Example: Evaluate a written answer

```bash
# After running a simulation:
npm run answer -- \
  --session output/sessions/$(ls output/sessions | tail -1) \
  --file input/answer.example.md
```
