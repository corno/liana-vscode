const fs = require('node:fs')
const path = require('node:path')
const { prepare_native_schema } = require('./out')

const native_path = path.resolve(__dirname, '../../newstyle_projects/projects/liana/sketch/definition/schema.liana.lna')
const text = fs.readFileSync(native_path, 'utf8')
const schema = prepare_native_schema(text)
const directory = path.join(__dirname, '../liana_authoring_environment_template/.liana')
fs.mkdirSync(directory, { recursive: true })
for (const [filename, content] of [['schema.to_be_removed.slna', schema.syntax], ['schema.slna', text]]) {
    const destination = path.join(directory, filename)
    if (fs.existsSync(destination)) fs.chmodSync(destination, 0o644)
    fs.writeFileSync(destination, content)
    fs.chmodSync(destination, 0o444)
}
