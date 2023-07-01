import Colorizer from "string-colorizer";

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
    console.log()
    const errorColorizer = new Colorizer()
    const { styles } = errorColorizer
    super(styles.bright(errorColorizer.foregroundColors.yellow(message)));
    Object.defineProperty(this, "name", {
      value: errorColorizer.styles.bright(errorColorizer.foregroundColors.red(`WumpStorageError[${options?.name ?? 'UnknownError'}]`)),
      writable: false,
      configurable: false
    })
    Object.defineProperty(this, "stack", {
      value: options?.stack ?? this.stack,
      writable: false,
      configurable: false
    })
  };

  /**
   * Throw error.
   */
  throw() {
    throw this;
  };
};

export default class StorageError extends DefaultError {};