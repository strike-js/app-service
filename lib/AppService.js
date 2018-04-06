"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache_1 = require("./Cache");
/**
 * Creates a new app service container.
 */
function createAppService() {
    var services = {};
    var factories = {};
    var cache = Cache_1.createCache();
    var o = null;
    function getService(key) {
        if (!services[key]) {
            if (!factories[key]) {
                throw new Error("No service with key " + key + " has been registered.");
            }
            services[key] = factories[key](o);
        }
        return services[key];
    }
    function setService(key, createFn) {
        if (services[key]) {
            console.warn("Service with " + key + " already registered");
        }
        factories[key] = createFn;
        return o;
    }
    function setInstance(key, val) {
        if (services[key]) {
            console.warn("Service with " + key + " already registered");
        }
        services[key] = val;
        return o;
    }
    return o = {
        get services() {
            return services;
        },
        cache: cache,
        setService: setService,
        getService: getService,
        setInstance: setInstance
    };
}
exports.createAppService = createAppService;
