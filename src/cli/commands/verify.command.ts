import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { fileExists, readFile } from '../../utils/fs-utils.js';
import { loadConfig, getOutputDir } from '../../config/config.loader.js';
import { logger } from '../../utils/logger.js';

const REQUIRED_SESSION_FILES = [
  'session.md',
  'questions.md',
  'scorecard.md',
  'feedback.md',
  'improved-answers.md',
  'study-plan.md',
  'ethics-notice.md',
  'metadata.json',
];

const BANNED_PHRASES = [
  'hidden overlay',
  'real-time cheating',
  'live answer injection',
  'screen share evasion',
  'stealth assistance',
];

export function createVerifyCommand(): Command {
  const cmd = new Command('verify');
  cmd.description('Validate the most recent session output');
  cmd.option('-s, --session <dir>', 'Path to a specific session directory to verify');

  cmd.action((opts: { session?: string }) => {
    const config = loadConfig();
    const cwd = process.cwd();

    logger.section('InterviewOps — Verify');

    let sessionDir: string;

    if (opts.session) {
      sessionDir = path.resolve(cwd, opts.session);
    } else {
      // Find most recent session
      const outputDir = path.resolve(cwd, getOutputDir(config));
      if (!fileExists(outputDir)) {
        logger.error(`Output directory not found: ${outputDir}`);
        logger.info('Run: npm run simulate  — to generate a session first');
        process.exit(1);
      }
      const sessions = fs
        .readdirSync(outputDir)
        .filter((d) => fs.statSync(path.join(outputDir, d)).isDirectory())
        .sort()
        .reverse();

      if (sessions.length === 0) {
        logger.error('No sessions found in output directory');
        logger.info('Run: npm run simulate  — to generate a session first');
        process.exit(1);
      }

      sessionDir = path.join(outputDir, sessions[0]!);
      logger.info(`Verifying most recent session: ${chalk.cyan(sessions[0])}`);
    }

    if (!fileExists(sessionDir)) {
      logger.error(`Session directory not found: ${sessionDir}`);
      process.exit(1);
    }

    logger.log('');

    let allPassed = true;

    // Check required files
    for (const file of REQUIRED_SESSION_FILES) {
      const filePath = path.join(sessionDir, file);
      const exists = fileExists(filePath);
      logger.check(exists ? 'ok' : 'fail', file);
      if (!exists) allPassed = false;
    }

    logger.log('');

    // Check ethics notice content
    const ethicsPath = path.join(sessionDir, 'ethics-notice.md');
    if (fileExists(ethicsPath)) {
      const ethicsContent = readFile(ethicsPath).toLowerCase();
      const hasPracticeOnly = ethicsContent.includes('practice') && ethicsContent.includes('only');
      logger.check(hasPracticeOnly ? 'ok' : 'warn', 'ethics-notice.md contains practice-only statement');
      if (!hasPracticeOnly) allPassed = false;
    }

    // Check banned phrases in content files (skip ethics-notice.md — it references these phrases to prohibit them)
    const FILES_TO_CHECK_FOR_BANNED = REQUIRED_SESSION_FILES.filter((f) => f !== 'ethics-notice.md');
    let banPhrasesFound = false;
    for (const file of FILES_TO_CHECK_FOR_BANNED) {
      const filePath = path.join(sessionDir, file);
      if (!fileExists(filePath)) continue;
      const content = readFile(filePath).toLowerCase();
      for (const phrase of BANNED_PHRASES) {
        if (content.includes(phrase)) {
          logger.check('fail', `Banned phrase found in ${file}: "${phrase}"`);
          banPhrasesFound = true;
          allPassed = false;
        }
      }
    }
    if (!banPhrasesFound) {
      logger.check('ok', 'No banned phrases found in session files');
    }

    logger.log('');

    if (allPassed) {
      logger.success('All checks passed. Session is valid.');
    } else {
      logger.error('Some checks failed. Review the issues above.');
      process.exit(1);
    }
  });

  return cmd;
}
