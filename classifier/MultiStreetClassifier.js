const SectionClassifier = require('./super/SectionClassifier')
const MultiStreetClassification = require('../classification/MultiStreetClassification')

class MultiStreetClassifier extends SectionClassifier {
  each (section, utils) {
    let children = {
      all: [],
      street: [],
      intersection: []
    }
    let lastOffset = 0

    // find a span of multiple children in this section
    // who are either classified as street or intersection /or
    // are part of a permutation classes as such
    section.child.forEach((c, o) => {
      if (
        c.classifications.hasOwnProperty('StreetClassification') ||
        utils.findPermutationsContaining(c).some(
          p => p.classifications.hasOwnProperty('StreetClassification')
        )
      ) {
        if (children.street.length === 0 || o === lastOffset + 1) {
          children.all.push(c)
          children.street.push(c)
          lastOffset = o
        }
      } else if (
        c.classifications.hasOwnProperty('IntersectionClassification') ||
        utils.findPermutationsContaining(c).some(
          p => p.classifications.hasOwnProperty('IntersectionClassification')
        )
      ) {
        if (children.intersection.length === 0 || o === lastOffset + 1) {
          children.all.push(c)
          children.intersection.push(c)
          lastOffset = o
        }
      }
    })

    // validate the child arrays
    if ((
      children.all.length < 3 ||
      children.intersection.length < 1 ||
      children.street.length < 2
    )) {
      return
    }

    // @todo: ensure that at least one IntersectionClassification exists

    let matches = section.permutation.map(p => {
      if (
        // every child must be part of the set above
        p.child.every(pc => children.all.includes(pc))
      ) {
        return p
      }
    })

    if (matches.length) {
      matches.sort((a, b) => {
        return (a.end - a.start) > (b.end - b.start)
      })

      // only classify the longest match
      matches[0].classify(new MultiStreetClassification(1.0))
    }
  }
}

module.exports = MultiStreetClassifier
