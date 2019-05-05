/* eslint-disable prefer-rest-params, class-methods-use-this */
/**
 *  SampleHandler.js
 *
 *  @copyright 2005, 2013 Kevin Lindsey
 *  @module SampleHandler
 */

/**
 *  show
 *
 *  @param {string} name
 *  @param {Array<string>} params
 */
function show(name, ...params) {
    console.log(`${name}(${params.join(",")})`);
}

/**
 *  SampleHandler
 */
class SampleHandler {
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
    matrix(a, b, c, d, e, f) {
        show("matrix", ...arguments);
    }

    /**
     *  translate
     *
     *  @param {number} tx
     *  @param {number} ty
     */
    translate(tx, ty) {
        show("translate", ...arguments);
    }

    /**
     *  scale
     *
     *  @param {number} sx
     *  @param {number} sy
     */
    scale(sx, sy) {
        show("scale", ...arguments);
    }

    /**
     *  rotate
     *
     *  @param {number} rotateAngle
     *  @param {number} cx
     *  @param {number} cy
     */
    rotate(rotateAngle, cx, cy) {
        show("rotate", ...arguments);
    }

    /**
     *  skewX
     *
     *  @param {number} skewAngle
     */
    skewX(skewAngle) {
        show("skewX", ...arguments);
    }

    /**
     *  skewY
     *
     *  @param {number} skewAngle
     */
    skewY(skewAngle) {
        show("skewY", ...arguments);
    }
}

export default SampleHandler;
