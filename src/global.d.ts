import { StorageEvents as Events } from "./enums/TSEvents";

import TypedEmitter from "typed-emitter";
import { EventEmitter } from "node:events";

declare module "@wumpjs/storage" {
  export type StorageEventsType<Val> = {
    dataSaved: (key: string, value: Val, data: Val) => any,
    dataDeleted: (key: string, data: Val) => any,
    dataFetched: (key: string, data: Val) => any,
    dataChecked: (key: string, has: boolean, data: Val) => any
    dataMapped: (callback: (value: Val, key: string, index: number, Storage: Storage<Val>) => Val) => any,
    dataSearched: (callback: (value: Val, key: string, Storage: Storage<Val>) => Val) => any,
    dataFiltered: (callback: (value: Val, key: string, index: number, Storage: Storage<Val>) => Val) => any,
    dataReversed: (entry: [string, Val][]) => any
    storageCleared: (keys: string[]) => any
    entriesFetched: (entries: IterableIterator<[string, Val]>) => any
    keysFetched: (keys: string[]) => any,
    valuesFetched: (values: Val[]) => any,
    convertedJSON: (keys: string[], values: Val[]) => any
  }

  export class Storage<V> extends (EventEmitter as new <Val>() => TypedEmitter<StorageEventsType<Val>>)<V> {
    private storage: Map<string, V>;

    private fetchStats(): { usedStorage: string; totalStorage: string };
    private convertSizeUnits(bytes: number): { KILOBYTE: number; MEGABYTE: number; GIGABYTE: number; TERABYTE: number };

    public constructor(size?: number);

    /**
     * Shows Total Size of Storage.
     */
    public readonly size: number;

    static readonly Events: Events;

    /**
     * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
     */
    public set(key: string, value: V): V;

    /**
     * Deletes the specified key.
     */
    public delete(key: string): V;

    /**
     * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
     */
    public fetch(key: string): V;

    /**
     * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
     */
    public get(key: string): V;

    /**
     * Boolean indicating whether an element with the specified key exists or not.
     */
    public exists(key: string): boolean;

    /**
     * Boolean indicating whether an element with the specified key exists or not.
     */
    public has(key: string): boolean;

    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     */
    public map(callback: (value: V, key: string, index: number, Storage: Storage<V>) => V): V[];

    /**
     * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
     */
    public find(callback: (value: V, key: string, Storage: Storage<V>) => unknown): V | undefined;

    /**
     * Reverses the elements in an array in place. This method mutates the array and returns a reference to the same array.
     */
    public reverse(): Storage<V>;

    /**
     * Clears storage.
     */
    public clear(): string[];

    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     */
    public filter(callback: (value: V, key: string, index: number, Storage: Storage<V>) => unknown): Storage<V>;

    /**
     * Retrieves the type of data of the specified key.
     */
    public type(key: string): string;
    
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    public entries(): IterableIterator<[string, V]>;

    /**
     * Lists keys in storage.
     */
    public keys(): string[];

    /**
     * Lists values in storage.
     */
    public values(): V[];

    /**
     * Converts storage to JSON.
     */
    public toJSON(): { keys: string[]; values: V[] };

    /**
     * Storage information.
     */
    public information(): { usedStorage: string; totalStorage: string };
  }
}
