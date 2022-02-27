import electron from 'electron';
import { browserEvents, mainEvents } from '../event-types';
import * as appMenu from './app-menu';
import * as appWindow from './app-window';
import * as fileDialog from './file-dialog';
import * as rollupWatcher from './rollup-watcher';

const { app, ipcMain } = electron;

app.setName('AST Explorer');

app.on('ready', async () => {
  const transformWatcher = rollupWatcher.create((sourceCode) => {
    appWindow.sendEvent(mainEvents.SET_TRANSFORM_CODE, sourceCode);
  });

  ipcMain.on(
    browserEvents.REDUX_ACTION_DISPATCHED,
    async (
      event,
      action: { type: string; transformer: { category: { id: any } } },
    ) => {
      if (action && action.type === 'SELECT_TRANSFORMER') {
        const transformId = action.transformer.category.id;
        const filePath = await fileDialog.openTransform(transformId);
        if (!filePath) return;
        const sourceCode = await transformWatcher.setFilePath(filePath);
        appWindow.sendEvent(mainEvents.SET_TRANSFORM_CODE, sourceCode);
        transformWatcher.start();
      }
    },
  );

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
