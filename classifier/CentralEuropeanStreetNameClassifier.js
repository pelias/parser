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
    // there must at least two childen in this section
    if (section.graph.length('child') < 2) { return }

    // get first and last child
    let children = section.graph.findAll('child')
    let first = _.first(children)
    let next = first.graph.findOne('next')

    // section must end with a HouseNumberClassification
    if (!next) { return } // no next span found
    if (next.graph.findOne('next')) { return } // next span is NOT the final span in the section
    if (!next.classifications.hasOwnProperty('HouseNumberClassification')) { return }

    // other elements cannot contain any public classifications
    if (_.some(first.classifications, (c) => c.public)) { return }

    // optionally check parent phrases too?
    // if (_.some(first.graph.findAll('parent'), (p) => {
    //   if (p.norm !== first.norm) { return false }
    //   return _.some(p.classifications, (c) => c.public)
    // })) { return }

    // assume the first token is a street name
    first.classify(new StreetClassification(0.5))
  }
}

module.exports = CentralEuropeanStreetNameClassifier
