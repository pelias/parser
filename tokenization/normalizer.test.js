const normalizer = require('./normalizer')

module.exports.tests = {}

module.exports.tests.normalizer = (test) => {
  test('normalizerr: hyphen', (t) => {
    const value = ' Value-With-Some-Hyphen '
    const expected = 'Value With Some Hyphen'
    const normalize = normalizer({ removeHyphen: true })

    t.deepEquals(normalize(value), expected)
    t.end()
  })

  test('normalizer: accents', (t) => {
    const value = ' Vâlüé-Wìth-Sômê-Accents '
    const expected = 'Value-With-Some-Accents'
    const normalize = normalizer({ removeAccents: true })

    t.deepEquals(normalize(value), expected)
    t.end()
  })

  test('normalizer: lowercase', (t) => {
    const value = 'Value-With-Some-UpperCases'
    const expected = 'value-with-some-uppercases'
    const normalize = normalizer({ lowercase: true })

    t.deepEquals(normalize(value), expected)
    t.end()
  })

  test('normalizer: spaces', (t) => {
    const value = 'Value With Some Spaces'
    const expected = 'ValueWithSomeSpaces'
    const normalize = normalizer({ removeSpaces: true })

    t.deepEquals(normalize(value), expected)
    t.end()
  })

  test('normalizer: option mix', (t) => {
    const value = 'Vâlüé-Mìxèd'
    const expected = 'value mixed'
    const normalize = normalizer({ lowercase: true, removeHyphen: true, removeAccents: true })

    t.deepEquals(normalize(value), expected)
    t.end()
  })

  test('normalizer: no options', (t) => {
    const value = 'Value-With-Some-Hyphen'
    const normalize = normalizer()

    t.deepEquals(normalize(value), value)
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`normalizer: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
