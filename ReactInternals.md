### React internals code flow

A `fiber` is a JavaScript object that contains information about a component, its input, and its output.

A `fiber` corresponds to a stack frame, but it also corresponds to an instance of a component.

The `type` and `key` of a fiber serve the same purpose as they do for React elements. (In fact, when a fiber is created from an element, these two fields are copied over directly.)

Unlike React elements which are re-created on every render, `fibers aren’t re-created on every render`.These are mutable data structures that hold components state and DOM.

Scheduling - updates like set state are queued and run on browser idle callback e.g. requestIdleCallback., which is a callback with a deadline duration. Two things important to scheduling (i.e. work loop ): `nextUnitOfWork` and `timeRemaining`.


child and sibling
Note there is no children reference, only child and sibling references to recurse
These fields point to other fibers, describing the recursive tree structure of a fiber.
The sibling field accounts for the case where render returns multiple children (a new feature in Fiber!):
```jsx
function Parent() {
  return [<Child1 />, <Child2 />]
}
```
The child fibers form a singly-linked list whose head is the first child. So in this example, the child of Parent is Child1 and the sibling of Child1 is Child2.

`return`: 
The return fiber is the fiber to which the program should return after processing the current one. It is conceptually the same as the return address of a stack frame. It can also be thought of as the parent fiber.

If a fiber has multiple child fibers, each child fiber's return fiber is the parent. So in our example in the previous section, the return fiber of Child1 and Child2 is Parent.

`pendingProps` and `memoizedProps`
Conceptually, props are the arguments of a function. A fiber's pendingProps are set at the beginning of its execution, and memoizedProps are set at the end.
When the incoming pendingProps are equal to memoizedProps, it signals that the fiber's previous output can be reused, preventing unnecessary work.


`effectList`:
List of changes needed that were recorded during fiber processing


`output`: 
Conceptually, the output of a fiber is the return value of a function.
Every fiber eventually has output, but output is created only at the leaf nodes by host components. The output is then transferred up the tree.
The output is what is eventually given to the renderer so that it can flush the changes to the rendering environment.

`memoizedState`:
For functional component, renderer stores hook info in fiber as memoizedstate property
Fiber keep reference to the first hook, and rest hooks follow in linked list chain via next

`Commit phase` : run all pending effects, updates, assignpendingprops to memoizedProps. Once done, switch pointers between current and WIP tree

In following order:

1. `Fiberbeginwork.js`
2. `Fibercompletework.js`
3. `Fibercommitwork.js` - commitWork and commitMount, appendChildren

Current fiber is what is on screen and `wipfiber` is draft version

Good place to put logs is begin work and complete work methods of firs two files

When logging filers, log fiber.type

`Renderwithhooks` is an export of `ReactFiberHooks`

Important function in begin work: 
```
export function reconcileChildren(current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderExpirationTime: ExpirationTime)
——> if current is null, workInProgress.child = mountChildFibers
——> if current is non-null, workInProgress.child = reconcileChildFibers
```
Append children connects host nodes

Hostcomponent are platform primitives like ‘div’, ‘p’ etc.

`Fiber.statenode` is reference to **host views/constructs**

`React native host ops done in ReactNativeHostConfig.js` - calls into UIManager API

For custom components, react element.type is function itself , also part of fiber.type

Flushing to external world happens in commitmutationeffects 

Creation of filers - createFiberFromTypeAndProps, createFiberFromElement
 in ReactFiber.js 

```
Where does Function component rendering happen?Inside ReactFiberHooks.js —> renderWithHooks(){..  let children = Component(props, secondArg); }
```

Link between React and ReactDOM -> ReactSharedInternals, important things include ReactCurrentOwner, ReactCurrentDispatcher


`ReactCurrentOwner` is singleton link between React library and the renderer.


RN/DOM renderer links current processing fiber to ReactCurrentOwner.current

Renderer owns the actual hooks implementation, renderer attaches hooks as dispatcher to `ReactCurrentDispatcher.current` while processing a fiber, dispatcher forwards calls to renderer for hooks 
```jsx
Let { classcomponentupdater } = renderer; // e.g. ReactDOM
Let { reconciler, platformrenderer} = renderer;
```
The root component is host root

### React.createElement
This is what jsx transpiles into.

`React.Createlement` creates its own brand new props object, inside which it will assign the passed props key/values

###

Rendering steps —————————>
  setIsRendering(true);
    ReactCurrentOwner.current = workInProgress;
    value = renderWithHooks(
      null,
      workInProgress,
      Component,
      props,
      context,
      renderLanes,
    );
    setIsRendering(false);

