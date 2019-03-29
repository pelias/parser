class BaseClassifier {
  constructor () {
    this.results = []
    this.setup()
  }

  // you override this function in your classifier
  // each(span) {}

  // you should provide this function in your subclass
  // classify(tokenizer) {}

  // you may optionally provide this function in your subclass
  setup () {}

  // add a new classification
  add (classification) {
    this.results.push(classification)
  }
}

module.exports = BaseClassifier
