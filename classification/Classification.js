class Classification {
  constructor (confidence, meta) {
    this.public = false // only public classifications appear in results
    this.label = 'unknown'
    this.confidence = confidence || 1.0
    this.meta = meta || {}
  }
}

module.exports = Classification
