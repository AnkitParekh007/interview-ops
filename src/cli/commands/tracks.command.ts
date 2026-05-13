import { Command } from 'commander';
import chalk from 'chalk';
import { listTracks, getTrackDescription } from '../../interview/track-loader.js';

export function createTracksCommand(): Command {
  const cmd = new Command('tracks');
  cmd.description('List all available interview tracks');

  cmd.action(() => {
    console.log(chalk.bold('\nAvailable Interview Tracks\n'));

    try {
      const tracks = listTracks();

      if (tracks.length === 0) {
        console.log(chalk.yellow('  No tracks found. Make sure the tracks/ directory exists.'));
        return;
      }

      for (const track of tracks) {
        const description = getTrackDescription(track);
        console.log(`  ${chalk.cyan(track)}`);
        console.log(`     ${chalk.dim(description)}`);
        console.log('');
      }

      console.log(chalk.dim(`Total: ${tracks.length} tracks`));
      console.log(chalk.dim('Usage: npm run simulate -- --track <track-name> --mode <mode-name>\n'));
    } catch (err) {
      console.error(chalk.red('Error listing tracks:'), String(err));
    }
  });

  return cmd;
}
