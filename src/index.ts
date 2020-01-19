export type FactoryFn<T> = (appService: AppService) => T | Promise<T>;
export type ServiceKey = string | Symbol;

function serviceKeyToString(key: ServiceKey) {
  if (typeof key === "string") {
    return key;
  }
  return key.toString();
}

export class AppService {
  _factories: Map<ServiceKey, FactoryFn<any>>;
  _pending: Map<ServiceKey, Promise<any>>;
  _services: Map<ServiceKey, any>;

  constructor() {
    this._factories = new Map<ServiceKey, FactoryFn<any>>();
    this._services = new Map<ServiceKey, any>();
    this._pending = new Map<ServiceKey, Promise<any>>();
  }

  async get<T>(key: ServiceKey): Promise<T> {
    if (this._pending.has(key)) {
      return this._pending.get(key);
    }
    if (!this._services.has(key)) {
      if (!this._factories.has(key)) {
        throw new Error(`No service with key ${key} has been registered.`);
      }
      const svc = this._factories.get(key)(this);
      let result: any = svc;
      if (typeof result["then"] === "function") {
        this._pending.set(key, svc);
        result = await svc;
        this._pending.delete(key);
      }
      this._services.set(key, result);
    }
    return this._services.get(key);
  }

  set<T>(key: ServiceKey, createFn: FactoryFn<T>) {
    if (this._factories.has(key)) {
      if (this._services.has(key)) {
        throw new Error(
          `Service with key ${serviceKeyToString(
            key
          )} has already been instantiated`
        );
      }
      console.warn(
        `Service with key ${serviceKeyToString(key)} is already registered`
      );
    }
    this._factories.set(key, createFn);
    return this;
  }

  setInstance<T>(key: ServiceKey, instance: T) {
    this._services.set(key, instance);
    return this;
  }

  get services() {
    return this._services;
  }
}
