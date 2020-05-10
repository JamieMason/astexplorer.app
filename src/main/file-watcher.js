const chokidar = require('chokidar');

const create = (onChange) => {
  let filePath = '';
  let watcher = null;

  const hasFilePath = () => filePath !== '';
  const isNewPath = (nextFilePath) => nextFilePath !== filePath;
  const isRunning = () => watcher !== null;

  const start = () => {
    if (!isRunning() && hasFilePath()) {
      watcher = chokidar
        .watch(filePath, { persistent: true })
        .on('change', () => onChange(filePath));
    }
    return Promise.resolve(filePath);
  };

  const stop = () => {
    if (isRunning()) {
      watcher.close();
      watcher = null;
    }
  };

  const move = () => {
    stop();
    start();
  };

  const setFilePath = (nextFilePath) => {
    if (isNewPath(nextFilePath)) {
      filePath = nextFilePath;
      if (isRunning()) {
        move();
      }
    }
    return Promise.resolve(filePath);
  };

  return {
    setFilePath,
    start,
    stop,
  };
};

module.exports = { create };
