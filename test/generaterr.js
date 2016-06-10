/* jshint expr: true */
var expect = require('chai').expect;

var generaterr = require('../index');

describe('generaterr', function() {
  it('should generate error constructors', function() {
    var errorConstructor = generaterr('ParseError');
    expect(errorConstructor).to.be.a('function');
  });

  it('should create instances of "Error"', function() {
    var ParseError = generaterr('ParseError');
    var err = new ParseError('');

    expect(err).to.be.an.instanceof(Error);
  });

  it('should allow errors to be generated without a message', function() {
    var ParseError = generaterr('ParseError');
    var err = new ParseError();

    expect(err.message).to.be.equal('');
  });

  it('should expose message', function() {
    var ParseError = generaterr('ParseError');
    var err = new ParseError('Could not parse file due to missing semicolons');

    expect(err.message).to.equal('Could not parse file due to missing semicolons');
  });

  it('should throw an error with message, name and stack trace', function(done) {
    var ParseError = generaterr('ParseError');

    try
    {
      throw new ParseError('Could not parse file due to missing semicolons');
    } catch(e) {
      expect(e.message).to.equal('Could not parse file due to missing semicolons');
      expect(e.name).to.equal('ParseError');
      expect(e.stack).to.exist;

      done();
    }
  });

  it('should throw an error without stack trace if turned off by options', function(done) {
    var ParseError = generaterr('ParseError', {}, { captureStackTrace : false });

    try
    {
      throw new ParseError('Could not parse file due to missing semicolons');
    } catch(e) {
      expect(e.stack).to.not.exist;

      done();
    }
  });

  it('should allow to pass options only', function(done) {
    var ParseError = generaterr('ParseError', null, { captureStackTrace : false });

    try
    {
      throw new ParseError('Could not parse file due to missing semicolons');
    } catch(e) {
      expect(e.stack).to.not.exist;

      done();
    }
  });

  it('should format messages with util.format', function(done) {
    var ParseError = generaterr('ParseError');

    try
    {
      throw new ParseError('Could not parse file "%s" due to missing semicolons at line %d:%d', 'input.js', 10, 12);
    } catch(e) {
      expect(e.message).to.equal('Could not parse file "input.js" due to missing semicolons at line 10:12');
      done();
    }
  });

  it('should last argument object to error instance', function() {
    var ParseError = generaterr('ParseError');

    var err = new ParseError('Could not parse file "%s" due to missing semicolons at line %d:%d', 'input.js', 10, 12, { status : 'FATAL' });
    expect(err.message).to.equal('Could not parse file "input.js" due to missing semicolons at line 10:12');
    expect(err.status).to.equal('FATAL');
  });

  it('should copy parameters passed to constructor generator functions to error instance', function() {
    var NotFoundError = generaterr('NotFoundError', { status : 404 });

    var notFoundError = new NotFoundError('Could find resource /api/random/numbers');
    expect(notFoundError.status).to.equal(404);
    expect(notFoundError.name).to.equal('NotFoundError');
  });

  it('should create an error with new if not invoked with "new" keyword', function() {
    var NotFoundError = generaterr('NotFoundError');

    var err = NotFoundError('Could find resource /api/random/numbers');

    expect(err).to.be.instanceof(NotFoundError);
    expect(err.message).to.equal('Could find resource /api/random/numbers');
  });

  it('should create an error with new if not invoked with "new" keyword with parameters', function() {
    var NotFoundError = generaterr('NotFoundError');

    var err = NotFoundError('Could find resource /api/random/numbers', { status : 'FATAL' });

    expect(err).to.be.instanceof(NotFoundError);
    expect(err.status).to.equal('FATAL');
    expect(err.message).to.equal('Could find resource /api/random/numbers');
  });

  it('should override error constructor properties', function() {
    var ExternalServiceError = generaterr('ExternalServiceError', { status : 500 });
    var url = 'http://localhost';

    var err = new ExternalServiceError('Communication with api api "%s" failed due to error', url, { status : 404 });

    expect(err.status).to.equal(404);
  });

  it('should inherit from passed error', function() {
    var SuperError = generaterr('ParentError');
    var InheritedError = generaterr('InheritedError', {}, { inherits : SuperError });

    var err = new InheritedError('Communication with api api "%s" failed due to error');

    expect(err).to.be.instanceof(SuperError);
  });
});
