import { createCache, ICache } from './Cache';

export interface AppService {
    cache:ICache;
    readonly services:{[idx:string]:any};
    setService<T>(key:string,createFn:(appService:AppService)=>T):AppService;
    setInstance<T>(key:string,val:T):AppService; 
    getService<T>(key:string):T; 
}

/**
 * Creates a new app service container. 
 */
export function createAppService(){
    var services = {}; 
    var factories = {}; 
    var cache = createCache(); 
    var o:AppService = null; 
    function getService<T>(key:string):T{
        if (!services[key]){
            if (!factories[key]){
                throw new Error(`No service with key ${key} has been registered.`);
            }
            services[key] = factories[key](o); 
        }
        return services[key]; 
    }

    function setService<T>(key:string,createFn:(appService:AppService)=>T):AppService {
        if (services[key]){
            console.warn(`Service with ${key} already registered`);
        }
        factories[key] = createFn; 
        return o; 
    }

    function setInstance<T>(key:string,val:T){
        if (services[key]){
            console.warn(`Service with ${key} already registered`);
        }
        services[key] = val; 
        return o; 
    }
    
    return o = {
        get services(){
            return services; 
        },
        cache, 
        setService,
        getService,
        setInstance
    };
}