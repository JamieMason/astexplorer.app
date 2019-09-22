const chalk = require('chalk');

export const error = (...args) => console.error(chalk.red('[FAIL]'), ...args);
export const info = (...args) => console.info(chalk.blue('[INFO]'), ...args);
export const warn = (...args) => console.warn(chalk.yellow('[WARN]'), ...args);
