
- `make` is the `render` in reason react

`[@react.component]` tells ReasonReact that you're writing a component with named args syntax `(~name)`, but that you would like to compile it into a function that takes a JS object as props which is how React works

### Component state using hooks

```re
  let (count, setCount) = React.useState(() => 0);
```

`type` is an invalid prop name.
Use `type_` in place of `type`. e.g. `<input type_="text" />`

**Note** - prop spread is not allowed.

