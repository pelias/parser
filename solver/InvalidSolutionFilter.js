/**
 * enforce that certain combinations of classifications
 * dont logically make sense are removed.
 *
 * eg. remove solutions which are only 'housenumber+locality'
 *
 * if a solution EXACTLY matching a $pattern then it will be removed.
 */
class InvalidSolutionFilter {
  constructor (patterns) {
    this.patterns = (Array.isArray(patterns) ? patterns : [])
    this.patterns.map(p => p.sort()) // sort alphabetically
  }
  solve (tokenizer) {
    tokenizer.solution = tokenizer.solution.filter(s => {
      // sort alphabetically
      let classifications = s.pair.map(p => p.classification.constructor.name).sort()
      return !this.patterns.some(p => {
        if (classifications.length !== p.length) { return false }
        return classifications.every((_, i) => classifications[i] === p[i])
      })
    }, this)
  }
}

module.exports = InvalidSolutionFilter
