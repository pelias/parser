const WordClassifier = require('../../classification/WordClassifier')
const Classification = require('../../classification/Classification')

// copied from: https://github.com/mapbox/carmen/blob/5489f0e67a4f31280ae1b9d091952c97280b83e7/lib/text-processing/termops.js#L269-L290

class HouseNumberClassifier extends WordClassifier {
  each(span) {
    // skip spans which do not contain numbers
    if( !span.contains.numerals ){ return }

    if(
        /^\d{1,5}[a-z]?$/.test(span.body) || // 10 or 10a Style
        /^(\d{1,5})-(\d{1,5})[a-z]?$/.test(span.body) || // 10-19 or 10-19a Style
        /^(\d{1,5})([nsew])(\d{1,5})[a-z]?$/.test(span.body) || // 6N23 Style (ie Kane County, IL)
        /^([nesw])(\d{1,5})([nesw]\d{1,5})?$/.test(span.body) || // W350N5337 or N453 Style (ie Waukesha County, WI)
        /^\d{1,5}(к\d{1,5})?(с\d{1,5})?$/.test(span.body) // Russian style including korpus (cyrillic к) and stroenie (cyrillic с)
    ) {

      let confidence = 1

      // it's possible to have 5 digit housenumbers
      // but they are fairly uncommon
      if( /^\d{5}$/.test(span.norm) ){
        confidence = 0.2
      }

      this.add( new Classification( span, Classification.HOUSENUMBER, confidence ) )
    }
  }
}

module.exports = HouseNumberClassifier