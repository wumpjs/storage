"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stringColorizer = _interopRequireDefault(require("string-colorizer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @abstract
 */
class DefaultError extends Error {
  /**
   * Create new Error instance.
   * @param {string} message 
   * @param {{ name?: string, stack?: string }} options
   * @constructor
   */
  constructor(message, options) {
    console.log();
    const errorColorizer = new _stringColorizer.default();
    const {
      styles
    } = errorColorizer;
    super(styles.bright(errorColorizer.foregroundColors.yellow(message)));
    Object.defineProperty(this, "name", {
      value: errorColorizer.styles.bright(errorColorizer.foregroundColors.red(`WumpStorageError[${options?.name ?? 'UnknownError'}]`)),
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, "stack", {
      value: options?.stack ?? this.stack,
      writable: false,
      configurable: false
    });
  }
  /**
   * Throw error.
   */
  throw() {
    throw this;
  }
}
;
class StorageError extends DefaultError {}
exports.default = StorageError;
;