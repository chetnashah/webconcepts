

### Observable state

https://mobx.js.org/refguide/observable.html

Usually used for defining state.
Observable values can be JS primitives, references, plain objects, class instances, arrays and maps.

```js
observable(value)
@observable classProperty = value
```

**If value is an object with a prototype, a JavaScript primitive or function, observable will throw.** Use Boxed Observable observables instead if you want to create a stand-alone observable reference to such a value. MobX will not make objects with a prototype automatically observable; as that is considered the responsibility of its constructor function. Use extendObservable in the constructor, or @observable / decorate in its class definition instead.

### Observer

It is a part of `mobx-react` (not mobx itself). a link that connects mobx observables to react components like redux-react's `connect` method.

Used for annotating code that must be run on changes happening on observable.

observer turns React (function) components into derivations of the data they render.

### Computed values

Derived values from state. Equivalent to formulas in spreadsheets. (**Note**- computeds will also have observers just like observables do.)


Computed values are automatically derived from your state if any value that affects them changes.
Are usually getter functions (without arguments).
Computeds are not allowed to produce side-effects, simple value to value transformations. Should be pure functions in terms of observables & other computeds.

```js
import {observable, computed} from "mobx";

class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    constructor(price) {
        this.price = price;
    }

    @computed get total() {
        return this.price * this.amount;
    }
}
```

By default mobx doesn't try to keep computed values up to date, but instead are updated lazily i.e on need/call.

Functions inside observable objects, that are pure in terms of properties are automatically treated as Computeds.

e.g.
```js
const orderLine = observable.object({
    price: 0,
    amount: 1,
    get total() {
        return this.price * this.amount
    }
});
```

### `computed` vs `autorun`

They are both reactively invoked expressions, but use @computed if you want to reactively produce a value that can be used by other observers and autorun if you don't want to produce a new value but rather want to achieve an effect. For example imperative side effects like logging, making network requests etc.

autorun can be used in those cases where you want to create a reactive function that will never have observers itself.

When autorun is used, the provided function will always be triggered once immediately and then again each time one of its dependencies changes. In contrast, computed(function) creates functions that only re-evaluate if it has observers on its own, otherwise its value is considered to be irrelevant.

Computeds have automatic suspension. If a computed value is no longer observed, for example the UI in which it was used no longer exists, MobX can automatically garbage collect it. This differs from autorun's values where you must dispose of them yourself.

### Reactions

```js
reaction(() => data, (data, reaction) => { sideEffect }, options?)
```

A variation on autorun that gives more fine grained control on which observables will be tracked. 

It takes two functions, the first one (`the data function`) is tracked and returns data that is used as input for the second one, `the effect function`. 

Unlike autorun the side effect won't be run directly when created, but only after the data expression returns a new value for the first time. 

Any observables that are accessed while executing the side effect will not be tracked.

It is important to notice that the side effect will only react to data that was accessed in the data expression, which might be less then the data that is actually used in the effect. Also, the side effect will only be triggered when the data returned by the expression has changed. In other words: reaction requires you to produce the things you need in your side effect.



an example:
```js
const todos = observable([
    {
        title: "Make coffee",
        done: true,
    },
    {
        title: "Find biscuit",
        done: false
    }
]);

// wrong use of reaction: reacts to length changes, but not to title changes!
const reaction1 = reaction(
    () => todos.length,
    length => console.log("reaction 1:", todos.map(todo => todo.title).join(", "))
);

// correct use of reaction: reacts to length and title changes
const reaction2 = reaction(
    () => todos.map(todo => todo.title),
    titles => console.log("reaction 2:", titles.join(", "))
);

// autorun reacts to just everything that is used in its function
const autorun1 = autorun(
    () => console.log("autorun 1:", todos.map(todo => todo.title).join(", "))
);

todos.push({ title: "explain reactions", done: false });
// prints:
// reaction 1: Make coffee, find biscuit, explain reactions
// reaction 2: Make coffee, find biscuit, explain reactions
// autorun 1: Make coffee, find biscuit, explain reactions

todos[0].title = "Make tea"
// prints:
// reaction 2: Make tea, find biscuit, explain reactions
// autorun 1: Make tea, find biscuit, explain reactions
```
### Actions

Any peice of code trying to modify state is known as an action.
Usually happens by modifying values on an observable(State). Only actions are allowed to modify state.

Multiple changes to state are grouped together in an action annotated code, resulting in a combined update to state.

Use mobx in strict mode to ensure that all state changes always only happen inside of action annotated code.

There is no technical need for firing events, calling a dispatcher or what more


### What will mobx react to?

https://mobx.js.org/best/react.html

MobX reacts to any existing observable property that is read during the execution of a tracked function.

Mobx tracks only synchronized accessed data.

### Mobx-React (mobx bindings for react)

#### Provider

Provider is a component that can pass stores (or other stuff) using React's context mechanism to child components.

#### inject

`inject` can be used to pick up those stores. It is a higher order component that takes a list of strings and makes those stores available to the wrapped component. You specify the name of the store to inject as argument. 
e.g. `@inject('birdStore')`

When using both `@inject` and `@observer`, make sure to apply them in the correct order: observer should be the inner decorator, inject the outer. There might be additional decorators in between.

#### observer

`@observer` does not take any arguments.

## Mobx-state-tree

mobx-state-tree is a state container that combines simplicity and ease of mutable data with the traceability of immutable data and reactiveness and performance of observable data.

### Living tree

The tree consists of mutable but strictly protected objects enriched with runtime type information.

Each tree has a shape(type info) and state(data).

From this living tree, immutable structurally shared snapshots are generated automatically.

### Specifying types using `types.model`

```js
import { types } from 'mobx-state-tree';
```

Declare the shape in json form as an object passed to
`types.model(schemaJSON)`;

```js
const Todo = types.model({
    title: types.string
});
```

Creating tree based on type: specify initial data in
`Todo.create(dataJSON)`;

```js
const coffeeTodo = Todo.create({
    title: 'Coffee'
});
```

`types.model` creates a chainable model type, where each chained method (like `.views`, `.actions` ) produces a new type.

### View functions using `.views`

View function can derive property values from existing property values in the model, but cannot modify existing property values, because that should only be done using action functions(see next section).


### Action functions using `.actions`

Actions are the only way to modify property and values in a model.
`.actions` take a function which has argument self(representing model data). return a list(map based) of functions that serve as action functions.


### SnapShots

Snapshots are the immutable serialization, in plain objects.
`getSnapshot(model)` is a useful function to get plain JSON form of data present in the model.

```js
import { getSnapshot } from 'mobx-state-tree';
```