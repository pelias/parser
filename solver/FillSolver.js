class FillSolver {
  solve (tokenizer) {
    tokenizer.solution.forEach(solution => {
      // Get streets from this solution
      const streets = solution.pair.filter(p => p.classification.constructor.name === 'StreetClassification')
      // Get all nodes that are not in the solution
      const missings = tokenizer.section.reduce((acc, section) => {
        return acc.concat(section.graph.findAll('child').filter(c => !solution.pair.some(p => p.span.intersects(c))))
      }, [])

      // For all missing spans, check if they are street prefix and complete the solution
      // The missing span should not be a end token
      missings.forEach(missing => {
        const street = streets.find(s => s.span.end === missing.start - 1)
        const prefix = street && street.span.graph.findOne('child:first')

        if (prefix && prefix.classifications.StreetPrefixClassification && !missing.classifications.EndTokenClassification) {
          const span = prefix.graph.findAll('parent').find(phrase => phrase.start === prefix.start && phrase.end === missing.end)
          const streetIndex = solution.pair.indexOf(street)
          if (span && streetIndex < solution.pair.length) {
            solution.pair[streetIndex].span = span
          }
        }
      })
    })
  }
}

module.exports = FillSolver
