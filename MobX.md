

### Observable state

Usually used for defining state.

### Observer

Used for annotating code that must be run on changes happening on observable.

observer turns React (function) components into derivations of the data they render.

### Computed values

Derived values from state. Equivalent to formulas in spreadsheets.
Computeds are not allowed to produce side-effects, simple value to value transformations. Should be pure functions in terms of observables & other computeds.

By default mobx doesn't try to keep computed values up to date, but instead are updated lazily i.e on need/call.

Functions inside observable objects, that are pure in terms of properties are automatically treated as Computeds.

### Actions

Any peice of code trying to modify state is known as an action.
Usually happens by modifying values on an observable(State). Only actions are allowed to modify state.

Multiple changes to state are grouped together in an action annotated code, resulting in a combined update to state.

Use mobx in strict mode to ensure that all state changes always only happen inside of action annotated code.

There is no technical need for firing events, calling a dispatcher or what more


### Reactions

Reactions don't produce a value, but are intended for side effects.
Only computed properties tracked via reactions are kept reactive. aka. up to date.

The code invoked via subscriptions to state etc. usually react rendering/dom flushing. 

Custom reactions can simply be created using the autorun, reaction or when functions to fit your specific situations

### What will mobx react to?

MobX reacts to any existing observable property that is read during the execution of a tracked function