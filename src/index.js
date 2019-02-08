const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

let win;
let sourceWatcher;
let transformWatcher;

const rootPath = path.resolve(__dirname, '..');
const sourcePath = path.resolve(rootPath, './test/source.js');
const transformPath = path.resolve(rootPath, './test/transform.js');
const uiPath = path.resolve(rootPath, './website/index.html');
const clientScriptPath = path.resolve(__dirname, './inject.js');

const sendSourceToBrowser = () => {
  const sourceData = fs.readFileSync(sourcePath, { encoding: 'utf8' });
  win.webContents.send('source-change-on-disk', sourceData);
};

const sendTransformToBrowser = () => {
  const transformData = fs.readFileSync(transformPath, { encoding: 'utf8' });
  win.webContents.send('transform-change-on-disk', transformData);
};

const unwatch = () => {
  if (sourceWatcher) sourceWatcher.close();
  sourceWatcher = null;
  if (transformWatcher) transformWatcher.close();
  transformWatcher = null;
};

const watch = () => {
  unwatch();
  sourceWatcher = chokidar
    .watch(sourcePath, { persistent: true })
    .on('change', sendSourceToBrowser);
  transformWatcher = chokidar
    .watch(transformPath, { persistent: true })
    .on('change', sendTransformToBrowser);
};

const createWindow = () => {
  const { height, width } = electron.screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    center: true,
    height,
    webPreferences: {
      nodeIntegration: true,
      preload: clientScriptPath,
    },
    width,
  });
  win.loadFile(uiPath);
  win.on('closed', () => {
    win = null;
  });
};

const onWindowReady = () => {
  ipcMain.on('source-change-in-browser', (event, nextSource) => {
    console.log('received source-change-in-browser:', nextSource);
  });

  watch();
  sendSourceToBrowser();
  sendTransformToBrowser();
};

app.setName('AST Explorer');

app.on('ready', () => {
  createWindow();
  win.webContents.on('did-finish-load', onWindowReady);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    unwatch();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
