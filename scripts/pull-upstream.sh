#!/usr/bin/env bash

REPO="$PWD"
rm -rf "$REPO/astexplorer"
git clone https://github.com/fkling/astexplorer.git
cd "$REPO/astexplorer/website"
yarn install
yarn build
rm -rf "$REPO/vendor"
mv "$REPO/astexplorer/out" "$REPO/vendor"
rm -rf "$REPO/astexplorer"
