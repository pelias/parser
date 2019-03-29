class Classification {
  constructor (confidence, meta) {
    this.label = 'unknown'
    this.confidence = confidence || 1.0
    this.meta = meta || {}
  }
}

module.exports = Classification
