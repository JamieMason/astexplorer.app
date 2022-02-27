import { ipcRenderer } from 'electron';
import { browserEvents } from '../event-types';

type Action = Record<string, any>;
type Store = {
  dispatch(action: Action): void;
};

let store: Store = {
  dispatch() {
    /**/
  },
};

const withoutCircularRefs = (action: Action) => {
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
          _promise: '<<removed>>',
          formatCodeExample: '<<removed>>',
          loadTransformer: '<<removed>>',
          transform: '<<removed>>',
        },
      },
    };
  }
  return action;
};

(window as any).__AST_EXPLORER_APP_MIDDLEWARE__ = (_store: Store) => {
  store = _store;
  ipcRenderer.send(browserEvents.REDUX_STORE_CREATED);
  return (next: Store['dispatch']) => (action: Action) => {
    if (action.origin !== 'main') {
      try {
        ipcRenderer.send(
          browserEvents.REDUX_ACTION_DISPATCHED,
          withoutCircularRefs(action),
        );
      } catch (err) {
        console.error('Could not dispatch', action, err);
      }
    }
    return next(action);
  };
};

export const dispatch = (action: Action) => {
  store.dispatch(action);
};
