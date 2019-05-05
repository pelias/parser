class Parser {
  constructor (classifiers, solvers, options) {
    this.classifiers = classifiers
    this.solvers = solvers
    this.options = (typeof options === 'object') ? options : {}

    // default options
    if (typeof this.options.max_solutions !== 'number') { this.options.max_solutions = 10 }
  }

  // run all classifiers
  // returns timing information
  classify (tokenizer) {
    let start = new Date()
    this.classifiers.forEach(c => c.classify(tokenizer))
    return new Date() - start
  }

  // run all solvers
  // returns timing information
  solve (tokenizer) {
    let start = new Date()
    this.solvers.forEach(s => {
      this.scoreAndSort(tokenizer)

      // run solver
      s.solve(tokenizer)
    }, this)

    this.scoreAndSort(tokenizer)
    return new Date() - start
  }

  scoreAndSort (tokenizer) {
    // recompute scores
    tokenizer.solution.forEach(s => s.computeScore(tokenizer))

    // sort pairs by span start
    tokenizer.solution.forEach(s => s.pair.sort((a, b) => a.span.start - b.span.start))

    // sort results by score desc
    tokenizer.solution.sort(this.comparitor)

    // ensure that no more than $MAX_SOLUTIONS are retained
    if (tokenizer.solution.length > this.options.max_solutions) {
      tokenizer.solution = tokenizer.solution.slice(0, this.options.max_solutions)
    }
  }

  // comparitor function used to compare solutions for sorting
  // @todo: possibly move the admin penalty scoring to another file
  comparitor (a, b) {
    // if scores are equal then enforce a slight penalty for administrative ordering
    if (b.score === a.score) {
      let areas = {
        a: a.pair.filter(p => p.span.classifications.hasOwnProperty('AreaClassification')),
        b: b.pair.filter(p => p.span.classifications.hasOwnProperty('AreaClassification'))
      }
      let classification = {
        a: (areas.a.length ? areas.a[0].classification.constructor.name : ''),
        b: (areas.b.length ? areas.b[0].classification.constructor.name : '')
      }

      if (classification.a === 'LocalityClassification') { return -1 }
      if (classification.b === 'LocalityClassification') { return +1 }
      if (classification.a === 'RegionClassification') { return -1 }
      if (classification.b === 'RegionClassification') { return +1 }
      if (classification.a === 'CountryClassification') { return -1 }
      if (classification.b === 'CountryClassification') { return +1 }
    }

    // sort results by score desc
    return b.score - a.score
  }
}

module.exports = Parser
