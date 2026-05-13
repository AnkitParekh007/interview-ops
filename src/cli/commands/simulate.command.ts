import { Command } from 'commander';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { runSession } from '../../interview/session-runner.js';
import { writeSession, getSessionDir } from '../../output/output-writer.js';
import { loadConfig, getOutputDir } from '../../config/config.loader.js';
import { logger } from '../../utils/logger.js';

export function createSimulateCommand(): Command {
  const cmd = new Command('simulate');
  cmd.description('Run a full interview simulation session');
  cmd.option('-t, --track <track>', 'Interview track (e.g. senior-frontend, angular-developer)');
  cmd.option('-m, --mode <mode>', 'Interview mode (e.g. behavioral, frontend-architecture)');
  cmd.option('-d, --duration <minutes>', 'Session duration in minutes', '45');
  cmd.option('-p, --provider <provider>', 'AI provider override (mock, openai, anthropic, gemini)');

  cmd.action(async (opts: { track?: string; mode?: string; duration?: string; provider?: string }) => {
    const config = loadConfig();

    const track = opts.track ?? config.project.default_track;
    const mode = opts.mode ?? config.project.default_mode;
    const duration = parseInt(opts.duration ?? '45', 10);

    logger.section('InterviewOps — Simulate');
    logger.info(`Track: ${chalk.cyan(track)}`);
    logger.info(`Mode: ${chalk.magenta(mode)}`);
    logger.info(`Duration: ${duration} minutes`);

    const spinner = ora('Generating interview session...').start();

    try {
      const session = await runSession({
        track,
        mode,
        duration,
        providerName: opts.provider,
      });

      const outputDir = getOutputDir(config);
      const sessionDir = getSessionDir(path.resolve(process.cwd(), outputDir), session.metadata.id);

      writeSession(sessionDir, session);

      spinner.succeed(chalk.green('Session generated successfully!'));

      logger.log('');
      logger.success(`Session ID: ${session.metadata.id}`);
      logger.success(`Output directory: ${sessionDir}`);
      logger.log('');
      logger.log(chalk.dim('Files written:'));
      logger.log(chalk.dim('  session.md, questions.md, scorecard.md, feedback.md'));
      logger.log(chalk.dim('  improved-answers.md, study-plan.md, ethics-notice.md, metadata.json'));
      logger.log('');
      logger.info(`Provider: ${session.metadata.provider} / ${session.metadata.model}`);
    } catch (err) {
      spinner.fail(chalk.red('Failed to generate session'));
      logger.error(String(err));
      process.exit(1);
    }
  });

  return cmd;
}
