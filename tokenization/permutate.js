const Span = require('./Span')
const JOIN_CHAR = ' '

/**
  produce all the possible token groups from adjacent input tokens (without reordering tokens)

  windowMin: the minimum amount of tokens which can be returned in a single window
  windowMax: the maximum amount of tokens which can be returned in a single window

  note: we should honor word boundary delimiters (such as comma) when creating permutations
  ported: https://github.com/pelias/placeholder/blob/master/lib/permutations.js
**/

function permutateRec (prevSpan, s, windowCur, windowMin, windowMax, permutations) {
  // Stops when the window is reached
  if (windowCur > windowMax) {
    return
  }
  // Create new span base on the previous and the next one
  let span = new Span(prevSpan.body + (prevSpan.body.length > 0 ? JOIN_CHAR : '') + s.body, prevSpan.start)
  // Add all children from the previous span to the new one, they will have the same ones + the next one
  // Add to all children from the previous span the new span as parent + the next one
  prevSpan.graph.findAll('child').forEach(child => {
    span.graph.add('child', child)
    child.graph.add('parent', span)
  })
  span.graph.add('child', s)
  s.graph.add('parent', span)

  let isFirst = span.body === s.body
  let isLast = !s.graph.findOne('next')

  // If span is the first one, s is the first child, otherwise we take the first child of the previous span
  if (isFirst) {
    span.graph.add('child:first', s)
  } else {
    span.graph.add('child:first', prevSpan.graph.findOne('child:first'))
  }

  span.graph.add('child:last', s)

  if (isFirst) {
    span.start = s.start
    span.end = s.end
  } else {
    if (s.start < span.start) {
      span.start = s.start
    }
    if (s.end > span.end) {
      span.end = s.end
    }
  }

  // go through the graph recursively, check all next spans
  if (!isLast) {
    s.graph.findAll('next').forEach(next => {
      permutateRec(span, next, windowCur + 1, windowMin, windowMax, permutations)
    })
  }

  if (windowMin <= windowCur) {
    permutations.push(span)
  }
}

function permutate (spans, windowMin, windowMax) {
  let permutations = []
  spans.forEach(span => {
    permutateRec(new Span(), span, 1, windowMin, windowMax, permutations)
  })
  return permutations
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
