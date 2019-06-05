const PhraseClassifier = require('./super/PhraseClassifier')
const IntersectionClassification = require('../classification/IntersectionClassification')
// const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

// const languages = libpostal.languages

class IntersectionClassifier extends PhraseClassifier {
  setup () {
    this.index = {}

    // remove single characters but keep some punctuation
    // let options = { replace: [/^[^&@]{1}$/, ''] }
    // libpostal.load(this.index, languages, 'cross_streets.txt', options)

    // blacklist
    // delete this.index.corner

    this.index['&'] = true
    this.index.and = true
    this.index.und = true
    this.index['@'] = true
    this.index.at = true
    this.index.con = true
    this.index['an der ecke von'] = true
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // do not classify tokens with tokens missing before or afterwards
    let firstChild = span.graph.findOne('child:first') || span
    let prev = firstChild.graph.findOne('prev')
    let next = firstChild.graph.findOne('next')
    if (!prev || !next) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      // classify phrase
      span.classify(new IntersectionClassification(1))

      // classify child spans
      span.graph.findAll('child').forEach(c => c.classify(new IntersectionClassification(1)))
    }
  }
}

module.exports = IntersectionClassifier
