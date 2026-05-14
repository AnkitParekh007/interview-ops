# Good First Issues

These are contributor-friendly issues to help you get started with InterviewOps.

---

## 1. Add Ollama provider (local LLMs, no API key)

**Labels:** `good first issue`, `enhancement`, `provider`

Add an Ollama provider to `src/providers/` that calls the local Ollama API at `http://localhost:11434`.

**Files to touch:**
- `src/providers/ollama.provider.ts` (create)
- `src/providers/index.ts`
- `src/config/` provider config

---

## 2. Add keyboard shortcut help modal

**Labels:** `good first issue`, `enhancement`, `ui`

Add a help modal in InterviewOps Studio (triggered by `?` key) that shows keyboard shortcuts: Enter to send, Shift+Enter for newline, Escape to close modal.

**Files to touch:**
- `studio-web/src/app/shared/keyboard-help/`

---

## 3. Add session search/filter in sidebar

**Labels:** `good first issue`, `enhancement`, `ui`

Add a search input at the top of the session sidebar that filters sessions by track or mode name.

**Files to touch:**
- `studio-web/src/app/features/session-sidebar/`

---

## 4. Add Mermaid diagram output for system-design sessions

**Labels:** `good first issue`, `enhancement`, `system-design`

When finishing a `system-design` mode session, generate a `diagram.md` file with a Mermaid diagram stub representing the designed system.

**Files to touch:**
- `studio-api/src/services/mock-interviewer.service.ts`
- `studio-api/src/routes/export.routes.ts`

---

## 5. Add OpenRouter provider

**Labels:** `good first issue`, `enhancement`, `provider`

Add OpenRouter as a provider (`INTERVIEWOPS_PROVIDER=openrouter`) giving access to 100+ models with one API key.

**Files to touch:**
- `src/providers/openrouter.provider.ts` (create)

---

## 6. Add session duration tracking

**Labels:** `good first issue`, `enhancement`

Track session duration (start to finish) and show it in the scorecard and sidebar.

**Files to touch:**
- `studio-api/src/models/studio.models.ts`
- `studio-api/src/services/interview-engine.service.ts`
- `studio-web/src/app/features/scorecard-panel/`

---

## 7. Add dark/light theme toggle

**Labels:** `good first issue`, `enhancement`, `ui`

Add a theme toggle button in the Studio header that switches between dark and light mode using a CSS class on `<body>`.

**Files to touch:**
- `studio-web/src/app/features/studio-shell/`
- `studio-web/src/styles.css`

---

## 8. Improve mock interviewer variety

**Labels:** `good first issue`, `enhancement`

Add more question variety to `mock-interviewer.service.ts`. Currently each mode has a limited set of follow-up questions. Add 5+ more per mode.

**Files to touch:**
- `studio-api/src/services/mock-interviewer.service.ts`

---

## 9. Add resume file upload (PDF/txt)

**Labels:** `good first issue`, `enhancement`

Add file upload support to the profile panel. Accept `.txt` and `.md` files. Extract text and populate the resume text area.

**Files to touch:**
- `studio-web/src/app/features/profile-panel/`

---

## 10. Add session notes field

**Labels:** `good first issue`, `enhancement`

Allow candidates to add personal notes to a session (not shown to the mock interviewer). Notes stored in the session JSON file.

**Files to touch:**
- `studio-api/src/models/studio.models.ts`
- `studio-api/src/routes/sessions.routes.ts`
- `studio-web/src/app/features/chat-window/`
