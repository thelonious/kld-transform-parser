#!/usr/bin/env node -r esm

import TransformParser from "../lib/TransformParser.js";
import SampleHandler from "../lib/SampleHandler.js";

const parser = new TransformParser();
const source = "matrix(1, 2, 3, 4, 5, 6)";

parser.setHandler(new SampleHandler());
parser.parseTransform(source);
