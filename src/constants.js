const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CLIENT_SCRIPT_PATH = path.resolve(__dirname, './browser/index.js');
const CSS_PATH = path.resolve(ROOT, './assets/overrides.css');
const DEFAULT_SOURCE_PARSER = 'babylon7';
const DEFAULT_TRANSFORM_PARSER = 'babelv7';
const ICON_PATH = path.resolve(ROOT, './assets/icons/png/64x64.png');
const WEBSITE_PATH = path.resolve(ROOT, './vendor/astexplorer/out/index.html');

const DEFAULT_SOURCE = `
// This is the "Source" Panel.
//
// Code which you want to explore the AST of and/or run through a "Transform"
// (Babel Plugin, ESLint Rule, Codemod etc) goes here.
//
// The AST of this code is displayed in the panel on the top-right and your
// Transform goes in the panel below in the bottom-left.
//
// Paste some source code here to view its AST.

const reverseMe = 'Hello World';
`.trimLeft();

const DEFAULT_TRANSFORM = `
// This is the "Transform" Panel.
//
// The result of running this transform over the Source Panel is shown in the
// panel on the bottom-right.
//
// 1. Using the "Transform" Menu above, choose your Transform type, such as
//    Babel Plugin, ESLint Rule, Codemod etc.
// 2. Use the Open File Dialog to locate your Transform Script.
// 3. Edit your Transform Script in your IDE.
// 4. Changes will be reloaded here automatically.
//
// Feel free to organise your transform using ES modules and they will be
// bundled together automatically.

export default (babel) => {
  const { types: t } = babel;

  return {
    visitor: {
      Identifier(path) {
        path.node.name = path.node.name
          .split('')
          .reverse()
          .join('');
      },
      Program(path) {
        path.traverse({
          enter(path) {
            t.removeComments(path.node);
          }
        });
      }
    }
  };
};
`.trimLeft();

module.exports = {
  CLIENT_SCRIPT_PATH,
  CSS_PATH,
  DEFAULT_SOURCE_PARSER,
  DEFAULT_SOURCE,
  DEFAULT_TRANSFORM_PARSER,
  DEFAULT_TRANSFORM,
  ICON_PATH,
  ROOT,
  WEBSITE_PATH,
};
