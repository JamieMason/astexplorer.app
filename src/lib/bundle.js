const rollup = require('rollup');

export const createBundlerFor = async (entryPath) => {
  const bundle = await rollup.rollup({ input: { bundle: entryPath } });
  return async () => {
    let code = '';
    const { output } = await bundle.generate({ format: 'esm' });
    output.forEach((chunkOrAsset) => {
      if (!chunkOrAsset.isAsset) {
        code += chunkOrAsset.code;
      }
    });
    return code;
  };
};
