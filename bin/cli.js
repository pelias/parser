const input = process.argv.slice(2).join(' ')
const DebugOutputBuilder = require('../debug/DebugOutputBuilder')

process.stdout.write(
  new DebugOutputBuilder().parse(input).toString()
)
