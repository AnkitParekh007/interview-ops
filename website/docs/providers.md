---
sidebar_position: 6
title: Providers
description: AI provider setup for InterviewOps.
---

# Providers

InterviewOps supports four AI providers. Set your provider in `.env`.

## Mock (default)

```
INTERVIEWOPS_PROVIDER=mock
```

No API key required. Perfect for demos, CI, contributors, and offline use.

The mock provider generates realistic, deterministic interview content — real questions,
scorecard feedback, and study plans. Good enough to practice with.

## OpenAI

```
INTERVIEWOPS_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

Recommended models: `gpt-4.1`, `gpt-4.1-mini`, `gpt-4o`

## Anthropic

```
INTERVIEWOPS_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

Recommended models: `claude-3-5-sonnet-latest`, `claude-opus-4-6`, `claude-sonnet-4-6`

## Google Gemini

```
INTERVIEWOPS_PROVIDER=gemini
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.0-flash
```

Recommended models: `gemini-2.0-flash`, `gemini-2.0-pro`

## Checking provider status

```bash
npm run providers
```

## Adding a new provider

See [Contributing](./contributing.md) for how to add an Ollama, OpenRouter, or Groq provider.
