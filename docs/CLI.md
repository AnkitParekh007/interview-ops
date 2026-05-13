# CLI Reference

Complete reference for all `interviewops` commands.

---

## Global Options

```
interviewops [command] --help    Show help for a command
interviewops --version           Show version number
```

---

## Commands

### `init`

Initialize your InterviewOps workspace.

```bash
npm run init
```

Creates `config/interviewops.yml`, `input/`, `output/`, `output/sessions/`, and `.env` (from `.env.example` if missing).

---

### `doctor`

Validate your setup.

```bash
npm run doctor
```

Checks Node.js version, config file, `.env`, input/output directories, tracks, modes, rubrics, and provider availability.

---

### `providers`

List available AI providers and their status.

```bash
npm run providers
```

Shows which provider is selected and whether its API key is configured.

---

### `tracks`

List all available interview tracks.

```bash
npm run tracks
```

---

### `modes`

List all available interview modes.

```bash
npm run modes
```

---

### `start` / `simulate`

Run a full mock interview simulation.

```bash
npm run start -- --track <track> --mode <mode> [--duration <minutes>] [--provider <provider>]
npm run simulate -- --track <track> --mode <mode> [--duration <minutes>] [--provider <provider>]
```

`start` and `simulate` are equivalent. `start` is the intuitive entry point; `simulate` is the canonical name.

**Options:**

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--track` | `-t` | Interview track | `senior-frontend` |
| `--mode` | `-m` | Interview mode | `behavioral` |
| `--duration` | `-d` | Duration in minutes | `45` |
| `--provider` | `-p` | Provider override | from `.env` |

**Examples:**

```bash
npm run start -- --track senior-frontend --mode behavioral
npm run start -- --track angular-developer --mode frontend-architecture --duration 60
npm run simulate -- --track ai-agentic-engineer --mode ai-assisted-engineering
npm run simulate -- --track react-developer --mode coding --provider openai
```

---

### `plan`

Generate a personalized interview prep plan from your resume and job description.

```bash
npm run plan -- --resume <file> --job <file> [--output <dir>]
```

**Options:**

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--resume` | `-r` | Path to resume Markdown file | `input/resume.example.md` |
| `--job` | `-j` | Path to job description Markdown file | `input/job-description.example.md` |
| `--output` | `-o` | Output directory | `output/plans` |

**Example:**

```bash
npm run plan -- --resume input/my-resume.md --job input/target-role.md
```

---

### `answer`

Evaluate a written answer against the session rubric.

```bash
npm run answer -- --session <session-dir> --file <answer-file>
```

**Options:**

| Option | Description |
|--------|-------------|
| `--session` | Path to the session directory |
| `--file` | Path to the answer Markdown file |

**Example:**

```bash
npm run answer -- \
  --session output/sessions/2026-05-13-senior-frontend-behavioral \
  --file input/answer.example.md
```

Outputs `answer-scorecard.md`, `answer-feedback.md`, and `answer-improved.md` into the session directory.

---

### `verify`

Validate the most recent session output.

```bash
npm run verify
npm run verify -- --session output/sessions/2026-05-13-senior-frontend-behavioral
```

Checks that all required files exist, the ethics notice is present, and no banned phrases appear in content files.

---

### `examples`

Copy example input files to `input/`.

```bash
npm run examples
```

Copies `resume.example.md`, `job-description.example.md`, and `answer.example.md` to `input/`.

---

### `demo`

Run a full end-to-end demo using the mock provider.

```bash
npm run demo
```

Runs: doctor → examples → simulate → plan → verify. No API key required.
