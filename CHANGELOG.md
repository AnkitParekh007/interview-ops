# Changelog

All notable changes to InterviewOps are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] — 2026-05-14

### Added

**Competitive Differentiators**
- Resume + job description upload (text input)
- Personalized interview questions from candidate profile
- Readiness report: score, hire signal, weakness map, 30-day study plan
- STAR story bank with full CRUD (8 categories: leadership, conflict, failure, ownership, impact, technical-depth, collaboration, ambiguity)
- Progress dashboard: session stats, weakness areas, recommended next mode
- Export: Markdown and print-ready HTML
- Onboarding flow for first-time users
- Pricing page with 5 plans
- Premium packs page (coming soon)
- Local JSON file persistence in `.interviewops-studio/`

---

## [0.2.0] — 2026-05-13

### Added

**InterviewOps Studio**
- Local Angular 19 Studio app at `http://localhost:4200`
- Local Express API at `http://localhost:4317`
- ChatGPT-like mock interview chat interface
- Human avatar coach with 9 animated states (idle, greeting, listening, thinking, speaking, encouraging, challenging, scoring, celebrating)
- Session history sidebar
- Track/mode/provider selector
- Scorecard panel
- Study plan panel
- Ethics notice (always visible)
- `npm run studio` command to launch both API and UI
- 9 new API routes for sessions, messages, tracks, modes, providers, health

---

## [0.1.0] — 2026-05-13 🚀 Initial Release

### Added

**Core CLI**
- `interviewops init` — initialize workspace with config, dirs, and .env
- `interviewops doctor` — validate Node.js, config, providers, tracks, modes, rubrics
- `interviewops providers` — list providers and key status
- `interviewops tracks` — list all 9 role tracks
- `interviewops modes` — list all 13 interview modes
- `interviewops simulate` — run a full interview simulation session
- `interviewops plan` — generate personalized prep plan from resume + job description
- `interviewops answer` — evaluate a written answer against a session rubric
- `interviewops verify` — validate session output files and ethics compliance
- `interviewops examples` — copy example input files

**Interview Tracks** (9 tracks)
- `junior-frontend`, `senior-frontend`, `angular-developer`, `react-developer`
- `fullstack-developer`, `ai-frontend-engineer`, `ai-agentic-engineer`
- `devrel-engineer`, `engineering-manager`

**Interview Modes** (13 modes)
- `recruiter-screen`, `behavioral`, `coding`, `system-design`
- `frontend-architecture`, `angular`, `react`, `project-deep-dive`
- `debugging`, `code-review`, `ai-assisted-engineering`
- `take-home-review`, `candidate-questions`

**Rubrics** (9 rubrics)
- Behavioral, coding, system design, frontend architecture, recruiter screen
- Senior engineer, AI engineer, communication, project deep-dive

**AI Provider Abstraction**
- Mock provider (no API key, deterministic, suitable for CI and demos)
- OpenAI provider (GPT-4.1-mini and others)
- Anthropic provider (Claude Sonnet and others)
- Gemini provider (Gemini Flash and others)

**Session Outputs**
- `session.md`, `questions.md`, `scorecard.md`, `feedback.md`
- `improved-answers.md`, `study-plan.md`, `ethics-notice.md`, `metadata.json`

**Ethics**
- Ethics notice in every session output
- Verify command checks for ethics compliance
- ETHICS.md with full ethical use policy
- No live interview assistance features

**Open Source**
- MIT license
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, SUPPORT.md
- GOVERNANCE.md, DATA_CONTRACT.md
- GitHub Actions CI (Node 20 + 22 matrix)
- Issue templates and PR template
- AGENTS.md and CLAUDE.md for AI agent instructions

---

## [Unreleased]

See [ROADMAP.md](./ROADMAP.md) for what's coming next.
