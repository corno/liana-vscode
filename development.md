
## Running the Liana extension

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to start compiling the client and server in [watch mode](https://code.visualstudio.com/docs/editor/tasks#:~:text=The%20first%20entry%20executes,the%20HelloWorld.js%20file.).
- Switch to the Run and Debug View in the Sidebar (Ctrl+Shift+D).
- Select `Launch Client` from the drop down (if it is not already).
- Press ▷ to run the launch config (F5).

## Testing the local resolver interpreter

From this folder, link the sibling authoring library and its dependencies used
directly by the extension:

```sh
npm link ../packages/liana-authoring/typescript/lib \
  ../packages/liana-authoring/typescript/lib/node_modules/astn \
  ../packages/liana-authoring/typescript/lib/node_modules/pareto-json
node ../newstyle_projects/tools/typescript.cjs -p ../packages/liana-authoring/typescript/lib
npm run compile
npm run bundle
node --test test/reference-diagnostics.test.mjs test/module-selection.test.mjs
```

The reference diagnostics tests exercise the actual YABNF example, including
the bundled server over LSP. They introduce an intentional `Texdt` typo in memory
and verify that correcting it to `Text` clears the error without changing the
file on disk.

Rebundle after library changes and restart the extension host. To create a local
VSIX without publishing, committing, or bumping the version:

```sh
npx --no-install @vscode/vsce package --no-dependencies -o out/liana-local.vsix
```
