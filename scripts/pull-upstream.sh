#!/usr/bin/env bash

rm -rf "./astexplorer"
git clone "https://github.com/fkling/astexplorer.git"
rm -rf "./vendor"
mkdir -p "./vendor/astexplorer"
mv "./astexplorer/website" "./vendor/astexplorer"
rm -rf "./astexplorer"

# apply patches
HTML_FILE="./vendor/astexplorer/website/index.ejs"
ENTRY_FILE="./vendor/astexplorer/website/src/app.js"
DISABLE_DRAG_AND_DROP="./scripts/transforms/disable-drag-and-drop.js"
DISABLE_EXIT_DIALOG="./scripts/transforms/disable-exit-dialog.js"
INSERT_MIDDLEWARE="./scripts/transforms/insert-middleware.js"

yarn install
node_modules/.bin/jscodeshift --parser flow --extensions js --transform "$DISABLE_DRAG_AND_DROP" "$ENTRY_FILE"
node_modules/.bin/jscodeshift --parser flow --extensions js --transform "$DISABLE_EXIT_DIALOG" "$ENTRY_FILE"
node_modules/.bin/jscodeshift --parser flow --extensions js --transform "$INSERT_MIDDLEWARE" "$ENTRY_FILE"

# insert commit hash
LATEST_COMMIT="$1"
SHORT_HASH=$(echo $LATEST_COMMIT | cut -c1-7)
BUILD_NOTICE="Build: <a href=\"https:\/\/github.com\/fkling\/astexplorer\/commits\/$SHORT_HASH\">$SHORT_HASH<\/a>"

sed -i '' -e "s/@@COMMIT@@/$BUILD_NOTICE/g" $HTML_FILE
