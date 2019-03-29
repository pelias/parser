
// solver
function generateMap (tokenizer) {
  let map = {}
  for (let i = 0; i < tokenizer.section.length; i++) {
    let section = tokenizer.section[i]

    // multi-word permutations
    for (let j = 0; j < section.permutation.length; j++) {
      let perm = section.permutation[j]
      let keys = Object.keys(perm.classifications)
      if (!keys.length) { continue }
      for (let k in perm.classifications) {
        let classification = perm.classifications[k]
        if (!map.hasOwnProperty(classification.label)) {
          map[classification.label] = []
        }
        map[classification.label].push({ span: perm, classification: classification })
      }
    }

    // single-word span
    for (let j = 0; j < section.child.length; j++) {
      let word = section.child[j]
      let keys = Object.keys(word.classifications)
      if (!keys.length) { continue }
      for (let k in word.classifications) {
        let classification = word.classifications[k]
        if (!map.hasOwnProperty(classification.label)) {
          map[classification.label] = []
        }
        map[classification.label].push({ span: word, classification: classification })
      }
    }
  }
  return map
}

function exclusiveCartesian () {
  let r = []; let arg = arguments; let max = arg.length - 1
  const helper = (arr, i) => {
    for (let j = 0, l = arg[i].length; j < l; j++) {
      let a = arr.slice(0) // clone arr

      // exclusive - same span cannot appear twice
      let exists = false
      for (let k = 0; k < a.length; k++) {
        if (a[k].span.intersects(arg[i][j].span)) {
          exists = true
          break
        }
      }
      if (!exists) { a.push(arg[i][j]) }
      if (i === max) { r.push(a) } else { helper(a, i + 1) }
    }
  }
  helper([], 0)
  return r
}

function solver (tokenizer) {
  let map = generateMap(tokenizer)
  return exclusiveCartesian.apply(null, Object.keys(map).map(k => map[k]))
}

module.exports.solutions = solver
