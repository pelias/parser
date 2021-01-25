const path = require('path')
const resourceLoader = require('../helper').resourceLoader
const dictPath = path.join(__dirname, `./dictionaries`)

module.exports.load = resourceLoader(dictPath)
