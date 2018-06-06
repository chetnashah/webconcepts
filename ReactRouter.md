

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