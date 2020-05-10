#!/usr/bin/env bash

VERSION=$(node -e 'console.log(require("./package.json").version)' | tr -d '[:space:]')
node_modules/.bin/commit-release --no-tag
NEW_VERSION=$(node -e 'console.log(require("./package.json").version)' | tr -d '[:space:]')

# update download link in readme
sed -i '' -e "s/$VERSION/$NEW_VERSION/g" ./README.md

git add .
git commit --amend --no-edit
git tag $NEW_VERSION
