
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

In case of ref being used on html element, current points to dom node.
In case of ref being used on a custom class component, current points to mounted instance of the component.

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

#### React setState signatures

Think of setState as a request rather than a mutation.
never mutate this.state directly. Use this.setState,
also you can optionally pass callback to this.setState which will be fired once state is applied.
Another option is to use componentDidUpdate.

this.setState(updater, [callback]) and signature of updater is (prevState, props) => stateChangeObj
// dont change prevState, make a new object instead.
e.g.
``` javascript
this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
});
```

or
this.setState(stateObj, [callback])  // perform shallow merge of stateObj into current this.state
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

ReactElements form a lightweight vDom which just contains
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

### React Context

#### Legacy React Context (pre-16.3)

The place where context is used, you have to use via `this.context.interestingproperty` along with specifying `Component.contextTypes = { interestingProperty: interestingPropertyType}`. If contextTypes is not defined, then context will be an empty object.


Also somewhere in the ancestors, we need to specify `getChildContext(){}` and `Ancestor.childContextTypes =  interestingProperty: interestingPropertyType`

#### React Context (16.3 and after)


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




