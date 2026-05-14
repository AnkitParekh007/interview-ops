# Release Checklist

Use this checklist for every release. Copy it into the GitHub Release draft or a tracking issue and check off items as you go.

---

## Pre-Release (v0.X.0)

### Code Quality

- [ ] `npm run build` passes with zero errors
- [ ] `npm test` passes — all tests green
- [ ] `npm run studio:build` passes
- [ ] `npm run lint` — zero warnings/errors
- [ ] `npm run format` — no formatting changes needed
- [ ] TypeScript strict mode: zero `any` warnings in new code

### Functionality

- [ ] `npm run doctor` reports all systems OK
- [ ] `npm run demo` completes successfully with mock provider
- [ ] `npm run simulate` works with at least 2 tracks and 2 modes
- [ ] `npm run plan` generates a valid prep plan
- [ ] `npm run verify` validates the session output
- [ ] Studio: `npm run studio` starts without errors
- [ ] Studio: full interview session completes in browser
- [ ] Studio: session history loads correctly
- [ ] Studio: ethics notice is visible

### Ethics

- [ ] `ethics-notice.md` is included in every session output
- [ ] No live interview assistance features added
- [ ] No hidden overlays or screen-share bypass code
- [ ] `ETHICS.md` unchanged (or changes have been explicitly reviewed and approved)
- [ ] `ethics.test.ts` passes

### Documentation

- [ ] `README.md` reflects current features
- [ ] `CHANGELOG.md` updated with all changes since the last release
- [ ] Any new tracks/modes/rubrics documented in `docs/`
- [ ] `.env.example` updated with any new environment variables
- [ ] Breaking changes clearly documented with migration instructions

### Repository

- [ ] Version bumped in `package.json` (root, `studio-api/package.json`, `studio-web/package.json`)
- [ ] Git tag created: `v0.X.0`
- [ ] All commits reference relevant issues where applicable

---

## Release

- [ ] GitHub Release created with the `v0.X.0` tag
- [ ] Release notes written (see `docs/release-notes/`)
- [ ] Milestone closed on GitHub

---

## Post-Release

- [ ] Announce in GitHub Discussions
- [ ] Update `ROADMAP.md` — mark the completed milestone as done
- [ ] Open a new milestone for the next version
