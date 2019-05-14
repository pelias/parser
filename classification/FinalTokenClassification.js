const Classification = require('../classification/Classification')

class FinalTokenClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'final_token'
  }
}

module.exports = FinalTokenClassification
