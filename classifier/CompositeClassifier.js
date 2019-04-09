const PermutationClassifier = require('./super/PermutationClassifier')

class CompositeClassifier extends PermutationClassifier {
  constructor (schemes) {
    super()
    this.schemes = schemes || []
  }

  each (span) {
    this.schemes.forEach(s => {
      // invalid scheme
      if (!Array.isArray(s.scheme)) { return }

      // permutation should contain same number
      // of children as scheme does
      if (span.child.length !== s.scheme.length) { return }

      // iterate over the scheme items and children
      // at the same time, comparing each
      for (let i = 0; i < s.scheme.length; i++) {
        let sch = s.scheme[i]
        let child = span.child[i]

        if (Array.isArray(sch.is)) {
          if (
            // child should include at least one of target classifications
            !sch.is.some(cl => child.classifications.hasOwnProperty(cl))
          ) { return }
        }

        if (Array.isArray(sch.not)) {
          if (
            // child should not include any target classifications
            sch.not.some(cl => child.classifications.hasOwnProperty(cl))
          ) { return }
        }
      }

      // optionally classify permutation
      if (typeof s.Class === 'function') {
        span.classify(new s.Class(s.confidence))
      }

      // optionally classify children
      s.scheme.forEach((sch, i) => {
        if (typeof sch.Class === 'function') {
          span.child[i].classify(new sch.Class(sch.confidence))
        }
      })
    })
  }
}

module.exports = CompositeClassifier
