#!/usr/bin/env bash

REPO="$PWD"
UPSTREAM="$REPO/vendor/astexplorer"
cd "$UPSTREAM/website"
yarn install
rm -rf "$UPSTREAM/out"
mkdir -p "$UPSTREAM/out"
NODE_ENV=${NODE_ENV:-production}
yarn exec webpack --mode=$NODE_ENV
