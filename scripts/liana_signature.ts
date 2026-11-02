import { readFileSync } from 'node:fs'
import { Inspect_Schema } from 'sealed-artifact'

const source = process.argv[2]
if (source === undefined) throw new Error('Expected the deployed Liana schema path')
const fail = (message: string): never => { throw new Error(message) }
process.stdout.write(Inspect_Schema(readFileSync(source, 'utf8'), fail)['body signature'])
