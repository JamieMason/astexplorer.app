const devtoolsInstaller = require('electron-devtools-installer');
const electron = require('electron');
const fs = require('fs');
const constants = require('../constants');

const { app, BrowserWindow } = electron;
let win = null;

const dereference = () => {
  win = null;
};

const installDevtools = (names) => {
  const { default: installExtension } = devtoolsInstaller;
  return Promise.all(
    names.map((name) =>
      installExtension(devtoolsInstaller[name]).catch((err) => {
        console.error(`Failed to install "${name}"`, err);
      }),
    ),
  );
};

app.on('will-quit', dereference);

const create = async () => {
  if (win) {
    throw new Error('attempt to recreate existing app window');
  }
  const { height, width } = electron.screen.getPrimaryDisplay().workAreaSize;
  const { CLIENT_SCRIPT_PATH, CSS_PATH, ICON_PATH, WEBSITE_PATH } = constants;

  win = new BrowserWindow({
    center: true,
    height,
    icon: ICON_PATH,
    webPreferences: { nodeIntegration: true, preload: CLIENT_SCRIPT_PATH },
    width,
  });

  if (process.env.NODE_ENV === 'development') {
    await installDevtools(['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']);
    win.webContents.openDevTools({ mode: 'right' });
  }

  win.loadFile(WEBSITE_PATH);
  win.once('closed', dereference);
  await new Promise((done) => win.webContents.once('did-finish-load', done));
  const cssOverrides = fs.readFileSync(CSS_PATH, { encoding: 'utf8' });
  win.webContents.insertCSS(cssOverrides);
};

const sendEvent = (name, data) => {
  if (!win) {
    throw new Error('attempt to send event to missing app window');
  }
  win.webContents.send(name, data);
};

module.exports = { create, sendEvent };
