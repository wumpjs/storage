export class Storage extends Map {
  constructor() { super(); }

  /**
   * Adds a new element with a specified key and value to the Storage. If an element with the same key already exists, the element will be updated.
   * @param {String} key
   * @param {any} value
   */
  set(key, value) {
    if (typeof key !== 'string') return new TypeError("Key must be a String.");
    return super.set(key, value);
  }

  /**
   * @param {String} key
   * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
   */
  get(key) {
    if (typeof key !== 'string') return new TypeError("Key must be a String.");
    return super.get(key);
  }

  /**
   * @param {String} key
   * @returns boolean indicating whether an element with the specified key exists or not.
   */
  has(key) {
    if (typeof key !== 'string') return new TypeError("Key must be a String.");
    return super.has(key);
  }

  /**
   * @param {Function} callback
   * @returns Map's Storage.
   */
  map(callback) {
    if (typeof callback !== 'function') return new TypeError("Callback must be a Function.");
    
      let index = 0;
      const entries = this.entries();
  
      return Array.from({ length: this.size }, () => {
        const [key, value] = entries.next().value;
  
        callback(value, key, index, this);
  
        index++;
      });
  }

  /**
   * -- açıklama bulamadım --
   * @param {function} callback
   * @returns any
   */
  find(callback) {
    if (typeof callback !== 'function')
      return new TypeError("Callback must be a Function.");
      for (const [key, value] of this) {
        if (callback(value, key, this)) return true;
      };
  
      return void 0;
  }

  /**
   * -- açıklama bulamadım --
   * @param {Function} callback
   * @returns any
   */
  filter(callback) {
    if (typeof callback !== 'function')
      return new TypeError("Callback must be a Function.");
    const results = [];
    for (const [key, value] of this) {
      if (callback(key, value)) {
        results.push(value);
      }
    }
    return results;
  }

  /**
   * Checks key's type.
   * @param {String} key 
   */
  typeof(key) {
    if (typeof key !== 'string') return new TypeError("Key must be a String.");
    return typeof super.get(key);
  }

  /**
   * @returns Return's Storage as JSON format.
   */
  toJSON() {
    return JSON.stringify([...this]);
  }

  /**
   * @returns Returns an iterable of values in the Storage.
   */
  values() {
    return super.values;
  }

  /**
   * @returns Returns an iterable of keys in the map
   */
  keys() {
    return super.keys;
  }
}
