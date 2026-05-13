---
sidebar_position: 11
title: Output Structure
description: Session output files explained.
---

# Output Structure

Every `npm run start` or `npm run simulate` writes a complete session packet.

## Session directory

```
output/sessions/{YYYY-MM-DD}-{track}-{mode}/
  session.md
  questions.md
  scorecard.md
  feedback.md
  improved-answers.md
  study-plan.md
  ethics-notice.md
  metadata.json
```

## File descriptions

| File | Description |
|---|---|
| `session.md` | Full session content — all questions, follow-ups, scorecard, feedback |
| `questions.md` | Interview questions and follow-up probes |
| `scorecard.md` | Rubric-based scores (1–5) per dimension with hire signal |
| `feedback.md` | Strengths, gaps, improvement suggestions |
| `improved-answers.md` | Before/after answer examples |
| `study-plan.md` | 7-day and 14-day preparation plan |
| `ethics-notice.md` | Practice-only statement (always present) |
| `metadata.json` | Track, mode, provider, model, date, version |

## Prep plan directory

```
output/plans/{YYYY-MM-DD}-prep-plan/
  prep-plan.md
  metadata.json
```

## Answer evaluation files

After running `npm run answer`, these are added to the session directory:

| File | Description |
|---|---|
| `answer-scorecard.md` | Rubric score for your written answer |
| `answer-feedback.md` | Strengths and improvement areas |
| `answer-improved.md` | A stronger version of your answer |

## Verifying outputs

```bash
npm run verify
```

Checks all required files exist, ethics notice is present, and no banned phrases
appear in content files.
