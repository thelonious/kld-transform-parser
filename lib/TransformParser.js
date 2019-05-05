/**
 *  TransformParser.js
 *
 *  @copyright 2005, 2013 Kevin Lindsey
 */

import TransformLexer from "./TransformLexer.js";
import TransformLexeme from "./TransformLexeme.js";

/*
 *  class constants
 */
TransformParser.PARAMCOUNT = {
    matrix: [6],
    translate: [1, 2],
    scale: [1, 2],
    rotate: [1, 3],
    skewX: [1],
    skewY: [1]
};
TransformParser.METHODNAME = {
    matrix: "matrix",
    translate: "translate",
    scale: "scale",
    rotate: "rotate",
    skewX: "skewX",
    skewY: "skewY"
};

/**
 *  TransformParser
 *
 *  @class
 */
function TransformParser() {
    this._lexer = new TransformLexer();
    this._handler = null;
}

/**
 *  parseTransform
 *
 *  @param {string} transformText
 */
TransformParser.prototype.parseTransform = function(transformText) {
    if (typeof transformText !== "string") {
        throw new Error("TransformParser.parseTransform: The first parameter must be a string");
    }

    // init handler
    if (this._handler !== null && typeof this._handler.beginParse === "function") {
        this._handler.beginParse();
    }

    // pass the transformText to the lexer
    const lexer = this._lexer;

    lexer.setTransformText(transformText);

    // Process all tokens
    let token = lexer.getNextToken();

    while (token.typeis(TransformLexeme.EOD) === false) {
        let command;
        let paramCounts;
        const params = [];

        // process current token
        switch (token.type) {
            case TransformLexeme.MATRIX:
            case TransformLexeme.TRANSLATE:
            case TransformLexeme.SCALE:
            case TransformLexeme.ROTATE:
            case TransformLexeme.SKEWX:
            case TransformLexeme.SKEWY:
                command = token.text;
                paramCounts = TransformParser.PARAMCOUNT[command];

                // Advance past command token
                token = lexer.getNextToken();
                break;

            default:
                throw new Error("TransformParser.parseTransform: expected transform type: " + token.text);
        }

        // handle opening parenthesis
        if (token.type !== TransformLexeme.LPAREN) {
            throw new Error("TransformParser.parserTransform: expected opening parenthesis: " + token.text);
        }
        token = lexer.getNextToken();

        // Get parameters
        while (token !== TransformLexeme.EOD && token.type === TransformLexeme.NUMBER) {
            // convert current parameter to a float and add to
            // parameter list
            params.push(token.text - 0);

            // advance to next token
            token = lexer.getNextToken();
        }

        // verify parameter counts
        let valid = false;
        const actualCount = params.length;

        for (let i = 0; i < paramCounts.length; i++) {
            if (paramCounts[i] === actualCount) {
                valid = true;
                break;
            }
        }

        if (valid === false) {
            throw new Error("TransformParser.parserTransform: incorrect number of arguments for " + command);
        }

        // handle closing parenthesis
        if (token.type !== TransformLexeme.RPAREN) {
            throw new Error("TransformParser.parserTransform: expected closing parenthesis: " + token.text);
        }
        token = lexer.getNextToken();

        // fire handler
        if (this._handler !== null) {
            const handler = this._handler;
            const methodName = TransformParser.METHODNAME[command];

            if (handler !== null && typeof handler[methodName] === "function") {
                handler[methodName](...params);
            }
        }
    }
};

/**
 *  setHandler
 *
 *  @param {Function} handler
 */
TransformParser.prototype.setHandler = function(handler) {
    this._handler = handler;
};

export default TransformParser;
