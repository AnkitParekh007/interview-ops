---
sidebar_position: 3
title: Installation
description: Prerequisites and installation for InterviewOps.
---

# Installation

## Prerequisites

| Requirement | Version | Check |
|---|---|---|
| Node.js | 20 or higher | `node --version` |
| npm | 9 or higher | `npm --version` |
| Git | any | `git --version` |

## Install

```bash
git clone https://github.com/AnkitParekh007/interview-ops.git
cd interview-ops
npm install
```

## Initialize workspace

```bash
cp .env.example .env
npm run init
```

`npm run init` creates:

- `config/interviewops.yml` — from `config/interviewops.example.yml`
- `input/` — for your resume and job description files
- `output/` and `output/sessions/` — for generated session packets
- `.env` — from `.env.example` if not already present

## Verify installation

```bash
npm run doctor
```

All checks should show `OK`. The only expected `WARN` entries are for missing
`.env` or `config/interviewops.yml` if you skipped `npm run init`.

## Troubleshooting

**`npm run doctor` shows WARN for config**

Run `npm run init` to create `config/interviewops.yml`.

**`npm run doctor` shows WARN for .env**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

**Node version error**

InterviewOps requires Node.js 20+. Use [nvm](https://github.com/nvm-sh/nvm) or
[fnm](https://github.com/Schniz/fnm) to manage Node versions:

```bash
nvm use 20
# or
fnm use 20
```

**`tsc` errors on build**

Run `npm install` to ensure all dev dependencies are installed, then `npm run build`.
