### Models and snapshots

```js
import { types, getSnapshot } from "mobx-state-tree"

const Todo = types.model({
    name: "",
    done: false
})

const User = types.model({
    name: ""
})

const john = User.create({ name: "Johnathan" });
const eat = Todo.create();

console.log("John:", getSnapshot(john)); // { name: "Johnathan" }
console.log("Eat TODO:", getSnapshot(eat)); // { name: "", done: false }
```

### Type system options

```js
const Todo = types.model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false)
})

const User = types.model({
    name: types.optional(types.string, "")
})
```

### Creating the tree root/store

`types.map` correspond to an object, where keys are `id`s.

```js
const RootStore = types.model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
})

const store = RootStore.create({
    users: {} // users is not required really since arrays and maps are optional by default since MST3
})
```

### Modification in tree, with actions

`self` is the object instance on which the action is taking place.

```js
const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setName(newName) {
      self.name = newName;
    },

    toggle() {
      self.done = !self.done;
    }
  }));

const User = types.model({
  name: types.optional(types.string, "")
});

// could have named it RootModel also, but good
// to name store since it contains actions
const RootStore = types
  .model({
    users: types.map(User),
    todos: types.map(Todo)
  })
  .actions(self => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }));
    }
  }));

const rootStore = RootStore.create({ users: {}, todos: {} });
rootStore.addTodo(1, "First todo");
rootStore.addTodo(2, "Second todo!");
rootStore.todos.get(1).toggle();
console.log("initial store: ", getSnapshot(rootStore));
```

### State/store serialization

`getSnapshot` takes a type-model instance and returns a serialized state
representation captured by that instance.
```js
console.log("initial store: ", getSnapshot(rootStore));
```

Because the nature of state is mutable, a snapshot will be emitted whenever the state is mutated. To listen to the new snapshots, you can use `onSnapshot(store, snapshot => console.log(snapshot))` and log them as they are emitted.

```js
// callback triggered whenever rootStore/state changes/mutates
onSnapshot(rootStore, snapshot => {
  console.log("latest snapshot is::: ", snapshot);
});
```

### Creating model-instance from snapshots
1.  pass the `snapshot` like `TypeModel.create(snapshot)` which returns a 
model-instance that holds the state same as the snapshot provided.

By creating a new model instance, and passing in the snapshot as argument to the .create function. This means that you will need to update all your store references, if used in React components, to the new one.

2. `applySnapshot`: Avoiding this reference problem by applying the snapshot to an existing model instance. Properties will be updated, but the store reference will remain the same. This will trigger an operation called "reconciliation"
```js
applySnapshot(store, {
    users: {},
    todos: {// replaces all todos with this
        "1": {
            name: "Eat a cake",
            done: true
        }
    }
})
```
In case you want to preserve some existing state, you must use it in provided snapshot
e.g.
```js
applySnapshot(rootStore.todos, {
  ...getSnapshot(rootStore.todos),
  "3": {
    name: "Eat a cake",
    done: true
  }
});
```

