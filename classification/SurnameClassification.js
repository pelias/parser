const Classification = require('../classification/Classification')

class SurnameClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'surname'
  }
}

module.exports = SurnameClassification
