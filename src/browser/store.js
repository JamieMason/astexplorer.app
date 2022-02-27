const { ipcRenderer } = require('electron');
const { browserEvents } = require('../event-types');

let store = {
  dispatch() {},
};

const withoutCircularRefs = (action) => {
  if (action.parser) {
    return {
      type: action.type,
      parser: {
        category: {
          ...action.parser.category,
          parsers: [],
          transformers: [],
        },
      },
    };
  }
  if (action.transformer) {
    return {
      type: action.type,
      transformer: {
        category: {
          ...action.transformer,
          loadTransformer: '<<function>>',
          transform: '<<function>>',
        },
      },
    };
  }
  return action;
};

window.__AST_EXPLORER_APP_MIDDLEWARE__ = (_store) => {
  store = _store;
  ipcRenderer.send(browserEvents.REDUX_STORE_CREATED);
  return (next) => (action) => {
    if (action.origin !== 'main') {
      ipcRenderer.send(
        browserEvents.REDUX_ACTION_DISPATCHED,
        withoutCircularRefs(action),
      );
    }
    return next(action);
  };
};

const dispatch = (action) => store.dispatch(action);

module.exports = {
  dispatch,
};
