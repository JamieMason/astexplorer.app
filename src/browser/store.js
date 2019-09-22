const { ipcRenderer } = require('electron');
const { browserEvents } = require('../event-types');

let store = {
  dispatch() {},
};

window.__AST_EXPLORER_APP_MIDDLEWARE__ = (_store) => {
  store = _store;
  ipcRenderer.send(browserEvents.REDUX_STORE_CREATED);
  return (next) => (action) => {
    if (action.origin !== 'main') {
      ipcRenderer.send(browserEvents.REDUX_ACTION_DISPATCHED, action);
    }
    return next(action);
  };
};

const dispatch = (action) => store.dispatch(action);

module.exports = {
  dispatch,
};
