const rollup = require('rollup');
const fileWatcher = require('./file-watcher');

const getBundledSource = async (filePath) => {
  let code = '';
  const bundle = await rollup.rollup({ input: { bundle: filePath } });
  const { output } = await bundle.generate({ format: 'esm' });
  output.forEach((chunkOrAsset) => {
    if (!chunkOrAsset.isAsset) {
      code += chunkOrAsset.code;
    }
  });
  return code;
};

export const create = (onChange) => {
  const watcher = fileWatcher.create((filePath) =>
    getBundledSource(filePath).then(onChange),
  );
  return {
    setFilePath(nextFilePath) {
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
