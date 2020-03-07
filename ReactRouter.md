

### Some restrictions

1. `Router` can have only a single child. So use `div` or `Switch`.
2. You cannot render `Link` outside `Router`.

### Location object shape

```js
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere',
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```
https://developer.mozilla.org/en-US/docs/Web/API/Location

### Location object usage

You can provide locations instead of strings to the various places that navigate:

*  Web Link to
* Native Link to
* Redirect to
* history.push
* history.replace

e..g
```js
// usually all you need
<Link to="/somewhere"/>

// but you can use a location instead
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```
### History library

Central part of routing control.

### Important props given to a Route driven Component `match` and `location`

```json
{
    "match": {
        "path": "/",
        "url": "/",
        "params": {},
        "isExact": false
    },
    "location": {
        "pathname": "/bogo",
        "search": "?q=edadf",
        "hash": "#abcdef=123"
    },
    "history": {
        "length": 4,
        "action": "POP",
        "location": {
            "pathname": "/bogo",
            "search": "?q=edadf",
            "hash": "#abcdef=123"
        }
    }
}
```

### The route that always matches

Route matching is done by comparing a `<Route>`'s `path` prop to the current `location’s pathname`. When a `<Route>` matches it will render its content and when it does not match, it will render null. A `<Route>` with no path will always match. See e.g.
```jsx
        <Route component={NoMatch} />
```
A good idea is to make the `NoMatch` component which explicitly calls out 404, and renders path for which 404 is shown. Or you can specify where to go via `<Redirect>`

### Ways to use `<Route>`

1. `component` prop : When you use component (instead of `render` or `children`, below) the router uses `React.createElement` to create a new React element from the given component. That means if you provide an inline function to the component prop, you would create a new component every render.

2. `render` prop : This allows for convenient inline rendering and wrapping without the undesired remounting explained above.

3. `children` prop : Sometimes you need to render whether the path matches the location or not. In these cases, you can use the function children prop. It works exactly like render except that it gets called whether there is a match or not.



All three render methods will be passed the same three route props

1. `match`
2. `location`
3. `history`


### StaticRouter

A `router` that never changes it's `location`.
This can be useful in server-side rendering scenarios when the user isn't actually clicking around, so the location never actually changes.
e.g.
```jsx
        <StaticRouter context={ context } location={ req.url }>
            <Layout />
        </StaticRouter>
```


### BrowserRouter

### Server Rendering
Rendering on the server is a bit different since it's all stateless. The basic idea is that we wrap the app in a stateless `<StaticRouter>` instead of a `<BrowserRouter>`. We pass in the requested url from the server so the routes can match and a context prop we'll discuss next.

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

**Note** - React router will not intercept setting of `window.location` or `<a>` tag, so those routes will definitely make requests to the sever

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

### Static routing vs dynamic routing

If you’ve used Rails, Express, Ember, Angular etc. you’ve used static routing. In these frameworks, you declare your routes as part of your app’s initialization before any rendering takes place. React Router pre-v4 was also static (mostly).

When we say dynamic routing, we mean routing that takes place as your app is rendering, not in a configuration or convention outside of a running app. That means almost everything is a component in React Router

A good use case for dynamic routing is responsive design. e.g. `/invoices` would be a valid screen route for mobile phones. where as on desktop you would always show it via `/invoices/i1` etc.
