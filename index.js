var util = require('util');

module.exports = function(name, options) {
  options = options || {};
  options.captureStackTrace = options.captureStackTrace == undefined ? true : false;

  var ctor = function(msg) {
    Error.call(this);

    if (options.captureStackTrace) {
      Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
    }

    if (msg) {
      var args = Array.prototype.slice.call(arguments);
      this.message = util.format.apply(util, args);
    }

    this.name = name;
  };

  util.inherits(ctor, Error);

  return ctor;
};