# Providers

InterviewOps supports multiple AI providers. Set your provider in `.env`.

## Mock Provider (Default)

No API key required. Perfect for demos, CI, and contributors.

```
INTERVIEWOPS_PROVIDER=mock
```

The mock provider generates realistic, deterministic interview content without any API call. It includes real questions, scorecard feedback, and study plans — good enough to practice with.

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

## Adding a New Provider

1. Create `src/providers/yourprovider.provider.ts`
2. Implement `InterviewProvider` interface
3. Register in `src/providers/provider-registry.ts`
4. Add env vars to `.env.example`
5. Write a test in `tests/provider-registry.test.ts`

See `src/providers/mock.provider.ts` for a reference implementation.

## Check Provider Status

```bash
npm run providers
```
