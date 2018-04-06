export interface CacheGetter {
    <T>(key: string): Promise<T>;
    <T>(key: string, fn: (cache: ICache) => Promise<T>): Promise<T>;
    <T, V>(key: string, fn: (cache: ICache) => Promise<T>, transformer: (val: T) => V): Promise<V>;
}
export interface CacheValueMerger {
    <T>(currentVal: T, newVal: T): T;
}
export interface CacheStorageStrategy {
    store(key: string, payload: any): Promise<boolean>;
    pull<T>(key: string): Promise<T>;
}
/**
 * A cache object
 */
export interface ICache {
    /**
     * Returns an item from cache given a key.
     * A callback may be provided to get the item and then store it in the cache.
     */
    get: CacheGetter;
    /**
     * Sets an item in the cache. s
     */
    set<T>(key: string, val: T): ICache;
}
/**
 * Creates a cache new object
 */
export declare function createAdvancedCache(strategy: CacheStorageStrategy): ICache;