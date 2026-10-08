
## Running the Liana extension

- The native bundle currently builds against the sibling `newstyle_projects`
  checkout. Its canonical Liana producer, explicit shared legacy backend,
  Pareto Next emitter and TypeScript Light file-tree emitter must already be
  built. The installed VSIX has no dependency on these checkout paths.
- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Run `npm run compile` before starting watch mode. This type-checks and bundles
  the native library and regenerates the native authoring template as well as
  compiling the client/server. Native library changes require another full
  compile before rebundling.
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
(cd ../packages/liana-authoring/typescript/lib && npm link --offline ../../../pareto-liana/typescript/lib)
node ../newstyle_projects/tools/typescript.cjs -p ../packages/pareto-liana/typescript/lib
node ../newstyle_projects/tools/typescript.cjs -p ../packages/liana-authoring/typescript/lib
npm run compile
npm run bundle
node --test test/reference-diagnostics.test.mjs test/module-selection.test.mjs
```

Run `node --test test/*.test.mjs` for all editor regressions. Native tests execute
declared resolvers for cyclic values, computed namespace paths and SQL
uniqueness constraints; exercise both native authoring commands; test contract
invalidation and no-fallback behavior; and copy the bundled server into an
isolated directory to verify native diagnostics and completion over LSP without
checkout or installed-package access.

The reference diagnostics tests exercise the actual YABNF example, including
the bundled server over LSP. They introduce intentional terminal (`Texdt`) and
cyclic nonterminal (`Valuke`) typos in memory, verify their precise diagnostic
ranges, and verify that correcting both clears the errors without changing the
file on disk. Ranges are calculated from the current example rather than fixed
line numbers.

The same tests request instance-level completion for both typos, check the
suggested `Text`/`Value` identifiers and whole-token replacement edits, and apply
the actual LSP edits before verifying that diagnostics clear.

SQL regressions also verify table-name completion at an empty `from` reference
and uniqueness assertions on foreign-key fields. The uniqueness test uses the
fixture's table definitions with empty statements in memory, isolating the
constraint behavior. Full-path tests check first-field and subsequent-field
completion through the previous resolved foreign-key field, apply actual LSP
edits, and verify diagnostics clear. A scalar intermediate field produces an
expected-`reference`/found-`value` diagnostic at the next field; final scalar and
foreign-key fields remain valid.

Rebundle after library changes and restart the extension host. To create a local
VSIX without publishing, committing, or bumping the version:

```sh
npx --no-install @vscode/vsce package --no-dependencies -o out/liana-local.vsix
```
