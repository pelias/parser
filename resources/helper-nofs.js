function singleResourceLoader (dict, add, remove) {
  dict.split('\n').forEach(row => {
    if (row.trim().startsWith('#')) {
      // Do nothing, this is a comment
    } else if (row.startsWith('!')) {
      row.substring(1).split('|').forEach(remove)
    } else {
      row.split('|').forEach(add)
    }
  })
}

function resourceLoader (dict) {
  return (opts, add, remove) => {
    let data

    if (typeof opts === 'string') {
      data = dict[opts]
    } else {
      data = dict
      for (const key of opts) {
        if (!data.hasOwnProperty(key)) {
          return
        }
        data = data[key]
      }
    }

    if (typeof data === 'string') {
      singleResourceLoader(data, add, remove)
    } else {
      for (let value in data) {
        singleResourceLoader(value, add, remove)
      }
    }
  }
}

module.exports.resourceLoader = resourceLoader
