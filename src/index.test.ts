import { AppService } from './index';

describe('app-service', () => {
  let svc:AppService;

  beforeEach(() => {
    svc = new AppService();
  });

  it('should register service using string key', async () => {
    const SVC_KEY = 'someService';
    svc.set(SVC_KEY, () => 'abc');
    expect(svc.services.size).toEqual(0);
    const result = await svc.get(SVC_KEY);
    expect(result).toEqual('abc');
    expect(svc.services.size).toEqual(1);
  });

  it('should register service using symbol key', async () => {
    const SVC_KEY = Symbol('someService');
    svc.set(SVC_KEY, () => 'abc');
    expect(svc.services.size).toEqual(0);
    const result = await svc.get(SVC_KEY);
    expect(result).toEqual('abc');
    expect(svc.services.size).toEqual(1);
  });

  it('should register multiple async services', async () => {
    const SVC_KEY1 = Symbol('someService1');
    const SVC_KEY2 = Symbol('someService2');
    svc.set(SVC_KEY1, async (svc) => {
      const r = await svc.get(SVC_KEY2);
      return `${r}.abc`;
    });
    svc.set(SVC_KEY2, () => Promise.resolve('amc'));
    expect(svc.services.size).toEqual(0);
    const result = await svc.get(SVC_KEY1);
    expect(result).toEqual('amc.abc');
    expect(svc.services.size).toEqual(2);
  });

  it('should throw if attempting to register an instantiated service', async () => {
    const SVC_KEY1 = Symbol('someService1');
    const SVC_KEY2 = Symbol('someService2');
    svc.set(SVC_KEY1, async (svc) => {
      const r = await svc.get(SVC_KEY2);
      return `${r}.abc`;
    });
    svc.set(SVC_KEY2, () => Promise.resolve('amc'));
    expect(svc.services.size).toEqual(0);
    const result = await svc.get(SVC_KEY1);
    expect(result).toEqual('amc.abc');
    expect(svc.services.size).toEqual(2);

    expect(() => svc.set(SVC_KEY2, () => Promise.resolve(1))).toThrow();
  });
});
