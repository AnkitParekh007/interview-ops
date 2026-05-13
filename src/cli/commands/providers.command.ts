import { Command } from 'commander';
import chalk from 'chalk';
import { listProviders } from '../../providers/provider-registry.js';

export function createProvidersCommand(): Command {
  const cmd = new Command('providers');
  cmd.description('List available AI providers and their configuration status');

  cmd.action(() => {
    console.log(chalk.bold('\nAvailable Providers\n'));

    try {
      const providers = listProviders();

      for (const p of providers) {
        const selectedTag = p.selected ? chalk.cyan(' [selected]') : '';
        const availableTag = p.available ? chalk.green('✓ available') : chalk.yellow('○ key not set');
        const keyInfo = p.requiresKey ? chalk.dim(' (requires API key)') : chalk.dim(' (no key required)');

        console.log(`  ${chalk.bold(p.name)}${selectedTag}`);
        console.log(`     ${availableTag}${keyInfo}`);
        console.log('');
      }

      console.log(chalk.dim('To change provider: set INTERVIEWOPS_PROVIDER in .env'));
      console.log(chalk.dim('Example: INTERVIEWOPS_PROVIDER=openai\n'));
    } catch (err) {
      console.error(chalk.red('Error listing providers:'), String(err));
    }
  });

  return cmd;
}
