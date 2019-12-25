var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function serviceKeyToString(key) {
    if (typeof key === 'string') {
        return key;
    }
    return key.toString();
}
export class AppService {
    constructor() {
        this._factories = new Map();
        this._services = new Map();
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._services.has(key)) {
                if (!this._factories.has(key)) {
                    throw new Error(`No service with key ${key} has been registered.`);
                }
                const svc = this._factories.get(key)(this);
                let result = svc;
                if (typeof result['then'] === 'function') {
                    result = yield svc;
                }
                this._services.set(key, result);
            }
            return this._services.get(key);
        });
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
