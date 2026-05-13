# Roadmap

This is the public roadmap for InterviewOps.

Items are not time-bound — they represent direction, not deadlines. Community contributions can accelerate any item.

---

## v0.1.0 — MVP (Released)

- [x] TypeScript CLI with commander
- [x] Mock provider — no API key required
- [x] OpenAI provider
- [x] Anthropic provider
- [x] Gemini provider
- [x] 9 role-based interview tracks
- [x] 13 interview modes
- [x] 9 rubric definitions
- [x] Session simulation (`npm run simulate`)
- [x] Prep plan generation (`npm run plan`)
- [x] Answer evaluation (`npm run answer`)
- [x] Session verification (`npm run verify`)
- [x] Rubric-based feedback and scoring
- [x] Scorecard, feedback, improved answers, study plan outputs
- [x] Ethics notice in every session
- [x] GitHub Actions CI (Node 20 + 22)
- [x] Full open-source documentation

---

## v0.2.0 — Provider Expansion

- [ ] Ollama provider (local LLMs — Llama, Mistral, Phi)
- [ ] OpenRouter provider (any model via single API)
- [ ] Groq provider (fast inference)
- [ ] Provider health check in `doctor` command

---

## v0.3.0 — Practice Depth

- [ ] Interactive CLI mode (ask one question at a time, await response)
- [ ] Multi-question answer evaluation (evaluate a full session of answers)
- [ ] Coding sandbox — run TypeScript/JavaScript solutions against test cases
- [ ] System design diagram prompts (ASCII or Mermaid output)
- [ ] Voice practice mode (text-to-speech questions, speech-to-text answers)

---

## v0.4.0 — Local Web UI

- [ ] Local web UI for session preview (read-only, no server needed)
- [ ] Session browser — browse all sessions in `output/sessions/`
- [ ] Scorecard visualizations
- [ ] Study plan progress tracking

---

## v0.5.0 — Intelligence

- [ ] Cross-session progress tracking — compare scores over time
- [ ] Weak area detection — identify patterns across sessions
- [ ] Adaptive study plan — adjust based on session history
- [ ] Answer history — track how specific answers improve over time

---

## v1.0.0 — Stable Release

- [ ] Stable CLI API (no breaking changes)
- [ ] Docusaurus documentation website
- [ ] Video demo
- [ ] Package published to npm as `interviewops`

---

## Ideas Backlog (Community Input Welcome)

- Slack/Discord bot integration for practice questions
- GitHub Codespaces devcontainer support
- Browser extension for practice during mock interviews
- Mobile-friendly web UI
- Community question bank (curated, open-source)
- Company-specific track modes (FAANG, startup, agency)
- Pair practice mode (two users, one interviewer/one candidate)

---

## Contributing to the Roadmap

Have an idea? Open a [GitHub Discussion](https://github.com/AnkitParekh007/interview-ops/discussions) or issue with the label `roadmap`.

Good First Issues are labeled in the repo and documented in [docs/GOOD_FIRST_ISSUES.md](./docs/GOOD_FIRST_ISSUES.md).
