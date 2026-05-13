import { Command } from 'commander';
import path from 'path';
import { fileExists, ensureDir, copyFile } from '../../utils/fs-utils.js';
import { logger } from '../../utils/logger.js';

export function createInitCommand(): Command {
  const cmd = new Command('init');
  cmd.description('Initialize your InterviewOps workspace');

  cmd.action(() => {
    const cwd = process.cwd();
    logger.section('Initializing InterviewOps workspace...');

    // Copy config
    const configSrc = path.join(cwd, 'config', 'interviewops.example.yml');
    const configDest = path.join(cwd, 'config', 'interviewops.yml');
    if (fileExists(configDest)) {
      logger.warn('config/interviewops.yml already exists — skipping');
    } else if (fileExists(configSrc)) {
      copyFile(configSrc, configDest);
      logger.success('Created config/interviewops.yml');
    } else {
      logger.warn('config/interviewops.example.yml not found — skipping config creation');
    }

    // Create directories
    const dirs = ['input', 'output', 'output/sessions', 'output/plans', 'examples'];
    for (const dir of dirs) {
      const dirPath = path.join(cwd, dir);
      if (!fileExists(dirPath)) {
        ensureDir(dirPath);
        logger.success(`Created ${dir}/`);
      } else {
        logger.info(`${dir}/ already exists — skipping`);
      }
    }

    // Copy .env if needed
    const envSrc = path.join(cwd, '.env.example');
    const envDest = path.join(cwd, '.env');
    if (!fileExists(envDest) && fileExists(envSrc)) {
      copyFile(envSrc, envDest);
      logger.success('Created .env from .env.example');
    } else if (fileExists(envDest)) {
      logger.info('.env already exists — skipping');
    }

    logger.section('Done! Next steps:');
    logger.log('  1. Edit config/interviewops.yml to customize your setup');
    logger.log('  2. Edit .env to set your provider (default: mock)');
    logger.log('  3. Run: npm run examples   — to copy example input files');
    logger.log('  4. Run: npm run simulate -- --track senior-frontend --mode behavioral');
    logger.log('  5. Run: npm run doctor     — to verify your setup\n');
  });

  return cmd;
}
