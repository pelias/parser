const Graph = require('./Graph')

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor', (t) => {
    let graph = new Graph()
    t.deepEquals(graph.edges, {})
    t.end()
  })
}

module.exports.tests.add = (test) => {
  test('add', (t) => {
    let graph = new Graph()
    t.deepEquals(graph.edges, {})

    let node = new (class Example {})()

    // add node to 'foo'
    let ok1 = graph.add('foo', node)
    t.equal(graph.edges.foo.length, 1)
    t.true(ok1)

    // try to add same node to 'foo' again
    let ok2 = graph.add('foo', node)
    t.equal(graph.edges.foo.length, 1)
    t.false(ok2)

    // add node to 'bar'
    let ok3 = graph.add('bar', node)
    t.equal(graph.edges.bar.length, 1)
    t.true(ok3)

    t.end()
  })
}

module.exports.tests.remove = (test) => {
  test('remove', (t) => {
    let graph = new Graph()
    let node1 = new (class Example { })()
    let node2 = new (class Example { })()
    graph.add('foo', node1)
    graph.add('bar', node1)
    graph.add('foo', node2)

    // remove node from 'foo'
    let ok1 = graph.remove('foo', node1)
    t.equal(graph.edges.foo.length, 1)
    t.true(ok1)

    // try to remove same node twice
    let ok2 = graph.remove('foo', node1)
    t.equal(graph.edges.foo.length, 1)
    t.false(ok2)

    // remove node from 'bar'
    let ok3 = graph.remove('bar', node1)
    t.false(graph.edges.bar)
    t.true(ok3)

    // remove node from 'baz'
    let ok4 = graph.remove('baz', node1)
    t.false(graph.edges.baz)
    t.false(ok4)

    t.end()
  })
}

module.exports.tests.length = (test) => {
  test('length', (t) => {
    let graph = new Graph()
    let node1 = new (class Example { })()
    let node2 = new (class Example { })()
    graph.add('foo', node1)
    graph.add('bar', node1)
    graph.add('foo', node2)

    // find total nodes with 'foo' relationship
    let foo = graph.length('foo')
    t.equals(foo, 2)

    // find total nodes with 'bar' relationship
    let bar = graph.length('bar')
    t.equals(bar, 1)

    // find total nodes with 'baz' relationship
    let baz = graph.length('baz')
    t.equals(baz, 0)

    t.end()
  })
}

module.exports.tests.findAll = (test) => {
  test('findAll', (t) => {
    let graph = new Graph()
    let node1 = new (class Example { })()
    let node2 = new (class Example { })()
    graph.add('foo', node1)
    graph.add('bar', node1)
    graph.add('foo', node2)

    // find all nodes with 'foo' relationship
    let foo = graph.findAll('foo')
    t.deepEquals(foo, [node1, node2])

    // find all nodes with 'bar' relationship
    let bar = graph.findAll('bar')
    t.deepEquals(bar, [node1])

    // find all nodes with 'baz' relationship
    let baz = graph.findAll('baz')
    t.deepEquals(baz, [])

    t.end()
  })
}

module.exports.tests.findOne = (test) => {
  test('findOne', (t) => {
    let graph = new Graph()
    let node1 = new (class Example { })()
    let node2 = new (class Example { })()
    graph.add('foo', node1)
    graph.add('bar', node1)
    graph.add('foo', node2)

    // find all nodes with 'foo' relationship
    let foo = graph.findOne('foo')
    t.equals(foo, node1)

    // find all nodes with 'bar' relationship
    let bar = graph.findOne('bar')
    t.equals(bar, node1)

    // find all nodes with 'baz' relationship
    let baz = graph.findOne('baz')
    t.equals(baz, null)

    t.end()
  })
}

module.exports.tests.some = (test) => {
  test('some', (t) => {
    let graph = new Graph()
    let node1 = new (class Example { constructor () { this.name = 'A' }})()
    let node2 = new (class Example { constructor () { this.name = 'B' } })()
    graph.add('foo', node1)
    graph.add('bar', node1)
    graph.add('foo', node2)

    // find some nodes with 'foo' relationship
    let foo = graph.some('foo', n => n.name === 'A')
    t.true(foo)

    // find some nodes with 'bar' relationship
    let bar = graph.some('bar', n => n.name === 'B')
    t.false(bar)

    // find some nodes with 'baz' relationship
    let baz = graph.some('baz', n => n.name === 'A')
    t.false(baz)

    // invalid function
    let nofunc = graph.some('baz')
    t.false(nofunc)

    t.end()
  })
}

module.exports.tests.every = (test) => {
  test('every', (t) => {
    let graph = new Graph()
    let node1 = new (class Example { constructor () { this.name = 'A' } })()
    let node2 = new (class Example { constructor () { this.name = 'B' } })()
    graph.add('foo', node1)
    graph.add('bar', node1)
    graph.add('foo', node2)

    // find every nodes with 'foo' relationship
    let foo = graph.every('foo', n => n.name === 'A')
    t.false(foo)

    // find every nodes with 'bar' relationship
    let bar = graph.every('bar', n => n.name === 'A')
    t.true(bar)

    // find every nodes with 'baz' relationship
    let baz = graph.every('baz', n => n.name === 'A')
    t.false(baz)

    // invalid function
    let nofunc = graph.every('baz')
    t.false(nofunc)

    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Graph: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
