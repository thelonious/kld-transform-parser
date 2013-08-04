/**
 *  SampleHandler.js
 *
 *  copyright 2005, 2013 Kevin Lindsey
 */

/**
 *  SampleHandler
 *
 *  @constructor
 */
function SampleHandler() {}

/**
 *  show
 *
 *  @param {String} name
 *  @param {String} params+
 */
SampleHandler.prototype.show = function(name, params) {
    var result = [];
    var args = [];

    for (var i = 0; i < params.length; i++ )
        args[i] = params[i];

    result.push(name);
    result.push("(");
    result.push(args.join(","));
    result.push(")");

    console.log("  " + result.join(""));
};

/**
 *  matrix
 *
 *  @param {Number} a
 *  @param {Number} b
 *  @param {Number} c
 *  @param {Number} d
 *  @param {Number} e
 *  @param {Number} f
 */
SampleHandler.prototype.matrix = function(a, b, c, d, e, f) {
    this.show("matrix", arguments);
};

/**
 *  translate
 *
 *  @param {Number} tx
 *  @param {Number} ty
 */
SampleHandler.prototype.translate = function(tx, ty) {
    this.show("translate", arguments);
};

/**
 *  scale
 *
 *  @param {Number} sx
 *  @param {Number} sy
 */
SampleHandler.prototype.scale = function(sx, sy) {
    this.show("scale", arguments);
};

/**
 *  rotate
 *
 *  @param {Number} rotate_angle
 *  @param {Number} cx
 *  @param {Number} cy
 */
SampleHandler.prototype.rotate = function(rotate_angle, cx, cy) {
    this.show("rotate", arguments);
};

/**
 *  skewX
 *
 *  @param {Number} skew_angle
 */
SampleHandler.prototype.skewX = function(skew_angle) {
    this.show("skewX", arguments);
};

/**
 *  skewY
 *
 *  @param {Number} skew_angle
 */
SampleHandler.prototype.skewY = function(skew_angle) {
    this.show("skewY", arguments);
};

if (typeof module !== "SampleHandler") {
    module.exports = SampleHandler;
}
