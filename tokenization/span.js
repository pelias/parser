class Span {
  constructor(body, start) {
    this.start = start || 0
    this.setBody(body)

    this.child = []
    this.permutation = []
  }

  // update the token body
  setBody(body) {
    this.body = body || ''
    this.norm = this.body.toLowerCase() // normalized body
    this.end = this.start + this.body.length

    // convenience booleans to avoid computing these in every classifier
    this.contains = {
      numerals: /\d/.test( this.body ),
      final: {
        period: ( this.body.slice(-1) === '.' )
      }
    }
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