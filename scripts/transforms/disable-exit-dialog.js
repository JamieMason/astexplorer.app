export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.AssignmentExpression)
    .filter((path) => path.node.left.property.name === 'onbeforeunload')
    .forEach((path) => {
      return j(path).remove();
    })
    .toSource();
}
