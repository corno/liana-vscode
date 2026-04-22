#!/bin/bash

OUTPUT_DIR=./out

npm version patch
node ./esbuild.js

  # Extract name and version from package.json
  NAME=$(node -p "require('./package.json').name")
  VERSION=$(node -p "require('./package.json').version")
  
  # Create output directory if it doesn't exist
  mkdir -p "$OUTPUT_DIR"
  
  # Package with full output path
  npx @vscode/vsce package -o "$OUTPUT_DIR/${NAME}-${VERSION}.vsix"