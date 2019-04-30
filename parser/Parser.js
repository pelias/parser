class Parser {
  constructor (classifiers, solvers) {
    this.classifiers = classifiers
    this.solvers = solvers
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

    // sort results by score desc
    tokenizer.solution.sort((a, b) => b.score - a.score)

    // sort by span start
    tokenizer.solution.forEach(s => s.pair.sort((a, b) => a.span.start - b.span.start))
  }
}

module.exports = Parser
