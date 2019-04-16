const Classification = require('../classification/Classification')

class PersonClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'person'
  }
}

module.exports = PersonClassification
