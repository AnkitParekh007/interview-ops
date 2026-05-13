# Issue: Add OpenRouter Provider

**Labels**: `good first issue`, `enhancement`, `provider`  
**Milestone**: v0.2.0

---

## Summary

Add [OpenRouter](https://openrouter.ai/) as an AI provider so users can access 100+ models (GPT-4, Claude, Llama, Mixtral, Gemma, etc.) through a single API key.

---

## Background

OpenRouter is a unified API that routes to many different AI models. It uses an OpenAI-compatible API format, making it relatively straightforward to integrate.

Benefits for InterviewOps users:
- One API key gives access to Claude, GPT-4, Llama, and many others
- Cheaper routing for some models
- Easy to experiment with different models for interview sessions
- Fallback routing if a model is unavailable

---

## Acceptance Criteria

- [ ] `INTERVIEWOPS_PROVIDER=openrouter` works with a valid key
- [ ] `OPENROUTER_API_KEY` is read from `.env`
- [ ] `OPENROUTER_MODEL` can be set (e.g. `anthropic/claude-3-5-sonnet`, `openai/gpt-4o-mini`)
- [ ] Helpful error if key is missing
- [ ] `npm run providers` shows `openrouter`
- [ ] Tests pass
- [ ] Documented in `docs/PROVIDERS.md`

---

## Files to Touch

- `src/providers/openrouter.provider.ts` — create
- `src/providers/provider-registry.ts` — register
- `.env.example` — add `OPENROUTER_API_KEY` and `OPENROUTER_MODEL`
- `docs/PROVIDERS.md` — add section
- `tests/provider-registry.test.ts` — add tests

---

## API Reference

OpenRouter uses OpenAI-compatible chat completions format:

```
POST https://openrouter.ai/api/v1/chat/completions
Authorization: Bearer <OPENROUTER_API_KEY>
Content-Type: application/json

{
  "model": "anthropic/claude-3-5-sonnet",
  "messages": [{ "role": "user", "content": "..." }]
}
```

The existing `src/providers/openai.provider.ts` can be used as a near-direct template — just change the base URL and API key variable name.
