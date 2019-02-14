const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const electron = require('electron');

const { createBundlerFor } = require('./lib/bundle');
const { createMenu } = require('./lib/create-menu');
const { defaultSource, defaultTransform } = require('./lib/default-contents');

const { app, BrowserWindow, ipcMain } = electron;

const cssPath = path.resolve(__dirname, './overrides.css');
const uiPath = path.resolve(__dirname, '../vendor/index.html');
const clientScriptPath = path.resolve(__dirname, './inject.js');

let sourcePath;
let sourceWatcher;
let transformPath;
let transformWatcher;
let win;

const cssOverrides = fs.readFileSync(cssPath, { encoding: 'utf8' });

const unwatch = () => {
  if (sourceWatcher) sourceWatcher.close();
  sourceWatcher = null;
  if (transformWatcher) transformWatcher.close();
  transformWatcher = null;
};

const watch = () => {
  const sendSourceToBrowser = () => {
    const sourceData = fs.readFileSync(sourcePath, { encoding: 'utf8' });
    win.webContents.send('source-change-on-disk', sourceData);
  };

  const sendTransformToBrowser = async () => {
    const getBundledTransformData = await createBundlerFor(transformPath);
    const transformData = await getBundledTransformData();
    win.webContents.send('transform-change-on-disk', transformData);
  };

  unwatch();

  if (sourcePath) {
    sourceWatcher = chokidar
      .watch(sourcePath, { persistent: true })
      .on('change', sendSourceToBrowser);
    sendSourceToBrowser();
  } else {
    win.webContents.send('source-change-on-disk', defaultSource);
  }
  if (transformPath) {
    transformWatcher = chokidar
      .watch(transformPath, { persistent: true })
      .on('change', sendTransformToBrowser);
    sendTransformToBrowser();
  } else {
    win.webContents.send('transform-change-on-disk', defaultTransform);
  }
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

  win.webContents.insertCSS(cssOverrides);
  watch();
};

const onOpenSource = (filePath) => {
  sourcePath = filePath;
  watch();
};

const onOpenTransform = (filePath) => {
  transformPath = filePath;
  watch();
};

app.setName('AST Explorer');

app.on('ready', () => {
  createMenu({ onOpenSource, onOpenTransform });
  createWindow();

  win.webContents.on('did-finish-load', onWindowReady);

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

  app.on('will-quit', () => {
    win = null;
    unwatch();
  });
});
