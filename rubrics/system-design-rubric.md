# System Design Interview Rubric

## Scoring Scale
- **1 — Weak**: Unable to design a coherent system; skipped fundamentals
- **2 — Below Expectations**: Basic design with significant gaps in scalability or reliability
- **3 — Meets Expectations**: Solid design covering the essentials
- **4 — Strong**: Well-reasoned design with good depth and tradeoff awareness
- **5 — Exceptional**: Production-ready thinking with deep insight and excellent communication

---

## Dimensions

### 1. Requirements Gathering (1–5)
Did the candidate scope the problem before designing?
- 1: Jumped straight to architecture; no requirements discussion
- 3: Asked for functional requirements; skipped non-functional or scale estimates
- 5: Thoroughly gathered functional, non-functional requirements, and made explicit scoping decisions

### 2. Architecture Clarity (1–5)
Is the high-level architecture coherent, well-organized, and clearly communicated?
- 1: Incoherent or missing; couldn't identify major components
- 3: Major components identified; some gaps or unclear data flows
- 5: Clear, organized architecture with well-defined components and data flows

### 3. Data Modeling (1–5)
Did the candidate design sensible data schemas and storage choices?
- 1: No data modeling; defaulted to a database with no rationale
- 3: Basic schema design; storage choice made with minimal justification
- 5: Thoughtful schema design with indexing considerations; justified storage choice with tradeoffs

### 4. Scalability Thinking (1–5)
Did the candidate design for scale?
- 1: Single-server solution with no horizontal scaling consideration
- 3: Mentioned caching and load balancing; limited depth on scaling strategies
- 5: Comprehensive scaling approach: load balancing, sharding, replication, caching layers, CDN

### 5. Reliability and Fault Tolerance (1–5)
Did the candidate address failure modes?
- 1: No mention of failures, retries, or graceful degradation
- 3: Mentioned retries or replication; limited fault tolerance thinking
- 5: Addressed SPOF, retry strategies, circuit breakers, graceful degradation, disaster recovery

### 6. API Design (1–5)
Did the candidate design clear API contracts?
- 1: No API design; unclear how components communicate
- 3: Basic REST endpoints defined; missing pagination, error codes, or versioning
- 5: Well-designed APIs with resource modeling, error handling, pagination, versioning, and rate limiting

### 7. Tradeoff Articulation (1–5)
Did the candidate acknowledge and explain their design choices?
- 1: Chose technologies without justification
- 3: Justified 1–2 choices; others were not explained
- 5: Explicitly discussed tradeoffs for all major decisions; acknowledged alternative approaches

### 8. Seniority Signal (1–5)
Does the depth and scope of the design match the level being hired for?
- 1: Junior-level thinking for a senior role
- 3: Matches level with some gaps
- 5: Demonstrates staff/senior-level ownership of system complexity and production concerns

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

**System Designed**: 

**Key Strengths**: 

**Key Concerns**: 

**Strongest Area**: 
