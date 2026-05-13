# InterviewOps

**Practice developer interviews like a real engineering system.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-Compatible-412991?logo=openai&logoColor=white)](https://openai.com/)
[![Anthropic](https://img.shields.io/badge/Anthropic-Compatible-CC785C)](https://anthropic.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Local First](https://img.shields.io/badge/Local--First-No%20Server-black)](.)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Ethical AI](https://img.shields.io/badge/Ethical%20AI-Practice%20Only-green)](./ETHICS.md)

InterviewOps is an **open-source, local-first AI interview practice system** for developers. Practice coding, system design, behavioral, project deep-dive, frontend architecture, and AI-assisted engineering interviews — using your own model provider, on your own machine, with no hidden backend.

> ⭐ If this helps you prepare better, please star the repo so more developers can find it.

---

## What is InterviewOps?

InterviewOps is a TypeScript CLI and agent workflow for **realistic developer interview preparation**.

You run it locally, point it at your resume and job description, choose a role track and interview mode, and it generates:

- A full set of realistic interview questions
- Rubric-based scoring and feedback
- Improved answer examples
- A personalized 2-week study plan
- An ethics notice (practice-only, always)

It works out of the box with the built-in **mock provider** — no API key required.

---

## Why developers star this

- **Local-first** — runs entirely on your machine, no hosted backend
- **Bring your own model key** — OpenAI, Anthropic, Gemini, or mock
- **Mock mode works without any API key** — great for CI, demos, contributors
- **Role-based tracks** — 9 tracks from junior frontend to AI agentic engineer
- **Rubric-based feedback** — structured scoring, not just raw opinions
- **Markdown session outputs** — readable, diffable, storable files
- **Ethical by design** — no live cheating features, ever
- **Easy to fork and extend** — add a provider, track, mode, or rubric in minutes
- **Built for modern AI-assisted engineering interviews** — covers prompting, output validation, AI ethics

---

## What you can practice

| Interview Type | Description |
|---|---|
| Recruiter Screen | Role fit, motivation, communication clarity |
| Behavioral | STAR answers, leadership, conflict, ownership, failure/learning |
| Coding | Problem-solving, complexity, edge cases, testing |
| System Design | Requirements, architecture, data modeling, scalability, tradeoffs |
| Frontend Architecture | Component design, state, performance, accessibility, design systems |
| Angular | Signals, RxJS, change detection, DI, routing, forms |
| React | Hooks, state, effects, performance, server components |
| Project Deep-Dive | Past project storytelling, architecture decisions, metrics, lessons |
| Debugging | Process, hypothesis, root cause analysis, fix validation |
| Code Review | Readability, risks, security, maintainability |
| AI-Assisted Engineering | Prompting, validating AI output, ethics, debugging generated code |
| Take-Home Review | Code quality, README, architecture, test coverage |
| Candidate Questions | What to ask the interviewer |

---

## Quick Start

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
cp .env.example .env
npm run demo
```

The demo runs with the **mock provider** — no API key needed.

---

## Model Provider Setup

Default (no API key needed):
```
INTERVIEWOPS_PROVIDER=mock
```

OpenAI:
```
INTERVIEWOPS_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

Anthropic:
```
INTERVIEWOPS_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

Google Gemini:
```
INTERVIEWOPS_PROVIDER=gemini
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.0-flash
```

---

## CLI Usage

```bash
# Check your setup
npm run doctor

# See available tracks
npm run tracks

# See available modes
npm run modes

# Run a simulation (mock provider, no API key needed)
npm run simulate -- --track senior-frontend --mode behavioral
npm run simulate -- --track angular-developer --mode frontend-architecture
npm run simulate -- --track ai-agentic-engineer --mode ai-assisted-engineering

# Generate a prep plan from your resume + job description
npm run plan -- --resume input/resume.example.md --job input/job-description.example.md

# Evaluate a written answer
npm run answer -- --session output/sessions/2026-05-13-senior-frontend-behavioral --file input/answer.example.md

# Verify session output files
npm run verify

# Initialize workspace
npm run init

# Copy example input files
npm run examples
```

---

## How it works

```
Resume / Job Description / Track
          ↓
    Interview Mode
          ↓
        Rubric
          ↓
     AI Provider
     (mock / OpenAI / Anthropic / Gemini)
          ↓
   Session Packet
          ↓
Scorecard + Feedback + Improved Answers
          ↓
      Study Plan
```

---

## Example Output

After running `npm run simulate`, you get:

```
output/sessions/2026-05-13-senior-frontend-behavioral/
  session.md           — full interview session with questions
  questions.md         — interview questions and follow-ups
  scorecard.md         — rubric-based scores (1–5 per dimension)
  feedback.md          — strengths, improvements, hire signal
  improved-answers.md  — before/after answer examples
  study-plan.md        — 7-day and 14-day prep plan
  ethics-notice.md     — practice-only statement
  metadata.json        — session metadata (track, mode, provider, model)
```

---

## Ethical Use

InterviewOps is designed for **genuine interview preparation**.

- ✅ Use it before your interview to practice
- ✅ Use it to improve your communication and technical knowledge
- ✅ Use it to understand your weak areas and build a study plan
- ❌ Do NOT use it during a live interview
- ❌ Do NOT use it as hidden live assistance
- ❌ Do NOT use it to deceive interviewers or misrepresent your skills

See [ETHICS.md](./ETHICS.md) for the full ethical use policy.

---

## Available Tracks

| Track | Description |
|---|---|
| `junior-frontend` | Junior developers (0–2 years) |
| `senior-frontend` | Senior frontend engineers (5–10 years) |
| `angular-developer` | Angular specialists |
| `react-developer` | React specialists |
| `fullstack-developer` | Full-stack engineers |
| `ai-frontend-engineer` | Frontend engineers building AI-powered products |
| `ai-agentic-engineer` | Engineers building AI agent systems |
| `devrel-engineer` | Developer relations engineers |
| `engineering-manager` | Engineering managers |

---

## Available Modes

`recruiter-screen` · `behavioral` · `coding` · `system-design` · `frontend-architecture` · `angular` · `react` · `project-deep-dive` · `debugging` · `code-review` · `ai-assisted-engineering` · `take-home-review` · `candidate-questions`

---

## Roadmap

- [x] CLI MVP
- [x] Mock provider (no API key)
- [x] OpenAI provider
- [x] Anthropic provider
- [x] Gemini provider
- [x] 9 role-based tracks
- [x] 13 interview modes
- [x] Rubric-based scoring and feedback
- [x] Resume + JD prep plan generator
- [x] Session output files (scorecard, feedback, study plan)
- [x] Ethical use guardrails
- [ ] Voice practice mode
- [ ] Local web UI for session preview
- [ ] Ollama provider (local models)
- [ ] OpenRouter provider
- [ ] Coding sandbox with test-case runner
- [ ] System design diagram prompts
- [ ] Progress dashboard
- [ ] Docusaurus documentation website

See [ROADMAP.md](./ROADMAP.md) for the full roadmap.

---

## Contributing

We welcome contributions of all kinds:

- **Add a provider** — Ollama, OpenRouter, Groq, Mistral
- **Add a track** — new role types
- **Add a mode** — new interview types
- **Add a rubric** — better evaluation dimensions
- **Improve examples** — more realistic input/output examples
- **Improve docs** — clearer explanations

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

---

## License

MIT — see [LICENSE](./LICENSE).

---

*Built for developers, by developers. Practice hard. Interview well. Build real skill.*
