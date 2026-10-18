# Change Log

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
