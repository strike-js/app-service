declare module "strikejs-app-service" {
    export interface AppService {
        cache:ICache;
        setService<T>(key:string,createFn:(appService:AppService)=>T):AppService;
        setInstance<T>(key:string,val:T):AppService; 
        getService<T>(key:string):T; 
    }
    
    export interface CacheGetter {
        <T>(key:string):Promise<T>; 
        <T>(key:string,fn:(cache:ICache)=>Promise<T>):Promise<T>; 
        <T,V>(key:string,fn:(cache:ICache)=>Promise<T>,transformer:(val:T)=>V):Promise<V>; 
    }
    
    export interface ICache {
        get:CacheGetter; 
        set<T>(key:string,val:T):ICache; 
    }
    export function createCache():ICache; 

    export function createAppService(); 
}