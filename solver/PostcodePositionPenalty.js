const BaseSolver = require('./super/BaseSolver')
const HouseNumberClassification = require('../classification/HouseNumberClassification')
const PostcodeClassification = require('../classification/PostcodeClassification')
const StreetClassification = require('../classification/StreetClassification')
const basePenalty = 0.1

/**
 * PostcodePositionPenalty applies a penalty to solutions where the postcode
 * may have recieved a high score but doesn't commonly occur in this pattern.
 *
 * eg. rua godinho de faria 1200
 */

class PostcodePositionPenalty extends BaseSolver {
  solve (tokenizer) {
    tokenizer.solution.forEach(s => {
      // Do nothing if the solution doesn't have a postcode classification
      const postcode = s.pair.find(p => p.classification.constructor === PostcodeClassification)
      if (!postcode) { return }

      // Do nothing if the solution has a housenumber classification
      const housenumber = s.pair.find(p => p.classification.constructor === HouseNumberClassification)
      if (housenumber) { return }

      // Do nothing for solutions with either none or 2+ street classifications (intersections)
      const streetCount = s.pair.filter(p => p.classification.constructor === StreetClassification).length
      if (streetCount === 0 || streetCount >= 2) { return }

      // apply a small penalty
      s.penalty += basePenalty
    })
  }
}

module.exports = PostcodePositionPenalty
