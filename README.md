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

### Native Liana

The bundled compiler supports the canonical native `astn`/`liana` model. New
schema authoring environments use its ASTN self-definition, and **Generate
TypeScript code from this schema** runs the native generation pipeline.
ASTN generates only an unresolved structural API; Liana also generates the
schema's declared semantic resolver. Generation requires an empty destination.

**Initialize or update authoring environment with this schema** installs:

- `.liana/schema.slna`: the actual native contract.
- `.liana/schema.to_be_removed.slna`: its syntax-only bootstrap projection for existing
  structural editing and sealing.

PBV installs the same pair for native examples, fixtures and parameter
environments. Native contract presence explicitly selects native loading.
Malformed native contracts report errors; they never fall back to legacy
interpretation. Environments with only the legacy contract remain supported
while their schemas and consumers migrate.

Native semantic diagnostics execute the generated declared resolver rather
than a separate validator. Reference completion observes that resolver's
actual dictionary/namespace lookups, including local cyclic references and
nearest-scope namespace lookup. Native contract changes refresh open documents.
Token ranges are reported when a resolver path identifies a unique reference;
ambiguous paths are reported at the document start rather than at an invented
location. Root resolvers requiring external parameters/lookups report an
explicit configuration diagnostic; the editor does not invent those arguments.

### SysML / LionCore

Open `newstyle_projects/projects/liana/sketch/temp/lioncore/sysml.lna` in
the checkout. Its local `.liana` environment selects the native LionCore
contract. Diagnostics validate entity targets and acyclic dependencies;
reference completion offers the current language's entities for local
references and dependency-language entities for external references.
`local cyclic` allows self-references, whereas `local` completion filters out
targets that introduce cycles. Completion parses the instance once and reuses
its unresolved data when checking candidates, including the large SysML model.

### Boekhouding

Native accounting reference coverage uses the canonical `boekhouding` schema
and `test/fixtures/boekhouding.lna`. Fiscal subcategory completion follows the
selected fiscal parent; ledger subcategory completion follows the selected
ledger category. Tax-correction references select only correction types.
Missing targets report token-level diagnostics when the resolver path and ID
identify one reference. Repeated IDs at the same schema path remain ambiguous
and report at the document start.

The multi-year fixture additionally covers account carry-forward, purchase and
sale branches, customer/project/quotation/license scopes, VAT periods, mutation
benchmarks and previous-year cycles. Generated-resolver identity tests verify
targets and the complete root serialization round-trip.

`Rekening Mutatie.Jaar` selects that year's transactions and VAT periods when
set, and current-year parameters when unset, matching the handwritten accounting
resolver without changing the data format. VAT-period `1. BTW-categorieen`
dictionary keys remain unconstrained.
The editor executes these declared semantics; it does not invent extra rules.

The installed extension is self-contained: native parsing, generation and
resolver execution require neither the project checkout nor a separate compiler
installation. Building the extension uses the canonical producer's native-owned
backend and syntax-bootstrap machinery.
This does not yet retire those build-time dependencies or implement semantic
self-resolution of the ASTN schema-document definition.

### Keyboard Shortcuts

| Command | Shortcut | Description |
|---------|----------|-------------|
| Jump to next missing data | `Ctrl+D` or `Ctrl+3` | Navigate to the next `#` marker |
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

All three string delimiters (double quotes, single quotes and backticks) support
literal newlines as well as escaped `\n` and `\r`. Empty identifiers are valid
ASTN too. Highlighting does not mark these as syntax errors. Files open as
written; the extension does not normalize string contents when opening them.

## Tutorial: Creating Your First Language

### Legacy module selection compatibility

Schema loading accepts reference-based module specifications as well as legacy
flat schema paths. A new `schema path` contains `tail` and a derived `result`:

```astn
`schema path`: (
    `tail`: [ | `set` 'nested' | `set` 'user' ]
    `result`: ~
)
`complexity`: | `unconstrained` (
    `module`: 'Root'
)
```

Each step requires a schema set; the final result must be a schema. An empty
tail selects a directly supplied schema. `module` and `module resolver` are
references into that schema's module and resolver-module dictionaries.
Unknown entries and invalid tree/complexity selections produce schema-loading
diagnostics rather than internal implementation errors. These rules apply to
explicit legacy environments, not the new native authoring template.

Legacy environments use the shared loader from `pareto-liana` (version 0.1.81
or later). Native environments instead use the bundled native compiler and
generated declared resolver, with a syntax projection for structural editing.

Validate with `npm run compile` and `node --test test/*.test.mjs`.

Below is a step-by-step guide to creating your first Liana language.

# Getting up and running
Below is a quick-start tutorial

## schema authoring environment
first you need to create a schema authoring (development) environment:
ctrl+shift+p
select 'Liana:initialize Liana schema authoring environment'
and select (or create) a directory where you want to author your schemas

you should now have a starter schema and its authoring contracts:

````
.liana
    schema.to_be_removed.slna
    schema.slna
my_schema.liana.lna
````

you can now either author the `my_schema.liana.lna` file or create your own one; right click in the folder -> create liana file (make sure the file has the double extension '.liana.lna', more about this later).

The supplied starter is a native ASTN schema with a `Root` group and a text
property. Newly created files start with a single `#` character.

## '#' (missing data) and ctrl-d
 The '#' character means 'missing data'. By selecting ctrl-d, you will jump to the first next '#' and you will get code completion suggestions for this location. You will use ctrl-d extensively to fill in all the missing data.

## verbose/concise
The suggestion you will get might indicate that they are either verbose or concise.
The verbose option explicitly names all the properties, the concise option relies on the order of the values to interpret the data, much like programming languages.

I would advise to start with the verbose options to get a feel for the language and then later you can switch to concise.
You can toggle the document's default between verbose and concise notation with `Ctrl+Alt+N`. This sets the style for all new entries in the document; use code actions to selectively convert entries that already exist.

## creating your first schema
- For a new file, select ctrl-d and choose `astn`. This branch describes syntax
  without a semantic resolver.
- Set `root` to `'Root'`.
- Add a type named `'Root'` in `types`; `root` selects this type.
- type a colon (:). It should be automatically expanded to ': #'.
- use ctrl-d, select, use ctrl-d again, select 'group'. You have now configured your first value. You will be doing this a lot.
- in the {}, add a property named 'my dictionary', and configure this value to be a dictionary.
- configure the dictionary's value to be a state. A state will force the user to select one of the available options.
- add 2 options; 'a' and 'b'. Make the values of the options 'nothing' for now.

If all went well, you ended up with a file that looks like this

````
| `astn` (
    `imports`: {}
    `globals`: ( `simple types`: {} )
    `types`: {
        'Root': (
            `root value`: | `group` {
                'my dictionary': (
                    `description`: _
                    `value`: | `dictionary` (
                        `value`: | `state` {
                            'a': ( `description`: _ `value`: | `nothing` ~ )
                            'b': ( `description`: _ `value`: | `nothing` ~ )
                        }
                    )
                )
            }
        )
    }
    `root`: 'Root'
)
````

## create an language authoring environment for this schema.
- save the file
- right click on the content and select `Initialize or update authoring environment with this Liana schema`.
- Now you can create your first file that conforms to the language you just created; right-click on the folder, select 'New Liana file'. Give a name that ends with .lna. My advise would be to add the language name in the file, according to this format; .my_lang.lna
- Again, you should see a '#'. ctrl-d should give the 'my dictionary' property, to which you can now add entries.

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
