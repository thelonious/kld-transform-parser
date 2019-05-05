/**
 *  TransformLexeme.js
 *
 *  @copyright 2005,2013 Kevin Lindsey
 *  @module TransformLexeme
 */

/**
 *  TransformLexeme
 */
class TransformLexeme {
    /**
     *  @param {number} type
     *  @param {string} text
     */
    constructor(type, text) {
        this.type = type;
        this.text = text;
    }

    /**
     *  @param {number} type
     *  @returns {boolean}
     */
    typeis(type) {
        return this.type === type;
    }
}

/*
 *  token type enumerations
 */
TransformLexeme.UNDEFINED = 0;
TransformLexeme.MATRIX = 1;
TransformLexeme.TRANSLATE = 2;
TransformLexeme.SCALE = 3;
TransformLexeme.ROTATE = 4;
TransformLexeme.SKEWX = 5;
TransformLexeme.SKEWY = 6;
TransformLexeme.LPAREN = 7;
TransformLexeme.RPAREN = 8;
TransformLexeme.NUMBER = 9;
TransformLexeme.EOD = 10;

export default TransformLexeme;
