const BaseClassifier = require('./super/BaseClassifier')
const EndTokenClassification = require('../classification/EndTokenClassification')
const EndTokenSingleCharacterClassification = require('../classification/EndTokenSingleCharacterClassification')
const StartTokenClassification = require('../classification/StartTokenClassification')

// classify the final token with 'EndTokenClassification'
// and the first token with 'SartTokenClassification'
// and also a 'EndTokenSingleCharacterClassification' if its only
// a single character in length.
// note: this can be useful for improving autocomplete.
// note: in the case of a single token then the span will be
// classified with more than one classification (can be both start & end).

class TokenPositionClassifier extends BaseClassifier {
  classify (tokenizer) {
    if (tokenizer.section.length < 1) { return }

    // start token
    let firstSection = tokenizer.section[0]
    let firstSectionChildren = firstSection.graph.findAll('child')
    if (firstSectionChildren.length > 0) {
      firstSectionChildren.filter(s => !s.graph.findOne('prev')).forEach(firstChild => {
        firstChild.classify(new StartTokenClassification(1.0))
      })
    }

    // end token
    let lastSection = tokenizer.section[tokenizer.section.length - 1]
    let lastSectionChildren = lastSection.graph.findAll('child')
    if (lastSectionChildren.length > 0) {
      lastSectionChildren.filter(s => !s.graph.findOne('next')).forEach(lastChild => {
        lastChild.classify(new EndTokenClassification(1.0))
        if (lastChild.norm.length === 1) {
          lastChild.classify(new EndTokenSingleCharacterClassification(1.0))
        }
      })
    }
  }
}

module.exports = TokenPositionClassifier
