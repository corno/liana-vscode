# Change Log

## [Unreleased]

### Improved
- SysML / LionCore native diagnostics and scoped reference completion, verified against the full SysML fixture.
- Reference completion reuses parsed instance data instead of sealing and parsing the document for every candidate.
- Boekhouding fiscal, ledger-category and tax-correction reference diagnostics and scoped completion coverage.
- Multi-year Boekhouding coverage for carry-forward, trade contracts, VAT, mutation references and year cycles; declared schema limitations are documented.

### Fixed
- Native diagnostic reference paths now include dictionary, list and optional boundaries, matching generated resolver paths.
- Boekhouding optional year selection now uses that year's purchases, sales and VAT periods, matching the handwritten resolver without changing accounting data.

## [0.1.51]

### Added
- Bundled native Liana compiler and declared-resolver execution for semantic diagnostics.
- Scoped native reference completion, including local cyclic values and namespace paths.
- Explicit native schema contracts with cache invalidation and no legacy fallback.
- Working native TypeScript generation and native authoring-environment initialization.
- Canonical native ASTN schema authoring template.

### Preserved
- Legacy environments remain usable until their schema and consumer migrations finish.
- Structural editing, sealing and syntax diagnostics still use syntax-only bootstrap machinery.

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
