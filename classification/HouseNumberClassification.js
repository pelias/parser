const Classification = require('./Classification')

class HouseNumberClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'HOUSENUMBER'
  }
}

module.exports = HouseNumberClassification
