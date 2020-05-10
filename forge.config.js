module.exports = {
  packagerConfig: {
    icon: 'assets/icons/mac/astexplorer',
    name: 'ASTExplorer',
    overwrite: true,
    ignore: ['/scripts', '/static', '/vendor/astexplorer/website'],
    packageManager: 'yarn',
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
  github_repository: {
    owner: 'JamieMason',
    name: 'astexplorer.app',
  },
};
