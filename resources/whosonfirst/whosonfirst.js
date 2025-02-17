const pelias = require('../pelias/pelias')

function load (set, placetypes, filenames, options) {
  const wofdict = require('./_dictionaries')
  const add = _add(set, options)
  const remove = _remove(set, options)
  const keys = filenames.map(p => p.replace('.txt', ''))

  placetypes.forEach(placetype => {
    keys.forEach(key => {
      wofdict[placetype][key].forEach(add)
    })
  }, this)

  placetypes.forEach(placetype => {
    for (const key of keys) {
      pelias.load(['whosonfirst', placetype, key], add, remove)
    }
  })

  // TODO: Not sure how this could ever be anything besides a no-op
  // placetypes.forEach(placetype => {
  //   custom.load({ directory: path.join('whosonfirst', placetype), filenames: filenames }, add, remove)
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
  if (options && options.normalizer && typeof options.normalizer === 'function') {
    value = options.normalizer(value)
  }
  return value
}

function _add (set, options) {
  return cell => {
    const value = _normalize(cell, options)
    if (value && value.length) {
      set.add(value)
    }
  }
}

function _remove (set, options) {
  return cell => {
    const value = _normalize(cell, options)
    if (value && value.length) {
      set.delete(value)
    }
  }
}

module.exports.load = load
