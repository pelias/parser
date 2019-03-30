const Classification = require('../classification/Classification')

class AlphaClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'alpha'
  }
}

module.exports = AlphaClassification
