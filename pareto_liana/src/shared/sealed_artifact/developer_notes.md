# Shared sealed artifact core

Copy this entire directory into a consumer's TypeScript source tree and compile
it there. All relative imports stay inside this directory; import the public
API from `index.js`. No dependency on the seal CLI or repository-relative shared
output is required.

## Dependencies

The source is an ES module and requires:

- `pareto-core` 0.1.333-compatible APIs.
- `astn-runtime` with parse-tree, sealed-target and primitive serializer APIs.
- `pareto-fountain-pen` with paragraph schema, shorthands and serializer APIs.
- Node.js `node:crypto`, providing SHA-256.

These are supplied by the enclosing consumer package, not an independently
installed nested package. `node_crypto.d.ts` supplies the minimal built-in
declaration needed by the repository's `noLib` compilation.

## Public API

- `Canonical_Body(value)` returns canonical body text from a sealed-target value.
- `Signature(value)` hashes that body's UTF-8 bytes with SHA-256, returning
  lowercase hexadecimal.
- `Schema_Signature(body, abort)` normalizes a parsed ASTN schema body and returns
  its signature. Pass the parsed document's `content`, never its header.
  Malformed values, includes, duplicate identifiers and concise groups without
  a schema fail through `abort`; they are not silently accepted.
- `Document(content, schema_signature)` constructs the compact artifact paragraph
  with the single-property `schema-signature` header.
- `Header(schema_signature)` constructs that complete header phrase, including
  the `!` marker. `Document` uses it; consumers must not duplicate the envelope.
- `Value(value)` renders a compact body phrase.
- `Inspect_Schema(text, abort)` parses a complete schema file, calculates its
  body key and structurally reads its optional single-property signature header.
  This checks syntax and header shape, not semantic schema validity.

Paragraph results must be serialized with empty indentation and newline strings.
All text is double-quoted, entry order is preserved and no whitespace is emitted
outside delimited contents. Existing ASTN primitive escaping is reused.

This core does not establish semantic validity, load schemas, select types,
resolve includes, perform version checks, or deploy/publish files. Callers must
validate the instance and its semantic constraints before emitting an artifact.
The supplied header signature must identify the actual governing schema body,
not the instance body or an unrelated pinned language version.

## Retrieving the Liana identity

Parse the authoritative deployed `instance/liana/.liana/schema.slna` using an ASTN
document parser, then call `Schema_Signature(parsed.content, abort)`. This obtains
the identity of that deployed Liana schema itself. Its existing header identifies
the schema used to seal it, which need not have the same body identity.

Do not scrape header text, hash source formatting, use a Git object ID, or assume
the authored self-description has already been deployed. A consumer upgrade
script can compute this key from the deployed artifact while copying the core
and schema, and record it as explicit compatibility metadata.

The source-runnable Node workflow is:

```sh
node path/to/sealed_artifact/verify_schema.mjs \
    path/to/consumer/dist/shared/sealed_artifact/index.js \
    path/to/deployed/schema.slna --require-self-schema
```

Compile the consumer backend first. The verifier takes an explicit compiled-core
path and has no import of `clean_start/dist` or repository-relative source/dist
layout. It uses that same core, not a second JavaScript canonicalizer. Omit
`--require-self-schema` when the schema need not govern itself. Its JSON output
identifies the source file, calculated body key, declared governing key and
self-link status. Rerunning against the copied artifact verifies the recorded
body key reproducibly; never trust a stored manifest without that calculation.

The current deployed Liana release manifest is `meta/shared/liana_version.json`.
Regenerate it from the repository root after deploying a Liana version:

```sh
node meta/shared/src/sealed_artifact/verify_schema.mjs \
    meta/shared/dist/sealed_artifact/index.js \
    instance/liana/.liana/schema.slna --require-self-schema \
    > meta/shared/liana_version.json
```

Consumers can read this JSON before compiling, then recompute the copied schema
body key with their compiled vendored core to verify it. The source path records
provenance, not an instruction to fetch or trust a file at that location.

## Validation

Use the maintained `node dev/build_and_test.js` workflow. Refactoring this core
must preserve all sealed fixture bytes and downstream generated outputs relative
to the pre-extraction baseline. Expected snapshots remain owner-managed.
