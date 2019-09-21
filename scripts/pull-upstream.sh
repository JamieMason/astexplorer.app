#!/usr/bin/env bash

REPO="$PWD"
rm -rf "$REPO/astexplorer"
git clone https://github.com/fkling/astexplorer.git
rm -rf "$REPO/vendor"
mkdir -p "$REPO/vendor/astexplorer"
mv "$REPO/astexplorer/website" "$REPO/vendor/astexplorer"
rm -rf "$REPO/astexplorer"
