var filter = require('./')
var test = require('tape')

test('should filter out relatives', function(t) {
  var requires = [
    './some-relative.js',
    '../other',
    './foo',
    './foo-bar',
    '/projects/foo'
  ]
  t.plan(2)
  filter(requires, function(names) {
    t.deepEqual(names, [])
  })

  filter(requires, {}, function(names) {
    t.deepEqual(names, [])
  })
})

test('should filter out invalid names', function(t) {
  var requires = [
    '@14',
    '_asdf',
    '.asdg',
    '@foob/'
  ]
  t.plan(1)
  filter(requires, function(names) {
    t.deepEqual(names, [])
  })
})

test('should accept builtins, sort and de-dupe', function(t) {
  var requires = [
    'zlib',
    'url',
    'events/',
    'events/index.js'
  ]
  t.plan(1)
  filter(requires, function(names) {
    t.deepEqual(names, ['events', 'url', 'zlib'])
  })
})

test('should accept cache for known modules', function(t) {
  var long = 'long-module-that-hopefully-is-not-on-npm'
  var requires = [
    'zlib',
    'url',
    'events/',
    'events/index.js',
    long
  ]
  t.plan(1)
  filter(requires, { cache: [long] }, function(names) {
    t.deepEqual(names, ['events', long, 'url', 'zlib'])
  })
})


test('should search DB', function(t) {
  var requires = [
    'object-assign',
    'xtend',
    'xtend/mutable',
    'eases/quadratic-in-out.js',
    './foo-bar'
  ]
  t.plan(1)
  filter(requires, function(names) {
    t.deepEqual(names, ['eases', 'object-assign', 'xtend'])
  })
})


test('should search DB 2', function(t) {
  var requires = [
    'object-assign',
    'url',
    'xtend',
    'eases/linear.js',
    'eases/quadratic-in-out.js',
    './foo-bar',
    '../relative/module.js'
  ]
  t.plan(1)
  filter(requires, function(names) {
    t.deepEqual(names, ['eases', 'object-assign', 'url', 'xtend'])
  })
})