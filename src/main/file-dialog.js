const { dialog } = require('electron');

export const openTransform = () =>
  new Promise((done) => {
    dialog.showOpenDialog(
      {
        buttonLabel: 'Open Transform',
        filters: [{ extensions: ['js', 'ts'], name: 'JavaScript' }],
        properties: ['openFile'],
        title: 'Transform',
      },
      (files) =>
        done(Array.isArray(files) && files.length === 1 ? files[0] : ''),
    );
  });
