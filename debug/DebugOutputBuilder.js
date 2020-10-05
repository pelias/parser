/** This class generates ansi color-coded debugging output from an
 * address parse. The string that it builds up is suitable for outputting
 * to a console, or, through the use of a javascript library like ansi-up,
 * displaying on the web.
 *
 * The class is generally called like so:
 *   new DebugOutputBuilder().parse(input).toString()
 */

const util = require('util')
const chalk = require('chalk')
const StringBuffer = require('stringbuffer')

const Tokenizer = require('../tokenization/Tokenizer')
const AddressParser = require('../parser/AddressParser')

class DebugOutputBuilder {
  constructor () {
    this.sb = new StringBuffer()

    const self = this
    function write (o) {
      if (typeof o === 'object') {
        self.sb.append(util.inspect(o, { colors: true }))
      } else {
        self.sb.append(o)
      }
    }

    this.write = write
  }

  toString () {
    return this.sb.toString()
  }

  writeLine (...s) {
    if (s) {
      s.forEach(this.write)
    }
    this.write('\n')
  }

  tokenizer (tokenizer, label) {
    const spans = (title, s) => {
      this.write(title.padEnd(32) + '➜  ')
      if (s.length === 0) {
        this.writeLine()
      }
      for (let i = 0; i < s.length; i++) {
        this.write(
          chalk.bgBlue.bold(util.format(' %s ', s[i].body)) +
            chalk.bgWhite.bold.gray(util.format(' %d:%d ', s[i].start, s[i].end))
        )
        if (i === s.length - 1) {
          this.writeLine()
        } else {
          this.write(' ')
        }
      }
    }

    this.writeLine()
    this.writeLine('='.repeat(64))
    this.writeLine(`TOKENIZATION ${label}`)
    this.writeLine('-'.repeat(64))

    this.write('INPUT'.padEnd(32) + '➜  ')
    this.writeLine(tokenizer.span.body)
    spans('SECTIONS', tokenizer.section)

    for (let i = 0; i < tokenizer.section.length; i++) {
      spans(util.format('S%d TOKENS', i), tokenizer.section[i].graph.findAll('child'))
    }

    for (let i = 0; i < tokenizer.section.length; i++) {
      spans(util.format('S%d PHRASES', i), tokenizer.section[i].graph.findAll('phrase'))
    }

    this.writeLine()
  }

  wordClassifications (tokenizer) {
    this.writeLine('-'.repeat(64))
    this.writeLine('WORDS')
    this.writeLine('-'.repeat(64))

    for (let i = 0; i < tokenizer.section.length; i++) {
      let section = tokenizer.section[i]
      let children = section.graph.findAll('child')
      for (let j = 0; j < children.length; j++) {
        let word = children[j]
        let keys = Object.keys(word.classifications)
        if (!keys.length) {
          continue
        }
        this.write(word.body.padEnd(32) + '➜  ')
        for (let k in word.classifications) {
          let classification = word.classifications[k]
          let block = chalk.bgGreen.bold(util.format(' %s ', classification.label))
          block += chalk.bgWhite.bold.gray(
            util.format(' %s ', classification.confidence.toFixed(2))
          )
          this.write(block)
          if (k !== keys.slice(-1)) {
            this.write(' ')
          }
        }
        this.writeLine()
      }
    }

    this.writeLine()
  }

  phraseClassifications (tokenizer) {
    this.writeLine('-'.repeat(64))
    this.writeLine('PHRASES')
    this.writeLine('-'.repeat(64))

    for (let i = 0; i < tokenizer.section.length; i++) {
      let section = tokenizer.section[i]
      let phrases = section.graph.findAll('phrase')
      for (let j = 0; j < phrases.length; j++) {
        let phrase = phrases[j]
        let keys = Object.keys(phrase.classifications)
        if (!keys.length) {
          continue
        }
        this.write(phrase.body.padEnd(32) + '➜  ')
        for (let k in phrase.classifications) {
          let classification = phrase.classifications[k]
          let block = chalk.bgRed.bold(util.format(' %s ', classification.label))
          block += chalk.bgWhite.bold.gray(
            util.format(' %s ', classification.confidence.toFixed(2))
          )
          this.write(block)
          if (k !== keys.slice(-1)) {
            this.write(' ')
          }
        }
        this.writeLine()
      }
    }

    this.writeLine()
  }

  classifications (tokenizer, label) {
    this.writeLine('='.repeat(64))
    this.writeLine(`CLASSIFICATIONS ${label}`)

    this.wordClassifications(tokenizer, label)
    this.phraseClassifications(tokenizer, label)
  }

  solutions (tokenizer, label) {
    this.writeLine('='.repeat(64))
    this.writeLine(`SOLUTIONS ${label}`)
    this.writeLine('-'.repeat(64))

    // print all solutions
    tokenizer.solution.forEach((s) => {
      let score = chalk.yellow.bold('(' + s.score.toFixed(2) + ')')
      this.writeLine(
        score,
        ' ➜ ',
        s.pair.map((c) => {
          return {
            [c.classification.label]: c.span.body
            // offset: c.span.start
          }
        })
      )
      this.writeLine()
    })
  }

  parse (input) {
    // tokenizer
    var start = new Date()
    const t = new Tokenizer(input)
    let took = new Date() - start
    this.tokenizer(t, util.format('(%sms)', took))

    // parser
    const parser = new AddressParser()
    took = parser.classify(t)
    this.classifications(t, util.format('(%sms)', took))
    took = parser.solve(t)
    this.solutions(t, util.format('(%sms)', took))

    return this
  }
}

module.exports = DebugOutputBuilder
