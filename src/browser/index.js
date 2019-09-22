const { ipcRenderer } = require('electron');
const { mainEvents } = require('../event-types');
const { dispatch } = require('./store');

const disableDragAndDrop = () => {
  const { addEventListener } = HTMLElement.prototype;
  Object.defineProperties(HTMLElement.prototype, {
    addEventListener: {
      value(type, ...params) {
        return !type.startsWith('drag')
          ? addEventListener.call(this, type, ...params)
          : null;
      },
    },
  });
};

const disableExitDialog = () => {
  Object.defineProperties(window, {
    onbeforeunload: {
      set() {},
    },
  });
};

const enableAllTreeOptions = () => {
  [...document.querySelectorAll('.tree-visualization [type="checkbox"]')]
    .filter((el) => !el.checked)
    .forEach((el) => el.click());
};

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

disableDragAndDrop();
disableExitDialog();

window.addEventListener('load', enableAllTreeOptions, false);
