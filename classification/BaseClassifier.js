class BaseClassifier {
  constructor() {
    this.results = []
  }

  // you override this function in your classifier
  // each(span) {}

  // you should provide this function in your subclass
  // classify(tokenizer) {}

  // add a new classification
  add( classification ){
    this.results.push( classification )
  }
}

module.exports = BaseClassifier