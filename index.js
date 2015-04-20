var util = require('util');

module.exports = function(name, parameters, options) {
  options = options || {};
  options.captureStackTrace = options.captureStackTrace == undefined ? true : false;

  var ctor = function(msg) {
    if (!(this instanceof ctor)) {
      throw new Error('Trying to create an error instance without invoking contructor with "new" keyword');
    }

    Error.call(this);

    if (options.captureStackTrace) {
      Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
    }

    if (msg) {
      var args = Array.prototype.slice.call(arguments);

      if (args.length > 1 && typeof args[args.length - 1] == 'object') {
        var instanceParams = args.pop();

        copy(instanceParams, this);
      }

      this.message = util.format.apply(util, args);
    }

    copy(parameters, this);

    this.name = name;
  };

  util.inherits(ctor, Error);

  return ctor;
};

function copy(from, to) {
  if (from) {
    for (var key in from) {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}