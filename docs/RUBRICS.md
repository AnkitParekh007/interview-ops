# Rubrics

Rubrics define the scoring dimensions for each type of interview. Every session uses a rubric to generate structured feedback and a hire signal.

---

## Score Scale

| Score | Label |
|-------|-------|
| 1 | Weak — significant gaps, not ready |
| 2 | Below expectations — improvement needed |
| 3 | Meets expectations — solid but unremarkable |
| 4 | Strong — clear competence, good signal |
| 5 | Exceptional — above bar, memorable |

---

## Hire Signal

Every scorecard ends with one of:

- **Strong Hire** — exceptional across dimensions
- **Hire** — clearly qualified, no major concerns
- **Lean Hire** — good candidate with fixable gaps
- **Lean No Hire** — potential but not ready for this level/role
- **No Hire** — significant gaps that would affect performance

---

## Available Rubrics

### `behavioral-rubric`

Used for: `behavioral`, `recruiter-screen` (partial)

Dimensions:
- Communication clarity
- STAR structure (Situation, Task, Action, Result)
- Specificity and use of real examples
- Ownership and accountability
- Self-awareness and learning mindset
- Leadership signal
- Collaboration approach
- Seniority signal

---

### `coding-rubric`

Used for: `coding`, `debugging`, `code-review`, `take-home-review`

Dimensions:
- Problem understanding and clarifying questions
- Approach quality (algorithm, data structure choice)
- Code correctness
- Complexity awareness (time/space)
- Edge case identification and handling
- Testing approach
- Communication while coding
- Seniority signal

---

### `system-design-rubric`

Used for: `system-design`

Dimensions:
- Requirements gathering
- Architecture clarity
- Data modeling
- Scalability thinking
- Reliability and fault tolerance
- API design
- Tradeoff articulation
- Seniority signal

---

### `frontend-architecture-rubric`

Used for: `frontend-architecture`, `angular`, `react`

Dimensions:
- Component design principles
- State management approach
- Performance awareness
- Accessibility consideration
- Testing strategy
- Design system thinking
- API integration patterns
- Seniority signal

---

### `recruiter-screen-rubric`

Used for: `recruiter-screen`

Dimensions:
- Role fit clarity
- Motivation authenticity
- Communication quality
- Location and availability fit
- Culture signal
- Enthusiasm and preparation

---

### `senior-engineer-rubric`

Used for: senior and staff-level tracks across modes

Dimensions:
- Technical depth
- System-level thinking
- Mentoring and influence signal
- Ownership across scope
- Cross-functional collaboration
- Decision-making quality
- Coding quality signal
- Communication clarity

---

### `ai-engineer-rubric`

Used for: `ai-assisted-engineering`, `ai-frontend-engineer` track, `ai-agentic-engineer` track

Dimensions:
- AI/ML conceptual understanding
- Prompt engineering quality
- Output validation approach
- Ethics and privacy awareness
- AI integration patterns
- Debugging AI system behavior
- Tradeoff articulation
- Seniority signal

---

### `communication-rubric`

Used for: `candidate-questions`, supplemental scoring in other modes

Dimensions:
- Clarity
- Structure
- Conciseness
- Listening and follow-up responsiveness
- Confidence
- Technical vocabulary precision

---

### `project-deep-dive-rubric`

Used for: `project-deep-dive`

Dimensions:
- Story structure (problem → decision → execution → outcome)
- Technical depth
- Decision rationale
- Metrics and measurable impact
- Team dynamics and collaboration
- Lessons learned
- Seniority signal

---

## Feedback Style

All rubric feedback in InterviewOps follows these principles:

- **Honest** — real weaknesses are named, not softened into vague suggestions
- **Specific** — pointed at exact behaviors, not generalities
- **Actionable** — every weakness has a path to improvement
- **Supportive** — firm but never discouraging
- **Never cruel** — this is practice, not judgment

---

## Adding a Rubric

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to add a new rubric.
