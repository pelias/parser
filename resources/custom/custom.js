const fs = require('fs')
const path = require('path')
const dictPath = path.join(__dirname, `./dictionaries`)

function load (filename, add, remove) {
  let filepath = path.join(dictPath, filename)
  if (!fs.existsSync(filepath)) { return }
  let dict = fs.readFileSync(filepath, 'utf8')
  dict.split('\n').forEach(row => {
    if (row.trim().startsWith('#')) {
      // Do nothing, this is a comment
    } else if (row.startsWith('!')) {
      row.substring(1).split('|').forEach(remove)
    } else {
      row.split('|').forEach(add)
    }
  })
}

module.exports.load = load
