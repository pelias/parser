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
    this.solvers.forEach(s => s.solve(tokenizer))
    return new Date() - start
  }
}

module.exports = Parser
