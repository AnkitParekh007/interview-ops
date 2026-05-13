# Frontend Architecture Interview Rubric

## Scoring Scale
- **1 — Weak**: Shallow or incomplete; no architectural thinking evident
- **2 — Below Expectations**: Covers basics but misses performance, a11y, or testing depth
- **3 — Meets Expectations**: Solid fundamentals with adequate breadth
- **4 — Strong**: Deep, well-reasoned architecture with good tradeoffs
- **5 — Exceptional**: Production-grade thinking, teaches the interviewer something

---

## Dimensions

### 1. Component Design (1–5)
Did the candidate design a coherent, reusable component hierarchy?
- 1: Monolithic thinking; no composition strategy
- 3: Basic component breakdown with some reusability; minor tight coupling
- 5: Atomic design thinking, clean contracts, strong separation of concerns, clear reusability strategy

### 2. State Management (1–5)
Did the candidate reason well about state architecture?
- 1: "Use Redux for everything" or no state strategy
- 3: Differentiated local vs global state; chose a reasonable tool
- 5: Nuanced strategy: server state vs UI state, colocation, optimistic updates, derived state

### 3. Performance Awareness (1–5)
Did the candidate think proactively about performance?
- 1: No performance considerations mentioned
- 3: Mentioned lazy loading or memoization; not applied strategically
- 5: Comprehensive: Core Web Vitals, code splitting, virtualization, memoization strategy, profiling

### 4. Accessibility (1–5)
Did the candidate treat accessibility as a first-class concern?
- 1: No mention of accessibility
- 3: Mentioned ARIA or semantic HTML but not integrated into design
- 5: A11y built in from the start: semantic HTML, ARIA roles, keyboard nav, focus management, WCAG

### 5. Testing Strategy (1–5)
Did the candidate articulate a clear testing strategy?
- 1: "We'd write unit tests" — no structure or rationale
- 3: Mentioned test pyramid; some testing types defined
- 5: Full strategy: unit for logic, RTL/ATL for components, Playwright for e2e, what NOT to test, CI integration

### 6. Design System Thinking (1–5)
Did the candidate demonstrate design system awareness?
- 1: No mention of design tokens, theming, or system-level thinking
- 3: Mentioned component library or Storybook
- 5: Token architecture, theming, variants, contribution model, documentation, consuming vs building

### 7. API Integration Patterns (1–5)
Did the candidate address API integration thoughtfully?
- 1: No API strategy; "we'd fetch in useEffect"
- 3: Mentioned error handling and loading states; no caching strategy
- 5: Caching layer (React Query / NgRx), optimistic updates, error handling, retry strategy, loading states

### 8. Seniority Signal (1–5)
Does the architectural thinking match the level being hired for?
- 1: IC-level thinking; no system-wide perspective
- 3: Good individual component design; limited platform thinking
- 5: Platform-level thinking; considers team scalability, code ownership, multi-team collaboration

---

## Final Recommendation

| Score | Recommendation |
|-------|----------------|
| 37–40 | **Strong Hire** |
| 30–36 | **Hire** |
| 22–29 | **Lean Hire** |
| 14–21 | **Lean No Hire** |
| ≤13   | **No Hire** |

**Final Recommendation**: ___________________

**Architecture Scenario**: 

**Key Strengths**: 

**Key Concerns**: 
