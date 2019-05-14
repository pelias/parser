const PhraseClassifier = require('./super/PhraseClassifier')
const PersonalTitleClassification = require('../classification/PersonalTitleClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class PersonalTitleClassifier extends PhraseClassifier {
  setup () {
    this.index = {}
    libpostal.load(this.index, libpostal.languages, 'personal_titles.txt', {
      replace: [/\.$/, ''],
      minlength: 2
    })
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm.replace(/\.$/, ''))) {
      span.classify(new PersonalTitleClassification(1))
    }
  }
}

module.exports = PersonalTitleClassifier
