---
sidebar_position: 1
title: Introduction
description: What is InterviewOps and why it exists.
---

# Introduction

**InterviewOps** is a local-first, open-source AI interview practice CLI for developers.

It helps you simulate interviews, review your answers with structured rubrics, generate
improved answer examples, and build focused study plans — all from your terminal, using
your own AI provider.

## Why InterviewOps exists

Most interview prep tools are either:

- Generic question banks with no feedback
- SaaS platforms that require accounts and monthly fees
- ChatGPT wrappers with no structure, rubrics, or seniority calibration

InterviewOps is different. It is:

- **Local-first** — runs on your machine, no hosted backend
- **Rubric-based** — structured feedback, not just raw AI opinions
- **Role-specific** — 9 tracks calibrated to real engineering roles
- **Mode-specific** — 13 interview types from behavioral to AI engineering
- **Ethical** — no live interview assistance, no hidden overlays, no deception

## What it generates

Every simulation run produces a complete session packet:

| File | Description |
|---|---|
| `session.md` | Full session content |
| `questions.md` | Interview questions and follow-ups |
| `scorecard.md` | Rubric-based scores (1–5 per dimension) |
| `feedback.md` | Strengths, improvements, hire signal |
| `improved-answers.md` | Before/after answer examples |
| `study-plan.md` | 7-day and 14-day prep plan |
| `ethics-notice.md` | Practice-only statement (always present) |
| `metadata.json` | Track, mode, provider, model, date |

## Who it is for

- Frontend engineers preparing for senior roles
- AI engineers preparing for agentic or AI product interviews
- Angular and React developers
- Junior developers building fundamentals
- Career switchers and job seekers
- DevRel candidates and engineering managers

## Local-first philosophy

InterviewOps stores everything locally. No account. No telemetry. No server.

Your resume, job descriptions, session outputs, and API keys never leave your machine
(unless you are using a non-mock AI provider, in which case prompts are sent to that
provider's API — see [Providers](./providers.md)).

## Ethical prep only

InterviewOps is for **preparation before interviews**, not secret assistance during them.

See [Ethics](./ethics.md) for the full policy.
