
### Render function calling

Whenever a render function is called, it will recursively call render function of all the children (all levels - nothing skipped), unless there is some memo in between.

render function call of a component will, by default, cause all to call render function of components inside of it!

React does not care whether "props changed" - it will call render child function components unconditionally just because the parent render function got called!

### child render function call order

if we create some react elements but dont use them, their render function is never called.

**Note** - react element creation is not the same as calling that component's render function.

e.g.
```js
return (
  <div>
    <A>
      <B />
    </A>
  </div>
)
// is equivalent to
return (
  <div>
    <A children={<B />} />
  </div>
);
// is equivalent to:
return _react2.default.createElement(
    "div", null,
    _react2.default.createElement(A, null,// A's render function decides what to do with child B's element
        _react2.default.createElement(B, null)),
    _react2.default.createElement(D, null));
```

B's reactElement is created before A's reactElement, but B's render function is called after A's render function.

B is kind of like an opaque object/reactElement till A decides to actually make use of it via its render function.

Equivalent JS modeling of the same idea:
```js
function B() {
    console.log("B got called");
}
  
function A({
    children /* i could do something with this argument, but not gonna */,
}) {
    console.log("A got called");
}
  
function createWhatever(Thingy, argsies) {
    return () => Thingy(argsies);
}
  
const whatever = createWhatever(A, { children: createWhatever(B) });
  
whatever(); // log in A gets called, but the log in B doesn't
```

### Same element reference returned as render function output, (will skip child/children render)

if a React component returns the **exact same element reference** e.g. `children prop` in its render output as it did the last time, React will skip re-rendering that particular child.

e.g.
see [Gotcha](ReactGotchas.md)

### hooks setState vs API setState

API setState for class components:
call to `this.setState()` always results in a re-render, even if same state value is set.

`hooks setstate`(https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update): For a functional component using useState hook, the setter if called with the same state will not trigger a re-render. However for an occasional case if the setter is called immediately it does result in two renders instead of one


`Same component at the same position in the UI tree preserves state`. (Reconciliation at props change level does not create a new component instance, just re-render same component instance with new props).
Different components (by name) at the same position reset state. (Reconciliation destroys old component and creates new one.)
if you want to preserve the state between re-renders, the structure of your tree needs to “match up” from one render to another.
React preserves a component’s state for as long as it’s being rendered at its position in the UI tree. If it gets removed, or a different component gets rendered at the same position, React discards its state.

### Why not nest component definitions ?
This is why you should not nest component function definitions.
IN example below,
**Every time you click the button, the input state disappears!**

This is because a `different MyTextField` function is `created for every render of MyComponent`. 
`You’re rendering a different component in the same position, so React resets all state below`. This leads to bugs and performance problems. To avoid this problem, always declare component functions at the top level, and don’t nest their definitions.

```js
// add example here
// https://beta.reactjs.org/learn/preserving-and-resetting-state
import { useState } from 'react';

export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  // each Run of MyComponent creates a new component named MyTextField
  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Clicked {counter} times</button>
    </>
  );
}
```

### How to reset state, when similar component rendered at same place in UI tree?
By default react will call render on the same instance,if only props changed.

Two ways to reset state when switching between them:
1. Render components in different positions (you can use if/conditionals)
e.g.
```js
  // isPlayer=true will render: (<Counter />, false)
  // isPlayer=false will render: (false, <Counter />)
  return (
    <div>
      {isPlayerA &&  
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
```
2. Give each component an explicit identity with key - keys let you tell React that this is not just a first counter, or a second counter, but a specific counter—for example, Taylor’s counter. This way, React will know Taylor’s counter wherever it appears in the tree!
```js
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
```


example case:
state should reset when different player take turns, because each player has a different score:
```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
### Resetting form with key

One would want to reset form data when switching between different
contacts to chat.
```jsx
<Chat key={to.id} contact={to} />
```
This ensures that when you select a different recipient, the Chat component will be recreated from scratch, including any state in the tree below it. React will also re-create the DOM elements instead of reusing them.

Thinks of this as useful in reset in master-detail, where detail is a form to be filled.
each `Detail` component would have a `key`, like in the `Chat` component above.e.g. `<Form key=idforwhichformisbeingfilled />`

`key` on items, is also useful for swapping items within a list.


### How to migrate from `useState` to `useReducer`

1. Move from setting `state` to `dispatching actions`.
2. Write a `reducer function` - React will set the state to what you return from the reducer.
```js
function yourReducer(state, action) {
  // return next state for React to set
}
```
3. Use the reducer from your component.
```js
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```
The useReducer Hook takes two arguments: 

1. A reducer function
2. An initial state

And it returns:
1. A stateful value
2. A dispatch function (to “dispatch” user actions to the reducer)

Each action describes a single user interaction, even if that leads to multiple changes in the data. For example, if a user presses “Reset” on a form with five fields managed by a reducer, it makes more sense to dispatch one reset_form action rather than five separate set_field actions. If you log every action in a reducer, that log should be clear enough for you to reconstruct what interactions or responses happened in what order.

Use Immer if you want to write reducers in a mutating style.(https://github.com/immerjs/use-immer#useimmerreducer)
### special props

there are two special props (ref and key) which are used by React, and are thus not forwarded to the component.

## react dom event callbacks

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

### React Refs
it can be inconvenient for highly reusable “leaf” components like FancyButton or MyTextInput. These components tend to be used throughout the application in a similar manner as a regular DOM button and input, and accessing their DOM nodes may be unavoidable for managing focus, selection, or animations

Refs provides a way to access DOM nodes or react elements created in render method

Cannot use ref attribute on function components bcoz they don't have instances.

Two part process: 
1. creation via `createRef`, usually in constructor. e.g. `this.myRef = React.createRef()`.
2. attaching via `ref` attribute in a react element in render method e.g. 
`ref={this.myRef}`, where `this.myRef` is the ref created via `1.`


Shape of ref variable `{ current: any }`, e.g. `const node = this.myRef.current`.

What is attached to ref.current?

1. In case of ref being used on html element, current points to dom node.
2. In case of ref being used on a custom class component, current points to mounted instance of the component.
3. **You may not use ref attribute on function components** because they do not have instances.

NOte: however you can use ref attribute **inside** a function as long as you refer to a dom
or class component via `useRef`:
```js
function CustomTextInput(props) {
  const textInput = useRef(null);
  
  function handleClick() {
    textInput.current.focus();
  }
return (
    <div>
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

ref updates happen before componentDidMount or componentDidUpdate lifecycle methods

#### callback refs

Provide a callack where argument is access to the node directly, no `current` involvement.

```js
// Use the `ref` callback to store a reference to the text input DOM
        <input
          type="text"
          ref={this.setMyInputNode}
        />

// ...
  function setMyInputNode = (el) => {
    this.myInputNode = el;
  }
```

React will call the ref callback with the DOM element when the component mounts, and call it with null when it unmounts. Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.

If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. You can avoid this by defining the ref callback as a bound method on the class, but note that it shouldn’t matter in most cases.


#### Custom ref prop like `innerRef` vs ref forwarding

One needs to use ref forwarding only if they want prop name to be `ref` i.e. maintain the `ref` contract to other components, because
`ref` is a special prop name which does not get forwarded.

For all other cases, custom ref props just work fine like `innerRef` etc, just work fine.


#### Ref forwarding pre 16.3

https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509

#### Ref forwarding post 16.3

https://reactjs.org/docs/forwarding-refs.html
Ref forwarding is a technique for automatically passing a ref through a component to one of its children.

`React.forwardRef` accepts a render function that receives props and ref parameters and returns a React node. Basically make your function component accept one more parameter named ref and set it up where it really goes, button in this case.

e.g.
```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;// ref.current directly refers to button instead of FancyButton instance due to forwarding
```

If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component.
This means that refs intended for our FancyButton component will actually be attached to the LogProps component (an HOC).

To fix it use following:
```js
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```
**Ref forwarding is not limited to DOM components. You can forward refs to class component instances, too.**

#### useRef vs createRef

The difference is that `createRef` will always create a new ref. In a class-based component, you would typically put the ref in an instance property during construction (e.g. `this.input = createRef()`). You don't have this option in a function component. `useRef` takes care of returning the same ref each time as on the initial rendering.

Keep in mind that useRef doesn’t notify you when its content changes. Mutating the `.current` property doesn’t cause a re-render. If you want to run some code when React attaches or detaches a ref to a DOM node, you may want to use a callback ref instead

Also for element based `refs` needed in dom manipulation, use below instead of 
`useRef`:
```js
const Example = () => {
   const [ref, setRef] = useState(null);
   const onRefSet = useCallback(ref => {
      setRef(ref);
      ref.current.focus(); // a side effect!
   });

   // well, you can re
   return <div ref={onRefSet}>😎</div>
}
```

#### React setState signatures

Think of setState as a request for state change rather than a mutation.
never mutate `this.state` directly. Use `this.setState`,
also you can optionally pass callback to `this.setState` which will be fired once state is applied.
Another option is to use componentDidUpdate.

Why use updater function style of setState?
React batches state changes for performance reasons, so the state may not change immediately after `setState()` is called. That means you should not rely on the current state when calling `setState() ` since you can't be sure what that state will be. **The solution is to pass a function to setState(), with the previous state as an argument**.


`this.setState(updater, [callback])` and signature of updater is `(prevState, props) => stateChangeObj`
// dont change prevState, make a new object instead.
e.g.
``` javascript
this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
});
```

or
`this.setState(stateObj, [callback])`  // perform shallow merge of `stateObj` into current `this.state`
e.g.
``` javascript
this.setState({quantity: 2})
```

All three types of usages of setstate shown below.
```js
this.setState({ counter: 2 });
this.setState({ counter: 5},() => {
    // cb executed only after render is complete
    console.log('cb reading state', this.state);// prints 6
});
// setstate with updater function
this.setState((prevState, props) => {
    console.log('updater fn, prevState = ', prevState);// 5
    return { counter: prevState.counter + 1};
});
```

### componentDidUpdate

Called after updating/render.
You can call setstate, but wrap inside an if condition to prevent infinte recursion
```js
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

#### React controlled Components

In React, this is usually solved by making a component “controlled”. Just like the DOM `<input>` accepts both a `value` and an `onChange` prop, so can the custom TemperatureInput accept both `temperature` and `onTemperatureChange` props from its parent Calculator. Also known as moving state up.



#### React render props

a render prop is a function prop that a component uses to know what to render. One interesting thing to note about render props is that you can implement most higher-order components (HOC) using a regular component with a render prop. In fact, any prop that is a function that a component uses to know what to render is technically a “render prop”.

##### Render props and PureComponent optimization

Using a render prop can negate the advantage that comes from using React.PureComponent if you create the function inside a render method. This is because the shallow prop comparison will always return false for new props, and each render in this case will generate a new value for the render prop.

This can be avoided by not creating new functions on each render.
```jsx
class MouseTracker extends React.Component {
  // Defined as an instance method, `this.renderTheCat` always
  // refers to *same* function when we use it in render
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

#### React Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

#### React JSX syntax

In react, JSX syntax is just sugar for `react.createElement(ComponentName, props, children)`,
which we usually write in jsx as following
``` jsx
<ComponentName
  prop1={prop1}
  prop2={prop2}
>
  children
</ComponentName>
```

**NOTE** : don't name your ComponentName with a small case letter or it will treat it as a native element like 'div' or 'h1', to remind babel/react that it is a class/function, custom component names should be capitalized.

#### ReactElement

ReactElements form a lightweight vDom/json description which just contains
types and props.

``` jsx
<CmpName
  prop={propVal1}
>
  children
</CmpName>
```
is sugar for
``` js
{
  type: CmpName,
  props: {
    prop: propVal1
  }
}
```

If recursively evaluated completely, the element tree will only contain host elements e.g. h1/div etc for DOM or View/Text etc for native.

A React component usually returns react elements given props.

### shouldComponentUpdate

`shallow equal` is not the same as `===`
It is `===` + top/first level `===` in case objects key/values.

A `PureComponent`s `sCU` only `shallowly compares props and state both`.
If they are same, no need to render the tree.

### React HOCs

```js
/* hoc builders are usually exposed as functions
 passed with existing component to enhance it.
 hocfn :: Component -> Component */
export default function(WrappedComponent) {
    class Authentication extends Component {
        // add extra functionality
        render() {
            // passing through given props,
            // consume props which are only meant for hoc
            return (<WrappedComponent
                        {...this.props}
                    />);
        }
    }

    return Authentication;
}
```

HOCs are used typically by all state management libraries to create containers with data,
like redux's connect, or relay's createContainer to inject props of data into our dumb-components. 

### rendering and `children` prop

Whenever a `children` prop is used i na `GivenComponent`.
the `render`ing of `children` components, has already happened inside of parent of `GivenComponent`, and we are
given reference of those. 
so `re-render` of `GivenComponent`, will not cause
a re-render of `children`, as they are used by reference.

https://www.youtube.com/watch?v=3XaXKiXtNjw


### When to reach out for global state?
If you need state in two components that
are far away in the component tree, and probably
both of them can change it, it would
not be desirable to pass it all the way down
to the two components via prop drilling.
Intermediate components might not need the un-necessary props.



### React Context

#### Legacy React Context (pre-16.3)

The place where context is used, you have to use via `this.context.interestingproperty` along with specifying `Component.contextTypes = { interestingProperty: interestingPropertyType}`. If contextTypes is not defined, then context will be an empty object.


Also somewhere in the ancestors, we need to specify `getChildContext(){}` and `Ancestor.childContextTypes =  interestingProperty: interestingPropertyType`

#### React Context (16.3 and after)

1. createContext + Provider + Consumer
Use `createContext` + `CreatedContext.Provider with value prop` at the site of the provider and
+
Use `CreatedContext.Consumer` which has function as a child, which looks like `(context) => (return some element)`, in the site of use.

2. `createContext` + `Provider` + `static contextType = MyContext` + `this.context` in class

3. `createContext` + `Provider` + `useContext` hook

All consumers that are descendants of a `Provider` will re-render whenever the `Provider`’s value prop changes. The propagation from `Provider` to its descendant consumers (including `.contextType` and `useContext`) is not subject to the `shouldComponentUpdate` method, so the consumer is updated even when an ancestor component skips an update.

#### useContext hook

If you’re familiar with the context API before Hooks, `useContext(MyContext)` is equivalent to `static contextType = MyContext` in a class, or to `<MyContext.Consumer>`.

`useContext(MyContext)` only lets you read the context and subscribe to its changes. You still need a `<MyContext.Provider>` above in the tree to provide the value for this context.

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);  
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
        I am styled by theme context!
    </button>
  );
}
```

#### this.context vs Context.Consumer vs useContext for consuming a context


### React.memo

Class components can bail out from rendering when their input props are the same using PureComponent or shouldComponentUpdate. Now you can do the same with function components by wrapping them in React.memo.

```js
// memoize functional-component in terms of props
const MyComponent = React.memo(function MyComponent(props) {
  /* only rerenders if props change */
});
```


### React.useMemo (vs React.memo)

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Returns a memoized value.

Pass a “create” function and an array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

Remember that the function passed to `useMemo` runs during rendering. Don’t do anything there that you wouldn’t normally do while rendering. For example, side effects belong in `useEffect`, not `useMemo`.

In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without useMemo — and then add it to optimize performance

### React.useEffect

If you have a `useEffect` function without dependencies, it will be called after
every render.

If you have a `useEffect` function with `[]` as dependencies, it is same as
`componentDidMount`.

`useEffect` function, can optionally return a cleanup function.

useEffect will not accept `async` functions. The alternative is to declare and use async function inside a regular useEffect function.

```js
import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Fetcher({ url }) {
  const [data, setData] = useState(null);

  useEffect(
    () => {
      // Start it off by assuming the component is still mounted
      let mounted = true;

      const loadData = async () => {
        const response = await Axios.get(url);
        // We have a response, but let's first check if component is still mounted
        if (mounted) {
          setData(response.data);
        }
      };
      loadData();

      return () => {
        // When cleanup is called, toggle the mounted variable to false
        mounted = false;
      };
    },
    [url]
  );

  if (!data) {
    return <div>Loading data from {url}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
```

Unlike `componentDidMount` and `componentDidUpdate`, the function passed to `useEffect` fires after layout and paint, during a deferred event. This makes it suitable for the many common side effects, like setting up subscriptions and event handlers, because most types of work shouldn’t block the browser from updating the screen.

Although `useEffect` is deferred until after the browser has painted, it’s guaranteed to fire before any new renders. React will always flush a previous render’s effects before starting a new update.

#### Dependencies of useEffect

Make sure all the props/state that are used by effect are specified as dependencies:
```js
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

functions as dependencies of `useEffect` effect function:
Recommended solution: move functions inside useEffect.
```js
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId); // Uses productId prop    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 Invalid because `fetchProduct` uses `productId`  // ...
}
```

Correct way to write a counter with `useState` and `useEffect`:
```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope
  return <h1>{count}</h1>;
}
```

**Why refs not needed in useEffect dependencies** - The reason behind this is that `useRef` isnot related to the render cycle. I mean, it's not recreated, neither is automatically updated after every render, like `state`, `props` or variables created during render usually are.
Moreover object created by `useRef` lasts lifetime of the component.
It works because `useRef` return value doesn't change on renders.

### React portal

`ReactDOM.createPortal(child, container)` - used to render child outside of a parent.
A typical use case for portals is when a parent component has an overflow: hidden or z-index style, but you need the child to visually “break out” of its container. For example, dialogs, hovercards, and tooltips.

Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree.

This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
export default function Modal(props) {
  if(!props.open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div style={{ zIndex: 1000, position: 'fixed', left: 0,top:0, bottom: 0,right: 0, backgroundColor: 'rgba(0,0,0,0.6)'}}>
      <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white'}}>
      <button onClick={props.onClose}>
        Close
      </button>
      {props.children}
      </div>
    </div>,
    document.getElementById('portal-root')
  );
}
```
#### Desigining portal component

Important prop: children : whatever you want to show within modal, that should be children
of Modal component.

### useCallback hook

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
Returns a memoized callback.

Pass an inline callback and an array of dependencies. `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. `shouldComponentUpdate`).

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

**Note** - The array of dependencies is not passed as arguments to the callback. Conceptually, though, that’s what they represent: every value referenced inside the callback should also appear in the dependencies array.

### useReducer hook

`const [state, dispatch] = useReducer(reducer, initialArg, init);`

The identity of the `dispatch` function from `useReducer` is always stable — even if the reducer function is declared inside the component and reads its `props`.

```
function Example(props) {
  // Keep latest props in a ref.  
  const latestProps = useRef(props);  
  useEffect(() => {    latestProps.current = props;  });
  useEffect(() => {
    function tick() {
      // Read latest props at any time      
      console.log(latestProps.current);    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // This effect never re-runs
  }
```

### useState hook

`const [state, setState] = useState(initialState);`

React guarantees that setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.

`setState` can be functional (calculate new state based on prev e.g. like in reducers): 
```jsx
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

`useState` can also accept a function: used for lazy initialization:
If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render
```js
const [state, setState] = useState(() => {
  const initialState = doExpensiveComputation();
  return initalState;
});
```

**Note** - useState has this optimisation:
If you update a State Hook to the same value as the current state, React will bail out without rendering the children or firing effects (Uses `Object.is` i.e. reference/prmitive equality).


### useMemo Use cases

1. expensive computation caching
2. reference based caching of frequently reacreated objects/functions on each render.

### useCallback

special case of `useMemo`, where computed value to cache is a function/callback.

### useReducer hook

useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.
for initial state, object or more complex state.

**React guarantees that dispatch function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.**

Basic usage:
```js
const [state, dispatch] = useReducer(reducer, initialArgOrState, init);// if init fn is specified, it takes initArg as arg to create initial state
```

shape of reducer fn: `(currState, action) => newState`, think designing like functional setstate e.g where you derive new state
from old state and action.
Since reducers are pure, they can sit outside of component also

Reducer return value is compared with object.is to decide to bail out or render


### React lifecycle for a composite component in Stack reconciler

``` 
 * ------ The Life-Cycle of a Composite Component ----------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * ---------------------------------------
 */
 ```

### React Fiber - ReactUpdateQueue

// UpdateQueue is a linked list of prioritized updates.
//
// Like fibers, update queues come in pairs: a current queue, which represents
// the visible state of the screen, and a work-in-progress queue, which is
// can be mutated and processed asynchronously before it is committed — a form
// of double buffering. If a work-in-progress render is discarded before
// finishing, we create a new work-in-progress by cloning the current queue.
//
// Both queues share a persistent, singly-linked list structure. To schedule an
// update, we append it to the end of both queues. Each queue maintains a
// pointer to first update in the persistent list that hasn't been processed.
// The work-in-progress pointer always has a position equal to or greater than
// the current queue, since we always work on that one. The current queue's
// pointer is only updated during the commit phase, when we swap in the
// work-in-progress.
//
// For example:
//
//   Current pointer:           A - B - C - D - E - F
//   Work-in-progress pointer:              D - E - F
//                                          ^
//                                          The work-in-progress queue has
//                                          processed more updates than current.
//
// The reason we append to both queues is because otherwise we might drop
// updates without ever processing them. For example, if we only add updates to
// the work-in-progress queue, some updates could be lost whenever a work-in
// -progress render restarts by cloning from current. Similarly, if we only add
// updates to the current queue, the updates will be lost whenever an already
// in-progress queue commits and swaps with the current queue. However, by
// adding to both queues, we guarantee that the update will be part of the next
// work-in-progress. (And because the work-in-progress queue becomes the
// current queue once it commits, there's no danger of applying the same
// update twice.)
//
// Prioritization
// --------------
//
// Updates are not sorted by priority, but by insertion; new updates are always
// appended to the end of the list.
//
// The priority is still important, though. When processing the update queue
// during the render phase, only the updates with sufficient priority are
// included in the result. If we skip an update because it has insufficient
// priority, it remains in the queue to be processed later, during a lower
// priority render. Crucially, all updates subsequent to a skipped update also
// remain in the queue *regardless of their priority*. That means high priority
// updates are sometimes processed twice, at two separate priorities. We also
// keep track of a base state, that represents the state before the first
// update in the queue is applied.
//
// For example:
//
//   Given a base state of '', and the following queue of updates
//
//     A1 - B2 - C1 - D2
//
//   where the number indicates the priority, and the update is applied to the
//   previous state by appending a letter, React will process these updates as
//   two separate renders, one per distinct priority level:
//
//   First render, at priority 1:
//     Base state: ''
//     Updates: [A1, C1]
//     Result state: 'AC'
//
//   Second render, at priority 2:
//     Base state: 'A'            <-  The base state does not include C1,
//                                    because B2 was skipped.
//     Updates: [B2, C1, D2]      <-  C1 was rebased on top of B2
//     Result state: 'ABCD'
//
// Because we process updates in insertion order, and rebase high priority
// updates when preceding updates are skipped, the final result is deterministic
// regardless of priority. Intermediate state may vary according to system
// resources, but the final state is always the same.


 ## React Fiber


File for class instance: `ReactFiberClassComponent.js`

 It breaks rendering into chunks rather than a single recursive call, using some sort of data structure - fiber that tracks work.

A fiber is a JS object that corresponds to a stack frame, but it also
corresponds to an instance of a component. It contains info about a component,
its input and its output.

 React Fiber also takes into account work priorities for the processing of render related work.

Work In Progress/TypeOfWork tags:
1. IntermediateComponent
2. FunctionalComponet
3. ClassComponent
4. HostRoot
5. HostComponent
6. HostText
7. CallHandlerPhase
8. CallComponent
9. ReturnComponent
10. HostPortal
11. Fragment
12. Mode
13. ContextProvider
14. ContextConsumer

Effect Tags:
``` js
  const effects = {
    1: 'Performed Work',
    2: 'Placement',
    4: 'Update',
    8: 'Deletion',
    16: 'Content reset',
    32: 'Callback',
    64: 'Err',
    128: 'Ref',
  };
```

Fiber struct:
// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
export type Fiber = {|
  // These first fields are conceptually members of an Instance. This used to
  // be split into a separate type and intersected with the other Fiber fields,
  // but until Flow fixes its intersection bugs, we've merged them into a
  // single type.

  // An Instance is shared between all versions of a component. We can easily
  // break this out into a separate object to avoid copying so much to the
  // alternate versions of the tree. We put this on a single object for now to
  // minimize the number of objects created during the initial render.

  // Tag identifying the type of fiber.
  tag: TypeOfWork,

  // Unique identifier of this child.
  key: null | string,

  // The function/class/module associated with this fiber.
  type: any,

  // The local state associated with this fiber.
  stateNode: any,

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null,

  // Singly Linked List Tree Structure.
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref: null | (((handle: mixed) => void) & {_stringRef: ?string}),

  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any, // This type will be more specific once we overload the tag.
  memoizedProps: any, // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: UpdateQueue<any> | null,

  // The state used to create the output
  memoizedState: any,

  // Bitfield that describes properties about the fiber and its subtree. E.g.
  // the AsyncMode flag indicates whether the subtree should be async-by-
  // default. When a fiber is created, it inherits the mode of its
  // parent. Additional flags can be set at creation time, but after than the
  // value should remain unchanged throughout the fiber's lifetime, particularly
  // before its child fibers are created.
  mode: TypeOfMode,

  // Effect
  effectTag: TypeOfSideEffect,

  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null,

  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  // Represents a time in the future by which this work should be completed.
  // This is also used to quickly determine if a subtree has no pending changes.
  expirationTime: ExpirationTime,

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  alternate: Fiber | null,

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean,
|};

FiberRoot struct:
export type FiberRoot = {
  // Any additional information from the host associated with this root.
  containerInfo: any,
  // Used only by persistent updates.
  pendingChildren: any,
  // The currently active root fiber. This is the mutable root of the tree.
  current: Fiber,
  // Remaining expiration time on this root.
  remainingExpirationTime: ExpirationTime,
  // Determines if this root can be committed.
  isReadyForCommit: boolean,
  // A finished work-in-progress HostRoot that's ready to be committed.
  // TODO: The reason this is separate from isReadyForCommit is because the
  // FiberRoot concept will likely be lifted out of the reconciler and into
  // the renderer.
  finishedWork: Fiber | null,
  // Top context object, used by renderSubtreeIntoContainer
  context: Object | null,
  pendingContext: Object | null,
  // Determines if we should attempt to hydrate on the initial mount
  +hydrate: boolean,
  // List of top-level batches. This list indicates whether a commit should be
  // deferred. Also contains completion callbacks.
  // TODO: Lift this into the renderer
  firstBatch: Batch | null,
  // Linked-list of roots
  nextScheduledRoot: FiberRoot | null,
};


 React Fiber makes use of idleCallbacks to perform deferred work,
 Here is an example call stack:

idleCallback:
  performDeferredWork:
    performWork:
      workLoop:
        performUnitOfWork

performUnitOfWork typically consists of
  beginWork:
    updateFunctionalComponent:
      componentName


What happens in an animation frame in react-fiber:

animframecallback:
  update:
    render:
      renderSubtreeIntoContainer:
        updateContainer:
          scheduleTopLevelUpdate:
            performWork:
              workLoop:
                performUnitOfWork:
                  beginWork:
                    updateHostComponent:
                      pushHostContext:
                        getChildHostContext:
                          updatedAncestorInfo
                  completeUnitOfWork:
                    ...shown below
What completeUnitOfWork callstack looks like:
  completeUnitOfWork:
    completework,
    commitAllWork:
      commitAllHostEffects:
        commitWork:
          commitUpdate:
            updateProperties:
              updateDomProperties:
                setValueForStyles



### Hooks 

#### schema 
```js
function createHook(): Hook {
  return {
    memoizedState: null,

    baseState: null,
    queue: null,
    baseUpdate: null,

    next: null,
  };
}
```
`next` is also a hook:
```js

export type Hook = {
  memoizedState: any,

  baseState: any,
  baseUpdate: Update<any> | null,
  queue: UpdateQueue<any> | null,

  next: Hook | null,
};

type Effect = {
  tag: HookEffectTag,
  create: () => mixed,
  destroy: (() => mixed) | null,
  inputs: Array<mixed>,
  next: Effect,
};

type Update<A> = {
  expirationTime: ExpirationTime,
  action: A,
  next: Update<A> | null,
};

type UpdateQueue<A> = {
  last: Update<A> | null,
  dispatch: any,
};
```

Why the hook restrictions, because hooks form a linkedlist/queue like below:
```js
{
  memoizedState: 'foo',
  next: {
    memoizedState: 'bar',
    next: {
      memoizedState: 'bar',
      next: null
    }
  }
}
```


### Pattern - lifting elements up to prevent re-renders (children pattern also applies)


Case where `AdditionalInfo` component re-renders always

```js

const AdditionalInfo = () => {
  console.log("additional info re=render!");
  return <p>Some Information</p>;
};

const Component1 = ({ count, setCount }) => {
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>Inc</button>
      <AdditionalInfo />
    </div>
  );
};

const Component2 = ({ count, setCount }) => {
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>Inc</button>
    </div>
  );
};

const Parent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Component1 count={count} setCount={setCount} />
      <Component2 count={count} setCount={setCount} />
    </>
  );
};
```

`<AdditionalInfo >` component can be lifted up to prevent re-renders. It is created when `GrandParent` was asked to render. 
`Parent` and other deeper components just refer to `AdditionalInfo Element` by prop reference and do not ask to render it.

```js
export default function App() {
  return <GrandParent />;
}

const AdditionalInfo = () => {
  console.log("additional info re=render!");
  return <p>Some Information</p>;
};

const Component1 = ({ count, setCount, additionalInfo }) => {
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>Inc</button>
      {additionalInfo}
    </div>
  );
};

const Component2 = ({ count, setCount }) => {
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>Inc</button>
    </div>
  );
};

const Parent = ({ additionalInfo }) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Component1
        additionalInfo={additionalInfo}
        count={count}
        setCount={setCount}
      />
      <Component2 count={count} setCount={setCount} />
    </>
  );
};

const GrandParent = () => {
  return <Parent additionalInfo={<AdditionalInfo />} />;
};
```

## Implementation notes

https://reactjs.org/docs/implementation-notes.html

### React elements, components and Mounting

* React elements are plain objects representing the component type (e.g. App) and the props.
* User-defined components (e.g. App) can be classes or functions but they all “render to” elements.
* `Mounting` is a recursive process that takes an element and creates a DOM or `Native tree` given the top-level React element (e.g. `<App />`).

```js
function isClass(type) {
  // React.Component subclasses have this flag
  return (
    Boolean(type.prototype) &&
    Boolean(type.prototype.isReactComponent)
  );
}

// This function only handles elements with a composite type.
// For example, it handles <App /> and <Button />, but not a <div />.
function mountComposite(element) {
  var type = element.type;
  var props = element.props;

  var renderedElement;
  if (isClass(type)) {
    // Component class
    var publicInstance = new type(props);
    // Set the props
    publicInstance.props = props;
    // Call the lifecycle if necessary
    if (publicInstance.componentWillMount) {
      publicInstance.componentWillMount();
    }
    renderedElement = publicInstance.render();
  } else if (typeof type === 'function') {
    // Component function
    renderedElement = type(props);
  }

  // This is recursive but we'll eventually reach the bottom of recursion when
  // the element is host (e.g. <div />) rather than composite (e.g. <App />):
  return mount(renderedElement);
}

// This function only handles elements with a host type.
// For example, it handles <div /> and <p /> but not an <App />.
function mountHost(element) {
  var type = element.type;
  var props = element.props;
  var children = props.children || [];
  if (!Array.isArray(children)) {
    children = [children];
  }
  children = children.filter(Boolean);

  // This block of code shouldn't be in the reconciler.
  // Different renderers might initialize nodes differently.
  // For example, React Native would create iOS or Android views.
  var node = document.createElement(type);
  Object.keys(props).forEach(propName => {
    if (propName !== 'children') {
      node.setAttribute(propName, props[propName]);
    }
  });

  // Mount the children
  children.forEach(childElement => {
    // Children may be host (e.g. <div />) or composite (e.g. <Button />).
    // We will also mount them recursively:
    var childNode = mount(childElement);

    // This line of code is also renderer-specific.
    // It would be different depending on the renderer:
    node.appendChild(childNode);
  });

  // Return the DOM node as mount result.
  // This is where the recursion ends.
  return node;
}

function mount(element) {
  var type = element.type;
  if (typeof type === 'function') {
    // User-defined components
    return mountComposite(element);
  } else if (typeof type === 'string') {
    // Platform-specific components
    return mountHost(element);
  }
}

var rootEl = document.getElementById('root');
var node = mount(<App />);
rootEl.appendChild(node);

```

### Internal instances

instance of the user-defined class a “public instance”. 
The public instance is what you see as `this` in the `render()` and other methods of your custom components.

will call instances of CompositeComponent and DOMComponent “internal instances”. They exist so we can associate some long-lived data with them. Only the renderer and the reconciler are aware that they exist.

The composite internal instances need to store:

* The current element.
* The public instance if element type is a class.
* The single rendered internal instance. It can be either a DOMComponent or a CompositeComponent.

The host internal instances need to store:

* The current element.
* The DOM node.
* All the child internal instances. Each of them can be either a DOMComponent or a CompositeComponent.

