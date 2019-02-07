#!/usr/bin/env bash

REPO="$PWD"
rm -rf "$REPO/astexplorer"
git clone https://github.com/fkling/astexplorer.git
cd "$REPO/astexplorer/website"
yarn install
yarn build
rm -rf "$REPO/website"
mv "$REPO/astexplorer/out" "$REPO/website"
rm -rf "$REPO/astexplorer"
