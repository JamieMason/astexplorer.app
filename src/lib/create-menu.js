const { app, dialog, Menu, shell } = require('electron');

const createOpenMenuItem = (label, onOpen) => ({
  label,
  click() {
    dialog.showOpenDialog(
      {
        properties: ['openFile'],
        title: label,
      },
      ([filePath]) => filePath && onOpen(filePath),
    );
  },
});

export const createMenu = ({
  onOpenSource = () => {},
  onOpenTransform = () => {},
}) => {
  const appMenu = {
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  };

  const fileMenu = {
    label: 'File',
    submenu: [
      createOpenMenuItem('Import Source', onOpenSource),
      createOpenMenuItem('Import Transform', onOpenTransform),
    ],
  };

  const editMenu = {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
    ],
  };

  const viewMenu = {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  };

  const windowMenu = {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }],
  };

  const helpMenu = {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          shell.openExternal('https://electronjs.org');
        },
      },
    ],
  };

  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      appMenu,
      fileMenu,
      editMenu,
      viewMenu,
      windowMenu,
      helpMenu,
    ]),
  );
};
