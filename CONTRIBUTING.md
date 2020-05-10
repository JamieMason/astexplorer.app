# Contributing

## System Requirements

Development is done on the current
["Active LTS" version of Node.js](https://github.com/nodejs/Release).

## Entry Points

- Application `/src/index.js`.
- Main Electron Process `/src/main/index.js`.
- Browser Window `/src/browser/index.js`.

## General Flow

When astexplorer.net is pulled from its Repository:

1. Codemods at `/scripts/transforms/*.js` are run to:
   1. Disable features which aren't suitable when run as a Desktop App.
   1. Inject [Redux Middleware] for the Electron App to communicate with the Web
      UI.

When the App is started:

1. `/src/index.js`
   1. Configures whether logging is enabled.
   1. Starts the Main Electron Process.
1. `/src/main/index.js`
   1. Creates the System Tray Menu and Browser Window.
   1. Listens for Events from them using [ipcMain].
1. `/src/browser/index.js`
   1. Writes default configuration for the Web UI.
   1. Listens for Events from the Main Electron Process using [ipcRenderer].
   1. Listens for Events from the Web UI's Redux Store and forwards them the
      Main Electron Process using [ipcRenderer].

When a Transform is chosen in the Web UI:

1. The Web UI's Redux Store dispatches an `SELECT_TRANSFORMER` Action.
1. `/src/main/index.js`
   1. Opens a File Dialog for the User to select a Transform .js file.
   1. Watches the file for changes using [chokidar].
   1. Bundles dependencies into a single .js file using [Rollup].
   1. Sends a `SET_TRANSFORM_CODE` Event to the Browser to update the
      Bottom-Left Panel of the Web UI.

## Update ASTExplorer.net Web UI

The Web UI used on https://astexplorer.net is pulled from its repository at
https://github.com/fkling/astexplorer and checked into this repository at
`/vendor/astexplorer/website`.

The GitHub Action at `/.github/workflows/pull-upstream.yml` runs once a day and
creates a pull request if new commits are found.

## Run App for Development

Run ASTExplorer.app with hot-reloading of changes to itself as you're working on
it:

```
yarn start
```

Include Redux Devtools and verbose logging:

```
NODE_ENV=development yarn start
```

More info at [launching-your-project].

## Build App

```
yarn run electron:package
```

More info at [packaging-your-project].

## Build App Installers for Release

Create the Application for various Platforms, plus installers, distribution
packages, etc.

```
yarn run electron:make
```

More info at [generating-a-distributable-for-your-project].

## Publish a Release

1. Run `yarn create-release` to create a commit with an updated changelog and
   version number.
1. If all looks correct, `git push master --tags`.
1. The GitHub Action at `/.github/workflows/release.yml` will Publish a new
   Release containing the latest version of the Application for download.

[chokidar]: https://github.com/paulmillr/chokidar
[generating-a-distributable-for-your-project]:
  https://github.com/electron-userland/electron-forge/tree/5.x#generating-a-distributable-for-your-project.
[ipcmain]: https://electronjs.org/docs/api/ipc-main
[ipcrenderer]: https://electronjs.org/docs/api/ipc-renderer
[launching-your-project]:
  https://github.com/electron-userland/electron-forge/tree/5.x#launching-your-project.
[packaging-your-project]:
  https://github.com/electron-userland/electron-forge/tree/5.x#packaging-your-project.
[redux middleware]: https://redux.js.org/advanced/middleware
[rollup]: https://rollupjs.org
