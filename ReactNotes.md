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


 ## React Fiber

 It breaks rendering into chunks rather than a single recursive call, using some sort of data structure - fiber that tracks work.

 React Fiber also takes into account work priorities for the processing of render related work.

Work In Progress tags:
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




