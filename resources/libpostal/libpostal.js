const _ = require('lodash')
const pluralize = require('pluralize')
const pelias = require('../pelias/pelias')
const libpostaldict = require('./_dictionaries')
const allLanguages = Object.keys(libpostaldict)

function load (index, langs, filename, options) {
  const add = _add(index, options)
  const remove = _remove(index, options)
  const key = filename.replace('.txt', '')

  // Load libpostal/dictionaries
  langs.forEach(lang => {
    let dict = libpostaldict[lang][key]
    if (dict === undefined) { return }
    dict.split('\n').forEach(row => {
      row.split('|').forEach(add.bind(null, lang))
    }, this)
  }, this)

  // Load pelias/dictionaries/libostal
  langs.forEach(lang => {
    pelias.load(['libpostal', lang, key], add.bind(null, lang), remove)
  })

  // TODO: Not sure how this could ever be anything besides a no-op
  // langs.forEach(lang => {
  //   custom.load(path.join('libpostal', lang, filename), add.bind(null, lang), remove)
  // })
}

function _normalize (cell, options) {
  let value = cell.trim()
  if (options && options.replace) {
    value = value.replace(options.replace[0], options.replace[1])
  }
  if (options && options.minlength) {
    if (value.length < options.minlength) { return '' }
  }
  if (options && options.lowercase) {
    value = value.toLowerCase()
  }
  return value
}

function _add (index, options) {
  return (lang, cell) => {
    const value = _normalize(cell, options)
    if (value && value.length) {
      index[value] = index[value] || { langs: {} }
      index[value].langs[lang] = true
    }
  }
}

function _remove (index, options) {
  return cell => {
    const value = _normalize(cell, options)
    if (value && value.length) {
      delete index[value]
    }
  }
}

// This functionality is only currently available for English
// see: https://github.com/plurals/pluralize
// @todo: find similar libraries which cover other languages
function generatePlurals (index) {
  _.forEach(index, (i, cell) => {
    if (_.get(index[cell], 'langs.en', false)) {
      const plural = pluralize(cell)
      _.set(index, `${plural}.langs.en`, true)
    }
  })
}

module.exports.load = load
module.exports.languages = allLanguages
module.exports.generatePlurals = generatePlurals
