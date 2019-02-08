const { ipcRenderer } = require('electron');

const getReduxStore = () =>
  document.getElementById('container')._reactRootContainer._internalRoot.current
    .child.memoizedProps.store;

const enableAllTreeOptions = () => {
  [...document.querySelectorAll('.tree-visualization [type="checkbox"]')]
    .filter((el) => !el.checked)
    .forEach((el) => el.click());
};

const setTransform = (id) => {
  document.querySelector(`[value="${id}"]`).click();
};

const run = () => {
  let reduxStore;

  ipcRenderer.on('source-change-on-disk', (event, sourceData) => {
    reduxStore.dispatch({
      type: 'SET_CODE',
      code: sourceData,
      cursor: 0
    });
  });

  ipcRenderer.on('transform-change-on-disk', (event, transformData) => {
    reduxStore.dispatch({
      type: 'SET_TRANSFORM',
      code: transformData,
      cursor: 0
    });
  });

  ipcRenderer.send('source-change-in-browser', 'TODO sourceData');

  reduxStore = getReduxStore();
  setTransform('babelv7');
  enableAllTreeOptions();
};

window.addEventListener('load', run, false);
