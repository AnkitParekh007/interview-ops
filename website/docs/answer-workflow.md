---
sidebar_position: 10
title: Answer Workflow
description: The full answer practice workflow in InterviewOps.
---

# Answer Workflow

InterviewOps supports a complete answer practice loop.

## Step-by-step

### 1. Select a track and mode

```bash
npm run start -- --track senior-frontend --mode behavioral
```

This generates a session in `output/sessions/`.

### 2. Review the questions

Open `output/sessions/<session-id>/questions.md` to see the generated questions.

### 3. Write your answer

Create a Markdown file with your answer:

```bash
# input/my-answer.md
## Question
Tell me about a time you improved frontend performance significantly.

## My Answer
In Q2 2024 at Acme Corp, I led a performance audit of our Angular dashboard...
```

### 4. Submit your answer for evaluation

```bash
npm run answer -- \
  --session output/sessions/<session-id> \
  --file input/my-answer.md
```

### 5. Review the evaluation

Three files are added to the session directory:

- `answer-scorecard.md` — rubric scores (1–5 per dimension)
- `answer-feedback.md` — strengths, gaps, improvement suggestions
- `answer-improved.md` — a stronger version of your answer

### 6. Build a study plan

The session already contains `study-plan.md` from the initial simulation.
After reviewing your answer feedback, use the study plan to prioritize your prep.

## Tips

- Write your answer **before** reading the generated feedback
- Practice out loud after reviewing the improved answer
- Run the same track/mode again after 3–5 days of practice and compare scores
