# Ethics

InterviewOps is built on a clear principle: **help developers build real skill, not fake signals**.

This document explains how ethics is enforced in the codebase and what to do if you encounter a violation.

For the full ethics policy, see [ETHICS.md](../ETHICS.md) in the project root.

---

## Ethics in Code

Ethics guardrails are not just documentation — they are enforced in the codebase:

### 1. Ethics Notice in Every Session

Every `simulate` / `start` command produces an `ethics-notice.md` file. This file:
- Cannot be disabled by config
- States the practice-only purpose
- Lists prohibited uses explicitly
- Is always the last file reviewed by `npm run verify`

Source: `src/output/output-writer.ts` → `buildEthicsNoticeMd()`

### 2. Verify Command Ethics Checks

`npm run verify` runs two ethics checks:

1. Confirms `ethics-notice.md` contains a practice-only statement
2. Scans all session content files for banned phrases (live cheating terminology)

Source: `src/cli/commands/verify.command.ts`

### 3. Default Config Blocks Cheating Features

The default configuration explicitly disables cheating features:

```yaml
ethics:
  practice_only: true
  block_live_cheating_features: true
  include_ethics_notice: true
  no_hidden_overlay: true
  no_real_time_answer_injection: true
```

These are `true` by default and cannot be set to `false` without modifying the source code (and any such PR would be rejected).

Source: `src/config/config.schema.ts` → `EthicsConfigSchema`

### 4. CI Ethics Validation

The GitHub Actions CI pipeline runs `npm run verify` on every push and pull request, ensuring ethics compliance is checked before any merge.

Source: `.github/workflows/ci.yml`

---

## What We Reject

Pull requests and forks that add any of the following will be rejected or flagged:

| Feature | Why it's rejected |
|---------|------------------|
| Live interview overlay | Enables deception during active interviews |
| Real-time answer injection | Misrepresents candidate knowledge |
| Screen-share evasion | Designed to hide cheating from interviewers |
| Background answer feed | Same as overlay — deceptive by design |
| "Stealth mode" anything | The name says it all |

---

## Reporting Misuse

If you find a fork or downstream project that has removed these guardrails and is being used for live interview cheating, please open an issue on this repository so we can investigate and add a public notice.

---

## For AI Agents

AI agents (Claude Code, Copilot, GPT, etc.) working on this codebase must follow the rules in [AGENTS.md](../AGENTS.md). In particular:

- Never add live interview assistance features
- Always include `ethics-notice.md` in session output
- Never claim hiring guarantees
- Never invent company-specific interview facts
