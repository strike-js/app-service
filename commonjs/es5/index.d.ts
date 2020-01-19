export declare type FactoryFn<T> = (appService: AppService) => T | Promise<T>;
export declare type ServiceKey = string | Symbol;
export declare class AppService {
    _factories: Map<ServiceKey, FactoryFn<any>>;
    _pending: Map<ServiceKey, Promise<any>>;
    _services: Map<ServiceKey, any>;
    constructor();
    get<T>(key: ServiceKey): Promise<T>;
    set<T>(key: ServiceKey, createFn: FactoryFn<T>): this;
    setInstance<T>(key: ServiceKey, instance: T): this;
    get services(): Map<ServiceKey, any>;
}
