# Support

## Getting Help

**GitHub Issues** — for bug reports and feature requests:
https://github.com/AnkitParekh007/interview-ops/issues

**GitHub Discussions** — for questions, ideas, and community conversation:
https://github.com/AnkitParekh007/interview-ops/discussions

---

## Before Opening an Issue

1. Run `npm run doctor` — it catches most common setup problems
2. Check the [docs/](./docs/) folder for documentation
3. Search existing issues to see if your problem has been reported

---

## Common Issues

**`config/interviewops.yml not found`**
Run `npm run init` to create it.

**`provider not available`**
Check your `.env` file. Make sure `INTERVIEWOPS_PROVIDER=mock` for the no-key default.

**`track not found`**
Run `npm run tracks` to see valid track names.

**`mode not found`**
Run `npm run modes` to see valid mode names.

**`npm run demo` fails**
Run `npm run doctor` first. Check that Node.js 20+ is installed.
