var compile = require('./compile');
var through = require('through');
var crypto  = require('crypto');
var merge   = require('merge');
var _cache  = {};

function getHash(data) {
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex');
}

function polyify(opts) {
  var opts       = opts || {};
  var extensions = opts.extensions || /\.js$/i;

  return function (file, options) {
    if (!extensions.test(file)) {
      return through();
    }

    var data = '';
    options = merge(opts, options);

    return through(write, end);

    function write(buf) { data += buf };

    function end() {
      var hash   = getHash(data);
      var cached = _cache[file];

      if (!cached || cached.hash !== hash) {
        try {
          _cache[file] = { compiled: compile(data, options), hash: hash }
          this.queue(_cache[file].compiled);
        } catch (e) {
          e.name     = 'Polyify Error';
          e.message  = file + ': ' + e.message;
          e.fileName = file;
          this.emit('error', e);
        }
      }

      return this.queue(null);
    }
  }
};

exports = module.exports = polyify();

exports.configure = polyify;
