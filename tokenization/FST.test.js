const FST = require('./FST')
const ETX = String.fromCharCode(3) // end-of-text

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor', (t) => {
    let fst = new FST()
    t.deepEquals(fst.head.constructor.name, 'Graph')
    t.deepEquals(fst.tail.constructor.name, 'Graph')
    t.deepEquals(Object.keys(fst.head.edges).length, 0)
    t.deepEquals(Object.keys(fst.tail.edges).length, 0)
    t.end()
  })
}

module.exports.tests.graph = (test) => {
  test('graph', (t) => {
    let fst = new FST()
    fst.add('example')

    // left-to-right
    t.true(
      fst.head
        .findOne('>e')
        .findOne('>x')
        .findOne('>a')
        .findOne('>m')
        .findOne('>p')
        .findOne('>l')
        .findOne('>e')
        .findOne(`>${ETX}`)
    )

    // right-to-left
    t.true(
      fst.tail
        .findOne('<e')
        .findOne('<l')
        .findOne('<p')
        .findOne('<m')
        .findOne('<a')
        .findOne('<x')
        .findOne('<e')
        .findOne(`<${ETX}`)
    )

    t.end()
  })
}

module.exports.tests.has = (test) => {
  test('has', (t) => {
    let fst = new FST()

    fst.add('example')
    fst.add('exam')
    t.true(fst.has('example'))
    t.true(fst.has('exam'))

    t.end()
  })
}

module.exports.tests._meta = (test) => {
  test('_meta', (t) => {
    let fst = new FST()

    // add term
    fst.add('example')

    // meta-data
    t.equals(Object.keys(fst.head.edges).length, 1)
    t.equals(fst._walk(fst.head, '>', fst._split('e')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('ex')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exa')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exam')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('examp')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exampl')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('example')).findOne('_meta')['>count'], 1)

    // duplicate term
    fst.add('example')

    // meta-data
    t.equals(Object.keys(fst.head.edges).length, 1)
    t.equals(fst._walk(fst.head, '>', fst._split('e')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('ex')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exa')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exam')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('examp')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exampl')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('example')).findOne('_meta')['>count'], 1)

    // add term
    fst.add('excess')

    t.equals(Object.keys(fst.head.edges).length, 1)
    t.equals(fst._walk(fst.head, '>', fst._split('e')).findOne('_meta')['>count'], 2)
    t.equals(fst._walk(fst.head, '>', fst._split('ex')).findOne('_meta')['>count'], 2)
    t.equals(fst._walk(fst.head, '>', fst._split('exa')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exam')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('examp')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exampl')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('example')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exc')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exce')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exces')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('excess')).findOne('_meta')['>count'], 1)

    // add term
    fst.add('examples')

    // meta-data
    t.equals(Object.keys(fst.head.edges).length, 1)
    t.equals(fst._walk(fst.head, '>', fst._split('e')).findOne('_meta')['>count'], 3)
    t.equals(fst._walk(fst.head, '>', fst._split('ex')).findOne('_meta')['>count'], 3)
    t.equals(fst._walk(fst.head, '>', fst._split('exa')).findOne('_meta')['>count'], 2)
    t.equals(fst._walk(fst.head, '>', fst._split('exam')).findOne('_meta')['>count'], 2)
    t.equals(fst._walk(fst.head, '>', fst._split('examp')).findOne('_meta')['>count'], 2)
    t.equals(fst._walk(fst.head, '>', fst._split('exampl')).findOne('_meta')['>count'], 2)
    t.equals(fst._walk(fst.head, '>', fst._split('example')).findOne('_meta')['>count'], 2)
    t.equals(fst._walk(fst.head, '>', fst._split('examples')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exc')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exce')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('exces')).findOne('_meta')['>count'], 1)
    t.equals(fst._walk(fst.head, '>', fst._split('excess')).findOne('_meta')['>count'], 1)

    t.end()
  })
}

module.exports.tests.prefix = (test) => {
  test('prefix', (t) => {
    let fst = new FST()

    fst.add('example')
    t.true(fst.hasPrefix('e'))
    t.true(fst.hasPrefix('ex'))
    t.true(fst.hasPrefix('exa'))
    t.true(fst.hasPrefix('exam'))
    t.true(fst.hasPrefix('examp'))
    t.true(fst.hasPrefix('exampl'))
    t.false(fst.hasPrefix('example'))

    fst.add('example')
    t.true(fst.hasPrefix('e'))
    t.true(fst.hasPrefix('ex'))
    t.true(fst.hasPrefix('exa'))
    t.true(fst.hasPrefix('exam'))
    t.true(fst.hasPrefix('examp'))
    t.true(fst.hasPrefix('exampl'))
    t.false(fst.hasPrefix('example'))

    fst.add('example@')
    t.true(fst.hasPrefix('e'))
    t.true(fst.hasPrefix('ex'))
    t.true(fst.hasPrefix('exa'))
    t.true(fst.hasPrefix('exam'))
    t.true(fst.hasPrefix('examp'))
    t.true(fst.hasPrefix('exampl'))
    t.true(fst.hasPrefix('example'))
    t.false(fst.hasPrefix('example@'))

    t.end()
  })
}

module.exports.tests.suffix = (test) => {
  test('suffix', (t) => {
    let fst = new FST()

    fst.add('example')
    t.true(fst.hasSuffix('e'))
    t.true(fst.hasSuffix('le'))
    t.true(fst.hasSuffix('ple'))
    t.true(fst.hasSuffix('mple'))
    t.true(fst.hasSuffix('ample'))
    t.true(fst.hasSuffix('xample'))
    t.false(fst.hasSuffix('example'))

    fst.add('example')
    t.true(fst.hasSuffix('e'))
    t.true(fst.hasSuffix('le'))
    t.true(fst.hasSuffix('ple'))
    t.true(fst.hasSuffix('mple'))
    t.true(fst.hasSuffix('ample'))
    t.true(fst.hasSuffix('xample'))
    t.false(fst.hasSuffix('example'))

    fst.add('@example')
    t.true(fst.hasSuffix('e'))
    t.true(fst.hasSuffix('le'))
    t.true(fst.hasSuffix('ple'))
    t.true(fst.hasSuffix('mple'))
    t.true(fst.hasSuffix('ample'))
    t.true(fst.hasSuffix('xample'))
    t.true(fst.hasSuffix('example'))
    t.false(fst.hasSuffix('@example'))

    t.end()
  })
}

module.exports.tests.delete = (test) => {
  test('delete', (t) => {
    let fst = new FST()
    t.deepEquals(Object.keys(fst.head.edges), [])
    t.deepEquals(Object.keys(fst.tail.edges), [])

    fst.add('example')
    t.deepEquals(Object.keys(fst.head.edges), ['>e'])
    t.deepEquals(Object.keys(fst.tail.edges), ['<e'])

    fst.add('exam')
    t.deepEquals(Object.keys(fst.head.edges), ['>e'])
    t.deepEquals(Object.keys(fst.tail.edges), ['<e', '<m'])

    t.true(fst.has('example'))
    t.true(fst.has('exam'))

    t.true(fst.hasPrefix('e'))
    t.true(fst.hasPrefix('ex'))
    t.true(fst.hasPrefix('exa'))
    t.true(fst.hasPrefix('exam'))
    t.true(fst.hasPrefix('examp'))
    t.true(fst.hasPrefix('exampl'))

    fst.delete('example')
    t.deepEquals(Object.keys(fst.head.edges), ['>e'])
    t.deepEquals(Object.keys(fst.tail.edges), ['<m'])

    t.false(fst.has('example'))
    t.true(fst.has('exam'))

    t.true(fst.hasPrefix('e'))
    t.true(fst.hasPrefix('ex'))
    t.true(fst.hasPrefix('exa'))
    t.false(fst.hasPrefix('exam'))
    t.false(fst.hasPrefix('examp'))
    t.false(fst.hasPrefix('exampl'))

    fst.delete('exam')
    t.deepEquals(Object.keys(fst.head.edges), [])
    t.deepEquals(Object.keys(fst.tail.edges), [])

    t.false(fst.has('example'))
    t.false(fst.has('exam'))

    t.false(fst.hasPrefix('e'))
    t.false(fst.hasPrefix('ex'))
    t.false(fst.hasPrefix('exa'))
    t.false(fst.hasPrefix('exam'))
    t.false(fst.hasPrefix('examp'))
    t.false(fst.hasPrefix('exampl'))

    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`FST: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
