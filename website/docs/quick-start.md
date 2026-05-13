---
sidebar_position: 2
title: Quick Start
description: Get InterviewOps running in under 2 minutes.
---

# Quick Start

Get InterviewOps running in under 2 minutes. No API key required.

## 1. Clone and install

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
```

## 2. Set up your environment

```bash
cp .env.example .env
```

The default provider is `mock` — no API key needed.

## 3. Initialize your workspace

```bash
npm run init
```

This creates `config/interviewops.yml`, `input/`, `output/`, and confirms your setup.

## 4. Run the doctor check

```bash
npm run doctor
```

Expected output:

```
InterviewOps Doctor
===================
  OK    Node.js v20+
  OK    package.json
  OK    config/interviewops.yml
  OK    input/
  OK    output/
  OK    tracks/ (9 tracks found)
  OK    modes/ (13 modes found)
  OK    rubrics/ (9 rubrics found)
  OK    provider: mock (no API key required)
```

## 5. Run the demo

```bash
npm run demo
```

This runs a full end-to-end simulation using the mock provider and writes a complete
session to `output/sessions/`.

## Next steps

- [CLI Commands](./cli-commands.md) — all available commands
- [Tracks](./tracks.md) — choose your role track
- [Modes](./modes.md) — choose your interview mode
- [Providers](./providers.md) — switch to OpenAI, Anthropic, or Gemini
