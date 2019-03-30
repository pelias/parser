const Classification = require('../classification/Classification')

class AlphaNumericClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'alphanumeric'
  }
}

module.exports = AlphaNumericClassification
