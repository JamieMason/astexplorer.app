import chalk from 'chalk';

export const log = {
  error(...args: any[]) {
    console.error(chalk.red('[FAIL]'), ...args);
  },
  info(...args: any[]) {
    console.info(chalk.blue('[INFO]'), ...args);
  },
  warn(...args: any[]) {
    console.warn(chalk.yellow('[WARN]'), ...args);
  },
};
