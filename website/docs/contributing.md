---
sidebar_position: 14
title: Contributing
description: How to contribute to InterviewOps.
---

# Contributing

InterviewOps is open-source and welcomes contributions.

## Getting started

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
npm run demo
```

## How to add a provider

1. Create `src/providers/yourprovider.provider.ts`
2. Implement the `InterviewProvider` interface from `src/providers/provider.types.ts`
3. Register in `src/providers/provider-registry.ts`
4. Add env vars to `.env.example`
5. Document in `docs/PROVIDERS.md`
6. Add tests in `tests/provider-registry.test.ts`

See `src/providers/mock.provider.ts` as the simplest reference.

## How to add a track

1. Create `tracks/your-track.md`
2. Follow the structure of an existing track (e.g. `tracks/senior-frontend.md`)
3. Include: Who it's for, Expected skills, Interview focus areas, Common rounds,
   Common weak spots, Seniority expectations, Recommended modes, Evaluation criteria
4. Update `docs/TRACKS.md`

## How to add a mode

1. Create `modes/your-mode.md`
2. Follow the structure of an existing mode
3. Map it to a rubric in `src/interview/rubric-loader.ts`
4. Update `docs/MODES.md`

## How to add a rubric

1. Create `rubrics/your-rubric.md` with scoring dimensions (1–5 scale)
2. Map it in `src/interview/rubric-loader.ts`
3. Update `docs/RUBRICS.md`

## Before opening a PR

```bash
npm run build   # Must pass
npm test        # Must pass (all tests green)
npm run demo    # Must complete successfully
npm run verify  # Must pass
```

## Ethics rule

All contributions must follow the [Ethics](./ethics.md) policy.

We will not accept:
- Live interview assistance features
- Hidden overlay integrations
- Real-time answer injection
- Anything designed to help users deceive interviewers

## Good first issues

See [GitHub Issues](https://github.com/AnkitParekh007/interview-ops/labels/good%20first%20issue).

Top picks:
- Add Ollama provider (local LLMs, no API key)
- Add OpenRouter provider (100+ models)
- Add local web UI for session preview
- Add coding interview test-case runner
- Add Mermaid diagram output for system design sessions
