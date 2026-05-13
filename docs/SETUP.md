# Setup Guide

## Requirements

- Node.js 20 or higher
- npm 9 or higher

Check your versions:
```bash
node --version  # Should be v20+
npm --version   # Should be 9+
```

## Installation

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
```

## Initialize Your Workspace

```bash
npm run init
```

This creates:
- `config/interviewops.yml` — your configuration
- `input/` — for your resume and job description
- `output/` — where sessions are written
- `.env` — from `.env.example` if it doesn't exist

## Configure Your Provider

Edit `.env`:

```
# Use mock provider (no API key required — default)
INTERVIEWOPS_PROVIDER=mock

# Or use OpenAI
INTERVIEWOPS_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini

# Or use Anthropic
INTERVIEWOPS_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

## Verify Your Setup

```bash
npm run doctor
```

Expected output:
```
InterviewOps Doctor
===================
  OK    Node.js v22.x
  OK    package.json
  OK    config/interviewops.yml
  OK    .env
  OK    input/
  OK    output/
  OK    tracks/ (9 tracks found)
  OK    modes/ (13 modes found)
  OK    rubrics/ (9 rubrics found)
  OK    provider: mock (no API key required)
```

## Run the Demo

```bash
npm run demo
```

This runs a full end-to-end demo using the mock provider, generates a session, and verifies the output.
