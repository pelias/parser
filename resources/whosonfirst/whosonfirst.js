const fs = require('fs')
const path = require('path')
const dictPath = path.join(__dirname, `./dictionaries`)
const allPlacetypes = fs.readdirSync(dictPath).filter(p => !p.includes('.'))

function load (set, placetypes, filename, options) {
  placetypes.forEach(placetype => {
    let filepath = path.join(dictPath, placetype, filename)
    if (!fs.existsSync(filepath)) { return }
    let dict = fs.readFileSync(filepath, 'utf8')
    dict.split('\n').forEach(row => {
      row.split('|').forEach(cell => {
        let value = cell.trim()
        if (options && options.replace) {
          value = value.replace(options.replace[0], options.replace[1])
        }
        if (options && options.lowercase) {
          value = value.toLowerCase()
        }
        set.add(value)
      })
    }, this)
  }, this)
}

module.exports.load = load
module.exports.placetypes = allPlacetypes
