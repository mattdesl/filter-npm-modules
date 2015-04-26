var relative = require('relative-require-regex')()
var basename = require('require-package-name')
var validate = require('validate-npm-package-name')
var moduleExists = require('is-npm-module')
var uniq = require('uniq')
var asyncFilter = require('async').filter
var noop = function(){}

module.exports = function(array, opt, done) {
  if (typeof opt === 'function') {
    done = opt
    opt = {}
  } else
    opt = opt || {}
  if (typeof done !== 'function')
    throw new TypeError('must specify a callback')

  var names = array.map(function(item) {
    if (relative.test(item))
      return null
    return basename(item)
  }).filter(isValid)

  //sort and de-dupe
  uniq(names.sort())

  //database queries
  asyncFilter(names, function(name, next) {
    //if we should grab from a cache
    if (opt.cache && opt.cache.indexOf(name) >= 0)
      return next(true)

    moduleExists(name, function(err, exists) {
      next(!err && exists)
    })
  }, done)
}

function isValid(name) {
  if (!name)
    return false
  var result = validate(name)
  return result.validForNewPackages || result.validForOldPackages
}