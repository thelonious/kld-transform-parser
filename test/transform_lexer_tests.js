var TransformLexer = require('../lib/TransformLexer');

exports.matrix = function(beforeExit, assert) {
    var lexer = new TransformLexer();
    var source = "matrix(1, 2, 3, 4, 5, 6)";

    lexer.setTransformText(source);

    var token = lexer.getNextToken();

    while ( !token.typeis(10)) {
        console.log(token.type + ":" + token.text);
        token = lexer.getNextToken();
    }
};
