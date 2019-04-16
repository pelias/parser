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
    return this.edges[relationship].length !== len
  }

  findAll (relationship) {
    if (!this.edges[relationship]) { return [] }
    return this.edges[relationship]
  }

  findOne (relationship) {
    if (!this.edges[relationship] || !this.edges[relationship].length) { return null }
    return this.edges[relationship][0]
  }
}

module.exports = Graph
