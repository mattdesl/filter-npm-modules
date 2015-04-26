# filter-npm-modules

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Filters a list of require paths down to a list of public and valid npm module names. The result will be sorted and de-duplicated.

```js
var filter = require('filter-npm-modules')

var list = [
  'object-assign',
  'url',
  'xtend',
  '_invalid-module-name',
  'this-module-does-not-exist',
  'eases/linear.js',
  'eases/quadratic-in-out.js',
  './foo-bar',
  '../relative/module.js'
]

filter(list, function(names) {
  console.log(names)
  // -> ['eases', 'object-assign', 'url', 'xtend']
})
```

If errors were encountered searching the database, the search will continue but that entry will not be included in the resulting list. 

## Usage

[![NPM](https://nodei.co/npm/filter-npm-modules.png)](https://www.npmjs.com/package/filter-npm-modules)

#### `filter(paths, [opt], callback)`

Filters the list of require `paths` with the optional settings and provides the resulting sorted list to `callback` once all async operations are complete (i.e. searching database). 

Options:

- `cache` - an array of module names to assume exist already in the database

For example, you can use [all-the-package-names](https://github.com/zeke/all-the-package-names) to avoid queries for common packages.

```js
var cache = require('all-the-package-names')
filter(paths, { cache: cache }, callback)
```


## License

MIT, see [LICENSE.md](http://github.com/mattdesl/filter-npm-modules/blob/master/LICENSE.md) for details.
