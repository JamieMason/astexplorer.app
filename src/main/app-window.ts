import devtoolsInstaller, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import electron from 'electron';
import fs from 'fs';
import {
  CLIENT_SCRIPT_PATH,
  CSS_PATH,
  ICON_PATH,
  WEBSITE_PATH,
} from '../constants';

const { app, BrowserWindow } = electron;
let win: electron.BrowserWindow | null = null;

const dereference = () => {
  win = null;
};

app.on('will-quit', dereference);

export const create = async () => {
  if (win) {
    throw new Error('attempt to recreate existing app window');
  }
  const { height, width } = electron.screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    center: true,
    height,
    icon: ICON_PATH,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: CLIENT_SCRIPT_PATH,
    },
    width,
  });

  if (process.env.NODE_ENV === 'development') {
    await devtoolsInstaller(REACT_DEVELOPER_TOOLS);
    await devtoolsInstaller(REDUX_DEVTOOLS);
    win.webContents.openDevTools({ mode: 'right' });
  }

  win.loadFile(WEBSITE_PATH);
  win.once('closed', dereference);
  await new Promise((done) => win.webContents.once('did-finish-load', done));
  const cssOverrides = fs.readFileSync(CSS_PATH, { encoding: 'utf8' });
  win.webContents.insertCSS(cssOverrides);
};

export const sendEvent = (name: string, data: any) => {
  if (!win) {
    throw new Error('attempt to send event to missing app window');
  }
  win.webContents.send(name, data);
};
