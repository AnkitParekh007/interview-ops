# InterviewOps

> The ethical, local-first AI interview coach for developers.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/AnkitParekh007/interview-ops/actions/workflows/ci.yml/badge.svg)](https://github.com/AnkitParekh007/interview-ops/actions)

---

> 📸 Screenshot coming soon: InterviewOps Studio chat interface
> 📸 Screenshot coming soon: Human avatar coach
> 📸 Screenshot coming soon: Readiness report

---

## Why InterviewOps

Most interview AI tools focus on live interview assistance — feeding answers during real interviews.

**InterviewOps is different. We focus on real preparation.**

| Feature | InterviewOps | Real-time interview assistants |
|---------|:---:|:---:|
| Local-first (your data stays on your machine) | ✅ | ❌ |
| Practice-only ethics | ✅ | ❌ |
| Open-source core | ✅ | ❌ |
| Developer-specific tracks (Angular, React, AI) | ✅ | ❌ |
| Resume/JD-aware questions | ✅ | ✅ |
| Readiness reports & weakness maps | ✅ | ❌ |
| STAR story bank | ✅ | ❌ |
| Low cost — BYOK model | ✅ | ❌ |

[Full comparison →](docs/COMPARISON.md)

---

## Features

- **9 interview tracks** — Angular, React, AI engineer, fullstack, senior frontend, EM, DevRel, and more
- **13 interview modes** — behavioral, coding, system design, frontend architecture, Angular, React, AI-assisted engineering, and more
- **ChatGPT-like practice interface** — conversational mock interviews in a browser
- **Human avatar coach** — animated SVG avatar that reacts to session state
- **Candidate profile** — upload resume text and job description for personalized questions
- **Readiness report** — hire signal, weakness map, top actions, 30-day study plan
- **STAR story bank** — prepare and store your behavioral answers
- **Progress dashboard** — track sessions, scores, and weak areas over time
- **Export** — Markdown and print-ready HTML exports
- **Local-first** — all data stored on your machine in `.interviewops-studio/`
- **Ethics guardrails** — built-in blocks against live interview cheating

---

## Quick Start — InterviewOps Studio (UI)

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
cd studio-api && npm install && cd ..
cd studio-web && npm install && cd ..
npm run studio
```

Open `http://localhost:4200`

---

## Quick Start — CLI

```bash
npm install
cp .env.example .env
npm run demo       # Full demo (no API key needed)
npm run simulate -- --track senior-frontend --mode behavioral
```

---

## InterviewOps Studio

The local Angular interview practice interface.

```
npm run studio
```

Starts:
- API: `http://localhost:4317`
- UI: `http://localhost:4200`

Features: chat interface, avatar coach, session history, readiness reports, STAR bank, dashboard.

---

## Pricing

| Plan | Price | Key features |
|------|-------|-------------|
| Free | $0 | Unlimited mock sessions, scorecard, study plan |
| Pro | $9/mo | Readiness reports, STAR bank, PDF export, dashboard |
| Job Hunt Mode | $19/mo | Resume/JD questions, premium packs, 30-day plan |
| Lifetime Early Bird | $49 one-time | All Pro features forever |
| Team / Bootcamp | $5–8/user/mo | Cohort tracking, custom tracks |

> Payments not enabled yet. [Full pricing details →](docs/PRICING.md)

---

## Ethics

InterviewOps is for **practice before interviews**, not cheating during them.

- No hidden overlays
- No real-time answer injection
- No screen-share bypass
- No stealth mode
- Practice-only mode enforced in every session

[Read the full ethics policy →](ETHICS.md)

---

## Contributing

We welcome contributions! Good first issues are labeled in GitHub.

```bash
npm test        # Run CLI tests
npm run build   # Build TypeScript
npm run lint    # Lint
```

[Contributing guide →](CONTRIBUTING.md) | [Good first issues →](docs/GOOD_FIRST_ISSUES.md)

---

## Roadmap

- [x] CLI MVP (v0.1.0)
- [x] Angular Studio MVP (v0.2.0)
- [x] Readiness reports, STAR bank, dashboard (v0.3.0)
- [ ] Real AI provider integration in Studio (v0.4.0)
- [ ] Streaming responses (v0.4.0)
- [ ] Pro plan + Stripe (v0.5.0)
- [ ] Desktop app (v1.0.0)

[Full roadmap →](ROADMAP.md)

---

## License

MIT — see [LICENSE](LICENSE)
