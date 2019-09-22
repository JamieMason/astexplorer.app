const chalk = require('chalk');
const electron = require('electron');
const log = require('./main/log');
const { browserEvents, mainEvents } = require('./event-types');

const { ipcMain } = electron;

const createEventLogger = (label, name) => (event, data = {}) => {
  log.info(chalk.yellow(label, name));
  Object.entries(data).forEach(([key, value]) => {
    console.log(`  ${key}: ${JSON.stringify(value)}`);
  });
};

Object.values(browserEvents).forEach((name) => {
  ipcMain.on(name, createEventLogger('Browser → Main', name));
});

Object.values(mainEvents).forEach((name) => {
  ipcMain.on(name, createEventLogger('Main → Browser', name));
});

require('./main');
