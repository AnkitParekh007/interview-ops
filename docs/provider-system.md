# Provider System

This document is a technical deep-dive into the InterviewOps provider abstraction layer.

---

## Overview

The provider system is a thin abstraction that allows InterviewOps to route AI completions to different backends without changing any interview pipeline code. The selected provider is determined entirely by environment configuration.

---

## TypeScript Types

All provider types are defined in `src/providers/provider.types.ts`:

```typescript
export interface ProviderMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ProviderResponse {
  content: string;
  model: string;
  provider: string;
}

export interface InterviewProvider {
  name: string;
  generateCompletion(prompt: string, systemPrompt?: string): Promise<ProviderResponse>;
  isAvailable(): boolean;
}
```

Every provider implements exactly these three members:

- `name` — a string identifier (`mock`, `openai`, `anthropic`, `gemini`)
- `generateCompletion(prompt, systemPrompt?)` — the single method called by the pipeline; returns a `ProviderResponse` with `content`, `model`, and `provider`
- `isAvailable()` — synchronous check; returns `true` if the provider can be used (for real providers: whether the required API key is set)

The `ProviderMessage` type is defined for completeness; the current interface uses a string `prompt` rather than a message array, keeping the interface simple.

---

## Provider Registry Pattern

`src/providers/provider-registry.ts` implements the registry:

```typescript
type ProviderFactory = () => InterviewProvider;

const REGISTRY: Record<string, ProviderFactory> = {
  mock: () => new MockProvider(),
  openai: () => new OpenAIProvider(),
  anthropic: () => new AnthropicProvider(),
  gemini: () => new GeminiProvider(),
};

export function getProvider(name?: string): InterviewProvider {
  const providerName = name ?? process.env['INTERVIEWOPS_PROVIDER'] ?? 'mock';
  const factory = REGISTRY[providerName];

  if (!factory) {
    throw new ProviderError(
      `Unknown provider: "${providerName}". Available providers: ${Object.keys(REGISTRY).join(', ')}`,
    );
  }

  const provider = factory();

  if (!provider.isAvailable()) {
    throw new ProviderError(
      `Provider "${providerName}" is not available. Check that the required API key is set in your .env file.`,
      providerName,
    );
  }

  return provider;
}
```

Key design decisions:

1. **Factory functions, not instances** — each call to `getProvider()` creates a fresh provider instance
2. **Explicit failure** — if the provider is unknown or unavailable, a `ProviderError` is thrown immediately with a clear message; there is no silent fallback
3. **Environment-driven selection** — `INTERVIEWOPS_PROVIDER` env var determines the provider; no config file changes required to switch
4. **CLI override** — `--provider` flag on `simulate` passes a name directly to `getProvider(name)`, overriding the env var

The `listProviders()` function iterates all registry entries and returns availability status for the `providers` command.

---

## Mock Provider

`src/providers/mock.provider.ts`

The mock provider is the default. It requires no API key and is always available (`isAvailable()` always returns `true`).

It generates deterministic, realistic interview content entirely in-process using hardcoded question sets and template-based content generation. It does not make any network calls.

### How it works

1. `detectTrackAndMode(prompt)` — scans the prompt string for track and mode keywords and infers which content variant to use
2. `getMockQuestions(mode)` — returns a set of 7 realistic questions for the detected mode
3. `generateMockSession(track, mode, duration)` — assembles the full session Markdown including questions, a scorecard, feedback, an improved answer example, and the ethics notice
4. `generateMockPrepPlan(prompt)` — generates a 2-week prep plan with daily focus areas and resources

The mock provider is used in:
- All CI runs (no API keys in CI)
- `npm run demo`
- The default development experience
- Ethics tests in `tests/ethics.test.ts`

### Why determinism matters

The mock output is consistent enough to test the full pipeline, validate the output writer, and demonstrate the product without any external dependency. Contributors can run every test and the full demo without credentials.

---

## Real Providers

### OpenAI

**File**: `src/providers/openai.provider.ts`

**Required environment variables:**

```
INTERVIEWOPS_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

Recommended models: `gpt-4.1`, `gpt-4.1-mini`, `gpt-4o`

`isAvailable()` returns `true` when `OPENAI_API_KEY` is set to a non-empty value.

### Anthropic

**File**: `src/providers/anthropic.provider.ts`

**Required environment variables:**

```
INTERVIEWOPS_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

Recommended models: `claude-3-5-sonnet-latest`, `claude-opus-4-6`, `claude-sonnet-4-6`

`isAvailable()` returns `true` when `ANTHROPIC_API_KEY` is set to a non-empty value.

### Google Gemini

**File**: `src/providers/gemini.provider.ts`

**Required environment variables:**

```
INTERVIEWOPS_PROVIDER=gemini
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.0-flash
```

Recommended models: `gemini-2.0-flash`, `gemini-2.0-pro`

`isAvailable()` returns `true` when `GEMINI_API_KEY` is set to a non-empty value.

---

## Provider Selection Logic

Resolution order when `getProvider()` is called:

1. The `name` argument passed directly (from `--provider` CLI flag)
2. `process.env['INTERVIEWOPS_PROVIDER']`
3. Default: `'mock'`

If none of these resolve to a registered provider name, `getProvider()` throws `ProviderError` listing the available names.

To check which provider is active and its status:

```bash
npm run providers
```

---

## How to Add a New Provider

Follow these six steps:

### Step 1: Create the provider file

```
src/providers/yourprovider.provider.ts
```

### Step 2: Implement the `InterviewProvider` interface

```typescript
import type { InterviewProvider, ProviderResponse } from './provider.types.js';

export class YourProvider implements InterviewProvider {
  readonly name = 'yourprovider';

  isAvailable(): boolean {
    return !!process.env['YOUR_API_KEY'];
  }

  async generateCompletion(prompt: string, systemPrompt?: string): Promise<ProviderResponse> {
    // Call your API
    const content = await callYourAPI(prompt, systemPrompt);
    return {
      content,
      model: process.env['YOUR_MODEL'] ?? 'your-default-model',
      provider: this.name,
    };
  }
}
```

### Step 3: Register it in the registry

In `src/providers/provider-registry.ts`, add to the `REGISTRY` object:

```typescript
import { YourProvider } from './yourprovider.provider.js';

const REGISTRY: Record<string, ProviderFactory> = {
  mock: () => new MockProvider(),
  openai: () => new OpenAIProvider(),
  anthropic: () => new AnthropicProvider(),
  gemini: () => new GeminiProvider(),
  yourprovider: () => new YourProvider(),   // add this line
};
```

### Step 4: Add env vars to `.env.example`

```
# Your Provider
INTERVIEWOPS_PROVIDER=yourprovider
YOUR_API_KEY=
YOUR_MODEL=your-default-model
```

### Step 5: Document it in `docs/PROVIDERS.md`

Add a section with the env var names, recommended models, and any setup notes.

### Step 6: Add a test in `tests/provider-registry.test.ts`

```typescript
it('yourprovider is registered', () => {
  // Test that the provider name appears in listProviders()
});

it('yourprovider isAvailable returns false when key is missing', () => {
  // Test without the API key set
});
```

See `src/providers/mock.provider.ts` as a reference implementation.

---

## Privacy Implications by Provider

| Provider | Data sent | Where it goes |
|----------|-----------|---------------|
| `mock` | Nothing — all in-process | Your machine only |
| `openai` | Your prompt (may include resume/JD content) | OpenAI API |
| `anthropic` | Your prompt (may include resume/JD content) | Anthropic API |
| `gemini` | Your prompt (may include resume/JD content) | Google API |

When using real providers, your resume text and job description are sent to the provider's API as part of the prompt. Review each provider's data processing policy before including sensitive personal or proprietary information in your input files.

The mock provider never sends any data off-device.
