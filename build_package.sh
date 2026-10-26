#!/bin/bash

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

OUTPUT_DIR="$ROOT_DIR/out"

cd "$ROOT_DIR/vscode_extension" || exit 1

# Type check before bundling (will fail if there are TypeScript errors)
npm run compile || exit 1

node ./esbuild.js

# Commit all open changes
git add -A
git commit -m "committing open changes before version bump" || true

npm version patch

# Extract name and version from package.json
NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Package with full output path
npx @vscode/vsce package --no-dependencies -o "$OUTPUT_DIR/${NAME}-${VERSION}.vsix" || exit 1

# Install the packaged extension in VS Code
code --install-extension "$OUTPUT_DIR/${NAME}-${VERSION}.vsix" || exit 1

git add -A || exit 1
git commit -m "created version ${VERSION}"