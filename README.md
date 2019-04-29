# ASTExplorer.app

> https://astexplorer.net with ES Modules support and Hot Reloading

[![Gitter Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/astexplorer)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Backers](https://opencollective.com/fold_left/backers/badge.svg)](https://opencollective.com/fold_left#backer)
[![Sponsors](https://opencollective.com/fold_left/sponsors/badge.svg)](https://opencollective.com/fold_left#sponsors)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/astexplorer?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## 🗒 Overview

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
[ASTExplorer-0.10.4.dmg](https://github.com/JamieMason/astexplorer.app/releases/download/0.10.4/ASTExplorer-0.10.4.dmg)<br>
📦
[ASTExplorer-darwin-x64-0.10.4.zip](https://github.com/JamieMason/astexplorer.app/releases/download/0.10.4/ASTExplorer-darwin-x64-0.10.4.zip)

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
