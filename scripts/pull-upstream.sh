#!/usr/bin/env bash

REPO="$PWD"
rm -rf "$REPO/astexplorer"
git clone https://github.com/fkling/astexplorer.git
rm -rf "$REPO/vendor"
mkdir -p "$REPO/vendor/astexplorer"
mv "$REPO/astexplorer/website" "$REPO/vendor/astexplorer"
rm -rf "$REPO/astexplorer"

# apply patches
ENTRY_FILE="$REPO/vendor/astexplorer/website/src/app.js"
DISABLE_DRAG_AND_DROP="$REPO/scripts/transforms/disable-drag-and-drop.js"
DISABLE_EXIT_DIALOG="$REPO/scripts/transforms/disable-exit-dialog.js"
INSERT_MIDDLEWARE="$REPO/scripts/transforms/insert-middleware.js"
yarn install
yarn exec jscodeshift --parser flow --extensions js -t "$DISABLE_DRAG_AND_DROP" "$ENTRY_FILE"
yarn exec jscodeshift --parser flow --extensions js -t "$DISABLE_EXIT_DIALOG" "$ENTRY_FILE"
yarn exec jscodeshift --parser flow --extensions js -t "$INSERT_MIDDLEWARE" "$ENTRY_FILE"
