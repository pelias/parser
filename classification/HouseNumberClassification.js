const Classification = require('./Classification')

class HouseNumberClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'housenumber'
  }
}

module.exports = HouseNumberClassification
