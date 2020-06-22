const input = process.argv.slice(2).join(' ')
const DebugParser = require('../debug/DebugParser')

process.stdout.write(
  new DebugParser().parse(input).toString()
)
