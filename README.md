# ASTExplorer.app

> AST Explorer (https://astexplorer.net) with Desktop Integration

[![Gitter Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/astexplorer)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Backers](https://opencollective.com/fold_left/backers/badge.svg)](https://opencollective.com/fold_left#backer)
[![Sponsors](https://opencollective.com/fold_left/sponsors/badge.svg)](https://opencollective.com/fold_left#sponsors)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/astexplorer?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## Overview

Everything you love about https://astexplorer.net plus:

💻 Edit Transforms in VS Code, Sublime Text etc.<br>📦 Organise Transforms
using ES Modules.<br>🔥 Hot Reload AST Explorer on file change.<br>🔌 Work
Offline.

<center><img src="./static/astexplorer-app.gif?raw=true"></center>

## Status

New Project, some steps which could be automated or configurable currently need
to be done manually.

## Usage

```
git clone https://github.com/JamieMason/astexplorer.app.git astexplorer-app
cd astexplorer-app
yarn install
yarn start
```

In this early version, the files you edit on disk are hard-coded at
`/test/source.js` and `/test/transform.js`. Edit these files in your Editor and
have ASTExplorer.app visible on a separate monitor. Each time you save a file
ASTExplorer.app will update.

Editing within ASTExplorer.app is not saved to disk, all editing should be done
from your Editor of choice such as VS Code or Sublime Text.

## Contributing

The Web UI used on https://astexplorer.net is built from source from its
repository at https://github.com/fkling/astexplorer and checked into this
repository at `/website` using the command `yarn run pull-upstream`.

When the App is started:

1. `/src/index.js` launches `/website/index.html` using
   [Electron](https://electronjs.org/).
1. `/src/index.js` watches for changes to the source and transform files using
   [chokidar](https://github.com/paulmillr/chokidar).
1. When these files change, your transform is bundled using
   [Rollup](https://rollupjs.org).
1. Once bundled, your transform source is sent to the UI using
   [`ipcMain`](https://electronjs.org/docs/api/ipc-main).
1. `/src/inject.js` listens for messages frpm `/src/index.js` using
   [`ipcRenderer`](https://electronjs.org/docs/api/ipc-renderer) then forwards
   the changes to AST Explorer's Redux Store.
