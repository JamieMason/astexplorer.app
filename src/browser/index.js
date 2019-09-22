const { ipcRenderer } = require('electron');
const { mainEvents } = require('../event-types');
const { dispatch } = require('./store');

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

window.addEventListener('load', enableAllTreeOptions, false);
