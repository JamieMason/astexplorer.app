const chalk = require('chalk');

const error = (...args) => console.error(chalk.red('[FAIL]'), ...args);
const info = (...args) => console.info(chalk.blue('[INFO]'), ...args);
const warn = (...args) => console.warn(chalk.yellow('[WARN]'), ...args);

module.exports = { error, info, warn };
