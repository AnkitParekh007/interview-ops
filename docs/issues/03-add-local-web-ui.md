# Issue: Add Local Web UI for Session Preview

**Labels**: `good first issue`, `enhancement`, `ui`  
**Milestone**: v0.4.0

---

## Summary

Add a `view` command that opens a simple local web UI to browse and preview generated session files — without requiring a server or framework.

---

## Background

InterviewOps generates Markdown session files that are readable in a terminal, but viewing them in a browser with proper formatting is a much better experience — especially for the scorecard, feedback, and study plan.

The goal is a zero-dependency, local-only static file viewer. No frameworks, no build step, no server required beyond Node's built-in `http` module.

---

## Proposed Behavior

```bash
npm run view
# Opens browser to http://localhost:3333
# Shows a list of sessions in output/sessions/
# Click a session to view its files rendered as HTML
```

Or specify a session directly:

```bash
npm run view -- --session output/sessions/2026-05-13-senior-frontend-behavioral
```

---

## Acceptance Criteria

- [ ] `npm run view` starts a local server on port 3333 (or configurable)
- [ ] Browser opens automatically (or prints URL if it can't)
- [ ] Lists all sessions in `output/sessions/`
- [ ] Clicking a session shows all 8 files rendered as HTML
- [ ] Markdown is rendered (not raw)
- [ ] Server stops when user presses Ctrl+C
- [ ] No external npm dependencies added (use Node built-ins only, or at most a minimal markdown parser)
- [ ] Works on macOS, Linux, and Windows

---

## Files to Touch

- `src/cli/commands/view.command.ts` — create
- `src/cli/index.ts` — register command
- `package.json` — add `"view"` script
- `docs/CLI.md` — add `view` command docs

---

## Notes

- Use Node's `http.createServer()` — no Express
- For Markdown rendering, consider `marked` (small, well-tested) or a simple regex approach
- Keep the HTML clean and readable — this doesn't need to be beautiful
