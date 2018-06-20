

### How it works

Listens to changes in url and asks Routes to render depending on url contents.

### How does navigation occur?

Instead of simple anchor tag based navigation (which actually tells browser to load new resource by making a request),
react-router fakes it by simply changing url, and reacting to it, using the `Link` tag provided by react-router.

* Use `Link` for user driven navigation.
* Use `this.props.history.push(path)` for programmatic navigation.

### Switch Component
Takes in a list of Routes and renders only the first one that matches url.

### `<Link>` Component

Takes a `to` prop telling the url bar to switch to new url, This component simply changes url via history. **It does not** trigger a request to server or anything like that. It is completely upon the developer to make api requests when Component corresponding to the route is mounted.

### Switch Component

Takes a list of routes, and only renders the first one that matches.

### Catching unlisted routes for 404

When path prop is not specified in a `Route`, the given component is rendered for all urls, so put it as last component in a `Switch` component.
e.g.
```jsx
const routes = (
  <Router>
    <div>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
```

### Programmatic navigation with react router

https://tylermcginnis.com/react-router-programmatically-navigate/

1. Use `this.props.history.push(path)`
2. Use `Redirect` component.

