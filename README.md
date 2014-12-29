polyify
=======

**WIP. Tests are in the works. Standard disclaimer, yada yada.**

A [Browserify](https://github.com/substack/node-browserify) transform for [Autopolyfiller](https://github.com/azproduction/autopolyfiller). If you have questions about Autopolyfiller's API, check the [readme](https://github.com/azproduction/autopolyfiller). This repository is just a browserify transform wrapper.

# Usage

    $ npm install polyify --save-dev

Find [Polyify on NPM](https://www.npmjs.com/package/polyify).

You can use browserify transforms in a variety of ways such as...

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

// compile and write out
b.bundle().pipe(fs.createWriteStream('index-with-polyfills.js'))
```



## API options

#### browsers: Array
An array of [Browser Matchers](https://github.com/ai/browserslist#queries).

#### include: Array
An array of polyfills to include.

#### exclude: Array
An array of polyfills to exclude.

#### parser: String
A custom parser. See "Using custom parser" at [this page](https://github.com/azproduction/autopolyfiller).

#### parserOpts: Object
Custom parser options. See "Using custom parser" at [this page](https://github.com/azproduction/autopolyfiller).

===

See [Autopolyfiller](https://github.com/azproduction/autopolyfiller) if you have questions.
