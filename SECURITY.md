# Security Policy

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report security issues privately by emailing the maintainer or using GitHub's private vulnerability reporting feature on this repository.

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested remediation

We will respond within 48 hours and aim to publish a fix within 7 days for critical issues.

---

## API Key Security

- **Never commit your `.env` file** — it is gitignored by default
- **Never log API keys** — InterviewOps never logs key values
- **Never share API keys** in issues, PRs, or discussions
- Rotate your API key immediately if you believe it has been exposed

---

## Data Security

InterviewOps is local-first. Your data stays on your machine:

- No telemetry is collected
- No session data is sent to a central server
- Resume and job description files stay in your local `input/` directory
- Session outputs stay in your local `output/` directory

---

## Scope

Security issues in scope:
- Command injection vulnerabilities in CLI commands
- File path traversal vulnerabilities
- Prompt injection via user-supplied config/input files
- Dependency vulnerabilities (report via `npm audit`)

Out of scope:
- Issues with third-party API providers (OpenAI, Anthropic, Gemini)
- Issues with AI model outputs
