export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.CallExpression)
    .filter((path) => path.node.callee.name === 'applyMiddleware')
    .forEach((path) => {
      j(path).replaceWith(
        j.callExpression(
          j.identifier('applyMiddleware'),
          [j.identifier('window.__AST_EXPLORER_APP_MIDDLEWARE__')].concat(
            path.node.arguments,
          ),
        ),
      );
    })
    .toSource();
}
