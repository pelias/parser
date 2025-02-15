const resourceLoader = require('../helper-nofs').resourceLoader
const dict = require('./_dictionaries')

module.exports.load = resourceLoader(dict)
