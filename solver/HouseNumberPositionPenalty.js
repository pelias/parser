const BaseSolver = require('./super/BaseSolver')
const HouseNumberClassification = require('../classification/HouseNumberClassification')
const StreetClassification = require('../classification/StreetClassification')
const basePenalty = 0.05
// https://github.com/pelias/api/blob/master/middleware/localNamingConventions.js
const numberLastLangs = {
  'de': basePenalty,
  'sl': basePenalty,
  'pl': basePenalty,
  'bs': basePenalty,
  'hr': basePenalty,
  'nl': basePenalty,
  'cs': basePenalty,
  'da': basePenalty,
  'es': basePenalty / 2, // Guatemala & Honduras do not flip their house numbers
  'fi': basePenalty,
  'el': basePenalty,
  'is': basePenalty,
  'it': basePenalty,
  'nb': basePenalty,
  'pt': basePenalty,
  'sv': basePenalty,
  'sk': basePenalty,
  'tr': basePenalty,
  'ro': basePenalty,
  'hu': basePenalty
}
const numberFirstLangs = {
  'en': basePenalty,
  'fr': basePenalty / 2 // Switzerland and Andorre has some french streets
}

class HouseNumberPositionPenalty extends BaseSolver {
  solve (tokenizer) {
    tokenizer.solution.forEach(s => {
      const housenumber = s.pair.find(p => p.classification.constructor === HouseNumberClassification)
      const street = s.pair.find(p => p.classification.constructor === StreetClassification)

      // Do nothing if there is no street/housenumber or no meta in street classification
      if (!housenumber || !street || !street.classification.meta || !street.classification.meta.langs) { return }

      const langs = Object.keys(street.classification.meta.langs)

      // For now, we don't supports multi-lang entries
      if (langs.length !== 1 || langs[0] === 'all') { return }

      const lang = langs[0]

      // Check if the number should be in last position (after street) or first position (before street)
      if (numberLastLangs.hasOwnProperty(lang) && housenumber.span.start < street.span.start) {
        s.penalty += numberLastLangs[lang]
      } else if (numberFirstLangs.hasOwnProperty(lang) && street.span.start < housenumber.span.start) {
        s.penalty += numberFirstLangs[lang]
      }
    })
  }
}

module.exports = HouseNumberPositionPenalty
