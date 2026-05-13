#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const cwd = process.cwd();

function run(cmd, label) {
  console.log(`\n▶ ${label}`);
  console.log(`  $ ${cmd}\n`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd });
  } catch (e) {
    console.error(`  Error: ${e.message}`);
    process.exit(1);
  }
}

function ensureDir(dir) {
  const full = join(cwd, dir);
  if (!existsSync(full)) mkdirSync(full, { recursive: true });
}

console.log('\n╔══════════════════════════════════════════╗');
console.log('║          InterviewOps Demo               ║');
console.log('║  Local-first AI interview practice CLI   ║');
console.log('╚══════════════════════════════════════════╝\n');
console.log('Provider: mock (no API key required)\n');

// Ensure output dirs exist
ensureDir('output/sessions');
ensureDir('output/plans');
ensureDir('input');

run('npm run doctor', '1/5  Running doctor check');
run('npm run examples', '2/5  Copying example input files');
run('npm run simulate -- --track senior-frontend --mode behavioral', '3/5  Simulating senior-frontend behavioral interview');
run('npm run plan -- --resume input/resume.example.md --job input/job-description.example.md', '4/5  Generating prep plan from resume + job description');
run('npm run verify', '5/5  Verifying session outputs');

console.log('\n╔══════════════════════════════════════════╗');
console.log('║            Demo Complete!                ║');
console.log('╚══════════════════════════════════════════╝\n');
console.log('Generated files:');
console.log('  output/sessions/   — interview session packet');
console.log('  output/plans/      — personalized prep plan\n');
console.log('Next steps:');
console.log('  npm run tracks     — see all available tracks');
console.log('  npm run modes      — see all available modes');
console.log('  npm run simulate -- --track angular-developer --mode frontend-architecture');
console.log('');
