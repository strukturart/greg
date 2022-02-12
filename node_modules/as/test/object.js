var test = require("tape");
var asObject = require("../test.modules/object");

test("as/object", function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);


  // Basic functionality
  // -----------------------------------------------------------------------------------------------

  [ [ asObject(
      [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      ])
    , {a: "b", c: "d"}
    , "should do the job for a simple array"
    ]

  , [ asObject(
      [ {key: "_-a", value: "b"}
      , {key: "1@'ć /=\\\"", value: "d"}
      , {key: "ಠ_ಠ", value: "it works!"}
      ])
    , { "_-a": "b"
      , "1@'ć /=\\\"": "d"
      , "ಠ_ಠ": "it works!"
      }
    , "should work with special characters and unicode"
    ]

  , [ asObject([])
    , {}
    , "should return `{}` for an empty array"
    ]

  , [ asObject(
      [ {key: "a", value: null}
      , {key: "b", value: 0}
      , {key: "c", value: true}
      , {key: "d", value: false}
      , {key: "e", value: undefined}
      , {key: "f", value: "string"}
      , {key: "g", value: ""}
      , {key: "h", value: ["array"]}
      ])
    , { a: null
      , b: 0
      , c: true
      , d: false
      , e: undefined
      , f: "string"
      , g: ""
      , h: ["array"]
      }
    , "should work for various data types"
    ]

  , [ asObject(
      [ {key: "a", value: "b"}
      , null
      , {key: "c", value: "d"}
      , undefined
      , {}
      , "a string"
      , true
      , {another: "structure", value: "anything"}
      , NaN
      , 10
      ])
    , {a: "b", c: "d"}
    , "should ignore values which don't match the `{key, value}` structure"
    ]


  // `options.depth`
  // -----------------------------------------------------------------------------------------------

  , [ asObject(
      [ {key: "a", value: "b"}
      , {key: "c", value: [{key: "d", value: "e"}]}
      ])
    , {a: "b", c: [{key: "d", value: "e"}]}
    , "should map shallowly by default"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: [{key: "d", value: "e"}]}
        ]
      , {depth: 2}
      )
    , {a: "b", c: {d: "e"}}
    , "should map two levels deep"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: [ {key: "d", value: "e"}
                            , {key: "f", value: [{key: "g", value: "h"}]}
                            ]}
        ]
      , {depth: 2}
      )
    , {a: "b", c: {d: "e", f: [{key: "g", value: "h"}]}}
    , "should map only two levels deep"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: [ {key: "d", value: "e"}
                            , {key: "f", value: [{key: "g", value: "h"}]}
                            ]}
        ]
      , {depth: Infinity}
      )
    , {a: "b", c: {d: "e", f: {g: "h"}}}
    , "should map deeply"
    ]

  ].map(deepEqual);

  tape.end();
  });
