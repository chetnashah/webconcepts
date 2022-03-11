
Hooks rely on a stable call order on every render of the same component.

React only changes the DOM nodes if there’s a difference between renders.

After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as “browser rendering”, we’ll refer to it as “painting”.

**Note** - DO not mutate an existing state object or a ref object.

### Internals

Present in: react/packages/react-reconciler/src/ReactFiberHooks.old.js 

Main important method: `renderWithHooks`.

```js
// Hooks are stored as a linked list on the fiber's memoizedState field. The
// current hook list is the list that belongs to the current fiber. The
// work-in-progress hook list is a new list that will be added to the
// work-in-progress fiber.
let currentHook: Hook | null = null;// points to the last hook
let workInProgressHook: Hook | null = null;
```

`Hook` data structure:
```js
  const hook: Hook = {
    memoizedState: null,

    baseState: null,
    baseQueue: null,
    queue: null,

    next: null,
  };
```

each hook has same structure as above, but
stores different stuff e.g. `useEffect` will store effect to be run in `memoizedState.
`useState/useReducer` will store the update queue to run.

get the latest/last hook in the hook list: `mountWorkInProgressHook()/updateWorkInProgressHook()`

Three version of each hook:
1. mount version: `mountRef`, `mountReducer`, `mountEffect`, `mountMemo`,`mountState`, `readContext`, `mountCallback`.

2. update version: `updateRef`, `updateReducer`, `updateEffect`, `updateMemo`, `updateState`, `readContext`, `updateCallback`.

3. Rerender version: `updateRef`, `rerenderReducer`,
`updateEffect`, `updateMemo`, `rerenderState`, `readContext`,
`updateCallback`.


### Idempotence (needed for concurrent rendering)

Hook functions and component functions
can be invoked multiple times.
Hence those functions have to be pure enough
so that they behave consistently, even if
they are invoked several times.
### Types of state in a react app

1. server data cache - api data fetched for (Nouns) in your app like Posts, Comments etc.

2. Form state - form filling intermediate input state before 
putting it on the server.

3. Navigation state - browser local navigation state like, currently visible tab, currently visible screen, currently visible modal, selected list-item in master-detail setup, Nth step in a step by step wizard (can also be considered part of form state).

4. Auth state - although linked to server data/navigation state,
this state decides other sub-states like navigation and server data.

5. Editor state - Although a subset of a form i.e.an input state,
a rich graphical editor can have a full fledged substates like
selections, cursor positions, highlights etc.

### What happens during rendering?

When React re-renders a component:

1. React calls your function again.
2. Your function returns a new JSX snapshot.
3. React then updates the screen to match the snapshot you’ve returned.

**Rendering takes a snapshot in time** - When React calls your component, it gives you a snapshot of the state for that particular render. 
Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, all calculated using the state values from that render!

A state variable’s value never changes within a render, even if its event handler’s code is asynchronous. Inside that render’s onClick, the value of number continues to be 0 even after `setNumber(number + 5)` was called. Its value was “fixed” when React “took the snapshot” of the UI by calling your component.

React keeps the state values “fixed” within one render’s event handlers. You don’t need to worry whether the state has changed while the code is running.

React uses `Object.is` on `state` in order
to decide about re-rendering or bailout. Which means if state is referentially unchanged, it bails out and wont re-render. so it is recommended to treat `state` as immutable.

Setting state only changes it for the next render.

**React waits until all code in the event handlers has run before processing your state updates. This is why the re-render only happens after all these setNumber() calls.**

This behavior, also known as **batching**, makes your React app run much faster. It also avoids dealing with confusing “half-finished” renders where only some of the variables have been updated.

**React does not batch across multiple intentional events** like clicks—each click is handled separately. Rest assured that React only does batching when it’s generally safe to do.

### Commits

For the initial render, React will use the `appendChild()` DOM API to put all the DOM nodes it has created on screen.
For re-renders, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.


### Internals
https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e

### useState

State is local to a component instance on the screen.
Updating your component’s state automatically queues a render.

`useState` is implemented using `useReducer` inside React.

**Note** - `updater functions` i.e. `setNumber(n => n+1)` run during rendering, 
so updater functions must be pure and only return the result.
**Do not try to set state inside of updater functions or run other side effects**.

The useState Hook provides those two things:

1. `A state variable` to retain the data between renders.
2. `A state setter function` to update the variable and trigger React to render the component again.

`batch updates`: react waits till all code in event handlers has run before processing your state updates. 

`updater functions`: e.g. `setNumber(n => n + 1);`
Here, `n => n + 1` is called an updater function.  
When you pass it to a state setter:

1. React queues this function to be processed after all the other code in the event handler has run.
2. During the next render, React goes through the queue (by giving prevState to functions in updater queue) and gives you the final updated state as a return value of `useState`.

`state updater functions queue is processed fully during render on useState call`.
When you call useState during the next render, React goes through the queue. 
The `previous number state` was 0, so that’s what React passes to the first updater function as the n argument. 
Then React takes the return value of your previous updater function and passes it to the next updater as n, and so on:
React stores 3 as the final result and returns it from `useState`.



Recap:
1. When you call useState, React gives you a snapshot of the state for that render.
2. Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
3. Every render (and functions inside it) will always “see” the snapshot of the state that React gave to that render.
4. You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX.
5. Event handlers created in the past have the state values from the render in which they were created.

Always rendering:
```js
const Component = () => {
  console.log(" component render");
  const [state, setState] = useState({ count: 0 });
  return (
    <div>
      {state.count}
      <button onClick={() => setState({ count: 1 })}>Set count to 1</button>
    </div>
  );
};
```

#### Why mutating state is not recommended?

* `Common React optimization strategies rely on skipping work if previous props or state are the same as the next ones`. If you never mutate state, it is very fast to check whether there were any changes. If `prevObj === obj`, you can be sure that nothing could have changed inside of it.

* Some application features, like implementing Undo/Redo, showing a history of changes, or letting the user reset a form to earlier values, are easier to do when nothing is mutated. This is because you can keep past copies of state in memory, and reuse them when appropriate.



#### updating objects in state

when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.
When updating nested state, you need to create copies from the point where you want to update, and all the way up to the top level. (path copying)

* you should treat any JavaScript object that you put into state as read-only.

* Spread syntax is shallow: it only copies one level deep.
#### updating nested object

Using spread operator `...` for nondestructive updates.
```js
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

### useReducer

useReducer takes a `reducer function`, and an `initial state`, and optional 
lazy init function (which takes in inital state as argument and returns the first state used by render).


1. must be pure, i.e should not make network request, schedule timeouts etc.
2. same inputs always result in same output.
3. Actions are queued until next render.
4. **reducers run during rendering**, but they can also be run eagerly outside of render(maybe first action dispatch) for bail out optimizations that do not trigger render (no state change).(e.g https://github.com/facebook/react/blob/17.0.1/packages/react-reconciler/src/ReactFiberHooks.new.js#L1749) e.g. https://codesandbox.io/s/brave-worker-listdc?file=/src/App.js
5. Reducers should `update objects and arrays without mutations`.

In essence, reducers are queued pure functions that run on previousState+action during render to return updated state for render to proceed.

Your reducers must return new state in order to re-render!, i.e it also relies on referential equality that is `Object.is` based comparision.

* Each action describes a single user interaction, even if that leads to multiple changes in the data. For example, if a user presses “Reset” on a form with five fields managed by a reducer, it makes more sense to dispatch one `reset_form` action rather than five separate `set_field` actions

`useReducer` implementation using `useState`:
```js
import { useState } from 'react';

export function useReducer(reducer, initialState) {
	const [state, setState] = useState(initialState);

	function dispatch(action) {
  		setState(s => reducer(s, action));
	}

	return [state, dispatch];
}
```


### How to run useEffect hook code only on update (not on mount)?

```jsx
cnst isInitialMount = useRef(true);
useEffect(() => {
  if(isInitialMount.current){
    isInitialMount.current = false;
  } else {
    // run the effect code here!
  }
});
```

### Context

Context lets you write components that adapt to their 
surroundings and display themselves differently depending on where or in which context they are being rendered.

* Different React contexts don't override each other.

* overriding - Only way to override some context coming from above is to wrap children into a context provider with different value.

Context has to be created once, but different `values` can 
be exposed via different `Provider copmponents` of the same context (created via React.createContext).

Steps to using context:
1. Create a context. (usually in separate file exported as singleton - why?)
2. Use that context from component that needs the data.
3. Provide that context from component that specifies data.

Use cases for context:
1. theming/language selection
2. Current account/logged in user
3. Routing - global knowledge of current active route
4. Managing state - 

**ContextName.Provider** is a `react component` that has a `value` prop
and `children` 

**Whenever a Context provider has a new Context value, all context consumers must receive the new value and re-render**.

**Memo** will not stop internal context consumer from re-rendering.
#### Nested providers

Nearest provider in the hierarchy tree is picked up,
In below example:
`red` and `blue` are picked by respective `Component` that uses `useContext`.
```jsx
      <ColorContext.Provider value="red">
        <Component />
      </ColorContext.Provider>
      <ColorContext.Provider value="yellow">
        <ColorContext.Provider value="blue">
          <Component />
        </ColorContext.Provider>
      </ColorContext.Provider>
```

#### Multiple providers

We can have multiple providers with different values each.

#### Usage of `useContext` without a provider in the parents

In case a context is used/consumed without any parent in the
tree hierarchy, the value provided in the `createContext` factory serves
as the default value.
The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This default value can be helpful for testing components in isolation without wrapping them.
e.g.
```js
const ColorContext = React.createContext("green");// default value in case of no providers

export default function App() {
  const color = useContext(ColorContext);// color is green
  return (
    <div className="App">
      <h1>Hello CodeSandbox contextval: {color}</h1>
    </div>
  );
}
```

#### Common Pattern: Combine state with Context.Provider into a single component 

e.g.
```js
const CommonProvider = ({ children })=> {
  const [state, setState] = useState(0);
  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}

// usage site
const App() {
  return (
    <div>
      <CommonProvider>
        <ComponentThatConsumesContext />
      </CommonProvider>
    </div>
  )
}
```

#### Optimizing context children with memo

https://kcd.im/optimize-context


### Implementing useState using useReducer

```js
function simpleReducer(s, a) {
  if (a.type === "replace") {
    return a.newVal;
  } else if (a.type === "apply") {
    return a.fn(s);
  }
  return s;
}
const myUseState = function (initialState) {
  const [x, dispatchX] = useReducer(simpleReducer, initialState);

  function setterFn(val) {
    if (typeof val === "function") {
      dispatchX({
        type: "apply",
        fn: val
      });
    } else {
      dispatchX({
        type: "replace",
        newVal: val
      });
    }
  }
  return [x, setterFn];
};
```

even more simplified implementaiton:
```js
function reducer(prevState, action){
  return typeof action === 'function' ? action(prevState) : action;
}

const useState = (initialState) => useReducer(reducer, initialState);
```

### implementing useReducer using useState

```js
const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    setState(prevState => reducer(prevState,action));
  }
  return [state, dispatch];
}
```

### Counting number of renders using useRef and useEffect

`useRef` to have a independent mutable storage counting renders.
`useEffect` to synchronize the post render count via effect.

```js

function ComponentWithRenderCount() {
  const renderCountRef = React.useRef(1);
  React.useEffect(() => {
    renderCountRef.current++;// update rendercount to be used in next render
  });
  return <div>{`Rendered ${renderCountRef.current} times`}</div>;
}
```

Extracting that logic to a hook:
```js
function useRenderCount() {
  const renderCountRef = React.useRef(1);
  React.useEffect(() => {
    renderCountRef.current++;
  });
  return renderCountRef.current;
}

function ComponentUsingRenderCountHook() {
  const renderCount = useRenderCount();
  return <div>{`Rendered ${renderCount} times`}</div>;
}
```


### Using context via custom hooks

1. create context with `null` default value. Which indicates default is not usable,
and a provider is always required.

2. Do checking for null value in custom hook, so that to verify if it is present under atleast one provider.

```tsx
type CountContextType = [number, Dispatch<SetStateAction<number>>];

const Count1Context = React.createContext<CountContextType | null>(null);

export const Count1Provider = ({ children }: { children: ReactNode }) => {
  return (
    <Count1Context.Provider value={useState(0)}>
      {children}
    </Count1Context.Provider>
  );
};

// custom hook instead of direct usage of useContext
function useCount1() {
  const value = React.useContext(Count1Context);
  if (value === null) {
    throw new Error("Empty Providers above!");
  }
  return value;
}
```

### Common pattern for storing state in Context, expose state and state setters

Provide both state, and state setter methods via `Provider value prop`.
e.g. 
```tsx
// [state, setState] available as value to descendants of context
return (
  <Context.Provider value={useState(0)}>
    {children}
  </Context.Provider>
);
```

### A factory for setting up state context and custom hook

We would create a function `createStateContext` that has:

1. input - a function `useValue` that takes in a initfn and returns state, `useValue: init => State`.
2. output - a tuple of `[ProviderComponent, customHookToGetState]`.

* We will need to give inital value to state provider from outside
* We will need to give state holder/manager i.e state setter/getter mechanism from outside via `useValue`.

```tsx
const createStateContext = (useValue: any) => {
  const StateContext = React.createContext(null);
  const StateProvider = ({
    children,
    initialValue
  }: {
    initialValue: any;
    children: ReactNode;
  }) => {
    return (
      <StateContext.Provider value={useValue(initialValue)}>
        {children}
      </StateContext.Provider>
    );
  };
  const useContextState = () => {
    const state = React.useContext(StateContext);
    if (state === null) {
      throw new Error("Missing Provider above!");
    }
    return state;
  };
  return [StateProvider, useContextState];
};

const useNumberState = (init: any) => useState(0 || init);

const [Count1StateProvider, useCount1State] = createStateContext(
  useNumberState
);
const [Count2StateProvider, useCount2State] = createStateContext(
  useNumberState
);

export default function App() {
  return (
    <div className="App">
      <Count1StateProvider initialValue={0}>
        <Count2StateProvider initialValue={0}>
          <Parent />
        </Count2StateProvider>
      </Count1StateProvider>
    </div>
  );
}
```

### Avoid Provider nesting with `reduceRight`

