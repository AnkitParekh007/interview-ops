---
sidebar_position: 5
title: CLI Commands
description: Complete reference for all InterviewOps CLI commands.
---

# CLI Commands

All commands are available as npm scripts. Run `npm run <command>`.

## `init`

Initialize your workspace.

```bash
npm run init
```

Creates `config/interviewops.yml`, `input/`, `output/`, and `.env` if missing.

## `doctor`

Validate your setup.

```bash
npm run doctor
```

## `providers`

List available providers and API key status.

```bash
npm run providers
```

## `tracks`

List all available interview tracks.

```bash
npm run tracks
```

## `modes`

List all available interview modes.

```bash
npm run modes
```

## `start` / `simulate`

Run a full mock interview simulation. Both commands are equivalent.

```bash
npm run start -- --track <track> --mode <mode>
npm run simulate -- --track <track> --mode <mode>
```

Options:

| Option | Description | Default |
|---|---|---|
| `--track` / `-t` | Interview track | `senior-frontend` |
| `--mode` / `-m` | Interview mode | `behavioral` |
| `--duration` / `-d` | Duration in minutes | `45` |
| `--provider` / `-p` | Provider override | from `.env` |

Examples:

```bash
npm run start -- --track senior-frontend --mode behavioral
npm run start -- --track angular-developer --mode frontend-architecture --duration 60
npm run simulate -- --track ai-agentic-engineer --mode ai-assisted-engineering
```

## `plan`

Generate a personalized prep plan from your resume and job description.

```bash
npm run plan -- --resume input/resume.example.md --job input/job-description.example.md
```

## `answer`

Evaluate a written answer against a session's rubric.

```bash
npm run answer -- --session output/sessions/<session-id> --file input/answer.example.md
```

## `verify`

Validate the most recent session output.

```bash
npm run verify
```

## `examples`

Copy example input files to `input/`.

```bash
npm run examples
```

## `demo`

Run a full end-to-end demo using the mock provider.

```bash
npm run demo
```

## `test`

Run the test suite.

```bash
npm test
```

## `build`

Compile TypeScript.

```bash
npm run build
```
