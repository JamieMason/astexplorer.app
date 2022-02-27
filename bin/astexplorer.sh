#!/usr/bin/env bash

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
INSTALL_DIR="$SCRIPT_DIR/../lib/node_modules/astexplorer.app"

( cd $INSTALL_DIR && ./node_modules/.bin/electron-forge start )
