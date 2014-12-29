polyify
=======

**WIP. Tests are in the works. Standard disclaimer, yada yada.**

A [Browserify](https://github.com/substack/node-browserify) transform for [Autopolyfiller](https://github.com/azproduction/autopolyfiller).

# Usage

    $ npm install polyify --save-dev

Find [Polyify on NPM](https://www.npmjs.com/package/polyify).


### package.json configuration

Add `polyify` to the list of [browserify transforms](https://github.com/substack/browserify-handbook#browserifytransform-field).

```json
{
  "browserify": {
    "transform": [
      ["polyify", { "browsers": "IE >= 8" }]
    ]
  }
}
```


### cli configuration

Just like any other browserify transform. Use subargs to pass additional options.

    $ browserify input.js -t [ polyify --browsers="IE >= 8" ] -o output.js



### api configuration

```javascript
var fs         = require('fs');
var browserify = require('browserify');
var polyify    = require('polyify').configure;

// path to bundle entry point
var b = browserify({ entries: __dirname + '/index.js' }); 

// apply the polyify transform, optionally passing in configuration
b.transform(polyify({ browsers: 'IE >= 8' })); 

// copmile and write out
b.bundle().pipe(fs.createWriteStream('index-with-polyfills.js'))
```
