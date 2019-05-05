/**
 *  TransformLexer.js
 *
 *  @copyright 2005, 2013 Kevin Lindsey
 */

import TransformLexeme from "./TransformLexeme.js";


/**
 *  TransformLexer
 *
 *  @param {string} transformText
 */
class TransformLexer {
    constructor(transformText) {
        if (transformText === null || transformText === undefined) {
            transformText = "";
        }

        this.setTransformText(transformText);
    }

    /**
     *  setTransformText
     *
     *  @param {string} transformText
     */
    setTransformText(transformText) {
        if (typeof transformText !== "string") {
            throw new Error("TransformLexer.setTransformText: The first parameter must be a string");
        }

        this._transformText = transformText;
    }

    /**
     *  getNextToken
     */
    getNextToken() {
        let result = null;
        let buffer = this._transformText;

        while (result === null) {
            if (buffer === null || buffer === "") {
                result = new TransformLexeme(TransformLexeme.EOD, "");
            }
            else if (buffer.match(/^([ \t\r\n,]+)/)) {
                buffer = buffer.substr(RegExp.$1.length);
            }
            else if (buffer.match(/^(matrix)\b/)) {
                result = new TransformLexeme(TransformLexeme.MATRIX, RegExp.$1);
                buffer = buffer.substr(RegExp.$1.length);
            }
            else if (buffer.match(/^(translate)\b/)) {
                result = new TransformLexeme(TransformLexeme.TRANSLATE, RegExp.$1);
                buffer = buffer.substr(RegExp.$1.length);
            }
            else if (buffer.match(/^(scale)\b/)) {
                result = new TransformLexeme(TransformLexeme.SCALE, RegExp.$1);
                buffer = buffer.substr(RegExp.$1.length);
            }
            else if (buffer.match(/^(rotate)\b/)) {
                result = new TransformLexeme(TransformLexeme.ROTATE, RegExp.$1);
                buffer = buffer.substr(RegExp.$1.length);
            }
            else if (buffer.match(/^(skewX)\b/)) {
                result = new TransformLexeme(TransformLexeme.SKEWX, RegExp.$1);
                buffer = buffer.substr(RegExp.$1.length);
            }
            else if (buffer.match(/^(skewY)\b/)) {
                result = new TransformLexeme(TransformLexeme.SKEWY, RegExp.$1);
                buffer = buffer.substr(RegExp.$1.length);
            }
            else if (buffer.match(/^(\()/)) {
                result = new TransformLexeme(TransformLexeme.LPAREN, RegExp.$1);
                buffer = buffer.substr(RegExp.$1.length);
            }
            else if (buffer.match(/^(\))/)) {
                result = new TransformLexeme(TransformLexeme.RPAREN, RegExp.$1);
                buffer = buffer.substr(RegExp.$1.length);
            }
            /* eslint-disable-next-line unicorn/no-unsafe-regex */
            else if (buffer.match(/^(([-+]?\d+(\.\d*)?|[-+]?\.\d+)([eE][-+]?\d+)?)/)) {
                result = new TransformLexeme(TransformLexeme.NUMBER, parseFloat(RegExp.$1));
                buffer = buffer.substr(RegExp.$1.length);
            }
            else {
                throw new Error("TransformLexer.getNextToken: unable to tokenize text: " + buffer);
            }
        }

        this._transformText = buffer;

        return result;
    }
}

export default TransformLexer;
