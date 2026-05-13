# Issue: Add Ollama Provider

**Labels**: `good first issue`, `enhancement`, `provider`  
**Milestone**: v0.2.0

---

## Summary

Add support for [Ollama](https://ollama.com/) as an AI provider so users can run InterviewOps completely offline using local models (Llama 3, Mistral, Phi, Gemma, etc.).

---

## Background

InterviewOps currently supports OpenAI, Anthropic, Gemini, and a built-in mock provider. All cloud providers require API keys and send data to third-party servers.

Ollama runs LLMs locally on the user's machine. Adding an Ollama provider would:
- Enable fully offline interview practice
- Eliminate API costs for heavy users
- Allow use of open-weight models (Llama 3, Mistral, Phi-3)
- Be attractive to privacy-conscious users

---

## Acceptance Criteria

- [ ] `INTERVIEWOPS_PROVIDER=ollama` works when Ollama is running locally
- [ ] `OLLAMA_BASE_URL` defaults to `http://localhost:11434`
- [ ] `OLLAMA_MODEL` can be set in `.env` (e.g. `llama3`, `mistral`)
- [ ] Helpful error message if Ollama is not running or model is not available
- [ ] `npm run providers` shows `ollama` in the provider list
- [ ] `npm run doctor` checks Ollama availability when it's selected
- [ ] Tests pass (add to `tests/provider-registry.test.ts`)
- [ ] Documented in `docs/PROVIDERS.md`

---

## Files to Touch

- `src/providers/ollama.provider.ts` — create (implement `InterviewProvider`)
- `src/providers/provider-registry.ts` — register `ollama`
- `.env.example` — add `OLLAMA_BASE_URL` and `OLLAMA_MODEL`
- `docs/PROVIDERS.md` — add Ollama section
- `tests/provider-registry.test.ts` — add ollama tests

---

## Reference Implementation

See `src/providers/mock.provider.ts` for the simplest reference, and `src/providers/openai.provider.ts` for a fetch-based HTTP implementation.

Ollama's API endpoint: `POST http://localhost:11434/api/generate` or `/api/chat`

---

## Notes

- Use the `/api/chat` endpoint for chat-style completions (matches other providers)
- Handle connection refused errors gracefully (Ollama not running)
- Handle model not found errors gracefully
- No API key needed — just check the base URL is reachable
