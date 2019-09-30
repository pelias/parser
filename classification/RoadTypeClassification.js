const Classification = require('./Classification')

class RoadTypeClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'road_type'
  }
}

module.exports = RoadTypeClassification
