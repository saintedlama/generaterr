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
    var ParseError = generaterr('ParseError', { captureStackTrace : false });

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
});