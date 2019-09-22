#!/usr/bin/env bash

REPO="$PWD"
rm -rf "$REPO/astexplorer"
git clone https://github.com/fkling/astexplorer.git
rm -rf "$REPO/vendor"
mkdir -p "$REPO/vendor/astexplorer"
mv "$REPO/astexplorer/website" "$REPO/vendor/astexplorer"
rm -rf "$REPO/astexplorer"

# apply patches
TRANFORM_PATH="$REPO/scripts/transforms/insert-middleware.js"
ENTRY_FILE="$REPO/vendor/astexplorer/website/src/app.js"
jscodeshift --parser flow --extensions js -t "$TRANFORM_PATH" "$ENTRY_FILE"
