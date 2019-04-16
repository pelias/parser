const Classification = require('../classification/Classification')

class GivenNameClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'given_name'
  }
}

module.exports = GivenNameClassification
