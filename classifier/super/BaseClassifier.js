class BaseClassifier {
  constructor () {
    this.setup()
  }

  // you override this function in your classifier
  // each(span) {}

  // you should provide this function in your subclass
  // classify(tokenizer) {}

  // you may optionally provide this function in your subclass
  setup () {}
}

module.exports = BaseClassifier
