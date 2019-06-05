const Classification = require('../classification/Classification')

class PunctuationClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'punctuation'
  }
}

module.exports = PunctuationClassification
