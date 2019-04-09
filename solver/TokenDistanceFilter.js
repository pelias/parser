const HashMapSolver = require('./super/HashMapSolver')

// enforce a maximum span distance between classifications
// eg. {housenumber} should not be more than n chars from {street}

const MAX_DISTANCE = 1

class TokenDistanceFilter extends HashMapSolver {
  solve (tokenizer) {
    tokenizer.solution = tokenizer.solution.filter(s => {
      let housenumber = s.pair.filter(p => p.classification.constructor.name === 'HouseNumberClassification')
      let street = s.pair.filter(p => p.classification.constructor.name === 'StreetClassification')

      if (housenumber.length > 0 && street.length > 0) {
        if (street[0].span.distance(housenumber[0].span) > MAX_DISTANCE) {
          return false
        }
      }

      return true
    })
  }
}

module.exports = TokenDistanceFilter
