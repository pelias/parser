const BaseClassifier = require('./super/BaseClassifier')
const FinalTokenClassification = require('../classification/FinalTokenClassification')
const FinalTokenSingleCharacterClassification = require('../classification/FinalTokenSingleCharacterClassification')

// classify the final token with 'FinalTokenClassification'
// and also a 'FinalTokenSingleCharacterClassification' if its only
// a single character in length.
// note: this can be useful for improving autocomplete.

class FinalTokenClassifier extends BaseClassifier {
  classify (tokenizer) {
    if (tokenizer.section.length < 1) { return }
    let lastSection = tokenizer.section[tokenizer.section.length - 1]
    let children = lastSection.graph.findAll('child')
    if (children.length < 1) { return }
    let lastChild = children[children.length - 1]
    lastChild.classify(new FinalTokenClassification(1.0))
    if (lastChild.norm.length === 1) {
      lastChild.classify(new FinalTokenSingleCharacterClassification(1.0))
    }
  }
}

module.exports = FinalTokenClassifier
