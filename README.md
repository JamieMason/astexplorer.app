# ASTExplorer.app

> https://astexplorer.net with ES Modules support and Hot Reloading

[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## 📣 Summary

Everything you love about https://astexplorer.net plus:<br><br>✅ Support for ES
Modules in your Transforms.<br>✅ Edit Transforms in your IDE.<br>✅ Hot
Reloading.<br>✅ Work Offline.

## 📸 Screenshot

<center><img src="./static/screenshot.png?raw=true"></center>

## 🙋🏽 Status

New Project, there will likely be a few kinks to iron out.

## 🌩 Installation

### Mac

📦
[ASTExplorer-0.12.4.dmg](https://github.com/JamieMason/astexplorer.app/releases/download/0.12.4/ASTExplorer-0.12.4.dmg)<br>
📦
[ASTExplorer-darwin-x64-0.12.4.zip](https://github.com/JamieMason/astexplorer.app/releases/download/0.12.4/ASTExplorer-darwin-x64-0.12.4.zip)

### Build From Source

```
git clone https://github.com/JamieMason/astexplorer.app.git astexplorer-app
cd astexplorer-app
yarn install
yarn start
```

## 🕹 Usage

1. Open **File > Import Transform**
1. Browse to your Babel Plugin, ESLint Rule, Codemod etc
1. Edit your Transform Script in your IDE
1. Changes will be reloaded automatically
1. Organise your transform using ES modules and they will be bundled together
   automatically.

## ⚙️ Contributing

The Web UI used on https://astexplorer.net is built from source from its
repository at https://github.com/fkling/astexplorer and checked into this
repository at `/vendor` using the command `yarn run pull-upstream`.

When the App is started:

1. `/src/index.js` launches `/vendor/index.html` using
   [Electron](https://electronjs.org/).
1. When a Source or Transform Script are chosen from the File Menu,
   `/src/index.js` watches for changes using
   [chokidar](https://github.com/paulmillr/chokidar).
1. When the Source or Transform Script change, their source is sent to the UI
   using [`ipcMain`](https://electronjs.org/docs/api/ipc-main).
   - The Transform Script is bundled using [Rollup](https://rollupjs.org).
1. `/src/inject.js` listens for messages frpm `/src/index.js` using
   [`ipcRenderer`](https://electronjs.org/docs/api/ipc-renderer) then forwards
   the changes to AST Explorer's Redux Store.

### Development Scripts

#### `yarn start`

Create and run the App quickly for Development purposes
[[more info](https://github.com/electron-userland/electron-forge/tree/5.x#launching-your-project)].

#### `yarn run electron:package`

Create the Application on disk.
[[more info](https://github.com/electron-userland/electron-forge/tree/5.x#packaging-your-project)]

#### `yarn run electron:make`

Create the Application for various Platforms, plus installers, distribution
packages, etc.
[[more info](https://github.com/electron-userland/electron-forge/tree/5.x#generating-a-distributable-for-your-project)].

### Publishing a Release

> Where `x.x.x` is seen it should be replaced with the correct version number.

1. `npm install -g commit-release`.
1. Run `commit-release --no-tag` to update the changelog and update the version
   in package.json.
1. Update `./README.md` with the new version number under _Installation_.
1. Amend the Commit `chore(release): x.x.x` created by `commit-release`.
1. Tag the commit `x.x.x`.
1. `git push master --tags`.
1. Create Application using `yarn run electron:make`.
1. Create a .zip file from `./out/ASTExplorer-darwin-x64` called
   `./out/ASTExplorer-darwin-x64-x.x.x`.
1. Rename `./out/make/ASTExplorer.dmg` to `./out/make/ASTExplorer-x.x.x.dmg`.
1. Draft a release at https://github.com/JamieMason/astexplorer.app/releases
   called `x.x.x` using tag `x.x.x`.
1. Include the CHANGELOG entries in the body.
1. Attach `./out/make/ASTExplorer-x.x.x.dmg` and
   `./out/ASTExplorer-darwin-x64-x.x.x`.
1. Publish the release.

## 🙋🏾‍♀️ Getting Help

- Get help with issues by creating a
  [Bug Report](https://github.com/JamieMason/astexplorer.app/issues/new?template=bug_report.md).
- Discuss ideas by opening a
  [Feature Request](https://github.com/JamieMason/astexplorer.app/issues/new?template=feature_request.md).
