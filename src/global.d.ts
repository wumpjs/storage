import { StorageEvents as Events } from "./Events";

import { EventEmitter } from "node:events";

declare module "@wumpjs/storage" {
  export class Storage<V> extends EventEmitter {
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