module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
  packagerConfig: {
    icon: 'assets/icons/mac/astexplorer',
    name: 'ASTExplorer',
    overwrite: true,
    ignore: ['/scripts', '/static', '/vendor/astexplorer/website'],
    packageManager: 'yarn',
  },
  github_repository: {
    owner: 'JamieMason',
    name: 'astexplorer.app',
  },
};
