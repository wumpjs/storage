export class Storage extends Map {
  constructor() {
    super();
  };

  /**
   * @return {Number} Returns the size of the storage.
   */
  size = super.size;

  /**
   * Adds a new element with a specified key and value to the Storage. If an element with the same key already exists, the element will be updated.
   * @param {String} key
   * @param {any} value
   */
  set(key, value) {
    if (typeof key !== "string") throw new TypeError("Key must be a String.");
    return super.set(key, value);
  };

  /**
   * @param {String} key
   * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
   */
  get(key) {
    if (typeof key !== "string") throw new TypeError("Key must be a String.");
    return super.get(key);
  };

  /**
   * @param {String} key
   * @returns boolean indicating whether an element with the specified key exists or not.
   */
  has(key) {
    if (typeof key !== "string") throw new TypeError("Key must be a String.");
    return super.has(key);
  };

  /**
   * True if an element in the Storage existed and has been removed, or false if the element does not exist.
   * @param {String} key 
   * @returns {boolean | undefined}True if an element in the Storage existed and has been removed, or false if the element does not exist.
   */
  delete(key) {
    if (typeof key !== "string") throw new TypeError("Key must be a String.");
    if (!this.has(key)) throw new Error("There is no element with the specified key.");
    super.delete(key)
  };

  /**
   * 
   * @param {String} key 
   * @param {Number} value 
   * @returns subtracts as much as the given number from the data
   */
  substract(key, value) {
    console.log(this.typeof(key) !== "number")
    if (typeof key !== "string") throw new TypeError("Key must be a String.");
    if (typeof value !== "number") throw new TypeError("Value must be a number.");
    if(this.typeof(key) !== "number") throw new TypeError("Key value is not a number.");

    let newVal = this.get(key) - value;
    return this.set(key, newVal);
  };

  /** 
   * Clears all of the Storage.
   * @returns {null} Clears all of the Storage.
   */
  clear() {
   return super.clear();
  };

  /**
   * @param {Function} callback
   * @returns {any} Map's Storage.
   */
  map(callback) {
    if (typeof callback !== "function")
      throw new TypeError("Callback must be a Function.");

    let index = 0;
    const entries = this.entries();

    return Array.from({ length: this.size }, () => {
      const [key, value] = entries.next().value;

      callback(value, key, index, this);

      index++;
    });
  }

  /**
   * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
   * @param {(value: any, key: string, this: this)} callback
   * find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
   * @returns
   */
  find(callback) {
    if (typeof callback !== "function")
      throw new TypeError("Callback must be a Function.");
    for (const [key, value] of this) {
      if (callback(value, key, this)) return true;
    }

    return void 0;
  };

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param {(value: any, key: string, index: number, this: this )} callback A function that accepts up to three arguments. The filter method calls the callback function one time for each element in the array.
   */
  filter(callback) {
    if (typeof callback !== "function")
      throw new TypeError("Callback must be a Function.");

    const results = new this.constructor[Symbol.species]();

    let index = -1;

    for (const [key, value] of this) {
      if (callback(value, key, index, this)) results.set(key, value);
      index++;
    }

    return results;
  };

  /**
   * Checks key's type.
   * @param {String} key
   * @returns {any | undefined} Key type
   */
  typeof(key) {
    if (typeof key !== "string") throw new TypeError("Key must be a String.");
    return typeof super.get(key);
  };

  /**
   * @returns {JSONArray} Return's Storage as JSON format.
   */
  toJSON() {
    return JSON.stringify([...this]);
  };

  /**
   * @returns {Array} Returns an iterable of values in the Storage.
   */
  values() {
    return super.values();
  };

  /**
   * @returns {Array} Returns an iterable of keys in the map
   */
  keys() {
    return super.keys();
  };
}
