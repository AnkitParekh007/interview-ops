---
sidebar_position: 12
title: Ethics
description: InterviewOps ethical use policy.
---

# Ethics

InterviewOps is built for **genuine interview preparation** — not deception.

## What it is for

InterviewOps is permitted and encouraged for:

- Practicing before your interview
- Improving communication and storytelling skills
- Reviewing technical knowledge gaps
- Preparing behavioral stories in STAR format
- Getting rubric-based feedback on prepared answers
- Building a personalized study plan
- Understanding what "senior-level" expectations look like
- Practicing AI-assisted engineering discussions

## What it is NOT for

InterviewOps explicitly prohibits and does not support:

| Prohibited use | Why |
|---|---|
| Secret live interview assistance | Enables deception during active interviews |
| Hidden screen overlays | Designed to hide from interviewers |
| Screen-share evasion | Same purpose — deceptive by design |
| Real-time answer injection | Misrepresents candidate knowledge |
| Impersonation | Fundamentally dishonest |
| Misrepresenting skills | Creates role/skill mismatch |
| Violating company interview policies | Breaches trust and may have legal consequences |

## Ethics in every session

Every session includes `ethics-notice.md` stating the practice-only purpose.
This file cannot be disabled. It is present in every simulation run.

## Why this matters

**Fairness**: Other candidates prepare honestly.

**Integrity**: Companies hire you to do real work. If you deceive them, you will
struggle and lose their trust.

**Your growth**: The interview process reveals genuine capability gaps.
Bypassing it means missing the chance to identify and fix those gaps before day one.

## Enforcement

The `npm run verify` command checks that:

- `ethics-notice.md` is present in every session
- No banned phrases appear in session content files
- Ethics config flags remain `true`

The GitHub Actions CI runs these checks on every push.

:::danger
Any fork or PR that adds live interview assistance, hidden overlays, answer injection,
or screen-share evasion will be rejected.
:::
