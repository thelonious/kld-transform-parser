import TransformParser from "../lib/TransformParser.js";
import SampleHandler from "../lib/SampleHandler.js";

describe("Parser", () => {
    it("parseTransform", () => {
        const parser = new TransformParser();
        const source = "matrix(1, 2, 3, 4, 5, 6)";

        parser.setHandler(new SampleHandler());
        parser.parseTransform(source);
    });
});
