const Classification = require('../classification/Classification')

class NumericClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'numeric'
  }
}

module.exports = NumericClassification
