# Issue: Add Coding Interview Test-Case Runner

**Labels**: `good first issue`, `enhancement`, `coding`  
**Milestone**: v0.3.0

---

## Summary

Add a `solve` command that runs a user's TypeScript/JavaScript solution against test cases — turning the coding interview mode into an interactive practice environment.

---

## Background

The `coding` interview mode generates coding problems, but currently there's no way to run user solutions against test cases. A test runner would close this loop and make coding practice genuinely interactive.

---

## Proposed Behavior

```bash
# Solve a generated coding problem
npm run solve -- --problem input/problem.ts --tests input/problem.test.ts

# Or solve directly from a session
npm run solve -- --session output/sessions/2026-05-13-senior-frontend-coding
```

Expected output:

```
InterviewOps — Solve

Problem: Implement a debounce function
Tests: 5 test cases

  ✓ Returns a function
  ✓ Delays execution by the specified time
  ✓ Only calls the function once when invoked rapidly
  ✗ Cancels pending call when called again (FAIL)
    Expected: fn called once after 200ms delay
    Received: fn called twice

3/5 passed
```

---

## Acceptance Criteria

- [ ] `npm run solve -- --problem <file> --tests <file>` runs tests via `tsx`
- [ ] Output shows pass/fail per test case
- [ ] Helpful error if test file or problem file not found
- [ ] Works with TypeScript solutions
- [ ] The coding mode session generates a `problem.ts` stub and `problem.test.ts` file
- [ ] Tests pass (add unit tests for the runner)
- [ ] Documented in `docs/CLI.md`

---

## Files to Touch

- `src/cli/commands/solve.command.ts` — create
- `src/cli/index.ts` — register command
- `src/interview/code-runner.ts` — create (spawn tsx, capture output)
- `src/output/output-writer.ts` — add `problem.ts` and `problem.test.ts` for coding sessions
- `src/providers/mock.provider.ts` — generate coding problem stub and test cases for coding mode
- `package.json` — add `"solve"` script

---

## Notes

- Use `child_process.spawn('tsx', [testFile])` to run tests
- Vitest or a simple assertion library can be used for the test format
- Keep the problem format simple — just a TypeScript function stub
- Test cases should be clear and beginner-friendly
