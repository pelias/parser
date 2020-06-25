const BaseClassifier = require('./super/BaseClassifier')
const UnitTypeClassification = require('../classification/UnitTypeClassification')
const UnitClassification = require('../classification/UnitClassification')
const libpostal = require('../resources/libpostal/libpostal')
const Span = require('../tokenization/Span')

const AllNumberRegex = /^\d+$/

class UnitTypeClassifier extends BaseClassifier {
  setup () {
    // load index tokens
    this.index = {}
    libpostal.load(this.index, ['en'], 'unit_types_numbered.txt')
  }
  classify (tokenizer) {
    for (let i = 0; i < tokenizer.section.length; i++) {
      let children = tokenizer.section[i].graph.findAll('child')
      for (let j = 0; j < children.length; j++) {
        this.each(children[j], tokenizer.section[i])
      }
    }
  }
  each (span, section) {
    // We are searching for spans like `U12` which means `Unit 12`
    // As well as spans like 'PHA' (penthouse A) or 'AptA'
    for (let unitToken in this.index) {
      if (span.body.length < unitToken.length) {
        continue
      }

      const startsWithThisToken = span.norm.substring(0, unitToken.length) === unitToken
      const endsWithNumbers = AllNumberRegex.test(span.norm.substring(unitToken.length))
      // Only let this test pass if the unitToken is longer than one character. Deciding "oa" is a
      // unit seems a little ridiculous
      const endsWithASingleCharacter =
        unitToken.length > 1 &&
        unitToken.length === span.body.length - 1

      // It's compound unit token if it starts with a unitToken from our index
      // and either ends with numbers, or a single character
      if (
        startsWithThisToken &&
        (endsWithNumbers || endsWithASingleCharacter)
      ) {
        const unitTypeBody = span.body.substring(0, unitToken.length)
        const unitBody = span.body.substring(unitToken.length)

        const unitType = new Span(unitTypeBody, span.start)
        const unit = new Span(unitBody, span.start + unitTypeBody.length)

        // We are creating two spans `{unit_type} {unit}`
        unitType.classify(new UnitTypeClassification(1.0))
        unitType.graph.add('next', unit)
        unit.classify(new UnitClassification(1.0))
        unit.graph.add('prev', unitType)

        span.graph.findAll('prev').forEach((prev) => unitType.graph.add('prev', prev))
        span.graph.findAll('next').forEach((next) => unit.graph.add('next', next))

        section.graph.add('child', unitType)
        section.graph.add('child', unit)
        return
      }
    }
  }
}

module.exports = UnitTypeClassifier
