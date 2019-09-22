module.exports = {
  make_targets: {
    darwin: ['zip', 'dmg'],
    linux: ['deb', 'rpm'],
  },
  electronInstallerDMG: {
    icon: 'assets/icons/mac/astexplorer.icns',
    name: 'ASTExplorer',
    overwrite: true,
  },
  electronPackagerConfig: {
    icon: 'assets/icons/mac/astexplorer',
    name: 'ASTExplorer',
    overwrite: true,
    ignore: ['/scripts', '/static', '/vendor/astexplorer/website'],
    packageManager: 'yarn',
  },
  electronInstallerDebian: {
    productName: 'ASTExplorer',
  },
  github_repository: {
    owner: 'JamieMason',
    name: 'astexplorer.app',
  },
  windowsStoreConfig: {
    packageName: '',
    name: 'ASTExplorer',
  },
};
