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
        "3": {
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
    done: true,./
  }
});
```

### Actions


`(self) => ({ action1() { }, action2() { }})` is ES6 syntax for `function (self) { return { action1: function() { }, action2: function() { } }}`

### Views are computed properties

Computed properties are tracked and memoized by MobX. Computed properties will not be stored in snapshots or emit patch events. It is possible to provide a setter for a computed property as well. A setter should always invoke an action.

**view function** - A view function (see // 7). A view function can, unlike computed properties, take arbitrary arguments. It won't be memoized, but its value can be tracked by MobX nonetheless. 
e.g.
```js
    .views(self => {
            // view function - no get in front, and takes an arument
            findTodosByUser(user) {
                return self.todos.filter(t => t.assignee === user)
            }
    })
```

```js
const RootStore = types
    .model({
        users: types.map(User),
        todos: types.map(Todo),
    })
    .views(self => ({
        get pendingCount() {
            return values(self.todos).filter(todo => !todo.done).length
        },
        get completedCount() {
            return values(self.todos).filter(todo => todo.done).length
        }
    }))
    .actions(self => ({
        addTodo(id, name) {
            self.todos.set(id, Todo.create({ name }))
        }
    }))
```

### References and identifiers

`types.identifier` to be given to an `id` field within a model, working as
a primary key for that model, useful as a foreign key in other models.

providing an identifier helps MST understand elements in maps and arrays, and allows it to correctly reuse model instances in arrays and maps when possible.

```js
const User = types.model({
    id: types.identifier,
    name: types.optional(types.string, "")
})
```

identifiers are required upon creation of the element and cannot be mutated.

```js
const store = RootStore.create({
    users: {
        "1": {
            id: "1",
            name: "mweststrate"
        },
        "2": {
            id: "2",
            name: "mattiamanzati"
        },
        "3": {
            id: "3",
            name: "johndoe"
        }
    },
    todos: {
        "1": {
            name: "Eat a cake",
            done: true
        }
    }
})
```

#### References

Use `types.reference(User)`.
To postpone the resolution of the model, you can use `types.late(() => User)` instead of just User and that will hoist the model and defer its evaluation

```js
const Todo = types
    .model({
        name: types.optional(types.string, ""),
        done: types.optional(types.boolean, false),
        user: types.maybe(types.reference(types.late(() => User)))
    })
    .actions(self => ({
        setName(newName) {
            self.name = newName
        },
        toggle() {
            self.done = !self.done
        }
    }))
```

**Giving value to a reference field** - The reference value can be set by providing either the identifier or a model instance.

```js
import React from "react";
import { render } from "react-dom";
import { types, getSnapshot, onSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react";
import { values } from "mobx";

let id = 1;
const randomId = () => ++id;

const User = types.model({
  id: types.identifier,
  name: types.optional(types.string, "")
});

const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
    user: types.maybe(types.reference(types.late(() => User)))
  })
  .actions(self => ({
    setName(newName) {
      self.name = newName;
    },
    setUser(user) {
      if (user === "") {
        conosle.log("empty user!");
        // When selected value is empty, set as undefined
        self.user = undefined;
      } else {
        console.log("setting valid user = ", user);
        self.user = user;
      }
    },
    toggle() {
      self.done = !self.done;
    }
  }));

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
  })
  .actions(self => {
    function addTodo(id, name) {
      self.todos.set(id, Todo.create({ id, name }));
    }

    return { addTodo };
  });

const store = RootStore.create({
  users: {
    "1": {
      id: "1",
      name: "mweststrate"
    },
    "2": {
      id: "2",
      name: "mattiamanzati"
    },
    "3": {
      id: "3",
      name: "johndoe"
    }
  },
  todos: {
    "1": {
      id: id,
      name: "Eat a cake",
      done: true
    }
  }
});

onSnapshot(store, snapshot => {
  console.log("snapshot is: ", snapshot);
});

const UserPickerView = observer(props => (
  <select
    value={props.user ? props.user.id : ""}
    onChange={e => props.onChange(e.target.value)}
  >
    <option value="">-none-</option>
    {values(props.store.users).map(user => (
      <option value={user.id}>{user.name}</option>
    ))}
  </select>
));

const TodoView = observer(props => (
  <div>
    <input
      type="checkbox"
      checked={props.todo.done}
      onChange={e => props.todo.toggle()}
    />
    <input
      type="text"
      value={props.todo.name}
      onChange={e => props.todo.setName(e.target.value)}
    />
    <UserPickerView
      user={props.todo.user}
      store={props.store}
      onChange={userId => props.todo.setUser(userId)}
    />
  </div>
));

const TodoCounterView = observer(props => (
  <div>
    {props.store.pendingCount} pending, {props.store.completedCount} completed
  </div>
));

const AppView = observer(props => (
  <div>
    <button onClick={e => props.store.addTodo(randomId(), "New Task")}>
      Add Task
    </button>
    {values(props.store.todos).map(todo => (
      <TodoView store={props.store} todo={todo} />
    ))}
    <TodoCounterView store={props.store} />
  </div>
));

render(<AppView store={store} />, document.getElementById("root"));
```

### Environment or injected data available

Useful for cross-cutting concerns like logging/networking/auth etc.
Useful to inject environment or test-specific utilities like a transport layer, loggers, etc. This is also very useful to mock behavior in unit tests or provide instantiated utilities to models without requiring singleton modules.

Second argument to `Model.create` is `env` value that you want to share.
```js
// setup logger and inject it when the store is created
const logger = {
    log(msg) {
        console.log(msg)
    }
}
const store = Store.create(
    {
        todos: [{ title: "Grab tea" }]
    },
    {
        logger: logger // inject logger to the tree
    }
);
```

Usage:
```js
import { types, getEnv } from "mobx-state-tree"

const Todo = types
    .model({
        title: ""
    })
    .actions(self => ({
        setTitle(newTitle) {
            // grab injected logger and log
            getEnv(self).logger.log("Changed title to: " + newTitle)
            self.title = newTitle
        }
    }))

const Store = types.model({
    todos: types.array(Todo)
})
```