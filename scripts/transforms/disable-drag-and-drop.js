export default function transformer(file, api) {
  const j = api.jscodeshift;

  const withFragmentInPlaceOfComponent = j(file.source)
    .find(j.JSXElement)
    .filter(
      (path) =>
        path.node.openingElement.name.name === 'PasteDropTargetContainer',
    )
    .forEach((path) => {
      j(path).replaceWith(
        j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier('React.Fragment')),
          j.jsxClosingElement(j.jsxIdentifier('React.Fragment')),
          path.node.children,
        ),
      );
    })
    .toSource();

  const withoutImport = j(withFragmentInPlaceOfComponent)
    .find(j.ImportDefaultSpecifier)
    .filter((path) => path.node.local.name === 'PasteDropTargetContainer')
    .forEach((path) => {
      j(path.parentPath.parentPath).remove();
    })
    .toSource();

  return withoutImport;
}
