/**
 * FST - Finite-state transducer data structure
 *
 * A graph structure which is very efficient for querying prefix (or suffix) matches.
 *
 * see: https://www.elastic.co/blog/you-complete-me
 */

const Graph = require('./Graph')
const ETX = String.fromCharCode(3) // end-of-text

class FST {
  constructor () {
    this.head = new Graph()
    this.tail = new Graph()
  }

  // add a new token to the index
  add (token) {
    if (this.has(token)) { return }
    this._index(this._split(token))
  }

  // remove token from index
  delete (token) {
    this._deindex(this._split(token))
  }

  // index contains token
  has (token) {
    let node = this._walk(this.head, '>', this._split(token))
    return !!node && !!node.length(`>${ETX}`)
  }

  // index contains a token with this prefix
  hasPrefix (prefix) {
    let node = this._walk(this.head, '>', this._split(prefix))
    return !!node && (!node.findOne(`>${ETX}`) || node.findOne('_meta')['>count'] > 1)
  }

  // index contains a token with this suffix
  hasSuffix (suffix) {
    let node = this._walk(this.tail, '<', this._split(suffix).reverse())
    return !!node && (!node.findOne(`<${ETX}`) || node.findOne('_meta')['<count'] > 1)
  }

  // split token in to characters
  _split (token) { return (token || '').split('') }

  // walk the graph & return the last node
  _walk (parent, direction, chars, create, each) {
    let DIR = (direction === '<') ? '<' : '>'
    let END = (DIR === '<') ? this.head : this.tail
    let LAST = (chars.length - 1)
    for (let i = 0; i < chars.length; i++) {
      let child = parent.findOne(`${DIR}${chars[i]}`)
      if (create === true) {
        // create new graph node
        if (!child) {
          child = new Graph()
          child.add('_meta', { '>count': 0, '<count': 0 })
          parent.add(`${DIR}${chars[i]}`, child)
        }

        // update count
        child.findOne('_meta')[`${DIR}count`]++

        // create final edge
        if (i === LAST && !child.length(`${DIR}${ETX}`)) {
          child.add(`${DIR}${ETX}`, END)
        }
      }
      if (!child) { return child }
      if (typeof each === 'function') {
        each(child, parent, chars[i])
      }
      parent = child
    }

    return parent
  }

  /**
   * dump FST to stderr, eg:
   * [3] >e>x
   * [3] >e>x>a
   * [2] >e>x>a>m
   * [2] >e>x>a>m>p
   * [2] >e>x>a>m>p>l
   * [2] >e>x>a>m>p>l>e
   * [2] >e>x>a>m>p>l>e>s
   * [3] >e>x>c
   * [1] >e>x>c>e
   * [1] >e>x>c>e>s
   * [1] >e>x>c>e>s>s
   */
  print (node, direction) {
    this._recurse(node, direction, (path, count) => {
      console.error(`[${count}] ${path}`)
    })
  }

  _recurse (node, direction, each, prefix) {
    if (!direction) { direction = '>' }
    if (!prefix) { prefix = '' }
    for (let key in node.edges) {
      if (key[0] !== direction) { continue }
      if (!node.length(key)) { continue }
      if (node !== this.head && node !== this.tail) {
        let count = node.findOne('_meta')[`${direction}count`]
        each(prefix, count)
      } else if (prefix.length > 0) { return }
      this._recurse(node.findOne(key), direction, each, prefix + key)
    }
  }

  // walk the graph & add characters to graph
  _index (chars) {
    this._walk(this.head, '>', chars, true)
    this._walk(this.tail, '<', chars.reverse(), true)
  }

  // walk the graph & remove characters from graph
  _deindex (chars) {
    // left-to-right
    let node = this._walk(this.head, '>', chars)
    if (node && node.remove(`>${ETX}`, this.tail)) {
      this._walk(this.head, '>', chars, false, (child, parent, char) => {
        let meta = child.findOne('_meta')
        if (meta && --meta['>count'] < 1) {
          parent.remove(`>${char}`, child)
        }
      })
    }

    // right-to-left
    let reversed = chars.slice().reverse()
    node = this._walk(this.tail, '<', reversed)
    if (node && node.remove(`<${ETX}`, this.head)) {
      this._walk(this.tail, '<', reversed, false, (child, parent, char) => {
        let meta = child.findOne('_meta')
        if (meta && --meta['<count'] < 1) {
          parent.remove(`<${char}`, child)
        }
      })
    }
  }
}

module.exports = FST
