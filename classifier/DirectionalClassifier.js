const WordClassifier = require('../classification/WordClassifier')
const Classification = require('../classification/Classification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

// const languages = libpostal.languages

// optionally control which languages are included
// note: reducing the languages will have a considerable performance benefit
const languages = ['en', 'es', 'de', 'fr']

class DirectionalClassifier extends WordClassifier {
  setup () {
    this.index = {}
    libpostal.load(this.index, languages, 'directionals.txt')
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      this.add(new Classification(span, Classification.DIRECTIONAL, 1))

    // try again for abbreviations denoted by a period such as 'n.'
    } else if (span.norm.slice(-1) === '.' && this.index.hasOwnProperty(span.norm.slice(0, -1))) {
      this.add(new Classification(span, Classification.DIRECTIONAL, 1))
    }
  }
}

module.exports = DirectionalClassifier
