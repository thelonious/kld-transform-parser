(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.KldIntersections = {}));
}(this, function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   *  TransformLexeme.js
   *
   *  @copyright 2005,2013 Kevin Lindsey
   */

  /**
   *  TransformLexeme
   *
   *  @param {Object} type
   *  @param {Object} text
   */
  var TransformLexeme =
  /*#__PURE__*/
  function () {
    function TransformLexeme(type, text) {
      _classCallCheck(this, TransformLexeme);

      this.type = type;
      this.text = text;
    }

    _createClass(TransformLexeme, [{
      key: "typeis",
      value: function typeis(type) {
        return this.type === type;
      }
    }]);

    return TransformLexeme;
  }();
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
   *  TransformLexer
   *
   *  @param {string} transformText
   */

  var TransformLexer =
  /*#__PURE__*/
  function () {
    function TransformLexer(transformText) {
      _classCallCheck(this, TransformLexer);

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


    _createClass(TransformLexer, [{
      key: "setTransformText",
      value: function setTransformText(transformText) {
        if (typeof transformText !== "string") {
          throw new Error("TransformLexer.setTransformText: The first parameter must be a string");
        }

        this._transformText = transformText;
      }
      /**
       *  getNextToken
       */

    }, {
      key: "getNextToken",
      value: function getNextToken() {
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
      }
    }]);

    return TransformLexer;
  }();

  /**
   *  TransformParser
   */

  var TransformParser =
  /*#__PURE__*/
  function () {
    function TransformParser() {
      _classCallCheck(this, TransformParser);

      this._lexer = new TransformLexer();
      this._handler = null;
    }
    /**
     *  parseTransform
     *
     *  @param {string} transformText
     */


    _createClass(TransformParser, [{
      key: "parseTransform",
      value: function parseTransform(transformText) {
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
      }
      /**
       *  setHandler
       *
       *  @param {Function} handler
       */

    }, {
      key: "setHandler",
      value: function setHandler(handler) {
        this._handler = handler;
      }
    }]);

    return TransformParser;
  }();
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

  /* eslint-disable prefer-rest-params, class-methods-use-this */

  /**
   *  SampleHandler.js
   *
   *  @copyright 2005, 2013 Kevin Lindsey
   */

  /**
   *  show
   *
   *  @param {string} name
   *  @param {Array<string>} params
   */
  function show(name) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    console.log("".concat(name, "(").concat(params.join(","), ")"));
  }
  /**
   *  SampleHandler
   */


  var SampleHandler =
  /*#__PURE__*/
  function () {
    function SampleHandler() {
      _classCallCheck(this, SampleHandler);
    }

    _createClass(SampleHandler, [{
      key: "matrix",

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
      value: function matrix(a, b, c, d, e, f) {
        show.apply(void 0, ["matrix"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  translate
       *
       *  @param {number} tx
       *  @param {number} ty
       */

    }, {
      key: "translate",
      value: function translate(tx, ty) {
        show.apply(void 0, ["translate"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  scale
       *
       *  @param {number} sx
       *  @param {number} sy
       */

    }, {
      key: "scale",
      value: function scale(sx, sy) {
        show.apply(void 0, ["scale"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  rotate
       *
       *  @param {number} rotateAngle
       *  @param {number} cx
       *  @param {number} cy
       */

    }, {
      key: "rotate",
      value: function rotate(rotateAngle, cx, cy) {
        show.apply(void 0, ["rotate"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  skewX
       *
       *  @param {number} skewAngle
       */

    }, {
      key: "skewX",
      value: function skewX(skewAngle) {
        show.apply(void 0, ["skewX"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  skewY
       *
       *  @param {number} skewAngle
       */

    }, {
      key: "skewY",
      value: function skewY(skewAngle) {
        show.apply(void 0, ["skewY"].concat(Array.prototype.slice.call(arguments)));
      }
    }]);

    return SampleHandler;
  }();

  // expose classes

  exports.SampleHandler = SampleHandler;
  exports.TransformLexer = TransformLexer;
  exports.TransformParser = TransformParser;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
