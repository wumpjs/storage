"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "StorageError", {
  enumerable: true,
  get: function () {
    return _StorageError.default;
  }
});
exports.default = void 0;
var _Storage = _interopRequireDefault(require("./build/Storage.js"));
var _StorageError = _interopRequireDefault(require("./build/StorageError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _Storage.default;
exports.default = _default;
