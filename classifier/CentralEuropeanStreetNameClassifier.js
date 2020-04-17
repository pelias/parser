const _ = require('lodash')
const SectionClassifier = require('./super/SectionClassifier')
const StreetClassification = require('../classification/StreetClassification')

/**
 * Classifier which attempts to classify street names with no suffix or prefix
 * when accompanied by a housenumber in the same section.
 *
 * see: https://github.com/pelias/parser/issues/83
 */

class CentralEuropeanStreetNameClassifier extends SectionClassifier {
  each (section) {
    // there must be excactly two childen in this section
    // note: we may wish to relax/expand on this later
    if (section.graph.length('child') !== 2) { return }

    // get first and last child
    let children = section.graph.findAll('child')
    let first = _.first(children)
    let last = _.last(children)

    // section must end with a HouseNumberClassification
    if (!last.classifications.hasOwnProperty('HouseNumberClassification')) { return }

    // other elements cannot contain any public classifications
    if (_.some(first.classifications, (c) => c.public)) { return }

    // assume the first token is a street name
    first.classify(new StreetClassification(0.5))
  }
}

module.exports = CentralEuropeanStreetNameClassifier
