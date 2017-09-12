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
