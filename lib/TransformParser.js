/**
 *  TransformParser.js
 *
 *  copyright 2005, 2013 Kevin Lindsey
 */

var TransformLexer = require('./TransformLexer'),
    TransformLexeme = require('./TransformLexeme');

/*
 *  class constants
 */
TransformParser.PARAMCOUNT = {
    matrix:    [6],
    translate: [1, 2],
    scale:     [1, 2],
    rotate:    [1, 3],
    skewX:     [1],
    skewY:     [1]
};
TransformParser.METHODNAME = {
    matrix:    "matrix",
    translate: "translate",
    scale:     "scale",
    rotate:    "rotate",
    skewX:     "skewX",
    skewY:     "skewY"
}

/**
 *  TransformParser
 *
 *  @constructor
 */
function TransformParser() {
    this._lexer = new TransformLexer();
    this._handler = null;
}

/**
 *  parseTransform
 *
 *  @param {String} transformText
 */
TransformParser.prototype.parseTransform = function(transformText) {
    if ( typeof(transformText) != "string" )
        throw new Error("TransformParser.parseTransform: The first parameter must be a string");

    // init handler
    if ( this._handler != null && this._handler.beginParse != null )
        this._handler.beginParse();

    // pass the transformText to the lexer
    var lexer = this._lexer;
    lexer.setTransformText(transformText);

    // Process all tokens
    var token = lexer.getNextToken();
    while ( token.typeis(TransformLexeme.EOD) == false ) {
        var command;
        var param_counts;
        var params = new Array();

        // process current token
        switch ( token.type ) {
            case TransformLexeme.MATRIX:
            case TransformLexeme.TRANSLATE:
            case TransformLexeme.SCALE:
            case TransformLexeme.ROTATE:
            case TransformLexeme.SKEWX:
            case TransformLexeme.SKEWY:
                command = token.text;
                param_counts = TransformParser.PARAMCOUNT[command];

                // Advance past command token
                token = lexer.getNextToken();
                break;

            default:
                throw new Error("TransformParser.parseTransform: expected transform type: " + token.text);
        }

        // handle opening parenthesis
        if ( token.type != TransformLexeme.LPAREN ) {
            throw new Error("TransformParser.parserTransform: expected opening parenthesis: " + token.text);
        }
        token = lexer.getNextToken();

        // Get parameters
        while ( token != TransformLexeme.EOD && token.type == TransformLexeme.NUMBER ) {
            // convert current parameter to a float and add to
            // parameter list
            params.push(token.text - 0);

            // advance to next token
            token = lexer.getNextToken();
        }

        // verify parameter counts
        var valid = false;
        var actual_count = params.length;
        for ( var i = 0; i < param_counts.length; i++ ) {
            if ( param_counts[i] == actual_count ) {
                valid = true;
                break;
            }
        }

        if ( valid == false ) {
            throw new Error("TransformParser.parserTransform: incorrect number of arguments for " + command);
        }

        // handle closing parenthesis
        if ( token.type != TransformLexeme.RPAREN ) {
            throw new Error("TransformParser.parserTransform: expected closing parenthesis: " + token.text);
        }
        token = lexer.getNextToken();

        // fire handler
        if ( this._handler != null ) {
            var handler = this._handler;
            var method = TransformParser.METHODNAME[command];

            if ( handler[method] != null )
                handler[method].apply(handler, params);
        }
    }
};

/**
 *  setHandler
 *
 *  @param {Function} handler
 */
TransformParser.prototype.setHandler = function(handler) {
    //if ( typeof(handler) != "object" )
    //    throw new Error("TransformParser.setHandler: first parameter must be an object");

    this._handler = handler;
};

if (typeof module !== "undefined") {
    module.exports = TransformParser;
}
