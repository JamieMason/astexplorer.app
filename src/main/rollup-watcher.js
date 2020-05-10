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

const create = (onChange) => {
  const watcher = fileWatcher.create(async (filePath) => {
    try {
      const bundledSource = await getBundledSource(filePath);
      onChange(bundledSource);
    } catch (err) {
      // @TODO: Show Notification
    }
  });
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

module.exports = { create };
