
### DragDropContext

Top level componet inside which all drag-drop is going to occur,
should be wrapped in `DragDropContext`.


### DragSource

Wrap your component with `DragSource` to make it draggable.

`DragSource` is an HOC accepting three required parameters.

`DragSource` uses partial application, after which it returns function that can be called with actual component class.

```js
import { DragSource } from 'react-dnd';
class MyComponent {}

export default DragSource(type, spec, collect)(MyComponent);
```
1. `type`: **required** string or some value. Only drop targets registered for same type will react to it.

2. `spec`: **required** a plain JS object with few allowed methods on it. specifies how drag source reacts to drag and drop events.
These are 
1. `beginDrag(props, sourceMonitor, component)`: **required** and return some data about item being dragged.
2. `endDrag(props, sourceMonitor, componet)`
3. `canDrag(props, sourceMonitor)`
4. `isDragging(props, sourceMonitor)`

3. `collect`: **required** collecting function which should return plain objects of props to inject into your component.
signature is `(sourceConnector, sourceMonitor) => object`

#### Collecting function

Just specifying spec and type is not enough.
All communication in react happens via props, so it makes sense that ReactDND inject special props into your component. This is done by `collect`.
Given a `connector` and a `monitor`, collect function's job is to returns props to inject into the component.


### Connecting to DOM

A `connector` lets you connect nodes to DnD backend.
How does a backend know which DOM nodes to listen to?
Enter the connectors.
The connectors let you assign predefined roles to dom nodes in render function :
1. drag source  via `connect.dragSource()(element)` or
2. drag preview via `connect.dragPreview()(element)` or
3. drop target via `connect.dropTarget()(element)`

Internally connect works via callback ref to 

### Monitoring state

A `monitor` can help you query info about the drag state.

#### DragSourceMonitor

Methods on dragSourceMonitor object:
1. `canDrag(): boolean`
2. `isDragging(): boolean`
3. `getItemType(): string`
4. `getItem(): object`
5. `getDropResult(): object`
6. `didDrop(): boolean`
7. a bunch of `getAbcOffset` methods

#### DropTargetMonitor

Methods on dropSourceMonitor object:
1. `canDrop(): boolean`
2. `isOver(options): boolean`
3. `getItemType(): string`
4. `getItem(): object`
5. `getDropResult(): object`
6. `didDrop(): boolean`
7. a bunch of `getAbcOffset` methods


#### DragLayerMonitor

### DropTarget

Wrap your component with `DropTarget` to make it react to compatible items being dragged, hovered, or dropped on it.

```js
import { DropTarget } from 'react-dnd';
class MyComponent {

}

export default DropTarget(type, spec, collect)(MyComponent);
```

`DropTarget spec` methods:
1. `drop(props, dropMonitor, component)`
2. `hover(props, dropMonitor, component)`
3. `canDrop(props, monitor)`

### Common errors

1. Only native element nodes can be passed to dnd connectors.
You can Either wrap Box into a `<div>`, or turn it into a drag source or a drop target itself.

2. If you do not return something from `beginDrag` of dragSourceSpec, then drop methods of dropTargetSpec are ignored.

