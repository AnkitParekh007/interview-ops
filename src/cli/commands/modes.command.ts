import { Command } from 'commander';
import chalk from 'chalk';
import { listModes, getModeDescription } from '../../interview/mode-loader.js';

export function createModesCommand(): Command {
  const cmd = new Command('modes');
  cmd.description('List all available interview modes');

  cmd.action(() => {
    console.log(chalk.bold('\nAvailable Interview Modes\n'));

    try {
      const modes = listModes();

      if (modes.length === 0) {
        console.log(chalk.yellow('  No modes found. Make sure the modes/ directory exists.'));
        return;
      }

      for (const mode of modes) {
        const description = getModeDescription(mode);
        console.log(`  ${chalk.magenta(mode)}`);
        console.log(`     ${chalk.dim(description)}`);
        console.log('');
      }

      console.log(chalk.dim(`Total: ${modes.length} modes`));
      console.log(chalk.dim('Usage: npm run simulate -- --track <track-name> --mode <mode-name>\n'));
    } catch (err) {
      console.error(chalk.red('Error listing modes:'), String(err));
    }
  });

  return cmd;
}
