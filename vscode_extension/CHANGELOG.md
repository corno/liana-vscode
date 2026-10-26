# Change Log

## [Unreleased]

### Added
- Same-document Find All References, declaration/reference highlights, and safe
  rename based on resolved target identity. Rename rejects collisions, new
  diagnostics, changed reference bindings, and stale document versions.
- Go to Definition and Peek Definition for resolved dictionary references,
  selecting the target entry's identifier through dependent and forwarded lookups.
- State-option completion marks definitely failing entry constraints with
  strikethrough and explains the failed checks while keeping options selectable.
- Lookup-driven reference completion, including dependent and cyclic sibling
  lookups, with whole-token replacement and quoted identifier insertion.
- Schema-driven selected-reference diagnostics at the identifier token, including
  missing dictionary entries and forbidden acyclic dependencies.
- Deferred cyclic lookups and dependent lookup traversal through components,
  properties, and references, with lookup/type argument propagation.
- Explicit list-result declarations with an initial cursor and per-item next
  selection, including empty-list results and inherited cursors.
- State-result declarations with a result type before the options and explicit
  per-option payload/context selections; typed consumers verify producer types.

### Fixed
- Formatting a document keeps its comments, including comments before the first
  token, after entry ids, `:`, state options and include paths. A `//` comment
  ends its line; the tokens after it continue on the next line.
- Formatting no longer adds `:` to an entry that has none, which turned the next
  entry into its value.
- Editing or closing a document during validation no longer strands pending
  diagnostic requests. Invalidated cache loads still notify their original
  callers without restoring stale results or settling a replacement request.
- Do not suggest replacing a missing reference with another `#` when its lookup
  is unavailable or empty; keep reference markers in generated parent skeletons.
- Keep reference suggestions visible inside existing quoted identifiers by
  matching completion filter text to the original token's delimiters.
- Correct the bundled self-schema's `optional value` constraint to require an
  `optional` definition, removing false state-option diagnostics.
- Normalize forwarded type-parameter values and derived component payloads using
  their declared schema types, restoring signature-dependent argument diagnostics.
- Explicit argument dictionaries require complete coverage, in both handwritten
  refinement and self-schema diagnostics. Whole/category `_` passes through the
  existing environment; missing explicit entries no longer inherit caller values.
- Reference skeleton completion inserts `#` instead of the placeholder `'...'`.
- Dictionary benchmarks now reject unknown keys and enforce complete coverage
  when their explicit `dense` flag is set, including resolver/signature matching.
- The authoring template binds local option constraints for state-option and
  present-optional payload resolvers instead of forwarding an absent outer parameter.
- Constraint and result-selection failures are reported independently of
  selected-reference lookups; invalid upstream values suppress cascading checks.
- Missing list cursors and invalid state-result types now report errors instead
  of obsolete unsupported-result warnings.
- Component resolution preserves parameter status through whole/category
  pass-through without inventing defaults for omitted explicit entries.

### Changed
- Renamed "Initialize or update authoring environment with this Liana schema"
  to "Publish this Liana schema to an authoring environment..." (command id
  `liana.publish_schema_to_authoring_environment`) and removed the prompt to
  open the authoring environment afterwards.
- Publishing a schema is refused, and hidden from the editor context menu,
  when the document has errors.

### Removed
- The unfinished "Generate TypeScript code from this Liana schema" command.
  Code generation produces intermediate Pareto code that needs external tooling
  anyway, so it belongs outside the extension.

## [0.1.57]

### Changed
- Switched the local schema backend and authoring template to Liana Next:
  flat schemas with `basic types`, `types`, `signatures`, and `resolvers`, plus
  `root type` selecting the document's root resolver.
- Text is now a basic-type flavor; direct basic-type references drive completion,
  document links, outlines, formatting, and sealing.
- Removed support for the previous schema-format wrappers, schema sets/imports,
  external references, and stack lookups. Existing authoring contexts must be
  regenerated with the matching Next tools.

### Tested
- Root selection, schema serialization round-trips, legacy-format rejection,
  text quoting/links, non-text basic types, and language-server loading/caching.

## [0.1.56]

### Changed
- Migrated schema loading, resolution, authoring operations, and serialization to
  the type-based Liana schema model.
- Updated the bundled authoring template while retaining constrained schema paths
  and root selections. Legacy module-based schema files must be regenerated.

### Fixed
- Type-based schemas no longer fail to deserialize because the backend expects
  `module`/`modules` instead of `type`/`types`.

## [0.1.28]

### Added
- Document symbols support for outline view and breadcrumbs
- Selection ranges for smart text selection
- Code actions for notation style conversion (verbose ↔ concise)
- Status bar item showing current notation style
- Toggle notation style command with keyboard shortcut (Ctrl+Alt+N)
- Document-specific notation style preferences
- Inlay hints provider infrastructure (experimental)

### Improved
- Enhanced package metadata with proper categories and keywords
- Professional README with feature list and tutorial
- Better error diagnostics with related information
- Schema caching and auto-refresh on schema changes
- Code completion with notation style awareness

### Fixed
- Indentation handling in code action refactorings
- Schema invalidation when .liana/schema.slna files change

## Earlier Versions

See git history for changes prior to 0.1.28.
