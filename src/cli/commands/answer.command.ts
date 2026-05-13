import { Command } from 'commander';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { fileExists, readFile, writeFile } from '../../utils/fs-utils.js';
import { evaluateAnswer } from '../../interview/answer-evaluator.js';
import { logger } from '../../utils/logger.js';

export function createAnswerCommand(): Command {
  const cmd = new Command('answer');
  cmd.description('Evaluate a written answer against the session rubric');
  cmd.requiredOption('-s, --session <dir>', 'Path to the session directory');
  cmd.requiredOption('-f, --file <file>', 'Path to the answer markdown file');

  cmd.action(async (opts: { session: string; file: string }) => {
    const cwd = process.cwd();
    const sessionDir = path.resolve(cwd, opts.session);
    const answerPath = path.resolve(cwd, opts.file);

    logger.section('InterviewOps — Answer Evaluation');

    if (!fileExists(sessionDir)) {
      logger.error(`Session directory not found: ${opts.session}`);
      process.exit(1);
    }

    if (!fileExists(answerPath)) {
      logger.error(`Answer file not found: ${opts.file}`);
      process.exit(1);
    }

    const metadataPath = path.join(sessionDir, 'metadata.json');
    if (!fileExists(metadataPath)) {
      logger.error(`Session metadata not found in: ${opts.session}`);
      logger.info('Make sure you point to a valid session directory (e.g. output/sessions/2026-01-01-senior-frontend-behavioral)');
      process.exit(1);
    }

    logger.info(`Session: ${chalk.cyan(opts.session)}`);
    logger.info(`Answer file: ${chalk.cyan(opts.file)}`);

    const spinner = ora('Evaluating answer...').start();

    try {
      const answerContent = readFile(answerPath);
      const metadataRaw = readFile(metadataPath);
      const metadata = JSON.parse(metadataRaw) as { track: string; mode: string };

      const result = await evaluateAnswer({
        answer: answerContent,
        sessionDir,
        track: metadata.track,
        mode: metadata.mode,
      });

      writeFile(path.join(sessionDir, 'answer-scorecard.md'), result.scorecard);
      writeFile(path.join(sessionDir, 'answer-feedback.md'), result.feedback);
      writeFile(path.join(sessionDir, 'answer-improved.md'), result.improvedAnswer);

      spinner.succeed(chalk.green('Answer evaluated!'));
      logger.log('');
      logger.success(`Scorecard: ${path.join(sessionDir, 'answer-scorecard.md')}`);
      logger.success(`Feedback: ${path.join(sessionDir, 'answer-feedback.md')}`);
      logger.success(`Improved answer: ${path.join(sessionDir, 'answer-improved.md')}`);
    } catch (err) {
      spinner.fail(chalk.red('Failed to evaluate answer'));
      logger.error(String(err));
      process.exit(1);
    }
  });

  return cmd;
}
