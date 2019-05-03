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
    spans(util.format('S%d TOKENS', i), tokenizer.section[i].graph.findAll('child'))
  }

  for (let i = 0; i < tokenizer.section.length; i++) {
    spans(util.format('S%d PHRASES', i), tokenizer.section[i].graph.findAll('phrase'))
  }

  console.log()
}

function spans (title, s) {
  process.stdout.write(title.padEnd(32) + '➜  ')
  if (s.length === 0) {
    console.log()
  }
  for (let i = 0; i < s.length; i++) {
    process.stdout.write(
      chalk.bgBlue.bold(util.format(' %s ', s[i].body)) +
      chalk.bgWhite.bold.gray(util.format(' %d:%d ', s[i].start, s[i].end))
    )
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
    let children = section.graph.findAll('child')
    for (let j = 0; j < children.length; j++) {
      let word = children[j]
      let keys = Object.keys(word.classifications)
      if (!keys.length) { continue }
      process.stdout.write(word.body.padEnd(32) + '➜  ')
      for (let k in word.classifications) {
        let classification = word.classifications[k]
        let block = chalk.bgGreen.bold(util.format(' %s ', classification.label))
        block += chalk.bgWhite.bold.gray(util.format(' %s ', classification.confidence.toFixed(2)))
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

function phraseClassifications (tokenizer) {
  console.log('-'.repeat(64))
  console.log('PHRASES')
  console.log('-'.repeat(64))

  for (let i = 0; i < tokenizer.section.length; i++) {
    let section = tokenizer.section[i]
    let phrases = section.graph.findAll('phrase')
    for (let j = 0; j < phrases.length; j++) {
      let phrase = phrases[j]
      let keys = Object.keys(phrase.classifications)
      if (!keys.length) { continue }
      process.stdout.write(phrase.body.padEnd(32) + '➜  ')
      for (let k in phrase.classifications) {
        let classification = phrase.classifications[k]
        let block = chalk.bgRed.bold(util.format(' %s ', classification.label))
        block += chalk.bgWhite.bold.gray(util.format(' %s ', classification.confidence.toFixed(2)))
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
  phraseClassifications(tokenizer, label)
}

function solutions (tokenizer, label) {
  console.log('='.repeat(64))
  console.log('SOLUTIONS %s', label)
  console.log('-'.repeat(64))

  // print all solutions
  tokenizer.solution.forEach(s => {
    let score = chalk.yellow.bold('(' + s.score.toFixed(2) + ')')
    console.log(score, '➜', s.pair.map(c => {
      return {
        [c.classification.label]: c.span.body
        // offset: c.span.start
      }
    }))
    console.log()
  })
}

module.exports.tokenizer = tokenizer
module.exports.spans = spans
module.exports.classifications = classifications
module.exports.solutions = solutions
