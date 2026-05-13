import { Command } from 'commander';
import { execSync } from 'child_process';
import path from 'path';
import chalk from 'chalk';
import { fileExists, listFiles } from '../../utils/fs-utils.js';
import { listProviders } from '../../providers/provider-registry.js';

function getNodeVersion(): string | null {
  try {
    return execSync('node --version', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}

function checkOk(label: string, detail?: string) {
  const icon = chalk.green('OK  ');
  console.log(`  ${icon}  ${label}${detail ? chalk.dim(' — ' + detail) : ''}`);
}

function checkWarn(label: string, detail?: string) {
  const icon = chalk.yellow('WARN');
  console.log(`  ${icon}  ${label}${detail ? chalk.dim(' — ' + detail) : ''}`);
}

function checkFail(label: string, detail?: string) {
  const icon = chalk.red('FAIL');
  console.log(`  ${icon}  ${label}${detail ? chalk.dim(' — ' + detail) : ''}`);
}

export function createDoctorCommand(): Command {
  const cmd = new Command('doctor');
  cmd.description('Check your InterviewOps installation and configuration');

  cmd.action(() => {
    const cwd = process.cwd();

    console.log(chalk.bold('\nInterviewOps Doctor'));
    console.log('===================\n');

    // Node.js version
    const nodeVersion = getNodeVersion();
    if (nodeVersion) {
      const versionNum = parseInt(nodeVersion.replace('v', '').split('.')[0] ?? '0', 10);
      if (versionNum >= 20) {
        checkOk(`Node.js ${nodeVersion}`);
      } else {
        checkWarn(`Node.js ${nodeVersion}`, 'Node.js 20+ is recommended');
      }
    } else {
      checkFail('Node.js', 'Could not detect Node.js version');
    }

    // package.json
    if (fileExists(path.join(cwd, 'package.json'))) {
      checkOk('package.json');
    } else {
      checkFail('package.json', 'not found');
    }

    // Config file
    const configPath = process.env['INTERVIEWOPS_CONFIG'] ?? 'config/interviewops.yml';
    if (fileExists(path.join(cwd, configPath))) {
      checkOk(`${configPath}`);
    } else {
      checkWarn(`${configPath}`, 'not found, using defaults');
    }

    // .env file
    if (fileExists(path.join(cwd, '.env'))) {
      checkOk('.env');
    } else {
      checkWarn('.env', 'not found — copy .env.example to .env');
    }

    // input/ dir
    if (fileExists(path.join(cwd, 'input'))) {
      checkOk('input/');
    } else {
      checkWarn('input/', 'not found — run: npm run init');
    }

    // output/ dir
    if (fileExists(path.join(cwd, 'output'))) {
      checkOk('output/');
    } else {
      checkWarn('output/', 'not found — run: npm run init');
    }

    // tracks/
    const tracksDir = path.join(cwd, 'tracks');
    const tracks = fileExists(tracksDir) ? listFiles(tracksDir, '.md') : [];
    if (tracks.length > 0) {
      checkOk(`tracks/ (${tracks.length} tracks found)`);
    } else {
      checkFail('tracks/', 'no track files found');
    }

    // modes/
    const modesDir = path.join(cwd, 'modes');
    const modes = fileExists(modesDir) ? listFiles(modesDir, '.md').filter((f) => !f.startsWith('_')) : [];
    if (modes.length > 0) {
      checkOk(`modes/ (${modes.length} modes found)`);
    } else {
      checkFail('modes/', 'no mode files found');
    }

    // rubrics/
    const rubricsDir = path.join(cwd, 'rubrics');
    const rubrics = fileExists(rubricsDir) ? listFiles(rubricsDir, '.md') : [];
    if (rubrics.length > 0) {
      checkOk(`rubrics/ (${rubrics.length} rubrics found)`);
    } else {
      checkFail('rubrics/', 'no rubric files found');
    }

    // Provider check
    try {
      const providers = listProviders();
      const selected = providers.find((p) => p.selected);
      const providerName = selected?.name ?? 'mock';
      const needsKey = providerName !== 'mock';

      if (selected?.available) {
        checkOk(`provider: ${providerName}${needsKey ? ' (API key configured)' : ' (no API key required)'}`);
      } else {
        checkWarn(`provider: ${providerName}`, 'API key not configured — set in .env or switch to mock');
      }
    } catch {
      checkWarn('provider', 'could not detect provider');
    }

    console.log('');
    console.log(chalk.dim('MVP Status:   ') + 'local-first AI interview practice system');
    console.log(chalk.dim('API keys:     ') + 'only required for non-mock providers');
    console.log(chalk.dim('Live cheating:') + ' not included');
    console.log(chalk.dim('Ethics notice:') + ' enabled in every session\n');
  });

  return cmd;
}
