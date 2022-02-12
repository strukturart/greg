var test = require("tape");
var asObject = require("../test.modules/object");
var asArray = require("../test.modules/array");

test("as/array >> as/object", function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);


  // Basic functionality
  // -----------------------------------------------------------------------------------------------

  [ [ asObject(asArray({a: "b", c: "d"}))
    , {a: "b", c: "d"}
    , "shouldn't change a simple object"
    ]

  , [ asObject(asArray({}))
    , {}
    , "shouldn't change an empty object"
    ]

  , [ asObject(asArray(
      { a: null
      , b: 0
      , c: true
      , d: false
      , e: undefined
      , f: "string"
      , g: ""
      , h: ["array"]
      }))
    , { a: null
      , b: 0
      , c: true
      , d: false
      , e: undefined
      , f: "string"
      , g: ""
      , h: ["array"]
      }
    , "shouldn't change an object with various data types"
    ]

  , [ asObject(asArray
      ( {a: "b", c: "d", e: {f: "g", h: {i: "j"}}}
      ))
    , {a: "b", c: "d", e: {f: "g", h: {i: "j"}}}
    , "shouldn't change a nested object"
    ]

  , [ asObject(asArray
      ( {a: "b", c: "d", e: {f: "g", h: {i: "j"}}}
      , {depth: 2}
      ), {depth: 2})
    , {a: "b", c: "d", e: {f: "g", h: {i: "j"}}}
    , "shouldn't change a nested object mapped to a specific depth"
    ]

  , [ asObject(asArray
      ( {a: "b", c: "d", e: {f: "g", h: {i: "j"}}}
      , {depth: Infinity}
      ), {depth: Infinity})
    , {a: "b", c: "d", e: {f: "g", h: {i: "j"}}}
    , "shouldn't change a nested object mapped deeply"
    ]

  ].map(deepEqual);

  tape.end();
  });
