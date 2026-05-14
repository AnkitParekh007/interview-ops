# Contributing to InterviewOps

Thank you for your interest in contributing! InterviewOps is built for developers by developers, and we welcome contributions of all kinds.

---

## Project Architecture

InterviewOps is a local-first, TypeScript monorepo with three main layers: a Node.js CLI (`src/`) that drives interview simulations and output generation, an Express API (`studio-api/`) that powers the browser-based Studio, and an Angular 19 web app (`studio-web/`) that provides the visual interview interface. All three share the same track, mode, and rubric Markdown files at the repo root. See [docs/architecture.md](./docs/architecture.md) for the full architectural overview.

---

## Development Environment Requirements

Before cloning, make sure you have:

- **Node.js 20+** — `node --version` should print `v20.x.x` or higher
- **npm 10+** — `npm --version` should print `10.x.x` or higher
- **TypeScript 5.4+** — installed automatically via `npm install`; no global install needed
- **Angular CLI** _(optional, for `studio-web` development)_ — `npm install -g @angular/cli@19`

---

## Getting Started

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
cp .env.example .env
npm run demo
```

If the demo runs successfully, your environment is ready.

---

## Development Workflow

```bash
npm run build     # Compile TypeScript
npm test          # Run tests (must pass before PR)
npm run lint      # Lint with ESLint
npm run format    # Format with Prettier
npm run doctor    # Validate setup
```

---

## How to Add a Provider

1. Create `src/providers/yourprovider.provider.ts`
2. Implement the `InterviewProvider` interface from `src/providers/provider.types.ts`
3. Register it in `src/providers/provider-registry.ts`
4. Add the API key variable to `.env.example`
5. Document it in `docs/PROVIDERS.md`
6. Add a test in `tests/provider-registry.test.ts`

### InterviewProvider interface

```typescript
// src/providers/provider.types.ts

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

### Minimal provider skeleton

```typescript
// src/providers/myprovider.provider.ts
import type { InterviewProvider, ProviderResponse } from './provider.types.js';

export class MyProvider implements InterviewProvider {
  readonly name = 'myprovider';

  isAvailable(): boolean {
    // Return true only when the provider can be used (e.g., API key present).
    // Never throw here — the registry uses this to select a provider at startup.
    return Boolean(process.env.MY_API_KEY);
  }

  async generateCompletion(prompt: string, systemPrompt?: string): Promise<ProviderResponse> {
    // Call your API here and return a ProviderResponse.
    const content = await callMyApi(prompt, systemPrompt);
    return { content, model: 'my-model-id', provider: this.name };
  }
}
```

See `src/providers/mock.provider.ts` as a complete reference implementation with no external dependencies.

---

## How to Add a Track

1. Create `tracks/your-track-name.md`
2. Follow the structure from an existing track (e.g., `tracks/senior-frontend.md`)
3. Include all required sections: Who This Is For, Expected Skills, Interview Focus Areas, Common Rounds, Common Weak Spots, Seniority Expectations, Example Question Categories, Recommended Modes, Evaluation Criteria
4. Update `docs/TRACKS.md`

---

## How to Add a Mode

1. Create `modes/your-mode-name.md`
2. Follow the structure from an existing mode (e.g., `modes/behavioral.md`)
3. Include: Purpose, Key Assessment Areas, Question Categories, Evaluation Approach, Common Mistakes
4. Update `src/interview/rubric-loader.ts` to map the new mode to a rubric
5. Update `docs/MODES.md`

---

## How to Add a Rubric

1. Create `rubrics/your-rubric-name.md`
2. Define scoring dimensions (1–5 scale)
3. Include hire signal recommendation format
4. Map it in `src/interview/rubric-loader.ts`
5. Update `docs/RUBRICS.md`

---

## How to Add Tests

- Test files go in `tests/`
- Use Vitest: `import { describe, it, expect } from 'vitest'`
- Tests run with `npm test`
- All tests must pass before merging

---

## Testing Strategy

Each test file has a focused scope. Here is what each covers and how to run it in isolation:

| Test file | What it covers | Run individually |
|---|---|---|
| `tests/config.test.ts` | Environment variable loading, `.env` parsing, config defaults | `npx vitest run tests/config.test.ts` |
| `tests/ethics.test.ts` | Ethics guardrails — ensures no live-assistance code paths exist and `ethics-notice.md` is emitted | `npx vitest run tests/ethics.test.ts` |
| `tests/mode-loader.test.ts` | Loading and parsing of mode Markdown files from `modes/` | `npx vitest run tests/mode-loader.test.ts` |
| `tests/output-writer.test.ts` | Session output file generation — `session.md`, `scorecard.md`, `metadata.json` | `npx vitest run tests/output-writer.test.ts` |
| `tests/provider-registry.test.ts` | Provider selection, `isAvailable()` logic, mock provider behaviour | `npx vitest run tests/provider-registry.test.ts` |
| `tests/rubric-loader.test.ts` | Loading rubric definitions and scoring dimension parsing | `npx vitest run tests/rubric-loader.test.ts` |
| `tests/track-loader.test.ts` | Loading track Markdown files, metadata extraction | `npx vitest run tests/track-loader.test.ts` |

Run the full suite with `npm test`. Run a single file with `npx vitest run tests/<file>`.

---

## How to Add a Good First Issue

Contributing the issue templates themselves is also welcome. To propose a new "good first issue":

1. Browse [docs/GOOD_FIRST_ISSUES.md](./docs/GOOD_FIRST_ISSUES.md) to see ideas already listed
2. Create a `.yml` file in `.github/ISSUE_TEMPLATE/` using the `gfi-<slug>.yml` naming convention
3. Follow the same structure as the existing `gfi-*.yml` files: `name`, `description`, `labels`, and a `body` with a single `markdown` block
4. The markdown body should include: difficulty, area, skills, what needs to be done, acceptance criteria (checkboxes), files to look at, and a getting started paragraph
5. Always end with the ethics reminder pointing to `ETHICS.md`
6. Open a PR with your new template — no code changes needed

---

## Opening a Pull Request

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Run `npm test` and `npm run build` — both must pass
4. Run `npm run demo` — must complete successfully
5. Open a PR against `main`
6. Fill in the PR template

---

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Use the following prefixes:

| Prefix | When to use |
|---|---|
| `feat:` | A new feature or capability |
| `fix:` | A bug fix |
| `docs:` | Documentation-only changes |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance, dependency updates, config changes |
| `refactor:` | Code restructuring with no behaviour change |
| `style:` | Formatting, whitespace — no logic change |

Examples:

```
feat: add Ollama provider with OLLAMA_MODEL env var support
fix: provider registry falls back to mock when env var is missing
docs: add OpenRouter setup instructions to PROVIDERS.md
test: add duration formatting helper to output-writer tests
chore: bump vitest to 1.6.0
```

Keep the subject line under 72 characters. Add a body paragraph when the "why" needs explanation.

---

## Code Style

- TypeScript strict mode — no `any` without justification
- ESLint + Prettier enforced
- Keep functions small and focused
- Prefer named exports over default exports
- No magic strings — use constants or config values

---

## Ethics

All contributions must follow the [Ethics Policy](./ETHICS.md).

**We will not accept:**
- Live interview assistance features
- Screen overlay integrations
- Real-time answer injection
- Anything that helps users deceive interviewers

---

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). By participating, you agree to uphold its standards.

---

## Questions?

Open a [GitHub Discussion](https://github.com/AnkitParekh007/interview-ops/discussions) or an issue. We're happy to help.
