class Graph {
  constructor () {
    this.edges = {}
  }

  add (relationship, node) {
    if (!this.edges[relationship]) { this.edges[relationship] = [] }
    if (!this.edges[relationship].includes(node)) {
      this.edges[relationship].push(node)
      return true
    }
    return false
  }

  remove (relationship, node) {
    if (!this.edges[relationship]) { return false }
    let len = this.edges[relationship].length
    this.edges[relationship] = this.edges[relationship].filter(n => n !== node)
    if (!this.edges[relationship].length) {
      delete this.edges[relationship]
      return true
    }
    return this.edges[relationship].length !== len
  }

  length (relationship) {
    if (!this.edges[relationship]) { return 0 }
    return this.edges[relationship].length
  }

  findAll (relationship) {
    if (this.length(relationship) < 1) { return [] }
    return this.edges[relationship]
  }

  findOne (relationship) {
    if (this.length(relationship) < 1) { return null }
    return this.edges[relationship][0]
  }

  some (relationship, func) {
    if (this.length(relationship) < 1) { return false }
    return this.edges[relationship].some(func)
  }

  every (relationship, func) {
    if (this.length(relationship) < 1) { return false }
    return this.edges[relationship].every(func)
  }
}

module.exports = Graph
