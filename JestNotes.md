

Jest is all in one testing framework for testing in javascript.

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

