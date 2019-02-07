const defaults = {
  parserPerCategory: { javascript: 'babylon7' },
  parserSettings: {},
  showTransformPanel: true,
  workbench: {
    code: '',
    keyMap: 'sublime',
    parser: 'babylon7',
    transform: { code: '', transformer: 'babelv7' }
  }
};

localStorage.setItem('explorerSettingsV1', JSON.stringify(defaults));
