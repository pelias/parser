const Classification = require('../classification/Classification')

class PersonalTitleClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'personal_title'
  }
}

module.exports = PersonalTitleClassification
