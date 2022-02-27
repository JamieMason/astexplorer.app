## [0.18.16](https://github.com/JamieMason/astexplorer.app/compare/0.16.11...0.18.16) (2022-02-27)

### Bug Fixes

- **electron:** fix breaking changes
  ([fcab38f](https://github.com/JamieMason/astexplorer.app/commit/fcab38fdb28318380a108a2551a5894ce9ac8cc4))
- **electron:** run middleware in browser context
  ([ffaeaf6](https://github.com/JamieMason/astexplorer.app/commit/ffaeaf67f963414df17b4a79549f385f920683c2))
- **npm:** update dependencies
  ([591db15](https://github.com/JamieMason/astexplorer.app/commit/591db159e624d1c9ba4d2c25d88642f13537f8ab))
- **redux:** remove circular refs from actions
  ([25cb8d2](https://github.com/JamieMason/astexplorer.app/commit/25cb8d282423fbcd27a68db7ebe56b7a1433aa0e))
- **rollup:** fix ts plugin warnings when choosing transform
  ([93f8330](https://github.com/JamieMason/astexplorer.app/commit/93f8330c0a5a386fc612e8e13158434e30bf2316))

### Features

- **npm:** publish as npm package
  ([1f94203](https://github.com/JamieMason/astexplorer.app/commit/1f94203cc27dd37e1ff69427987bb73265468566))
- **typescript:** add typescript support
  ([d7f64fb](https://github.com/JamieMason/astexplorer.app/commit/d7f64fb074963f47f1c3267601399aedefe2fd66))

## [0.16.11](https://github.com/JamieMason/astexplorer.app/compare/0.14.7...0.16.11) (2020-05-10)

### Bug Fixes

- **electron:** match new electron forge config
  ([84d128b](https://github.com/JamieMason/astexplorer.app/commit/84d128bd7e433f7058d3c14fe2a42230cd6cf3c2))
- **electron:** match new electron forge config
  ([2793285](https://github.com/JamieMason/astexplorer.app/commit/2793285445cc7f8ae2b9b2b525dbb06c999a4dc5))
- **npm:** prune vulnerabilities
  ([afdcab4](https://github.com/JamieMason/astexplorer.app/commit/afdcab425ef243921d6d6011fa0caac775da053f))
- **npm:** update dependencies
  ([82624ae](https://github.com/JamieMason/astexplorer.app/commit/82624aea3b20bd2cb7074e4fdb63b903f2dfba56))

### Features

- **astexplorer:** insert commit hash into footer
  ([1f41789](https://github.com/JamieMason/astexplorer.app/commit/1f417893d23f68649b0355dd459e3894607c3ace))
- **astexplorer:** pull latest astexplorer.net
  ([ca9da60](https://github.com/JamieMason/astexplorer.app/commit/ca9da6057df76d34f183433cba11290c1e0a11ed))

## [0.14.7](https://github.com/JamieMason/astexplorer.app/compare/0.12.4...0.14.7) (2019-09-23)

### Bug Fixes

- **app:** skip update if transform has syntax errors
  ([b221270](https://github.com/JamieMason/astexplorer.app/commit/b221270bbb4416a8e002aaf44fb398656bcf9f9f))
- **npm:** apply security updates
  ([6948ec6](https://github.com/JamieMason/astexplorer.app/commit/6948ec62d21e50e5e46ef77d493006b77a02eb1d))
- **npm:** update npm dependencies
  ([f345bf5](https://github.com/JamieMason/astexplorer.app/commit/f345bf546f7ba918d873c46904933954fab8dd8c))

### Features

- **astexplorer:** open files using the transform menu
  ([de2fe1e](https://github.com/JamieMason/astexplorer.app/commit/de2fe1ebc41fc0eb05bb49f016a8f9aa5c7c1033)),
  closes [#2](https://github.com/JamieMason/astexplorer.app/issues/2)
  [#3](https://github.com/JamieMason/astexplorer.app/issues/3)
- **astexplorer:** pull latest astexplorer.net
  ([b50f249](https://github.com/JamieMason/astexplorer.app/commit/b50f249d84219f0d901c1a05ebf9514853046ab4))

## [0.12.4](https://github.com/JamieMason/astexplorer.app/compare/0.11.4...0.12.4) (2019-08-04)

### Features

- **astexplorer:** pull latest astexplorer.net
  ([639a3fc](https://github.com/JamieMason/astexplorer.app/commit/639a3fcdf385702811a28ee27afab75ece4f8fee))

## [0.11.4](https://github.com/JamieMason/astexplorer.app/compare/0.10.4...0.11.4) (2019-06-12)

### Features

- **astexplorer:** pull latest astexplorer.net
  ([b861716](https://github.com/JamieMason/astexplorer.app/commit/b86171639dcde7f59739fca07bf6531e0f6c3d2a))

## [0.10.4](https://github.com/JamieMason/astexplorer.app/compare/0.9.4...0.10.4) (2019-04-29)

### Features

- **astexplorer:** pull latest astexplorer.net
  ([7878b3d](https://github.com/JamieMason/astexplorer.app/commit/7878b3d0d3112a774ec4215829fd4d7e340ad603))

## [0.9.4](https://github.com/JamieMason/astexplorer.app/compare/0.9.3...0.9.4) (2019-02-15)

### Bug Fixes

- **app:** prevent message on beforeunload from showing
  ([7d94490](https://github.com/JamieMason/astexplorer.app/commit/7d944908941d96267e1d30d2685051e5cb79c6e9)),
  closes [#1](https://github.com/JamieMason/astexplorer.app/issues/1)

## [0.9.3](https://github.com/JamieMason/astexplorer.app/compare/a2f19289a4205c265a864490cff5bf066d3d66f5...0.9.3) (2019-02-14)

### Bug Fixes

- **app:** resolve /website in packaged app
  ([c11483a](https://github.com/JamieMason/astexplorer.app/commit/c11483a1fbdd85470e0b162e7695c204b4fde0c0))
- **app:** stop watcher before attempting to quit
  ([74e9ff8](https://github.com/JamieMason/astexplorer.app/commit/74e9ff87cc1892f891951881bf139abda7efd71b))
- **app:** stop watcher when attempting to quit
  ([0251d18](https://github.com/JamieMason/astexplorer.app/commit/0251d18907f6b4388df4feefd4dcb6957edd75ee))

### Features

- **app:** add menu to import source & transform files
  ([878e12f](https://github.com/JamieMason/astexplorer.app/commit/878e12fbd33abc8a2151676fc9bd4a0078698f99))
- **app:** add name and icons to app
  ([710e2e9](https://github.com/JamieMason/astexplorer.app/commit/710e2e9cb1a1506a6e8b17794e5a21ee333b1c08))
- **app:** add support for modules in transforms
  ([215f49b](https://github.com/JamieMason/astexplorer.app/commit/215f49b295eeb10f75a16a27ddf27f76ee80901a))
- **app:** disable file drop n/a to desktop app
  ([44976c6](https://github.com/JamieMason/astexplorer.app/commit/44976c6361910d944f10731b18ffe1784bf60249))
- **app:** display astexplorer UI in electron
  ([a2f1928](https://github.com/JamieMason/astexplorer.app/commit/a2f19289a4205c265a864490cff5bf066d3d66f5))
- **app:** hide menu items n/a to desktop app
  ([ac7f3f8](https://github.com/JamieMason/astexplorer.app/commit/ac7f3f8d0a3ab55449ace501b0f437e00e303c3e))
- **app:** inject script to set default settings
  ([aeac1d2](https://github.com/JamieMason/astexplorer.app/commit/aeac1d2790d851c25b10ef15633ca1dc54150efa))
- **app:** load initial source from disk
  ([ffd0e53](https://github.com/JamieMason/astexplorer.app/commit/ffd0e53e5b9095a6b90dbe141f58df267a697bf9))
- **app:** update ui when code/transform changes on disk
  ([a89207c](https://github.com/JamieMason/astexplorer.app/commit/a89207cc8940efcb30c72917eb00a42f6f1886c0))
