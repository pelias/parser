const removeAccents = require('remove-accents')

function normalizer (options = {}) {
  return (value) => {
    value = value.trim()
    if (options.lowercase) {
      value = value.toLowerCase()
    }
    if (options.removeAccents) {
      value = removeAccents(value)
    }
    if (options.removeHyphen) {
      value = value.replace(/-/g, ' ')
    }
    if (options.removeSpaces) {
      value = value.replace(/ /g, '')
    }
    return value
  }
}

module.exports = normalizer
