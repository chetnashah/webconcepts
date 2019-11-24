


### GlobalState

`trackingDerivation`:

`pendingReactions`: list of all reactions to be run. Each item in the list is an instance of `Reaction`.
`isRunningReactions`: boolean saying if currently reaction running is in progress.

### Atom

Atom kind of represents a value that is `observable`.
Core methods include `reportObserved` and `reportChanged` which are called,
when exteranl code calls `get` or `set` on observable values.

### Observable

```ts
export interface IObservable extends IDepTreeNode {
    diffValue: number
    /**
     * Id of the derivation *run* that last accessed this observable.
     * If this id equals the *run* id of the current derivation,
     * the dependency is already established
     */
    lastAccessedBy: number

    lowestObserverState: IDerivationState // Used to avoid redundant propagations
    isPendingUnobservation: boolean // Used to push itself to global.pendingUnobservations at most once per batch.

    observers: IDerivation[] // maintain _observers in raw array for for way faster iterating in propagation.
    observersIndexes: {} // map derivation.__mapid to _observers.indexOf(derivation) (see removeObserver)

    onBecomeUnobserved()
}
```

#### ObservableArray

A `faux array like object` that behaves like an array.
to get real array use `obsArray.peek()`.

```js
Array.isArray(observable([1,2,3]));        // false
Array.isArray(observable([1,2,3]).peek()); // true
```

`obsArray.concat`: always returns plain js arrays

`[].concat(obsArray)`: since plain JS arrays do not understand obsArray it becomes `[obsArray]`

`obsArray.$mobx.values` is sabe as `obsArray.peek()`

### Derivation

A derivation is a value/code that is dependent i.e. has dependencies on some other values.

```ts
export interface IDerivation extends IDepTreeNode {
    observing: IObservable[]
    newObserving: null | IObservable[]
    dependenciesState: IDerivationState
    /**
     * Id of the current run of a derivation. Each time the derivation is tracked
     * this number is increased by one. This number is globally unique
     */
    runId: number
    /**
     * amount of dependencies used by the derivation in this run, which has not been bound yet.
     */
    unboundDepsCount: number
    __mapid: string
    onBecomeStale()
    isTracing: TraceMode
}
```

### Reaction

`Reaction` implements `IDerivation`. Meaning `Reaction` is a kind of `Derivation`.

Has a member `onInvalidate` which is set during constructor.
Has a member `newObserving`. (bcoz derivation)
Has a member `observing`. (bcoz derivation)
Has a member `dependenciesState` (bcoz derivation)

### Some independent function/utils

#### trackDerivedFunction
`export function trackDerivedFunction<T>(derivation: IDerivation, f: () => T, context) {}`
First argument is a derivation, and second is a function which will be tracked for all the accesses (`gets`) and put them as dependencies of the given derivation.

Just before the execution of `f`, the `globalState.trackingDerivation` is set to the passed in `derivation`.


#### bindDependencies
`function bindDependencies(derivation: IDerivation) {}`