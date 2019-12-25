"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function serviceKeyToString(key) {
    if (typeof key === 'string') {
        return key;
    }
    return key.toString();
}
class AppService {
    constructor() {
        this._factories = new Map();
        this._services = new Map();
    }
    async get(key) {
        if (!this._services.has(key)) {
            if (!this._factories.has(key)) {
                throw new Error(`No service with key ${key} has been registered.`);
            }
            const svc = this._factories.get(key)(this);
            let result = svc;
            if (typeof result['then'] === 'function') {
                result = await svc;
            }
            this._services.set(key, result);
        }
        return this._services.get(key);
    }
    set(key, createFn) {
        if (this._factories.has(key)) {
            if (this._services.has(key)) {
                throw new Error(`Service with key ${serviceKeyToString(key)} has already been instantiated`);
            }
            console.warn(`Service with key ${serviceKeyToString(key)} is already registered`);
        }
        this._factories.set(key, createFn);
        return this;
    }
    setInstance(key, instance) {
        this._services.set(key, instance);
        return this;
    }
    get services() {
        return this._services;
    }
}
exports.AppService = AppService;
