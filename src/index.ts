import chalk from 'chalk';
import electron, { IpcMainEvent } from 'electron';
import { log } from './main/log';
import { browserEvents, mainEvents } from './event-types';

if (process.env.NODE_ENV === 'development') {
  const createEventLogger =
    (label: string, name: string) =>
    (_event: IpcMainEvent, data: any): void => {
      log.info(chalk.yellow(label, name));
      Object.entries(data).forEach(([key, value]) => {
        console.log(`  ${key}: ${JSON.stringify(value)}`);
      });
    };

  Object.values(browserEvents).forEach((name) => {
    electron.ipcMain.on(name, createEventLogger('Browser → Main', name));
  });

  Object.values(mainEvents).forEach((name) => {
    electron.ipcMain.on(name, createEventLogger('Main → Browser', name));
  });
}

require('./main');
