
##

The URL interface is used to parse, construct, normalize, and encode URLs. It works by providing properties which allow you to easily read and modify the components of a URL.

```js
let m = 'https://developer.mozilla.org';
let a = new URL("/", m);// => 'https://developer.mozilla.org/'
let b = new URL(m);// => 'https://developer.mozilla.org/'
```

## Common properties

1. `searchParams` (read-only) - a `URLSearchParams` object to access individual query params.
2. `origin` - host + port + scheme combo.
3. `search` (mutable) - string that represents query string e.g. `?q=123`

## Commonly used methods

### Add query params

Create a new `URLSearchParams` object and assign it to `url.search` property. Note `url.searchParams` is a read only property.

```js
var url = new URL('https://sl.se')

var params = {lat:35.696233, long:139.570431} // or:
var params = [['lat', '35.696233'], ['long', '139.570431']]

url.search = new URLSearchParams(params).toString();

fetch(url)
```

