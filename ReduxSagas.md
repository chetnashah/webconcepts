
https://redux-saga.js.org/

### Effect

Object shaped description that act like instructions for saga middleware.

An effect is said to be blocking or non-blocking depending on if it suspends the generator/saga or not.

#### Non-blocking Effects

1. put
2. throttle
3. fork
4. select
5. spawn
6. cancel

#### Blocking Effects

1. take
2. call


###Saga

Saga must be a function which returns a Generator Object. The middleware will then iterate over the Generator and execute all yielded Effects.

Since Generator function are functions which return Generator object, generator function can be treated as saga.

#### Watcher Sagas

Watch for events/action/patterns, and spawn Sagas

#### Worker Saga

Doing useful work in a saga.

#### Saga Middleware

When a Promise is yielded to the middleware, the middleware will suspend the Saga until the Promise completes.

When a middleware retrieves an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled

### Task

The Task interface specifies the result of running a Saga using fork, middleware.run or runSaga.

Methods:

1. `toPromise()`
2. `cancel()`

The result of yield `fork(fn ...args)` is a `Task` object. An object with some useful methods and properties.

All forked tasks are attached to their parents. When the parent terminates the execution of its own body of instructions, it will wait for all forked tasks to terminate before returning.



### Buffer

Used to implement the buffering strategy for a channel.

Three methods.
1. `isEmpty: () => boolean`
2. `put: (msg) => ()`
3. `take: () => msg`

### Channel

A channel is an object used to send and receive messages between tasks. Messages from senders are queued until an interested receiver request a message, and registered receiver is queued until a message is available.

The Channel interface defines 3 methods: 
1. `channel.take(cb)`: register a taker.
2. `channel.put(msg)`: Put message on buffer.
3. `channel.close`: closes the channel which means no more puts will be allowed. All pending takers will be invoked with END.

### Effects

All functions in effects like `take`, `takeEvery`,
`put` etc. return an object (What we can call an Effect or Effect description), these objects would be consumed by saga middleware.

e.g.
```js
var takeCCC = effects.take('CCC')
// { '@@redux-saga/IO': true, TAKE: { pattern: 'CCC' } }

```

#### put(action)

Creates an Effect description that instructs the middleware to dispatch an action to the Store. This effect is non-blocking and any errors that are thrown downstream (e.g. in a reducer) will not bubble back into the saga.

### Pattern

`pattern: String | Array | Function`

1. pattern is String : act when action.type === pattern

2. pattern is Function : act when pattern(action) === true


#### take

`(pattern) => EffectDescription`

Creates an Effect description that instructs the middleware to wait for a specified action on the Store. The Generator is suspended until an action that matches pattern is dispatched.

##### takeLatest

Run only one saga at a time for given pattern.
Can be useful for API requests on action dispatch.

##### takeEvery

Spin up a new saga for every pattern observed.

**NOTE** : take is blocking and suspends for a pattern given, do code below it is suspended. Where as `takeEvery` and `takeLatest` have spawning power, so they do are non-blocking.

#### `call(fn, ...args)`

Creates an Effect description that instructs the middleware to call the function fn with args as arguments.

Where `fn` can be normal or generator function.

The middleware invokes the function and examines its result.

If the result is an Iterator object, the middleware will run that Generator function, just like it did with the startup Generators (passed to the middleware on startup). The parent Generator will be suspended until the child Generator terminates normally, in which case the parent Generator is resumed with the value returned by the child Generator. Or until the child aborts with some error, in which case an error will be thrown inside the parent Generator.

If the result is a Promise, the middleware will suspend the Generator until the Promise is resolved, in which case the Generator is resumed with the resolved value. or until the Promise is rejected, in which case an error is thrown inside the Generator.

If the result is not an Iterator object nor a Promise, the middleware will immediately return that value back to the saga, so that it can resume its execution synchronously.

#### `cps(fn, ...args)`

invoke funtion in a continuation passing style i.e 

`fn: (args,(err,data)=>()) => nothing` is nodeback funtion

The middleware remains suspended until fn terminates.

#### `fork(fn, ...args)`

Useful when you want to make an effect without
caring about its return value (since fork will not wait till return value), like a POST to server
without any need to interpret result.

fork, like call, can be used to invoke both normal and Generator functions. But, the calls are non-blocking, the middleware doesn't suspend the Generator while waiting for the result of fn. Instead as soon as fn is invoked, the Generator resumes immediately.

fork, alongside race, is a central Effect for managing concurrency between Sagas.

The result of `yield fork(fn ...args)` is a `Task` object. An object with some useful methods and properties.

All forked tasks are attached to their parents. When the parent terminates the execution of its own body of instructions, it will wait for all forked tasks to terminate before returning.

Errors from child tasks automatically bubble up to their parents. If any forked task raises an uncaught error, then the parent task will abort with the child Error, and the whole Parent's execution tree (i.e. forked tasks + the main task represented by the parent's body if it's still running) will be cancelled.

Cancellation of a forked Task will automatically cancel all forked tasks that are still executing. It'll also cancel the current Effect where the cancelled task was blocked (if any).
```js
const login = yield fork(api, 'https:/abcd/login');
yield take('CANCEL');
yield cancel(login);// cancel login task
```

If a forked task fails synchronously (ie: fails immediately after its execution before performing any async operation), then no Task is returned, instead the parent will be aborted as soon as possible (since both parent and child execute in parallel, the parent will abort as soon as it takes notice of the child failure).

To create detached forks, use spawn instead.

#### spawn

same as fork, but creates a detached task.

### all
`all` is an effect combinator.
`all` takes an array of effects all of which will be executed in parallel.
And yielded depending on types of effects inside it.

When running Effects in parallel, the middleware suspends the Generator until one of the following occurs:

All the Effects completed with success: resumes the Generator with an array containing the results of all Effects.

One of the Effects was rejected before all the effects complete: throws the rejection error inside the Generator.


