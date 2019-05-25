class FillSolver {
  solve (tokenizer) {
    tokenizer.solution.forEach(solution => {
      // Get streets from this solution
      const streets = solution.pair.filter(p => p.classification.constructor.name === 'StreetClassification')
      // Get all nodes that are not in the solution
      const missings = tokenizer.section[0].graph.edges.child.filter(c => !solution.pair.some(p => p.span.intersects(c)))

      missings.forEach(missing => {
        const street = streets.find(s => s.span.end === missing.start - 1)
        const prefix = street && street.span.graph.findOne('child:first')
        if (prefix && prefix.classifications.StreetPrefixClassification) {
          street.span.setBody(`${street.span.body} ${missing.body}`)
          street.span.graph.add('child', missing)
          street.span.graph.remove('child:last', street.span.graph.findOne('child:last'))
          street.span.graph.add('child:last', missing)
        }
      })
    })
  }
}

module.exports = FillSolver
