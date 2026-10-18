
## Running the Liana extension

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to start compiling the client and server in [watch mode](https://code.visualstudio.com/docs/editor/tasks#:~:text=The%20first%20entry%20executes,the%20HelloWorld.js%20file.).
- Switch to the Run and Debug View in the Sidebar (Ctrl+Shift+D).
- Select `Launch Client` from the drop down (if it is not already).
- Press ▷ to run the launch config (F5).

## Building the local authoring backend

The extension uses the local `pareto_liana` and `liana_authoring` packages.
`npm run compile` compiles both packages before the client and server, so the
VSIX contains the current schema implementation:

```sh
npm run compile
node --test test/type-selection.test.mjs test/grammar.test.mjs
npm run bundle
```

The backend and bundled authoring template use Liana Next exclusively.
`Type Specification` contains `schema` and `root type`; the latter selects an
entry in `schema.resolvers`. The schema contains `basic types`, `types`,
`signatures`, and `resolvers` directly. Text is a basic-type flavor, and `simple`
values reference basic types directly. Schema sets, imports, schema paths,
complexity wrappers, separate text types, external references, and stack lookups
are not supported.

The template is the sealed Liana Next self-schema from
`clean_start/instance/liana_next/liana_next.liana.lna`, also deployed as the
context of `clean_start/instance/liana_next_with_liana_next_schema/`.
Regenerate it through that bootstrap chain rather than copying a current-Liana
encoded context. Both client commands and the server load it through the local
`pareto-liana` reader. The maintained resolving reader lives in
`pareto_liana/src/modules/schema.generated/schemas/resolved/refiners/unresolved_manual.ts`;
the historical split reader paths re-export that implementation.

This is a breaking schema-format update: existing authoring environments must
have their schemas migrated and their `.liana/schema.slna` contexts regenerated
before using this extension. Installing it does not promote the tools or
authoring environments in `clean_start`.

For packaging without committing or bumping the version automatically, run
`vsce package --no-dependencies -o ../out/liana-<version>.vsix` after the build.
The top-level `build_package.sh` commits all open changes, so it is not appropriate
when unrelated work is present.
