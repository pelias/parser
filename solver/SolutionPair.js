class SolutionPair {
  constructor (span, classification) {
    this.span = span
    this.classification = classification
  }

  equals (pair) {
    return (
      this.span === pair.span &&
      this.classification.equals(pair.classification)
    )
  }
}

module.exports = SolutionPair
