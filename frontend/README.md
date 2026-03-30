# Liana

Liana is a tool to create textual languages.
If you feel that editing the data for your project in JSON is cumbersome and creating a custom language is too much work, then Liana might fill the gap in between for you.

# Easy to start...
You can have your first language up and running 15 minutes, granted that it will be minimal, but it will have all the niceties of a professional language like syntax highlighting, code completion, hints, etcetera.

# ... but battle hardened by very complex and extensive languages
Liana isn't geared towards just simple languages. Very extensive languages have been built with Liana without having to resort to hacks or workarounds

# Getting up and running
Below is a quick-start tutorial

## schema authoring environment
first you need to create a schema authoring (development) environment:
ctrl+shift+p
select 'Liana:initialize Liana authoring environment'
and select (or create) a directory where you want to author your schemas
you should now have a directory with 2 files
-liana-schema.slna
-my_schema.liana.lna

you can now either author the '-my_schema.liana.lna' file or create your own one; right click in the folder -> create liana file (make sure the file has the double extension '.liana.lna', more about this later).

## '#' (missing data) and ctrl-d
you should now see a file with a single '#' character. The '#' character means 'missing data'. By selecting ctrl-d, you will jump to the first next '#' and you will get code completion suggestions for this location. You will use ctrl-d extensively to fill in all the missing data.

## verbose/concise
The suggestion might be verbose or concise. I would advise to start with the verbose options to get a feel for the language and then later you can switch to concise.

## creating your first schema
select ctrl-d, which should give you a couple of suggestions. Choose 'schema (verbose)', and then again select ctrl-d and choose 'unconstrained' twice.

set the \``module`\` value to `"root"`

add a module in \``modules`\` named '`root`' (this is the module that \``module`\` will refer to)
type a colon (:).
It should be automatically expanded to ': #'. 
use ctrl-d, select, use ctrl-d again, select 'group'. You have now configured your first value. You will be doing this a lot.
in the {}, add a property named 'my dictionary', and configure this value to be a dictionary.
configure the dictionary's value to be a state. A state will force the user to select one of the available options.
add 2 options; 'a' and 'b'. Make the values of the options 'nothing' for now.

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
save the file, right click on the content and select `Initialize authoring environment with this Liana schema`.
Now you can create your first file that conforms to the language you just created; right-click on the folder, select 'New Liana file'. Give a name that ends with .lna. My advise would be to add the language name in the file, according to this format; .my_lang.lna
Again, you should see a '#'. ctrl-d should give the 'my dictionary' property, to which you can now add entries.

You have just finished creating your first language.






<!-- # ASTN (Abstract Syntax Tree Notation)

ASTN is designed with the ambition to make editing data files a pleasure. Proper and thourough error reporting. Syntax highlighting. Code completion. All the things you are accustomed to when writing code for a programming language. Without having to develop a language. Write (or find) a schema and you're good to go.


ASTN is a **human-editable data format** designed to represent abstract syntax trees in a clear, concise, and structured way. It extends JSON’s capabilities by introducing additional notation features to better express complex data structures. ASTN is a superset of JSON, meaning that every JSON file is a valid ASTN file.
ASTN files can easily be converted back to JSON files


For a detailed explanation, head over to the project site [project site](https://github.com/corno/astn) for more details. -->