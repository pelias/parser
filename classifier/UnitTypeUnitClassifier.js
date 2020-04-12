const BaseClassifier = require('./super/BaseClassifier')
const UnitTypeClassification = require('../classification/UnitTypeClassification')
const UnitClassification = require('../classification/UnitClassification')
const libpostal = require('../resources/libpostal/libpostal')
const Span = require('../tokenization/Span')

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
    // skip spans whithout numbers
    if (!span.contains.numerals) { return }

    // We a searching spans like `U12` which means `Unit 12`
    for (let token in this.index) {
      if (span.body.length < token.length) { continue }

      // perf: https://gist.github.com/dai-shi/4950506
      if (span.norm.substring(0, token.length) === token && /^\d+$/.test(span.norm.substring(token.length))) {
        const unitTypeBody = span.body.substring(0, token.length)
        const unitBody = span.body.substring(token.length)

        const unitType = new Span(unitTypeBody, span.start)
        const unit = new Span(unitBody, span.start + unitTypeBody.length)

        // We are creating two spans `{unit_type} {unit}`
        unitType.classify(new UnitTypeClassification(1.0))
        unitType.graph.add('next', unit)
        unit.classify(new UnitClassification(1.0))
        unit.graph.add('prev', unitType)

        span.graph.findAll('prev').forEach(prev => unitType.graph.add('prev', prev))
        span.graph.findAll('next').forEach(next => unit.graph.add('next', next))

        section.graph.add('child', unitType)
        section.graph.add('child', unit)
        return
      }
    }
  }
}

module.exports = UnitTypeClassifier
