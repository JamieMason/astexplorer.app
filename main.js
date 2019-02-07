const electron = require('electron');

const { app, BrowserWindow } = electron;
let win;

const createWindow = () => {
  const { height, width } = electron.screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({ center: true, height, width });
  win.loadFile('./website/index.html');
  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
