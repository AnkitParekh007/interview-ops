import { Command } from 'commander';
import path from 'path';
import { fileExists, copyFile, ensureDir } from '../../utils/fs-utils.js';
import { logger } from '../../utils/logger.js';

const EXAMPLE_FILES = [
  { src: 'input/resume.example.md', dest: 'input/resume.example.md' },
  { src: 'input/job-description.example.md', dest: 'input/job-description.example.md' },
  { src: 'input/answer.example.md', dest: 'input/answer.example.md' },
];

export function createExamplesCommand(): Command {
  const cmd = new Command('examples');
  cmd.description('Copy example input files to the input/ directory');

  cmd.action(() => {
    const cwd = process.cwd();
    logger.section('InterviewOps — Examples');

    ensureDir(path.join(cwd, 'input'));

    let copied = 0;
    let skipped = 0;

    for (const { src, dest } of EXAMPLE_FILES) {
      const srcPath = path.join(cwd, src);
      const destPath = path.join(cwd, dest);

      if (!fileExists(srcPath)) {
        logger.warn(`Source not found: ${src}`);
        continue;
      }

      if (fileExists(destPath) && src === dest) {
        logger.info(`Already exists: ${dest}`);
        skipped++;
        continue;
      }

      copyFile(srcPath, destPath);
      logger.success(`Copied: ${dest}`);
      copied++;
    }

    logger.log('');
    if (copied > 0) {
      logger.success(`${copied} file(s) copied to input/`);
    } else {
      logger.info('All example files already in place');
    }
    logger.log('');
    logger.log('Next steps:');
    logger.log('  npm run simulate -- --track senior-frontend --mode behavioral');
    logger.log('  npm run plan -- --resume input/resume.example.md --job input/job-description.example.md');
  });

  return cmd;
}
