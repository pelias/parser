const util = require('util')
const chalk = require('chalk')

function tokenizer (tokenizer, label) {
  console.log()
  console.log('='.repeat(64))
  console.log('TOKENIZATION %s', label)
  console.log('-'.repeat(64))

  process.stdout.write('INPUT'.padEnd(32) + '➜  ')
  console.log(chalk.bold(tokenizer.span.body))
  spans('SECTIONS', tokenizer.section)

  for (let i = 0; i < tokenizer.section.length; i++) {
    spans(util.format('S%d TOKENS', i), tokenizer.section[i].child)
  }

  for (let i = 0; i < tokenizer.section.length; i++) {
    spans(util.format('S%d PERMUTATIONS', i), tokenizer.section[i].permutation)
  }

  console.log()
}

function spans (title, s) {
  process.stdout.write(title.padEnd(32) + '➜  ')
  if (s.length === 0) {
    console.log()
  }
  for (let i = 0; i < s.length; i++) {
    process.stdout.write(chalk.bgBlue.bold(s[i].body))
    if (i === s.length - 1) {
      console.log()
    } else {
      process.stdout.write(' ')
    }
  }
}

function wordClassifications (tokenizer) {
  console.log('-'.repeat(64))
  console.log('WORDS')
  console.log('-'.repeat(64))

  for (let i = 0; i < tokenizer.section.length; i++) {
    let section = tokenizer.section[i]
    for (let j = 0; j < section.child.length; j++) {
      let word = section.child[j]
      let keys = Object.keys(word.classifications)
      if (!keys.length) { continue }
      process.stdout.write(word.body.padEnd(32) + '➜  ')
      for (let k in word.classifications) {
        let classification = word.classifications[k]
        let block = chalk.bgGreen.bold(classification.label + `=${classification.confidence.toFixed(1)}`)
        process.stdout.write(block)
        if (k !== keys.slice(-1)) {
          process.stdout.write(' ')
        }
      }
      console.log()
    }
  }

  console.log()
}

function permutationClassifications (tokenizer) {
  console.log('-'.repeat(64))
  console.log('PERMUTATIONS')
  console.log('-'.repeat(64))

  for (let i = 0; i < tokenizer.section.length; i++) {
    let section = tokenizer.section[i]
    for (let j = 0; j < section.permutation.length; j++) {
      let perm = section.permutation[j]
      let keys = Object.keys(perm.classifications)
      if (!keys.length) { continue }
      process.stdout.write(perm.body.padEnd(32) + '➜  ')
      for (let k in perm.classifications) {
        let classification = perm.classifications[k]
        let block = chalk.bgRed.bold(classification.label + `=${classification.confidence.toFixed(1)}`)
        process.stdout.write(block)
        if (k !== keys.slice(-1)) {
          process.stdout.write(' ')
        }
      }
      console.log()
    }
  }

  console.log()
}

function classifications (tokenizer, label) {
  console.log('='.repeat(64))
  console.log('CLASSIFICATIONS %s', label)

  wordClassifications(tokenizer, label)
  permutationClassifications(tokenizer, label)
}

function solutions (tokenizer, label) {
  console.log('='.repeat(64))
  console.log('SOLUTIONS %s', label)
  console.log('-'.repeat(64))

  tokenizer.solution.forEach(s => {
    console.log(s.map(c => {
      return {
        [c.classification.label]: c.span.body,
        offset: c.span.start
      }
    }))
    console.log()
  })
}

module.exports.tokenizer = tokenizer
module.exports.spans = spans
module.exports.classifications = classifications
module.exports.solutions = solutions
