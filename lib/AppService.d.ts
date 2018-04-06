import { ICache } from './Cache';
export interface AppService {
    cache: ICache;
    readonly services: {
        [idx: string]: any;
    };
    setService<T>(key: string, createFn: (appService: AppService) => T): AppService;
    setInstance<T>(key: string, val: T): AppService;
    getService<T>(key: string): T;
}
/**
 * Creates a new app service container.
 */
export declare function createAppService(): {
    readonly services: {};
    cache: ICache;
    setService: <T>(key: string, createFn: (appService: AppService) => T) => AppService;
    getService: <T>(key: string) => T;
    setInstance: <T>(key: string, val: T) => AppService;
};
