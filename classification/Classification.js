class Classification {
  constructor(span, name, confidence, meta) {
    this.span = span
    this.name = name
    this.confidence = confidence
    this.meta = meta || {}
  }
}

module.exports = Classification