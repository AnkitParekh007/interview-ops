# InterviewOps — AI Agent Instructions

This file provides canonical instructions for AI agents (Claude Code, Copilot, GPT, etc.) working with the InterviewOps codebase.

---

## What InterviewOps Is

InterviewOps is a **local-first, open-source AI interview practice CLI** for developers.

It helps developers practice:
- Recruiter screens, behavioral interviews, coding rounds, system design
- Frontend architecture, Angular, React, project deep-dives
- Debugging, code review, AI-assisted engineering discussions

It does NOT provide:
- Live interview assistance
- Hidden screen overlays
- Real-time answer injection
- Any form of interview cheating

---

## Project Structure

```
src/cli/           — CLI entry point and command handlers
src/config/        — Config loading and schema validation
src/providers/     — AI provider abstraction (mock, openai, anthropic, gemini)
src/interview/     — Core interview logic (session runner, prompt builder, loaders)
src/output/        — File output writers and validators
src/utils/         — Shared utilities (logger, errors, fs, slug)
tracks/            — Interview track definitions (Markdown)
modes/             — Interview mode definitions (Markdown)
rubrics/           — Evaluation rubric definitions (Markdown)
input/             — User input files (resume, job description, answers)
output/            — Generated session outputs (gitignored)
config/            — YAML configuration
scripts/           — Demo and utility scripts
tests/             — Vitest test suite
```

---

## How to Run Commands

```bash
npm run doctor        # Validate setup
npm run tracks        # List tracks
npm run modes         # List modes
npm run simulate -- --track senior-frontend --mode behavioral
npm run plan -- --resume input/resume.example.md --job input/job-description.example.md
npm run verify        # Validate session outputs
npm run demo          # Run full demo with mock provider
npm test              # Run test suite
npm run build         # Build TypeScript
```

---

## How to Choose Tracks

Available tracks: `junior-frontend`, `senior-frontend`, `angular-developer`, `react-developer`, `fullstack-developer`, `ai-frontend-engineer`, `ai-agentic-engineer`, `devrel-engineer`, `engineering-manager`.

Match the track to the user's role and target position.

---

## How to Choose Modes

Available modes: `recruiter-screen`, `behavioral`, `coding`, `system-design`, `frontend-architecture`, `angular`, `react`, `project-deep-dive`, `debugging`, `code-review`, `ai-assisted-engineering`, `take-home-review`, `candidate-questions`.

Match the mode to the type of interview the user is preparing for.

---

## How to Evaluate Answers

Use `npm run answer -- --session <session-dir> --file <answer-file>`.

The evaluator loads the session rubric, the candidate's answer, and asks the provider to:
1. Score each rubric dimension (1–5)
2. Identify strengths
3. Identify improvements
4. Provide an improved answer example

---

## How to Generate Prep Plans

Use `npm run plan -- --resume <file> --job <file>`.

The plan generator creates a personalized 2-week prep plan based on:
- Gap analysis between resume and job requirements
- Day-by-day preparation schedule
- Key resources (books, docs, courses)
- Top 5 likely questions
- Candidate questions to ask
- Red flags to avoid

---

## Output Format Rules

Every session directory must contain:
- `session.md` — full session content
- `questions.md` — interview questions
- `scorecard.md` — rubric-based scores
- `feedback.md` — strengths, improvements, hire signal
- `improved-answers.md` — better answer examples
- `study-plan.md` — 2-week prep plan
- `ethics-notice.md` — practice-only notice
- `metadata.json` — session metadata

---

## Ethics Rules (Non-Negotiable)

When working on InterviewOps code as an AI agent, you MUST:

1. **Never add live interview assistance features** — no real-time answer injection, no stealth overlays
2. **Always include ethics-notice.md in session output** — non-negotiable
3. **Never claim hiring guarantees** — the tool helps practice, not guarantee outcomes
4. **Never invent company-specific facts** — do not fabricate interview questions attributed to real companies
5. **Be honest about uncertainty** — if the provider is mock, say so clearly
6. **Keep feedback specific and supportive** — honest but never cruel
7. **Do not suggest bypassing interview policies** — always respect the hiring company's rules
8. **Do not generate content that misrepresents skills** — the goal is to build real skill

---

## Feedback Style

Feedback must be:
- **Honest** — do not sugarcoat genuine weaknesses
- **Specific** — point to exact problems, not vague generalities
- **Actionable** — every weakness should have a path to improvement
- **Supportive** — firm but never discouraging
- **Seniority-aware** — calibrate expectations to the track level

---

## Provider Notes

- **Mock provider**: Always available, no API key, deterministic, good for CI and demos
- **OpenAI**: Requires `OPENAI_API_KEY` in `.env`
- **Anthropic**: Requires `ANTHROPIC_API_KEY` in `.env`
- **Gemini**: Requires `GEMINI_API_KEY` in `.env`

If the selected provider is unavailable, show a helpful error — never silently fall back.

---

## What to Avoid

- Do not commit `.env` files
- Do not log API keys
- Do not add real personal data to examples
- Do not add cheating workflows — not in code, not in prompts, not in docs
- Do not claim this tool guarantees interview success
