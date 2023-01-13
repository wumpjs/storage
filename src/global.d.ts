import { StorageEvents as Events } from "./Events";
import TypedEmitter from "typed-emitter"
import { EventEmitter } from "node:events";

declare module "@wumpjs/storage" {
  export type StorageEventsType<V extends any = any> = {
     dataSaved: (key: string, value: V, data: V) => any,
     dataDeleted: (key: string, data: V) => any,
     dataFetched: (key: string, data: V) => any,
     dataChecked: (key: string, has: boolean, data: V) => any
     dataMapped: (callback: (value: V, key: string, index: number, Storage: Storage<V>) => V) => any,
     dataSearched: (callback: (value: V, key: string, Storage: Storage<V>) => V) => any,
     dataFiltered: (callback: (value: V, key: string, index: number, Storage: Storage<V>) => V) => any,
     dataReversed: (entry: [string, V][]) => any
     storageCleared: (keys: string[]) => any
     entriesFetched: (entries: IterableIterator<[string, V]>) => any
     keysFetched: (keys: string[]) => any,
     valuesFetched: (values: V[]) => any,
     convertedJSON: (keys: string[], values: V[]) => any
  }
  export class Storage<V extends any = any> extends (EventEmitter as new<V extends any = any>() => TypedEmitter<StorageEventsType<V>>)<V> {
    private STORAGE: Map<string, V>;

    private fetchStats(): { usedStorage: string; totalStorage: string };
    private convertSizeUnits(bytes: number): { KILOBYTE: number; MEGABYTE: number; GIGABYTE: number; TERABYTE: number };

    public constructor(size?: number);
    public readonly size: number;

    static readonly Events: typeof Events;

    public set(key: string, value: V): V;
    public delete(key: string): V;
    public fetch(key: string): V;
    public get(key: string): V;
    public exists(key: string): boolean;
    public has(key: string): boolean;
    public map(callback: (value: V, key: string, index: number, Storage: Storage<V>) => any): void[];
    public find(callback: (value: V, key: string, Storage: Storage<V>) => any): boolean | undefined;
    public reverse(): Storage<V>;
    public clear(): string[];
    public filter(callback: (value: V, key: string, index: number, Storage: Storage<V>) => any): any;
    public type(key: string): string;
    public entries(): IterableIterator<[string, V]>;
    public keys(): string[];
    public values(): V[];
    public toJSON(): { keys: string[]; values: V[] };
    public information(): { usedStorage: string; totalStorage: string };
  }
}
