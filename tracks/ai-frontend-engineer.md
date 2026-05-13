# AI Frontend Engineer Track

## Who This Is For
Frontend engineers who build AI-powered user interfaces — products with LLM chat, streaming responses, tool call UIs, AI-assisted workflows, and model-driven features. Targeting roles at AI-first companies, product teams embedding AI, or developer-tools organizations.

## Expected Skills
- Streaming UI — handling SSE/streaming responses from AI APIs
- AI SDK integration — Vercel AI SDK, OpenAI JS SDK, Anthropic SDK
- Prompt management on the frontend — building prompt templates, system prompts
- Loading states for AI — handling latency, progressive disclosure, skeleton UIs
- Tool call rendering — displaying structured AI tool calls in UI
- Accessibility for AI content — streaming text, dynamic updates, ARIA live regions
- Error handling for AI — rate limits, hallucinations, model errors, retries
- Model provider integration — OpenAI, Anthropic, Gemini, multimodal inputs
- Security — never expose API keys on the frontend, proxy patterns
- Performance — streaming renders, avoiding layout thrash with dynamic content
- Ethical AI display — not misrepresenting AI capabilities, showing uncertainty

## Interview Focus Areas
1. Streaming UX — how to render token-by-token output, progress indicators
2. AI SDK architecture — wrapping SDK calls, abstracting providers
3. Error handling — what to show when AI fails, graceful degradation
4. Prompt engineering for UI — how prompts affect user-facing output
5. Security model — API proxy patterns, never leaking keys to client
6. Accessibility — ARIA live regions for streaming content, keyboard nav in AI UIs
7. Performance — handling large responses, virtualized chat histories
8. Multimodal inputs — file upload, image input, voice input in UI
9. State management for AI conversations — message history, context windows
10. Ethical display — showing AI disclaimers, uncertainty, limitations clearly

## Common Interview Rounds
- **Recruiter Screen** (30 min): AI product experience, team fit, motivation
- **Technical Screen** (45 min): AI SDK knowledge, streaming, security
- **Frontend Coding** (60 min): Build a chat UI or streaming component
- **AI System Design** (60 min): Design an AI-powered feature end-to-end
- **Behavioral Round** (45 min): Shipping AI features, handling uncertainty
- **Portfolio Review** (45 min): Walk through AI-powered products you've built

## Common Weak Spots
- Exposing API keys directly in frontend code
- Not handling streaming errors gracefully
- Treating AI output as always-correct (not adding uncertainty signals)
- Poor accessibility for dynamically updating AI content
- No strategy for model failures or rate limits
- Overcomplicated state for simple chat scenarios
- Not understanding token limits and context window management

## Seniority Expectations
- Senior: Own the AI integration architecture, establish patterns for the team
- Mid: Implement AI features with guidance, strong SDK knowledge
- Junior: Component-level AI feature work, understand basic streaming patterns

## Example Question Categories
- "How do you handle streaming SSE responses from an LLM in a React/Angular app?"
- "Walk me through your approach to making an AI chat UI accessible."
- "How do you prevent API key exposure when integrating AI on the frontend?"
- "What happens when the AI API times out mid-stream? How do you handle it?"
- "How do you show users that content is AI-generated without being alarming?"
- "What patterns do you use to manage conversation history in a chat interface?"
- "How would you build a reusable streaming text component?"

## Recommended Modes
- ai-assisted-engineering
- frontend-architecture
- behavioral
- project-deep-dive
- coding

## Evaluation Criteria
- Practical AI SDK integration experience
- Security-first approach to AI key management
- Accessibility discipline for dynamic AI content
- Thoughtful error handling and fallback design
- Ethical AI display patterns
- Performance with large or streaming AI responses
