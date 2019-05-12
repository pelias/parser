const fs = require('fs')
const path = require('path')
const pelias = require('../pelias/pelias')
const dictPath = path.join(__dirname, `./dictionaries`)
const allLanguages = fs.readdirSync(dictPath).filter(p => !p.includes('.'))

function load (index, langs, filename, options) {
  const add = _add(index, options)
  const remove = _remove(index, options)

  langs.forEach(lang => {
    let filepath = path.join(dictPath, lang, filename)
    if (!fs.existsSync(filepath)) { return }
    let dict = fs.readFileSync(filepath, 'utf8')
    dict.split('\n').forEach(row => {
      row.split('|').forEach(add)
    }, this)
  }, this)

  langs.forEach(lang => {
    pelias.load(path.join('libpostal', lang, filename), add, remove)
  })
}

function _normalize (cell, options) {
  let value = cell.trim()
  if (options && options.replace) {
    value = value.replace(options.replace[0], options.replace[1])
  }
  if (options && options.lowercase) {
    value = value.toLowerCase()
  }
  return value
}

function _add (index, options) {
  return cell => {
    const value = _normalize(cell, options)
    index[value] = true
  }
}

function _remove (index, options) {
  return cell => {
    const value = _normalize(cell, options)
    delete index[value]
  }
}

module.exports.load = load
module.exports.languages = allLanguages
