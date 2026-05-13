# AI Agentic Engineer Track

## Who This Is For
Engineers building AI agent systems — autonomous workflows, multi-agent pipelines, RAG systems, tool-using LLMs, and production AI infrastructure. Targeting roles at AI labs, AI-first startups, and enterprises deploying agentic AI.

## Expected Skills
- Agent architectures — ReAct, plan-and-execute, reflection, multi-agent
- Tool use — defining tools, tool selection, tool result handling
- Multi-agent orchestration — routing, supervisor patterns, parallelism
- Prompt engineering — system prompts, few-shot, chain-of-thought, structured output
- RAG patterns — embedding, vector search, chunking strategies, reranking
- Evals — LLM evaluation frameworks, ground truth, human eval, automated scoring
- Output validation — structured output (JSON schema), Zod/Pydantic validation
- Safety and alignment — prompt injection defense, output filtering, guardrails
- MCP (Model Context Protocol) — building and consuming MCP servers
- LangChain / LangGraph — graph-based agent workflows
- Vercel AI SDK — tool definitions, `generateObject`, multi-step agents
- Anthropic SDK — tool use, computer use, system prompts
- Observability — LangSmith, Arize, custom tracing, token accounting

## Interview Focus Areas
1. Agent architecture — choosing the right pattern for the problem
2. Tool design — clear schemas, error handling, idempotency
3. Prompt engineering — structured outputs, reducing hallucinations
4. Multi-agent patterns — orchestrator-worker, peer agents, debate patterns
5. RAG system design — chunking, indexing, retrieval, augmentation
6. Evals strategy — what to measure, how to build eval datasets
7. Safety — prompt injection, output validation, human-in-the-loop
8. Observability — tracing agent runs, debugging failures, token budgets
9. Production concerns — latency, cost, retries, fallbacks
10. MCP integration — building tools that expose context to agents

## Common Interview Rounds
- **Recruiter Screen** (30 min): Agentic AI experience, motivation, team fit
- **Technical Deep Dive** (60 min): Agent architecture discussion
- **System Design** (60 min): Design a multi-agent system for a real problem
- **Coding Round** (60 min): Implement a tool-using agent or RAG pipeline
- **Evals Round** (45 min): How do you measure and improve agent quality?
- **Behavioral Round** (45 min): Shipping agents in production, handling failures

## Common Weak Spots
- Designing agents without considering failure modes
- Not thinking about token cost and latency at scale
- Shallow RAG knowledge — retrieves but doesn't think about chunking or reranking
- No eval strategy — ships agents without measurement
- Ignoring prompt injection and safety
- Over-engineering with multi-agent when single-agent suffices
- No production observability plan

## Seniority Expectations
- Senior/Staff: Own agent architecture, build eval frameworks, lead safety review
- Mid: Implement agents with clear tool specs, build RAG pipelines
- Junior: Implement tool definitions, basic prompt engineering, test agent flows

## Example Question Categories
- "Walk me through how you'd design a research agent that searches the web and synthesizes information."
- "How do you defend against prompt injection in a tool-using agent?"
- "What's your approach to building evals for an LLM-powered pipeline?"
- "When would you use multi-agent vs single-agent architecture?"
- "How do you handle tool call failures in an agent loop?"
- "What chunking strategy would you use for a legal document RAG system?"
- "How do you observe and debug a failing agent in production?"

## Recommended Modes
- ai-assisted-engineering
- system-design
- project-deep-dive
- behavioral
- coding

## Evaluation Criteria
- Depth of agentic AI systems knowledge
- Safety and alignment mindset
- Eval-first thinking
- Production observability awareness
- Tool design quality
- Communication of complex agent architectures
