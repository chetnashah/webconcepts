https://www.youtube.com/watch?v=lATafp15HWA&list=PLZlA0Gpn_vH8DWL14Wud_m8NeNNbYKOkj&index=58


## Folder structure basic (small projects)

1. components - holds common reusable components
2. pages - top level pages in the app
3. data - data handling 
4. context - all contexts
5. hooks - for custom hooks
6. utils - common util functions


## State management

**Context API exposed** -> We will create context provider that exposes functions to query/modify state, 
instead of directly exposing state. This way we decouple state implementation within the context, from context consumers. But how will reactivity work? state changes in context, should trigger 

useContext can encapsulate state using either `useState` or `useReducer`, but since they are hooks, they must go in some componenent that will be rendered, so logically they go into Shoppign cart provider component.



### Data modeling

### Cart & Item entity

Cart will have a list of items. 
Each item has a price. 
There can be multiple quantity of same item.


## How to overlay shopping cart over other routes?

We added it as a child to top level ShoppingCartProvider (which is parent of all the routes).

for UI, `react-bootstrap` provides `OffCanvas` component.

