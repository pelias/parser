const PhraseClassifier = require('./super/PhraseClassifier');
const PersonClassification = require('../classification/PersonClassification');
const libpostal = require('../resources/libpostal/libpostal');

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class PersonClassifier extends PhraseClassifier {
  setup() {
    this.index = {};
    libpostal.load(this.index, ['all', 'fr'], 'people.txt', {
      lowercase: true,
    });
  }

  each(span) {
    // skip spans which contain numbers
    if (span.contains.numerals) {
      return;
    }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      span.classify(new PersonClassification(1));
    }
  }
}

module.exports = PersonClassifier;
