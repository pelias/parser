const Span = require('./Span')
const split = require('./split')
const funcs = require('./split_funcs')
const permutate = require('./permutate')

class Tokenizer {
  constructor (s) {
    this.span = new Span(s)
    this.segment()
    this.split()
    this.computeCoverage()
    this.permute(0, 10)
    this.solution = []
  }

  segment () {
    this.section = split(this.span, funcs.fieldsFuncBoundary)
  }

  split () {
    for (let i = 0; i < this.section.length; i++) {
      this.section[i].setChildren(split(this.section[i], funcs.fieldsFuncWhiteSpace))
    }
  }

  permute (windowMin, windowMax) {
    for (let i = 0; i < this.section.length; i++) {
      this.section[i].setPermutations(
        permutate(this.section[i].graph.findAll('child'), windowMin, windowMax)
      )
    }
  }

  computeCoverage () {
    this.coverage = 0
    this.section.forEach(s => {
      this.coverage += s.graph.findAll('child').reduce(
        (sum, cur) => sum + cur.end - cur.start, 0
      )
    }, this)
  }
}

module.exports = Tokenizer
