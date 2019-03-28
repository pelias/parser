class Span {
  constructor(body, start) {
    this.body = body || ''

    this.start = start || 0
    this.end = this.start + this.body.length

    this.child = []
    this.permutation = []
  }

  // return true if Span ranges overlap
  intersects(span) {
    return this.start < span.end && this.end > span.start
  }

  // set the child Spans for a subset of this Span
  setChildren(spans) {
    this.child = spans
    return this
  }

  // set permutations of the children of this Span
  setPermutations(perms) {
    this.permutation = perms
    return this
  }
}

module.exports = Span