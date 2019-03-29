const WordClassifier = require('../../classification/WordClassifier')
const Classification = require('../../classification/Classification')

class OrdinalClassifier extends WordClassifier {
  each(span) {
    // skip spans which do not contain numbers
    if( !span.contains.numerals ){ return }

    // use negative lookbehind to find numbers ending with ordinal suffix
    // @todo: add non-english ordinal suffixes
    if( /(?<=[0-9])(?:st|nd|rd|th)/.test( span.norm ) ){
      this.add( new Classification(span, Classification.ORDINAL, 1) )
    }
  }
}

module.exports = OrdinalClassifier