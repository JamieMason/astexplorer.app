import path from 'path';
import * as rollup from 'rollup';
import tsPlugin from 'rollup-plugin-typescript2';
import { createFileWatcher } from './file-watcher';

const getBundledSource = async (filePath: string) => {
  let code = '';
  const bundle = await rollup.rollup({
    external: ['typescript'],
    input: {
      bundle: filePath,
    },
    plugins: [
      tsPlugin({
        cwd: path.dirname(filePath),
        tsconfigOverride: {
          compilerOptions: {
            module: 'ESNext',
          },
        },
      }),
    ],
  });
  const build: rollup.RollupOutput = await bundle.generate({
    format: 'esm',
    globals: {
      ts: 'typescript',
      typescript: 'typescript',
    },
  });
  build.output.forEach((chunkOrAsset) => {
    if ('code' in chunkOrAsset && chunkOrAsset.code) {
      code += chunkOrAsset.code.replace(
        `import * as ts from 'typescript';`,
        '',
      );
    }
  });
  return code;
};

export const create = (onChange: (arg0: string) => void) => {
  const watcher = createFileWatcher(async (filePath: string) => {
    try {
      const bundledSource = await getBundledSource(filePath);
      onChange(bundledSource);
    } catch (err) {
      // @TODO: Show Notification
    }
  });
  return {
    setFilePath(nextFilePath: string) {
      return watcher.setFilePath(nextFilePath).then(getBundledSource);
    },
    start() {
      return watcher.start().then(getBundledSource);
    },
    stop() {
      return watcher.stop();
    },
  };
};
