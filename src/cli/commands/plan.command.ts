import { Command } from 'commander';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { fileExists, readFile, writeFile, ensureDir } from '../../utils/fs-utils.js';
import { generatePrepPlan } from '../../interview/prep-plan-generator.js';
import { loadConfig } from '../../config/config.loader.js';
import { logger } from '../../utils/logger.js';

export function createPlanCommand(): Command {
  const cmd = new Command('plan');
  cmd.description('Generate a personalized interview preparation plan');
  cmd.option('-r, --resume <file>', 'Path to resume markdown file', 'input/resume.example.md');
  cmd.option('-j, --job <file>', 'Path to job description markdown file', 'input/job-description.example.md');
  cmd.option('-o, --output <dir>', 'Output directory', 'output/plans');

  cmd.action(async (opts: { resume: string; job: string; output: string }) => {
    const config = loadConfig();
    const cwd = process.cwd();

    const resumePath = path.resolve(cwd, opts.resume);
    const jobPath = path.resolve(cwd, opts.job);
    const outputDir = path.resolve(cwd, opts.output);

    logger.section('InterviewOps — Prep Plan');

    if (!fileExists(resumePath)) {
      logger.error(`Resume file not found: ${opts.resume}`);
      logger.info('Try: npm run examples  — to copy example files');
      process.exit(1);
    }

    if (!fileExists(jobPath)) {
      logger.error(`Job description file not found: ${opts.job}`);
      logger.info('Try: npm run examples  — to copy example files');
      process.exit(1);
    }

    logger.info(`Resume: ${chalk.cyan(opts.resume)}`);
    logger.info(`Job description: ${chalk.cyan(opts.job)}`);

    const spinner = ora('Generating preparation plan...').start();

    try {
      const resume = readFile(resumePath);
      const jobDescription = readFile(jobPath);

      const plan = await generatePrepPlan({ resume, jobDescription, config });

      const date = new Date().toISOString().split('T')[0];
      const planDir = path.join(outputDir, `${date}-prep-plan`);
      ensureDir(planDir);

      writeFile(path.join(planDir, 'prep-plan.md'), plan);
      writeFile(
        path.join(planDir, 'metadata.json'),
        JSON.stringify(
          {
            type: 'prep-plan',
            resume_file: opts.resume,
            job_description_file: opts.job,
            created_at: new Date().toISOString(),
            provider: process.env['INTERVIEWOPS_PROVIDER'] ?? config.model.provider,
          },
          null,
          2,
        ),
      );

      spinner.succeed(chalk.green('Prep plan generated!'));
      logger.log('');
      logger.success(`Output: ${planDir}`);
    } catch (err) {
      spinner.fail(chalk.red('Failed to generate prep plan'));
      logger.error(String(err));
      process.exit(1);
    }
  });

  return cmd;
}
