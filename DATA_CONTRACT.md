# Data Contract

This document defines how InterviewOps interacts with user data. It exists to build trust and set clear expectations.

---

## User Layer (Your Data)

These directories and files are yours. InterviewOps reads from or writes to them, but never without your explicit command:

| Path | Description | Written by |
|---|---|---|
| `input/` | Your resume, job descriptions, answer files | You |
| `output/sessions/` | Generated interview session packets | `npm run simulate` |
| `output/plans/` | Generated prep plans | `npm run plan` |
| `config/interviewops.yml` | Your personal configuration | `npm run init` (then you edit it) |
| `.env` | Your API keys and env variables | You |

---

## System Layer (Project Files)

These are part of the project and are updated by contributors, not by your usage:

| Path | Description |
|---|---|
| `src/` | TypeScript source code |
| `tracks/` | Interview track definitions |
| `modes/` | Interview mode definitions |
| `rubrics/` | Evaluation rubric definitions |
| `docs/` | Documentation |
| `examples/` | Synthetic example files |

---

## Rules

### InterviewOps Will Never:
- **Overwrite your session outputs** without explicit command
- **Delete sessions** without explicit confirmation
- **Commit personal data** — examples use synthetic, fictional data only
- **Send your data to a central server** — everything stays local
- **Log API keys** — keys are read from `.env` but never printed
- **Collect telemetry** — no analytics, no tracking

### You Are Responsible For:
- Keeping your `.env` file out of version control (it is gitignored by default)
- Not committing real resume data if you fork this project
- Not sharing session outputs that contain sensitive professional information

---

## AI Provider Data

When using a non-mock provider (OpenAI, Anthropic, Gemini), your prompts (which include track content, mode content, and your resume/job description if using `npm run plan`) are sent to the respective AI provider's API.

Review each provider's privacy policy:
- OpenAI: https://openai.com/privacy
- Anthropic: https://anthropic.com/privacy
- Google: https://policies.google.com/privacy

For maximum privacy, use the mock provider (`INTERVIEWOPS_PROVIDER=mock`).
