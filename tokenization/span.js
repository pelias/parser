class Span {
  constructor(body) {
    this.body = body || ''
    this.start = 0
    this.end = this.body.length
  }

  // return true if Span ranges overlap
  intersects(span) {
    return this.start < span.end && this.end > span.start
  }
}

module.exports = Span