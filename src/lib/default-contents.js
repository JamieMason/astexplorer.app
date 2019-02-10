export const defaultSource = `
// This is the "Source" Panel. Code which you want to explore the AST of and/or
// run through a "Transform" (Babel Plugin, ESLint Rule, Codemod etc) goes here.
//
// The AST of this code is displayed in the panel on the top-right and your
// Transform goes in the panel below in the bottom-left.
//
// You can either paste some source code here, or follow these steps to import
// a file from disk:
//
// 1. Open File > Import Source
// 2. Browse to a Script file
// 3. Edit your Source in VS Code, Sublime Text etc
// 4. Changes will be reloaded automatically

const reverseMe = 'Hello World';
`.trimLeft();

export const defaultTransform = `
// This is the "Transform" Panel. The result of running this transform over the
// Source Panel is shown in the panel on the bottom-right.
//
// 1. Open File > Import Transform
// 2. Browse to your Babel Plugin, ESLint Rule, Codemod etc
// 3. Edit your Transform Script in your IDE
// 4. Changes will be reloaded here automatically
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
