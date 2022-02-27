import { dialog } from 'electron';

type TransformNamesById = typeof transformNamesById;

const transformNamesById = {
  'babel-plugin-macros': 'Babel Macro',
  babel: 'Babel 5.x Plugin',
  babelv6: 'Babel 6.x Plugin',
  babelv7: 'Babel 7.x Plugin',
  'eslint-v1': 'ESLint 1.x Plugin',
  'eslint-v2': 'ESLint 2.x Plugin',
  'eslint-v3': 'ESLint 3.x Plugin',
  'eslint-v4': 'ESLint 4.x Plugin',
  jscodeshift: 'JSCodeshift Codemod',
  prettier: 'Prettier Config',
  tslint: 'TSLint Rule',
  typescript: 'Typescript Transform',
} as const;

export const openTransform = (id: keyof TransformNamesById) => {
  const transformName = transformNamesById[id] || 'Transform';
  return dialog
    .showOpenDialog({
      buttonLabel: `Open ${transformName}`,
      filters: [{ extensions: ['js', 'ts'], name: 'JavaScript' }],
      message: `Open ${transformName}`,
      properties: ['openFile'],
    })
    .then(({ filePaths }) => {
      return Array.isArray(filePaths) && filePaths.length === 1
        ? filePaths[0]
        : '';
    });
};
