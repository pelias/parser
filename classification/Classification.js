class Classification {
  constructor (confidence, meta) {
    this.public = false // only public classifications appear in results
    this.label = 'unknown'
    this.confidence = confidence || 1.0
    this.meta = meta || {}
  }

  equals (classification) {
    // @todo: compare meta?
    return (
      this.constructor.name === classification.constructor.name &&
      this.confidence === classification.confidence
    )
  }
}

module.exports = Classification
