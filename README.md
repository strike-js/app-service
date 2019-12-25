# strikejs-app-service 

A recursive service registry that can be used as a dependency container in JavaScript applications.

## Usage

```typescript

import {AppService} from 'strikejs-app-service';

const registry = new AppService(); 

registry.set('someService', ()=>'some Value');

// notice that it returns a promise 
registry.get('someService').then(console.log);

// you can provie a function that returns a promise
// this is useful for code splitting 
registry.set('someOtherService', ()=>Promise.resolve('some Value'));

// or import a file using `import`
registry.set('someService', () => import('./test'))

registry.get('someOtherService').then(console.log);

// you can also access other dependencies
registry.set('someService', async (registry) => {
  const someOtherDependency = await registry.get('someOtherSerivce');
  return createMyService(someOtherDependency);
});

```