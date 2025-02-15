const resourceLoader = require('../helper').resourceLoader
const dictPath = `resources/custom/dictionaries`

module.exports.load = resourceLoader(dictPath)
