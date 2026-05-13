# Session Outputs

Every `interviewops simulate` (or `start`) command writes a complete session packet to disk.

---

## Output Location

```
output/sessions/{YYYY-MM-DD}-{track}-{mode}/
```

Example:

```
output/sessions/2026-05-13-senior-frontend-behavioral/
```

---

## Files Written

### `session.md`

The full session content including all questions, follow-ups, scorecard, feedback, and improved answer examples in a single readable document.

### `questions.md`

The interview questions and follow-up probes in isolation — useful for printing or sharing with a practice partner.

### `scorecard.md`

Rubric-based scores (1–5) for each evaluation dimension, with brief rationale for each score and an overall hire signal recommendation.

**Example structure:**

```markdown
## Scorecard

| Dimension             | Score | Notes                            |
|-----------------------|-------|----------------------------------|
| Communication Clarity | 4     | Clear, structured delivery       |
| STAR Structure        | 3     | Good setup, weak Result section  |
| Ownership             | 4     | Strong ownership language        |
| Seniority Signal      | 3     | Appropriate but not exceptional  |

**Overall Score**: 14/20
**Hire Signal**: Lean Hire → Hire with preparation
```

### `feedback.md`

Detailed feedback covering:
- What went well (3–5 specific strengths)
- What was missing or weak (3–5 specific gaps)
- How to improve each gap
- Senior-level expectations for this track/mode

### `improved-answers.md`

A before/after example showing:
- A typical weak answer to one of the questions
- A strong version of the same answer
- An explanation of what makes the strong version better

### `study-plan.md`

A 7-day and 14-day study plan tailored to the track and mode, including:
- Daily focus areas
- Practice exercises
- Specific resources (docs, books, courses)
- Common mistakes to avoid

### `ethics-notice.md`

A required file in every session stating:
- This is a practice-only tool
- Prohibited uses (live assistance, hidden overlay, answer injection)
- Allowed uses (pre-interview practice, study, skill-building)

This file cannot be suppressed. It is present in every session by design.

### `metadata.json`

Machine-readable session metadata:

```json
{
  "id": "2026-05-13-senior-frontend-behavioral",
  "track": "senior-frontend",
  "mode": "behavioral",
  "date": "2026-05-13",
  "durationMinutes": 45,
  "provider": "mock",
  "model": "mock-v1",
  "version": "0.1.0"
}
```

---

## Prep Plan Outputs

`npm run plan` writes to `output/plans/{YYYY-MM-DD}-prep-plan/`:

- `prep-plan.md` — full 2-week preparation plan
- `metadata.json` — resume file, job description file, provider, created at

---

## Answer Evaluation Outputs

`npm run answer` adds to an existing session directory:

- `answer-scorecard.md` — rubric score for your written answer
- `answer-feedback.md` — strengths and improvement areas
- `answer-improved.md` — a better version of your answer

---

## Verifying Outputs

```bash
npm run verify
```

Checks that all required files exist, the ethics notice is present and correct, and no banned phrases appear in session content files.
