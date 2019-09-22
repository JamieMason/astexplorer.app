const electron = require('electron');

const { mainEvents } = require('../event-types');
const appMenu = require('./app-menu');
const appWindow = require('./app-window');
const rollupWatcher = require('./rollup-watcher');

const { app } = electron;

app.setName('AST Explorer');

app.on('ready', async () => {
  const transformWatcher = rollupWatcher.create((sourceCode) => {
    appWindow.sendEvent(mainEvents.SET_TRANSFORM_CODE, sourceCode);
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
