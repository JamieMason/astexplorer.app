export default function(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      Identifier(path) {
        path.node.name = path.node.name
          .split('')
          .reverse()
          .join('');
      }
    }
  };
}
