export interface CacheGetter {
    <T>(key:string):Promise<T>; 
    <T>(key:string,fn:(cache:ICache)=>Promise<T>):Promise<T>; 
    <T,V>(key:string,fn:(cache:ICache)=>Promise<T>,transformer:(val:T)=>V):Promise<V>;
}

export interface CacheValueMerger {
    <T>(currentVal:T,newVal:T):T; 
}

export interface CacheStorageStrategy {
    store(key:string,payload:any):Promise<boolean>; 
    pull<T>(key:string):Promise<T>
}

/**
 * A cache object 
 */
export interface ICache {
    /**
     * Returns an item from cache given a key. 
     * A callback may be provided to get the item and then store it in the cache. 
     */
    get:CacheGetter; 
    /**
     * Sets an item in the cache. s
     */
    set<T>(key:string,val:T):ICache; 
}
/**
 * Creates a cache new object 
 */
export function createAdvancedCache(strategy:CacheStorageStrategy):ICache{
    var data = {};
    var o = null; 
    function get<T>(key:string):Promise<T>; 
    function get<T>(key:string,fn:(cache:ICache)=>Promise<T>):Promise<T>; 
    function get<T,V>(key:string,fn:(cache:ICache)=>Promise<T>,transformer:(val:T)=>V):Promise<V>;  
    function get(...args:any[]){
        if (args.length === 0){
            throw new Error('Item not found in cache.'); 
        }
        let key = args[0]; 
        let fn = args.length > 1?args[1]:undefined; 
        let transformFn = args.length > 2?args[2]:undefined; 
        if (!fn || data[key]){
            return new Promise((res,rej)=>{
                if (data[key]){
                    res(data[key]); 
                }else{
                    rej(); 
                }
            }); 
        }
        return fn(o)
            .then((c)=>{
                data[key] = transformFn?transformFn(c):c; 
                return data[key]; 
            });
    }

    function set<T>(key:string,val:T):ICache{
        data[key] = val; 
        return this; 
    }

    return o = {
        get,
        set
    };
};
