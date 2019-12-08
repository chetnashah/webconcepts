

### Store

The data in a store must only be `mutated` by `responding to an action`.
Every time a store's data changes it `must emit a "change" event`.
Multiple stores are possible.

`Input Action` -> change data -> emit `change`

### Dispatcher

There should be only one **singleton dispatcher** in each application
**Every store will receive every action**

The dispatcher handles actions synchronously. If an action is fired inside another action's context (store processing/reducing), the dispatcher will throw an error. As others have said before, if you cannot move the nested action elsewhere, use setTimeout to fire the nested action in a new context

Another solution is to setup a store listener and put in an dispatch an event as a new round of mutation in response to previous action.

### Views

When a view uses data from a store it must also subscribe to change events from that store.

### WaitFor

As an application grows, dependencies across different stores are a near certainty. Store A will inevitably need Store B to update itself first, so that Store A can know how to update itself. We need the dispatcher to be able to invoke the callback for Store B, and finish that callback, before moving forward with Store A. To declaratively assert this dependency, a store needs to be able to say to the dispatcher, "I need to wait for Store B to finish processing this action." The dispatcher provides this functionality through its waitFor() method.

