# Launch Checklist

Pre-launch steps for the InterviewOps v0.1.0 public release.

---

## Local Validation (Run First)

```bash
npm run build      # Must pass with 0 errors
npm test           # Must pass (36+ tests)
npm run doctor     # Review output
npm run demo       # Must complete end-to-end
npm run verify     # Must show all OK
npm run start -- --track senior-frontend --mode behavioral  # Must generate session
```

---

## GitHub Repository Setup

### 1. Add Topics (GitHub UI)

Go to: **github.com/AnkitParekh007/interview-ops** → **About** (gear icon) → **Topics**

Add these topics:
```
interview-prep
developer-tools
typescript
cli
ai
openai
anthropic
local-first
open-source
angular
```

### 2. Add Repository Description

```
Open-source AI interview practice system for developers: mock interviews, coding rounds, system design, behavioral prep, scorecards, and local-first model support.
```

### 3. Set Homepage URL

```
https://github.com/AnkitParekh007/interview-ops#readme
```

### 4. Enable Discussions

Go to: **Settings** → **Features** → Enable **Discussions**

### 5. Pin the Repository

Go to your GitHub profile → **Customize your pins** → Add `interview-ops`

---

## Create the v0.1.0 Release

```bash
# Tag and push
git tag -a v0.1.0 -m "InterviewOps v0.1.0 — local-first AI interview practice CLI"
git push origin v0.1.0
```

Then on GitHub: **Releases** → **Create a new release** → Select tag `v0.1.0`

**Release title:**
```
v0.1.0 — InterviewOps: Local-First AI Interview Practice CLI
```

**Release body** (copy from `docs/release-notes/v0.1.0.md`)

Mark as: **Latest release**

---

## Create Good First Issues

Use the `gh` CLI to create the 5 good first issues from `docs/issues/`:

```bash
# Issue 1: Ollama Provider
gh issue create \
  --title "feat: Add Ollama provider (local LLMs, no API key)" \
  --label "good first issue,enhancement,provider" \
  --body-file docs/issues/01-add-ollama-provider.md

# Issue 2: OpenRouter Provider
gh issue create \
  --title "feat: Add OpenRouter provider (100+ models, one API key)" \
  --label "good first issue,enhancement,provider" \
  --body-file docs/issues/02-add-openrouter-provider.md

# Issue 3: Local Web UI
gh issue create \
  --title "feat: Add local web UI for session preview" \
  --label "good first issue,enhancement,ui" \
  --body-file docs/issues/03-add-local-web-ui.md

# Issue 4: Coding Test Runner
gh issue create \
  --title "feat: Add coding interview test-case runner" \
  --label "good first issue,enhancement,coding" \
  --body-file docs/issues/04-add-coding-test-runner.md

# Issue 5: System Design Diagrams
gh issue create \
  --title "feat: Add Mermaid diagram output for system-design sessions" \
  --label "good first issue,enhancement,system-design" \
  --body-file docs/issues/05-add-system-design-diagrams.md
```

> Note: Create the labels first if they don't exist:
> ```bash
> gh label create "good first issue" --color "#7057ff" --description "Good for newcomers"
> gh label create "enhancement" --color "#a2eeef" --description "New feature or request"
> gh label create "provider" --color "#0075ca" --description "AI provider integration"
> gh label create "ui" --color "#e4e669" --description "UI/frontend work"
> gh label create "coding" --color "#d93f0b" --description "Coding/algorithm work"
> gh label create "system-design" --color "#0e8a16" --description "System design work"
> ```

---

## Post-Launch Promotion

Once the repo is public and the release is live:

- [ ] Share on Twitter/X: "Just open-sourced InterviewOps — a local-first AI interview practice CLI for developers. Practice behavioral, system design, coding, Angular, React, and AI-assisted engineering interviews. Mock provider works with zero API keys. ⭐ if useful: [URL]"
- [ ] Post on LinkedIn with the demo screenshot and quick-start commands
- [ ] Submit to relevant communities (Hacker News "Show HN", Reddit r/cscareerquestions, r/webdev, r/typescript)
- [ ] Add to awesome-* lists (awesome-typescript, awesome-cli-tools, etc.)

---

## Verify CI is Green

After pushing to `main`, confirm the GitHub Actions CI passes:
- Node 20 matrix: build → test → doctor → demo → verify
- Node 22 matrix: same

Go to: **github.com/AnkitParekh007/interview-ops/actions**

---

## README Social Preview

Set the Open Graph / social preview image for the repo:
**Settings** → **Social preview** → Upload a screenshot of `npm run demo` output

---

## Done

Once all items above are checked off, InterviewOps v0.1.0 is live and ready for community discovery.
