/**
 * openaddresses test runner
 *
 * to use this test suite:
 * 1. download a zip file from the 'results.openaddresses.io' site
 * 2. create a subdirectory inside 'test' called 'oa' (ie. 'test/oa')
 * 3. unzip the contents of the zip file into the directory
 * 4. execute the suite with 'npm test oa'
 */
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const csv = require('csv-parse/lib/sync')
const options = {
  trim: true,
  skip_empty_lines: true,
  relax_column_count: true,
  relax: true,
  columns: true
}

// {
//   LON: '171.251359',
//     LAT: '-44.0831092',
//       NUMBER: '8',
//         STREET: 'Ash Drive',
//           UNIT: '',
//             CITY: 'Geraldine',
//               DISTRICT: 'Geraldine',
//                 REGION: '',
//                   POSTCODE: '',
//                     ID: '2099969',
//                       HASH: 'c97860ebc8b12d3e'
// },

const AddressParser = require('../parser/AddressParser')
const Tokenizer = require('../tokenization/Tokenizer')
const parser = new AddressParser()

function extract (row) {
  let ret = {}

  if (row.NUMBER && row.NUMBER.trim().length) {
    ret.housenumber = row.NUMBER.trim()
  }
  if (row.STREET && row.STREET.trim().length) {
    ret.street = row.STREET.trim()
  }
  if (row.POSTCODE && row.POSTCODE.trim().length) {
    ret.postcode = row.POSTCODE.trim()
  }

  return ret
}

function assert (t, ext) {
  let text = Object.keys(ext).map(k => ext[k]).join(' ')
  let expected = Object.keys(ext).map(k => { return { [k]: ext[k] } })

  let tokenizer = new Tokenizer(text)
  parser.classify(tokenizer)
  parser.solve(tokenizer)

  t.deepEquals(tokenizer.solution.map(s => s.pair.map(c => {
    return { [c.classification.label]: c.span.body }
  }))[0], expected, text)

  return text
}

module.exports.all = (tape) => {
  // find all files ending in .test.js
  const files = glob.sync(path.join(__dirname, 'oa/**/*.csv'), { realpath: true })
  files.forEach(csvpath => {
    let suite = csvpath.replace(__dirname, '')
    let contents = fs.readFileSync(csvpath)
    let rows = csv(contents, options)
    tape(`oa: ${suite}`, (t) => {
      let prev = ''
      rows.forEach(row => {
        let ext = extract(row)
        let hash = Object.keys(ext).map(k => ext[k]).join(',')
        if (hash === prev) { return }
        prev = hash
        assert(t, ext)
      })
      t.end()
    })
  })
}
