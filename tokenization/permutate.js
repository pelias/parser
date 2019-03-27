const Span = require('./Span')
const JOIN_CHAR = ' '

/**
  produce all the possible token groups from adjacent input tokens (without reordering tokens)

  windowMin: the minimum amount of tokens which can be returned in a single window
  windowMax: the maximum amount of tokens which can be returned in a single window

  note: we should honor word boundary delimiters (such as comma) when creating permutations
  ported: https://github.com/pelias/placeholder/blob/master/lib/permutations.js
**/

function permutate(spans, windowMin, windowMax) {
  let perms = []

  // favour larger tokens over shorter ones
  for( let i=0; i<spans.length; i++ ) {
    for( let j=i+windowMax; j>=i+windowMin; j-- ){
      if( j <= spans.length ) {
        if( j > i ){
          let span = new Span()
          for( let k=i; k<j; k++ ){
            let s = spans[k]
            span.body += s.body
            span.end = span.start + span.body.length
            span.child.push(s)

            // join with delim
            if( k < j-1 ) {
              span.body += JOIN_CHAR
            }

            // update spans
            if( i === k ) {
              span.start = s.start
              span.end = s.end
            } else {
              if( s.start < span.start ){
                span.start = s.start
              }
              if( s.end > span.end ){
                span.end = s.end
              }
            }
          }
          perms.push(span)
        }
      }
    }
  }

  return perms
}

module.exports = permutate

/**
example:
['soho', 'new', 'york', 'usa']
[
  ['soho', 'new', 'york', 'usa'],
  ['soho', 'new', 'york'],
  ['soho', 'new'],
  ['soho'],
  ['new', 'york', 'usa'],
  ['new', 'york'],
  ['new'],
  ['york', 'usa'],
  ['york'],
  ['usa'],
]
**/