/**
 *  TransformLexeme.js
 *
 *  @copyright 2005,2013 Kevin Lindsey
 */

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
/**
 *  TransformLexeme
 *
 *  @class
 *  @param {Object} type
 *  @param {Object} text
 */

function TransformLexeme(type, text) {
  this.init(type, text);
}
/**
 *  init
 *
 *  @param {number} type
 *  @param {string} text
 */


TransformLexeme.prototype.init = function (type, text) {
  this.type = type;
  this.text = text;
};
/**
 *  typeis
 *
 *  @param {number} type
 *  @returns {boolean} Returns true if this token matches the specified type
 */


TransformLexeme.prototype.typeis = function (type) {
  return this.type === type;
};

/**
 *  TransformLexer.js
 *
 *  @copyright 2005, 2013 Kevin Lindsey
 */
/**
 *  TransformLexer
 *
 *  @class
 *  @param {string} transformText
 */

function TransformLexer(transformText) {
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


TransformLexer.prototype.setTransformText = function (transformText) {
  if (typeof transformText !== "string") {
    throw new Error("TransformLexer.setTransformText: The first parameter must be a string");
  }

  this._transformText = transformText;
};
/**
 *  getNextToken
 */


TransformLexer.prototype.getNextToken = function () {
  var result = null;
  var buffer = this._transformText;

  while (result === null) {
    if (buffer === null || buffer === "") {
      result = new TransformLexeme(TransformLexeme.EOD, "");
    } else if (buffer.match(/^([ \t\r\n,]+)/)) {
      buffer = buffer.substr(RegExp.$1.length);
    } else if (buffer.match(/^(matrix)\b/)) {
      result = new TransformLexeme(TransformLexeme.MATRIX, RegExp.$1);
      buffer = buffer.substr(RegExp.$1.length);
    } else if (buffer.match(/^(translate)\b/)) {
      result = new TransformLexeme(TransformLexeme.TRANSLATE, RegExp.$1);
      buffer = buffer.substr(RegExp.$1.length);
    } else if (buffer.match(/^(scale)\b/)) {
      result = new TransformLexeme(TransformLexeme.SCALE, RegExp.$1);
      buffer = buffer.substr(RegExp.$1.length);
    } else if (buffer.match(/^(rotate)\b/)) {
      result = new TransformLexeme(TransformLexeme.ROTATE, RegExp.$1);
      buffer = buffer.substr(RegExp.$1.length);
    } else if (buffer.match(/^(skewX)\b/)) {
      result = new TransformLexeme(TransformLexeme.SKEWX, RegExp.$1);
      buffer = buffer.substr(RegExp.$1.length);
    } else if (buffer.match(/^(skewY)\b/)) {
      result = new TransformLexeme(TransformLexeme.SKEWY, RegExp.$1);
      buffer = buffer.substr(RegExp.$1.length);
    } else if (buffer.match(/^(\()/)) {
      result = new TransformLexeme(TransformLexeme.LPAREN, RegExp.$1);
      buffer = buffer.substr(RegExp.$1.length);
    } else if (buffer.match(/^(\))/)) {
      result = new TransformLexeme(TransformLexeme.RPAREN, RegExp.$1);
      buffer = buffer.substr(RegExp.$1.length);
    }
    /* eslint-disable-next-line unicorn/no-unsafe-regex */
    else if (buffer.match(/^(([-+]?\d+(\.\d*)?|[-+]?\.\d+)([eE][-+]?\d+)?)/)) {
        result = new TransformLexeme(TransformLexeme.NUMBER, parseFloat(RegExp.$1));
        buffer = buffer.substr(RegExp.$1.length);
      } else {
        throw new Error("TransformLexer.getNextToken: unable to tokenize text: " + buffer);
      }
  }

  this._transformText = buffer;
  return result;
};

/**
 *  TransformParser.js
 *
 *  @copyright 2005, 2013 Kevin Lindsey
 */
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


TransformParser.prototype.parseTransform = function (transformText) {
  if (typeof transformText !== "string") {
    throw new Error("TransformParser.parseTransform: The first parameter must be a string");
  } // init handler


  if (this._handler !== null && typeof this._handler.beginParse === "function") {
    this._handler.beginParse();
  } // pass the transformText to the lexer


  var lexer = this._lexer;
  lexer.setTransformText(transformText); // Process all tokens

  var token = lexer.getNextToken();

  while (token.typeis(TransformLexeme.EOD) === false) {
    var command = void 0;
    var paramCounts = void 0;
    var params = []; // process current token

    switch (token.type) {
      case TransformLexeme.MATRIX:
      case TransformLexeme.TRANSLATE:
      case TransformLexeme.SCALE:
      case TransformLexeme.ROTATE:
      case TransformLexeme.SKEWX:
      case TransformLexeme.SKEWY:
        command = token.text;
        paramCounts = TransformParser.PARAMCOUNT[command]; // Advance past command token

        token = lexer.getNextToken();
        break;

      default:
        throw new Error("TransformParser.parseTransform: expected transform type: " + token.text);
    } // handle opening parenthesis


    if (token.type !== TransformLexeme.LPAREN) {
      throw new Error("TransformParser.parserTransform: expected opening parenthesis: " + token.text);
    }

    token = lexer.getNextToken(); // Get parameters

    while (token !== TransformLexeme.EOD && token.type === TransformLexeme.NUMBER) {
      // convert current parameter to a float and add to
      // parameter list
      params.push(token.text - 0); // advance to next token

      token = lexer.getNextToken();
    } // verify parameter counts


    var valid = false;
    var actualCount = params.length;

    for (var i = 0; i < paramCounts.length; i++) {
      if (paramCounts[i] === actualCount) {
        valid = true;
        break;
      }
    }

    if (valid === false) {
      throw new Error("TransformParser.parserTransform: incorrect number of arguments for " + command);
    } // handle closing parenthesis


    if (token.type !== TransformLexeme.RPAREN) {
      throw new Error("TransformParser.parserTransform: expected closing parenthesis: " + token.text);
    }

    token = lexer.getNextToken(); // fire handler

    if (this._handler !== null) {
      var handler = this._handler;
      var methodName = TransformParser.METHODNAME[command];

      if (handler !== null && typeof handler[methodName] === "function") {
        handler[methodName].apply(handler, params);
      }
    }
  }
};
/**
 *  setHandler
 *
 *  @param {Function} handler
 */


TransformParser.prototype.setHandler = function (handler) {
  this._handler = handler;
};

/* eslint-disable prefer-rest-params, no-empty-function */

/**
 *  SampleHandler.js
 *
 *  @copyright 2005, 2013 Kevin Lindsey
 */

/**
 *  SampleHandler
 *
 *  @class
 */
function SampleHandler() {}
/**
 *  show
 *
 *  @param {string} name
 *  @param {Array<string>} params
 */


SampleHandler.prototype.show = function (name) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  console.log("".concat(name, "(").concat(params.join(","), ")"));
};
/**
 *  matrix
 *
 *  @param {number} a
 *  @param {number} b
 *  @param {number} c
 *  @param {number} d
 *  @param {number} e
 *  @param {number} f
 */


SampleHandler.prototype.matrix = function (a, b, c, d, e, f) {
  this.show.apply(this, ["matrix"].concat(Array.prototype.slice.call(arguments)));
};
/**
 *  translate
 *
 *  @param {number} tx
 *  @param {number} ty
 */


SampleHandler.prototype.translate = function (tx, ty) {
  this.show.apply(this, ["translate"].concat(Array.prototype.slice.call(arguments)));
};
/**
 *  scale
 *
 *  @param {number} sx
 *  @param {number} sy
 */


SampleHandler.prototype.scale = function (sx, sy) {
  this.show.apply(this, ["scale"].concat(Array.prototype.slice.call(arguments)));
};
/**
 *  rotate
 *
 *  @param {number} rotateAngle
 *  @param {number} cx
 *  @param {number} cy
 */


SampleHandler.prototype.rotate = function (rotateAngle, cx, cy) {
  this.show.apply(this, ["rotate"].concat(Array.prototype.slice.call(arguments)));
};
/**
 *  skewX
 *
 *  @param {number} skewAngle
 */


SampleHandler.prototype.skewX = function (skewAngle) {
  this.show.apply(this, ["skewX"].concat(Array.prototype.slice.call(arguments)));
};
/**
 *  skewY
 *
 *  @param {number} skewAngle
 */


SampleHandler.prototype.skewY = function (skewAngle) {
  this.show.apply(this, ["skewY"].concat(Array.prototype.slice.call(arguments)));
};

// expose classes

export { SampleHandler, TransformLexer, TransformParser };
