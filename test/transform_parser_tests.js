var TransformParser = require('../lib/TransformParser');
var SampleHandler = require('../lib/SampleHandler');

exports.matrix = function(beforeExit, assert) {
    var parser = new TransformParser();
    var source = "matrix(1, 2, 3, 4, 5, 6)";

    parser.setHandler(new SampleHandler());
    parser.parseTransform(source);
};
