const SectionClassifier = require('./super/SectionClassifier')

// @todo: scheme.scheme is a confusing API
// @todo: support scheme.scheme with a single element

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
    let phrases = section.graph.findAll('phrase')

    // sort phrases so shorter phrases are matched first
    // note: this mutates the original array
    phrases.sort((a, b) => a.norm.length - b.norm.length)

    this.schemes.forEach(s => {
      // invalid scheme
      if (!Array.isArray(s.scheme)) { return }

      // list of candidate matches for each scheme
      let candidates = []

      // compute candidate lists
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
          if (next && !curr.graph.findOne('child:last').graph.some('next', s => s === next.graph.findOne('child:first'))) {
            return false
          } else if (prev && !curr.graph.findOne('child:first').graph.some('prev', s => s === prev.graph.findOne('child:last'))) {
            return false
          }

          // avoid adding tokens to the front of a street classification
          // that begins with a street prefix.
          // eg. 'A + Ave B' (ave is both a valid prefix & suffix)
          if (next && next.classifications.hasOwnProperty('StreetClassification')) {
            let firstChild = next.graph.findOne('child')
            if (firstChild && firstChild.classifications.hasOwnProperty('StreetPrefixClassification')) {
              return false
            }
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
          var carr = Array.isArray(c) ? c : [c] // cast to array
          let start = carr[0].start
          let end = carr[carr.length - 1].end
          superPhrases = superPhrases.concat(phrases.filter(p => p.start === start && p.end === end))
        })

        // classify each super phrase
        superPhrases.forEach(p => {
          // spread children langs to the parent
          const langs = p.graph.findAll('child').reduce((acc, s) => {
            Object.values(s.classifications)
              .filter(c => c.meta && c.meta.langs)
              .map(c => Object.keys(c.meta.langs))
              .forEach(lang => { acc[lang] = true })
            return acc
          }, {})
          p.classify(new s.Class(s.confidence, { langs }))
        })

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
