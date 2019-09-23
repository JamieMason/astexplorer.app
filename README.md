# ASTExplorer.app

> <https://astexplorer.net> with ES Modules support and Hot Reloading

[![Build Status](http://img.shields.io/travis/JamieMason/ASTExplorer.app/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/ASTExplorer.app)
[![Maintainability](https://api.codeclimate.com/v1/badges/d1475b03168b4d3598cf/maintainability)](https://codeclimate.com/github/JamieMason/ASTExplorer.app/maintainability)

## Table of Contents

- [📣 Summary](#-summary)
- [📸 Screenshot](#-screenshot)
- [⚠️ Status](#️-status)
- [🌩 Installation](#-installation)
- [🕹 Usage](#-usage)
- [⚙️ Contributing](#️-contributing)
- [🙋🏿‍♂️ Getting Help](#♂️-getting-help)
- [👀 Other Projects](#-other-projects)
- [🤓 Author](#-author)

## 📣 Summary

Everything you love about <https://astexplorer.net> plus:<br><br>✅ Support for
ES Modules in your Transforms.<br>✅ Edit Transforms in your IDE.<br>✅ Hot
Reloading.<br>✅ Work Offline.

## 📸 Screenshot

<center><img src="./static/screenshot.png?raw=true"></center>

## 🌩 Installation

### Mac

📦
[ASTExplorer-0.14.7.dmg](https://github.com/JamieMason/astexplorer.app/releases/download/0.14.7/ASTExplorer-0.14.7.dmg)<br>
📦
[ASTExplorer-darwin-x64-0.14.7.zip](https://github.com/JamieMason/astexplorer.app/releases/download/0.14.7/ASTExplorer-darwin-x64-0.14.7.zip)

### Build From Source

    git clone https://github.com/JamieMason/astexplorer.app.git astexplorer-app
    cd astexplorer-app
    yarn install
    yarn start

## 🕹 Usage

1.  Open **File > Import Transform**
2.  Browse to your Babel Plugin, ESLint Rule, Codemod etc
3.  Edit your Transform Script in your IDE
4.  Changes will be reloaded automatically
5.  Organise your transform using ES modules and they will be bundled together
    automatically.

## ⚙️ Contributing

The Web UI used on <https://astexplorer.net> is built from source from its
repository at <https://github.com/fkling/astexplorer> and checked into this
repository at `/vendor` using the command `yarn run pull-upstream`.

When the App is started:

1.  `/src/index.js` launches `/vendor/index.html` using
    [Electron](https://electronjs.org/).
2.  When a Source or Transform Script are chosen from the File Menu,
    `/src/index.js` watches for changes using
    [chokidar](https://github.com/paulmillr/chokidar).
3.  When the Source or Transform Script change, their source is sent to the UI
    using [`ipcMain`](https://electronjs.org/docs/api/ipc-main).
    - The Transform Script is bundled using [Rollup](https://rollupjs.org).
4.  `/src/inject.js` listens for messages frpm `/src/index.js` using
    [`ipcRenderer`](https://electronjs.org/docs/api/ipc-renderer) then forwards
    the changes to AST Explorer's Redux Store.

### Development Scripts

#### `yarn start`

Create and run the App quickly for Development purposes
\[[more info](https://github.com/electron-userland/electron-forge/tree/5.x#launching-your-project)].

#### `yarn run electron:package`

Create the Application on disk.
\[[more info](https://github.com/electron-userland/electron-forge/tree/5.x#packaging-your-project)]

#### `yarn run electron:make`

Create the Application for various Platforms, plus installers, distribution
packages, etc.
\[[more info](https://github.com/electron-userland/electron-forge/tree/5.x#generating-a-distributable-for-your-project)].

### Publishing a Release

> Where `x.x.x` is seen it should be replaced with the correct version number.

1.  `npm install -g commit-release`.
2.  Run `commit-release --no-tag` to update the changelog and update the version
    in package.json.
3.  Update `./README.md` with the new version number under _Installation_.
4.  Amend the Commit `chore(release): x.x.x` created by `commit-release`.
5.  Tag the commit `x.x.x`.
6.  `git push master --tags`.
7.  Create Application using `yarn run electron:make`.
8.  Create a .zip file from `./out/ASTExplorer-darwin-x64` called
    `./out/ASTExplorer-darwin-x64-x.x.x`.
9.  Rename `./out/make/ASTExplorer.dmg` to `./out/make/ASTExplorer-x.x.x.dmg`.
10. Draft a release at <https://github.com/JamieMason/astexplorer.app/releases>
    called `x.x.x` using tag `x.x.x`.
11. Include the CHANGELOG entries in the body.
12. Attach `./out/make/ASTExplorer-x.x.x.dmg` and
    `./out/ASTExplorer-darwin-x64-x.x.x`.
13. Publish the release.

## 🙋🏿‍♂️ Getting Help

Get help with issues by creating a [Bug Report] or discuss ideas by opening a
[Feature Request].

[bug report]:
  https://github.com/JamieMason/ASTExplorer.app/issues/new?template=bug_report.md
[feature request]:
  https://github.com/JamieMason/ASTExplorer.app/issues/new?template=feature_request.md

## 👀 Other Projects

If you find my Open Source projects useful, please share them ❤️

- [**eslint-formatter-git-log**](https://github.com/JamieMason/eslint-formatter-git-log)<br>ESLint
  Formatter featuring Git Author, Date, and Hash
- [**eslint-plugin-move-files**](https://github.com/JamieMason/eslint-plugin-move-files)<br>Move
  and rename files while keeping imports up to date
- [**eslint-plugin-prefer-arrow-functions**](https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions)<br>Convert
  functions to arrow functions
- [**ImageOptim-CLI**](https://github.com/JamieMason/ImageOptim-CLI)<br>Automates
  ImageOptim, ImageAlpha, and JPEGmini for Mac to make batch optimisation of
  images part of your automated build process.
- [**Jasmine-Matchers**](https://github.com/JamieMason/Jasmine-Matchers)<br>Write
  Beautiful Specs with Custom Matchers
- [**karma-benchmark**](https://github.com/JamieMason/karma-benchmark)<br>Run
  Benchmark.js over multiple Browsers, with CI compatible output
- [**self-help**](https://github.com/JamieMason/self-help#readme)<br>Interactive
  Q&A Guides for Web and the Command Line
- [**syncpack**](https://github.com/JamieMason/syncpack#readme)<br>Manage
  multiple package.json files, such as in Lerna Monorepos and Yarn Workspaces

## 🤓 Author

<img src="https://www.gravatar.com/avatar/acdf106ce071806278438d8c354adec8?s=100" align="left">

I'm [Jamie Mason] from [Leeds] in England, I began Web Design and Development in
1999 and have been Contracting and offering Consultancy as Fold Left Ltd
since 2012. Who I've worked with includes [Sky Sports], [Sky Bet], [Sky Poker],
The [Premier League], [William Hill], [Shell], [Betfair], and Football Clubs
including [Leeds United], [Spurs], [West Ham], [Arsenal], and more.

<div align="center">

[![Follow JamieMason on GitHub][github badge]][github]      [![Follow fold_left on Twitter][twitter badge]][twitter]

</div>

<!-- images -->

[github badge]:
  https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow
[twitter badge]:
  https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow

<!-- links -->

[arsenal]: https://www.arsenal.com
[betfair]: https://www.betfair.com
[github]: https://github.com/JamieMason
[jamie mason]: https://www.linkedin.com/in/jamiemasonleeds
[leeds united]: https://www.leedsunited.com/
[leeds]: https://www.instagram.com/visitleeds
[premier league]: https://www.premierleague.com
[shell]: https://www.shell.com
[sky bet]: https://www.skybet.com
[sky poker]: https://www.skypoker.com
[sky sports]: https://www.skysports.com
[spurs]: https://www.tottenhamhotspur.com
[twitter]: https://twitter.com/fold_left
[west ham]: https://www.whufc.com
[william hill]: https://www.williamhill.com
