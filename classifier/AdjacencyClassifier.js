const SectionClassifier = require('./super/SectionClassifier')
const AdjacentClassification = require('../classification/AdjacentClassification')

// find three adjacent words
// {housenumber} {street} {street_suffix}
// @todo: expand the scheme internationally and make this
// functionality more generic

class AdjacencyClassifier extends SectionClassifier {
  each (section, utils) {
    section.child.forEach((_, cc) => {
      // skip last two elements
      if (cc >= section.child.length - 2) { return }

      if (
        (
          section.child[cc + 0].classifications.hasOwnProperty('HouseNumberClassification')
        ) &&
        (
          section.child[cc + 1].classifications.hasOwnProperty('StreetClassification') ||
          utils.findPermutationsContaining(section.child[cc + 1]).some(
            p => p.classifications.hasOwnProperty('StreetClassification')
          )
        ) &&
        (
          section.child[cc + 2].classifications.hasOwnProperty('StreetSuffixClassification')
        )
      ) {
        // every child must be part of the set above
        // and must not omit any children
        let matches = section.permutation.filter(p => {
          return (
            p.child.length === 3 &&
            p.child[cc + 0] === section.child[cc + 0] &&
            p.child[cc + 1] === section.child[cc + 1] &&
            p.child[cc + 2] === section.child[cc + 2]
          )
        })

        if (matches.length) {
          // classify all matches
          matches.forEach(m => m.classify(new AdjacentClassification(1.0)))
        }
      }
    }, this)
  }
}

module.exports = AdjacencyClassifier
