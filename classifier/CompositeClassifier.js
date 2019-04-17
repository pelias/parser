const SectionClassifier = require('./super/SectionClassifier')

// @todo: scheme.scheme is a confusing API

// compute cartesian product of arrays
// https://stackoverflow.com/a/43053803
const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))))
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a)

class CompositeClassifier extends SectionClassifier {
  constructor (schemes) {
    super()
    this.schemes = schemes || []
  }

  match (scheme, phrase) {
    let children = phrase.graph.findAll('child')

    // 'scheme.is' is a required property
    if (!Array.isArray(scheme.is)) { return false }

    // phrase doesn't include at least one of the target classifications
    if (!scheme.is.some(cl => phrase.classifications.hasOwnProperty(cl))) {
      // this is a multi-word phrase
      if (children.length !== 1) { return false }
      // this is a single-word phrase, also check the classification of its single child
      if (!scheme.is.some(cl => children[0].classifications.hasOwnProperty(cl))) {
        return false
      }
    }

    // 'scheme.not' is an optional property
    if (!Array.isArray(scheme.not)) { return true }

    // phrase does include at least one of the target classifications
    if (scheme.not.some(cl => phrase.classifications.hasOwnProperty(cl))) {
      return false
    }

    // this is a single-word phrase, check the classification of it's single child
    if (children.length === 1) {
      if (scheme.not.some(cl => children[0].classifications.hasOwnProperty(cl))) {
        return false
      }
    }

    return true
  }

  each (section) {
    this.schemes.forEach(s => {
      // invalid scheme
      if (!Array.isArray(s.scheme)) { return }

      // list of candidate matches for each scheme
      let candidates = []

      // compute candidate lists
      let phrases = section.graph.findAll('phrase')
      candidates = s.scheme.map(s => phrases.filter(this.match.bind(null, s)))

      // no candidates were found for one or more schemes
      if (candidates.some(c => c.length === 0)) { return }

      // compute composites (each with candidates of the same length as s.scheme)
      let composites = cartesian(...candidates)

      // remove any overlapping composites
      composites = composites.filter(c => {
        for (let i = 0; i < c.length; i++) {
          let curr = c[i]
          let next = c[i + 1]
          let prev = c[i - 1]

          // enforce adjacency
          if (next && curr.graph.findOne('child:last').graph.findOne('next') !== next.graph.findOne('child:first')) {
            return false
          } else if (prev && curr.graph.findOne('child:first').graph.findOne('prev') !== prev.graph.findOne('child:last')) {
            return false
          }
        }
        return true
      })

      // found no matches
      if (!composites.length) { return }

      // optionally classify phrase
      if (typeof s.Class === 'function') {
        // find phrases which equal the composites
        let superPhrases = []
        composites.forEach(c => {
          let start = c[0].start
          let end = c[c.length - 1].end
          superPhrases = superPhrases.concat(phrases.filter(p => p.start === start && p.end === end))
        })

        // classify each super phrase
        superPhrases.forEach(p => p.classify(new s.Class(s.confidence)))

        // optionally classify individual phrases
        composites.forEach(c => {
          s.scheme.forEach((sch, i) => {
            if (typeof sch.Class === 'function') {
              c[i].classify(new sch.Class(sch.confidence))
            }
          })
        })
      }
    })
  }
}

module.exports = CompositeClassifier
