const fs = require('fs');
const path = require('path');

const websitePath = __dirname;
const rootPath = path.resolve(websitePath, '..');
const sourcePath = path.resolve(rootPath, './test/source.js');
const transformPath = path.resolve(rootPath, './test/transform.js');

const sourceData = fs.readFileSync(sourcePath, { encoding: 'utf8' });
const transformData = fs.readFileSync(transformPath, { encoding: 'utf8' });

const defaults = {
  parserPerCategory: { javascript: 'babylon7' },
  parserSettings: {},
  showTransformPanel: true,
  workbench: {
    code: sourceData,
    keyMap: 'sublime',
    parser: 'babylon7',
    transform: { code: transformData, transformer: 'babelv7' }
  }
};

localStorage.setItem('explorerSettingsV1', JSON.stringify(defaults));
