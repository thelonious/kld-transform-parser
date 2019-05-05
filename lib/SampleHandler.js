/* eslint-disable prefer-rest-params, no-empty-function */
/**
 *  SampleHandler.js
 *
 *  @copyright 2005, 2013 Kevin Lindsey
 */

"use strict";

/**
 *  SampleHandler
 *
 *  @class
 */
function SampleHandler() {
}

/**
 *  show
 *
 *  @param {string} name
 *  @param {Array<string>} params
 */
SampleHandler.prototype.show = function(name, ...params) {
    console.log(`${name}(${params.join(",")})`);
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
SampleHandler.prototype.matrix = function(a, b, c, d, e, f) {
    this.show("matrix", ...arguments);
};

/**
 *  translate
 *
 *  @param {number} tx
 *  @param {number} ty
 */
SampleHandler.prototype.translate = function(tx, ty) {
    this.show("translate", ...arguments);
};

/**
 *  scale
 *
 *  @param {number} sx
 *  @param {number} sy
 */
SampleHandler.prototype.scale = function(sx, sy) {
    this.show("scale", ...arguments);
};

/**
 *  rotate
 *
 *  @param {number} rotateAngle
 *  @param {number} cx
 *  @param {number} cy
 */
SampleHandler.prototype.rotate = function(rotateAngle, cx, cy) {
    this.show("rotate", ...arguments);
};

/**
 *  skewX
 *
 *  @param {number} skewAngle
 */
SampleHandler.prototype.skewX = function(skewAngle) {
    this.show("skewX", ...arguments);
};

/**
 *  skewY
 *
 *  @param {number} skewAngle
 */
SampleHandler.prototype.skewY = function(skewAngle) {
    this.show("skewY", ...arguments);
};

if (typeof module !== "undefined") {
    module.exports = SampleHandler;
}
