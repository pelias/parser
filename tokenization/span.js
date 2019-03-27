class Span {
  constructor(body) {
    this.body = body || ''
    this.start = 0
    this.end = this.start + this.body.length
    this.child = []
  }

  // return true if Span ranges overlap
  intersects(span) {
    return this.start < span.end && this.end > span.start
  }

  setChildren(spans){
    this.child = spans
    return this
  }
}

module.exports = Span