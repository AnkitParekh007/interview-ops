# Rubric Design

This document describes how rubrics work in InterviewOps, what each rubric measures, and how to extend the rubric system.

---

## Philosophy

Interview rubrics exist because vague feedback does not help people improve. Telling a candidate "your answer was okay" is useless. Telling them "your STAR structure was a 3/5 because you described the Situation and Action clearly but your Result lacked quantifiable outcomes" is actionable.

InterviewOps uses rubrics to:

- Force structured evaluation across named dimensions
- Make weaknesses specific and nameable
- Produce a consistent hire signal that maps to how real interviewers think
- Give candidates a measurable target to hit during practice

---

## Scoring Scale

Every rubric dimension is scored on a 1–5 integer scale:

| Score | Label | Meaning |
|-------|-------|---------|
| 1 | Weak | Significant gaps; not ready for this level |
| 2 | Below expectations | Demonstrates some understanding but needs improvement |
| 3 | Meets expectations | Solid and correct, but unremarkable; typical candidate |
| 4 | Strong | Clear competence; above average signal |
| 5 | Exceptional | Above bar; memorable answer; hire signal |

### Hire Signal

Every scorecard includes a hire signal recommendation derived from the overall score distribution:

| Signal | Meaning |
|--------|---------|
| Strong Hire | Exceptional performance across dimensions |
| Hire | Clearly qualified; no major concerns |
| Lean Hire | Good candidate with fixable gaps; pass to next round |
| Lean No Hire | Potential but not ready for this level or role today |
| No Hire | Significant gaps that would materially affect performance |

---

## All 9 Rubrics

### `behavioral-rubric`

**Used for modes:** `behavioral`, `recruiter-screen` (partial)

**Dimensions (8):**

| Dimension | What it measures |
|-----------|-----------------|
| Communication clarity | Organized, clear, easy to follow; no rambling |
| STAR structure | Situation, Task, Action, Result — is each section present and crisp? |
| Specificity | Real examples, not hypotheticals; concrete details, not vague claims |
| Ownership and accountability | Uses "I" statements; doesn't deflect credit or blame |
| Self-awareness and learning mindset | Reflects genuinely on mistakes and growth |
| Leadership signal | Evidence of driving decisions, influencing others, taking initiative |
| Collaboration approach | How the candidate actually worked with others |
| Seniority signal | Does the scope and complexity match the expected level? |

---

### `coding-rubric`

**Used for modes:** `coding`, `debugging`, `code-review`, `take-home-review`

**Dimensions (8):**

| Dimension | What it measures |
|-----------|-----------------|
| Problem understanding | Reads the problem correctly; asks clarifying questions proactively |
| Approach quality | Algorithm and data structure selection; reasoned, not memorized |
| Code correctness | The solution actually works; handles the stated requirements |
| Complexity awareness | Can state and explain time/space complexity |
| Edge case identification | Considers empty inputs, overflow, nulls, boundary conditions |
| Testing approach | Describes how to test; thinks beyond the happy path |
| Communication while coding | Narrates thinking aloud; interactive, not silent |
| Seniority signal | Depth and confidence appropriate to the track level |

---

### `system-design-rubric`

**Used for modes:** `system-design`

**Dimensions (8):**

| Dimension | What it measures |
|-----------|-----------------|
| Requirements gathering | Asks clarifying questions before designing; scopes the problem |
| Architecture clarity | The proposed architecture is coherent and communicable |
| Data modeling | Appropriate schema design; relationships and indexing considered |
| Scalability thinking | Identifies bottlenecks; knows when to scale and how |
| Reliability and fault tolerance | Failure modes addressed; no single points of failure ignored |
| API design | REST, event-driven, or GraphQL as appropriate; contract clarity |
| Tradeoff articulation | Names the tradeoffs in each decision; not just the upsides |
| Seniority signal | Scope and depth appropriate to the level |

---

### `frontend-architecture-rubric`

**Used for modes:** `frontend-architecture`, `angular`, `react`

**Dimensions (8):**

| Dimension | What it measures |
|-----------|-----------------|
| Component design principles | Separation of concerns; composability; reusability |
| State management approach | Knows when to use local, global, and server state |
| Performance awareness | Core Web Vitals; bundle size; lazy loading; memoization |
| Accessibility consideration | WCAG understanding; keyboard nav; ARIA usage |
| Testing strategy | Unit, integration, and e2e test coverage decisions |
| Design system thinking | Component API design; token usage; consistency |
| API integration patterns | Data fetching, caching, loading states, error handling |
| Seniority signal | Breadth and depth appropriate to level |

---

### `recruiter-screen-rubric`

**Used for modes:** `recruiter-screen`

**Dimensions (6):**

| Dimension | What it measures |
|-----------|-----------------|
| Role fit clarity | Can articulate why they are a match for this role |
| Motivation authenticity | Reasons for looking feel genuine, not scripted |
| Communication quality | Professional, clear, appropriately concise |
| Location and availability fit | Practical logistics addressed without friction |
| Culture signal | Speaks to values and working style in a credible way |
| Enthusiasm and preparation | Shows they did their homework; energy is appropriate |

---

### `senior-engineer-rubric`

**Used for:** Senior and staff-level tracks across modes

**Dimensions (8):**

| Dimension | What it measures |
|-----------|-----------------|
| Technical depth | Deep knowledge, not surface coverage |
| System-level thinking | Reasons across components, not just within a single layer |
| Mentoring and influence signal | Evidence of helping others grow and raising team quality |
| Ownership across scope | Takes responsibility beyond their immediate task |
| Cross-functional collaboration | Works effectively with product, design, data, infra |
| Decision-making quality | Reasoned choices with documented tradeoffs |
| Coding quality signal | Code they write or describe is clean and maintainable |
| Communication clarity | Explains complex ideas clearly to different audiences |

---

### `ai-engineer-rubric`

**Used for modes:** `ai-assisted-engineering`; tracks: `ai-frontend-engineer`, `ai-agentic-engineer`

**Dimensions (8):**

| Dimension | What it measures |
|-----------|-----------------|
| AI/ML conceptual understanding | Foundation in how LLMs work; not just how to call APIs |
| Prompt engineering quality | Constructs effective, safe prompts; iterates systematically |
| Output validation approach | Does not trust AI output blindly; has a review process |
| Ethics and privacy awareness | Knows what not to send to AI APIs; understands bias risk |
| AI integration patterns | Streaming, tool use, agent loops, error handling |
| Debugging AI system behavior | Can reason about why an AI system failed |
| Tradeoff articulation | Model selection, cost, latency, accuracy tradeoffs |
| Seniority signal | Appropriate depth for the level |

---

### `communication-rubric`

**Used for modes:** `candidate-questions`; supplemental scoring in other modes

**Dimensions (6):**

| Dimension | What it measures |
|-----------|-----------------|
| Clarity | Ideas are communicated without ambiguity |
| Structure | Responses have a logical beginning, middle, and end |
| Conciseness | Does not over-explain or pad; respects the listener's time |
| Listening and follow-up responsiveness | Answers what was actually asked |
| Confidence | Projects appropriate confidence without arrogance |
| Technical vocabulary precision | Uses the right terms correctly; not imprecise jargon |

---

### `project-deep-dive-rubric`

**Used for modes:** `project-deep-dive`

**Dimensions (7):**

| Dimension | What it measures |
|-----------|-----------------|
| Story structure | Problem → decision → execution → outcome; flows clearly |
| Technical depth | Can go deep on implementation details when probed |
| Decision rationale | Explains why choices were made, not just what was done |
| Metrics and measurable impact | Quantified outcomes; not "it was better" but "50ms reduction" |
| Team dynamics and collaboration | Honest about how the team worked and where friction was |
| Lessons learned | Genuine reflection; not defensive or revisionist |
| Seniority signal | Scope and ownership appropriate to the level |

---

## How Rubrics Map to Modes

The mapping is defined in `src/interview/rubric-loader.ts`:

| Mode | Rubric |
|------|--------|
| `behavioral` | `behavioral-rubric` |
| `recruiter-screen` | `recruiter-screen-rubric` |
| `coding` | `coding-rubric` |
| `debugging` | `coding-rubric` |
| `code-review` | `coding-rubric` |
| `take-home-review` | `coding-rubric` |
| `system-design` | `system-design-rubric` |
| `frontend-architecture` | `frontend-architecture-rubric` |
| `angular` | `frontend-architecture-rubric` |
| `react` | `frontend-architecture-rubric` |
| `ai-assisted-engineering` | `ai-engineer-rubric` |
| `candidate-questions` | `communication-rubric` |
| `project-deep-dive` | `project-deep-dive-rubric` |

The `senior-engineer-rubric` is used as a supplemental lens for senior and staff-level tracks regardless of mode.

---

## How Scores Appear in Output

The `scorecard.md` file in every session uses this structure:

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

Scores are integers. Each dimension includes a brief rationale. The overall score is the sum of dimension scores. The hire signal is derived from the score distribution across dimensions.

---

## How to Add a New Rubric

### Step 1: Create the rubric file

```
rubrics/your-rubric-name.md
```

### Step 2: Define the rubric structure

Follow the structure of an existing rubric (e.g., `rubrics/behavioral-rubric.md`). Required sections:

- **Name and purpose** — what interview type this covers
- **Dimensions** — table of dimension names with descriptions of what each measures
- **Score guidance** — brief notes on what a 1, 3, and 5 look like for this rubric type
- **Hire signal guidance** — how to interpret overall scores as hire signals

### Step 3: Map it in `rubric-loader.ts`

In `src/interview/rubric-loader.ts`, add the mode-to-rubric mapping:

```typescript
const RUBRIC_MAP: Record<string, string> = {
  // existing mappings...
  'your-new-mode': 'your-rubric-name',
};
```

### Step 4: Update `docs/RUBRICS.md`

Add a section documenting the new rubric's dimensions.

### Required fields

Every rubric file must include:
- A clear name that matches the filename
- A `Dimensions` section with named dimensions (at minimum 3, typically 5–8)
- Score examples (what a 1, 3, and 5 look like per dimension)
- Hire signal criteria
