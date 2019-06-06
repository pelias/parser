const Classification = require('./Classification')

class EndTokenClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'end_token'
  }
}

module.exports = EndTokenClassification
