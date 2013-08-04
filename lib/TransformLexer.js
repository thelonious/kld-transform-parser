/**
 *  TransformLexer.js
 *
 *  copyright 2005, 2013 Kevin Lindsey
 */

var TransformLexeme = require('./TransformLexeme');

/**
 *  TransformLexer
 *
 *  @constructor
 *  @param {String} transformText
 */
function TransformLexer(transformText) {
    if ( transformText == null ) transformText = "";

    this.setTransformText(transformText);
}

/**
 *  setTransformText
 *
 *  @param {String} transformText
 */
TransformLexer.prototype.setTransformText = function(transformText) {
    if ( typeof(transformText) != "string" )
        throw new Error("TransformLexer.setTransformText: The first parameter must be a string");

    this._transformText = transformText;
};

/**
 *  getNextToken
 */
TransformLexer.prototype.getNextToken = function() {
    var result = null;
    var buffer = this._transformText;

    while ( result == null ) {
        if ( buffer == null || buffer == "" ) {
            result = new TransformLexeme(TransformLexeme.EOD, "");
        }
        else if ( buffer.match(/^([ \t\r\n,]+)/) )
        {
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(matrix)\b/) )
        {
            result = new TransformLexeme(TransformLexeme.MATRIX, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(translate)\b/) )
        {
            result = new TransformLexeme(TransformLexeme.TRANSLATE, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(scale)\b/) )
        {
            result = new TransformLexeme(TransformLexeme.SCALE, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(rotate)\b/) )
        {
            result = new TransformLexeme(TransformLexeme.ROTATE, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(skewX)\b/) )
        {
            result = new TransformLexeme(TransformLexeme.SKEWX, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(skewY)\b/) )
        {
            result = new TransformLexeme(TransformLexeme.SKEWY, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(\()/) )
        {
            result = new TransformLexeme(TransformLexeme.LPAREN, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(\))/) )
        {
            result = new TransformLexeme(TransformLexeme.RPAREN, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/) )
        {
            result = new TransformLexeme(TransformLexeme.NUMBER, parseFloat(RegExp.$1));
            buffer = buffer.substr(RegExp.$1.length);
        }
        else
        {
            throw new Error("TransformLexer.getNextToken: unable to tokenize text: " + buffer);
        }
    }

    this._transformText = buffer;

    return result;
};

if (typeof module !== "undefined") {
    module.exports = TransformLexer;
}
