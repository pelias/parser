const util = require('util')
const chalk = require('chalk')

function tokenizer(tokenizer, label) {
  console.log()
  console.log( '='.repeat( 64 ) )
  console.log( 'TOKENIZATION %s', label )
  console.log( '-'.repeat( 64 ) )

  process.stdout.write( 'INPUT'.padEnd(32) + '➜  ' )
  console.log( chalk.bold( tokenizer.span.body ) )
  spans( 'SECTIONS', tokenizer.section )

  for( let i=0; i<tokenizer.section.length; i++ ){
    spans( util.format( 'S%d TOKENS', i ), tokenizer.section[i].child )
  }

  for( let i=0; i<tokenizer.section.length; i++ ){
    spans( util.format( 'S%d PERMUTATIONS', i ), tokenizer.section[i].permutation )
  }
}

function spans(title, s) {
  process.stdout.write( title.padEnd(32) + '➜  ' )
  if( s.length === 0 ){
    console.log()
  }
  for( let i=0; i<s.length; i++ ){
    process.stdout.write( chalk.bgBlue.bold( s[i].body ) )
    if( i === s.length-1 ){
      console.log()
    } else {
      process.stdout.write(' ')
    }
  }
}

function classifier( c, label ){
  console.log()
  console.log('='.repeat(64))
  console.log('CLASSIFIER %s', label)
  console.log('-'.repeat(64))

  for( let i=0; i<c.results.length; i++ ){
    let res = c.results[i]
    process.stdout.write( res.span.body.padEnd(32) + '➜  ' )
    console.log( chalk.bgGreen.bold( res.type + `=${res.confidence.toFixed(1)}` ) )
  }

  console.log()
}

module.exports.tokenizer = tokenizer
module.exports.spans = spans
module.exports.classifier = classifier