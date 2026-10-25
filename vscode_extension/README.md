# Liana VS Code Extension

Complete language support for Liana and ASTN (Asynchronous Syntax Tree Notation) in Visual Studio Code.

## What is Liana?

Liana is a tool to create textual languages. If you feel that editing data for your project in JSON is cumbersome and creating a custom language is too much work, then Liana might fill the gap in between.

**Easy to start...** You can have your first language up and running in 15 minutes with all the niceties of a professional language: syntax highlighting, code completion, hints, and more.

**...but battle hardened** Liana isn't limited to simple languages. Very extensive and complex languages have been built with Liana without resorting to hacks or workarounds.

## Features

-**Syntax Highlighting** - Rich colorization for ASTN syntax elements
**IntelliSense** - Schema-based code completion with contextual suggestions
**Real-time Validation** - Immediate feedback on syntax and semantic errors
**Auto-formatting** - Consistent code formatting at the press of a key
**JSON Conversion** - Convert between Liana and JSON formats
**Document Outline** - Navigate large files with document symbols
**Quick Actions** - Convert between verbose and concise notation styles
**Smart Navigation** - Jump to missing data, collapse entries, and more
**Schema Support** - Full schema authoring and TypeScript code generation

## Quick Start

### Installation

Install the extension from the VS Code Marketplace or install manually from VSIX.

### Keyboard Shortcuts

| Command | Shortcut | Description |
|---------|----------|-------------|
| Jump to next missing data | `Ctrl+D` or `Ctrl+3` | Navigate to the next `#` marker and suggest completions in the selected style |
| Complete missing data in opposite style | `Ctrl+Shift+D` | Navigate to the next `#` marker and suggest completions in the opposite style, without changing the document's default |
| Toggle notation style | `Ctrl+Alt+N` | Set the default notation style for all values that will be code completed |

### Commands

Access these via the Command Palette (`Ctrl+Shift+P`):

- **Initialize Liana schema authoring environment** - Set up an environment (directory) where schemas can be created and authored

The following commands are also available in context menu's
- **New Liana File...** - Create a new .liana file
- **Convert to JSON** - Export current file to JSON
- **Save as JSON file** - Save a JSON version alongside your .liana file
- **Sort dictionary alphabetically** - Organize dictionary entries
- **Toggle notation style** - Switch between verbose/concise notation
- **Generate TypeScript code from this schema** - Generate type-safe TypeScript
- **Seal document** - Mark document as finalized

## Notation Styles

Liana uses ASTN as its notation language. ASTN supports two notation styles:

- **Verbose** - Explicitly names all properties for clarity: `( `name`: "value" `age`: 42 )`
- **Concise** - Relies on value order like programming languages: `< "value", 42 >`

Toggle the document's default style with `Ctrl+Alt+N`; all values that will be code-completed will use the selected verbose or concise notation. Use code actions (right-click → Refactor) for selective conversion of existing values.

For a one-off exception, use `Ctrl+Shift+D` instead of `Ctrl+D`: it follows the
same next-`#` navigation but requests verbose completions when concise is selected,
or concise completions when verbose is selected. Your selected style and status
bar stay unchanged; subsequent completions use the selected style again.

Hovering over a property's value, including an explicit not-set optional (`_`),
shows its schema description in both verbose and concise notation.

**New Liana File...** uses the nearest ancestor `.liana/schema.slna` and follows
its file tree to the selected directory. For dictionary file nodes, entering
`my_file` creates `my_file.<schema extension>.lna` (or `my_file.lna` when the
extension is empty). Already supplied schema/encoding suffixes are not duplicated.
For fixed-name directory groups, choose a declared file when more than one is
available. Invalid schema contexts are reported, and existing files are never
overwritten.

Generated snippets select a state option automatically only when exactly one
option satisfies all its constraints. Ambiguous, unavailable, or recursive
choices remain `| #` for you to fill in.
Dense benchmark dictionaries are populated with their required entries, including
nested generated dictionaries. Sparse or unresolved benchmarks are not filled.

For missing required entries in a dense dictionary, use **Quick Fix → Add all
missing required entries**. This adds all currently missing entries in the
document with schema-generated values, preserving existing entries and comments.
Missing-entry diagnostics underline only the opening `{`, not the entire dictionary.

For **Reference 'foo' does not exist**, use **Quick Fix → Create entry 'foo' in
referenced dictionary**. The entry is added to the dictionary selected by the
reference lookup, with a schema-generated value. No creation fix is offered when
the target dictionary is unavailable or already contains that identifier.

For an entry that does not exist in its benchmark, use **Quick Fix → Add entry
'foo' to benchmark dictionary**. This creates a schema-generated value in the
actual benchmark dictionary, for both sparse and dense constraints.

Generated dictionary entry names and renamed identifiers use escaped single quotes.
Reference completions also insert single-quoted identifiers, escaping embedded
apostrophes, backslashes and control characters.

All three string delimiters (double quotes, single quotes and backticks) support
literal newlines as well as escaped `\n` and `\r`. Empty identifiers are valid
ASTN too. Highlighting does not mark these as syntax errors. Files open as
written; the extension does not normalize string contents when opening them.

## Tutorial: Creating Your First Language

### Current Liana schemas

The extension supports only the latest deployed Liana format. A Type Specification
contains a structural schema, separate resolver signature and implementation
trees, and a file tree selecting the root type for each document:

```astn
(
    `schema`: (
        `structure`: (
            `namespaces`: {}
            `basic types`: {}
            `types`: { 'Root': (`root value`: | `nothing` ~) }
        )
        `resolver`: (
            `declarations`: (
                `namespaces`: {}
                `types`: { 'Root': (`signature`: | `local` (`values`: {} `lookups`: {})) }
            )
            `implementations`: (
                `namespaces`: {}
                `types`: { 'Root': (`root value resolver`: | `nothing` ~) }
            )
        )
    )
    `directory`: | `dictionary` (
        `node`: | `file` (`file extension`: "example" `type`: 'Root')
    )
)
```

Place this bare specification in `.liana/schema.slna`. Files such as
`document.example.lna` and `document.example.slna` use its `Root` type.
The nearest ancestor `.liana` directory is authoritative: a missing or invalid
schema there is an error, not a reason to search farther. Named `group`
directories and arbitrary-name `dictionary` directories may be nested. Root
selection happens per document; a cached schema never fixes all its files to one
type. Unknown, ambiguous and extension-mismatched paths are rejected.

Self-contained documents instead use a header containing both the logical path
and the same specification:

```astn
! (
    `path`: (`directories`: [] `file name`: "document.example.lna")
    `schema`: # // insert the complete Type Specification here
)
~
```

The header's path selects the type independently of the exported file's location.
Older root-type specifications and older header shapes are not supported.

Basic types declare token syntax (`double quoted` or `undelimited`), an optional
regular expression, and optional `hyperlink` metadata. Booleans, dates and
numbers can be modeled with token patterns; they are not built-in semantic value
kinds. Resolver declarations describe value and lookup arguments, including
their required or optional `presence`.

Structural list, optional and state values declare their result targets.
Resolvers provide the corresponding result selections: a list supplies `initial`
and `next`, an optional supplies one selection for its present payload, and a
state supplies a selection per option. A state resolver contains only `options`;
there is no resolver-level result-type field.

A guaranteed selection may start with `optional fallback`. Both branches must
select the exact same structural target. The fallback is evaluated only when the
possible selection is absent, never for an invalid, unavailable or cyclic value.

Document reference checks are schema-driven: selected dictionary references report
missing identifiers at the reference token, acyclic lookups report cycles, and
cyclic lookups allow forward and mutual references. Dependent dictionary lookups
can navigate components, properties, and resolved references. Invalid lookup
sources do not produce cascading missing-reference errors.

Reference placeholders (`#`) offer dictionary identifiers when available. If no
candidates are available, completion offers `''` to show that a reference
identifier is expected; this placeholder is not a validated reference target.

Use **F12** (Go to Definition), **Alt+F12** (Peek Definition), or **Ctrl+Click**
on a reference to navigate to its target dictionary entry in the same document.
Navigation follows the resolved lookup, including dependent and forwarded
acyclic/cyclic lookups. Missing or unresolved references have no navigation target;
derived `~` values are not editable references.

Within the current document:
- **Shift+F12** finds references from either a dictionary entry or one of its
  resolved references.
- Placing the cursor on either highlights the declaration and related references.
- **F2** renames an entry and its resolved references together. Identical names in
  other dictionaries are not changed. Rename checks for collisions, reparses the
  proposed document, and verifies diagnostics and reference bindings before
  returning versioned edits. Names are inserted as safely double-quoted identifiers.

Rename reports an error rather than making a partial change if it would break
implicit name or benchmark dependencies that are not explicit references.
Missing/unresolved references cannot be renamed. These features do not search or
edit other files.

Reference completion offers identifiers from the reference's actual lookup,
including sibling, forwarded-parameter, and dependent dictionary lookups.
Selecting a candidate replaces the whole reference token or `#` marker and
inserts safely quoted text. Reference skeletons use `#`, not a fictitious
`'...'` identifier. Derived references do not offer editable identifiers.
Completing a reference marker offers actual lookup identifiers only. If the
lookup is unavailable or empty, no replacement is offered; completion never
replaces a reference marker with another marker. Parent skeletons still contain
`#` for references that need to be filled in.
Press **Ctrl+Space** inside a quoted reference or at a `#` marker to request
suggestions. Filtering respects the token's quotes; selecting a suggestion still
replaces the whole token.

State-option completion keeps all options selectable. Options whose declared
entry constraints definitely fail are struck through, with the failed checks in
their completion documentation. Options with incomplete or unresolved constraints
remain unmarked; an unmarked option does not guarantee that its payload is valid.

Dictionary benchmarks validate every supplied identifier against the selected
benchmark dictionary. The schema's explicit `dense` flag additionally requires
every benchmark identifier to be present. Sparse benchmarks permit omissions,
but not unknown identifiers. Unexpected entries are reported at their identifier;
missing dense entries are reported on the supplied dictionary. Invalid inputs
suppress cascading benchmark diagnostics.

Component arguments use `_` at the whole-arguments or category boundary to pass
the existing environment through. Explicit dictionaries must supply every callee
parameter; optional arguments must explicitly select `not set` when absent. Type
parameter bindings resolve their source name against the caller's signature and
their destination name against the callee's signature. Argument benchmarks and
resolver/signature coverage are dense. `_` retains its existing forwarding
behavior at whole-arguments and category boundaries.

List and state results are explicitly declared by their producers. A list result
declares its `type`, an `initial` selection, and a `next` selection evaluated after
each item. Empty lists return the initial cursor; each item receives the preceding
cursor. Lists without their own result preserve any enclosing cursor.
A state declares a result type and a result selection for every option.
Result selections use either the resolved payload (`value`) or the enclosing
resolver environment (`context`), without inferring behavior from option names.
Typed state-result consumers check the producer's declared type. Missing cursors,
invalid selections, and result-type mismatches are errors rather than unsupported
warnings; failed upstream checks suppress cascading diagnostics.

Option, optional-presence, component, and reference constraints report failed
checks as errors, even when no selected
reference consumes their results. Already-invalid inputs suppress cascading checks.
The self-schema passes each state option's or present optional value's local
constraints to its payload resolver; it does not inherit the outer option scope.

The client commands and language server both use the local Next schema loader
from `pareto-liana`. Existing authoring environments must migrate their schema
sources and regenerate `.liana/schema.slna`; old formats are rejected rather
than silently reinterpreted. The bundled template initializes new environments
with the matching Next self-schema.
The ASTN Core to ASTN Runtime dependency migration is still a separate follow-up.

Validate with `npm run compile` and `node --test test/*.test.mjs`.

Below is a step-by-step guide to creating your first Liana language.

# Getting up and running
Below is a quick-start tutorial

## schema authoring environment
first you need to create a schema authoring (development) environment:
ctrl+shift+p
select 'Liana:initialize Liana schema authoring environment'
and select (or create) a directory where you want to author your schemas

you should now have a directory with 1 file and 1 directory (containing 1 file as well):

````
.liana
    schema.slna
my_schema.liana.lna
````

you can now either author the `my_schema.liana.lna` file or create your own one; right click in the folder -> create liana file (make sure the file has the double extension '.liana.lna', more about this later).

you should now see a file with a single '#' character.

## '#' (missing data) and ctrl-d
 The '#' character means 'missing data'. By selecting ctrl-d, you will jump to the first next '#' and you will get code completion suggestions for this location. You will use ctrl-d extensively to fill in all the missing data.

## verbose/concise
The suggestion you will get might indicate that they are either verbose or concise.
The verbose option explicitly names all the properties, the concise option relies on the order of the values to interpret the data, much like programming languages.

I would advise to start with the verbose options to get a feel for the language and then later you can switch to concise.
You can toggle the document's default between verbose and concise notation with `Ctrl+Alt+N`. This sets the style for all new entries in the document; use code actions to selectively convert entries that already exist.

## creating your first schema
- select ctrl-d, which should give you a couple of suggestions. 
- Choose the verbose group suggestion.
- Set the root file node in `directory` to type `'root'`.
- Add a type in `types` named `'root'`, a matching declaration in
  `resolver.declarations`, and a matching implementation in
  `resolver.implementations`.
- type a colon (:). It should be automatically expanded to ': #'.
- use ctrl-d, select, use ctrl-d again, select 'group'. You have now configured your first value. You will be doing this a lot.
- Add a basic type named `'text'` to `basic types`.
- In the group, add a property named `'message'` whose value is `simple 'text'`.
- Give the root resolver a matching group with a `simple` resolver for `message`.

If all went well, you ended up with a file that looks like this

````
(
    `schema`: (
        `structure`: (
            `namespaces`: {}
            `basic types`: {
                'text': (`type`: | `double quoted` ~ `regular expression`: _ `hyperlink`: _)
            }
            `types`: {
                'root': (
                    `root value`: | `group` {
                        'message': (
                            `description`: _
                            `value`: | `simple` 'text'
                        )
                    }
                )
            }
        )
        `resolver`: (
            `declarations`: (
                `namespaces`: {}
                `types`: {
                    'root': (`signature`: | `local` (`values`: {} `lookups`: {}))
                }
            )
            `implementations`: (
                `namespaces`: {}
                `types`: {
                    'root': (
                        `root value resolver`: | `group` {
                            'message': (`resolver`: | `simple` ~)
                        }
                    )
                }
            )
        )
    )
    `directory`: | `dictionary` (`node`: | `file` (`file extension`: "" `type`: 'root'))
)
````

## create an language authoring environment for this schema.
- save the file
- right click on the content and select `Initialize or update authoring environment with this Liana schema`.
- Now you can create your first file that conforms to the language you just created; right-click on the folder, select 'New Liana file'. Give a name that ends with .lna. My advise would be to add the language name in the file, according to this format; .my_lang.lna
- Again, you should see a '#'. ctrl-d should suggest the `message` property and
  a quoted text value.

Congratulations, you have just finished creating your first language.






<!-- # ASTN (Abstract Syntax Tree Notation)

ASTN is designed with the ambition to make editing data files a pleasure. Proper and thourough error reporting. Syntax highlighting. Code completion. All the things you are accustomed to when writing code for a programming language. Without having to develop a language. Write (or find) a schema and you're good to go.


ASTN is a **human-editable data format** designed to represent abstract syntax trees in a clear, concise, and structured way. It extends JSON’s capabilities by introducing additional notation features to better express complex data structures. ASTN is a superset of JSON, meaning that every JSON file is a valid ASTN file.
ASTN files can easily be converted back to JSON files


For a detailed explanation, head over to the project site [project site](https://github.com/corno/astn) for more details. -->
## Understanding Missing Data (`#`)

The `#` character represents "missing data" - a placeholder that distinguishes between intentional 'null'/empty values and data that still needs to be filled in. Use `Ctrl+D` to jump to the next missing data marker and get contextual code completion.

## Resources

- 📖 [ASTN Project](https://github.com/corno/astn) - Learn more about the ASTN data format (Abstract Syntax Tree Notation)
- 🐛 [Report Issues](https://github.com/corno/liana-vscode/issues) - Bug reports and feature requests
- 📝 [Source Code](https://github.com/corno/liana-vscode) - Contribute to the extension

## License

Apache-2.0 © Corno
