# AI Engineer Rubric

## Scoring Scale
- **1 — Weak**: Limited or theoretical AI knowledge; no production experience
- **2 — Below Expectations**: Some AI experience but lacks depth or safety awareness
- **3 — Meets Expectations**: Solid AI engineering fundamentals
- **4 — Strong**: Production AI experience with strong safety and reliability thinking
- **5 — Exceptional**: Deep AI systems expertise with exceptional judgment

---

## Dimensions

### 1. AI and ML Understanding (1–5)
Does the candidate understand how LLMs and AI systems work at a sufficient depth?
- 1: User of AI tools, not a builder; can't explain tokens, context windows, or sampling
- 3: Understands context windows, temperature, tokens, basic model capabilities and limitations
- 5: Deep understanding of model architectures, fine-tuning, embeddings, RAG, and failure modes

### 2. Prompt Engineering (1–5)
Can the candidate design effective, robust prompts for production use?
- 1: Uses AI conversationally; no structured prompting
- 3: Writes system prompts; uses few-shot examples; understands temperature
- 5: Designs multi-step prompts; handles edge cases; uses structured output; tests prompts systematically

### 3. Output Validation (1–5)
Does the candidate validate and handle AI outputs reliably?
- 1: Trusts AI output at face value; no validation strategy
- 3: Validates JSON structure; some error handling
- 5: Schema validation (Zod/Pydantic), retry on failure, fallback responses, hallucination detection strategies

### 4. Ethics Awareness (1–5)
Does the candidate understand the ethical considerations of AI systems?
- 1: No awareness of bias, fairness, transparency, or misuse
- 3: Acknowledges AI limitations; has thought about user transparency
- 5: Proactively designs for transparency, fairness, user safety, and responsible AI disclosure

### 5. Integration Patterns (1–5)
Does the candidate know how to integrate AI into production systems?
- 1: Only used AI via chat UI; no API or SDK experience
- 3: Has integrated AI APIs; understands basic request/response patterns
- 5: Streaming integration, tool calling, multi-step agents, caching strategies, cost optimization

### 6. Debugging AI Systems (1–5)
Can the candidate debug and improve AI-powered features?
- 1: "The AI just got it wrong" — no debugging strategy
- 3: Tests different prompts; uses LangSmith or similar for tracing
- 5: Systematic eval-based approach; builds eval datasets; measures regressions; uses observability tools

### 7. Tradeoff Articulation (1–5)
Can the candidate explain AI architecture tradeoffs clearly?
- 1: Can't explain why they made any AI-related choices
- 3: Can explain some tradeoffs (model cost vs quality)
- 5: Articulates full tradeoff space: latency vs cost vs quality, hosted vs local, RAG vs fine-tuning

---

## Final Recommendation

| Score | Recommendation |
|-------|----------------|
| 33–35 | **Strong Hire** |
| 26–32 | **Hire** |
| 18–25 | **Lean Hire** |
| 11–17 | **Lean No Hire** |
| ≤10   | **No Hire** |

**Final Recommendation**: ___________________

**AI Experience Depth**: 

**Key Strengths**: 

**Safety and Ethics Assessment**: 

**Recommended First Project**: 
