# Recruiter Review Guide

A guide for recruiters, hiring managers, and engineering leaders reviewing InterviewOps as a portfolio project.

---

## What InterviewOps is

InterviewOps is an open-source, local-first AI interview practice CLI and Angular web app. It runs structured mock interview sessions on a developer's machine, scores answers against named rubrics, and produces a complete session packet of Markdown files. It supports 9 interview tracks, 13 modes, 4 AI providers (including a mock that needs no API key), and a browser-based Studio interface. No cloud account or subscription is required to use it.

---

## What engineering skills it demonstrates

### TypeScript strict mode + Zod schema validation

The entire codebase is TypeScript with strict mode enabled (`noImplicitAny`, `strictNullChecks`). The configuration system uses a multi-section Zod schema (`src/config/config.schema.ts`) with explicit typed defaults validated at startup. There are no implicit `any` types in application code. This demonstrates that the author understands types as a design tool, not just a syntax requirement.

**Where to look:** `src/config/config.schema.ts`, `src/providers/provider.types.ts`, `tsconfig.json`

---

### Multi-provider AI abstraction (provider registry pattern)

The `InterviewProvider` interface defines a contract (`generateCompletion`, `isAvailable`, `name`). Four providers implement it. A registry maps string keys to factory functions. Provider selection is entirely environment-driven — the pipeline code never imports a concrete provider directly.

This is the same pattern used in production systems to support multiple AI vendors, enable A/B testing between models, and avoid vendor lock-in.

**Where to look:** `src/providers/provider.types.ts`, `src/providers/provider-registry.ts`, `src/providers/mock.provider.ts`

---

### Angular 19 (standalone components, Signals, RxJS)

The Studio Web app uses Angular 19 with standalone components (no NgModules), `signal()` / `computed()` / `effect()` from `@angular/core`, OnPush change detection, and RxJS Observables for HTTP service calls. The feature component tree covers chat, avatar, session sidebar, scorecard, readiness reports, STAR stories, progress dashboard, and study plan.

**Where to look:** `studio-web/src/app/features/`, `studio-web/src/app/app.config.ts`

---

### CLI UX design (Commander.js, ora, chalk)

The CLI is built with Commander.js, with a clean command tree, consistent flag names, and a `--help` at every level. Output uses chalk for color-coded status (green for success, yellow for warnings, red for errors) and ora for spinners during async operations. Error messages include recovery steps, not just an error code.

**Where to look:** `src/cli/`, `src/utils/logger.ts`

---

### Local-first architecture

Session data is written to `output/sessions/{date}-{track}-{mode}/` as plain Markdown and JSON files. Studio data persists in `.interviewops-studio/` via a typed `FileStore<T>` generic class that reads and writes individual JSON files per record. There is no cloud backend. Everything runs and persists on the developer's own machine.

This is a deliberate architecture choice — not a limitation — and the author explains it clearly in the product documentation.

**Where to look:** `src/output/`, `studio-api/src/services/file-store.service.ts`

---

### Ethics-by-design

Ethics constraints are not just a policy document. They are:
- Encoded in the Zod config schema with defaults locked to `true`
- Tested in `tests/ethics.test.ts` (banned phrases, config defaults, ethics notice presence)
- Required in every session output (`ethics-notice.md` cannot be suppressed)
- Enforced in the PR template (explicit checklist)

This demonstrates that the author understands how to translate a policy into verifiable, testable engineering constraints.

**Where to look:** `src/config/config.schema.ts` (EthicsConfigSchema), `tests/ethics.test.ts`, `ETHICS.md`, `docs/ethical-ai-boundaries.md`

---

### Content system design (Markdown-driven tracks/modes/rubrics)

Interview tracks, modes, and rubrics are Markdown files in `tracks/`, `modes/`, and `rubrics/`. The runtime loads and parses them — adding a new track or rubric requires no application code changes, only a new Markdown file following the defined structure. This is a practical extensibility decision: it makes the content system contributor-friendly without requiring TypeScript knowledge.

**Where to look:** `tracks/`, `modes/`, `rubrics/`, `src/interview/track-loader.ts`, `src/interview/rubric-loader.ts`

---

### Full CI/CD (GitHub Actions, Node 20 + 22 matrix)

The CI pipeline runs on every push and pull request to `main`. It builds the CLI TypeScript, runs the Vitest test suite, and builds both the Studio API and Studio Web — across Node 20 and 22 in a matrix. Tests must pass before merge.

**Where to look:** `.github/workflows/ci.yml`

---

## How to run it yourself in 5 minutes

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
npm run demo
```

The demo runs doctor → examples → simulate → plan → verify using the mock provider. No API key required. It takes under a minute and exercises the complete pipeline.

To explore more:

```bash
npm run simulate -- --track angular-developer --mode frontend-architecture
npm run simulate -- --track ai-agentic-engineer --mode ai-assisted-engineering
```

Check the output in `output/sessions/` — the session files are the actual artifacts the tool produces.

---

## Where to look in the codebase

| Skill area | Key files |
|------------|-----------|
| TypeScript strict + Zod | `src/config/config.schema.ts` |
| Provider interface | `src/providers/provider.types.ts` |
| Provider registry | `src/providers/provider-registry.ts` |
| Mock provider | `src/providers/mock.provider.ts` |
| Interview pipeline | `src/interview/session-runner.ts`, `src/interview/prompt-builder.ts` |
| Output writer | `src/output/` |
| CLI entry | `src/cli/index.ts` |
| Angular 19 Studio | `studio-web/src/app/features/` |
| Studio API routes | `studio-api/src/routes/`, `studio-api/src/server.ts` |
| File persistence | `studio-api/src/services/file-store.service.ts` |
| Ethics in config | `src/config/config.schema.ts` (EthicsConfigSchema) |
| Ethics in tests | `tests/ethics.test.ts` |
| CI pipeline | `.github/workflows/ci.yml` |
| Track content | `tracks/*.md` |
| Rubric content | `rubrics/*.md` |

---

## Questions to ask the candidate about this project

These questions probe understanding, not just the ability to build:

1. Walk me through the provider registry pattern you used. Why a factory registry instead of direct imports?
2. Why does `getProvider()` throw instead of falling back silently when a provider is unavailable?
3. You encoded ethics constraints in the Zod schema. What does that buy you that a policy document doesn't?
4. The content system (tracks/modes/rubrics) uses Markdown files loaded at runtime. What are the tradeoffs of that approach versus hardcoding the content in TypeScript?
5. What would need to change to support streaming responses from the AI providers?
6. How does the Studio API store data, and what are the failure modes of that approach?
7. What would break first if this tool were used by 10,000 developers simultaneously?
8. What did you learn from designing the rubric system that you would apply to a production scoring system?

---

## What to ignore

InterviewOps is a personal portfolio and open-source developer tool. It is not a production-deployed SaaS product. Some things to keep in mind:

- **No production user base** — this project is publicly available but not commercially deployed. Do not ask for user metrics or production load numbers.
- **Pricing section in README** — the README previously included a pricing table. Payments are not implemented. This is speculative roadmap content, not a live feature.
- **Studio UI completeness** — the Studio is functional for local use but is not a finished product. Some features are stubs or in-progress.
- **Mock provider quality** — the mock provider is good enough to demonstrate the pipeline and run tests. It is not a replacement for a real LLM for serious practice.

The value of this project as a portfolio artifact is in the engineering decisions, the code structure, the testing approach, and the explicit design documentation — not in production adoption metrics.
