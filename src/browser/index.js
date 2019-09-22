const { ipcRenderer } = require('electron');
const {
  DEFAULT_SOURCE_PARSER,
  DEFAULT_SOURCE,
  DEFAULT_TRANSFORM_PARSER,
  DEFAULT_TRANSFORM,
} = require('../constants');
const { mainEvents } = require('../event-types');
const { dispatch } = require('./store');

ipcRenderer.on(mainEvents.SET_TRANSFORM_PARSER, (type, id) => {
  document.querySelector(`[value="${id}"]`).click();
});

ipcRenderer.on(mainEvents.DISPATCH_ACTION, (type, action) => {
  dispatch({ ...action, origin: 'main' });
});

ipcRenderer.on(mainEvents.SET_SOURCE_CODE, (type, code) => {
  dispatch({ type: 'SET_CODE', code, cursor: 0 });
});

ipcRenderer.on(mainEvents.SET_TRANSFORM_CODE, (type, code) => {
  dispatch({ type: 'SET_TRANSFORM', code, cursor: 0 });
});

localStorage.setItem(
  'tree_settings',
  JSON.stringify({
    autofocus: true,
    hideFunctions: true,
    hideEmptyKeys: true,
    hideLocationData: true,
    hideTypeKeys: true,
  }),
);

localStorage.setItem(
  'explorerSettingsV1',
  JSON.stringify({
    showTransformPanel: true,
    parserSettings: {},
    parserPerCategory: {
      javascript: DEFAULT_SOURCE_PARSER,
    },
    workbench: {
      parser: DEFAULT_SOURCE_PARSER,
      code: DEFAULT_SOURCE,
      keyMap: 'default',
      transform: {
        code: DEFAULT_TRANSFORM,
        transformer: DEFAULT_TRANSFORM_PARSER,
      },
    },
  }),
);
