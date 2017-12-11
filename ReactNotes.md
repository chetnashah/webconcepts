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
