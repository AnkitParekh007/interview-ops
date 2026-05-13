# Good First Issues

These are well-scoped issues suitable for first-time contributors.

---

## 1. Add Ollama Provider

**Labels**: `good first issue`, `provider`, `enhancement`

**Background**:
Ollama allows running LLMs locally (Llama, Mistral, Phi, etc.) without an API key. Adding an Ollama provider would let users run InterviewOps completely offline with any supported model.

**Files to Touch**:
- `src/providers/ollama.provider.ts` (create)
- `src/providers/provider-registry.ts` (register)
- `.env.example` (add `OLLAMA_BASE_URL` and `OLLAMA_MODEL`)
- `docs/PROVIDERS.md` (document)
- `tests/provider-registry.test.ts` (add test)

**Acceptance Criteria**:
- `INTERVIEWOPS_PROVIDER=ollama` works when Ollama is running
- Error message is helpful if Ollama is not running
- `npm run providers` shows ollama in the list
- Tests pass

---

## 2. Add OpenRouter Provider

**Labels**: `good first issue`, `provider`, `enhancement`

**Background**:
OpenRouter provides a single API that routes to 100+ models (GPT-4, Claude, Llama, Mixtral, etc.). Adding an OpenRouter provider would give users access to many models with one integration.

**Files to Touch**:
- `src/providers/openrouter.provider.ts` (create)
- `src/providers/provider-registry.ts` (register)
- `.env.example` (add `OPENROUTER_API_KEY` and `OPENROUTER_MODEL`)
- `docs/PROVIDERS.md` (document)

**Acceptance Criteria**:
- `INTERVIEWOPS_PROVIDER=openrouter` works with a valid key
- Follows the same interface as other providers
- Error is helpful if key is missing

---

## 3. Add Local Web UI for Session Preview

**Labels**: `good first issue`, `enhancement`, `ui`

**Background**:
Generated session files are Markdown. A simple local web UI that renders these files in a browser would make it easier to review sessions without opening a terminal.

**Files to Touch**:
- `src/cli/commands/view.command.ts` (create)
- `scripts/serve.mjs` (create — simple static file server)
- `package.json` (add `"view": "tsx src/cli/index.ts view"` script)

**Acceptance Criteria**:
- `npm run view` opens a browser showing the most recent session
- Works with Node's built-in `http` module or a simple static server
- No external frameworks required
- Renders Markdown as HTML

---

## 4. Add Coding Interview Test-Case Runner

**Labels**: `good first issue`, `enhancement`, `coding`

**Background**:
The coding interview mode generates coding problems, but there's no way to run user solutions against test cases. A test-case runner would let users write a solution and verify it.

**Files to Touch**:
- `src/cli/commands/solve.command.ts` (create)
- `src/interview/code-runner.ts` (create)
- `modes/coding.md` (update to include test-case format)

**Acceptance Criteria**:
- `npm run solve -- --problem input/problem.ts --tests input/tests.ts` runs the solution against test cases
- Output shows pass/fail for each test case
- Works with TypeScript solutions via `tsx`

---

## 5. Add System Design Diagram Mode

**Labels**: `good first issue`, `enhancement`, `system-design`

**Background**:
System design interviews often involve whiteboard diagrams. A mode that generates Mermaid diagram prompts alongside questions would help candidates practice visual thinking.

**Files to Touch**:
- `modes/system-design.md` (update to include diagram prompts)
- `src/providers/mock.provider.ts` (add Mermaid diagram generation for system design)
- `src/output/output-writer.ts` (add diagram.md to system-design sessions)

**Acceptance Criteria**:
- System design sessions include a `diagram.md` with Mermaid diagram stubs
- The diagram represents the architecture being discussed
- Renders correctly in GitHub Markdown preview
