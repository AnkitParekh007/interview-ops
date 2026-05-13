# Usage Guide

This guide walks through the core workflows in InterviewOps.

---

## 1. First-Time Setup

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
npm run init
npm run doctor
```

If `doctor` shows all green (or only WARN for missing `.env`), you're ready.

---

## 2. Run Your First Simulation

No API key needed — the mock provider works out of the box.

```bash
npm run start -- --track senior-frontend --mode behavioral
```

This generates a complete session in `output/sessions/`:

```
output/sessions/2026-05-13-senior-frontend-behavioral/
  session.md           Full session content
  questions.md         Interview questions + follow-ups
  scorecard.md         Rubric-based score (1–5 per dimension)
  feedback.md          Strengths, improvements, hire signal
  improved-answers.md  Before/after answer examples
  study-plan.md        7-day and 14-day prep plan
  ethics-notice.md     Practice-only statement
  metadata.json        Track, mode, provider, model, date
```

---

## 3. Generate a Prep Plan

Point InterviewOps at your resume and a target job description:

```bash
# Use the example files first
npm run examples

# Then generate your plan
npm run plan -- --resume input/resume.example.md --job input/job-description.example.md
```

For your real prep, replace the example files with your own:

```bash
npm run plan -- --resume input/my-resume.md --job input/target-company-role.md
```

---

## 4. Practice with a Written Answer

After running a simulation, practice by writing an answer and evaluating it:

```bash
# Write your answer in a Markdown file
# Then evaluate it:
npm run answer -- \
  --session output/sessions/2026-05-13-senior-frontend-behavioral \
  --file input/answer.example.md
```

This adds `answer-scorecard.md`, `answer-feedback.md`, and `answer-improved.md` to the session directory.

---

## 5. Validate Your Session

```bash
npm run verify
```

Checks that all required files exist, ethics notice is present, and no banned phrases appear.

---

## 6. Use a Real AI Provider

Edit `.env` to switch from mock to a real provider:

```
INTERVIEWOPS_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

Then run any command as normal:

```bash
npm run start -- --track ai-agentic-engineer --mode ai-assisted-engineering
```

---

## 7. Explore All Options

```bash
npm run tracks        # List all 9 tracks
npm run modes         # List all 13 modes
npm run providers     # Check provider status
npm run doctor        # Validate setup
```

---

## Tips

- **Build a session library**: run multiple sessions across different track/mode combinations. Compare your scores over time.
- **Use your real resume and JD** for `npm run plan` — the more specific the input, the more targeted the output.
- **Practice the improved answers**: the `improved-answers.md` file shows a before/after example. Use it as a template for your own answer revision.
- **Run doctor after any config change**: it catches most setup issues quickly.
