const { execFileSync } = require('node:child_process')
const { mkdtempSync, rmSync } = require('node:fs')
const { tmpdir } = require('node:os')
const path = require('node:path')
const esbuild = require('../vscode_extension/node_modules/esbuild')

const [schema, core] = process.argv.slice(2)
if (!schema || !core) throw new Error('Expected deployed schema and shared sealed-artifact source directory')
const temporary = mkdtempSync(path.join(tmpdir(), 'liana-signature-'))
try {
    const output = path.join(temporary, 'signature.cjs')
    esbuild.buildSync({
        entryPoints: [path.join(__dirname, 'liana_signature.ts')],
        alias: {
            'sealed-artifact': path.join(path.resolve(core), 'index.ts'),
            'artifact-source': path.resolve(core),
            'liana-generated': path.resolve(core, '../liana/liana'),
        },
        nodePaths: [path.join(__dirname, '../pareto_liana/node_modules')],
        outfile: output,
        bundle: true,
        platform: 'node',
        format: 'cjs',
        logLevel: 'error',
    })
    process.stdout.write(execFileSync(process.execPath, [output, path.resolve(schema)], { encoding: 'utf8' }))
} finally {
    rmSync(temporary, { recursive: true, force: true })
}
