const Span = require('./Span')
const split = require('./split')
const funcs = require('./split_funcs')
const permutate = require('./permutate')

class Tokenizer {
  constructor (s) {
    this.span = new Span(s)
    this.segment()
    this.split()
    this.permute(0, 6)
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
      this.section[i].setPermutations(permutate(this.section[i].child, windowMin, windowMax))
    }
  }
}

module.exports = Tokenizer
