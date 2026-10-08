const { buildSync } = require('esbuild')
const path = require('node:path')

buildSync({
    absWorkingDir: path.join(__dirname, '..'),
    entryPoints: ['native/index.ts'],
    outfile: 'native/out/index.js',
    bundle: true,
    platform: 'node',
    format: 'cjs',
    loader: { '.slna': 'text' },
    logLevel: 'warning',
})
