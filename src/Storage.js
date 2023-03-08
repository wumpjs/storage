import { Checker } from "@wumpjs/providers";

import EventEmitter from "node:events";

import { StorageEvents as Events } from "./enums/JSEvents.js";

const percent = (a, b) => ((a / b) * 100).toFixed(2);

export class Storage extends EventEmitter {
  constructor(size = 128000) {
    super();

    this.setMaxListeners(0);

    const sizeChecker = new Checker(size);
    sizeChecker.createError(sizeChecker.isNotNumber, "size", { expected: "Number" }).throw();

    this.storageSize = Number(size).toFixed();

    /**
     * @private
     */
    this.storage = new Map();
  };

  static Events = Events;

  size = 0;

  set(key, value) {
    const keyChecker = new Checker(key);
    keyChecker.createError(keyChecker.isNotString, "key", { expected: "String" }).throw();

    const limited = new Checker(this.size)
    limited.createError(this.size > this.storageSize, "storage", { errorType: "Data Limit Exceeded", expected: this.size, received: this.storageSize }).throw();

    this.storage.set(key, value);

    const data = this.fetch(key);

    this.emit(Events.DataSaved, key, value, data);

    this.size++;

    return data;
  };

  delete(key) {
    const keyChecker = new Checker(key);
    keyChecker.createError(keyChecker.isNotString, "key", { expected: "String" }).throw();

    const data = this.fetch(key);
    this.storage.delete(key);

    this.emit(Events.DataDeleted, key, data);

    this.size--;

    return data;
  };

  fetch(key) {
    const keyChecker = new Checker(key);
    keyChecker.createError(keyChecker.isNotString, "key", { expected: "String" }).throw();

    const data = this.storage.get(key);

    this.emit(Events.DataFetched, key, data);

    return data;
  };

  get = this.fetch;

  exists(key) {
    const keyChecker = new Checker(key);
    keyChecker.createError(keyChecker.isNotString, "key", { expected: "String" }).throw();

    const has = this.storage.has(key);

    let data = null;
    if (has) data = this.fetch(key);

    this.emit(Events.DataChecked, key, has, data);

    return has;
  };

  has = this.exists;

  map(callback) {
    const callbackChecker = new Checker(callback);
    callbackChecker.createError(callbackChecker.isNotFunction, "callback", { expected: "Function" }).throw();

    let index = -1;

    const entries = this.entries();

    this.emit(Events.DataMapped, callback);

    return Array.from({ length: this.size }, () => {
      const [key, value] = entries.next().value;

      index++;
      return callback(value, key, index, this);
    });
  };

  find(callback) {
    const callbackChecker = new Checker(callback);
    callbackChecker.createError(callbackChecker.isNotFunction, "callback", { expected: "Function" }).throw();

    for (const [key, value] of this.storage) {
      if (callback(value, key, this)) return true;
    };

    this.emit(Events.DataSearched, callback);

    return void 0;
  };

  reverse() {
    const entries = [...this.entries()].reverse();

    this.clear();

    for (const [key, value] of entries) {
      this.set(key, value);

      this.size++;
    };

    this.emit(Events.DataReversed, entries);

    return this;
  };

  clear() {
    this.size = 0;

    const keys = this.keys();

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const data = this.get(key);

      this.delete(key);

      this.emit(Events.DataDeleted, key, data);
    };

    this.emit(Events.StorageCleared, keys);

    return keys;
  };

  filter(callback) {
    const callbackChecker = new Checker(callback);
    callbackChecker.createError(callbackChecker.isNotFunction, "callback", { expected: "Function" }).throw();

    const results = new this.storage.constructor[Symbol.species]();

    let index = 0;

    for (const [key, value] of this.storage) {
      if (callback(value, key, index, this)) results.set(key, value);
      index++;
    };

    this.emit(Events.DataFiltered, results);

    return results;
  };

  type(key) {
    const keyChecker = new Checker(key);
    keyChecker.createError(keyChecker.isNotString, "key", { expected: "String" }).throw();

    const value = this.fetch(key);

    return (typeof value);
  };

  entries() {
    const entry = this.storage.entries();

    this.emit(Events.EntriesFetched, entry);

    return entry;
  };

  keys() {
    const keysArray = this.toJSON().keys;

    this.emit(Events.KeysFetched, keysArray);

    return keysArray;
  };

  values() {
    const valuesArray = this.toJSON().values;

    this.emit(Events.ValuesFetched, valuesArray);

    return valuesArray;
  };

  toJSON() {
    const keys = this.storage.keys();
    const values = this.storage.values();

    this.emit(Events.ConvertedJSON, [...keys], [...values]);

    return { keys: [...keys], values: [...values] };
  };

  information() {
    const stats = this.#fetchStats();

    return stats;
  };

  #fetchStats() {
    const usedStorage = Number(this.size);
    const totalSize = Number(this.storageSize);

    const usedStoragePercentage = percent(usedStorage, totalSize);
    const totalSizePercentage = percent(totalSize, usedStorage);

    const usedStorageUnits = this.#convertSizeUnits(usedStorage);
    const usedStorageKiloByte = `${usedStorageUnits.KILOBYTE}KB`;
    const usedStorageMegaByte = `${usedStorageUnits.MEGABYTE}MB`;
    const usedStorageGigaByte = `${usedStorageUnits.GIGABYTE}GB`;
    const usedStorageTeraByte = `${usedStorageUnits.TERABYTE}TB`;

    const totalSizeUnits = this.#convertSizeUnits(totalSize);
    const totalSizeKiloByte = `${totalSizeUnits.KILOBYTE}KB`;
    const totalSizeMegaByte = `${totalSizeUnits.MEGABYTE}MB`;
    const totalSizeGigaByte = `${totalSizeUnits.GIGABYTE}GB`;
    const totalSizeTeraByte = `${totalSizeUnits.TERABYTE}TB`;

    const usedStorageOutput = `[Storage] ½${usedStoragePercentage} storage space was used. (${usedStorageKiloByte} | ${usedStorageMegaByte} | ${usedStorageGigaByte} | ${usedStorageTeraByte}) `;
    const totalSizeOutput = `[Storage(ExperimentalFeature)] ½${totalSizePercentage} data covers in storage. (${totalSizeKiloByte} | ${totalSizeMegaByte} | ${totalSizeGigaByte} | ${totalSizeTeraByte}) `;

    return { usedStorage: usedStorageOutput, totalSize: totalSizeOutput };
  };

  #convertSizeUnits(bytes) {
    const KILOBYTE = (bytes * 1024);
    const MEGABYTE = (KILOBYTE / 1024);
    const GIGABYTE = (MEGABYTE / 1024);
    const TERABYTE = (GIGABYTE / 1024);

    return { KILOBYTE: KILOBYTE.toFixed(1), MEGABYTE: MEGABYTE.toFixed(1), GIGABYTE: GIGABYTE.toFixed(1), TERABYTE: TERABYTE.toFixed(1) };
  };
};