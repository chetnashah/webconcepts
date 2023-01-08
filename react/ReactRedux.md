
Official Bindings for redux with react.

Top level API:

### Provider

The `<Provider />` makes the Redux store available to any nested components that have been wrapped in the `connect()` function.

Since any React component in a React Redux app can be connected, most applications will render a `<Provider>` at the top level, with the entire app’s component tree inside of it.

Normally, you can’t use a connected component unless it is nested inside of a `<Provider>`.


### connect

### mapStateToProps

### mapDispatchToProps

### redux-loop

### redux-saga

https://redux-loop.js.org/docs/tutorial/Tutorial.html