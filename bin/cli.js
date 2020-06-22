const input = process.argv.slice(2).join(' ')
const DebugParser = require('./pretty')

new DebugParser(process.stdout.write.bind(process.stdout)).parse(input)
