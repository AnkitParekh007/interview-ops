# Examples

InterviewOps ships with synthetic example files to make it easy to get started without needing your own resume or job description.

---

## Input Examples

Copy examples to `input/` with:

```bash
npm run examples
```

### `input/resume.example.md`

A synthetic resume for "Alex Chen" — a senior frontend engineer with 8 years of experience in Angular, React, TypeScript, and AI product integration. Used by `npm run plan` as the default resume.

### `input/job-description.example.md`

A synthetic job description for a "Senior AI Frontend Engineer" role at a fictional company "Meridian Labs". Used by `npm run plan` as the default target role.

### `input/answer.example.md`

A synthetic behavioral answer to "Tell me about a time you led a significant technical project." The answer is intentionally "good but improvable" — it has the right structure but lacks specificity and quantified impact. Used by `npm run answer` as the default answer file.

---

## Running Examples

**Simulate a session:**

```bash
npm run start -- --track senior-frontend --mode behavioral
npm run start -- --track angular-developer --mode frontend-architecture
npm run start -- --track ai-agentic-engineer --mode ai-assisted-engineering
```

**Generate a prep plan:**

```bash
npm run plan -- --resume input/resume.example.md --job input/job-description.example.md
```

**Evaluate an answer:**

```bash
# First run a simulation to create a session
npm run start -- --track senior-frontend --mode behavioral

# Then evaluate the example answer against it
npm run answer -- \
  --session output/sessions/$(ls output/sessions | head -1) \
  --file input/answer.example.md
```

---

## Example Output Structure

After running the demo, your output directory looks like:

```
output/
  sessions/
    2026-05-13-senior-frontend-behavioral/
      session.md
      questions.md
      scorecard.md
      feedback.md
      improved-answers.md
      study-plan.md
      ethics-notice.md
      metadata.json
  plans/
    2026-05-13-prep-plan/
      prep-plan.md
      metadata.json
```

---

## Using Your Own Files

Replace the example files with your own:

1. Copy your resume to `input/my-resume.md`
2. Copy a job description to `input/target-role.md`
3. Run:

```bash
npm run plan -- --resume input/my-resume.md --job input/target-role.md
```

> **Privacy note**: Your files stay on your machine. Nothing is sent to a central server. When using a real AI provider (not mock), your input is sent to that provider's API — see [docs/PROVIDERS.md](./PROVIDERS.md) and each provider's privacy policy.

---

## Example Note on Synthetic Data

All example files use fictional names, companies, and data. No real personal information is included in this repository.

Do not commit real personal data (your actual resume, real job offers, real company names with identifying details) to a public fork.
