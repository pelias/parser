const Classification = require('./Classification')

class ToponymClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'toponym'
  }
}

module.exports = ToponymClassification
