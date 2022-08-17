

Jest is all in one testing framework for testing in javascript.
https://jestjs.io/blog/

https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

Good collection of testing talks: https://www.youtube.com/c/Okgrow/videos

## Summary

`jest.fn`: Mock a function (possibly with arbitrary implementation), useful for callback verification etc.
`jest.mock`: Mock a module by specifying its path.
`jest.spyOn`: Spy/mock a function, for tracing, preserving original function behavior.

### Basics

One special thing we do in Jest is reset the entire module registry after every single test (call to it) to make sure tests don't depend on each other.

Every single test in Jest receives a fresh new copy of all modules, including new versions of all mocked dependencies which take a lot of time to generate for each test. A side effect of this is that we had to call require manually before every test.

#### History

#### Jest 15
1. automocking is false as default.
2. Doesn't implicitly reset the module registry after every test. Adds jest.resetModules and a resetModules config option for better control.

#### Jest 22
1. JSDOM is default env for running tests.
2. Babel 7 support.

### Configuration

Configuration is the most important part of any test runner.
Jest config can live in 
1. `package.json` field named `jest`.
2. `jest.config.js`
3. custom json file provided with `--config`.

#### Presets

Jest can have presets of its own that can be used for base configuration, instead 
of users manually specifying all the config.
This is useful for big and popular config like `ts-jest`.


### Matchers

Usually when you se expect, what gets returned is an expectation object, the only thing you can do on an expectation object is to use matchers like `toBe` etc.

e.g.
```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4); // .toBe(4) is the matcher
});
```

Similarly there are other matchers like toContain, toThrow etc.

### Snapshot testing

Snapshot testing is not limited to react, but it is useful for
testing anything that is serializable, e.g. large json trees with 
deep equality etc.

When `expect(something).toMatchSnapshot()` is called for the first time,
a `__snapshots__` folder is created where a `something.js.snap` file is created. Subsequent updates to `something`, will prompt to update the serialized represantation of `something`.

### Spies a.k.a mock functions

Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code, rather than just testing the output. 

Mock functions make it easy to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions, all together known as spying.

You can create a mock function with `jest.fn()`. If no implementation is given, the mock function will return undefined when invoked.

```js
test('call the callback', () => {
  const callback = jest.fn()
  fn(callback)
  expect(callback).toBeCalled()
  expect(callback.mock.calls[0][1].baz).toBe('pizza') // Second argument of the first call
});
```

#### .mock property

All mock functions have this special `.mock` property (see example above), which is where data about how the function has been called and what the function returned is kept.

Here are the use cases:
```js
// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.returnValues[0]).toBe('return value');

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toEqual('test');
```

### Mocks

### Interview question: writing your own implementation of `jest.fn(impl)`

Below is an equivalent of `jest.fn(impl)`

```js
function myFn(impl) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);// capture call site info in a dedicated calls array
    return impl(...args);// forward the call
  };
  mockFn.mock.calls = [];// static property object `.mock` on mock fn, tracing/spying all interaction happend with this Fn
  return mockFn;// return a decorated version of original impl function with spy/tracking code
}
```

#### Automatic mocks

This option tells Jest that all imported modules in your tests should be mocked automatically. All modules used in your tests will have a replacement implementation (always returning undefined), keeping the API surface.
```js
// utils.js
export default {
  authorize: () => {
    return 'token';
  },
  isAuthorized: secret => secret === 'wizard',
};
```
```js
//__tests__/automocking.test.js
import utils from '../utils';

test('if utils mocked automatically', () => {
  // Public methods of `utils` are now mock functions
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized.mock).toBeTruthy();

  // local code is not maucked by default, to do it use jest.mock('../utils');
  console.log(utils.authorize());
  console.log(utils.isAuthorized());
  // You can provide them with your own implementation
  // or just pass the expected return value
  utils.authorize.mockReturnValue('mocked_token');
  utils.isAuthorized.mockReturnValue(true);

  expect(utils.authorize()).toBe('mocked_token');
  expect(utils.isAuthorized('not_wizard')).toBeTruthy();
});
```

#### Manual mocks

Powered over automocks(i.e. default APIs returning undefined), we would like to do better,
Manual mocking is using `__mocks__` to provide better fake-implementation than just returning `undefined` which is done by auto-mocks,
Use to stub out api functionallity manually, usually by putting in fake data etc.
Manual mocks should be added in `__mocks__` subdirectory along side the module.
* To use the mock module in tests, `jest.mock('modulename')` is required. But if automock is set to true no need to do explicit call above. To opt out of mocking when automock is set to true, use `jest.unmock('modulename')`.


##### mocking code of node_modules in our tests

1. Make a directory `__mocks__` adjacent to `node_modules` directory (usually our project directory).
2. Make the file that is same name as node module e.g. lodash.js, axios.js, fs.js etc.
3. Now Your tests will pick up from `__mocks__` first.

#### Inline mocking

The third type of mocking other than automocking and manual mocking(`__mocks__`),
is inline mocking via using api like `.mockReturnValue` and `.mockResolvedValue` on mock functions i.e. `jest.fn(() => {})`.

```js
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');// auto-mocked

test('should fetch users', () => {
  const resp = {data: [{name: 'Bob'}]};
  axios.get.mockResolvedValue(resp);// override undefined behavior

  axios.newbehavior = jest.fn(() => 'new behavior');
  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  return Users.all().then(users => expect(users).toEqual(resp.data));
});
```

Interesting behaviors:
```js
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```


## babel-jest (is a code transformer of your source)

Jest ships with one transformer out of the box – `babel-jest`.

It will load your project's Babel configuration and transform any file matching the `/\.[jt]sx?$/` RegExp (in other words, any `.js`, `.jsx`, `.ts` or `.tsx` file). In addition, babel-jest will inject the Babel plugin necessary for mock hoisting talked about in ES Module mocking.


## Ignore transpiling node modules with babel

**By default jest will transpile everything**. skip transpiling some source by specifying `transformIgnorePatterns`.

An array of regexp pattern strings that are matched against all source file paths before transformation. If the file path matches any of the patterns, it will not be transformed.

Providing regexp patterns that overlap with each other may result in files not being transformed that you expected to be transformed. For example:
```js
// jest.config.js
{
  "transformIgnorePatterns": ["/node_modules/(?!(foo|bar)/)"] // skip node_modules, but transpile /node_modules/foo and /node_modules/bar
}
```

## How to test `this` inside jest mock functions?

```js
// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);
```

## Checking/spying on a module or class method without chanign its behavior

**Sometimes you only want to watch a method be called, but keep the original implementation. This is useful in a number of scenarios where you want to assert that certain side-effects happen without actually replacing them.**.

**By default `spyOn(obj, methodName)` monkeypatches given `object.methodName` with a mock fn, which also calls the original spied method.**

Semantically it is equivalent to:
```js
const spy = jest.spyOn(math, 'add');
// semantically equivalent to ------->>>

// store the original implementation
const originalAdd = math.add;
// mock add with the original implementation
math.add = jest.fn(originalAdd);
```
You can see the implementation details here: https://github.com/facebook/jest/blob/e9aa321e0587d0990bd2b5ca5065e84a1aecb2fa/packages/jest-mock/src/index.js#L674-L708

Since `jest.spyOn` is a mock. You could restore the initial state calling `jest.restoreAllMocks` on `afterEach` method.

Use `const spy = jest.spyOn(obj, methodName)`
and then use 
`expect(spy).toHaveBeenCalledWith(xyz)`
e.g.
```js
const video = {
  play() {
    return true;
  },
};

module.exports = video;
```
Testing the module:
```js
const video = require('./video');

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');// spy is now a mock function which forwards to original impl video.play method, also monkeypatches given object method
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  console.log(video.play.mock);// { calls: [],contexts: [],instances: [],invocationCallOrder: [],results: [] }
  console.log(spy.mock);//  { calls: [],contexts: [],instances: [],invocationCallOrder: [],results: [] }
  console.log(spy.mock === video.play.mock); // true
  console.log(spy === video.play);// true
});
```


## Partially mocking a module

https://github.com/facebook/jest/issues/936

Try:
```js
jest.unmock('./myModule.js');

const myModule = require('myModule');
myModule.foo = jest.fn();
```

## Error testing

**You must wrap the error throwing code in a function, otherwise the error will not be caught, and assertion will not work**

```js
test('throws on octopus', () => {
  expect(() => {
    drinkFlavor('octopus');
  }).toThrow();
});
```

### Testing by error message or error instance:
```js
test('throws on octopus', () => {
  function drinkOctopus() {
    drinkFlavor('octopus');
  }

  // Test that the error message says "yuck" somewhere: these are equivalent
  expect(drinkOctopus).toThrowError(/yuck/);
  expect(drinkOctopus).toThrowError('yuck');

  // Test the exact error message
  expect(drinkOctopus).toThrowError(/^yuck, octopus flavor$/);
  expect(drinkOctopus).toThrowError(new Error('yuck, octopus flavor'));

  // Test that we get a DisgustingFlavorError
  expect(drinkOctopus).toThrowError(DisgustingFlavorError);
});
```

## Testing observables (RxJs)

https://www.youtube.com/watch?v=lb48sk5EDdo

1. use `of` for single sync objects
2. use `of`+`delay` for single async value
3. use `from` for multiple sync objects
4. use `interval` + `take`? for multiple async values
5. use custom `Subject` for most flexibility.
   

use `done` callback given in tests if necessary, or `complete` callback of observer.