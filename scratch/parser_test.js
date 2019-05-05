#!/usr/bin/env node

"use strict";

const TransformParser = require("../lib/TransformParser");
const SampleHandler = require("../lib/SampleHandler");

const parser = new TransformParser();
const source = "matrix(1, 2, 3, 4, 5, 6)";

parser.setHandler(new SampleHandler());
parser.parseTransform(source);
