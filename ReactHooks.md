
Hooks rely on a stable call order on every render of the same component.

React only changes the DOM nodes if there’s a difference between renders.

After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as “browser rendering”, we’ll refer to it as “painting”.

### Commits

For the initial render, React will use the `appendChild()` DOM API to put all the DOM nodes it has created on screen.
For re-renders, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.


### Internals
https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e

### useState

State is local to a component instance on the screen.
Updating your component’s state automatically queues a render.

**Note** - `updater functions` i.e. `setNumber(n => n+1)` run during rendering, 
so updater functions must be pure and only return the result.
**Do not try to set state inside of updater functions or run other side effects**.

The useState Hook provides those two things:

1. `A state variable` to retain the data between renders.
2. `A state setter function` to update the variable and trigger React to render the component again.

`batch updates`: react waits till all code in event handlers has run before processing your state updates. 

### useReducer

1. must be pure, i.e should not make network request, schedule timeouts etc.
2. same inputs always result in same output.
3. Actions are queued until next render.
4. **reducers run during rendering**.
5. Reducers should `update objects and arrays without mutations`.

