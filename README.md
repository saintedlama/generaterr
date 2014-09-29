# Generaterr

Generates custom and valid node.js error functions for node.js.

## Installation

    npm install generaterr --save

## Usage

Basis Usage

    var ParseError = generaterr('ParseError');

    try
    {
      throw new ParseError('Could not parse file due to missing semicolons');
    } catch(e) {
      console.log(e.message);
      console.log(e.name);
      console.log(e.stack);
    }

Formatting messages
    var ParseError = generaterr('ParseError');

    try
    {
      throw new ParseError('Could not parse file "%s" due to missing semicolons at line %d:%d', 'input.js', 10, 12);
    } catch(e) {
      // Message: 'Could not parse file "input.js" due to missing semicolons at line 10:12'
    }

## Options

#### captureStackTrace, defaults to 'true'
Turning off stack trace generation may be useful for business logic exceptions that do not require a stack trace.

    var ParseError = generaterr('ParseError', { captureStackTrace : false });
