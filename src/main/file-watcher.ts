import chokidar, { FSWatcher } from 'chokidar';

export const createFileWatcher = (onChange: (filePath: string) => void) => {
  let filePath = '';
  let watcher: FSWatcher | null = null;

  const hasFilePath = () => filePath !== '';
  const isNewPath = (nextFilePath: string) => nextFilePath !== filePath;
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

  const setFilePath = (nextFilePath: string) => {
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
