# Contributing

## System Requirements

Development is done on the current
["Active LTS" version of Node.js](https://github.com/nodejs/Release).

## Entry Points

- Application `/src/index.ts`.
- Main Electron Process `/src/main/index.ts`.
- Browser Window `/src/browser/index.ts`.

## General Flow

When astexplorer.net is pulled from its Repository:

1. Codemods at `/scripts/transforms/*.js` are run to:
   1. Disable features which aren't suitable when run as a Desktop App.
   1. Inject [Redux Middleware] for the Electron App to communicate with the Web
      UI.

When the App is started:

1. `/src/index.ts`
   1. Configures whether logging is enabled.
   1. Starts the Main Electron Process.
1. `/src/main/index.ts`
   1. Creates the System Tray Menu and Browser Window.
   1. Listens for Events from them using [ipcMain].
1. `/src/browser/index.ts`
   1. Writes default configuration for the Web UI.
   1. Listens for Events from the Main Electron Process using [ipcRenderer].
   1. Listens for Events from the Web UI's Redux Store and forwards them the
      Main Electron Process using [ipcRenderer].

When a Transform is chosen in the Web UI:

1. The Web UI's Redux Store dispatches an `SELECT_TRANSFORMER` Action.
1. `/src/main/index.ts`
   1. Opens a File Dialog for the User to select a Transform .js file.
   1. Watches the file for changes using [chokidar].
   1. Bundles dependencies into a single .js file using [Rollup].
   1. Sends a `SET_TRANSFORM_CODE` Event to the Browser to update the
      Bottom-Left Panel of the Web UI.

## Update ASTExplorer.net Web UI

The Web UI used on https://astexplorer.net is pulled from its repository at
https://github.com/fkling/astexplorer and checked into this repository at
`/vendor/astexplorer/website` using `yarn upstream:update`.

## Run App for Development

```bash
NODE_ENV=development yarn start
```
