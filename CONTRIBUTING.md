# Contributing to InterviewOps

Thank you for your interest in contributing! InterviewOps is built for developers by developers, and we welcome contributions of all kinds.

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

See `src/providers/mock.provider.ts` as a reference implementation.

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

## Opening a Pull Request

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Run `npm test` and `npm run build` — both must pass
4. Run `npm run demo` — must complete successfully
5. Open a PR against `main`
6. Fill in the PR template

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
