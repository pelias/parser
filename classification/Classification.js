class Classification {
  constructor (confidence, meta) {
    this.label = 'UNKNOWN'
    this.confidence = confidence || 1.0
    this.meta = meta || {}
  }
}

module.exports = Classification
