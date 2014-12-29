var autopolyfiller = require('autopolyfiller');

module.exports = function compile(data, options) {
  return createPolyfiller(defaults(options)).add(data).toString() + data;
}

function defaults(options) {
  options = options || {};

  return Object.keys(options).reduce(function(defaults, key) {
      defaults[key] = options[key];
      return defaults;
  }, {
      browsers   : [],
      include    : [],
      exclude    : [],
      parser     : null,
      parserOpts : {}
  });
}

function createPolyfiller(options) {
  var polyfiller = autopolyfiller(options.browsers)
    .include(options.include)
    .exclude(options.exclude);

  if (typeof options.parser === 'string') {
    polyfiller.withParser(require(options.parser), options.parserOpts);
  }

  return polyfiller;
}
