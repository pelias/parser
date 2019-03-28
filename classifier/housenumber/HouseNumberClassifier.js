const Classifier = require('../../classification/Classifier')
const Classification = require('../../classification/Classification')

// copied from: https://github.com/mapbox/carmen/blob/5489f0e67a4f31280ae1b9d091952c97280b83e7/lib/text-processing/termops.js#L269-L290

class HouseNumberClassifier extends Classifier {
  each(span) {
    if (
        /^\d+[a-z]?$/.test(span.body) || // 10 or 10a Style
        /^(\d+)-(\d+)[a-z]?$/.test(span.body) || // 10-19 or 10-19a Style
        /^(\d+)([nsew])(\d+)[a-z]?$/.test(span.body) || // 6N23 Style (ie Kane County, IL)
        /^([nesw])(\d+)([nesw]\d+)?$/.test(span.body) || // W350N5337 or N453 Style (ie Waukesha County, WI)
        /^\d+(к\d+)?(с\d+)?$/.test(span.body) // Russian style including korpus (cyrillic к) and stroenie (cyrillic с)
    ) {
      this.results.push( new Classification( span, 'HOUSENUMBER', 1 ) )
    }
  }
}

module.exports = HouseNumberClassifier