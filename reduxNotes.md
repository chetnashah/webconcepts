redux notes:


### API interface

#### commonly used types and Interfaces

```ts
type Action = Object
type State = any

type Reducer<S, A> = (state: S, action: A) => S

type ActionCreator = (...args: any) => Action | AsyncAction

type StoreCreator = (reducer: Reducer, preloadedState: ?State) => Store

type StoreEnhancer = (next: StoreCreator) => StoreCreator

// these type signatures are for functions which may or maynot call base dispatch provided in store API
type BaseDispatch = (a: Action) => Action
type Dispatch = (a: Action | AsyncAction) => any

type MiddlewareAPI = { dispatch: Dispatch, getState: () => State }
type Middleware = (api: MiddlewareAPI) => (next: Dispatch) => Dispatch
```

#### top level exports

5 top level exports:
1. `createStore`
2. `combineReducers`
3. `applyMiddleware`
4. `bindActionCreators`
5. `compose(...functions)`

#### Store

4 methods on store
1. `getState: () => any`
2. `dispatch: (action: Object)`
3. `subscribe(listener: () => any): () => void`
4. `replaceReducer(nextReducer: any)`

### A standard action (also known as FSA - flux standard action)
A standard action
1. must be an object
2. must have type property
3. may have payload/error property

e.g.
```
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}
```

### Redux middleware

A redux middleware lets you wrap `dispatch` function for fun and profit. e.g. `redux-thunk` starts taking promises/functions instead of plain old objects.

the middleware signature is 
`({ getState, dispatch }) => next => action`

### redux-actions library

Created to aid with utility helpers around redux FSA actions
to reduce boilerplate

Useful functions provided by redux-actions library
* createAction(type, payloadCreator = Identity) : create actions using this function
* handleAction(type, reducer, defaultState) : wraps reducers so that it handles actions of only a certain type

### redux using hooks

React Redux includes its own custom hook APIs, 
which allow your React components to subscribe to the Redux store and dispatch actions.

edge cases: https://react-redux.js.org/api/hooks#usage-warnings

#### `useSelector`

```js
const result: any = useSelector(selector: Function, equalityFn?: Function)
```
Allows you to extract data from the Redux store state, using a selector function.

**The selector function should be pure since it is potentially executed multiple times and at arbitrary points in time.**
example:
```jsx
import React from 'react'
import { useSelector } from 'react-redux'

export const TodoListItem = (props) => {
  const todo = useSelector((state) => state.todos[props.id])
  return <div>{todo.text}</div>
}
```

#### `useDispatch`

This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.


```js
const dispatch = useDispatch();
```

