
Basic example:

```js
const initialArray = [1, 2, 3];
const newArray = update(initialArray, {$push: [4]}); // => [1, 2, 3, 4]
console.log(newArray === initialArray); // false
```

### Autovivification

It is auto creation of new arrays and objects when needed.
```js
var state = {}
var desiredState = {
  foo: [
    {
      bar: ['x', 'y', 'z']
    },
  ],
};

const state2 = update(state, {
  foo: foo =>
    update(foo || [], {
      0: fooZero =>
        update(fooZero || {}, {
          bar: bar => update(bar || [], { $push: ["x", "y", "z"] })
        })
    })
});

console.log(JSON.stringify(state2) === JSON.stringify(desiredState)) // true
// note that state could have been declared as any of the following and it would still output true:
// var state = { foo: [] }
// var state = { foo: [ {} ] }
// var state = { foo: [ {bar: []} ] }
```

`extend` can be used to create custom commands
```js
import update, { extend } from 'immutability-helper';

extend('$auto', function(value, object) {
  return object ?
    update(object, value):
    update({}, value);
});
extend('$autoArray', function(value, object) {
  return object ?
    update(object, value):
    update([], value);
});

var state = {}
var desiredState = {
  foo: [
    {
      bar: ['x', 'y', 'z']
    },
  ],
};
var state2 = update(state, {
  foo: {$autoArray: {
    0: {$auto: {
      bar: {$autoArray: {$push: ['x', 'y', 'z']}}
    }}
  }}
});
console.log(JSON.stringify(state2) === JSON.stringify(desiredState)) // true
```
