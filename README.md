# kld-transform-parser

- [Installation](#installation)
- [Usage](#usage)
- [Custom Handlers](#custom-handlers)

---

An event-driven SVG transform parser

# Installation

```npm install kld-transform-parser```

# Usage

```javascript
import {TransformParser, SampleHandler} from "kld-transform-parser";

const parser = new TransformParser();
const source = "matrix(1, 2, 3, 4, 5, 6)";

parser.setHandler(new SampleHandler());
parser.parseTransform(source);
```

## Result

```
matrix(1,2,3,4,5,6)
```

# Custom Handlers

When creating your own event handler, you will need to define methods for each event you wish to listen for. Below is a list of all events (method names) that may be fired during a parse.

- beginParse()
- endParse()
- matrix(a, b, c, d, e, f)
- scale(sx, sy)
- rotate(cx, cy)
- skewX(skewAngle)
- skewY(skewAngle)
