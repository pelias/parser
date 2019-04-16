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
    t.equal(graph.edges.bar.length, 0)
    t.true(ok3)

    // remove node from 'baz'
    let ok4 = graph.remove('baz', node1)
    t.false(graph.edges.baz)
    t.false(ok4)

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

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Graph: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
