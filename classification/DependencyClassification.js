const Classification = require('./Classification')

class DependencyClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'dependency'
  }
}

module.exports = DependencyClassification
