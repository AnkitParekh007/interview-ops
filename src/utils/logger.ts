import chalk from 'chalk';

export const logger = {
  info: (msg: string) => console.log(chalk.blue('ℹ'), msg),
  success: (msg: string) => console.log(chalk.green('✓'), msg),
  warn: (msg: string) => console.log(chalk.yellow('⚠'), msg),
  error: (msg: string) => console.log(chalk.red('✗'), msg),
  log: (msg: string) => console.log(msg),
  section: (title: string) => console.log('\n' + chalk.bold(title)),
  check: (status: 'ok' | 'warn' | 'fail', label: string, detail?: string) => {
    const icon =
      status === 'ok'
        ? chalk.green('OK  ')
        : status === 'warn'
          ? chalk.yellow('WARN')
          : chalk.red('FAIL');
    const line = `  ${icon}  ${label}${detail ? chalk.dim(' — ' + detail) : ''}`;
    console.log(line);
  },
};
