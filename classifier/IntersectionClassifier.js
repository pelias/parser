const PermutationClassifier = require('./super/PermutationClassifier')
const IntersectionClassification = require('../classification/IntersectionClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

const languages = libpostal.languages

class IntersectionClassifier extends PermutationClassifier {
  setup () {
    this.index = {}
    libpostal.load(this.index, languages, 'cross_streets.txt')
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      // classify permutation
      span.classify(new IntersectionClassification(1))

      // classify child spans
      span.graph.findAll('child').forEach(c => c.classify(new IntersectionClassification(1)))
    }
  }
}

module.exports = IntersectionClassifier
