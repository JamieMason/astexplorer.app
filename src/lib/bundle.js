const rollup = require('rollup');

export const createBundlerFor = async (entryPath) => {
  const bundle = await rollup.rollup({ input: { bundle: entryPath } });
  return async () => {
    const { output } = await bundle.generate({ format: 'esm' });
    let code = '';
    for (const chunkOrAsset of output) {
      if (!chunkOrAsset.isAsset) {
        code += chunkOrAsset.code;
      }
    }
    return code;
  };
};
