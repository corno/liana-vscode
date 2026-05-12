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
| Jump to next missing data | `Ctrl+D` or `Ctrl+3` | Navigate to the next `#` marker |
| Toggle notation style | `Ctrl+Alt+N` | Switch between verbose and concise notation |

### Commands

Access these via the Command Palette (`Ctrl+Shift+P`):

- **Initialize Liana authoring environment** - Set up an environment (directory) where schemas can be created and authored

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

Toggle between styles with `Ctrl+Alt+N` or use code actions (right-click → Refactor) for selective conversion.

## Tutorial: Creating Your First Language

Below is a step-by-step guide to creating your first Liana language.

# Getting up and running
Below is a quick-start tutorial

## schema authoring environment
first you need to create a schema authoring (development) environment:
ctrl+shift+p
select 'Liana:initialize Liana authoring environment'
and select (or create) a directory where you want to author your schemas

you should now have a directory with 2 files:

- liana-schema.slna
- my_schema.liana.lna

you can now either author the `my_schema.liana.lna` file or create your own one; right click in the folder -> create liana file (make sure the file has the double extension '.liana.lna', more about this later).

you should now see a file with a single '#' character.

## '#' (missing data) and ctrl-d
 The '#' character means 'missing data'. By selecting ctrl-d, you will jump to the first next '#' and you will get code completion suggestions for this location. You will use ctrl-d extensively to fill in all the missing data.

## verbose/concise
The suggestion you will get might indicate that they are either verbose or concise.
The verbose option explicitly names all the properties, the concise option relies on the order of the values to interpret the data, much like programming languages.

I would advise to start with the verbose options to get a feel for the language and then later you can switch to concise.

## creating your first schema
- select ctrl-d, which should give you a couple of suggestions. 
- Choose 'schema (verbose)', and then again select ctrl-d and choose 'unconstrained' twice.
- set the \``module`\` property to the text value `"root"`
- add a module in \``modules`\` named '`root`' (this is the module that the \``module`\` property will refer to)
- type a colon (:). It should be automatically expanded to ': #'.
- use ctrl-d, select, use ctrl-d again, select 'group'. You have now configured your first value. You will be doing this a lot.
- in the {}, add a property named 'my dictionary', and configure this value to be a dictionary.
- configure the dictionary's value to be a state. A state will force the user to select one of the available options.
- add 2 options; 'a' and 'b'. Make the values of the options 'nothing' for now.

If all went well, you ended up with a file that looks like this

````
(
    `schema`: | `schema` (
        `schema imports`: {}
        `resolver imports`: {}
        `globals`: (
            `complexity`: | `unconstrained` ~
            `text types`: {}
            `simple types`: {}
        )
        `modules`: {
            'root': (
                `root value`: | `group` {
                    'my dictionary': (
                        `description`: _
                        `value`: | `state` (
                            `options`: {
                                'a': (
                                    `constraints`: _
                                    `description`: _
                                    `value`: | `nothing` ~
                                )
                                'b': (
                                    `constraints`: _
                                    `description`: _
                                    `value`: | `nothing` ~
                                )
                            }
                            `results`: _
                        )
                    )
                }
            )
        }
        `complexity`: | `unconstrained` ~
    )
    `schema path`: []
    `module`: "root"
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
