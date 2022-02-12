(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "module", "./array", "./object"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module, require("./array"), require("./object"));
  }
})(function (exports, module, _array, _object) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  //
  // Consider importing individual functions:
  //
  //     // Using ES6:
  //     import asArray from "as/array";
  //
  //     // …or using CommonJS:
  //     var asArray = require("as/array");
  //

  var array = _interopRequire(_array);

  var object = _interopRequire(_object);

  module.exports = { array: array, object: object };
});