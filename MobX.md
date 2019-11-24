
### Derivation stack

When a recomputation is triggered the function is pushed onto the derivation stack; a function stack of currently running derivations.

As long as a computation is running, every observable that is accessed will register itself as a dependency of the topmost function of the derivation stack.

e.g. a reaction depends on computed, and computed depends on observable.
Top of the stack is computed value calculation,
followed by reaction that observes the computed.

When a computation completes, it will have obtained a list of observables that were accessed during execution. In the profileView for example, this list will either just contain the nickName property, or the nickName and fullName properties. This list is diffed against the previous list of observables. Any removed items will be unobserved (computed values might go back from reactive to lazy mode at this point) and any added observables will be observed until the next computation. When the value of for example firstname is changed in the future, it knows that fullName needs to be recomputed. Which in turn will cause profile view to recomputed

### Observable state

https://mobx.js.org/refguide/observable.html

Usually used for defining state.
Observable values can be JS primitives, references, plain objects, class instances, arrays and maps.

```js
observable(value)
@observable classProperty = value
```

**If value is an object with a prototype, a JavaScript primitive or function, observable will throw.** Use Boxed Observable observables instead if you want to create a stand-alone observable reference to such a value. MobX will not make objects with a prototype automatically observable; as that is considered the responsibility of its constructor function. Use extendObservable in the constructor, or @observable / decorate in its class definition instead.

### Core types

```ts
export class Atom implements IAtom {
    isPendingUnobservation = false // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
    isBeingObserved = false
    observers = new Set()

    diffValue = 0
    lastAccessedBy = 0
    lowestObserverState = IDerivationState.NOT_TRACKING
}

declare export class Reaction {
    name: string;
    isDisposed: boolean;
    constructor(name: string, onInvalidate: () => void): this;
    schedule(): void;
    isScheduled(): boolean;
    track(fn: () => void): void;
    dispose(): void;
    getDisposer(): Lambda & {
        $mosbservable: Reaction
    };
    toString(): string;
    trace(enterBreakPoint?: boolean): void;
}

declare export function createAtom(
    name: string,
    onBecomeObservedHandler?: () => void,
    onBecomeUnobservedHandler?: () => void
): IAtom

declare export function autorun(
    nameOrFunction: string | ((r: IReactionPublic) => any),
    options?: IAutorunOptions
): any

declare export function computed<T>(
    target: any,
    key?: string,
    baseDescriptor?: PropertyDescriptor<*>
): any

declare export function intercept(
    object: Object,
    property: string,
    handler: IInterceptor<any>
): Lambda

// observe api start
declare export function observe<T>(
    value: IObservableValue<T> | IComputedValue<T>,
    listener: (change: IValueDidChange<T>) => void,
    fireImmediately?: boolean
): Lambda
declare export function observe<T>(
    observableArray: IObservableArray<T>,
    listener: (change: IArrayChange<T> | IArraySplice<T>) => void,
    fireImmediately?: boolean
): Lambda
declare export function observe<K, T>(
    observableMap: ObservableMap<K, T>,
    listener: (change: IMapChange<K, T>) => void,
    fireImmediately?: boolean
): Lambda
declare export function observe<K, T>(
    observableMap: ObservableMap<K, T>,
    property: string,
    listener: (change: IValueDidChange<K, T>) => void,
    fireImmediately?: boolean
): Lambda
declare export function observe(
    object: any,
    listener: (change: IObjectChange) => void,
    fireImmediately?: boolean
): Lambda
declare export function observe(
    object: any,
    property: string,
    listener: (change: IValueDidChange<any>) => void,
    fireImmediately?: boolean
): Lambda
// observe api end

declare export function reaction<T>(
    expression: (r: IReactionPublic) => T,
    effect: (arg: T, r: IReactionPublic) => void,
    opts?: IReactionOptions
): () => void


export class ObservableValue<T> extends Atom
    implements IObservableValue<T>, IInterceptable<IValueWillChange<T>>, IListenable {
}

export interface IObservableValue<T> {
    get(): T
    set(value: T): void
    intercept(handler: IInterceptor<IValueWillChange<T>>): Lambda
    observe(listener: (change: IValueDidChange<T>) => void, fireImmediately?: boolean): Lambda
}

export interface IAtom extends IObservable {
    reportObserved()
    reportChanged()
}


export interface IDependencyTree {
    name: string;
    dependencies?: IDependencyTree[];
}

export interface IObserverTree {
    name: string;
    observers?: IObserverTree[];
}


export interface IComputedValue<T> {
    get(): T;
    set(value: T): void;
    observe(listener: (newValue: T, oldValue: T) => void, fireImmediately?: boolean): Lambda;
}

export interface IObservable {}

export interface IDepTreeNode {
    name: string;
    observing?: IObservable[];
}


export interface IDerivation {
    name: string;
}

export interface IReactionPublic {
    dispose: () => void;
    trace: (enterBreakPoint?: boolean) => void;
}

declare export class IListenable {
    observe(handler: (change: any, oldValue?: any) => void, fireImmediately?: boolean): Lambda;
}

export interface IComputedValue<T> {
    get(): T;
    set(value: T): void;
    observe(listener: (newValue: T, oldValue: T) => void, fireImmediately?: boolean): Lambda;
}

export interface IEnhancer<T> {
    (newValue: T, oldValue: T | void, name: string): T;
}


export interface IComputed {
    <T>(func: () => T, setter?: (value: T) => void): IComputedValue<T>;
    <T>(func: () => T, options: IComputedValueOptions<T>): IComputedValue<T>;
    (target: Object, key: string, baseDescriptor?: PropertyDescriptor<*>): void;
    struct(target: Object, key: string, baseDescriptor?: PropertyDescriptor<*>): void;
}

export interface IObjectChange {
    name: string;
    object: any;
    type: "update" | "add" | "remove";
    oldValue?: any;
    newValue: any;
}


export interface IArrayChange<T> {
    type: "update";
    object: IObservableArray<T>;
    index: number;
    newValue: T;
    oldValue: T;
}

export interface IArraySplice<T> {
    type: "splice";
    object: IObservableArray<T>;
    index: number;
    added: T[];
    addedCount: number;
    removed: T[];
    removedCount: number;
}





declare export class ObservableMap<K, V> {
    constructor(initialData?: IMapEntries<K, V> | KeyValueMap<V>, valueModeFunc?: Function): this;
    has(key: K): boolean;
    set(key: K, value: V): void;
    delete(key: K): boolean;
    get(key: K): V;
    keys(): Iterator<K>;
    values(): Iterator<V>;
    entries(): IMapEntries<K, V> & Iterator<IMapEntry<K, V>>;
    forEach(callback: (value: V, key: K, object: KeyValueMap<K, V>) => void, thisArg?: any): void;
    merge(other: ObservableMap<K, V> | KeyValueMap<K, V>): ObservableMap<K, V>;
    clear(): void;
    replace(other: ObservableMap<K, V> | KeyValueMap<K, V>): ObservableMap<K, V>;
    size: number;
    toJS(): Map<K, V>;
    toPOJO(): KeyValueMap<V>;
    toJSON(): KeyValueMap<V>;
    toString(): string;
    observe(listener: (changes: IMapChange<K, V>) => void, fireImmediately?: boolean): Lambda;
    intercept(handler: IInterceptor<IMapWillChange<K, V>>): Lambda;
}

```

### Mobx object tracking

observable applies itself recursively by default.
all fields in this example are observable:
```js
let message = observable({
    title: "Foo",
    author: {
        name: "Michel"
    },
    likes: [
        "John", "Sara"
    ]
})
```

### Mobx array tracking

All observable array functions that do not mutate the array are tracked automatically.
All array index assignments are detected, but only if `index <= length`.

### Mobx Observable

An object  that has a set of observers and also has functions that do something on becoming observed and becoming unobserved. Also has registered listeners for onBecomeUnobservedListeners, onBecomeObservedListeners

### Mobx Atom

A Mobx Atom is a mobx observable that can `reportChanged` and `reportobserved`.

Atoms can be used to signal MobX that some observable data source has been observed or changed. And MobX will signal the atom whenever it is used or no longer in use.

`reportObserved`: `reportObserved` will return true if the atom is currently being observed by some reaction. `reportObserved` will also trigger the `onBecomeObserved` event handler (startTicking) if needed.

Example atom creation
```js
        this.atom = createAtom(
            // first param: a name for this atom, for debugging purposes
            "Clock",
            // second (optional) parameter: callback for when this atom transitions from unobserved to observed.
            () => this.startTicking(),
            // third (optional) parameter: callback for when this atom transitions from observed to unobserved
            // note that the same atom transitions multiple times between these two states
            () => this.stopTicking()
        );
```

For mobx native observables, whenever we say a reference got tracked inside
a special function like autorun etc. it is same as being observed.

### Observer

It is a part of `mobx-react` (not mobx itself). a link that connects mobx observables to react components like redux-react's `connect` method.

Used for annotating code that must be run on changes happening on observable.

observer turns React (function) components into derivations of the data they render.

### onBecomeObserved and onBecomeUnObserved APIs

These are apis available on mobx top level export and are useful to get
callbacks when parts or complete observable got observed/unobserved.
Set up given listener on given atom/mobservable, optionally with property.
e.g.
```js
    const d1 = mobx.onBecomeObserved(mobsevableObject, "akey", () => {
        events.push("a observed")
    })
    d1();// disposes listener
```

```js
    const x = mobx.observable({
        a: 3,
        get b() {
            return this.a * 2
        }
    })
    const events = []

    // arguments are observable, property, listener
    const d1 = mobx.onBecomeObserved(x, "a", () => {
        events.push("a observed")
    })
    const d2 = mobx.onBecomeUnobserved(x, "a", () => {
        events.push("a unobserved")
    })
    const d3 = mobx.onBecomeObserved(x, "b", () => {
        events.push("b observed")
    })
    const d4 = mobx.onBecomeUnobserved(x, "b", () => {
        events.push("b unobserved")
    });

        x.b
    x.a = 4

    expect(events.length).toBe(0) // nothing happened yet

    const d5 = mobx.reaction(() => x.b, () => {})// tracking/observing starts
    expect(events.length).toBe(2)
    expect(events).toEqual(["b observed", "a observed"])

    const d6 = mobx.reaction(() => x.b, () => {})
    expect(events.length).toBe(2)

    d5()
    expect(events.length).toBe(2)// even though d5 disposed, d6 still present
    d6()// d6 disposal results in unobserving of a and b
    expect(events.length).toBe(4)
    expect(events).toEqual(["b observed", "a observed", "b unobserved", "a unobserved"])

    d1()
    d2()
    d3()
    d4()
    events.splice(0)
    const d7 = mobx.reaction(() => x.b, () => {})
    d7()
    expect(events.length).toBe(0)
```

### getDependencyTree

`getDependencyTree(observable)` or `getDependencyTree(disposer)`: returns
all the recursive dependencies of the argument.
You will need to `$mobx` on disposers to get dep tree:
```js
    const c = m.autorun(() => b.get())
    const cName = "Autorun@4"
    expect(dtree(c[$mobx])).toEqual({
        name: cName,
        dependencies: [
            {
                name: bName,
                dependencies: [
                    {
                        name: aName
                    }
                ]
            }
        ]
    });
```

### getObserverTree

Contrary to `getDependencyTree` this list the observers of a given observable.


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