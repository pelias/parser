const Classification = require('./Classification')

class RoadNameClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'road_name'
  }
}

module.exports = RoadNameClassification
