var test = require("tape");
var asArray = require("../test.modules/array");


test("as/array: basics", function (is) {
  // Basic functionality
  // -----------------------------------------------------------------------------------------------

  [ [ asArray({a: "b", c: "d"})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      ]
    , "should do the job for a simple array"
    ]

  , [ asArray(
      { "_-a": "b"
      , "1@'ć /=\\\"": "d"
      , "ಠ_ಠ": "it works!"
      })
    , [ {key: "_-a", value: "b"}
      , {key: "1@'ć /=\\\"", value: "d"}
      , {key: "ಠ_ಠ", value: "it works!"}
      ]
    , "should work with special characters and unicode"
    ]

  , [ asArray({})
    , []
    , "should return `[]` for an empty object"
    ]

  , [ asArray(
      { a: null
      , b: 0
      , c: true
      , d: false
      , e: undefined
      , f: "string"
      , g: ""
      , h: ["array"]
      , i: {object: "object"}
      })
    , [ {key: "a", value: null}
      , {key: "b", value: 0}
      , {key: "c", value: true}
      , {key: "d", value: false}
      , {key: "e", value: undefined}
      , {key: "f", value: "string"}
      , {key: "g", value: ""}
      , {key: "h", value: ["array"]}
      , {key: "i", value: {object: "object"}}
      ]
    , "should work for various data types"
    ]
  ].map(function (testCase) {is.deepEqual.apply(null, testCase);});

  is.end();
  });


test("as/array: options.depth", function (is) {
  [ [ asArray({a: "b", c: "d", e: {f: "g"}})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: {f: "g"}}
      ]
    , "should map shallowly by default"
    ]

  , [ asArray({a: "b", c: "d", e: {f: "g"}}, {depth: 2})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: [ {key: "f", value: "g"}
                          ]}
      ]
    , "should map two levels deep"
    ]

  , [ asArray({a: "b", c: "d", e: {f: "g", h: {i: "j"}}}, {depth: 2})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: [ {key: "f", value: "g"}
                          , {key: "h", value: {i: "j"}}
                          ]}
      ]
    , "should map only two levels deep"
    ]

  , [ asArray({a: "b", c: "d", e: {f: "g", h: {i: "j"}}}, {depth: Infinity})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: [ {key: "f", value: "g"}
                          , {key: "h", value: [{key: "i", value: "j"}]}
                          ]}
      ]
    , "should map deeply"
    ]

  ].map(function (testCase) {is.deepEqual.apply(null, testCase);});

  is.end();
  });


test("as/array: options.keepArrays", function (is) {
  [ [ asArray(["a", "b"])
    , ["a", "b"]
    , "should keep arrays by default"
    ]

  , [ asArray(["a", "b"], {transformArrays: true})
    , [ {key: "0", value: "a"}
      , {key: "1", value: "b"}
      ]
    , "should transform arrays when told to"
    ]

  , [ asArray({array: ["a", "b"]}, {depth: Infinity})
    , [ { key: "array"
        , value:
          ["a", "b"]
        }
      ]
    , "should keep nested arrays by default when mapping deeply"
    ]

  , [ asArray({array: ["a", "b"]}, {depth: Infinity, transformArrays: true})
    , [ { key: "array"
        , value:
          [ {key: "0", value: "a"}
          , {key: "1", value: "b"}
          ]
        }
      ]
    , "should transform nested arrays when told to when mapping deeply"
    ]

  ].map(function (testCase) {is.deepEqual.apply(null, testCase);});

  is.end();
  });
