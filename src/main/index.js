const electron = require('electron');

const { browserEvents, mainEvents } = require('../event-types');
const {
  DEFAULT_TRANSFORM_PARSER,
  DEFAULT_SOURCE,
  DEFAULT_TRANSFORM,
} = require('../constants');
const appMenu = require('./app-menu');
const appWindow = require('./app-window');
const rollupWatcher = require('./rollup-watcher');

const { app, ipcMain } = electron;

app.setName('AST Explorer');

app.on('ready', async () => {
  const transformWatcher = rollupWatcher.create((sourceCode) => {
    appWindow.sendEvent(mainEvents.SET_TRANSFORM_CODE, sourceCode);
  });

  ipcMain.on(browserEvents.REDUX_STORE_CREATED, () => {
    appWindow.sendEvent(
      mainEvents.SET_TRANSFORM_PARSER,
      DEFAULT_TRANSFORM_PARSER,
    );
    appWindow.sendEvent(mainEvents.SET_SOURCE_CODE, DEFAULT_SOURCE);
    appWindow.sendEvent(mainEvents.SET_TRANSFORM_CODE, DEFAULT_TRANSFORM);
  });

  await appMenu.create();
  await appWindow.create();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('will-quit', () => {
    transformWatcher.stop();
  });
});
