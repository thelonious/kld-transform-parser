/**
 *  TransformLexeme.js
 *
 *  copyright 2005,2013 Kevin Lindsey
 */

/*
 *  token type enumerations
 */
TransformLexeme.UNDEFINED  = 0;
TransformLexeme.MATRIX     = 1;
TransformLexeme.TRANSLATE  = 2;
TransformLexeme.SCALE      = 3;
TransformLexeme.ROTATE     = 4;
TransformLexeme.SKEWX      = 5;
TransformLexeme.SKEWY      = 6;
TransformLexeme.LPAREN     = 7;
TransformLexeme.RPAREN     = 8;
TransformLexeme.NUMBER     = 9;
TransformLexeme.EOD        = 10;

/**
 *  TransformLexeme
 *
 *  @constructor
 *  @param {Object} type
 *  @param {Object} text
 */
function TransformLexeme(type, text) {
    if ( arguments.length > 0 ) {
        this.init(type, text);
    }
}

/**
 *  init
 *
 *  @param {Number} type
 *  @param {String} text
 */
TransformLexeme.prototype.init = function(type, text) {
    this.type = type;
    this.text = text;
};

/**
 *  typeis
 *
 *  @param {Number} type
 *  @return {Boolean} Returns true if this token matches the specified type
 */
TransformLexeme.prototype.typeis = function(type) {
    return this.type == type;
};

if (typeof module !== "undefined") {
    module.exports = TransformLexeme;
}
